import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Regression: GatiShakti stays server-side', () => {
  it('does not expose GATISHAKTI secrets as VITE_ client env', () => {
    const example = fs.readFileSync(path.resolve(__dirname, '../../../.env.example'), 'utf-8');
    expect(example).toContain('GATISHAKTI_GIS_BASE_URL');
    expect(example).not.toMatch(/VITE_GATISHAKTI/);
  });

  it('routes triangulation through ticketApi not direct catalog import in desk', () => {
    const desk = fs.readFileSync(
      path.resolve(__dirname, '../../components/GovernmentWorkSurface.tsx'),
      'utf-8'
    );
    expect(desk).toContain('apiGatiShaktiTriangulate');
    expect(desk).not.toContain('GATI_SHAKTI_SAMPLE_ASSETS');
  });
});
