import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  addDoc
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import {
  type CaseStatus,
  type CompletionProof,
  type OfficerRoleKey,
  computeSlaDeadlineAt,
  enforceGovernmentWorkflowGuards,
  extractPhoneLast4,
  isSlaBreached,
  last4Matches,
  suggestedSchemeForCategory,
} from '../utils/ticketLogic';

export type { CaseStatus, CompletionProof, OfficerRoleKey };
export { enforceGovernmentWorkflowGuards, isSlaBreached, last4Matches, suggestedSchemeForCategory };

function canUseFirestore(): boolean {
  return isFirebaseConfigured() && Boolean(db);
}

export interface CitizenFeedback {
  verified: boolean;
  satisfactionRating?: number; // 1 to 5
  feedbackText?: string;
  verifiedAt: string;
}

export interface AuditLogEntry {
  id?: string;
  caseId: string;
  timestamp: string;
  actor: string;
  role: 'citizen' | 'field_officer' | 'district_admin' | 'nodal_engineer' | 'dpi_engine' | 'collector';
  action: string;
  details: string;
  previousStatus?: CaseStatus;
  newStatus?: CaseStatus;
}

export interface CitizenCase {
  id: string;
  trackingId: string;
  citizenToken: string;
  citizenPhoneMasked: string;
  title: string;
  category: 'Bridges & Culverts' | 'Piped Drinking Water' | 'Rural Roads & Connectivity' | 'Healthcare Sub-Center' | 'Power & Electrification' | 'Sanitation & Drainage';
  description: string;
  spokenDialect: string;
  channel: 'IVR Voice Call 1912' | 'WhatsApp Audio Bot' | 'Web Citizen Portal' | 'Gram Panchayat CSC VLE';
  district: string;
  state: string;
  urgency: 'Critical' | 'High' | 'Medium' | 'Low';
  status: CaseStatus;
  dipsScore: number;
  mpiDeficitMultiplier: string;
  assignedDept?: string;
  assignedOfficer?: string;
  officerPhone?: string;
  slaDeadlineHours: number;
  createdAt: string;
  updatedAt: string;
  completionProof?: CompletionProof;
  citizenFeedback?: CitizenFeedback;
  gatiShaktiAssetId?: string;
  cadastralParcel?: string;
  village?: string;
  lat?: number;
  lng?: number;
  language?: string;
  voiceUrl?: string;
  photoUrl?: string;
  phoneLast4?: string;
  suggestedScheme?: string;
  slaDeadlineAt?: string;
  rejectedReason?: string;
  closeOverrideReason?: string;
}

// Generate durable public tracking ID format: SETU-2026-ST-DIS-XXXX
export function generateTrackingId(state: string, district: string): string {
  const stCode = (state.substring(0, 2) || 'IN').toUpperCase();
  const distCode = (district.substring(0, 3) || 'GEN').toUpperCase();
  const randomHex = Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, '0');
  return `SETU-2026-${stCode}-${distCode}-${randomHex}`;
}

// DPDP 2023 Ephemeral Tokenizer
export function generateDpdpToken(contact: string): { maskedContact: string; dpdpToken: string; last4: string } {
  const last4 = extractPhoneLast4(contact);
  const maskedContact = `+91 ******${last4}`;
  
  let hash = 0;
  for (let i = 0; i < contact.length; i++) {
    hash = (hash << 5) - hash + contact.charCodeAt(i);
    hash |= 0;
  }
  const dpdpToken = `0x${Math.abs(hash).toString(16).padStart(8, '0')}...${last4}`;
  return { maskedContact, dpdpToken, last4 };
}

// Local mock store for test environments or offline connectivity
const localCasesMap = new Map<string, CitizenCase>();
const localAuditLogsMap = new Map<string, AuditLogEntry[]>();

