@PackersNews telegram community prediction contest

https://pack-contest.web.app/

stack: React 19, TypeScript, Vite, Redux Toolkit, Redux Saga, Zod 4, Tailwind, Firebase

```bash
yarn install
yarn start   # vite dev server on :3000
yarn build   # output in build/ (firebase hosting)
```

Env vars still use the `REACT_APP_*` prefix (Vite is configured to load them).

## Firestore security

Rules live in [`firestore.rules`](firestore.rules). Clients cannot set or change `users.admin`; writes to `weeks` / `results` / `standings` / `about` require `users/{uid}.admin == true`.

```bash
firebase login
firebase deploy --only firestore:rules
```

Grant admin only in Firebase Console → Firestore → `users/{uid}` → set `admin: true` (or via Admin SDK). Do this before deploying rules if you need to keep writing as admin.

## Admin scripts (service account)

One-time setup for scripts that bypass Security Rules via IAM:

1. Firebase Console → project `pack-contest` → Project settings → Service accounts → **Generate new private key**
2. Save the JSON as `serviceAccount.json` in the repo root (gitignored; never commit)

```bash
yarn localize-week                              # last active week + untranslated questions
yarn localize-week -- --week 60                 # specific week (e.g. inactive draft)
yarn localize-week -- --week 60 --apply patch.json
```

Optional: `GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json` instead of `./serviceAccount.json`.
