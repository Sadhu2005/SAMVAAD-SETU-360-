import { describe, it, expect } from 'vitest';
import {
  submitCitizenCase,
  saveNitiDemographicEnrichment,
  getCaseByTrackingId,
} from '../../services/caseService';

describe('Functional: NITI indices on citizen ticket', () => {
  it('auto-enriches MPI and DIPS on submit for known aspirational district', async () => {
    const created = await submitCitizenCase({
      title: 'Canal tail-end dry',
      description: 'No water at last mile',
      category: 'Piped Drinking Water',
      district: 'Nuh',
      state: 'Haryana',
      contactNumber: '9876512399',
      urgency: 'High',
    });
    expect(created.nitiMpiScore).toBeCloseTo(0.32, 2);
    expect(created.nitiAspirationalDistrict).toBe(true);
    expect(created.dipsScore).toBeGreaterThan(45);
    expect(created.nitiDiewMultiplier).toBeGreaterThan(2);
    expect(created.mpiDeficitMultiplier).toContain('MPI');
  });

  it('officer refresh persists enrichment audit path', async () => {
    const created = await submitCitizenCase({
      title: 'Bridge repair',
      description: 'Culvert cracked',
      category: 'Bridges & Culverts',
      district: 'Bastar',
      state: 'Chhattisgarh',
      contactNumber: '9876512388',
    });
    const updated = await saveNitiDemographicEnrichment({
      trackingId: created.trackingId,
      officerName: 'District Officer',
    });
    expect(updated.nitiEnrichedAt).toBeTruthy();
    const loaded = await getCaseByTrackingId(created.trackingId);
    expect(loaded.caseData?.nitiDiewMultiplier).toBeGreaterThan(1);
  });
});
