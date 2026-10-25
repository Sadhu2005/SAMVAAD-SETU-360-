import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/u;

function walkTsx(dir: string): string[] {
  return fs.readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) return walkTsx(full);
    return name.endsWith('.tsx') ? [full] : [];
  });
}

describe('Regression: civic UI has no decorative emoji or AI branding icons', () => {
  it('keeps component screens free of emoji and Sparkles/Globe branding', () => {
    const files = walkTsx(path.resolve(__dirname, '../../components'));
    expect(files.length).toBeGreaterThan(8);
    for (const file of files) {
      const src = fs.readFileSync(file, 'utf-8');
      expect(src, path.basename(file)).not.toMatch(EMOJI);
      expect(src, path.basename(file)).not.toContain('Sparkles');
      expect(src, path.basename(file)).not.toContain('Globe2');
    }
  });

  it('strips emoji from README headings', () => {
    const readme = fs.readFileSync(path.resolve(__dirname, '../../../README.md'), 'utf-8');
    const headings = readme.split(/\r?\n/).filter((line) => /^#{1,6}\s/.test(line));
    expect(headings.length).toBeGreaterThan(5);
    for (const heading of headings) {
      expect(heading).not.toMatch(EMOJI);
    }
  });
});
