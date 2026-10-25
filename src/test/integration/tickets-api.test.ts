import { describe, it, expect } from 'vitest';
import express, { Request, Response } from 'express';
import {
  submitCitizenCase,
  getCaseByTrackingId,
  getAllCases,
  updateCaseByOfficer,
  attachCitizenMedia,
  citizenVerifyResolution,
  filterOfficerInbox,
} from '../../services/caseService';
import { last4Matches, maskCaseForPublic } from '../../utils/ticketLogic';

function createTicketApp() {
  const app = express();
  app.use(express.json());
  const v1 = express.Router();
  v1.use((_req: Request, res: Response, next) => {
    res.setHeader('X-API-Version', '1.0.0');
    next();
  });

  const pin = 'setu-desk-2026';
  const requirePin = (req: Request, res: Response) => {
    if ((req.headers || {})['x-officer-pin'] !== pin) {
      res.status(401).json({ success: false, error: 'Officer desk PIN required' });
      return false;
    }
    return true;
  };

  v1.post('/tickets', async (req, res) => {
    const { title, description, category, district, state, contactNumber } = req.body;
    if (!title || !description || !category || !district || !state || !contactNumber) {
      return res.status(400).json({ success: false, error: 'Missing fields' });
    }
    const c = await submitCitizenCase(req.body);
    res.status(201).json({ success: true, trackingId: c.trackingId, case: c });
  });

  v1.get('/tickets/:id', async (req, res) => {
    const r = await getCaseByTrackingId(req.params.id);
    if (!r.caseData) return res.status(404).json({ success: false, error: 'Not found' });
    const last4 = String(req.query.last4 || '');
    const reveal = last4 && r.caseData.phoneLast4 ? last4Matches(r.caseData.phoneLast4, last4) : false;
    res.json({
      success: true,
      masked: !reveal,
      case: maskCaseForPublic(r.caseData, reveal),
      auditLogs: reveal ? r.auditLogs : r.auditLogs.map((l) => ({ ...l, details: l.action })),
    });
  });

  v1.get('/officer/inbox', async (req, res) => {
    if (!requirePin(req, res)) return;
    const cases = filterOfficerInbox(await getAllCases(), {
      district: req.query.district as string | undefined,
    });
    res.json({ success: true, cases });
  });

  v1.post('/tickets/:id/media', async (req, res) => {
    try {
      const updated = await attachCitizenMedia({
        trackingId: req.params.id,
        last4: String(req.body.last4 || ''),
        voiceUrl: req.body.voiceUrl,
        photoUrl: req.body.photoUrl,
      });
      res.status(201).json({ success: true, case: updated });
    } catch (e: any) {
      res.status(400).json({ success: false, error: e.message });
    }
  });

  v1.post('/tickets/:id/verify', async (req, res) => {
    const updated = await citizenVerifyResolution({
      trackingId: req.params.id,
      verified: req.body.verified,
      last4: req.body.last4,
    });
    res.json({ success: true, case: updated });
  });

  v1.post('/tickets/:id/action', async (req, res) => {
    if (!requirePin(req, res)) return;
    try {
      const updated = await updateCaseByOfficer({
        trackingId: req.params.id,
        status: req.body.status,
        officerName: req.body.officerName || 'Officer',
        officerRole: 'district_admin',
        officerRoleKey: req.body.officerRoleKey,
        remarks: req.body.remarks || 'update',
        closeOverrideReason: req.body.closeOverrideReason,
        completionProof: req.body.completionProof,
      });
      res.json({ success: true, case: updated });
    } catch (e: any) {
      res.status(400).json({ success: false, error: e.message });
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
      setHeader: (k: string, v: string) => { headers[k] = v; },
      status: (c: number) => { status = c; return res; },
      json: (d: any) => { body = d; resolve({ status, body, headers }); return res; },
    };
    app(req, res, () => resolve({ status, body, headers }));
  });
}

