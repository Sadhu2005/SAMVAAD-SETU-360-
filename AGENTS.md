# Autonomous Agent Constitution & Execution Playbook

Welcome, Agent. This repository (**SAMVAAD-SETU 360°**) is governed by strict automated quality, testing, and lifecycle protocols. Regardless of your underlying AI model (Gemini, Claude, GPT, Cursor, Copilot, etc.), you **MUST** adhere to the following constitution before and during any code modifications.

---

## 1. Mandatory Skills & Knowledge Base
The repository contains specialized skill guides in `/skills` and `.claude/skills`:
- **Governance Ledger**: `/work-items.json`
- **Engineering Discipline**: `/skills/engineering_workflow/SKILL.md`
- **Code Quality & Checks**: `/skills/coding_check/SKILL.md`
- **UI/UX Design Intelligence**: `/skills/ui_ux_pro_max/SKILL.md` (79 styles, 192 palettes, 119 UX guidelines)

---

## 2. Mandatory Gate 0: Register in `/work-items.json`
Before touching any code:
1. Read `/work-items.json`.
2. Find or register your work item with unique ID (`FEAT-XXX`, `FIX-XXX`, `DPI-XXX`), risk tier, and declared `scope.write_globs`.
3. Claim the item using:
   ```bash
   node scripts/governance/register-work.js --claim <ID> <SESSION_ID>
   ```
4. **Scope Lock**: You are strictly prohibited from modifying files outside your declared `scope.write_globs`.

---

## 3. Mandatory Gate 1: Git Branch Lifecycle
Never work directly on `main` or `master`. Always switch to a versioned feature branch:
```bash
git switch -c feature/v1.X.X-<feature-name>
```

---

## 4. Mandatory Gate 2: 4-Tier Automated Testing
For **every single feature file** you create or modify, you MUST write or update tests across all four tiers in `src/test/`:
- **Unit Tests (`src/test/unit/`)**: Pure functions, mathematical formulas, data sanitization.
- **Integration Tests (`src/test/integration/`)**: API route contracts, middleware, `X-API-Version` headers.
- **Regression Tests (`src/test/regression/`)**: Real-world edge cases, bot swarm suppression, vulnerability guards.
- **Functional Tests (`src/test/functional/`)**: End-to-end multi-stage pipeline verification.

---

## 5. Mandatory Gate 3: API Semantic Versioning (`/api/v1/`)
- All backend routes in `server.ts` MUST be exposed under `/api/v1/...`.
- All API responses must return the header `X-API-Version: 1.0.0`.
- All public contract changes must be documented in `/api/v1/meta`.

---

## 6. Mandatory Gate 4: Verification & Git Hygiene
Before committing or creating a pull request:
1. Run the full verification suite:
   ```bash
   npm run test:all
   ```
   *(Must pass TypeScript lint, governance audit, and all 4 test tiers with 0 failures)*
2. Check untracked files with `git status`. Ensure no temporary, secret, log, or coverage files are staged. If unneeded files exist, add them to `.gitignore`.
3. Verify your work item in the ledger:
   ```bash
   node scripts/governance/register-work.js --verify <ID> "All tests passed with 0 errors"
   ```
4. Commit using Conventional Commits:
   ```bash
   git commit -m "feat(<scope>): <description>"
   ```
