# Firebase / Google API key — leak response

GitHub secret scanning flagged a **Google API key** that was committed in `firebase-applet-config.json`. Treat it as compromised until you rotate it.

## 1. Rotate the key (you must do this in Google Cloud)

1. Open [Google Cloud Console](https://console.cloud.google.com/) → project **genzspace** (or your Firebase project).
2. **APIs & Services** → **Credentials**.
3. Find the browser key that matched the leaked value → **Delete** or **Regenerate** (create a new Browser key if needed).
4. In [Firebase Console](https://console.firebase.google.com/) → Project settings → Your apps → Web app → confirm the new `apiKey` if Firebase rotated it for you.
5. **Restrict** the new key:
   - Application restrictions: HTTP referrers (your production domain, `localhost` for dev).
   - API restrictions: only Firebase / Firestore APIs you use.

## 2. Configure this repo locally (no keys in git)

Copy `.env.example` to `.env` and set:

- `VITE_FIREBASE_API_KEY` = new key after rotation
- Other `VITE_FIREBASE_*` fields from Firebase project settings

Restart `npm run dev` after changing `.env`.

## 3. GitHub

1. After rotation, open the secret scanning alert → **Revoke secret** / mark resolved.
2. The old key remains in **git history** on `main`. Removing the file stops *future* leaks; it does not erase history. For a full purge, use [GitHub’s guidance](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository) (e.g. `git filter-repo`) only if your team agrees to rewrite history.

## 4. What this codebase does now

- `firebase-applet-config.json` is **gitignored** (local AI Studio copies only).
- Committed template: `firebase-applet-config.example.json`.
- Runtime config: `VITE_FIREBASE_*` in `.env` via `src/config/firebaseClientConfig.ts`.

Without `.env`, citizen/officer flows still work using the **local in-memory case store**; Firestore sync is skipped.
