import type { CaseStatus, CitizenCase, AuditLogEntry, CompletionProof } from './caseService';
import type { OfficerRoleKey } from '../utils/ticketLogic';

const API = '/api/v1';

function officerHeaders(pin?: string): HeadersInit {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const deskPin = pin || import.meta.env?.VITE_OFFICER_DESK_PIN || 'setu-desk-2026';
  headers['X-Officer-Pin'] = deskPin;
  return headers;
}

export async function apiSubmitTicket(body: Record<string, unknown>): Promise<{ trackingId: string; case: CitizenCase }> {
  const res = await fetch(`${API}/tickets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Submit failed');
  return data;
}

export async function apiTrackTicket(
  trackingId: string,
  last4?: string
): Promise<{ case: CitizenCase | null; auditLogs: AuditLogEntry[]; masked?: boolean }> {
  const q = last4 ? `?last4=${encodeURIComponent(last4)}` : '';
  const res = await fetch(`${API}/tickets/${encodeURIComponent(trackingId)}${q}`);
  const data = await res.json();
  if (res.status === 404) return { case: null, auditLogs: [] };
  if (!res.ok) throw new Error(data.error || 'Track failed');
  return { case: data.case, auditLogs: data.auditLogs || [], masked: data.masked };
}

export async function apiVerifyTicket(
  trackingId: string,
  last4: string,
  verified: boolean,
  feedbackText?: string
): Promise<CitizenCase> {
  const res = await fetch(`${API}/tickets/${encodeURIComponent(trackingId)}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ verified, last4, feedbackText }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Verify failed');
  return data.case;
}

export async function apiOfficerInbox(filters?: {
  district?: string;
  urgency?: string;
  department?: string;
  slaBreach?: boolean;
}): Promise<CitizenCase[]> {
  const params = new URLSearchParams();
  if (filters?.district) params.set('district', filters.district);
  if (filters?.urgency) params.set('urgency', filters.urgency);
  if (filters?.department) params.set('department', filters.department);
  if (filters?.slaBreach) params.set('slaBreach', '1');
  const res = await fetch(`${API}/officer/inbox?${params.toString()}`, { headers: officerHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Inbox failed');
  return data.cases || [];
}

export async function apiAssignTicket(
  trackingId: string,
  body: {
    officerName: string;
    officerRoleKey: OfficerRoleKey;
    department: string;
    assignedOfficer: string;
    remarks: string;
    status?: CaseStatus;
  }
): Promise<CitizenCase> {
  const res = await fetch(`${API}/tickets/${encodeURIComponent(trackingId)}/assign`, {
    method: 'POST',
    headers: officerHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Assign failed');
  return data.case;
}

export async function apiProofTicket(
  trackingId: string,
  body: {
    officerName: string;
    officerRoleKey: OfficerRoleKey;
    remarks: string;
    completionProof: CompletionProof;
  }
): Promise<CitizenCase> {
  const res = await fetch(`${API}/tickets/${encodeURIComponent(trackingId)}/proof`, {
    method: 'POST',
    headers: officerHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Proof failed');
  return data.case;
}

export async function apiOfficerUpdate(
  trackingId: string,
  body: {
    status: CaseStatus;
    officerName: string;
    officerRoleKey: OfficerRoleKey;
    remarks: string;
    department?: string;
    assignedOfficer?: string;
    completionProof?: CompletionProof;
    closeOverrideReason?: string;
    noteOnly?: boolean;
  }
): Promise<CitizenCase> {
  const res = await fetch(`${API}/tickets/${encodeURIComponent(trackingId)}/action`, {
    method: 'POST',
    headers: officerHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Update failed');
  return data.case;
}
