import { describe, it, expect } from 'vitest';
import { submitCitizenCase, attachCitizenMedia, saveVoiceTranscript, getCaseByTrackingId } from '../../services/caseService';

describe('Functional: voice transcript stored on ticket', () => {
  it('persists Bhashini transcript without changing ticket status', async () => {
    const created = await submitCitizenCase({
      title: 'Open drain',
      description: 'Water logging',
      category: 'Sanitation & Drainage',
      district: 'Nuh',
      state: 'Haryana',
      contactNumber: '9876512345',
    });
    await attachCitizenMedia({
      trackingId: created.trackingId,
      last4: '2345',
      voiceUrl: 'data:audio/webm;base64,QUJD',
    });

    const updated = await saveVoiceTranscript({
      trackingId: created.trackingId,
      transcript: 'Citizen reported stagnant water near the school.',
      sourceLanguage: 'hi',
      officerName: 'District Officer',
    });
    expect(updated.status).toBe('submitted');
    expect(updated.voiceTranscript).toContain('stagnant water');

    const loaded = await getCaseByTrackingId(created.trackingId);
    expect(loaded.caseData?.voiceTranscript).toContain('stagnant water');
  });
});
