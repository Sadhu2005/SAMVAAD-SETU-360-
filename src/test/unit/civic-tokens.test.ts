import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Unit: civic design tokens', () => {
  const css = fs.readFileSync(path.resolve(__dirname, '../../index.css'), 'utf-8');

  it('defines official navy, teal, page, card, and text tokens', () => {
    expect(css).toContain('--color-gov-navy: #0b2545');
    expect(css).toContain('--color-gov-teal: #0f766e');
    expect(css).toContain('--color-gov-page: #f4f6f8');
    expect(css).toContain('--color-gov-card: #ffffff');
    expect(css).toContain('--color-gov-text: #1e293b');
    expect(css).toContain('--color-gov-border: #cbd5e1');
    expect(css).toContain('--color-gov-error: #b91c1c');
  });

  it('requires visible 3px navy focus and 44px tap targets', () => {
    expect(css).toMatch(/outline:\s*3px solid var\(--color-gov-navy\)/);
    expect(css).toContain('min-height: 44px');
  });
});
