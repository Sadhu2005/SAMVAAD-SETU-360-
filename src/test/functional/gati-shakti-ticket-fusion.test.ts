import { describe, it, expect } from 'vitest';
import { submitCitizenCase, saveGatiShaktiFusion, getCaseByTrackingId } from '../../services/caseService';

describe('Functional: GatiShakti fusion persisted on ticket', () => {
  it('stores asset id, synergy, and UJWO without changing status', async () => {
    const created = await submitCitizenCase({
      title: 'Culvert washout',
      description: 'Causeway submerged',
      category: 'Bridges & Culverts',
      district: 'Bastar',
      state: 'Chhattisgarh',
      contactNumber: '9876500011',
      lat: 19.074,
      lng: 81.956,
    });

    const updated = await saveGatiShaktiFusion({
      trackingId: created.trackingId,
      officerName: 'District Officer',
      fusion: {
        gatiShaktiAssetId: 'GATI-CG-BST-BR-4190',
        cadastralParcel: 'Survey of India #314/B',
        synergyScore: 88.2,
        matchedLayerIds: ['GS-MORD-PMGSY'],
        primaryDept: 'State PWD (Bridges)',
        secondaryDept: 'MoRD PMGSY',
        jointWorkOrderCode: 'UJWO-CG-2026-BR4190',
        coordinateSource: 'ticket_pin',
      },
    });

    expect(updated.status).toBe('submitted');
    expect(updated.jointWorkOrderCode).toContain('UJWO-CG');

    const loaded = await getCaseByTrackingId(created.trackingId);
    expect(loaded.caseData?.gatiShaktiSynergyScore).toBe(88.2);
  });
});
