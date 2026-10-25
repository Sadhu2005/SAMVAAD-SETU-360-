import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Regression: GitHub Actions CI workflow', () => {
  const ciPath = path.resolve(__dirname, '../../../.github/workflows/ci.yml');

  it('defines separate CI jobs for lint, governance, and each test tier', () => {
    expect(fs.existsSync(ciPath)).toBe(true);
    const yaml = fs.readFileSync(ciPath, 'utf-8');
    expect(yaml).toContain('npm run lint');
    expect(yaml).toContain('npm run gov:check');
    expect(yaml).toContain('npm run test:unit');
    expect(yaml).toContain('npm run test:integration');
    expect(yaml).toContain('npm run test:regression');
    expect(yaml).toContain('npm run test:functional');
    expect(yaml).toMatch(/^\s+lint:\s*$/m);
    expect(yaml).toMatch(/^\s+governance:\s*$/m);
    expect(yaml).toMatch(/^\s+test-unit:\s*$/m);
    expect(yaml).toMatch(/^\s+ci-success:\s*$/m);
  });
});
