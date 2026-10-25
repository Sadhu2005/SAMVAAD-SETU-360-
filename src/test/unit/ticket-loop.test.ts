import { describe, it, expect } from 'vitest';
import {
  last4Matches,
  isSlaBreached,
  enforceGovernmentWorkflowGuards,
  extractPhoneLast4,
  omitUndefined,
  officerActionBlockedReason,
} from '../../utils/ticketLogic';
import { attachCitizenMedia, generateDpdpToken, generateTrackingId, submitCitizenCase } from '../../services/caseService';
import { shouldUploadToFirebaseStorage } from '../../services/mediaUpload';

describe('Unit: real ticket identity, SLA, and close guards', () => {
  it('matches last-4 digits and hashes the rest of the phone', () => {
    expect(extractPhoneLast4('+91 9876543210')).toBe('3210');
    expect(last4Matches('3210', '3210')).toBe(true);
    expect(last4Matches('3210', '9999')).toBe(false);
    const tok = generateDpdpToken('9876543210');
    expect(tok.last4).toBe('3210');
    expect(tok.maskedContact).not.toContain('987654');
  });

  it('flags SLA breach after deadline hours', () => {
    const created = new Date('2026-01-01T00:00:00Z').toISOString();
    expect(isSlaBreached(created, 24, Date.parse('2026-01-01T12:00:00Z'))).toBe(false);
    expect(isSlaBreached(created, 24, Date.parse('2026-01-03T00:00:00Z'))).toBe(true);
  });

  it('keeps SETU tracking IDs and blocks close without citizen OK', () => {
    expect(generateTrackingId('Chhattisgarh', 'Bastar')).toMatch(/^SETU-2026-CH-BAS-[A-F0-9]{4}$/);
    const blocked = enforceGovernmentWorkflowGuards({
      currentStatus: 'in_progress',
      targetStatus: 'closed',
    });
    expect(blocked.allowed).toBe(false);
    const ok = enforceGovernmentWorkflowGuards({
      currentStatus: 'citizen_verified',
      targetStatus: 'closed',
    });
    expect(ok.allowed).toBe(true);
  });

  it('attaches citizen media only when last-4 matches and does not change status', async () => {
    const created = await submitCitizenCase({
      title: 'Washed culvert',
      description: 'Approach road gone',
      category: 'Bridges & Culverts',
      district: 'Bastar',
      state: 'Chhattisgarh',
      contactNumber: '9876543210',
    });
    await expect(
      attachCitizenMedia({ trackingId: created.trackingId, last4: '0000', photoUrl: 'https://example.test/p.jpg' })
    ).rejects.toThrow(/last-4/);
    const updated = await attachCitizenMedia({
      trackingId: created.trackingId,
      last4: '3210',
      photoUrl: 'https://example.test/p.jpg',
      voiceUrl: 'https://example.test/v.webm',
    });
    expect(updated.status).toBe('submitted');
    expect(updated.photoUrl).toBe('https://example.test/p.jpg');
    expect(updated.voiceUrl).toBe('https://example.test/v.webm');
  });

  it('strips undefined fields so Firestore writes do not fail', () => {
    const payload = omitUndefined({
      trackingId: 'SETU-2026-CH-BAS-AAAA',
      voiceUrl: undefined,
      photoUrl: undefined,
      village: undefined,
      completionProof: { notes: 'ok', photoUrl: undefined },
    });
    expect(payload).toEqual({
      trackingId: 'SETU-2026-CH-BAS-AAAA',
      completionProof: { notes: 'ok' },
    });
    expect(JSON.stringify(payload)).not.toContain('undefined');
  });

  it('blocks Start work and proof until the case is assigned', () => {
    expect(officerActionBlockedReason('submitted', 'start_work')).toMatch(/Assign the case first/);
    expect(officerActionBlockedReason('submitted', 'proof')).toMatch(/assigned or in progress/);
    expect(officerActionBlockedReason('assigned', 'start_work')).toBeUndefined();
    expect(officerActionBlockedReason('in_progress', 'proof')).toBeUndefined();
  });

  it('does not send browser uploads to Firebase Storage unless opted in', () => {
    expect(shouldUploadToFirebaseStorage()).toBe(false);
  });
});
