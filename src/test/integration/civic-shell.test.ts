import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Integration: civic app shell contracts', () => {
  const app = fs.readFileSync(path.resolve(__dirname, '../../App.tsx'), 'utf-8');
  const header = fs.readFileSync(path.resolve(__dirname, '../../components/Header.tsx'), 'utf-8');

  it('exposes a skip link targeting main content', () => {
    expect(app).toContain('Skip to main content');
    expect(app).toContain('href="#main-content"');
    expect(app).toContain('id="main-content"');
  });

  it('uses a light civic page and grey footer without confetti chrome', () => {
    expect(app).toContain('bg-gov-page');
    expect(app).toContain('gov-footer');
    expect(app).not.toContain('canvas-confetti');
    expect(app).not.toContain('bg-slate-950');
  });

  it('lists Citizen and Government as text navigation first', () => {
    expect(header).toContain('PRODUCT_TABS');
    expect(header).toContain('Menu');
    expect(header).not.toContain('Sparkles');
    expect(header).not.toContain('Globe2');
    expect(header).not.toContain('सं');
    expect(header).not.toContain('aria-label="Briefing"');
  });
});
