# Firestore ticket rules (starter)

Use with project `samvaad-setu-360`. Paths: `cases/{trackingId}` and `cases/{trackingId}/audit_logs/{logId}`.

Officer writes (assign / proof / close) should go through Express (`/api/v1/tickets/*` + `X-Officer-Pin`). Client SDK is used for citizen create and optional media.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /cases/{ticketId} {
      allow read: if true;
      allow create: if request.resource.data.keys().hasAll(['trackingId', 'status', 'district', 'state']);
      allow update, delete: if false;
      match /audit_logs/{logId} {
        allow read: if true;
        allow create: if true;
        allow update, delete: if false;
      }
    }
  }
}
```

Tighten for production: require Firebase Auth for officer roles; keep citizen create public or OTP-gated.

## Firebase Storage (optional)

Browser uploads from `http://localhost:3000` fail until the bucket has CORS. The app persists voice/photo as data URLs unless `VITE_FIREBASE_STORAGE_UPLOADS=true`.

Apply CORS (owner only, after `gcloud auth login`):

```
gsutil cors set docs/security/storage-cors.json gs://samvaad-setu-360.firebasestorage.app
```

Storage rules (`tickets/{trackingId}/**`):

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /tickets/{ticketId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.resource.size < 8 * 1024 * 1024
        && request.resource.contentType.matches('image/.*|audio/.*|video/.*');
    }
  }
}
```

Lock writes to signed-in officers before production.
