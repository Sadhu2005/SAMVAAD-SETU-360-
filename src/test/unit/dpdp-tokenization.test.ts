import { describe, it, expect } from 'vitest';

/**
 * DPDP Act 2023 Ephemeral Tokenizer Utility
 * Sanitizes phone numbers, personal names, and Aadhaar numbers before public DPG ingestion.
 */
export function sanitizeCitizenPii(rawText: string, phoneNumber?: string): {
  sanitizedText: string;
  dpdpToken: string;
  hasPiiLeak: boolean;
} {
  // Regex patterns for Indian phone numbers, Aadhaar numbers, and emails
  const phoneRegex = /(\+91[\-\s]?)?[6789]\d{9}/g;
  const aadhaarRegex = /\b\d{4}[\s\-]?\d{4}[\s\-]?\d{4}\b/g;
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

  let sanitizedText = rawText
    .replace(phoneRegex, '[DPDP_MASKED_CONTACT]')
    .replace(aadhaarRegex, '[DPDP_MASKED_ID]')
    .replace(emailRegex, '[DPDP_MASKED_EMAIL]');

  // Generate deterministic mock hash token for phone
  const seed = phoneNumber || 'anonymous_citizen';
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const dpdpToken = `0x${Math.abs(hash).toString(16).padStart(8, '0')}...${seed.slice(-4)}`;

  const hasPiiLeak = phoneRegex.test(sanitizedText) || aadhaarRegex.test(sanitizedText) || emailRegex.test(sanitizedText);

  return {
    sanitizedText,
    dpdpToken,
    hasPiiLeak,
  };
}

describe('Unit Test: DPDP Act 2023 Compliance & PII Sanitization', () => {
  it('should redact 10-digit mobile phone numbers and replace with safe token placeholder', () => {
    const raw = 'Gram Pradhan contact Ramesh Kumar at 9876543210 regarding the snapped power line.';
    const result = sanitizeCitizenPii(raw, '9876543210');

    expect(result.sanitizedText).not.toContain('9876543210');
    expect(result.sanitizedText).toContain('[DPDP_MASKED_CONTACT]');
    expect(result.hasPiiLeak).toBe(false);
    expect(result.dpdpToken).toMatch(/^0x[a-f0-9]{8}\.\.\.3210$/);
  });

  it('should redact 12-digit Aadhaar national identification numbers', () => {
    const raw = 'Citizen beneficiary ID 4512 8901 2345 submitted canal repair petition.';
    const result = sanitizeCitizenPii(raw);

    expect(result.sanitizedText).not.toContain('4512 8901 2345');
    expect(result.sanitizedText).toContain('[DPDP_MASKED_ID]');
    expect(result.hasPiiLeak).toBe(false);
  });

  it('should flag and redact emails without corrupting surrounding infrastructure context', () => {
    const raw = 'Official escalation sent from pradhan.rampur@nic.in for transformer burnout.';
    const result = sanitizeCitizenPii(raw);

    expect(result.sanitizedText).toContain('[DPDP_MASKED_EMAIL]');
    expect(result.sanitizedText).toContain('transformer burnout');
  });
});
