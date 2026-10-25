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

Storage path: `tickets/{trackingId}/**` — allow write of images/audio under that prefix in demo; lock to auth later.
