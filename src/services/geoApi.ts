import { listBundledDistricts, listBundledStates, type GeoDistrict, type GeoState } from './geoService';

const API = '/api/v1';

async function readJson(res: Response): Promise<any> {
  return res.json();
}

export async function apiListStates(): Promise<GeoState[]> {
  try {
    const res = await fetch(`${API}/geo/states`);
    const data = await readJson(res);
    if (!res.ok || !Array.isArray(data.states)) throw new Error(data.error || 'Geo states failed');
    return data.states;
  } catch {
    return listBundledStates();
  }
}

export async function apiListDistricts(stateCode: number): Promise<GeoDistrict[]> {
  try {
    const res = await fetch(`${API}/geo/districts?stateCode=${encodeURIComponent(String(stateCode))}`);
    const data = await readJson(res);
    if (!res.ok || !Array.isArray(data.districts)) throw new Error(data.error || 'Geo districts failed');
    return data.districts;
  } catch {
    return listBundledDistricts(stateCode);
  }
}
