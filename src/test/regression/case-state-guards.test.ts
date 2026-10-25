import { describe, it, expect } from 'vitest';
import {
  CitizenCase,
  CompletionProof
} from '../../services/caseService';

export function enforceGovernmentWorkflowGuards(
  currentCase: CitizenCase,
  targetStatus: CitizenCase['status'],
  proof?: CompletionProof
): { allowed: boolean; reason?: string } {
  // Guard 1: Cannot mark proof_uploaded without completionProof object
  if (targetStatus === 'proof_uploaded') {
    if (!proof || (!proof.photoUrl && !proof.notes)) {
      return { allowed: false, reason: 'Physical completion proof or inspector notes required.' };
    }
  }

  // Guard 2: Cannot close without citizen verification or contestation review
  if (targetStatus === 'closed') {
    if (currentCase.status !== 'citizen_verified' && currentCase.status !== 'citizen_contested') {
      return { allowed: false, reason: 'Cannot close case without citizen confirmation or review.' };
    }
  }

  // Guard 3: Cannot upload proof if work was never assigned
  if (targetStatus === 'proof_uploaded' && currentCase.status === 'submitted') {
    return { allowed: false, reason: 'Case must be triaged and assigned before work completion.' };
  }

  return { allowed: true };
}

describe('Regression Test: Case Workflow Guardrails & Anti-Tamper Logic', () => {
  const sampleCase: CitizenCase = {
    id: 'reg-case-1',
    trackingId: 'SETU-2026-CG-BST-9999',
    citizenToken: '0x123...456',
    citizenPhoneMasked: '+91 ******4567',
    title: 'Dry canal overflow',
    category: 'Sanitation & Drainage',
    description: 'Canal banks scoured during rain',
    spokenDialect: 'Hindi',
    channel: 'Web Citizen Portal',
    district: 'Bastar',
    state: 'Chhattisgarh',
    urgency: 'Medium',
    status: 'submitted',
    dipsScore: 78,
    mpiDeficitMultiplier: '3.5x',
    slaDeadlineHours: 72,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it('should block premature resolution proof upload when case is still in unassigned submitted state', () => {
    const result = enforceGovernmentWorkflowGuards(sampleCase, 'proof_uploaded', { notes: 'Done' });
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('triaged and assigned');
  });

  it('should reject closing a ticket before citizen has signed off on the resolution', () => {
    const assignedCase: CitizenCase = { ...sampleCase, status: 'in_progress' };
    const result = enforceGovernmentWorkflowGuards(assignedCase, 'closed');
    expect(result.allowed).toBe(false);
    expect(result.reason).toContain('citizen confirmation');
  });

  it('should allow closing when citizen has confirmed resolution', () => {
    const verifiedCase: CitizenCase = { ...sampleCase, status: 'citizen_verified' };
    const result = enforceGovernmentWorkflowGuards(verifiedCase, 'closed');
    expect(result.allowed).toBe(true);
  });
});
