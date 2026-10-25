import { describe, it, expect } from 'vitest';
import { attachCitizenMedia, submitCitizenCase } from '../../services/caseService';
import { isValidIndianMobile } from '../../utils/ticketLogic';

describe('Functional: required mobile and voice check before file', () => {
  it('files only with a valid mobile and keeps a replayable voice URL', async () => {
    expect(isValidIndianMobile('9876543210')).toBe(true);
    const created = await submitCitizenCase({
      title: 'Broken handpump',
      description: 'No water at the stand',
      category: 'Piped Drinking Water',
      state: 'Karnataka',
      district: 'Bengaluru (Bangalore) Rural',
      village: 'Devanahalli',
      contactNumber: '9876543210',
    });
    expect(created.phoneLast4).toBe('3210');
    const replay = 'data:audio/webm;base64,AAAA';
    const withVoice = await attachCitizenMedia({
      trackingId: created.trackingId,
      last4: '3210',
      voiceUrl: replay,
    });
    expect(withVoice.voiceUrl).toBe(replay);
    expect(withVoice.voiceUrl?.startsWith('data:audio/')).toBe(true);
  });
});
