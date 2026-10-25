import { describe, it, expect } from 'vitest';
import {
  submitCitizenCase,
  updateCaseByOfficer,
  citizenVerifyResolution,
} from '../../services/caseService';
import { nextOfficerStep } from '../../utils/ticketLogic';

describe('Functional: officer desk next step follows the live ticket', () => {
  it('walks accept → assign → start work → proof → citizen confirm → close', async () => {
    const ticket = await submitCitizenCase({
      title: 'Open drain beside school',
      description: 'Stagnant water after monsoon',
      category: 'Sanitation & Drainage',
      district: 'Nuh',
      state: 'Haryana',
      contactNumber: '9810012345',
      urgency: 'High',
    });

    expect(nextOfficerStep(ticket.status, 'district_officer').label).toBe('Accept ticket');

    const accepted = await updateCaseByOfficer({
      trackingId: ticket.trackingId,
      status: 'triaged',
      officerName: 'Smt. Rekha',
      officerRole: 'district_admin',
      remarks: 'Accepted for PHED.',
    });
    expect(nextOfficerStep(accepted.status, 'district_officer').label).toBe('Assign to department');

    const assigned = await updateCaseByOfficer({
      trackingId: ticket.trackingId,
      status: 'assigned',
      officerName: 'Smt. Rekha',
      officerRole: 'field_officer',
      department: 'Sanitation & SBM',
      assignedOfficer: 'Er. Imran',
      remarks: 'Assigned to sanitation wing.',
    });
    expect(nextOfficerStep(assigned.status, 'junior_engineer').label).toBe('Start work');

    const started = await updateCaseByOfficer({
      trackingId: ticket.trackingId,
      status: 'in_progress',
      officerName: 'Er. Imran',
      officerRole: 'nodal_engineer',
      remarks: 'Desilting started.',
    });
    expect(nextOfficerStep(started.status, 'junior_engineer').label).toBe('Upload completion proof');

    const proof = await updateCaseByOfficer({
      trackingId: ticket.trackingId,
      status: 'proof_uploaded',
      officerName: 'Er. Imran',
      officerRole: 'nodal_engineer',
      remarks: 'Drain cleared.',
      completionProof: { notes: 'Covered and disinfected.', inspectorName: 'Er. Imran' },
    });
    expect(nextOfficerStep(proof.status, 'district_officer').label).toBe('Waiting for citizen');

    const verified = await citizenVerifyResolution({
      trackingId: ticket.trackingId,
      verified: true,
      last4: '2345',
      satisfactionRating: 4,
    });
    expect(nextOfficerStep(verified.status, 'district_officer').label).toBe('Close ticket');

    const closed = await updateCaseByOfficer({
      trackingId: ticket.trackingId,
      status: 'closed',
      officerName: 'Smt. Rekha',
      officerRole: 'district_admin',
      remarks: 'Closed after citizen confirmation.',
    });
    expect(nextOfficerStep(closed.status, 'district_officer').kind).toBe('wait');
  });
});
