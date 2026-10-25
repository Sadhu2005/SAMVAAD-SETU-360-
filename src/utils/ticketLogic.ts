export type CaseStatus =
  | 'submitted'
  | 'triaged'
  | 'assigned'
  | 'in_progress'
  | 'proof_uploaded'
  | 'citizen_verified'
  | 'citizen_contested'
  | 'closed'
  | 'rejected';

export type OfficerRoleKey = 'district_officer' | 'junior_engineer' | 'dept_admin' | 'collector';

export interface CompletionProof {
  photoUrl?: string;
  photoDescription?: string;
  geoLatitude?: number;
  geoLongitude?: number;
  inspectorName?: string;
  inspectorDesignation?: string;
  signedOffAt?: string;
  notes?: string;
  workOrderCode?: string;
}

export const CITIZEN_STATUS_LABEL: Record<CaseStatus, string> = {
  submitted: 'Received',
  triaged: 'Under review',
  assigned: 'Assigned',
  in_progress: 'In progress',
  proof_uploaded: 'Proof uploaded',
  citizen_verified: 'Verified by you',
  citizen_contested: 'You said not fixed',
  closed: 'Closed',
  rejected: 'Rejected / fraud',
};

export const VALID_TRANSITIONS: Record<CaseStatus, CaseStatus[]> = {
  submitted: ['triaged', 'assigned', 'rejected'],
  triaged: ['assigned', 'rejected'],
  assigned: ['in_progress', 'proof_uploaded', 'rejected'],
  in_progress: ['proof_uploaded', 'rejected'],
  proof_uploaded: ['citizen_verified', 'citizen_contested'],
  citizen_verified: ['closed'],
  citizen_contested: ['in_progress', 'assigned'],
  closed: [],
  rejected: [],
};

export function extractPhoneLast4(contact: string): string {
  const clean = contact.replace(/\D/g, '');
  return clean.length >= 4 ? clean.slice(-4) : 'XXXX';
}

export function last4Matches(storedLast4: string | undefined, provided: string): boolean {
  const a = (storedLast4 || '').replace(/\D/g, '');
  const b = provided.replace(/\D/g, '');
  return a.length === 4 && a === b;
}

export function isSlaBreached(createdAt: string, slaDeadlineHours: number, now = Date.now()): boolean {
  const start = new Date(createdAt).getTime();
  if (Number.isNaN(start)) return false;
  return now > start + slaDeadlineHours * 3600 * 1000;
}

export function computeSlaDeadlineAt(createdAt: string, slaDeadlineHours: number): string {
  return new Date(new Date(createdAt).getTime() + slaDeadlineHours * 3600 * 1000).toISOString();
}

export function suggestedSchemeForCategory(category: string): string {
  const map: Record<string, string> = {
    'Bridges & Culverts': 'PMGSY Batch IV / 15th FC untied grant',
    'Piped Drinking Water': 'Jal Jeevan Mission',
    'Rural Roads & Connectivity': 'PMGSY / Bharatmala feeder',
    'Healthcare Sub-Center': 'NHM / 15th FC health grant',
    'Power & Electrification': 'RDSS / PM-KUSUM',
    'Sanitation & Drainage': 'SBM-G / AMRUT 2.0',
  };
  return map[category] || 'District collector discretionary / relevant central scheme';
}

export function isValidTransition(from: CaseStatus, to: CaseStatus): boolean {
  return VALID_TRANSITIONS[from]?.includes(to) ?? false;
}

export function enforceGovernmentWorkflowGuards(params: {
  currentStatus: CaseStatus;
  targetStatus: CaseStatus;
  proof?: CompletionProof;
  closeOverrideReason?: string;
  officerRoleKey?: OfficerRoleKey;
}): { allowed: boolean; reason?: string } {
  const { currentStatus, targetStatus, proof, closeOverrideReason, officerRoleKey } = params;

  if (targetStatus === 'proof_uploaded') {
    if (currentStatus === 'submitted' || currentStatus === 'triaged') {
      return { allowed: false, reason: 'Case must be triaged and assigned before work completion.' };
    }
    if (!proof || (!proof.photoUrl && !proof.notes)) {
      return { allowed: false, reason: 'Physical completion proof or inspector notes required.' };
    }
  }

  if (targetStatus === 'closed') {
    if (currentStatus === 'citizen_verified') {
      return { allowed: true };
    }
    const canOverride = officerRoleKey === 'collector' && Boolean(closeOverrideReason?.trim());
    if (!canOverride) {
      return {
        allowed: false,
        reason: 'Cannot close case without citizen confirmation or a collector override reason.',
      };
    }
    return { allowed: true };
  }

  if (!isValidTransition(currentStatus, targetStatus)) {
    return { allowed: false, reason: `Invalid status jump from ${currentStatus} to ${targetStatus}.` };
  }

  return { allowed: true };
}

export function canOfficerPerform(role: OfficerRoleKey, action: 'assign' | 'proof' | 'escalate' | 'close_override' | 'triage'): boolean {
  if (action === 'proof') return role === 'junior_engineer' || role === 'dept_admin' || role === 'district_officer' || role === 'collector';
  if (action === 'assign' || action === 'triage' || action === 'escalate') {
    return role === 'district_officer' || role === 'dept_admin' || role === 'collector';
  }
  if (action === 'close_override') return role === 'collector';
  return false;
}

export type OfficerDeskAction =
  | 'triage'
  | 'assign'
  | 'start_work'
  | 'proof'
  | 'escalate'
  | 'close_override'
  | 'close_verified';

export function canApplyOfficerAction(status: CaseStatus, action: OfficerDeskAction): boolean {
  switch (action) {
    case 'triage':
      return status === 'submitted';
    case 'assign':
      return status === 'submitted' || status === 'triaged';
    case 'start_work':
      return status === 'assigned';
    case 'proof':
      return status === 'assigned' || status === 'in_progress';
    case 'escalate':
      return status === 'triaged' || status === 'assigned' || status === 'in_progress';
    case 'close_override':
      return status !== 'closed' && status !== 'rejected' && status !== 'citizen_verified';
    case 'close_verified':
      return status === 'citizen_verified';
    default:
      return false;
  }
}

export function officerActionBlockedReason(status: CaseStatus, action: OfficerDeskAction): string | undefined {
  if (canApplyOfficerAction(status, action)) return undefined;
  if (action === 'start_work') return 'Assign the case first, then start work.';
  if (action === 'proof') return 'Case must be assigned or in progress before proof.';
  if (action === 'triage') return 'Only a newly submitted case can be triaged.';
  if (action === 'assign') return 'This case is already past assignment.';
  return `Action ${action} is not available from ${status}.`;
}

/** Firestore rejects `undefined` field values. Strip them (including nested objects). */
export function omitUndefined<T>(value: T): T {
  if (value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) {
    return value.map((item) => omitUndefined(item)) as T;
  }
  const out: Record<string, unknown> = {};
  for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
    if (nested === undefined) continue;
    out[key] = omitUndefined(nested);
  }
  return out as T;
}

export function maskCaseForPublic<T extends { citizenToken?: string; officerPhone?: string; phoneLast4?: string }>(
  caseData: T,
  reveal: boolean
): T {
  if (reveal) return caseData;
  return {
    ...caseData,
    citizenToken: undefined,
    officerPhone: undefined,
    phoneLast4: undefined,
  };
}
