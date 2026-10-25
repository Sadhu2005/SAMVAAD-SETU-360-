# NITI Aayog demographic indices (SAMVAAD-SETU 360°)

District-level **Multi-Dimensional Poverty Index (MPI)** and **Aspirational District Programme (ADP)** flags drive **DIEW** (Demographic-Inverse Equity Weighting) and the ticket **DIPS** score. Data is served from a bundled snapshot aligned with NITI Aayog public indicators—no browser keys.

## Automatic enrichment

New citizen tickets call `applyNitiEnrichmentToCase` on submit when state/district resolve via the India LGD master.

## APIs

| Method | Path | Notes |
|--------|------|--------|
| GET | `/api/v1/niti/indices/summary` | Bundle size, ADP program total (112 districts) |
| GET | `/api/v1/niti/district?state=&district=` | MPI, deficit, DIEW multiplier, adjusted DIPS |
| GET | `/api/v1/niti/aspirational-districts` | Bundled aspirational rows |
| POST | `/api/v1/niti/enrich-ticket` | Officer PIN; recomputes and persists on case |

## Officer desk

**Refresh NITI indices** on the Command Desk recomputes MPI/DIEW and updates `dipsScore` and `mpiDeficitMultiplier`.

## Health

`GET /api/v1/health` includes `nitiIndicesBundled`.

## CI

GitHub Actions workflow `.github/workflows/ci.yml` runs **separate jobs** (Typecheck, Governance audit, Unit / Integration / Regression / Functional tests, then **CI passed**) on push and pull requests. Locally, `npm run test:all` still runs the full pipeline in one command.
