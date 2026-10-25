import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import express, { Request, Response } from 'express';
import { computeDeskAssist } from '../../services/deskAssistService';

function createDeskAssistApp() {
  const app = express();
  app.use(express.json());
  const v1 = express.Router();
  const pin = 'setu-desk-2026';

  v1.use((_req: Request, res: Response, next) => {
    res.setHeader('X-API-Version', '1.0.0');
    next();
  });

  v1.post('/gemini/desk-assist', async (req, res) => {
    const headerPin = String(req.headers['x-officer-pin'] || '');
    if (headerPin !== pin) {
      return res.status(401).json({ success: false, error: 'Officer desk PIN required' });
    }
    if (!req.body?.title || !req.body?.description) {
      return res.status(400).json({ success: false, error: 'Provide trackingId or both title and description' });
    }
    const result = await computeDeskAssist(req.body);
    return res.json({ success: true, source: result.source, assist: result.assist });
  });

  app.use('/api/v1', v1);
  return app;
}

describe('Integration: POST /api/v1/gemini/desk-assist', () => {
  const originalEnabled = process.env.GEMINI_ENABLED;
  const originalKey = process.env.GEMINI_API_KEY;

  beforeEach(() => {
    process.env.GEMINI_ENABLED = 'false';
    process.env.GEMINI_API_KEY = '';
  });

  afterEach(() => {
    process.env.GEMINI_ENABLED = originalEnabled;
    process.env.GEMINI_API_KEY = originalKey;
  });

  it('returns rules-based assist with version header when PIN is valid', async () => {
    const app = createDeskAssistApp();
    const server = app.listen(0);
    const port = (server.address() as { port: number }).port;

    try {
      const res = await fetch(`http://127.0.0.1:${port}/api/v1/gemini/desk-assist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Officer-Pin': 'setu-desk-2026',
        },
        body: JSON.stringify({
          title: 'Open drain',
          description: 'Stagnant water near school',
          category: 'Sanitation & Drainage',
          district: 'Nuh',
          state: 'Haryana',
          urgency: 'High',
          status: 'submitted',
        }),
      });
      expect(res.headers.get('X-API-Version')).toBe('1.0.0');
      const data = await res.json();
      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.source).toBe('rules');
      expect(data.assist.suggestedDepartment).toBe('Sanitation & SBM');
      expect(data.assist.summary).toMatch(/Open drain/);
    } finally {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });

  it('rejects missing officer PIN', async () => {
    const app = createDeskAssistApp();
    const server = app.listen(0);
    const port = (server.address() as { port: number }).port;

    try {
      const res = await fetch(`http://127.0.0.1:${port}/api/v1/gemini/desk-assist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'x', description: 'y', category: 'Sanitation & Drainage', district: 'Nuh', state: 'Haryana' }),
      });
      expect(res.status).toBe(401);
    } finally {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });
});
