import { describe, it, expect } from 'vitest';
import {
  last4Matches,
  isSlaBreached,
  enforceGovernmentWorkflowGuards,
  extractPhoneLast4,
} from '../../utils/ticketLogic';
import { generateDpdpToken, generateTrackingId } from '../../services/caseService';

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
});
