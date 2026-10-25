import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { submitCitizenCase, getCaseByTrackingId } from '../../services/caseService';
import { computeDeskAssist } from '../../services/deskAssistService';

describe('Functional: desk assist does not mutate tickets', () => {
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

  it('returns suggestions while case status stays submitted', async () => {
    const created = await submitCitizenCase({
      title: 'Handpump dry',
      description: 'No water in hamlet',
      category: 'Piped Drinking Water',
      district: 'Kalahandi',
      state: 'Odisha',
      contactNumber: '9876501234',
      urgency: 'High',
    });
    expect(created.status).toBe('submitted');

    const assist = await computeDeskAssist(created);
    expect(assist.source).toBe('rules');
    expect(assist.assist.suggestedDepartment).toBe('PHED / Jal Jeevan Mission');

    const after = await getCaseByTrackingId(created.trackingId);
    expect(after.caseData?.status).toBe('submitted');
    expect(after.caseData?.title).toBe('Handpump dry');
  });
});
