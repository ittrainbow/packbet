#!/usr/bin/env node
/**
 * Find last active week and list / apply ua+by translations.
 *
 * Setup (once):
 *   Firebase Console → Project settings → Service accounts → Generate new private key
 *   Save as ./serviceAccount.json (gitignored)
 *
 * Usage:
 *   yarn localize-week
 *   yarn localize-week -- --week 60
 *   yarn localize-week -- --week 60 --apply path/to/patch.json
 *
 * Patch JSON shape:
 *   { "qid": { "ua": "...", "by": "..." }, ... }
 * Only questions.*.ua and questions.*.by are updated; ru/total/other fields untouched.
 *
 * Without --week: last active week (max numeric id among active == true).
 */

import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const ROOT = resolve(import.meta.dirname, '..')
const DEFAULT_SA = resolve(ROOT, 'serviceAccount.json')

function loadCredentials() {
  const fromEnv = process.env.GOOGLE_APPLICATION_CREDENTIALS
  const path = fromEnv ? resolve(fromEnv) : DEFAULT_SA
  if (!existsSync(path)) {
    console.error(`Missing service account key at ${path}
Download once: Firebase Console → Project settings → Service accounts → Generate new private key
Save as serviceAccount.json in the repo root (gitignored).`)
    process.exit(1)
  }
  return JSON.parse(readFileSync(path, 'utf8'))
}

function initAdmin() {
  if (getApps().length) return getFirestore()
  const sa = loadCredentials()
  initializeApp({
    credential: cert(sa),
    projectId: sa.project_id
  })
  return getFirestore()
}

function needsTranslation(q) {
  const ru = q.ru ?? ''
  const ua = q.ua ?? ''
  const by = q.by ?? q.be ?? ''
  if (!ru) return false
  if (!ua || !by) return true
  return ru === ua && ru === by
}

function parseArgs(argv) {
  const applyIdx = argv.indexOf('--apply')
  const weekIdx = argv.indexOf('--week')
  return {
    applyPath: applyIdx >= 0 ? argv[applyIdx + 1] : null,
    weekId: weekIdx >= 0 ? String(argv[weekIdx + 1] ?? '') : null
  }
}

async function findWeek(db, weekId) {
  if (weekId) {
    const doc = await db.collection('weeks').doc(weekId).get()
    if (!doc.exists) return null
    return { id: Number(doc.id), weekId: doc.id, data: doc.data() }
  }
  const snap = await db.collection('weeks').get()
  let current = null
  for (const doc of snap.docs) {
    const data = doc.data()
    if (!data?.active) continue
    const id = Number(doc.id)
    if (!Number.isFinite(id)) continue
    if (!current || id > current.id) current = { id, weekId: doc.id, data }
  }
  return current
}

async function scan(weekIdArg) {
  const db = initAdmin()
  const current = await findWeek(db, weekIdArg)
  if (!current) {
    console.error(weekIdArg ? `Week ${weekIdArg} not found` : 'No active weeks found')
    process.exit(1)
  }

  const { id, weekId, data } = current
  const questions = data.questions ?? {}
  const flagged = []
  for (const [qid, q] of Object.entries(questions)) {
    if (needsTranslation(q)) {
      flagged.push({
        qid,
        ru: q.ru ?? '',
        ua: q.ua ?? '',
        by: q.by ?? q.be ?? '',
        total: q.total ?? ''
      })
    }
  }

  const report = {
    weekId,
    id,
    name: data.name ?? '',
    active: data.active,
    flaggedCount: flagged.length,
    flagged
  }
  console.log(JSON.stringify(report, null, 2))
  return report
}

async function apply(patchPath, weekIdArg) {
  if (!patchPath || !existsSync(patchPath)) {
    console.error(`Patch file not found: ${patchPath}`)
    process.exit(1)
  }
  const patch = JSON.parse(readFileSync(patchPath, 'utf8'))
  const db = initAdmin()
  const current = await findWeek(db, weekIdArg)
  if (!current) {
    console.error(weekIdArg ? `Week ${weekIdArg} not found` : 'No active weeks found')
    process.exit(1)
  }

  const { weekId, data } = current
  const questions = { ...(data.questions ?? {}) }
  const updated = []

  for (const [qid, langs] of Object.entries(patch)) {
    if (!questions[qid]) {
      console.error(`Unknown qid in patch: ${qid}`)
      process.exit(1)
    }
    if (typeof langs?.ua !== 'string' || typeof langs?.by !== 'string') {
      console.error(`Patch ${qid} must have string ua and by`)
      process.exit(1)
    }
    const prev = questions[qid]
    questions[qid] = { ...prev, ua: langs.ua, by: langs.by }
    updated.push(qid)
  }

  const next = { ...data, questions }
  await db.collection('weeks').doc(weekId).set(next)

  const readBack = (await db.collection('weeks').doc(weekId).get()).data()
  const verify = updated.map((qid) => {
    const q = readBack.questions[qid]
    return {
      qid,
      ruUnchanged: q.ru === questions[qid].ru,
      ua: q.ua,
      by: q.by,
      differsFromRu: q.ua !== q.ru && q.by !== q.ru
    }
  })

  console.log(JSON.stringify({ weekId, name: data.name, updated, verify }, null, 2))
}

const { applyPath, weekId: weekIdArg } = parseArgs(process.argv.slice(2))
if (applyPath) {
  await apply(resolve(applyPath), weekIdArg)
} else {
  await scan(weekIdArg)
}
