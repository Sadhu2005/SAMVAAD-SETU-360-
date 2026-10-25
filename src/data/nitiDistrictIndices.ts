import { DISTRICT_HOTSPOTS } from './nationalData';
import { normalizeGeoName } from '../services/geoService';

/** NITI Aayog-style district demographic index (bundled public snapshot). */
export interface NitiDistrictIndex {
  state: string;
  district: string;
  mpiScore: number;
  infrastructureDeficitScore: number;
  aspirationalDistrict: boolean;
  /** Rural broadband / smartphone penetration proxy (0–1). */
  internetPenetrationRate: number;
  programCohort?: string;
}

const HOTSPOT_OVERRIDES: NitiDistrictIndex[] = DISTRICT_HOTSPOTS.map((d) => ({
  state: d.state.replace('Jammu & Kashmir', 'Jammu and Kashmir'),
  district: d.name.replace('Nuh (Mewat)', 'Nuh').replace('Vidarbha (Yavatmal-Washim)', 'Yavatmal'),
  mpiScore: d.mpiScore,
  infrastructureDeficitScore: d.infrastructureDeficitScore,
  aspirationalDistrict:
    d.category === 'Aspirational District' || d.category === 'Tribal Belt',
  internetPenetrationRate: d.infrastructureDeficitScore >= 80 ? 0.28 : 0.42,
  programCohort: d.category,
}));

/** Additional aspirational districts (abbreviated ADP list for lookup beyond demo hotspots). */
const ADP_EXTENSION: NitiDistrictIndex[] = [
  { state: 'Bihar', district: 'Araria', mpiScore: 0.41, infrastructureDeficitScore: 86, aspirationalDistrict: true, internetPenetrationRate: 0.31, programCohort: 'ADP 2018' },
  { state: 'Jharkhand', district: 'Khunti', mpiScore: 0.38, infrastructureDeficitScore: 85, aspirationalDistrict: true, internetPenetrationRate: 0.29, programCohort: 'ADP 2018' },
  { state: 'Uttar Pradesh', district: 'Chitrakoot', mpiScore: 0.44, infrastructureDeficitScore: 87, aspirationalDistrict: true, internetPenetrationRate: 0.27, programCohort: 'ADP 2018' },
  { state: 'Rajasthan', district: 'Barmer', mpiScore: 0.36, infrastructureDeficitScore: 82, aspirationalDistrict: true, internetPenetrationRate: 0.33, programCohort: 'ADP 2018' },
  { state: 'Assam', district: 'Dhubri', mpiScore: 0.4, infrastructureDeficitScore: 84, aspirationalDistrict: true, internetPenetrationRate: 0.3, programCohort: 'ADP 2018' },
];

export const NITI_DISTRICT_INDEX_ROWS: NitiDistrictIndex[] = [...HOTSPOT_OVERRIDES, ...ADP_EXTENSION];

export const NITI_ASPIRATIONAL_DISTRICT_COUNT = 112;

function indexKey(state: string, district: string): string {
  return `${normalizeGeoName(state)}|${normalizeGeoName(district)}`;
}

const INDEX_BY_KEY = new Map<string, NitiDistrictIndex>();
for (const row of NITI_DISTRICT_INDEX_ROWS) {
  INDEX_BY_KEY.set(indexKey(row.state, row.district), row);
  if (row.district.includes(' ')) {
    INDEX_BY_KEY.set(indexKey(row.state, row.district.split(' ')[0]), row);
  }
}

export const NITI_NATIONAL_MEDIAN: NitiDistrictIndex = {
  state: 'India',
  district: 'National median',
  mpiScore: 0.18,
  infrastructureDeficitScore: 52,
  aspirationalDistrict: false,
  internetPenetrationRate: 0.55,
  programCohort: 'NITI baseline',
};

export function lookupNitiDistrictIndex(state: string, district: string): NitiDistrictIndex {
  const direct = INDEX_BY_KEY.get(indexKey(state, district));
  if (direct) return { ...direct };
  const alias = INDEX_BY_KEY.get(indexKey(state, district.split('(')[0].trim()));
  if (alias) return { ...alias, district };
  return {
    ...NITI_NATIONAL_MEDIAN,
    state,
    district,
  };
}

export function listAspirationalDistrictIndices(): NitiDistrictIndex[] {
  return NITI_DISTRICT_INDEX_ROWS.filter((r) => r.aspirationalDistrict);
}
