import { describe, it, expect } from 'vitest';
import { GATI_SHAKTI_LAYER_GROUPS } from '../../data/gatiShaktiLayerCatalog';
import { GATI_SHAKTI_SAMPLE_ASSETS } from '../../data/gatiShaktiSampleAssets';
import {
  buildJointWorkOrderCode,
  haversineKm,
  triangulateAgainstMasterplan,
} from '../../utils/gatiShaktiTriangulation';

describe('Unit: GatiShakti point triangulation', () => {
  it('computes haversine distance in km', () => {
    const d = haversineKm(19.074, 81.956, 19.082, 81.942);
    expect(d).toBeGreaterThan(0);
    expect(d).toBeLessThan(5);
  });

  it('matches Bastar culvert ticket coordinates to PMGSY asset', () => {
    const fusion = triangulateAgainstMasterplan({
      lat: 19.074,
      lng: 81.956,
      category: 'Bridges & Culverts',
      district: 'Bastar',
      state: 'Chhattisgarh',
      stateIso: 'CG',
      assets: GATI_SHAKTI_SAMPLE_ASSETS,
      layerGroups: GATI_SHAKTI_LAYER_GROUPS,
      coordinateSource: 'ticket_pin',
    });
    expect(fusion.gatiShaktiAssetId).toBe('GATI-CG-BST-BR-4190');
    expect(fusion.jointWorkOrderCode).toMatch(/^UJWO-CG-/);
    expect(fusion.synergyScore).toBeGreaterThan(50);
  });

  it('builds Beckn-style UJWO codes', () => {
    expect(buildJointWorkOrderCode('HR', 'GATI-HR-NUH-IRR-1188')).toMatch(/^UJWO-HR-\d{4}-/);
  });
});
