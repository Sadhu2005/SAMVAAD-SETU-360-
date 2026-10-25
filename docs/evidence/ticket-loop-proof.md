# Ticket loop proof — FIX-013

One real complaint walked citizen submit → officer inbox → status updates → citizen verify.

- **Tracking ID:** `SETU-2026-HR-NUH-AC6A`
- **Date:** 2026-10-25
- **Surfaces:** HTTP (`/api/v1` on `server.ts`) and live UI at `http://localhost:3000`
- **Mobile last-4:** `2345`

## HTTP functional test

`src/test/functional/http-ticket-loop.test.ts` listens on the exported Express `app` (no Vite) and asserts each persist + status.

| Step | Request | Expected status | Actual | Persist |
|------|---------|-----------------|--------|---------|
| 1 Submit | `POST /api/v1/tickets` | `submitted` + tracking ID | pass | pass |
| 2 Track | `GET /api/v1/tickets/:id?last4=2345` | unmasked `submitted` | pass | pass |
| 3 Inbox | `GET /api/v1/officer/inbox` + PIN | ticket found | pass | pass |
| 4 Accept | `POST /tickets/:id/action` `triaged` | `triaged` | pass | pass |
| 5 Assign | `POST /tickets/:id/assign` | `assigned`, dept + officer | pass | pass |
| 6 Start | `POST /tickets/:id/action` `in_progress` | `in_progress` | pass | pass |
| 7 Proof | `POST /tickets/:id/proof` | `proof_uploaded` + notes | pass | pass |
| 8 Track | `GET` with last-4 | citizen sees proof | pass | pass |
| 9 Verify | `POST /tickets/:id/verify` `{ verified: true, last4 }` | `citizen_verified` | pass | pass |
| 10 Close | `POST /tickets/:id/action` `closed` | `closed` | pass | pass |

## Browser walkthrough (same path)

| Step | UI | Expected | Actual | Persist |
|------|-----|----------|--------|---------|
| Submit | Citizen **Raise a need** — Nuh, Haryana, Sanitation & Drainage, `9810012345` | tracking ID, Received | `SETU-2026-HR-NUH-AC6A` issued | pass |
| Inbox | Government desk | ticket in list as Received | found · Nuh | pass |
| Accept | **Accept ticket** | Under review (`triaged`) | Under review | pass |
| Assign | Sanitation & SBM · Er. Imran | Assigned | Assigned | pass |
| Start | **Start work** | In progress | In progress | pass |
| Proof | remarks only (no photo file) | Proof uploaded | Proof uploaded | pass |
| Track | last-4 `2345` | Proof uploaded + Yes/No | timeline to `proof_uploaded`; **Did the work get done?** | pass |
| Verify | **Yes** | Verified by you | audit: Citizen Verified Resolution; API `status: citizen_verified` | pass |

GET after verify:

```
status: citizen_verified
assignedDept: Sanitation & SBM
assignedOfficer: Er. Imran
citizenFeedback.verified: true
```

## Failures found

None on persist or illegal status jumps. Citizen status pill is now `role="status"` so the label is announced.

## Not in this proof

Closing from the officer desk after verify (HTTP test covers `closed`). Bhashini, GatiShakti, and NITI buttons were not required for this loop.
