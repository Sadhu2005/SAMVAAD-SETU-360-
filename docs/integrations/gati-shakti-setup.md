# PM GatiShakti geospatial masterplan (SAMVAAD-SETU 360°)

Citizen tickets are triangulated against the **National Master Plan (NMMP)** layer taxonomy (**1,447 layers** in the server catalog across **28** ministry groups). Keys for live national GIS stay on the server only.

## What works without live GIS credentials

- `GET /api/v1/gati-shakti/catalog/summary` — total layer count and group metadata
- `GET /api/v1/gati-shakti/catalog?q=pmgsy` — search ministry layer groups
- Officer desk **Triangulate with GatiShakti** — point match against bundled NMMP sample assets, synergy score, cadastral hint, **UJWO** joint work order code
- Results persist on the Firestore `cases` document (`gatiShaktiAssetId`, `jointWorkOrderCode`, etc.)

## Optional live GIS connector

When your organisation has PM GatiShakti / Bhuvan API access, set on Cloud Run:

```env
GATISHAKTI_GIS_BASE_URL=https://your-approved-gis-endpoint
GATISHAKTI_API_KEY=your-server-key
```

`GET /api/v1/health` reports `gatiShaktiLiveGis: true` when both are set. The officer triangulation route still uses the bundled asset index until a live WMS/WFS adapter is approved for production.

## Officer API

- `POST /api/v1/gati-shakti/triangulate`
- Header: `X-Officer-Pin`
- Body: `{ "trackingId": "SETU-2026-...", "officerName": "..." }`

## References

- [PM GatiShakti National Master Plan](https://gatishakti.gov.in)
- Officer Command Desk and briefing tab **GatiShakti GIS**
