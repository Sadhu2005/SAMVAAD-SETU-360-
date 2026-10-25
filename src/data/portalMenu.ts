export interface PortalMenuItem {
  id: string;
  label: string;
  summary: string;
}

export const PRODUCT_TABS: PortalMenuItem[] = [
  { id: 'citizen-portal', label: 'Citizen', summary: 'File a need, get a tracking ID, and confirm work.' },
  { id: 'government-desk', label: 'Government', summary: 'Officer inbox, assign, start work, and upload proof.' },
];

export const BRIEFING_TABS: PortalMenuItem[] = [
  { id: 'overview', label: 'Overview', summary: 'What SAMVAAD-SETU 360 covers.' },
  { id: 'prototype', label: 'Prototype', summary: 'Live resolution walkthrough.' },
  { id: 'edge-cases', label: '10 Edge Cases', summary: 'Hard civic failure modes.' },
  { id: 'fusion', label: 'Big Data Fusion', summary: 'How public datasets meet tickets.' },
  { id: 'gatishakti', label: 'GatiShakti GIS', summary: 'District infrastructure map briefing.' },
  { id: 'simulator', label: 'Multilingual Voice', summary: 'Voice and language briefing.' },
  { id: 'impact', label: 'DPI Impact', summary: 'Outcome and equity measures.' },
  { id: 'policymakers', label: 'Policymaker Dossiers', summary: 'Notes for district and state officers.' },
  { id: 'research', label: 'Deep Research', summary: 'Policy research workspace.' },
  { id: 'docx-studio', label: 'DOCX Blueprint', summary: 'Export the official briefing pack.' },
];

export const MENU_TAB_ID = 'menu';

export function allPortalTabs(): PortalMenuItem[] {
  return [...PRODUCT_TABS, ...BRIEFING_TABS];
}

export function isPortalTab(id: string): boolean {
  return id === MENU_TAB_ID || allPortalTabs().some((item) => item.id === id);
}
