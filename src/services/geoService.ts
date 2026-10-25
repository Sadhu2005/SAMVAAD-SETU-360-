import { collection, getDocs } from 'firebase/firestore';
import { INDIA_DISTRICTS, INDIA_STATES, type GeoDistrict, type GeoState } from '../data/indiaGeo';
import { db, isFirebaseConfigured } from './firebase';

export type { GeoDistrict, GeoState };

function canUseFirestore(): boolean {
  return isFirebaseConfigured() && Boolean(db);
}

export function normalizeGeoName(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[()[\].,'/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function districtSlug(name: string): string {
  const first = name.replace(/[^A-Za-z]/g, ' ').trim().split(/\s+/)[0] || 'GEN';
  return first.slice(0, 3).toUpperCase().padEnd(3, 'X');
}

export function listBundledStates(): GeoState[] {
  return [...INDIA_STATES].sort((a, b) => a.name.localeCompare(b.name));
}

export function listBundledDistricts(stateLgdCode?: number): GeoDistrict[] {
  const rows = stateLgdCode
    ? INDIA_DISTRICTS.filter((d) => d.stateLgdCode === stateLgdCode)
    : INDIA_DISTRICTS;
  return [...rows].sort((a, b) => a.name.localeCompare(b.name));
}

function findState(query: string, states: GeoState[]): GeoState | undefined {
  const q = normalizeGeoName(query);
  if (!q) return undefined;
  const asNum = Number(query);
  if (Number.isInteger(asNum) && asNum > 0) {
    const byCode = states.find((s) => s.lgdCode === asNum);
    if (byCode) return byCode;
  }
  return states.find(
    (s) =>
      normalizeGeoName(s.name) === q ||
      normalizeGeoName(s.isoCode) === q ||
      String(s.lgdCode) === q
  );
}

function findDistrict(query: string, districts: GeoDistrict[]): GeoDistrict | undefined {
  const q = normalizeGeoName(query);
  if (!q) return undefined;
  const asNum = Number(query);
  if (Number.isInteger(asNum) && asNum > 0) {
    const byCode = districts.find((d) => d.lgdCode === asNum);
    if (byCode) return byCode;
  }
  return districts.find((d) => {
    if (normalizeGeoName(d.name) === q) return true;
    return (d.aliases || []).some((alias) => normalizeGeoName(alias) === q);
  });
}

export function resolveGeoLocation(
  stateQuery: string,
  districtQuery: string,
  states: GeoState[] = INDIA_STATES,
  districts: GeoDistrict[] = INDIA_DISTRICTS
): { state: GeoState; district: GeoDistrict } | null {
  const state = findState(stateQuery, states);
  if (!state) return null;
  const inState = districts.filter((d) => d.stateLgdCode === state.lgdCode);
  const district = findDistrict(districtQuery, inState);
  if (!district) return null;
  return { state, district };
}

export async function getStatesFromStore(): Promise<GeoState[]> {
  try {
    if (!canUseFirestore()) throw new Error('Firestore not configured');
    const snap = await getDocs(collection(db!, 'geo_states'));
    if (snap.empty) throw new Error('geo_states empty');
    const rows: GeoState[] = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data() as GeoState;
      if (data?.lgdCode && data?.name && data?.isoCode) rows.push(data);
    });
    if (!rows.length) throw new Error('geo_states invalid');
    return rows.sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return listBundledStates();
  }
}

export async function getDistrictsFromStore(stateLgdCode?: number): Promise<GeoDistrict[]> {
  try {
    if (!canUseFirestore()) throw new Error('Firestore not configured');
    const snap = await getDocs(collection(db!, 'geo_districts'));
    if (snap.empty) throw new Error('geo_districts empty');
    const rows: GeoDistrict[] = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data() as GeoDistrict;
      if (data?.lgdCode && data?.name && data?.stateLgdCode) rows.push(data);
    });
    if (!rows.length) throw new Error('geo_districts invalid');
    return rows
      .filter((d) => (stateLgdCode ? d.stateLgdCode === stateLgdCode : true))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return listBundledDistricts(stateLgdCode);
  }
}
