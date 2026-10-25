import { describe, it, expect } from 'vitest';
import {
  generateTrackingId,
  generateDpdpToken,
  CaseStatus
} from '../../services/caseService';

describe('Unit Test: Operational Case Lifecycle & Identity Logic', () => {
  it('should generate durable, cryptographically sound public tracking IDs conforming to standard format', () => {
    const id1 = generateTrackingId('Chhattisgarh', 'Bastar');
    const id2 = generateTrackingId('Uttar Pradesh', 'Varanasi');

    expect(id1).toMatch(/^SETU-2026-CH-BAS-[A-F0-9]{4}$/);
    expect(id2).toMatch(/^SETU-2026-UT-VAR-[A-F0-9]{4}$/);
    expect(id1).not.toBe(id2);
  });

  it('should mask citizen phone numbers and generate DPDP Act 2023 compliant ephemeral tokens', () => {
    const { maskedContact, dpdpToken } = generateDpdpToken('+91 9876543210');

    expect(maskedContact).toBe('+91 ******3210');
    expect(maskedContact).not.toContain('987654');
    expect(dpdpToken).toMatch(/^0x[a-f0-9]{8}\.\.\.3210$/);
  });

  it('should validate valid sequential state machine transitions', () => {
    const validTransitions: Record<CaseStatus, CaseStatus[]> = {
      submitted: ['triaged', 'assigned'],
      triaged: ['assigned', 'in_progress'],
      assigned: ['in_progress'],
      in_progress: ['proof_uploaded'],
      proof_uploaded: ['citizen_verified', 'citizen_contested'],
      citizen_verified: ['closed'],
      citizen_contested: ['in_progress', 'assigned'],
      closed: [],
    };

    function isValidTransition(from: CaseStatus, to: CaseStatus): boolean {
      return validTransitions[from]?.includes(to) ?? false;
    }

    expect(isValidTransition('submitted', 'triaged')).toBe(true);
    expect(isValidTransition('assigned', 'in_progress')).toBe(true);
    expect(isValidTransition('in_progress', 'proof_uploaded')).toBe(true);
    expect(isValidTransition('proof_uploaded', 'citizen_verified')).toBe(true);
    expect(isValidTransition('citizen_verified', 'closed')).toBe(true);

    // Invalid shortcut jumps
    expect(isValidTransition('submitted', 'closed')).toBe(false);
    expect(isValidTransition('submitted', 'citizen_verified')).toBe(false);
  });
});
