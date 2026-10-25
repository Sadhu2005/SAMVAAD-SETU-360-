import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Regression: GitHub Actions CI workflow', () => {
  const ciPath = path.resolve(__dirname, '../../../.github/workflows/ci.yml');

  it('defines ci.yml with lint, governance, and all test tiers', () => {
    expect(fs.existsSync(ciPath)).toBe(true);
    const yaml = fs.readFileSync(ciPath, 'utf-8');
    expect(yaml).toContain('npm run lint');
    expect(yaml).toContain('npm run gov:check');
    expect(yaml).toContain('npm run test:unit');
    expect(yaml).toContain('npm run test:integration');
    expect(yaml).toContain('npm run test:regression');
    expect(yaml).toContain('npm run test:functional');
    expect(yaml).toContain('npm run test:all');
  });
});
