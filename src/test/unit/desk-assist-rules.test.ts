import { describe, it, expect } from 'vitest';
import {
  buildRulesDeskAssist,
  normalizeSuggestedDepartment,
  normalizeDeskAssistPayload,
} from '../../utils/deskAssistRules';
import { toSafeDeskAssistInput } from '../../utils/deskAssistSanitize';

describe('Unit: desk assist rules fallback', () => {
  it('maps sanitation category to Sanitation and SBM department', () => {
    const input = toSafeDeskAssistInput({
      title: 'Open drain',
      description: 'Stagnant water',
      category: 'Sanitation & Drainage',
      district: 'Nuh',
      state: 'Haryana',
      urgency: 'High',
      status: 'submitted',
    });
    const assist = buildRulesDeskAssist(input);
    expect(assist.suggestedDepartment).toBe('Sanitation & SBM');
    expect(assist.summary).toMatch(/Open drain/);
    expect(assist.remarksDraft.length).toBeGreaterThan(10);
  });

  it('normalizes unknown department strings to allowed list', () => {
    expect(normalizeSuggestedDepartment('PHED water wing')).toBe('PHED / Jal Jeevan Mission');
    expect(normalizeSuggestedDepartment('totally unknown')).toBe('Other');
  });

  it('merges partial Gemini payload with rules defaults', () => {
    const input = toSafeDeskAssistInput({
      title: 'Broken handpump',
      description: 'No water',
      category: 'Piped Drinking Water',
      district: 'Kalahandi',
      state: 'Odisha',
      status: 'triaged',
    });
    const merged = normalizeDeskAssistPayload({ summary: 'Short summary from model.' }, input);
    expect(merged.summary).toBe('Short summary from model.');
    expect(merged.suggestedDepartment).toBe('PHED / Jal Jeevan Mission');
  });
});
