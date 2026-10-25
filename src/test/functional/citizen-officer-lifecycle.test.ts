import { describe, it, expect } from 'vitest';
import {
  submitCitizenCase,
  getCaseByTrackingId,
  updateCaseByOfficer,
  citizenVerifyResolution
} from '../../services/caseService';

describe('Functional Test: End-to-End Citizen & Officer Operational Lifecycle', () => {
  it('should walk a real citizen need from intake to officer proof upload and citizen confirmation', async () => {
    // 1. Citizen files a real need
    const citizenCase = await submitCitizenCase({
      title: 'Tribal School Footbridge Washed Away in Flash Flood',
      description: 'Over 250 tribal students unable to attend high school across Indravati river.',
      category: 'Bridges & Culverts',
      district: 'Bastar',
      state: 'Chhattisgarh',
      contactNumber: '9425212345',
      spokenDialect: 'Gondi / Halbi',
      channel: 'Gram Panchayat CSC VLE',
      urgency: 'Critical',
    });

    expect(citizenCase.trackingId).toMatch(/^SETU-2026-CH-BAS-[A-F0-9]{4}$/);
    expect(citizenCase.status).toBe('submitted');

    // 2. Government officer inspects the queue and assigns department
    const assignedCase = await updateCaseByOfficer({
      trackingId: citizenCase.trackingId,
      status: 'assigned',
      officerName: 'Er. Rajeshwar Verma',
      officerRole: 'field_officer',
      department: 'State PWD (Bridges & Roads)',
      assignedOfficer: 'Er. Alok Sharma (Assistant Engineer)',
      remarks: 'Sanctioned emergency tribal footbridge culvert under PMGSY Batch IV.',
    });

    expect(assignedCase.status).toBe('assigned');
    expect(assignedCase.assignedDept).toBe('State PWD (Bridges & Roads)');

    // 3. Engineer completes work and uploads photographic proof
    const completedCase = await updateCaseByOfficer({
      trackingId: citizenCase.trackingId,
      status: 'proof_uploaded',
      officerName: 'Er. Alok Sharma',
      officerRole: 'nodal_engineer',
      remarks: 'Concrete box culvert constructed. Handrails and approach road asphalt laid.',
      completionProof: {
        photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f',
        inspectorName: 'Er. Alok Sharma',
        inspectorDesignation: 'Assistant Engineer (PWD)',
        notes: 'Passed load test on 24-Oct-2026. Certified open for student traffic.',
        workOrderCode: 'UJWO-2026-CG-9941',
      },
    });

    expect(completedCase.status).toBe('proof_uploaded');
    expect(completedCase.completionProof).toBeDefined();

    // 4. Citizen retrieves case using tracking ID
    const retrieved = await getCaseByTrackingId(citizenCase.trackingId);
    expect(retrieved.caseData).toBeDefined();
    expect(retrieved.caseData?.status).toBe('proof_uploaded');
    expect(retrieved.auditLogs.length).toBeGreaterThanOrEqual(3);

    // 5. Citizen performs closed-loop sign-off
    const verifiedCase = await citizenVerifyResolution({
      trackingId: citizenCase.trackingId,
      verified: true,
      satisfactionRating: 5,
      feedbackText: 'Footbridge is functioning; school children crossing safely now.',
    });

    expect(verifiedCase.status).toBe('citizen_verified');
    expect(verifiedCase.citizenFeedback?.verified).toBe(true);
    expect(verifiedCase.citizenFeedback?.satisfactionRating).toBe(5);
  });
});
