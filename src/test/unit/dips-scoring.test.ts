import { describe, it, expect } from 'vitest';

/**
 * Mathematical DIPS (Dynamic Infrastructure Priority Score) Calculation Function
 * DIPS = (VolumeWeight * NormVolume + UrgencyWeight * UrgencyScore + SafetyWeight * SafetyScore) * MPIMultiplier
 */
export function calculateDipsScore(params: {
  citizenVolume: number;
  urgencyLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  safetyHazard: boolean;
  mpiPovertyIndex: number; // 0.00 (wealthy) to 1.00 (extreme multidimensional poverty)
}): { score: number; rankCategory: string; equityMultiplier: number } {
  const normVolume = Math.min(params.citizenVolume / 1000, 1.0) * 100;
  
  const urgencyMap: Record<string, number> = {
    Critical: 100,
    High: 75,
    Medium: 45,
    Low: 20,
  };
  const urgencyScore = urgencyMap[params.urgencyLevel] || 30;
  const safetyScore = params.safetyHazard ? 100 : 25;

  const baseScore = 0.35 * normVolume + 0.40 * urgencyScore + 0.25 * safetyScore;
  
  // Equity multiplier scales from 1.0x to 8.5x based on NITI Aayog MPI index
  const equityMultiplier = Number((1.0 + params.mpiPovertyIndex * 7.5).toFixed(2));
  
  // Normalize final score to 100 max scale
  const finalScore = Number(Math.min(baseScore * (equityMultiplier / 3.5), 99.8).toFixed(1));

  let rankCategory = 'Tier-3 Normal Priority';
  if (finalScore >= 90) rankCategory = 'Tier-1 Emergency Sanction';
  else if (finalScore >= 75) rankCategory = 'Tier-2 High Priority';

  return {
    score: finalScore,
    rankCategory,
    equityMultiplier,
  };
}

describe('Unit Test: Mathematical DIPS Equity Scoring Algorithm', () => {
  it('should prioritize high-distress tribal belts with MPI multipliers over low-distress urban clusters', () => {
    // Bastar tribal habitation with washed out culvert (High MPI = 0.43)
    const bastarResult = calculateDipsScore({
      citizenVolume: 450,
      urgencyLevel: 'Critical',
      safetyHazard: true,
      mpiPovertyIndex: 0.43,
    });

    // Urban affluent locality with minor pothole repair (Low MPI = 0.05)
    const urbanResult = calculateDipsScore({
      citizenVolume: 900,
      urgencyLevel: 'Medium',
      safetyHazard: false,
      mpiPovertyIndex: 0.05,
    });

    expect(bastarResult.score).toBeGreaterThan(urbanResult.score);
    expect(bastarResult.rankCategory).toBe('Tier-1 Emergency Sanction');
    expect(bastarResult.equityMultiplier).toBeGreaterThan(4.0);
  });

  it('should ensure calculated DIPS score is strictly bounded under 100', () => {
    const extremeResult = calculateDipsScore({
      citizenVolume: 50000,
      urgencyLevel: 'Critical',
      safetyHazard: true,
      mpiPovertyIndex: 1.0,
    });

    expect(extremeResult.score).toBeLessThanOrEqual(100);
    expect(extremeResult.score).toBeGreaterThanOrEqual(0);
  });

  it('should properly apply urgency weights across priority levels', () => {
    const critical = calculateDipsScore({
      citizenVolume: 100,
      urgencyLevel: 'Critical',
      safetyHazard: false,
      mpiPovertyIndex: 0.2,
    });

    const low = calculateDipsScore({
      citizenVolume: 100,
      urgencyLevel: 'Low',
      safetyHazard: false,
      mpiPovertyIndex: 0.2,
    });

    expect(critical.score).toBeGreaterThan(low.score);
  });
});
