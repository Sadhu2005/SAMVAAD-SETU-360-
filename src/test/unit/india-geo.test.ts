import { describe, it, expect } from 'vitest';
import { districtSlug, listBundledDistricts, listBundledStates, resolveGeoLocation } from '../../services/geoService';
import { generateTrackingId, submitCitizenCase } from '../../services/caseService';

describe('Unit: India geo master and tracking codes', () => {
  it('lists all states/UTs and cascades districts for Chhattisgarh', () => {
    const states = listBundledStates();
    expect(states).toHaveLength(36);
    expect(states.some((s) => s.isoCode === 'CG' && s.lgdCode === 22)).toBe(true);
    const districts = listBundledDistricts(22);
    expect(districts.find((d) => d.name === 'Bastar')?.lgdCode).toBe(384);
    expect(districts.every((d) => d.stateLgdCode === 22)).toBe(true);
  });

  it('resolves official names and aliases, and uses ISO codes in tracking IDs', () => {
    const bastar = resolveGeoLocation('Chhattisgarh', 'Bastar');
    expect(bastar?.state.isoCode).toBe('CG');
    expect(bastar?.district.lgdCode).toBe(384);
    expect(resolveGeoLocation('CG', 'Dantewada (South Bastar)')?.district.name).toBe('Dantewada');
    expect(resolveGeoLocation('Haryana', 'Mewat')?.district.name).toBe('Nuh');
    expect(generateTrackingId('Chhattisgarh', 'Bastar')).toMatch(/^SETU-2026-CG-BAS-[A-F0-9]{4}$/);
    expect(generateTrackingId('Uttar Pradesh', 'Varanasi')).toMatch(/^SETU-2026-UP-VAR-[A-F0-9]{4}$/);
    expect(districtSlug('North 24 Parganas')).toBe('NOR');
  });

  it('rejects unknown state or district on submit', async () => {
    expect(resolveGeoLocation('Neverland', 'Bastar')).toBeNull();
    expect(resolveGeoLocation('Chhattisgarh', 'NotADistrict')).toBeNull();
    await expect(
      submitCitizenCase({
        title: 'Ghost culvert',
        description: 'Should not persist',
        category: 'Bridges & Culverts',
        district: 'NotADistrict',
        state: 'Chhattisgarh',
        contactNumber: '9000011112',
      })
    ).rejects.toThrow(/Unknown state or district/);
  });
});
