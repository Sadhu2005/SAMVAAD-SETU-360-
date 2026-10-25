import { describe, it, expect } from 'vitest';
import express, { Request, Response } from 'express';
import {
  submitCitizenCase,
  getCaseByTrackingId,
  getAllCases,
  updateCaseByOfficer,
  citizenVerifyResolution
} from '../../services/caseService';

function createTestServer() {
  const app = express();
  app.use(express.json());

  const v1 = express.Router();
  v1.use((_req: Request, res: Response, next) => {
    res.setHeader('X-API-Version', '1.0.0');
    next();
  });

  v1.get('/cases', async (_req, res) => {
    const list = await getAllCases();
    res.json({ success: true, count: list.length, cases: list });
  });

  v1.post('/cases', async (req, res) => {
    const { title, description, category, district, state, contactNumber } = req.body;
    if (!title || !description || !category || !district || !state || !contactNumber) {
      return res.status(400).json({ success: false, error: 'Missing fields' });
    }
    const c = await submitCitizenCase(req.body);
    res.status(201).json({ success: true, trackingId: c.trackingId, case: c });
  });

  v1.get('/cases/:trackingId', async (req, res) => {
    const r = await getCaseByTrackingId(req.params.trackingId);
    if (!r.caseData) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, case: r.caseData, auditLogs: r.auditLogs });
  });

  v1.patch('/cases/:trackingId', async (req, res) => {
    const updated = await updateCaseByOfficer({
      trackingId: req.params.trackingId,
      status: req.body.status,
      officerName: req.body.officerName || 'Inspector Verma',
      officerRole: 'field_officer',
      remarks: req.body.remarks || 'Status update',
    });
    res.json({ success: true, case: updated });
  });

  v1.post('/cases/:trackingId/verify', async (req, res) => {
    const updated = await citizenVerifyResolution({
      trackingId: req.params.trackingId,
      verified: req.body.verified,
    });
    res.json({ success: true, case: updated });
  });

  app.use('/api/v1', v1);
  return app;
}

describe('Integration Test: API v1 Citizen Case Routes', () => {
  const app = createTestServer();

  it('should support creating a real citizen case via POST /api/v1/cases and return tracking ID', async () => {
    let headers: Record<string, string> = {};
    let statusCode = 200;
    let jsonBody: any = null;

    const req = {
      method: 'POST',
      url: '/api/v1/cases',
      body: {
        title: 'Bridge scouring during monsoon',
        description: 'Pier scouring cut off access to primary healthcare center',
        category: 'Bridges & Culverts',
        district: 'Dantewada',
        state: 'Chhattisgarh',
        contactNumber: '9876543210',
      },
    } as any;

    await new Promise<void>((resolve) => {
      const res = {
        setHeader: (k: string, v: string) => { headers[k] = v; },
        status: (c: number) => { statusCode = c; return res; },
        json: (d: any) => {
          jsonBody = d;
          resolve();
          return res;
        },
      } as any;
      app(req, res, () => resolve());
    });

    expect(headers['X-API-Version']).toBe('1.0.0');
    expect(statusCode).toBe(201);
    expect(jsonBody.success).toBe(true);
    expect(jsonBody.trackingId).toMatch(/^SETU-2026-CH-DAN-[A-F0-9]{4}$/);
    expect(jsonBody.case.status).toBe('submitted');
  });

  it('should return 400 when mandatory intake fields are missing', async () => {
    let statusCode = 200;
    let jsonBody: any = null;

    const req = {
      method: 'POST',
      url: '/api/v1/cases',
      body: { title: 'Missing description and location' },
    } as any;

    await new Promise<void>((resolve) => {
      const res = {
        setHeader: () => {},
        status: (c: number) => { statusCode = c; return res; },
        json: (d: any) => {
          jsonBody = d;
          resolve();
          return res;
        },
      } as any;
      app(req, res, () => resolve());
    });

    expect(statusCode).toBe(400);
    expect(jsonBody.success).toBe(false);
  });
});
