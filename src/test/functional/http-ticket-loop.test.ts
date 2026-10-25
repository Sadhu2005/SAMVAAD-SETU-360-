import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Server } from 'http';
import { app } from '../../../server';

const PIN = 'setu-desk-2026';
const LAST4 = '2345';
const MOBILE = '9810012345';

function officerHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'X-Officer-Pin': PIN,
  };
}

describe('Functional: HTTP citizen-to-officer ticket loop', () => {
  let server: Server;
  let base = '';
  let trackingId = '';

  beforeAll(async () => {
    await new Promise<void>((resolve) => {
      server = app.listen(0, '127.0.0.1', () => resolve());
    });
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('test server has no port');
    base = `http://127.0.0.1:${address.port}/api/v1`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  });

  async function json(path: string, init?: RequestInit) {
    const res = await fetch(`${base}${path}`, init);
    const data = await res.json();
    return { res, data };
  }

  it('submits, appears in inbox, assigns, proofs, and citizen verifies with last-4', async () => {
    const submitted = await json('/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Open drain beside the school wall',
        description: 'Stagnant monsoon water flooding the approach path.',
        category: 'Sanitation & Drainage',
        district: 'Nuh',
        state: 'Haryana',
        contactNumber: MOBILE,
        channel: 'Web Citizen Portal',
        urgency: 'High',
      }),
    });
    expect(submitted.res.status).toBe(201);
    expect(submitted.res.headers.get('X-API-Version')).toBe('1.0.0');
    trackingId = submitted.data.trackingId;
    expect(trackingId).toMatch(/^SETU-2026-HR-/);
    expect(submitted.data.case.status).toBe('submitted');

    const tracked = await json(`/tickets/${encodeURIComponent(trackingId)}?last4=${LAST4}`);
    expect(tracked.res.status).toBe(200);
    expect(tracked.data.masked).toBe(false);
    expect(tracked.data.case.status).toBe('submitted');

    const inbox = await json('/officer/inbox', { headers: officerHeaders() });
    expect(inbox.res.status).toBe(200);
    expect(inbox.data.cases.some((c: { trackingId: string }) => c.trackingId === trackingId)).toBe(true);

    const triaged = await json(`/tickets/${encodeURIComponent(trackingId)}/action`, {
      method: 'POST',
      headers: officerHeaders(),
      body: JSON.stringify({
        status: 'triaged',
        officerName: 'Smt. Rekha',
        officerRoleKey: 'district_officer',
        remarks: 'Accepted for sanitation desk.',
      }),
    });
    expect(triaged.res.status).toBe(200);
    expect(triaged.data.case.status).toBe('triaged');

    const assigned = await json(`/tickets/${encodeURIComponent(trackingId)}/assign`, {
      method: 'POST',
      headers: officerHeaders(),
      body: JSON.stringify({
        officerName: 'Smt. Rekha',
        officerRoleKey: 'district_officer',
        department: 'Sanitation & SBM',
        assignedOfficer: 'Er. Imran',
        remarks: 'Assigned to sanitation wing.',
      }),
    });
    expect(assigned.res.status).toBe(200);
    expect(assigned.data.case.status).toBe('assigned');
    expect(assigned.data.case.assignedDept).toBe('Sanitation & SBM');
    expect(assigned.data.case.assignedOfficer).toBe('Er. Imran');

    const started = await json(`/tickets/${encodeURIComponent(trackingId)}/action`, {
      method: 'POST',
      headers: officerHeaders(),
      body: JSON.stringify({
        status: 'in_progress',
        officerName: 'Er. Imran',
        officerRoleKey: 'junior_engineer',
        remarks: 'Desilting started on site.',
      }),
    });
    expect(started.res.status).toBe(200);
    expect(started.data.case.status).toBe('in_progress');

    const proof = await json(`/tickets/${encodeURIComponent(trackingId)}/proof`, {
      method: 'POST',
      headers: officerHeaders(),
      body: JSON.stringify({
        officerName: 'Er. Imran',
        officerRoleKey: 'junior_engineer',
        remarks: 'Drain cleared and covered.',
        completionProof: {
          photoUrl: 'https://example.test/proof-drain.jpg',
          notes: 'Covered and disinfected.',
          inspectorName: 'Er. Imran',
        },
      }),
    });
    expect(proof.res.status).toBe(200);
    expect(proof.data.case.status).toBe('proof_uploaded');
    expect(proof.data.case.completionProof?.photoUrl).toBe('https://example.test/proof-drain.jpg');

    const afterProof = await json(`/tickets/${encodeURIComponent(trackingId)}?last4=${LAST4}`);
    expect(afterProof.data.case.status).toBe('proof_uploaded');
    expect(afterProof.data.case.completionProof?.notes).toContain('disinfected');

    const verified = await json(`/tickets/${encodeURIComponent(trackingId)}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        verified: true,
        last4: LAST4,
        feedbackText: 'Path is dry. Children can walk to school.',
      }),
    });
    expect(verified.res.status).toBe(200);
    expect(verified.data.case.status).toBe('citizen_verified');
    expect(verified.data.case.citizenFeedback?.verified).toBe(true);

    const closed = await json(`/tickets/${encodeURIComponent(trackingId)}/action`, {
      method: 'POST',
      headers: officerHeaders(),
      body: JSON.stringify({
        status: 'closed',
        officerName: 'Smt. Rekha',
        officerRoleKey: 'district_officer',
        remarks: 'Closed after citizen confirmation.',
      }),
    });
    expect(closed.res.status).toBe(200);
    expect(closed.data.case.status).toBe('closed');

    const finalTrack = await json(`/tickets/${encodeURIComponent(trackingId)}?last4=${LAST4}`);
    expect(finalTrack.data.case.status).toBe('closed');
    expect(finalTrack.data.auditLogs.length).toBeGreaterThanOrEqual(6);
  });
});
