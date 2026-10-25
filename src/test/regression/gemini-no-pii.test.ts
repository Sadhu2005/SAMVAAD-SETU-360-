import { describe, it, expect } from 'vitest';
import { formatDeskAssistPrompt, toSafeDeskAssistInput } from '../../utils/deskAssistSanitize';
import { OFFICER_DEPARTMENTS } from '../../utils/ticketLogic';

describe('Regression: desk assist prompts exclude citizen PII', () => {
  it('never puts raw phone or citizen token into the Gemini prompt', () => {
    const input = toSafeDeskAssistInput({
      title: 'Help',
      description: 'Reach me at 9123456789 before visit',
      category: 'Rural Roads & Connectivity',
      district: 'Bastar',
      state: 'Chhattisgarh',
      contactNumber: '9123456789',
      phoneLast4: '6789',
      citizenToken: '0xdeadbeef',
      citizenPhoneMasked: '******6789',
      status: 'submitted',
    });
    const prompt = formatDeskAssistPrompt(input, OFFICER_DEPARTMENTS);
    expect(prompt).not.toMatch(/9123456789/);
    expect(prompt).not.toContain('deadbeef');
    expect(prompt).not.toContain('citizenToken');
    expect(prompt).not.toContain('phoneLast4');
  });
});
