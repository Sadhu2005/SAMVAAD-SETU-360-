import { describe, it, expect } from 'vitest';
import {
  assertPromptHasNoPii,
  containsLikelyPhone,
  formatDeskAssistPrompt,
  redactLikelyPhones,
  toSafeDeskAssistInput,
} from '../../utils/deskAssistSanitize';
import { OFFICER_DEPARTMENTS } from '../../utils/ticketLogic';

describe('Unit: desk assist sanitize', () => {
  it('redacts phone numbers from title and description', () => {
    const input = toSafeDeskAssistInput({
      title: 'Call me 9876543210',
      description: 'Issue near school +91 98765 43210',
      category: 'Sanitation & Drainage',
      district: 'Nuh',
      state: 'Haryana',
      status: 'submitted',
      contactNumber: '9876543210',
      phoneLast4: '3210',
    });
    expect(input.title).not.toContain('9876543210');
    expect(input.description).not.toContain('9876543210');
    expect(containsLikelyPhone(input.title)).toBe(false);
    expect(containsLikelyPhone(input.description)).toBe(false);
  });

  it('builds a prompt without PII tokens', () => {
    const input = toSafeDeskAssistInput({
      title: 'Open drain',
      description: 'Stagnant water',
      category: 'Sanitation & Drainage',
      district: 'Nuh',
      state: 'Haryana',
      urgency: 'High',
      status: 'submitted',
      voiceUrl: 'https://example.test/v.webm',
    });
    expect(input.hasVoice).toBe(true);
    expect(input.hasPhoto).toBe(false);
    const prompt = formatDeskAssistPrompt(input, OFFICER_DEPARTMENTS);
    assertPromptHasNoPii(prompt);
    expect(prompt).toContain('Open drain');
    expect(prompt).not.toContain('example.test');
  });

  it('redactLikelyPhones handles spaced numbers', () => {
    expect(redactLikelyPhones('mobile 98 7654 3210')).toContain('[redacted-phone]');
  });
});
