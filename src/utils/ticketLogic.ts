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

/** 10-digit Indian mobile starting 6–9. Accepts +91 / 0 prefix. */
export function normalizeIndianMobile(contact: string): string | null {
  const digits = (contact || '').replace(/\D/g, '');
  let ten = digits;
  if (digits.length === 12 && digits.startsWith('91')) ten = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith('0')) ten = digits.slice(1);
  if (ten.length !== 10 || !/^[6-9]\d{9}$/.test(ten)) return null;
  return ten;
}

export function isValidIndianMobile(contact: string): boolean {
  return Boolean(normalizeIndianMobile(contact));
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

export type OfficerPerformAction =
  | 'assign'
  | 'proof'
  | 'escalate'
  | 'close_override'
  | 'triage'
  | 'start_work'
  | 'request_info'
  | 'close_verified';

export function canOfficerPerform(role: OfficerRoleKey, action: OfficerPerformAction): boolean {
  if (action === 'proof' || action === 'start_work' || action === 'request_info' || action === 'close_verified') {
    return role === 'junior_engineer' || role === 'dept_admin' || role === 'district_officer' || role === 'collector';
  }
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

export type OfficerDeskUiAction = OfficerDeskAction | 'request_info' | 'wait';

export type OfficerDeskKind = 'primary' | 'secondary' | 'wait';

export type OfficerDeskNeed = 'department' | 'assignee' | 'remarks' | 'proof' | 'override';

export interface OfficerDeskStep {
  action: OfficerDeskUiAction;
  kind: OfficerDeskKind;
  label: string;
  hint: string;
  needs: OfficerDeskNeed[];
}

export const OFFICER_DEPARTMENTS = [
  'State PWD',
  'PHED / Jal Jeevan Mission',
  'Rural Development',
  'Public Health',
  'Electricity / DISCOM',
  'Sanitation & SBM',
  'Education',
  'Forest',
  'Other',
] as const;

export const OFFICER_PIPELINE: { key: string; label: string; statuses: CaseStatus[] }[] = [
  { key: 'received', label: 'Received', statuses: ['submitted'] },
  { key: 'accepted', label: 'Accepted', statuses: ['triaged'] },
  { key: 'assigned', label: 'Assigned', statuses: ['assigned'] },
  { key: 'work', label: 'On site', statuses: ['in_progress', 'citizen_contested'] },
  { key: 'proof', label: 'Proof', statuses: ['proof_uploaded'] },
  { key: 'closed', label: 'Closed', statuses: ['citizen_verified', 'closed', 'rejected'] },
];

export function officerPipelineStage(status: CaseStatus): number {
  const index = OFFICER_PIPELINE.findIndex((stage) => stage.statuses.includes(status));
  return index < 0 ? 0 : index;
}

export function canApplyOfficerAction(status: CaseStatus, action: OfficerDeskAction): boolean {
  switch (action) {
    case 'triage':
      return status === 'submitted';
    case 'assign':
      return status === 'submitted' || status === 'triaged' || status === 'citizen_contested';
    case 'start_work':
      return status === 'assigned' || status === 'citizen_contested';
    case 'proof':
      return status === 'assigned' || status === 'in_progress';
    case 'escalate':
      return status === 'triaged' || status === 'assigned' || status === 'in_progress' || status === 'citizen_contested';
    case 'close_override':
      return status !== 'closed' && status !== 'rejected' && status !== 'citizen_verified';
    case 'close_verified':
      return status === 'citizen_verified';
    default:
      return false;
  }
}

export function isOfficerUiActionReady(status: CaseStatus, action: OfficerDeskUiAction): boolean {
  if (action === 'wait') return true;
  if (action === 'request_info') return status !== 'closed' && status !== 'rejected';
  return canApplyOfficerAction(status, action);
}

export function officerActionBlockedReason(status: CaseStatus, action: OfficerDeskAction): string | undefined {
  if (canApplyOfficerAction(status, action)) return undefined;
  if (action === 'start_work') return 'Assign the case first, then start work.';
  if (action === 'proof') return 'Case must be assigned or in progress before proof.';
  if (action === 'triage') return 'Only a newly submitted case can be triaged.';
  if (action === 'assign') return 'This case is already past assignment.';
  return `Action ${action} is not available from ${status}.`;
}

export const OFFICER_DESK_CATALOG: Record<CaseStatus, OfficerDeskStep[]> = {
  submitted: [
    {
      action: 'triage',
      kind: 'primary',
      label: 'Accept ticket',
      hint: 'Accept this grievance so it can be assigned to a department.',
      needs: [],
    },
    {
      action: 'assign',
      kind: 'secondary',
      label: 'Assign now',
      hint: 'Skip review and send it to a department immediately.',
      needs: ['department', 'assignee'],
    },
    {
      action: 'request_info',
      kind: 'secondary',
      label: 'Ask citizen for more info',
      hint: 'Send a note. Status stays Received.',
      needs: ['remarks'],
    },
  ],
  triaged: [
    {
      action: 'assign',
      kind: 'primary',
      label: 'Assign to department',
      hint: 'Choose the department and the officer who will do the work.',
      needs: ['department', 'assignee'],
    },
    {
      action: 'request_info',
      kind: 'secondary',
      label: 'Ask citizen for more info',
      hint: 'Ask for a clearer photo, landmark, or phone confirmation.',
      needs: ['remarks'],
    },
    {
      action: 'escalate',
      kind: 'secondary',
      label: 'Escalate',
      hint: 'Send this ticket to a higher authority with a note.',
      needs: ['remarks'],
    },
  ],
  assigned: [
    {
      action: 'start_work',
      kind: 'primary',
      label: 'Start work',
      hint: 'Mark that the field team has begun on site.',
      needs: [],
    },
    {
      action: 'proof',
      kind: 'secondary',
      label: 'Upload completion proof',
      hint: 'Use this only if work is already finished. Add a photo or notes.',
      needs: ['proof'],
    },
    {
      action: 'escalate',
      kind: 'secondary',
      label: 'Escalate',
      hint: 'Raise this ticket if the assigned team cannot proceed.',
      needs: ['remarks'],
    },
    {
      action: 'request_info',
      kind: 'secondary',
      label: 'Ask citizen for more info',
      hint: 'Ask for extra site details before work starts.',
      needs: ['remarks'],
    },
  ],
  in_progress: [
    {
      action: 'proof',
      kind: 'primary',
      label: 'Upload completion proof',
      hint: 'Add a site photo or inspector notes so the citizen can confirm.',
      needs: ['proof'],
    },
    {
      action: 'escalate',
      kind: 'secondary',
      label: 'Escalate',
      hint: 'Raise a blocker to a senior officer.',
      needs: ['remarks'],
    },
    {
      action: 'request_info',
      kind: 'secondary',
      label: 'Ask citizen for more info',
      hint: 'Ask the citizen for access or extra details.',
      needs: ['remarks'],
    },
  ],
  proof_uploaded: [
    {
      action: 'wait',
      kind: 'wait',
      label: 'Waiting for citizen',
      hint: 'Proof is on record. The citizen must confirm or say it is not fixed.',
      needs: [],
    },
    {
      action: 'close_override',
      kind: 'secondary',
      label: 'Close without citizen OK',
      hint: 'Collectors only. Write a statutory reason.',
      needs: ['override'],
    },
  ],
  citizen_verified: [
    {
      action: 'close_verified',
      kind: 'primary',
      label: 'Close ticket',
      hint: 'Citizen confirmed the work. Close the case.',
      needs: [],
    },
  ],
  citizen_contested: [
    {
      action: 'start_work',
      kind: 'primary',
      label: 'Resume work',
      hint: 'Citizen said it is not fixed. Send the team back on site.',
      needs: [],
    },
    {
      action: 'assign',
      kind: 'secondary',
      label: 'Reassign department',
      hint: 'Send this to a different team.',
      needs: ['department', 'assignee'],
    },
    {
      action: 'escalate',
      kind: 'secondary',
      label: 'Escalate',
      hint: 'Raise this contested case to a senior officer.',
      needs: ['remarks'],
    },
  ],
  closed: [
    {
      action: 'wait',
      kind: 'wait',
      label: 'Closed',
      hint: 'This ticket is closed. No further officer action.',
      needs: [],
    },
  ],
  rejected: [
    {
      action: 'wait',
      kind: 'wait',
      label: 'Rejected',
      hint: 'This ticket was rejected. No further officer action.',
      needs: [],
    },
  ],
};

function roleCanRunStep(role: OfficerRoleKey, step: OfficerDeskStep): boolean {
  if (step.action === 'wait') return true;
  if (step.action === 'request_info') return canOfficerPerform(role, 'request_info');
  if (step.action === 'start_work') return canOfficerPerform(role, 'start_work');
  if (step.action === 'close_verified') return canOfficerPerform(role, 'close_verified');
  return canOfficerPerform(role, step.action);
}

export function listOfficerDeskSteps(status: CaseStatus, role: OfficerRoleKey): OfficerDeskStep[] {
  return (OFFICER_DESK_CATALOG[status] || []).filter((step) => {
    if (!isOfficerUiActionReady(status, step.action)) return false;
    return roleCanRunStep(role, step);
  });
}

export function nextOfficerStep(status: CaseStatus, role: OfficerRoleKey): OfficerDeskStep {
  const available = listOfficerDeskSteps(status, role);
  const primary = available.find((step) => step.kind === 'primary');
  if (primary) return primary;
  const wait = available.find((step) => step.kind === 'wait');
  if (wait) return wait;
  const catalogPrimary = (OFFICER_DESK_CATALOG[status] || []).find((step) => step.kind === 'primary');
  if (catalogPrimary) {
    return {
      action: 'wait',
      kind: 'wait',
      label: 'Waiting on another officer',
      hint: `${catalogPrimary.label} must be done by a district officer or department admin.`,
      needs: [],
    };
  }
  return {
    action: 'wait',
    kind: 'wait',
    label: 'No action needed',
    hint: 'There is no officer action on this ticket right now.',
    needs: [],
  };
}

export function missingOfficerActionFields(
  step: Pick<OfficerDeskStep, 'action' | 'needs'>,
  fields: { department?: string; assignee?: string; remarks?: string; proof?: string; override?: string }
): string | undefined {
  if (step.needs.includes('department') && !fields.department?.trim()) {
    return 'Choose a department.';
  }
  if (step.needs.includes('remarks') && !fields.remarks?.trim()) {
    return step.action === 'escalate'
      ? 'Write why this ticket is being escalated.'
      : 'Write the question for the citizen.';
  }
  if (step.needs.includes('proof') && !fields.proof?.trim() && !fields.remarks?.trim()) {
    return 'Add a proof photo or write inspector notes.';
  }
  if (step.needs.includes('override') && !fields.override?.trim()) {
    return 'Write the collector override reason.';
  }
  return undefined;
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