// Seed default initial case if empty
export function seedDefaultCases() {
  if (localCasesMap.size === 0) {
    const defaultCase: CitizenCase = {
      id: 'case-bastar-001',
      trackingId: 'SETU-2026-CG-BST-4190',
      citizenToken: '0x7f9a2b8e...3210',
      citizenPhoneMasked: '+91 ******3210',
      title: 'Monsoon Inundation Culvert Washout at Rampur River',
      category: 'Bridges & Culverts',
      description: 'The low-level causeway connecting Rampur to 14 tribal habitations scoured abutments and broken central pier during flash flood.',
      spokenDialect: 'Bhojpuri / Gondi Dialect',
      channel: 'IVR Voice Call 1912',
      district: 'Bastar',
      state: 'Chhattisgarh',
      urgency: 'Critical',
      status: 'assigned',
      dipsScore: 94.8,
      mpiDeficitMultiplier: '7.4x (MPI 0.43 Bastar Tribal Belt)',
      assignedDept: 'State PWD (Bridges & National Highways)',
      assignedOfficer: 'Er. Rajeshwar Verma (Executive Engineer)',
      officerPhone: '+91 94252 XXXXX',
      slaDeadlineHours: 72,
      createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
      gatiShaktiAssetId: 'GATI-CG-BST-BR-4190',
      cadastralParcel: 'Survey of India #314/B',
      village: 'Rampur',
      phoneLast4: '3210',
      suggestedScheme: 'PMGSY Batch IV / 15th FC untied grant',
      slaDeadlineAt: computeSlaDeadlineAt(new Date(Date.now() - 36 * 3600 * 1000).toISOString(), 72),
      lat: 19.074,
      lng: 81.956,
    };
    localCasesMap.set(defaultCase.trackingId, defaultCase);

    localAuditLogsMap.set(defaultCase.trackingId, [
      {
        caseId: defaultCase.trackingId,
        timestamp: defaultCase.createdAt,
        actor: 'Citizen (Voice 1912)',
        role: 'citizen',
        action: 'Case Submitted',
        details: 'Citizen called toll-free 1912; Bhashini speech-to-text ingested audio in Gondi/Bhojpuri.',
        newStatus: 'submitted',
      },
      {
        caseId: defaultCase.trackingId,
        timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        actor: 'DPI AI Engine',
        role: 'dpi_engine',
        action: 'Geospatial Triangulation & DIPS Scoring',
        details: 'Correlated with PM GatiShakti GIS asset GATI-CG-BST-BR-4190. DIPS score assigned 94.8.',
        previousStatus: 'submitted',
        newStatus: 'triaged',
      },
      {
        caseId: defaultCase.trackingId,
        timestamp: defaultCase.updatedAt,
        actor: 'District Magistrate Bastar',
        role: 'district_admin',
        action: 'Department Assignment',
        details: 'Assigned to State PWD. Nodal Engineer Er. Rajeshwar Verma dispatched with 72hr SLA.',
        previousStatus: 'triaged',
        newStatus: 'assigned',
      },
    ]);
  }
}
seedDefaultCases();

/**
 * Submit a new citizen case to Firestore (with local fallback)
 */
export async function submitCitizenCase(params: {
  title: string;
  description: string;
  category: CitizenCase['category'];
  district: string;
  state: string;
  contactNumber: string;
  spokenDialect?: string;
  channel?: CitizenCase['channel'];
  urgency?: CitizenCase['urgency'];
  dipsScore?: number;
  village?: string;
  lat?: number;
  lng?: number;
  language?: string;
  voiceUrl?: string;
  photoUrl?: string;
  suggestedScheme?: string;
}): Promise<CitizenCase> {
  const trackingId = generateTrackingId(params.state, params.district);
  const { maskedContact, dpdpToken, last4 } = generateDpdpToken(params.contactNumber);
  const now = new Date().toISOString();
  const slaDeadlineHours = params.urgency === 'Critical' ? 48 : 72;

  const newCase: CitizenCase = {
    id: `case-${Date.now()}`,
    trackingId,
    citizenToken: dpdpToken,
    citizenPhoneMasked: maskedContact,
    title: params.title,
    description: params.description,
    category: params.category,
    district: params.district,
    state: params.state,
    spokenDialect: params.spokenDialect || 'Hindi / Vernacular',
    channel: params.channel || 'Web Citizen Portal',
    urgency: params.urgency === 'Critical' || params.urgency === 'Low' || params.urgency === 'Medium' ? params.urgency : 'High',
    status: 'submitted',
    dipsScore: params.dipsScore || 88.5,
    mpiDeficitMultiplier: '5.2x (Multidimensional Poverty Multiplier)',
    slaDeadlineHours,
    createdAt: now,
    updatedAt: now,
    village: params.village,
    lat: params.lat,
    lng: params.lng,
    language: params.language || params.spokenDialect || 'Hindi',
    voiceUrl: params.voiceUrl,
    photoUrl: params.photoUrl,
    phoneLast4: last4,
    suggestedScheme: params.suggestedScheme || suggestedSchemeForCategory(params.category),
    slaDeadlineAt: computeSlaDeadlineAt(now, slaDeadlineHours),
  };

  // 1. Try Firebase Firestore
  try {
    if (!canUseFirestore()) throw new Error('Firestore not configured');
    const caseDocRef = doc(db!, 'cases', trackingId);
    await setDoc(caseDocRef, newCase);

    const auditRef = collection(db!, 'cases', trackingId, 'audit_logs');
    await addDoc(auditRef, {
      caseId: trackingId,
      timestamp: now,
      actor: maskedContact,
      role: 'citizen',
      action: 'Case Ingested',
      details: `Citizen filed infrastructure request under category ${params.category} via ${newCase.channel}.`,
      newStatus: 'submitted',
    });
  } catch (err) {
    console.warn('Firestore write fallback to local storage:', err);
  }

  // Always sync to local store
  localCasesMap.set(trackingId, newCase);
  localAuditLogsMap.set(trackingId, [
    {
      caseId: trackingId,
      timestamp: now,
      actor: maskedContact,
      role: 'citizen',
      action: 'Case Ingested',
      details: `Citizen filed infrastructure request under category ${params.category} via ${newCase.channel}.`,
      newStatus: 'submitted',
    },
  ]);

  return newCase;
}

