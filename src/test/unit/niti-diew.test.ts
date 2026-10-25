import { describe, it, expect } from 'vitest';
import {
  computeDiewMultiplier,
  computeDipsWithDiew,
  DIEW_MAX_MULTIPLIER,
} from '../../utils/nitiDiew';

describe('Unit: NITI DIEW multiplier', () => {
  it('weights high-MPI districts above national median', () => {
    const tribal = computeDiewMultiplier(0.43, 0.28);
    const urban = computeDiewMultiplier(0.08, 0.72);
    expect(tribal).toBeGreaterThan(urban);
    expect(tribal).toBeLessThanOrEqual(DIEW_MAX_MULTIPLIER);
  });

  it('scales DIPS with DIEW cap at 99.8', () => {
    expect(computeDipsWithDiew(80, 7.4)).toBeLessThanOrEqual(99.8);
  });
});
