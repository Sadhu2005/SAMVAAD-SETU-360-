import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Regression: Bhashini keys stay server-side', () => {
  it('does not expose BHASHINI secrets as VITE_ client env', () => {
    const example = fs.readFileSync(path.resolve(__dirname, '../../../.env.example'), 'utf-8');
    expect(example).toContain('BHASHINI_USER_ID');
    expect(example).not.toMatch(/VITE_BHASHINI/);
  });

  it('calls Bhashini only from ticketApi server route', () => {
    const api = fs.readFileSync(path.resolve(__dirname, '../../services/ticketApi.ts'), 'utf-8');
    expect(api).toContain('/bhashini/transcribe');
    expect(api).not.toContain('BHASHINI_ULCA_API_KEY');
  });
});