/**
 * Retrieve case by Tracking ID
 */
export async function getCaseByTrackingId(trackingId: string): Promise<{
  caseData: CitizenCase | null;
  auditLogs: AuditLogEntry[];
}> {
  const cleanId = trackingId.trim().toUpperCase();

  // 1. Try Firestore
  try {
    if (!canUseFirestore()) throw new Error('Firestore not configured');
    const caseDocRef = doc(db!, 'cases', cleanId);
    const snap = await getDoc(caseDocRef);
    if (snap.exists()) {
      const caseData = snap.data() as CitizenCase;
      const logsSnap = await getDocs(collection(db!, 'cases', cleanId, 'audit_logs'));
      const auditLogs: AuditLogEntry[] = [];
      logsSnap.forEach(d => auditLogs.push(d.data() as AuditLogEntry));
      auditLogs.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      return { caseData, auditLogs };
    }
  } catch (err) {
    console.warn('Firestore read fallback to local storage:', err);
  }

  // 2. Local fallback
  const caseData = localCasesMap.get(cleanId) || null;
  const auditLogs = localAuditLogsMap.get(cleanId) || [];
  return { caseData, auditLogs };
}

/**
 * Get all cases (for government dashboard)
 */
export async function getAllCases(): Promise<CitizenCase[]> {
  try {
    if (!canUseFirestore()) throw new Error('Firestore not configured');
    const snap = await getDocs(collection(db!, 'cases'));
    if (!snap.empty) {
      const list: CitizenCase[] = [];
      snap.forEach(d => list.push(d.data() as CitizenCase));
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return list;
    }
  } catch (err) {
    console.warn('Firestore getAllCases fallback to local cache:', err);
  }

  return Array.from(localCasesMap.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * Update case status and department triage (Government Action)
 */
export async function updateCaseByOfficer(params: {
  trackingId: string;
  status: CaseStatus;
  officerName: string;
  officerRole: AuditLogEntry['role'];
  department?: string;
  assignedOfficer?: string;
  officerPhone?: string;
  remarks: string;
  completionProof?: CompletionProof;
  closeOverrideReason?: string;
  officerRoleKey?: OfficerRoleKey;
}): Promise<CitizenCase> {
  const { caseData } = await getCaseByTrackingId(params.trackingId);
  if (!caseData) throw new Error(`Case ${params.trackingId} not found`);

  const guard = enforceGovernmentWorkflowGuards({
    currentStatus: caseData.status,
    targetStatus: params.status,
    proof: params.completionProof,
    closeOverrideReason: params.closeOverrideReason,
    officerRoleKey: params.officerRoleKey,
  });
  if (!guard.allowed) {
    throw new Error(guard.reason || 'Workflow guard rejected this action');
  }

  const prevStatus = caseData.status;
  const now = new Date().toISOString();

  caseData.status = params.status;
  caseData.updatedAt = now;
  if (params.department) caseData.assignedDept = params.department;
  if (params.assignedOfficer) caseData.assignedOfficer = params.assignedOfficer;
  if (params.officerPhone) caseData.officerPhone = params.officerPhone;
  if (params.completionProof) caseData.completionProof = params.completionProof;
  if (params.closeOverrideReason) caseData.closeOverrideReason = params.closeOverrideReason;
  if (params.status === 'rejected') caseData.rejectedReason = params.remarks;

  // 1. Try Firestore
  try {
    if (!canUseFirestore()) throw new Error('Firestore not configured');
    const caseDocRef = doc(db!, 'cases', params.trackingId);
    await updateDoc(caseDocRef, { ...caseData });
    await addDoc(collection(db!, 'cases', params.trackingId, 'audit_logs'), {
      caseId: params.trackingId,
      timestamp: now,
      actor: params.officerName,
      role: params.officerRole,
      action: `Status updated to ${params.status}`,
      details: params.remarks,
      previousStatus: prevStatus,
      newStatus: params.status,
    });
  } catch (err) {
    console.warn('Firestore update fallback to local store:', err);
  }

  // 2. Sync local store
  localCasesMap.set(params.trackingId, caseData);
  const logs = localAuditLogsMap.get(params.trackingId) || [];
  logs.push({
    caseId: params.trackingId,
    timestamp: now,
    actor: params.officerName,
    role: params.officerRole,
    action: `Status updated to ${params.status}`,
    details: params.remarks,
    previousStatus: prevStatus,
    newStatus: params.status,
  });
  localAuditLogsMap.set(params.trackingId, logs);

  return caseData;
}

/**
 * Citizen closed-loop sign-off (Verify or Contest)
 */
export async function citizenVerifyResolution(params: {
  trackingId: string;
  verified: boolean;
  satisfactionRating?: number;
  feedbackText?: string;
  last4?: string;
}): Promise<CitizenCase> {
  const { caseData } = await getCaseByTrackingId(params.trackingId);
  if (!caseData) throw new Error(`Case ${params.trackingId} not found`);
  if (params.last4 && caseData.phoneLast4 && !last4Matches(caseData.phoneLast4, params.last4)) {
    throw new Error('Phone last-4 does not match this ticket');
  }

  const now = new Date().toISOString();
  const newStatus: CaseStatus = params.verified ? 'citizen_verified' : 'citizen_contested';

  caseData.status = newStatus;
  caseData.updatedAt = now;
  caseData.citizenFeedback = {
    verified: params.verified,
    satisfactionRating: params.satisfactionRating || (params.verified ? 5 : 1),
    feedbackText: params.feedbackText || (params.verified ? 'Citizen verified on-ground completion.' : 'Citizen reported issue persists.'),
    verifiedAt: now,
  };

  const detailsText = caseData.citizenFeedback.feedbackText || (params.verified ? 'Citizen verified on-ground completion.' : 'Citizen reported issue persists.');

  try {
    if (!canUseFirestore()) throw new Error('Firestore not configured');
    const caseDocRef = doc(db!, 'cases', params.trackingId);
    await updateDoc(caseDocRef, { ...caseData });
    await addDoc(collection(db!, 'cases', params.trackingId, 'audit_logs'), {
      caseId: params.trackingId,
      timestamp: now,
      actor: caseData.citizenPhoneMasked,
      role: 'citizen',
      action: params.verified ? 'Citizen Verified Resolution' : 'Citizen Contested Resolution',
      details: detailsText,
      newStatus,
    });
  } catch (err) {
    console.warn('Firestore citizen verification fallback to local store:', err);
  }

  localCasesMap.set(params.trackingId, caseData);
  const logs = localAuditLogsMap.get(params.trackingId) || [];
  logs.push({
    caseId: params.trackingId,
    timestamp: now,
    actor: caseData.citizenPhoneMasked,
    role: 'citizen',
    action: params.verified ? 'Citizen Verified Resolution' : 'Citizen Contested Resolution',
    details: detailsText,
    newStatus,
  });
  localAuditLogsMap.set(params.trackingId, logs);

  return caseData;
}

export async function appendCaseNote(params: {
  trackingId: string;
  actor: string;
  role: AuditLogEntry['role'];
  details: string;
}): Promise<CitizenCase> {
  const { caseData } = await getCaseByTrackingId(params.trackingId);
  if (!caseData) throw new Error(`Case ${params.trackingId} not found`);
  const now = new Date().toISOString();
  caseData.updatedAt = now;
  const entry: AuditLogEntry = {
    caseId: params.trackingId,
    timestamp: now,
    actor: params.actor,
    role: params.role,
    action: 'Request more information',
    details: params.details,
    previousStatus: caseData.status,
    newStatus: caseData.status,
  };
  try {
    if (!canUseFirestore()) throw new Error('Firestore not configured');
    await updateDoc(doc(db!, 'cases', params.trackingId), { updatedAt: now });
    await addDoc(collection(db!, 'cases', params.trackingId, 'audit_logs'), entry);
  } catch (err) {
    console.warn('Firestore note fallback:', err);
  }
  const logs = localAuditLogsMap.get(params.trackingId) || [];
  logs.push(entry);
  localAuditLogsMap.set(params.trackingId, logs);
  localCasesMap.set(params.trackingId, caseData);
  return caseData;
}

export function filterOfficerInbox(
  cases: CitizenCase[],
  filters: { district?: string; urgency?: string; department?: string; slaBreach?: boolean }
): CitizenCase[] {
  return cases.filter((c) => {
    if (filters.district && c.district.toLowerCase() !== filters.district.toLowerCase()) return false;
    if (filters.urgency && c.urgency !== filters.urgency) return false;
    if (filters.department && !(c.assignedDept || '').toLowerCase().includes(filters.department.toLowerCase())) {
      return false;
    }
    if (filters.slaBreach && !isSlaBreached(c.createdAt, c.slaDeadlineHours)) return false;
    return true;
  });
}
