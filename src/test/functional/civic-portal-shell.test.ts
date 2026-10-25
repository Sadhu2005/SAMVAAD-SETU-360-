import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Functional: light civic portal journey surfaces', () => {
  const root = path.resolve(__dirname, '../../');
  const css = fs.readFileSync(path.join(root, 'index.css'), 'utf-8');
  const app = fs.readFileSync(path.join(root, 'App.tsx'), 'utf-8');
  const citizen = fs.readFileSync(path.join(root, 'components/CitizenTrackPortal.tsx'), 'utf-8');
  const government = fs.readFileSync(path.join(root, 'components/GovernmentWorkSurface.tsx'), 'utf-8');

  it('keeps citizen submit/track and government inbox on the same light portal', () => {
    expect(app).toContain('<CitizenTrackPortal');
    expect(app).toContain('<GovernmentWorkSurface');
    expect(app).toContain('Skip to main content');
    expect(css).toContain('--color-gov-page: #f4f6f8');
    expect(css).toContain('.gov-masthead');
    expect(citizen).toContain('bg-gov-card');
    expect(citizen).toContain('bg-gov-teal text-white');
    expect(government).toContain('bg-gov-card');
    expect(government).toContain('bg-gov-navy-soft');
  });
});
