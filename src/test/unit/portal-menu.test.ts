import { describe, it, expect } from 'vitest';
import { BRIEFING_TABS, MENU_TAB_ID, PRODUCT_TABS, allPortalTabs, isPortalTab } from '../../data/portalMenu';

describe('Unit: portal menu catalog', () => {
  it('keeps Citizen and Government first and unique briefing ids', () => {
    expect(PRODUCT_TABS.map((t) => t.label)).toEqual(['Citizen', 'Government']);
    const ids = allPortalTabs().map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(BRIEFING_TABS).toHaveLength(10);
    expect(isPortalTab(MENU_TAB_ID)).toBe(true);
    expect(isPortalTab('unknown-page')).toBe(false);
  });
});
