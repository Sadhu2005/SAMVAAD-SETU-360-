import { describe, it, expect } from 'vitest';
import { lookupNitiDistrictIndex } from '../../data/nitiDistrictIndices';
import { getNitiDistrictProfile } from '../../services/nitiDemographicsService';

describe('Unit: NITI district MPI lookup', () => {
  it('returns Bastar tribal belt MPI from bundled snapshot', () => {
    const row = lookupNitiDistrictIndex('Chhattisgarh', 'Bastar');
    expect(row.mpiScore).toBeCloseTo(0.43, 2);
    expect(row.aspirationalDistrict).toBe(true);
  });

  it('computes DIEW-enriched DIPS profile for Nuh', () => {
    const profile = getNitiDistrictProfile('Haryana', 'Nuh');
    expect(profile.index.mpiScore).toBeCloseTo(0.32, 2);
    expect(profile.diewMultiplier).toBeGreaterThan(1);
    expect(profile.dipsScore).toBeGreaterThan(40);
  });
});
