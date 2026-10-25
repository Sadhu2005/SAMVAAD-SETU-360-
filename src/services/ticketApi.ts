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

export async function apiAttachTicketMedia(
  trackingId: string,
  last4: string,
  media: { voiceUrl?: string; photoUrl?: string }
): Promise<CitizenCase> {
  const res = await fetch(`${API}/tickets/${encodeURIComponent(trackingId)}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ last4, ...media }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Media attach failed');
  return data.case;
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
  state?: string;
  urgency?: string;
  department?: string;
  slaBreach?: boolean;
}): Promise<CitizenCase[]> {
  const params = new URLSearchParams();
  if (filters?.district) params.set('district', filters.district);
  if (filters?.state) params.set('state', filters.state);
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

export interface DeskAssistResponse {
  success: boolean;
  source: 'gemini' | 'rules';
  model?: string;
  assist: {
    summary: string;
    suggestedDepartment: string;
    suggestedUrgency: string;
    remarksDraft: string;
  };
}

export interface GatiShaktiCatalogSummary {
  totalLayers: number;
  layerGroups: number;
  ministries: number;
  liveGisConnected: boolean;
  source: string;
}

export interface GatiShaktiTriangulateResponse {
  success: boolean;
  liveGis: boolean;
  fusion: {
    coordinateSource: string;
    lat: number;
    lng: number;
    synergyScore: number;
    gatiShaktiAssetId: string;
    cadastralParcel: string;
    primaryDept: string;
    secondaryDept?: string;
    jointWorkOrderCode: string;
    matchedAssets: Array<{ assetId: string; name: string; distanceKm: number }>;
    matchedLayerGroups: Array<{ id: string; ministry: string; domain: string; layerCount: number }>;
  };
  case: CitizenCase;
}

export async function apiGatiShaktiCatalogSummary(): Promise<GatiShaktiCatalogSummary> {
  const res = await fetch(`${API}/gati-shakti/catalog/summary`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'GatiShakti catalog summary failed');
  return data;
}

export async function apiNitiDistrictProfile(state: string, district: string) {
  const params = new URLSearchParams({ state, district });
  const res = await fetch(`${API}/niti/district?${params}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'NITI district lookup failed');
  return data;
}

export async function apiNitiEnrichTicket(
  trackingId: string,
  officerName: string
): Promise<{ success: boolean; case: CitizenCase }> {
  const res = await fetch(`${API}/niti/enrich-ticket`, {
    method: 'POST',
    headers: officerHeaders(),
    body: JSON.stringify({ trackingId, officerName }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'NITI enrich failed');
  return data;
}

export async function apiGatiShaktiTriangulate(
  trackingId: string,
  officerName: string
): Promise<GatiShaktiTriangulateResponse> {
  const res = await fetch(`${API}/gati-shakti/triangulate`, {
    method: 'POST',
    headers: officerHeaders(),
    body: JSON.stringify({ trackingId, officerName }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'GatiShakti triangulation failed');
  return data;
}

export async function apiBhashiniTranscribe(
  trackingId: string,
  officerName: string
): Promise<{
  success: boolean;
  source: 'bhashini' | 'cached';
  transcript: string;
  sourceLanguage: string;
  case: CitizenCase;
}> {
  const res = await fetch(`${API}/bhashini/transcribe`, {
    method: 'POST',
    headers: officerHeaders(),
    body: JSON.stringify({ trackingId, officerName }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Bhashini transcribe failed');
  return data;
}

export async function apiDeskAssist(trackingId: string): Promise<DeskAssistResponse> {
  const res = await fetch(`${API}/gemini/desk-assist`, {
    method: 'POST',
    headers: officerHeaders(),
    body: JSON.stringify({ trackingId }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Desk assist failed');
  return data;
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
