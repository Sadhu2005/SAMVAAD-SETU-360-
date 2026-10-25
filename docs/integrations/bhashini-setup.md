# Bhashini ULCA setup (SAMVAAD-SETU 360°)

Operational voice transcription uses **server-side** [Bhashini ULCA](https://bhashini.gitbook.io/bhashini-apis) only. Keys never go in the browser or `VITE_*` variables.

## 1. Get credentials

1. Register / sign in at [bhashini.gov.in](https://bhashini.gov.in).
2. Open **My Profile** and copy:
   - **userID**
   - **ulcaApiKey**
3. In the ULCA portal, choose or create a pipeline that supports **ASR only** (or ASR+NMT if you will extend later). Copy the **pipeline ID**.

## 2. Server environment

Set on your machine (`.env`) and on **Cloud Run / AI Studio secrets**:

```env
BHASHINI_USER_ID=your-user-id
BHASHINI_ULCA_API_KEY=your-ulca-api-key
BHASHINI_PIPELINE_ID=your-pipeline-id
BHASHINI_SOURCE_LANGUAGE=hi
```

Optional: `BHASHINI_CONFIG_URL`, `BHASHINI_SAMPLING_RATE` (default `16000`).

## 3. Verify

- `GET /api/v1/health` → `"bhashiniConfigured": true`
- Officer Command Desk → ticket with a citizen **voice note** → **Transcribe voice (Bhashini)**
- Success stores `voiceTranscript` on the Firestore `cases` document and an audit log entry.

## 4. If credentials are not available yet

The app still runs. Transcribe returns **503** with a clear message; citizens can use text title/description and officers use **Gemini desk assist** (rules fallback without `GEMINI_API_KEY`).

## API

- `POST /api/v1/bhashini/transcribe`
- Header: `X-Officer-Pin` (same as officer inbox)
- Body: `{ "trackingId": "SETU-2026-...", "officerName": "..." }`
