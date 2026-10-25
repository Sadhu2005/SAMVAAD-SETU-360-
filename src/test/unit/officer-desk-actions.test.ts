import { describe, it, expect } from 'vitest';
import {
  canOfficerPerform,
  listOfficerDeskSteps,
  missingOfficerActionFields,
  nextOfficerStep,
  officerActionBlockedReason,
  officerPipelineStage,
} from '../../utils/ticketLogic';

describe('Unit: officer desk next-step catalog', () => {
  it('gives a district officer one primary action per live status', () => {
    expect(nextOfficerStep('submitted', 'district_officer').label).toBe('Accept ticket');
    expect(nextOfficerStep('triaged', 'district_officer').label).toBe('Assign to department');
    expect(nextOfficerStep('assigned', 'district_officer').label).toBe('Start work');
    expect(nextOfficerStep('in_progress', 'district_officer').label).toBe('Upload completion proof');
    expect(nextOfficerStep('proof_uploaded', 'district_officer').label).toBe('Waiting for citizen');
    expect(nextOfficerStep('citizen_verified', 'district_officer').label).toBe('Close ticket');
    expect(nextOfficerStep('citizen_contested', 'district_officer').label).toBe('Resume work');
    expect(nextOfficerStep('closed', 'district_officer').kind).toBe('wait');
  });

  it('lets a junior engineer start work after assignment but not accept a new ticket', () => {
    expect(canOfficerPerform('junior_engineer', 'start_work')).toBe(true);
    expect(canOfficerPerform('junior_engineer', 'proof')).toBe(true);
    expect(canOfficerPerform('junior_engineer', 'triage')).toBe(false);
    expect(nextOfficerStep('submitted', 'junior_engineer').label).toBe('Waiting on another officer');
    expect(nextOfficerStep('assigned', 'junior_engineer').label).toBe('Start work');
    expect(listOfficerDeskSteps('submitted', 'junior_engineer').some((step) => step.action === 'triage')).toBe(false);
  });

  it('advances the pipeline stage in ticket order', () => {
    expect(officerPipelineStage('submitted')).toBe(0);
    expect(officerPipelineStage('assigned')).toBe(2);
    expect(officerPipelineStage('in_progress')).toBe(3);
    expect(officerPipelineStage('citizen_contested')).toBe(3);
    expect(officerPipelineStage('closed')).toBe(5);
  });

  it('requires remarks, proof, or override when the step says so', () => {
    expect(
      missingOfficerActionFields({ action: 'request_info', needs: ['remarks'] }, { remarks: '' })
    ).toMatch(/question for the citizen/);
    expect(
      missingOfficerActionFields({ action: 'escalate', needs: ['remarks'] }, { remarks: '' })
    ).toMatch(/escalated/);
    expect(
      missingOfficerActionFields({ action: 'proof', needs: ['proof'] }, { remarks: '', proof: '' })
    ).toMatch(/proof photo or write inspector notes/);
    expect(
      missingOfficerActionFields({ action: 'proof', needs: ['proof'] }, { remarks: 'Site cleared' })
    ).toBeUndefined();
    expect(
      missingOfficerActionFields({ action: 'close_override', needs: ['override'] }, { override: '' })
    ).toMatch(/override reason/);
    expect(officerActionBlockedReason('submitted', 'start_work')).toMatch(/Assign the case first/);
  });
});
