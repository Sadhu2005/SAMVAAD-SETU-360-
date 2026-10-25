import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Unit Test: Agentic Delivery Governance (work-items.json)', () => {
  const rootPath = path.resolve(__dirname, '../../../');
  const workItemsFile = path.join(rootPath, 'work-items.json');

  it('should verify that /work-items.json exists and parses as valid JSON', () => {
    expect(fs.existsSync(workItemsFile)).toBe(true);
    const content = fs.readFileSync(workItemsFile, 'utf-8');
    const data = JSON.parse(content);
    expect(data.version).toBe(1);
    expect(data.policy).toBeDefined();
    expect(data.policy.source_of_truth).toContain('owns work lifecycle');
    expect(data.policy.production_boundary).toContain('explicit owner approval');
    expect(data.policy.agent_registration_requirement).toContain('MANDATORY');
  });

  it('should verify that all work items have unique IDs, valid statuses, and non-empty scopes', () => {
    const data = JSON.parse(fs.readFileSync(workItemsFile, 'utf-8'));
    const validStatuses = ['queued', 'in_progress', 'blocked', 'local_verified', 'approved_for_staging', 'completed'];
    const ids = new Set<string>();

    expect(data.items.length).toBeGreaterThanOrEqual(4);

    for (const item of data.items) {
      expect(item.id).toBeDefined();
      expect(ids.has(item.id)).toBe(false);
      ids.add(item.id);

      expect(validStatuses).toContain(item.status);
      expect(item.scope).toBeDefined();
      expect(Array.isArray(item.scope.write_globs)).toBe(true);
      expect(item.acceptance.length).toBeGreaterThan(0);
    }
  });

  it('should verify dependency tree integrity without dangling references', () => {
    const data = JSON.parse(fs.readFileSync(workItemsFile, 'utf-8'));
    const allIds = new Set(data.items.map((i: any) => i.id));

    for (const item of data.items) {
      for (const dep of item.depends_on) {
        expect(allIds.has(dep)).toBe(true);
      }
    }
  });
});
