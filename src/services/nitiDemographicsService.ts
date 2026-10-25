import {
  listAspirationalDistrictIndices,
  lookupNitiDistrictIndex,
  NITI_ASPIRATIONAL_DISTRICT_COUNT,
  NITI_DISTRICT_INDEX_ROWS,
  type NitiDistrictIndex,
} from '../data/nitiDistrictIndices';
import {
  baseDipsFromUrgency,
  computeDiewMultiplier,
  computeDipsWithDiew,
  formatMpiDeficitLabel,
} from '../utils/nitiDiew';

export interface NitiEnrichmentResult {
  index: NitiDistrictIndex;
  diewMultiplier: number;
  dipsScore: number;
  mpiDeficitMultiplier: string;
}

export { listAspirationalDistrictIndices } from '../data/nitiDistrictIndices';

export function getNitiIndicesSummary() {
  return {
    bundledDistricts: NITI_DISTRICT_INDEX_ROWS.length,
    aspirationalProgramTotal: NITI_ASPIRATIONAL_DISTRICT_COUNT,
    aspirationalInBundle: listAspirationalDistrictIndices().length,
    source: 'NITI Aayog Aspirational Districts & MPI-style deficit indices (bundled snapshot)',
  };
}

export function getNitiDistrictProfile(state: string, district: string): NitiEnrichmentResult {
  return enrichCaseFields({
    state,
    district,
    urgency: 'High',
    dipsScore: undefined,
  });
}

export type NitiEnrichableCase = {
  state: string;
  district: string;
  urgency: 'Critical' | 'High' | 'Medium' | 'Low';
  dipsScore?: number;
  nitiMpiScore?: number;
  nitiInfrastructureDeficit?: number;
  nitiAspirationalDistrict?: boolean;
  nitiDiewMultiplier?: number;
  mpiDeficitMultiplier?: string;
  nitiEnrichedAt?: string;
};

export function enrichCaseFields(input: {
  state: string;
  district: string;
  urgency: NitiEnrichableCase['urgency'];
  dipsScore?: number;
}): NitiEnrichmentResult {
  const index = lookupNitiDistrictIndex(input.state, input.district);
  const diewMultiplier = computeDiewMultiplier(index.mpiScore, index.internetPenetrationRate);
  const base = input.dipsScore ?? baseDipsFromUrgency(input.urgency);
  const dipsScore = computeDipsWithDiew(base, diewMultiplier);
  const mpiDeficitMultiplier = formatMpiDeficitLabel({
    diewMultiplier,
    mpiScore: index.mpiScore,
    district: index.district,
    aspirational: index.aspirationalDistrict,
  });
  return { index, diewMultiplier, dipsScore, mpiDeficitMultiplier };
}

export function enrichCitizenCase(caseData: NitiEnrichableCase): NitiEnrichmentResult {
  return enrichCaseFields({
    state: caseData.state,
    district: caseData.district,
    urgency: caseData.urgency,
    dipsScore: caseData.dipsScore,
  });
}

export function applyNitiEnrichmentToCase<T extends NitiEnrichableCase>(caseData: T): T {
  const result = enrichCitizenCase(caseData);
  caseData.nitiMpiScore = result.index.mpiScore;
  caseData.nitiInfrastructureDeficit = result.index.infrastructureDeficitScore;
  caseData.nitiAspirationalDistrict = result.index.aspirationalDistrict;
  caseData.nitiDiewMultiplier = result.diewMultiplier;
  caseData.dipsScore = result.dipsScore;
  caseData.mpiDeficitMultiplier = result.mpiDeficitMultiplier;
  caseData.nitiEnrichedAt = new Date().toISOString();
  return caseData;
}
