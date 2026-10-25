/** Demographic-Inverse Equity Weighting (DIEW) — NITI Aayog MPI aligned. */
export const DIEW_MAX_MULTIPLIER = 12.5;

export function computeDiewMultiplier(mpiScore: number, internetPenetrationRate: number): number {
  const mpi = Math.min(0.99, Math.max(0.01, mpiScore));
  const net = Math.min(0.99, Math.max(0.05, internetPenetrationRate));
  const alpha = 1.2;
  const raw = 1 + alpha * (mpi / (1 - mpi)) * (1 / net);
  return Math.min(DIEW_MAX_MULTIPLIER, Math.max(1, Number(raw.toFixed(2))));
}

export function computeDipsWithDiew(baseDips: number, diewMultiplier: number): number {
  const scaled = baseDips * (diewMultiplier / 3.5);
  return Number(Math.min(99.8, Math.max(0, scaled)).toFixed(1));
}

export function baseDipsFromUrgency(urgency: 'Critical' | 'High' | 'Medium' | 'Low'): number {
  const map: Record<string, number> = {
    Critical: 82,
    High: 72,
    Medium: 58,
    Low: 42,
  };
  return map[urgency] ?? 65;
}

export function formatMpiDeficitLabel(params: {
  diewMultiplier: number;
  mpiScore: number;
  district: string;
  aspirational: boolean;
}): string {
  const tag = params.aspirational ? 'Aspirational District' : 'MPI weighted';
  return `${params.diewMultiplier}x (${tag}: MPI ${params.mpiScore.toFixed(2)} · ${params.district})`;
}
