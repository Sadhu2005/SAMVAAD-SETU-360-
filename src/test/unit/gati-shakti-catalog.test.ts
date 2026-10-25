import { describe, it, expect } from 'vitest';
import {
  GATISHAKTI_NMMP_TOTAL_LAYERS,
  GATI_SHAKTI_LAYER_GROUPS,
} from '../../data/gatiShaktiLayerCatalog';
import { queryGatiShaktiCatalog } from '../../services/gatiShaktiService';

describe('Unit: PM GatiShakti NMMP catalog', () => {
  it('exposes 1,400+ national masterplan layers', () => {
    expect(GATISHAKTI_NMMP_TOTAL_LAYERS).toBeGreaterThanOrEqual(1400);
    expect(GATI_SHAKTI_LAYER_GROUPS.length).toBeGreaterThanOrEqual(20);
  });

  it('filters catalog groups by keyword', () => {
    const pmgsy = queryGatiShaktiCatalog({ q: 'pmgsy', limit: 10 });
    expect(pmgsy.groups.some((g) => g.id.includes('PMGSY') || g.keywords.includes('pmgsy'))).toBe(true);
  });
});
