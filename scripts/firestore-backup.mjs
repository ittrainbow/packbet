#!/usr/bin/env node
/**
 * Full Firestore backup / restore (top-level collections used by pack-contest).
 *
 * Setup: ./serviceAccount.json (or GOOGLE_APPLICATION_CREDENTIALS)
 *
 * Usage:
 *   yarn db-backup
 *   yarn db-backup -- --out backups/my-dump.json
 *   yarn db-restore -- backups/my-dump.json --dry-run
 *   yarn db-restore -- backups/my-dump.json --yes
 *
 * Backup shape:
 *   {
 *     meta: { createdAt, projectId, collections, counts },
 *     collections: { [name]: { [docId]: data } }
 *   }
 *
 * Restore overwrites documents present in the dump (set). Does not delete
 * docs that exist in Firestore but are absent from the dump.
 */

import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'

const ROOT = resolve(import.meta.dirname, '..')
const DEFAULT_SA = resolve(ROOT, 'serviceAccount.json')
const DEFAULT_OUT_DIR = resolve(ROOT, 'backups')

const COLLECTIONS = ['users', 'answers', 'weeks', 'results', 'standings', 'about']

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

function serializeValue(value) {
  if (value === null || value === undefined) return value
  if (value instanceof Timestamp) {
    return { __type: 'timestamp', iso: value.toDate().toISOString() }
  }
  if (Array.isArray(value)) return value.map(serializeValue)
  if (typeof value === 'object') {
    if (typeof value.toDate === 'function' && typeof value.seconds === 'number') {
      return { __type: 'timestamp', iso: value.toDate().toISOString() }
    }
    const out = {}
    for (const [k, v] of Object.entries(value)) out[k] = serializeValue(v)
    return out
  }
  return value
}

function deserializeValue(value) {
  if (value === null || value === undefined) return value
  if (Array.isArray(value)) return value.map(deserializeValue)
  if (typeof value === 'object') {
    if (value.__type === 'timestamp' && typeof value.iso === 'string') {
      return Timestamp.fromDate(new Date(value.iso))
    }
    const out = {}
    for (const [k, v] of Object.entries(value)) out[k] = deserializeValue(v)
    return out
  }
  return value
}

function defaultOutPath() {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  return resolve(DEFAULT_OUT_DIR, `firestore-${stamp}.json`)
}

function parseArgs(argv) {
  const mode = argv[0] === 'restore' ? 'restore' : 'backup'
  const rest = mode === 'restore' ? argv.slice(1) : argv[0] === 'backup' ? argv.slice(1) : argv
  const outIdx = rest.indexOf('--out')
  const yes = rest.includes('--yes')
  const dryRun = rest.includes('--dry-run')
  const fileArg = rest.find((a, i) => !a.startsWith('--') && rest[i - 1] !== '--out')
  return {
    mode,
    outPath: outIdx >= 0 ? resolve(rest[outIdx + 1]) : null,
    inPath: fileArg ? resolve(fileArg) : null,
    yes,
    dryRun
  }
}

async function dumpCollection(db, name) {
  const snap = await db.collection(name).get()
  const docs = {}
  for (const doc of snap.docs) {
    docs[doc.id] = serializeValue(doc.data())
  }
  return { docs, count: snap.size }
}

async function backup(db, outPath) {
  const sa = loadCredentials()
  const collections = {}
  const counts = {}
  for (const name of COLLECTIONS) {
    const { docs, count } = await dumpCollection(db, name)
    collections[name] = docs
    counts[name] = count
  }
  const payload = {
    meta: {
      createdAt: new Date().toISOString(),
      projectId: sa.project_id,
      collections: COLLECTIONS,
      counts,
      totalDocs: Object.values(counts).reduce((a, b) => a + b, 0)
    },
    collections
  }
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, JSON.stringify(payload, null, 2), 'utf8')
  console.log(JSON.stringify({ ok: true, out: outPath, ...payload.meta }, null, 2))
}

async function restore(db, inPath, { yes, dryRun }) {
  if (!inPath || !existsSync(inPath)) {
    console.error(`Backup file not found: ${inPath ?? '(missing path)'}`)
    process.exit(1)
  }
  if (!yes && !dryRun) {
    console.error('Refusing restore without --yes (or pass --dry-run to preview).')
    process.exit(1)
  }

  const payload = JSON.parse(readFileSync(inPath, 'utf8'))
  if (!payload?.collections || typeof payload.collections !== 'object') {
    console.error('Invalid backup: missing collections object')
    process.exit(1)
  }

  const plan = []
  for (const name of Object.keys(payload.collections)) {
    const docs = payload.collections[name] ?? {}
    for (const [id, data] of Object.entries(docs)) {
      plan.push({ collection: name, id, data: deserializeValue(data) })
    }
  }

  if (dryRun) {
    console.log(
      JSON.stringify(
        {
          dryRun: true,
          in: inPath,
          meta: payload.meta ?? null,
          wouldWrite: plan.length,
          byCollection: Object.fromEntries(
            Object.entries(payload.collections).map(([k, v]) => [k, Object.keys(v ?? {}).length])
          )
        },
        null,
        2
      )
    )
    return
  }

  const BATCH_LIMIT = 400
  let written = 0
  for (let i = 0; i < plan.length; i += BATCH_LIMIT) {
    const chunk = plan.slice(i, i + BATCH_LIMIT)
    const batch = db.batch()
    for (const item of chunk) {
      batch.set(db.collection(item.collection).doc(item.id), item.data)
    }
    await batch.commit()
    written += chunk.length
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        in: inPath,
        written,
        byCollection: Object.fromEntries(
          Object.entries(payload.collections).map(([k, v]) => [k, Object.keys(v ?? {}).length])
        )
      },
      null,
      2
    )
  )
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const db = initAdmin()
  if (args.mode === 'restore') {
    await restore(db, args.inPath, { yes: args.yes, dryRun: args.dryRun })
    return
  }
  const outPath = args.outPath ?? defaultOutPath()
  await backup(db, outPath)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
