import { describe, it, expect } from 'vitest';
import express, { Request, Response } from 'express';
import { submitCitizenCase } from '../../services/caseService';
import { getDistrictsFromStore, getStatesFromStore } from '../../services/geoService';

function createGeoApp() {
  const app = express();
  app.use(express.json());
  const v1 = express.Router();
  v1.use((_req: Request, res: Response, next) => {
    res.setHeader('X-API-Version', '1.0.0');
    next();
  });
  v1.get('/geo/states', async (_req, res) => {
    const states = await getStatesFromStore();
    res.json({ success: true, count: states.length, states });
  });
  v1.get('/geo/districts', async (req, res) => {
    const raw = String(req.query.stateCode || '');
    const stateCode = raw ? Number(raw) : undefined;
    if (raw && (!Number.isInteger(stateCode) || Number(stateCode) <= 0)) {
      return res.status(400).json({ success: false, error: 'stateCode must be a positive LGD integer' });
    }
    const districts = await getDistrictsFromStore(stateCode);
    res.json({ success: true, count: districts.length, districts });
  });
  v1.post('/tickets', async (req, res) => {
    try {
      const c = await submitCitizenCase(req.body);
      res.status(201).json({ success: true, trackingId: c.trackingId, case: c });
    } catch (e: any) {
      const message = e.message || 'Submit failed';
      const status = /unknown state or district/i.test(message) ? 400 : 500;
      res.status(status).json({ success: false, error: message });
    }
  });
  app.use('/api/v1', v1);
  return app;
}

async function invoke(app: any, req: any): Promise<{ status: number; body: any; headers: Record<string, string> }> {
  return new Promise((resolve) => {
    let status = 200;
    let body: any = null;
    const headers: Record<string, string> = {};
    const res = {
      setHeader: (k: string, v: string) => {
        headers[k] = v;
      },
      status: (c: number) => {
        status = c;
        return res;
      },
      json: (d: any) => {
        body = d;
        resolve({ status, body, headers });
        return res;
      },
    };
    app(req, res, () => resolve({ status, body, headers }));
  });
}

describe('Integration: GET geo master and ticket geo validation', () => {
  const app = createGeoApp();

  it('returns India states and Chhattisgarh districts with API version', async () => {
    const states = await invoke(app, { method: 'GET', url: '/api/v1/geo/states' });
    expect(states.status).toBe(200);
    expect(states.headers['X-API-Version']).toBe('1.0.0');
    expect(states.body.count).toBe(36);
    expect(states.body.states.some((s: any) => s.isoCode === 'CG')).toBe(true);

    const districts = await invoke(app, {
      method: 'GET',
      url: '/api/v1/geo/districts?stateCode=22',
      query: { stateCode: '22' },
    });
    expect(districts.headers['X-API-Version']).toBe('1.0.0');
    expect(districts.body.districts.some((d: any) => d.name === 'Bastar' && d.lgdCode === 384)).toBe(true);
    expect(districts.body.districts.every((d: any) => d.stateLgdCode === 22)).toBe(true);
  });

  it('rejects ticket submit for an unknown district with 400', async () => {
    const bad = await invoke(app, {
      method: 'POST',
      url: '/api/v1/tickets',
      body: {
        title: 'Unknown place',
        description: 'Should 400',
        category: 'Bridges & Culverts',
        district: 'Atlantis',
        state: 'Chhattisgarh',
        contactNumber: '9000022223',
      },
    });
    expect(bad.status).toBe(400);
    expect(bad.body.error).toMatch(/Unknown state or district/);
  });
});
