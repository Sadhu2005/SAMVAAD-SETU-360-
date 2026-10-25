import React, { useEffect, useState } from 'react';
import {
  Filter,
  LogOut,
  Upload,
  AlertTriangle,
} from 'lucide-react';
import type { CaseStatus, CitizenCase } from '../services/caseService';
import { apiAssignTicket, apiOfficerInbox, apiOfficerUpdate, apiProofTicket } from '../services/ticketApi';
import {
  clearOfficerSession,
  expectedDeskPin,
  getOfficerSession,
  setOfficerSession,
  type OfficerSession,
} from '../services/officerSession';
import {
  canOfficerPerform,
  CITIZEN_STATUS_LABEL,
  isSlaBreached,
  officerActionBlockedReason,
  type OfficerRoleKey,
} from '../utils/ticketLogic';
import { fileToDataUrl, uploadTicketMedia } from '../services/mediaUpload';

const ROLES: { id: OfficerRoleKey; label: string }[] = [
  { id: 'district_officer', label: 'District officer' },
  { id: 'junior_engineer', label: 'Junior Engineer' },
  { id: 'dept_admin', label: 'Department admin' },
  { id: 'collector', label: 'Collector' },
];

export const GovernmentWorkSurface: React.FC<{ initialTrackingId?: string }> = ({ initialTrackingId }) => {
  const [session, setSession] = useState<OfficerSession | null>(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState<OfficerRoleKey>('district_officer');
  const [pin, setPin] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const [cases, setCases] = useState<CitizenCase[]>([]);
  const [selected, setSelected] = useState<CitizenCase | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [district, setDistrict] = useState('');
  const [urgency, setUrgency] = useState('');
  const [department, setDepartment] = useState('');
  const [slaOnly, setSlaOnly] = useState(false);

  const [dept, setDept] = useState('State PWD');
  const [assignee, setAssignee] = useState('');
  const [remarks, setRemarks] = useState('');
  const [override, setOverride] = useState('');
  const [proofFile, setProofFile] = useState<string>('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setSession(getOfficerSession());
  }, []);

  useEffect(() => {
    if (session) void loadInbox();
  }, [session, district, urgency, department, slaOnly]);

  const loadInbox = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await apiOfficerInbox({
        district: district || undefined,
        urgency: urgency || undefined,
        department: department || undefined,
        slaBreach: slaOnly || undefined,
      });
      setCases(list);
      if (initialTrackingId) {
        const hit = list.find((c) => c.trackingId === initialTrackingId);
        if (hit) setSelected(hit);
        else if (list[0] && !selected) setSelected(list[0]);
      } else if (list[0] && !selected) {
        setSelected(list[0]);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setLoginError('Enter your name');
      return;
    }
    if (pin.trim() !== expectedDeskPin()) {
      setLoginError('Desk PIN is incorrect');
      return;
    }
    const next: OfficerSession = { name: name.trim(), role, loggedInAt: new Date().toISOString() };
    setOfficerSession(next);
    setSession(next);
    setLoginError(null);
  };

  const runAction = async (
    status: CaseStatus,
    extra?: { noteOnly?: boolean; proof?: boolean; closeOverride?: boolean; escalate?: boolean }
  ) => {
    if (!selected || !session) return;
    setBusy(true);
    setError(null);
    try {
      let updated: CitizenCase;
      if (extra?.noteOnly) {
        updated = await apiOfficerUpdate(selected.trackingId, {
          status: selected.status,
          officerName: session.name,
          officerRoleKey: session.role,
          remarks:
            remarks ||
            (extra.escalate ? 'Escalated to next authority.' : 'Please provide additional site details.'),
          noteOnly: true,
        });
      } else if (extra?.proof) {
        const photoUrl = proofFile ? await uploadTicketMedia(selected.trackingId, 'proof', proofFile) : '';
        updated = await apiProofTicket(selected.trackingId, {
          officerName: session.name,
          officerRoleKey: session.role,
          remarks,
          completionProof: {
            photoUrl,
            notes: remarks || 'Field inspection complete',
            inspectorName: session.name,
            signedOffAt: new Date().toISOString(),
            geoLatitude: selected.lat,
            geoLongitude: selected.lng,
          },
        });
      } else if (status === 'assigned') {
        updated = await apiAssignTicket(selected.trackingId, {
          officerName: session.name,
          officerRoleKey: session.role,
          department: dept,
          assignedOfficer: assignee || session.name,
          remarks: remarks || `Assigned to ${dept}`,
          status: 'assigned',
        });
      } else {
        updated = await apiOfficerUpdate(selected.trackingId, {
          status,
          officerName: session.name,
          officerRoleKey: session.role,
          remarks: remarks || `Updated to ${status}`,
          department: dept,
          assignedOfficer: assignee,
          closeOverrideReason: extra?.closeOverride ? override : undefined,
        });
      }
      setSelected(updated);
      await loadInbox();
      setRemarks('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (!session) {
    return (
      <div className="max-w-md mx-auto bg-gov-card border border-gov-border rounded-sm p-6 space-y-4">
        <h2 className="text-2xl font-black text-gov-text">Officer Command Desk</h2>
        <p className="text-sm text-gov-muted">Sign in with your role and desk PIN. Tickets are live — not demo cards.</p>
        <form onSubmit={login} className="space-y-3">
          <label className="block space-y-1">
            <span className="text-sm font-semibold">Your name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full min-h-11 rounded-sm bg-gov-inset border border-gov-border px-3" />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-semibold">Role</span>
            <select value={role} onChange={(e) => setRole(e.target.value as OfficerRoleKey)} className="w-full min-h-11 rounded-sm bg-gov-inset border border-gov-border px-3">
              {ROLES.map((r) => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-semibold">Desk PIN</span>
            <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} className="w-full min-h-11 rounded-sm bg-gov-inset border border-gov-border px-3" />
          </label>
          {loginError && <p className="text-sm text-gov-error">{loginError}</p>}
          <button type="submit" className="w-full min-h-12 rounded-sm bg-gov-teal text-white font-black">
            Open inbox
          </button>
        </form>
        <p className="text-[11px] text-gov-muted">Local default PIN is documented in .env.example as VITE_OFFICER_DESK_PIN.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase font-bold text-gov-teal">Government</p>
          <h2 className="text-2xl font-black text-gov-text">Officer Command Desk</h2>
          <p className="text-sm text-gov-muted">{session.name} · {ROLES.find((r) => r.id === session.role)?.label}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            clearOfficerSession();
            setSession(null);
          }}
          className="min-h-11 px-3 rounded-sm bg-gov-inset border border-gov-border text-sm flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>

      {error && <div className="rounded-sm border border-gov-error bg-gov-error-bg px-3 py-2 text-sm text-gov-error">{error}</div>}

      <div className="flex flex-wrap gap-2 items-end bg-gov-card border border-gov-border rounded-sm p-3">
        <Filter className="w-4 h-4 text-gov-muted" />
        <input value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="District" className="min-h-11 rounded-sm bg-gov-inset border border-gov-border px-2 text-sm" />
        <select value={urgency} onChange={(e) => setUrgency(e.target.value)} className="min-h-11 rounded-sm bg-gov-inset border border-gov-border px-2 text-sm">
          <option value="">All urgency</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" className="min-h-11 rounded-sm bg-gov-inset border border-gov-border px-2 text-sm" />
        <label className="flex items-center gap-2 text-sm min-h-11">
          <input type="checkbox" checked={slaOnly} onChange={(e) => setSlaOnly(e.target.checked)} />
          SLA breach
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 max-h-[70vh] overflow-y-auto bg-gov-card border border-gov-border">
          {loading && <p className="text-sm text-gov-muted p-3">Loading inbox…</p>}
          {!loading && cases.length === 0 && <p className="text-sm text-gov-muted p-3">No live tickets yet. A citizen must submit first.</p>}
          {!loading && cases.length > 0 && (
            <>
              <div className="lg:hidden space-y-2 p-2">
                {cases.map((c) => {
                  const breach = isSlaBreached(c.createdAt, c.slaDeadlineHours);
                  return (
                    <button
                      key={c.trackingId}
                      type="button"
                      onClick={() => setSelected(c)}
                      className={`w-full text-left border p-3 min-h-16 ${
                        selected?.trackingId === c.trackingId ? 'border-gov-navy bg-gov-navy-soft' : 'border-gov-border bg-gov-card'
                      }`}
                    >
                      <p className="font-mono text-[11px] text-gov-teal">{c.trackingId}</p>
                      <p className="font-bold text-gov-text text-sm">{c.title}</p>
                      <p className="text-xs text-gov-muted">
                        {CITIZEN_STATUS_LABEL[c.status]} · {c.district}
                        {breach ? ' · SLA breach' : ''}
                      </p>
                    </button>
                  );
                })}
              </div>
              <table className="hidden lg:table w-full text-sm">
                <thead className="bg-gov-inset text-left text-gov-navy">
                  <tr>
                    <th className="px-2 py-2 font-semibold">ID</th>
                    <th className="px-2 py-2 font-semibold">Title</th>
                    <th className="px-2 py-2 font-semibold">Status</th>
                    <th className="px-2 py-2 font-semibold">District</th>
                    <th className="px-2 py-2 font-semibold">SLA</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map((c) => {
                    const breach = isSlaBreached(c.createdAt, c.slaDeadlineHours);
                    const active = selected?.trackingId === c.trackingId;
                    return (
                      <tr
                        key={c.trackingId}
                        onClick={() => setSelected(c)}
                        className={`cursor-pointer border-t border-gov-border ${
                          active ? 'bg-gov-navy-soft text-gov-navy' : 'bg-gov-card'
                        }`}
                      >
                        <td className="px-2 py-2 font-mono text-[11px]">{c.trackingId}</td>
                        <td className="px-2 py-2 font-semibold">{c.title}</td>
                        <td className="px-2 py-2">{CITIZEN_STATUS_LABEL[c.status]}</td>
                        <td className="px-2 py-2">{c.district}</td>
                        <td className="px-2 py-2">
                          {breach ? (
                            <span className="inline-flex items-center gap-1 text-gov-error">
                              <AlertTriangle className="w-4 h-4" aria-hidden="true" /> Breach
                            </span>
                          ) : (
                            `${c.slaDeadlineHours}h`
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>

        <div className="lg:col-span-3 bg-gov-card border border-gov-border rounded-sm p-4 space-y-3">
          {!selected && <p className="text-gov-muted text-sm">Select a ticket</p>}
          {selected && (
            <>
              <h3 className="text-xl font-black text-gov-text">{selected.title}</h3>
              <p className="text-sm text-gov-muted">{selected.description}</p>
              <p className="text-xs text-gov-muted">
                DIPS {selected.dipsScore} · {selected.suggestedScheme} · SLA {selected.slaDeadlineHours}h
              </p>
              {selected.lat && selected.lng && (
                <iframe
                  title="Map"
                  className="w-full h-48 rounded-sm border border-gov-border"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${selected.lng - 0.02}%2C${selected.lat - 0.02}%2C${selected.lng + 0.02}%2C${selected.lat + 0.02}&layer=mapnik&marker=${selected.lat}%2C${selected.lng}`}
                />
              )}
              {(selected.photoUrl || selected.voiceUrl) && (
                <div className="space-y-2 border border-gov-border bg-gov-inset p-3">
                  <p className="text-sm font-semibold text-gov-navy">Citizen submitted media</p>
                  {selected.photoUrl && (
                    <img src={selected.photoUrl} alt="Citizen submitted photo" className="rounded-sm max-h-56 w-full object-cover" />
                  )}
                  {selected.voiceUrl && (
                    <audio controls src={selected.voiceUrl} className="w-full">
                      Your browser does not support audio.
                    </audio>
                  )}
                </div>
              )}
              {selected.completionProof?.photoUrl && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gov-navy">Officer proof</p>
                  <img src={selected.completionProof.photoUrl} alt="Officer proof" className="rounded-sm max-h-56 w-full object-cover" />
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input value={dept} onChange={(e) => setDept(e.target.value)} className="min-h-11 rounded-sm bg-gov-inset border border-gov-border px-2 text-sm" placeholder="Department" />
                <input value={assignee} onChange={(e) => setAssignee(e.target.value)} className="min-h-11 rounded-sm bg-gov-inset border border-gov-border px-2 text-sm" placeholder="Assigned officer" />
              </div>
              <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={2} className="w-full rounded-sm bg-gov-inset border border-gov-border px-2 py-2 text-sm" placeholder="Remarks" />
              <label className="flex items-center gap-2 text-sm min-h-11">
                <Upload className="w-4 h-4" />
                Proof photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (f) setProofFile(await fileToDataUrl(f));
                  }}
                />
              </label>
              <div className="flex flex-wrap gap-2">
                {canOfficerPerform(session.role, 'triage') && (
                  <button
                    type="button"
                    disabled={busy || Boolean(officerActionBlockedReason(selected.status, 'triage'))}
                    title={officerActionBlockedReason(selected.status, 'triage')}
                    onClick={() => runAction('triaged')}
                    className="min-h-11 px-3 rounded-sm bg-gov-inset text-sm font-semibold disabled:opacity-50"
                  >
                    Accept / triage
                  </button>
                )}
                {canOfficerPerform(session.role, 'assign') && (
                  <button
                    type="button"
                    disabled={busy || Boolean(officerActionBlockedReason(selected.status, 'assign'))}
                    title={officerActionBlockedReason(selected.status, 'assign')}
                    onClick={() => runAction('assigned')}
                    className="min-h-11 px-3 rounded-sm bg-gov-navy text-white text-sm font-semibold disabled:opacity-50"
                  >
                    Assign
                  </button>
                )}
                <button type="button" disabled={busy} onClick={() => runAction(selected.status, { noteOnly: true })} className="min-h-11 px-3 rounded-sm bg-gov-inset text-sm font-semibold">
                  Request more info
                </button>
                {canOfficerPerform(session.role, 'assign') && (
                  <button
                    type="button"
                    disabled={busy || Boolean(officerActionBlockedReason(selected.status, 'start_work'))}
                    title={officerActionBlockedReason(selected.status, 'start_work')}
                    onClick={() => runAction('in_progress')}
                    className="min-h-11 px-3 rounded-sm bg-gov-teal text-white text-sm font-semibold disabled:opacity-50"
                  >
                    Start work
                  </button>
                )}
                {canOfficerPerform(session.role, 'proof') && (
                  <button
                    type="button"
                    disabled={busy || Boolean(officerActionBlockedReason(selected.status, 'proof'))}
                    title={officerActionBlockedReason(selected.status, 'proof')}
                    onClick={() => runAction('proof_uploaded', { proof: true })}
                    className="min-h-11 px-3 rounded-sm bg-gov-success text-white text-sm font-semibold disabled:opacity-50"
                  >
                    Upload proof
                  </button>
                )}
                {canOfficerPerform(session.role, 'escalate') && (
                  <button
                    type="button"
                    disabled={busy || Boolean(officerActionBlockedReason(selected.status, 'escalate'))}
                    title={officerActionBlockedReason(selected.status, 'escalate')}
                    onClick={() => runAction(selected.status, { noteOnly: true, escalate: true })}
                    className="min-h-11 px-3 rounded-sm bg-gov-navy text-white text-sm font-semibold disabled:opacity-50"
                  >
                    Escalate
                  </button>
                )}
                {canOfficerPerform(session.role, 'close_override') && (
                  <div className="flex flex-wrap gap-2 w-full">
                    <input value={override} onChange={(e) => setOverride(e.target.value)} placeholder="Override reason (required to close without citizen OK)" className="flex-1 min-h-11 rounded-sm bg-gov-inset border border-gov-border px-2 text-sm" />
                    <button type="button" disabled={busy} onClick={() => runAction('closed', { closeOverride: true })} className="min-h-11 px-3 rounded-sm bg-gov-error text-white text-sm font-semibold">
                      Close with override
                    </button>
                  </div>
                )}
                {selected.status === 'citizen_verified' && (
                  <button type="button" disabled={busy} onClick={() => runAction('closed')} className="min-h-11 px-3 rounded-sm bg-gov-success text-white text-sm font-semibold">
                    Close (citizen verified)
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
