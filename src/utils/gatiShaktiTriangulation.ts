import type { GatiShaktiLayerGroup } from '../data/gatiShaktiLayerCatalog';
import type { GatiShaktiSampleAsset } from '../data/gatiShaktiSampleAssets';

const EARTH_RADIUS_KM = 6371;

export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

export function cadastralPlotFromCoordinates(lat: number, lng: number): string {
  const sheet = Math.floor(Math.abs(lat * 100)) % 999;
  const parcel = Math.floor(Math.abs(lng * 100)) % 999;
  return `Survey of India #${sheet}/${parcel}`;
}

export function buildJointWorkOrderCode(stateIso: string, assetId: string): string {
  const year = new Date().getFullYear();
  const tail = assetId.replace(/[^A-Z0-9]/gi, '').slice(-6).toUpperCase();
  return `UJWO-${stateIso || 'IN'}-${year}-${tail}`;
}

function categoryMatchScore(ticketCategory: string | undefined, asset: GatiShaktiSampleAsset): number {
  if (!ticketCategory) return 0.35;
  const norm = ticketCategory.toLowerCase();
  if (asset.categories.some((c) => norm.includes(c.toLowerCase().split('&')[0].trim()))) return 1;
  if (asset.categories.some((c) => c.toLowerCase().includes(norm.split(' ')[0]))) return 0.75;
  return 0.2;
}

export interface TriangulatedAssetMatch {
  assetId: string;
  name: string;
  layerGroupId: string;
  distanceKm: number;
  primaryDept: string;
  secondaryDept?: string;
  relevance: number;
}

export interface TriangulationFusionResult {
  coordinateSource: 'ticket_pin' | 'district_hotspot' | 'district_name' | 'fallback_india';
  lat: number;
  lng: number;
  matchedAssets: TriangulatedAssetMatch[];
  matchedLayerGroups: Pick<GatiShaktiLayerGroup, 'id' | 'ministry' | 'domain' | 'layerCount'>[];
  synergyScore: number;
  gatiShaktiAssetId: string;
  cadastralParcel: string;
  primaryDept: string;
  secondaryDept?: string;
  jointWorkOrderCode: string;
}

export function triangulateAgainstMasterplan(params: {
  lat: number;
  lng: number;
  category?: string;
  district?: string;
  state?: string;
  stateIso?: string;
  assets: GatiShaktiSampleAsset[];
  layerGroups: GatiShaktiLayerGroup[];
  radiusKm?: number;
  coordinateSource: TriangulationFusionResult['coordinateSource'];
}): TriangulationFusionResult {
  const radiusKm = params.radiusKm ?? 35;
  const normDistrict = params.district?.toLowerCase().trim();

  const scored = params.assets
    .map((asset) => {
      const distanceKm = haversineKm(params.lat, params.lng, asset.lat, asset.lng);
      const districtBoost =
        normDistrict && asset.district?.toLowerCase() === normDistrict ? 0.25 : 0;
      const cat = categoryMatchScore(params.category, asset);
      const distanceFactor = Math.max(0, 1 - distanceKm / radiusKm);
      const relevance = Number((cat * 0.55 + distanceFactor * 0.45 + districtBoost).toFixed(3));
      return { asset, distanceKm, relevance };
    })
    .filter((row) => row.distanceKm <= radiusKm || row.relevance >= 0.55)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 5);

  const primary = scored[0]?.asset ?? params.assets[0];
  const matchedAssets: TriangulatedAssetMatch[] = scored.map((row) => ({
    assetId: row.asset.assetId,
    name: row.asset.name,
    layerGroupId: row.asset.layerGroupId,
    distanceKm: Number(row.distanceKm.toFixed(2)),
    primaryDept: row.asset.primaryDept,
    secondaryDept: row.asset.secondaryDept,
    relevance: row.relevance,
  }));

  const groupIds = [...new Set(matchedAssets.map((m) => m.layerGroupId))];
  const matchedLayerGroups = params.layerGroups
    .filter((g) => groupIds.includes(g.id))
    .map(({ id, ministry, domain, layerCount }) => ({ id, ministry, domain, layerCount }));

  const avgRelevance =
    matchedAssets.length > 0
      ? matchedAssets.reduce((s, m) => s + m.relevance, 0) / matchedAssets.length
      : 0.4;
  const synergyScore = Number(Math.min(99, Math.max(12, avgRelevance * 100)).toFixed(1));

  return {
    coordinateSource: params.coordinateSource,
    lat: params.lat,
    lng: params.lng,
    matchedAssets,
    matchedLayerGroups,
    synergyScore,
    gatiShaktiAssetId: primary.assetId,
    cadastralParcel: cadastralPlotFromCoordinates(params.lat, params.lng),
    primaryDept: primary.primaryDept,
    secondaryDept: primary.secondaryDept,
    jointWorkOrderCode: buildJointWorkOrderCode(params.stateIso || 'IN', primary.assetId),
  };
}
