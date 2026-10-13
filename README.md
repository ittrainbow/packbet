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
