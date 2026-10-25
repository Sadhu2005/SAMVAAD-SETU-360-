---
name: engineering-workflow
description: >
  Autonomous end-to-end engineering discipline skill for software agents.
  Enforces 4-tier automated testing (Unit, Integration, Regression, Functional)
  for every feature file, strict versioned Git branching (feature/v1.1.0-name),
  pre-commit .gitignore hygiene audits, Conventional Commits, and /api/v1/ 
  semantic API versioning.
---

# Unified Engineering, Testing & Git Lifecycle Skill

This skill enforces strict, production-grade engineering discipline across all coding, testing, version control, and API deployment tasks.

---

## 1. When to Apply This Skill
- **Starting Any New Feature**: When creating new modules, pages, or components.
- **Implementing Code Changes**: When authoring or refactoring business logic or backend endpoints.
- **Testing & Quality Assurance**: Every time a feature is created or edited.
- **Git Operations**: Whenever committing, branching, ignoring files, or pushing code.
- **API Development**: Whenever exposing, consuming, or modifying server endpoints.

---

## 2. Core Rule 0: Mandatory Agent Registration in /work-items.json
**CRITICAL**: `/work-items.json` is the sole authoritative ledger for all agent operations. Before modifying any code, the agent MUST register and claim its work item:

1. **Check or Register Item**:
   - Inspect `/work-items.json`. If an item exists for the current task, note its `id`.
   - If starting a new feature, register it with a unique ID (`FEAT-XXX`, `GOV-XXX`, `DPI-XXX`), `risk_tier` (0-4), strict `scope.write_globs`, and acceptance criteria.
2. **Claim Item**:
   - Run: `node scripts/governance/register-work.js --claim <ID> <SESSION_ID>`
   - Status transitions from `queued` to `in_progress`.
   - **Scope Lock**: The agent must NEVER edit files outside its declared `write_globs`.
3. **Verify & Record Evidence**:
   - After running all tests, verify the work item:
   - Run: `node scripts/governance/register-work.js --verify <ID> "<evidence description>"`
   - Status transitions to `local_verified`.
4. **Audit**:
   - Run: `npm run gov:check` to ensure ledger integrity.

---

## 3. Core Rule 1: Mandatory 4-Tier Automated Testing
For **every single feature file** written, the agent MUST implement and execute all four levels of tests:

```
src/test/
├── unit/            # Isolated algorithmic correctness & mathematical proofs
├── integration/     # API contracts, routing, and inter-service data exchanges
├── regression/      # Edge cases, failure modes, anti-astroturfing, and degradation guardrails
└── functional/      # End-to-end user journey & multi-step transaction pipelines
```

### Test Standards by Tier:
1. **Unit Test (`src/test/unit/<feature>.test.ts`)**:
   - Tests pure functions, mathematical formulas (e.g. DIPS equity multipliers, tokenizers, sanitizers).
   - Zero network dependency, executes in < 20ms.
2. **Integration Test (`src/test/integration/<feature>.test.ts`)**:
   - Tests HTTP request/response lifecycles, Express middleware, status codes, and `X-API-Version` response headers.
3. **Regression Test (`src/test/regression/<feature>.test.ts`)**:
   - Tests previously identified vulnerabilities or real-world edge cases (e.g. bot swarm attacks, dialect misclassification, zero-connectivity fallbacks).
4. **Functional Test (`src/test/functional/<feature>.test.ts`)**:
   - Tests complete end-to-end user flows (e.g. Ingestion $\rightarrow$ De-noising $\rightarrow$ GIS Triangulation $\rightarrow$ Sanctioned DPR $\rightarrow$ IVR Callback).

### Execution Commands:
```bash
npm run test           # Run all vitest suites
npm run test:unit      # Run unit test suite only
npm run test:integration # Run integration test suite
npm run test:regression  # Run regression test suite
npm run test:functional  # Run functional test suite
npm run test:all       # Lint (tsc --noEmit) + full test suite execution
```
**Gate Requirement**: All 4 tiers must pass with **0 failures** before code is eligible for commit.

---

