import { describe, it, expect } from 'vitest';
import { resolveGeoLocation } from '../../services/geoService';
import { getCaseByTrackingId, submitCitizenCase } from '../../services/caseService';

describe('Regression: official geo names and unknown location guard', () => {
  it('does not persist a ticket when state or district is not in the master', async () => {
    await expect(
      submitCitizenCase({
        title: 'Fake district',
        description: 'Must not write',
        category: 'Sanitation & Drainage',
        district: 'Madeupnagar',
        state: 'Chhattisgarh',
        contactNumber: '8111100001',
      })
    ).rejects.toThrow(/Unknown state or district/);
  });

  it('stores official names and LGD codes, not informal aliases', async () => {
    const created = await submitCitizenCase({
      title: 'Handpump dry',
      description: 'Hamlet tank empty',
      category: 'Piped Drinking Water',
      district: 'Mewat',
      state: 'Haryana',
      contactNumber: '8111100002',
    });
    expect(created.state).toBe('Haryana');
    expect(created.district).toBe('Nuh');
    expect(created.stateIsoCode).toBe('HR');
    expect(created.districtLgdCode).toBe(720);
    expect(created.stateLgdCode).toBe(6);
    expect(created.trackingId).toMatch(/^SETU-2026-HR-NUH-/);
    const stored = await getCaseByTrackingId(created.trackingId);
    expect(stored.caseData?.district).toBe('Nuh');
    expect(resolveGeoLocation('CG', 'Bastar')?.state.name).toBe('Chhattisgarh');
  });
});
