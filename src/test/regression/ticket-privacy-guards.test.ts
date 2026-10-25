import { describe, it, expect } from 'vitest';
import { enforceGovernmentWorkflowGuards, maskCaseForPublic } from '../../utils/ticketLogic';
import { submitCitizenCase, getCaseByTrackingId, citizenVerifyResolution } from '../../services/caseService';

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
});