## 3. Core Rule 2: Versioned Git Branch Lifecycle

### 3.1 Feature Branch Creation
Never write new features directly on `main` without a dedicated versioned branch. Always branch off using the standardized format:
```bash
# Pattern: feature/v<Major>.<Minor>.<Patch>-<feature-name>
git switch -c feature/v1.1.0-resolution-pipeline
# Or fallback:
git checkout -b feature/v1.1.0-resolution-pipeline
```

### 3.2 Pre-Commit Hygiene & Automated `.gitignore` Audit
Before running `git add`:
1. Check untracked and modified files:
   ```bash
   git status
   ```
2. Inspect if any unneeded files appear in the untracked list:
   - Build artifacts (`dist/`, `build/`, `out/`, `server.js`)
   - Test artifacts (`coverage/`, `test-results/`, `playwright-report/`)
   - Secret keys or local env files (`.env`, `.env.local`, `.env.*.local`)
   - Temporary / OS / editor files (`.DS_Store`, `*.log`, `Thumbs.db`, `.cache/`, `.vite/`)
3. If unneeded files exist, immediately append them to `.gitignore` **before** staging:
   ```bash
   echo "unneeded-pattern/" >> .gitignore
   ```
4. Verify `git status` shows only clean source and documentation files.

### 3.3 Conventional Commit Standard
Every commit message must follow the Conventional Commits specification:
```
<type>(<scope>): <short imperative description>

[optional body explaining rationale and DPI impact]
[optional footer noting breaking changes or issue links]
```
- **Allowed Types**:
  - `feat`: New feature or user capability
  - `fix`: Bug fix or edge-case mitigation
  - `test`: Adding or refactoring Unit, Integration, Regression, or Functional tests
  - `docs`: Documentation, README, or API specification updates
  - `refactor`: Code reorganization without functional changes
  - `chore`: Tooling, dependencies, or `.gitignore` updates

---

## 4. Core Rule 3: Strict Semantic API Versioning (`/api/v1/`)

All backend APIs must maintain explicit semantic versioning:

### 4.1 Route Pattern
```
/api/v1/<resource>        # Active production contract
/api/v2/<resource>        # Next-gen breaking contract
```

### 4.2 Mandatory Version Headers
Every API response must include:
```http
X-API-Version: 1.0.0
X-API-Standard: DPG-BRICS-Track1
```

### 4.3 Version Contract Metadata
Expose `/api/v1/meta` providing machine-readable API capabilities:
```json
{
  "name": "SAMVAAD-SETU 360° DPI Engine API",
  "version": "1.0.0",
  "currentVersion": "v1",
  "supportedVersions": ["v1"],
  "deprecationPolicy": "180 days notice before endpoint decommissioning"
}
```

### 4.4 Breaking Change Protocol
If a data field schema is removed, renamed, or modified incompatibly:
1. Retain `/api/v1/` unchanged to prevent breaking legacy mobile clients, Gram Panchayat terminals, or IVR gateways.
2. Introduce `/api/v2/` with the new schema.
3. Document migration paths in `/api/v2/meta`.

---

## 5. End-to-End Workflow Checklist (Run Order)

When asked to implement any feature or update:

```
[ ] 1. Switch to a versioned branch:
       git switch -c feature/v1.1.0-<feature-name>

[ ] 2. Author the feature file(s) with clean TypeScript & Tailwind CSS.

[ ] 3. Expose backend endpoints with /api/v1/ prefix and X-API-Version headers.

[ ] 4. Author the 4 test tiers:
       - Unit test:        src/test/unit/<name>.test.ts
       - Integration test: src/test/integration/<name>.test.ts
       - Regression test:  src/test/regression/<name>.test.ts
       - Functional test:  src/test/functional/<name>.test.ts

[ ] 5. Run test suite:
       npm run test:all

[ ] 6. Inspect git cleanliness:
       git status
       (Append any unwanted temp/test/secret files to .gitignore)

[ ] 7. Stage and commit:
       git add <clean-files> .gitignore
       git commit -m "feat(<scope>): <description>"

[ ] 8. Verify compilation and app health:
       npm run check
```
