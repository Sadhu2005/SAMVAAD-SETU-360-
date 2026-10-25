import { DISTRICT_HOTSPOTS } from '../data/nationalData';
import {
  GATI_SHAKTI_LAYER_GROUPS,
  GATISHAKTI_NMMP_MINISTRY_COUNT,
  GATISHAKTI_NMMP_TOTAL_LAYERS,
  type GatiShaktiLayerGroup,
} from '../data/gatiShaktiLayerCatalog';
import { GATI_SHAKTI_SAMPLE_ASSETS } from '../data/gatiShaktiSampleAssets';
import type { CitizenCase } from './caseService';
import {
  triangulateAgainstMasterplan,
  type TriangulationFusionResult,
} from '../utils/gatiShaktiTriangulation';

export function isGatiShaktiLiveConfigured(): boolean {
  return Boolean(
    process.env.GATISHAKTI_GIS_BASE_URL?.trim() &&
      process.env.GATISHAKTI_API_KEY?.trim()
  );
}

export function getGatiShaktiCatalogSummary() {
  return {
    totalLayers: GATISHAKTI_NMMP_TOTAL_LAYERS,
    layerGroups: GATI_SHAKTI_LAYER_GROUPS.length,
    ministries: GATISHAKTI_NMMP_MINISTRY_COUNT,
    liveGisConnected: isGatiShaktiLiveConfigured(),
    source: 'PM GatiShakti National Master Plan (NMMP) taxonomy',
  };
}

export function queryGatiShaktiCatalog(params: {
  q?: string;
  ministry?: string;
  limit?: number;
  offset?: number;
}): { total: number; totalLayers: number; groups: GatiShaktiLayerGroup[] } {
  const q = params.q?.toLowerCase().trim();
  const ministry = params.ministry?.toLowerCase().trim();
  let rows = [...GATI_SHAKTI_LAYER_GROUPS];
  if (ministry) {
    rows = rows.filter((g) => g.ministry.toLowerCase().includes(ministry));
  }
  if (q) {
    rows = rows.filter(
      (g) =>
        g.domain.toLowerCase().includes(q) ||
        g.ministry.toLowerCase().includes(q) ||
        g.keywords.some((k) => k.includes(q)) ||
        g.sampleLayers.some((s) => s.toLowerCase().includes(q))
    );
  }
  const offset = Math.max(0, params.offset ?? 0);
  const limit = Math.min(100, Math.max(1, params.limit ?? 25));
  return {
    total: rows.length,
    totalLayers: GATISHAKTI_NMMP_TOTAL_LAYERS,
    groups: rows.slice(offset, offset + limit),
  };
}

function resolveCaseCoordinates(caseData: CitizenCase): {
  lat: number;
  lng: number;
  source: TriangulationFusionResult['coordinateSource'];
} {
  if (typeof caseData.lat === 'number' && typeof caseData.lng === 'number') {
    return { lat: caseData.lat, lng: caseData.lng, source: 'ticket_pin' };
  }
  const hotspot = DISTRICT_HOTSPOTS.find(
    (d) =>
      d.name.toLowerCase() === caseData.district?.toLowerCase() &&
      d.state.toLowerCase() === caseData.state?.toLowerCase()
  );
  if (hotspot) {
    return { lat: hotspot.coordinates[0], lng: hotspot.coordinates[1], source: 'district_hotspot' };
  }
  if (caseData.district) {
    let hash = 0;
    const key = `${caseData.state}-${caseData.district}`;
    for (let i = 0; i < key.length; i++) hash = (hash << 5) - hash + key.charCodeAt(i);
    const lat = 8 + (Math.abs(hash) % 2800) / 100;
    const lng = 68 + (Math.abs(hash >> 8) % 2800) / 100;
    return { lat, lng, source: 'district_name' };
  }
  return { lat: 22.5937, lng: 78.9629, source: 'fallback_india' };
}

export function triangulateCitizenCase(caseData: CitizenCase): TriangulationFusionResult {
  const coords = resolveCaseCoordinates(caseData);
  return triangulateAgainstMasterplan({
    lat: coords.lat,
    lng: coords.lng,
    category: caseData.category,
    district: caseData.district,
    state: caseData.state,
    stateIso: caseData.stateIsoCode,
    assets: GATI_SHAKTI_SAMPLE_ASSETS,
    layerGroups: GATI_SHAKTI_LAYER_GROUPS,
    coordinateSource: coords.source,
  });
}
