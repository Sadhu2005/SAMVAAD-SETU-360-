# Implementation Plan: Live Citizen Intake, Tracking Identity & Government Work Surface

Transform the prototype from a narrative simulator into an operational, two-sided Digital Public Infrastructure platform where real citizens submit development needs, receive durable tracking IDs, track progress in real-time, and verify resolution proofs against an active government departmental work surface.

---

## 1. Scope & Capabilities to Build

This plan directly addresses all 8 operational gaps identified in the audit:

1. **Persistent Citizen Intake Engine (Gap 1 & 7)**:
   - Real intake form capturing location, vernacular voice/text narrative, category (Roads/Bridges, Water, Power, Healthcare), urgency, and channel (Web, WhatsApp, IVR 1912, CSC).
   - DPDP Act 2023 privacy tokenization: citizen contact is pseudonymized into a tamper-proof hash while preserving public DPG transparency.

2. **Durable Public Tracking Identity (Gap 2)**:
   - Cryptographic tracking ID format: `SETU-2026-<STATE>-<DIST>-<RANDOM_HEX>` (e.g. `SETU-2026-CG-BST-8F3A`).
   - "Citizen Track & Verify" portal: retrieve complete case lifecycle, assigned department, SLA clock, and status history anytime without session loss.

3. **Government Departmental Work Surface (Gap 4)**:
   - Dedicated Officer Dashboard with live case queues filtered by Department (State PWD, Jal Jeevan, Health, Electricity, PMGSY) and District.
   - Operational actions: Accept ticket, Assign nodal engineer, Update status, Set statutory SLA deadline, and Upload site completion evidence/photos.

4. **Connected Closed-Loop Resolution (Gap 3 & 5)**:
   - Unified persistent case object shared synchronously between citizen and government.
   - Citizen resolution sign-off: Citizen reviews uploaded work proofs and clicks "Confirm Resolution" or "Contest / Escalate".

5. **Persistence & Audit Trail Layer (Gap 6)**:
   - Firebase Firestore persistence (`/cases` collection) with real-time updates and chronological audit logs (`/cases/{id}/audit_logs`).

6. **Versioned API Endpoints (`/api/v1/cases/*`) (Gap 8)**:
   - `POST /api/v1/cases`: Submit citizen need and generate tracking ID.
   - `GET /api/v1/cases/:trackingId`: Retrieve case status and audit trail.
   - `PATCH /api/v1/cases/:trackingId`: Officer action (status update, assignment, proof upload).
   - `POST /api/v1/cases/:trackingId/verify`: Citizen confirmation sign-off.

---

## 2. Engineering Governance & Lifecycle Protocol

Following our repository's `skills/engineering_workflow/SKILL.md` constitution:
- **Branch Creation**: `git switch -c feature/v1.2.0-operational-capabilities`
- **Governance Registration**: Register `FEAT-001` in `/work-items.json` before touching code.
- **4-Tier Testing**: Author matching Unit, Integration, Regression, and Functional test suites.
- **Verification Gate**: Run `npm run test:all` (Lint + Governance check + all Vitest suites) with 0 errors.
- **Clean Git Commit**: Audit `git status` against `.gitignore` and commit with Conventional Commits.

---

## 3. Step-by-Step Execution Phases

### Phase 1: Git Branch & Governance Registration
1. Execute `git switch -c feature/v1.2.0-operational-capabilities`.
2. Register work item `FEAT-001` in `/work-items.json` and claim it with active session ID.

### Phase 2: Firebase Firestore Data Layer & Schema
1. Provision Firebase Firestore database via interactive Firebase setup workflow.
2. Define TypeScript data model:
   - `CitizenCase`: ID, trackingId, citizenToken, category, district, state, description, channel, status, dipsScore, assignedDept, assignedOfficer, slaDeadline, completionProof, citizenSignOff.
   - `AuditLogEntry`: timestamp, actorType ('citizen' | 'officer' | 'system'), action, details, evidence.
3. Configure Firestore security rules and client/server SDK helpers with fallback to persistent local store if offline.

### Phase 3: Backend API v1 Endpoints (`server.ts`)
1. Implement `/api/v1/cases` (POST, GET).
2. Implement `/api/v1/cases/:trackingId` (GET, PATCH).
3. Implement `/api/v1/cases/:trackingId/verify` (POST).
4. Update `/api/v1/meta` with case management endpoint contracts and version headers.

### Phase 4: Frontend Citizen & Government Work Surfaces
1. **Citizen Portal ("Raise Need" & "Track Request")**:
   - Interactive intake with live voice recording / dialect selector.
   - Receipt modal displaying generated `SETU-2026-XX-XXXX` tracking badge, QR code, and SMS simulation.
   - Public tracking lookup screen displaying step-by-step progress, officer remarks, and verification button.
2. **Government Departmental Console**:
   - Filterable real-time inbox: New Cases, In Progress, Awaiting Citizen Verification, Resolved.
   - SLA countdown timers with amber/red breach warnings.
   - Quick action drawer: Assign Engineer, Update Stage, Upload Site Photo Proof.

### Phase 5: Multi-Tier Automated Test Suites
1. **Unit Test (`src/test/unit/case-lifecycle.test.ts`)**:
   - State machine transition validation (`SUBMITTED` $\rightarrow$ `ASSIGNED` $\rightarrow$ `IN_PROGRESS` $\rightarrow$ `RESOLVED` $\rightarrow$ `CLOSED`).
   - Tracking ID regex validation and DPDP hash collision resistance.
2. **Integration Test (`src/test/integration/cases-api.test.ts`)**:
   - Tests `/api/v1/cases` submission, lookup, officer update, and citizen verification HTTP flows.
3. **Regression Test (`src/test/regression/case-state-guards.test.ts`)**:
   - Prevents unauthorized status skips (e.g. closing an unassigned case or verifying without completion proof).
4. **Functional Test (`src/test/functional/citizen-officer-lifecycle.test.ts`)**:
   - Full end-to-end journey: Citizen files request $\rightarrow$ Officer accepts & uploads proof $\rightarrow$ Citizen verifies resolution $\rightarrow$ Ticket closed with audit hash.

### Phase 6: Verification, Governance Sign-off & Git Commit
1. Run `npm run test:all`.
2. Run `npm run check` (Lint + Vite build).
3. Verify work item `FEAT-001` via `node scripts/governance/register-work.js --verify FEAT-001 "All operational flows and 4-tier tests verified"`.
4. Check `git status`, ensure clean working tree, and commit changes on `feature/v1.2.0-operational-capabilities`.
