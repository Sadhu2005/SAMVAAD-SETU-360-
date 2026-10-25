# India geo master

Operational State and District lists come from a bundled LGD-style snapshot:

- State / UT codes follow the Ministry of Panchayati Raj Local Government Directory.
- District names are a public India snapshot (LGD / data.gov.in style), with aliases for renamed districts (Nuh / Mewat, Gurugram / Gurgaon, Dantewada).

Runtime:

- Firestore collections `geo_states` and `geo_districts` are read first when present.
- If those collections are empty or Firebase is offline, the app serves `src/data/indiaGeo.ts`.

Do not call `api.data.gov.in` from the browser. A live refresh would need an owner `DATA_GOV_IN_API_KEY` on the server.

Regenerate the bundle:

```
node src/data/buildIndiaGeo.mjs
```