describe('Integration: ticket aliases, inbox PIN, verify, close reject', () => {
  const app = createTicketApp();

  it('creates via POST /api/v1/tickets and masks public GET without last4', async () => {
    const created = await invoke(app, {
      method: 'POST',
      url: '/api/v1/tickets',
      body: {
        title: 'Canal breach',
        description: 'Saline water in fields',
        category: 'Sanitation & Drainage',
        district: 'Kalahandi',
        state: 'Odisha',
        contactNumber: '9000012345',
      },
    });
    expect(created.status).toBe(201);
    expect(created.body.trackingId).toMatch(/^SETU-2026-/);
    expect(created.headers['X-API-Version']).toBe('1.0.0');

    const publicGet = await invoke(app, {
      method: 'GET',
      url: `/api/v1/tickets/${created.body.trackingId}`,
      query: {},
      params: { id: created.body.trackingId },
    });
    expect(publicGet.body.masked).toBe(true);
    expect(publicGet.body.case.phoneLast4).toBeUndefined();
  });

  it('rejects officer inbox without PIN and rejects close without citizen OK', async () => {
    const inboxNoPin = await invoke(app, { method: 'GET', url: '/api/v1/officer/inbox', headers: {} });
    expect(inboxNoPin.status).toBe(401);

    const created = await invoke(app, {
      method: 'POST',
      url: '/api/v1/tickets',
      body: {
        title: 'Feeder down',
        description: 'No power at PHC',
        category: 'Power & Electrification',
        district: 'Nuh',
        state: 'Haryana',
        contactNumber: '8111122223',
      },
    });

    const close = await invoke(app, {
      method: 'POST',
      url: `/api/v1/tickets/${created.body.trackingId}/action`,
      headers: { 'x-officer-pin': 'setu-desk-2026' },
      params: { id: created.body.trackingId },
      body: { status: 'closed', officerName: 'Collector' },
    });
    expect(close.status).toBe(400);
    expect(close.body.success).toBe(false);
  });

  it('attaches media via POST /api/v1/tickets/:id/media with version header', async () => {
    const created = await invoke(app, {
      method: 'POST',
      url: '/api/v1/tickets',
      body: {
        title: 'Snapped feeder',
        description: 'No evening supply',
        category: 'Power & Electrification',
        district: 'Nuh',
        state: 'Haryana',
        contactNumber: '8111100009',
      },
    });
    const media = await invoke(app, {
      method: 'POST',
      url: `/api/v1/tickets/${created.body.trackingId}/media`,
      params: { id: created.body.trackingId },
      body: { last4: '0009', photoUrl: 'https://example.test/feeder.jpg' },
    });
    expect(media.status).toBe(201);
    expect(media.headers['X-API-Version']).toBe('1.0.0');
    expect(media.body.case.photoUrl).toBe('https://example.test/feeder.jpg');
  });

  it('rejects officer proof and start-work while the ticket is still submitted', async () => {
    const created = await invoke(app, {
      method: 'POST',
      url: '/api/v1/tickets',
      body: {
        title: 'Broken culvert',
        description: 'Approach washed out',
        category: 'Bridges & Culverts',
        district: 'Bastar',
        state: 'Chhattisgarh',
        contactNumber: '9000098765',
      },
    });

    const proof = await invoke(app, {
      method: 'POST',
      url: `/api/v1/tickets/${created.body.trackingId}/action`,
      headers: { 'x-officer-pin': 'setu-desk-2026' },
      params: { id: created.body.trackingId },
      body: {
        status: 'proof_uploaded',
        officerName: 'JE',
        completionProof: { notes: 'Done' },
      },
    });
    expect(proof.status).toBe(400);
    expect(proof.body.error).toMatch(/assigned/i);

    const start = await invoke(app, {
      method: 'POST',
      url: `/api/v1/tickets/${created.body.trackingId}/action`,
      headers: { 'x-officer-pin': 'setu-desk-2026' },
      params: { id: created.body.trackingId },
      body: { status: 'in_progress', officerName: 'JE' },
    });
    expect(start.status).toBe(400);
    expect(start.body.error).toMatch(/Invalid status jump/i);
  });
});
