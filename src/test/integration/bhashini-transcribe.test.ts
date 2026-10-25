import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import express from 'express';
import { isBhashiniConfigured } from '../../services/bhashiniService';

function createBhashiniApp() {
  const app = express();
  app.use(express.json());
  const v1 = express.Router();
  const pin = 'setu-desk-2026';

  v1.use((_req, res, next) => {
    res.setHeader('X-API-Version', '1.0.0');
    next();
  });

  v1.post('/bhashini/transcribe', (req, res) => {
    if (req.headers['x-officer-pin'] !== pin) {
      return res.status(401).json({ success: false, error: 'Officer desk PIN required' });
    }
    if (!isBhashiniConfigured()) {
      return res.status(503).json({ success: false, error: 'Bhashini is not configured on the server.' });
    }
    return res.json({ success: true, source: 'bhashini', transcript: 'ok' });
  });

  app.use('/api/v1', v1);
  return app;
}

describe('Integration: POST /api/v1/bhashini/transcribe', () => {
  const env = { ...process.env };

  beforeEach(() => {
    delete process.env.BHASHINI_USER_ID;
    delete process.env.BHASHINI_ULCA_API_KEY;
    delete process.env.BHASHINI_PIPELINE_ID;
  });

  afterEach(() => {
    process.env = { ...env };
  });

  it('returns 503 when Bhashini env is not set', async () => {
    const app = createBhashiniApp();
    const server = app.listen(0);
    const port = (server.address() as { port: number }).port;
    try {
      const res = await fetch(`http://127.0.0.1:${port}/api/v1/bhashini/transcribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Officer-Pin': 'setu-desk-2026',
        },
        body: JSON.stringify({ trackingId: 'SETU-2026-HR-NUH-0001' }),
      });
      expect(res.headers.get('X-API-Version')).toBe('1.0.0');
      expect(res.status).toBe(503);
    } finally {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });
});
