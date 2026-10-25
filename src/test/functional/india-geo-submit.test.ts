import { describe, it, expect } from 'vitest';
import { attachCitizenMedia, submitCitizenCase } from '../../services/caseService';

describe('Functional: citizen submit stores official Chhattisgarh / Bastar codes', () => {
  it('walks select-style state then district into a persisted ticket', async () => {
    const created = await submitCitizenCase({
      title: 'Washed tribal footbridge',
      description: 'Students cannot cross Indravati after flood',
      category: 'Bridges & Culverts',
      state: 'Chhattisgarh',
      district: 'Bastar',
      village: 'Rampur',
      contactNumber: '9425200991',
      channel: 'Web Citizen Portal',
    });

    expect(created.state).toBe('Chhattisgarh');
    expect(created.district).toBe('Bastar');
    expect(created.stateLgdCode).toBe(22);
    expect(created.districtLgdCode).toBe(384);
    expect(created.stateIsoCode).toBe('CG');
    expect(created.trackingId).toMatch(/^SETU-2026-CG-BAS-[A-F0-9]{4}$/);

    const withMedia = await attachCitizenMedia({
      trackingId: created.trackingId,
      last4: '0991',
      photoUrl: 'https://example.test/bastar.jpg',
    });
    expect(withMedia.districtLgdCode).toBe(384);
    expect(withMedia.photoUrl).toBe('https://example.test/bastar.jpg');
  });
});
