import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Regression: briefing links stay on the Menu page, not the header wrap', () => {
  const root = path.resolve(__dirname, '../../');
  const header = fs.readFileSync(path.join(root, 'components/Header.tsx'), 'utf-8');
  const menu = fs.readFileSync(path.join(root, 'components/MenuPage.tsx'), 'utf-8');
  const catalog = fs.readFileSync(path.join(root, 'data/portalMenu.ts'), 'utf-8');

  it('does not render the old wrapping briefing nav in the masthead', () => {
    expect(header).not.toContain('GatiShakti GIS');
    expect(header).not.toContain('Policymaker Dossiers');
    expect(header).toContain('Menu');
    expect(menu).toContain('BRIEFING_TABS');
    expect(menu).toContain('Tickets');
    expect(menu).toContain('Briefing');
    expect(catalog).toContain("label: 'GatiShakti GIS'");
    expect(catalog).toContain("label: 'Policymaker Dossiers'");
  });
});
