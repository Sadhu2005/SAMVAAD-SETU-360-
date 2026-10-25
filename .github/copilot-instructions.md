# GitHub Copilot Instructions for SAMVAAD-SETU 360°

When generating code or proposing changes in this repository:
1. Always check `/work-items.json` for active task definitions and write scopes.
2. Follow the 4-tier testing pattern: each feature requires Unit, Integration, Regression, and Functional tests in `src/test/`.
3. Follow the `/api/v1/` endpoint convention with `X-API-Version` response headers.
4. Adhere to the design system and UX guidelines in `skills/ui_ux_pro_max/SKILL.md`.
5. Run `npm run test:all` before finalizing suggestions.
