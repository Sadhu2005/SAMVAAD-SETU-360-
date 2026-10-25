# CLAUDE.md - Developer and Agent Guide for SAMVAAD-SETU 360°

## Workflow Commands
- `npm run check` - Type checking and production bundle build
- `npm run test` - Run all Vitest test suites
- `npm run test:unit` - Run unit tests only
- `npm run test:integration` - Run integration tests only
- `npm run test:regression` - Run regression tests only
- `npm run test:functional` - Run functional tests only
- `npm run test:all` - Full verification pipeline (Lint + Governance Audit + All Tests)
- `npm run gov:check` - Validate work-items.json schema and dependencies
- `npm run gov:list` - Display active work items table

## Architecture & Governance
1. **Authoritative Ledger**: `/work-items.json`
2. **Branching**: `feature/v1.X.X-<name>`
3. **API Standards**: All endpoints mounted on `/api/v1/` with `X-API-Version: 1.0.0`
4. **Skills**:
   - `skills/engineering_workflow/SKILL.md`
   - `skills/coding_check/SKILL.md`
   - `skills/ui_ux_pro_max/SKILL.md`
