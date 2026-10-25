import { describe, it, expect } from 'vitest';
import {
  canApplyOfficerAction,
  listOfficerDeskSteps,
  nextOfficerStep,
  officerActionBlockedReason,
} from '../../utils/ticketLogic';

describe('Regression: officer desk cannot skip assignment or leak collector powers', () => {
  it('still blocks start work and proof on a newly received ticket', () => {
    expect(canApplyOfficerAction('submitted', 'start_work')).toBe(false);
    expect(canApplyOfficerAction('submitted', 'proof')).toBe(false);
    expect(officerActionBlockedReason('submitted', 'proof')).toMatch(/assigned or in progress/);
    expect(nextOfficerStep('submitted', 'district_officer').action).toBe('triage');
    expect(listOfficerDeskSteps('submitted', 'district_officer').some((step) => step.action === 'proof')).toBe(false);
  });

  it('hides collector override from non-collectors after proof is uploaded', () => {
    const district = listOfficerDeskSteps('proof_uploaded', 'district_officer');
    const collector = listOfficerDeskSteps('proof_uploaded', 'collector');
    expect(district.some((step) => step.action === 'close_override')).toBe(false);
    expect(collector.some((step) => step.action === 'close_override')).toBe(true);
    expect(nextOfficerStep('proof_uploaded', 'collector').action).toBe('wait');
  });

  it('does not let a junior engineer assign or escalate', () => {
    expect(listOfficerDeskSteps('triaged', 'junior_engineer').some((step) => step.action === 'assign')).toBe(false);
    expect(listOfficerDeskSteps('assigned', 'junior_engineer').some((step) => step.action === 'escalate')).toBe(false);
    expect(nextOfficerStep('triaged', 'junior_engineer').label).toBe('Waiting on another officer');
  });
});
