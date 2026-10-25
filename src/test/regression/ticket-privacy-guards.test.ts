import { describe, it, expect } from 'vitest';
import { enforceGovernmentWorkflowGuards, maskCaseForPublic, omitUndefined } from '../../utils/ticketLogic';
import { attachCitizenMedia, submitCitizenCase, getCaseByTrackingId, citizenVerifyResolution } from '../../services/caseService';

describe('Regression: close guards and public track privacy', () => {
  it('cannot close without citizen confirmation unless collector override', () => {
    const no = enforceGovernmentWorkflowGuards({
      currentStatus: 'proof_uploaded',
      targetStatus: 'closed',
    });
    expect(no.allowed).toBe(false);
    const override = enforceGovernmentWorkflowGuards({
      currentStatus: 'proof_uploaded',
      targetStatus: 'closed',
      officerRoleKey: 'collector',
      closeOverrideReason: 'Emergency statutory close after dual inspection',
    });
    expect(override.allowed).toBe(true);
  });

  it('hides phone last-4 on a public (unmasked) view of a real ticket', async () => {
    const created = await submitCitizenCase({
      title: 'Borewell contamination',
      description: 'Community pond runoff',
      category: 'Piped Drinking Water',
      district: 'Bastar',
      state: 'Chhattisgarh',
      contactNumber: '7000099991',
    });
    const { caseData } = await getCaseByTrackingId(created.trackingId);
    expect(caseData?.phoneLast4).toBe('9991');
    const masked = maskCaseForPublic(caseData!, false);
    expect(masked.phoneLast4).toBeUndefined();
    await expect(
      citizenVerifyResolution({
        trackingId: created.trackingId,
        verified: true,
        last4: '0000',
      })
    ).rejects.toThrow(/last-4/);
  });

  it('rejects citizen media attach when last-4 is wrong', async () => {
    const created = await submitCitizenCase({
      title: 'Broken handpump',
      description: 'No water at hamlet',
      category: 'Piped Drinking Water',
      district: 'Kalahandi',
      state: 'Odisha',
      contactNumber: '7000011112',
    });
    await expect(
      attachCitizenMedia({
        trackingId: created.trackingId,
        last4: '9999',
        voiceUrl: 'https://example.test/voice.webm',
      })
    ).rejects.toThrow(/last-4/);
    const { caseData } = await getCaseByTrackingId(created.trackingId);
    expect(caseData?.voiceUrl).toBeUndefined();
    expect(caseData?.status).toBe('submitted');
  });

  it('never writes undefined media or location fields to a Firestore payload', async () => {
    const created = await submitCitizenCase({
      title: 'Open drain',
      description: 'Stagnant water',
      category: 'Sanitation & Drainage',
      district: 'Nuh',
      state: 'Haryana',
      contactNumber: '7000033334',
    });
    const payload = omitUndefined({ ...created });
    expect(Object.values(payload).every((value) => value !== undefined)).toBe(true);
    expect(payload).not.toHaveProperty('voiceUrl');
    expect(payload).not.toHaveProperty('photoUrl');
    expect(payload).not.toHaveProperty('village');
    expect(payload).not.toHaveProperty('lat');
    expect(payload).not.toHaveProperty('lng');
  });
});
