import { describe, it, expect } from 'vitest';
import { enforceGovernmentWorkflowGuards } from '../../utils/ticketLogic';

describe('Regression Test: Case Workflow Guardrails & Anti-Tamper Logic', () => {
  it('should block premature resolution proof upload when case is still in unassigned submitted state', () => {
    const result = enforceGovernmentWorkflowGuards({
      currentStatus: 'submitted',
      targetStatus: 'proof_uploaded',
      proof: { notes: 'Done' },
    });
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('triaged and assigned');
  });

  it('should reject closing a ticket before citizen has signed off on the resolution', () => {
    const result = enforceGovernmentWorkflowGuards({
      currentStatus: 'in_progress',
      targetStatus: 'closed',
    });
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('citizen confirmation');
  });

  it('should allow closing when citizen has confirmed resolution', () => {
    const result = enforceGovernmentWorkflowGuards({
      currentStatus: 'citizen_verified',
      targetStatus: 'closed',
    });
    expect(result.allowed).toBe(true);
  });
});
