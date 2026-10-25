# Implementation Plan: Unified Engineering Workflow & Testing Skill

Establish a comprehensive, automated engineering workflow skill that enforces Test-Driven Quality Assurance (Unit, Integration, Regression, and Functional tests), versioned Git branch lifecycles, automated `.gitignore` cleanup, conventional commits, and strict API semantic versioning.

---

## 1. Objectives & Scope

1. **Multi-Tier Testing Infrastructure**:
   - Install and configure **Vitest** + **React Testing Library** + **JSDOM** for fast in-memory Unit, Integration, and Regression testing.
   - Configure functional test runners and test scripts in `package.json`.
   - Implement sample test suites for the platform:
     - **Unit Tests**: Mathematical DIPS scoring formula, DPDP Act 2023 PII tokenization, language routing.
     - **Integration Tests**: Express `/api/v1/...` backend endpoints, mock external services.
     - **Regression Tests**: Anti-astroturfing contractor cartel suppression, edge-case dialect handling.
     - **Functional Tests**: End-to-end citizen feedback to sanctioned DPR pipeline.

2. **API Versioning Discipline**:
   - Standardize backend routes under `/api/v1/...` with `X-API-Version` response headers.
   - Codify rules for introducing `/api/v2/...` when breaking contract changes occur.

3. **Git Hygiene & Branching Protocol**:
   - Automatic versioned branch creation pattern: `feature/v1.1.0-feature-name`.
   - Pre-commit scanning: check `git status`, identify unneeded/sensitive/temporary files, and auto-append them to `.gitignore`.
   - Strict Conventional Commits: `feat(scope): ...`, `fix(scope): ...`, `test(scope): ...`.

4. **Agent Skill Definition (`SKILL.md`)**:
   - Create `skills/engineering_workflow/SKILL.md` and `.claude/skills/engineering-workflow/SKILL.md`.
   - Document trigger conditions, step-by-step commands, validation gates, and error remediation workflows.

---

## 2. Proposed Implementation Steps

### Phase 1: Testing Framework Installation & Configuration
- Install Vitest, `@testing-library/react`, `@testing-library/jest-dom`, and `jsdom` via `install_applet_package`.
- Create `vitest.config.ts` and `src/test/setup.ts`.
- Add test scripts to `package.json`:
  ```json
  "test": "vitest run",
  "test:unit": "vitest run src/test/unit",
  "test:integration": "vitest run src/test/integration",
  "test:regression": "vitest run src/test/regression",
  "test:functional": "vitest run src/test/functional",
  "test:all": "npm run lint && vitest run"
  ```

### Phase 2: Core Test Suites Implementation
- Write `src/test/unit/dips-scoring.test.ts` (verifying mathematical equity scoring and MPI multiplier).
- Write `src/test/unit/dpdp-tokenization.test.ts` (verifying zero PII leakage under DPDP Act 2023).
- Write `src/test/integration/api-v1-routes.test.ts` (testing `/api/v1/health` and feedback submission routes).
- Write `src/test/regression/cartel-suppression.test.ts` (testing bot swarm detection edge cases).
- Write `src/test/functional/resolution-pipeline.test.ts` (testing full citizen-to-DPR flow).

### Phase 3: Backend API Versioning Alignment
- Update `server.ts` to ensure all API endpoints are formally routed under `/api/v1/` with API version headers and backwards-compatible routing.

### Phase 4: Git Hygiene & `.gitignore` Automation
- Update `.gitignore` with comprehensive exclusions (coverage, test logs, `.env.local`, debug logs, temp files).
- Document automated git cleanliness check scripts.

### Phase 5: Author the Agent Skill (`SKILL.md`)
- Author `skills/engineering_workflow/SKILL.md` and `.claude/skills/engineering-workflow/SKILL.md` detailing:
  - Phase 1: Branch switching (`git switch -c feature/v1.1.0-<name>`).
  - Phase 2: Feature & Test implementation (mandatory Unit, Integration, Regression, and Functional tests for every new feature).
  - Phase 3: Verification (`npm run test:all` and `npm run check`).
  - Phase 4: `.gitignore` audit & git status review.
  - Phase 5: Conventional Commit & Push.

---

## 3. Verification Plan

1. Run `npm run test:unit`, `npm run test:integration`, `npm run test:regression`, `npm run test:functional`.
2. Run `npm run test:all` to ensure all 4 test categories pass with 0 failures.
3. Run `npm run check` (Lint + Build) to ensure total compilation health.
4. Verify that the agent skill is recognized and discoverable in `skills/` and `.claude/skills/`.
