#!/usr/bin/env node
/**
 * Compare user answers: live Firestore vs a backup JSON dump.
 *
 * Setup: ./serviceAccount.json (or GOOGLE_APPLICATION_CREDENTIALS)
 *
 * Usage:
 *   yarn db-diff-answers                              # latest backups/firestore-*.json
 *   yarn db-diff-answers -- backups/dump.json
 *   yarn db-diff-answers -- backups/dump.json --week 63
 *   yarn db-diff-answers -- backups/dump.json --uid <uid>
 *   yarn db-diff-answers -- backups/dump.json --out backups/answers-diff.json
 *
 * Answers shape: { [weekId]: { [qid]: number } } keyed by uid.
 */

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve, dirname, basename } from 'node:path'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const ROOT = resolve(import.meta.dirname, '..')
const DEFAULT_SA = resolve(ROOT, 'serviceAccount.json')
const BACKUPS_DIR = resolve(ROOT, 'backups')

function loadCredentials() {
  const fromEnv = process.env.GOOGLE_APPLICATION_CREDENTIALS
  const path = fromEnv ? resolve(fromEnv) : DEFAULT_SA
  if (!existsSync(path)) {
    console.error(`Missing service account key at ${path}`)
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

function latestBackupPath() {
  if (!existsSync(BACKUPS_DIR)) return null
  const files = readdirSync(BACKUPS_DIR)
    .filter((f) => f.startsWith('firestore-') && f.endsWith('.json'))
    .sort()
  if (!files.length) return null
  return resolve(BACKUPS_DIR, files[files.length - 1])
}

function parseArgs(argv) {
  const weekIdx = argv.indexOf('--week')
  const uidIdx = argv.indexOf('--uid')
  const outIdx = argv.indexOf('--out')
  const fileArg = argv.find((a, i) => !a.startsWith('--') && argv[i - 1] !== '--week' && argv[i - 1] !== '--uid' && argv[i - 1] !== '--out')
  return {
    backupPath: fileArg ? resolve(fileArg) : latestBackupPath(),
    weekId: weekIdx >= 0 ? String(argv[weekIdx + 1] ?? '') : null,
    uid: uidIdx >= 0 ? String(argv[uidIdx + 1] ?? '') : null,
    outPath: outIdx >= 0 ? resolve(argv[outIdx + 1]) : null
  }
}

function asAnswerMap(data) {
  if (!data || typeof data !== 'object') return {}
  return data
}

function filterAnswers(doc, weekId) {
  if (!weekId) return asAnswerMap(doc)
  const week = asAnswerMap(doc)[weekId]
  if (week == null) return {}
  return { [weekId]: week }
}

function flattenAnswers(doc) {
  /** @type {{ weekId: string, qid: string, value: number }[]} */
  const rows = []
  for (const [weekId, questions] of Object.entries(asAnswerMap(doc))) {
    if (!questions || typeof questions !== 'object') continue
    for (const [qid, value] of Object.entries(questions)) {
      rows.push({ weekId, qid, value })
    }
  }
  return rows
}

function compareUser(uid, liveDoc, backupDoc, weekId) {
  const live = filterAnswers(liveDoc, weekId)
  const backup = filterAnswers(backupDoc, weekId)
  const liveFlat = flattenAnswers(live)
  const backupFlat = flattenAnswers(backup)
  const liveKey = new Map(liveFlat.map((r) => [`${r.weekId}/${r.qid}`, r.value]))
  const backupKey = new Map(backupFlat.map((r) => [`${r.weekId}/${r.qid}`, r.value]))
  const keys = new Set([...liveKey.keys(), ...backupKey.keys()])

  /** @type {any[]} */
  const changed = []
  /** @type {any[]} */
  const onlyLive = []
  /** @type {any[]} */
  const onlyBackup = []

  for (const key of [...keys].sort()) {
    const [week, qid] = key.split('/')
    const hasLive = liveKey.has(key)
    const hasBackup = backupKey.has(key)
    if (hasLive && !hasBackup) {
      onlyLive.push({ weekId: week, qid, live: liveKey.get(key) })
    } else if (!hasLive && hasBackup) {
      onlyBackup.push({ weekId: week, qid, backup: backupKey.get(key) })
    } else if (liveKey.get(key) !== backupKey.get(key)) {
      changed.push({ weekId: week, qid, live: liveKey.get(key), backup: backupKey.get(key) })
    }
  }

  return {
    uid,
    changed,
    onlyLive,
    onlyBackup,
    hasDiff: changed.length + onlyLive.length + onlyBackup.length > 0
  }
}

async function loadLiveAnswers(db) {
  const snap = await db.collection('answers').get()
  /** @type {Record<string, any>} */
  const docs = {}
  for (const doc of snap.docs) docs[doc.id] = doc.data()
  return docs
}

async function loadUserNames(db) {
  const snap = await db.collection('users').get()
  /** @type {Record<string, string>} */
  const names = {}
  for (const doc of snap.docs) {
    const name = doc.data()?.name
    if (typeof name === 'string' && name) names[doc.id] = name
  }
  return names
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (!args.backupPath || !existsSync(args.backupPath)) {
    console.error(`Backup not found: ${args.backupPath ?? '(none in backups/)'}`)
    process.exit(1)
  }

  const payload = JSON.parse(readFileSync(args.backupPath, 'utf8'))
  const backupAnswers = payload?.collections?.answers
  if (!backupAnswers || typeof backupAnswers !== 'object') {
    console.error('Backup has no collections.answers')
    process.exit(1)
  }

  const db = initAdmin()
  const [liveAnswers, names] = await Promise.all([loadLiveAnswers(db), loadUserNames(db)])

  let uids = new Set([...Object.keys(liveAnswers), ...Object.keys(backupAnswers)])
  if (args.uid) {
    if (!uids.has(args.uid)) {
      console.log(
        JSON.stringify(
          {
            backup: basename(args.backupPath),
            weekId: args.weekId,
            uid: args.uid,
            summary: { usersCompared: 0, usersWithDiffs: 0, answerDiffs: 0 },
            note: 'uid not present in live or backup answers'
          },
          null,
          2
        )
      )
      return
    }
    uids = new Set([args.uid])
  }

  const onlyLiveUsers = []
  const onlyBackupUsers = []
  const diffs = []

  for (const uid of [...uids].sort()) {
    const inLive = Object.prototype.hasOwnProperty.call(liveAnswers, uid)
    const inBackup = Object.prototype.hasOwnProperty.call(backupAnswers, uid)
    const name = names[uid] ?? null

    if (inLive && !inBackup) {
      const cells = flattenAnswers(filterAnswers(liveAnswers[uid], args.weekId))
      if (!args.weekId || cells.length) {
        onlyLiveUsers.push({ uid, name, answers: cells.length })
      }
      continue
    }
    if (!inLive && inBackup) {
      const cells = flattenAnswers(filterAnswers(backupAnswers[uid], args.weekId))
      if (!args.weekId || cells.length) {
        onlyBackupUsers.push({ uid, name, answers: cells.length })
      }
      continue
    }

    const cmp = compareUser(uid, liveAnswers[uid], backupAnswers[uid], args.weekId)
    if (cmp.hasDiff) {
      diffs.push({
        uid,
        name,
        changed: cmp.changed,
        onlyLive: cmp.onlyLive,
        onlyBackup: cmp.onlyBackup
      })
    }
  }

  const answerDiffs = diffs.reduce(
    (n, d) => n + d.changed.length + d.onlyLive.length + d.onlyBackup.length,
    0
  )

  const report = {
    backup: args.backupPath,
    backupMeta: payload.meta ?? null,
    weekId: args.weekId,
    uid: args.uid,
    summary: {
      usersCompared: uids.size,
      usersWithDiffs: diffs.length,
      usersOnlyLive: onlyLiveUsers.length,
      usersOnlyBackup: onlyBackupUsers.length,
      answerDiffs
    },
    onlyLiveUsers,
    onlyBackupUsers,
    diffs
  }

  if (args.outPath) {
    mkdirSync(dirname(args.outPath), { recursive: true })
    writeFileSync(args.outPath, JSON.stringify(report, null, 2), 'utf8')
    report.out = args.outPath
  }

  console.log(JSON.stringify(report, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
