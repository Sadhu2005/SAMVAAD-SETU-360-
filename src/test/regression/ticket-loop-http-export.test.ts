import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Regression: real ticket loop is testable via server export', () => {
  it('starts the HTTP listener only on direct run', () => {
    const server = fs.readFileSync(path.resolve(__dirname, '../../../server.ts'), 'utf-8');
    expect(server).toContain('export { app, startServer }');
    expect(server).toContain('isDirectRun');
    expect(server).toMatch(/if \(isDirectRun\(\)\) \{/);
  });

  it('citizen track exposes a named status for verified tickets', () => {
    const portal = fs.readFileSync(
      path.resolve(__dirname, '../../components/CitizenTrackPortal.tsx'),
      'utf-8'
    );
    expect(portal).toContain('role="status"');
    expect(portal).toContain('CITIZEN_STATUS_LABEL[status]');
  });
});
