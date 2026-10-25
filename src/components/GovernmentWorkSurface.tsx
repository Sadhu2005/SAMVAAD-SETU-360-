import React, { useEffect, useState } from 'react';
import {
  Filter,
  LogOut,
  Upload,
  AlertTriangle,
} from 'lucide-react';
import type { CaseStatus, CitizenCase } from '../services/caseService';
import {
  apiAssignTicket,
  apiBhashiniTranscribe,
  apiGatiShaktiTriangulate,
  apiNitiEnrichTicket,
  apiDeskAssist,
  apiOfficerInbox,
  apiOfficerUpdate,
  apiProofTicket,
  type DeskAssistResponse,
} from '../services/ticketApi';
import {
  clearOfficerSession,
  expectedDeskPin,
  getOfficerSession,
  setOfficerSession,
  type OfficerSession,
} from '../services/officerSession';
import {
  CITIZEN_STATUS_LABEL,
  OFFICER_DEPARTMENTS,
  OFFICER_PIPELINE,
  isSlaBreached,
  listOfficerDeskSteps,
  missingOfficerActionFields,
  nextOfficerStep,
  officerPipelineStage,
  type OfficerDeskStep,
  type OfficerDeskUiAction,
  type OfficerRoleKey,
} from '../utils/ticketLogic';
import { fileToDataUrl, uploadTicketMedia } from '../services/mediaUpload';
import { apiListDistricts, apiListStates } from '../services/geoApi';
import type { GeoDistrict, GeoState } from '../services/geoService';

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
  const [notice, setNotice] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [district, setDistrict] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [states, setStates] = useState<GeoState[]>([]);
  const [districts, setDistricts] = useState<GeoDistrict[]>([]);
  const [urgency, setUrgency] = useState('');
  const [department, setDepartment] = useState('');
  const [slaOnly, setSlaOnly] = useState(false);

  const [dept, setDept] = useState('State PWD');
  const [assignee, setAssignee] = useState('');
  const [remarks, setRemarks] = useState('');
  const [override, setOverride] = useState('');
  const [proofFile, setProofFile] = useState<string>('');
  const [proofName, setProofName] = useState('');
  const [busy, setBusy] = useState(false);
  const [assistLoading, setAssistLoading] = useState(false);
  const [assistError, setAssistError] = useState<string | null>(null);
  const [assistResult, setAssistResult] = useState<DeskAssistResponse | null>(null);
  const [transcribeLoading, setTranscribeLoading] = useState(false);
  const [transcribeError, setTranscribeError] = useState<string | null>(null);
  const [gatiLoading, setGatiLoading] = useState(false);
  const [gatiError, setGatiError] = useState<string | null>(null);
  const [nitiLoading, setNitiLoading] = useState(false);
  const [nitiError, setNitiError] = useState<string | null>(null);

  useEffect(() => {
    setSession(getOfficerSession());
  }, []);

  useEffect(() => {
    void apiListStates().then(setStates);
  }, []);

  useEffect(() => {
    if (!stateFilter) {
      setDistricts([]);
      setDistrict('');
      return;
    }
    const match = states.find((s) => s.name === stateFilter);
    setDistrict('');
    if (!match) return;
    void apiListDistricts(match.lgdCode).then(setDistricts);
  }, [stateFilter, states]);

  useEffect(() => {
    if (session) void loadInbox();
  }, [session, district, stateFilter, urgency, department, slaOnly]);

  useEffect(() => {
    if (!selected) return;
    setDept(selected.assignedDept || 'State PWD');
    setAssignee(selected.assignedOfficer || '');
    setFieldError(null);
    setProofFile('');
    setProofName('');
    setAssistResult(null);
    setAssistError(null);
    setTranscribeError(null);
    setGatiError(null);
    setNitiError(null);
  }, [selected?.trackingId]);

  const loadInbox = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await apiOfficerInbox({
        district: district || undefined,
        state: stateFilter || undefined,
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

  const loadNitiEnrichment = async () => {
    if (!selected || !session) return;
    setNitiLoading(true);
    setNitiError(null);
    try {
      const result = await apiNitiEnrichTicket(selected.trackingId, session.name);
      setSelected(result.case);
      await loadInbox();
    } catch (err: any) {
      setNitiError(err.message);
    } finally {
      setNitiLoading(false);
    }
  };

  const loadGatiShaktiFusion = async () => {
    if (!selected || !session) return;
    setGatiLoading(true);
    setGatiError(null);
    try {
      const result = await apiGatiShaktiTriangulate(selected.trackingId, session.name);
      setSelected(result.case);
      await loadInbox();
    } catch (err: any) {
      setGatiError(err.message);
    } finally {
      setGatiLoading(false);
    }
  };

  const loadBhashiniTranscript = async () => {
    if (!selected || !session) return;
    setTranscribeLoading(true);
    setTranscribeError(null);
    try {
      const result = await apiBhashiniTranscribe(selected.trackingId, session.name);
      setSelected(result.case);
      await loadInbox();
    } catch (err: any) {
      setTranscribeError(err.message);
    } finally {
      setTranscribeLoading(false);
    }
  };

  const loadDeskAssist = async () => {
    if (!selected) return;
    setAssistLoading(true);
    setAssistError(null);
    try {
      const result = await apiDeskAssist(selected.trackingId);
      setAssistResult(result);
    } catch (err: any) {
      setAssistError(err.message);
      setAssistResult(null);
    } finally {
      setAssistLoading(false);
    }
  };

  const runDeskAction = async (step: OfficerDeskStep) => {
    if (!selected || !session) return;
    const missing = missingOfficerActionFields(step, {
      department: dept,
      assignee: assignee || session.name,
      remarks,
      proof: proofFile,
      override,
    });
    if (missing) {
      setFieldError(missing);
      return;
    }
    setBusy(true);
    setError(null);
    setFieldError(null);
    setNotice(null);
    try {
      const updated = await executeDeskAction(step.action, selected, session, {
        dept,
        assignee: assignee || session.name,
        remarks,
        override,
        proofFile,
      });
      setSelected(updated);
      await loadInbox();
      setRemarks('');
      setOverride('');
      setProofFile('');
      setProofName('');
      setNotice(`Done. Ticket is now ${CITIZEN_STATUS_LABEL[updated.status]}.`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (!session) {
    return (
      <div className="max-w-md mx-auto bg-gov-card border border-gov-border rounded-sm p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gov-text">Officer Command Desk</h2>
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
          <button type="submit" className="w-full min-h-12 rounded-sm bg-gov-teal text-white font-bold">
            Open inbox
          </button>
        </form>
        <p className="text-[11px] text-gov-muted">Local default PIN is documented in .env.example as VITE_OFFICER_DESK_PIN.</p>
      </div>
    );
  }

  const nextStep = selected ? nextOfficerStep(selected.status, session.role) : null;
  const otherSteps = selected
    ? listOfficerDeskSteps(selected.status, session.role).filter((step) => step.action !== nextStep?.action)
    : [];
  const visibleSteps = selected ? [nextStep, ...otherSteps].filter(Boolean) as OfficerDeskStep[] : [];
  const showDeptFields = visibleSteps.some((step) => step.needs.includes('department') || step.needs.includes('assignee'));
  const showRemarks = visibleSteps.some((step) => step.needs.includes('remarks') || step.needs.includes('proof'));
  const showProof = visibleSteps.some((step) => step.needs.includes('proof'));
  const showOverride = visibleSteps.some((step) => step.needs.includes('override'));
  const departmentOptions = dept && !OFFICER_DEPARTMENTS.includes(dept as (typeof OFFICER_DEPARTMENTS)[number])
    ? [dept, ...OFFICER_DEPARTMENTS]
    : [...OFFICER_DEPARTMENTS];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase font-bold text-gov-teal tracking-wide">Government</p>
          <h2 className="text-2xl font-bold text-gov-text">Officer Command Desk</h2>
          <p className="text-sm text-gov-muted">
            {session.name} · {ROLES.find((r) => r.id === session.role)?.label} · {cases.length} ticket{cases.length === 1 ? '' : 's'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            clearOfficerSession();
            setSession(null);
          }}
          className="min-h-11 px-3 rounded-sm bg-gov-inset border border-gov-border text-sm flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" aria-hidden="true" /> Sign out
        </button>
      </div>

      {error && <div className="rounded-sm border border-gov-error bg-gov-error-bg px-3 py-2 text-sm text-gov-error">{error}</div>}
      {notice && (
        <div role="status" className="gov-banner-success px-3 py-2 text-sm font-semibold">
          {notice}
        </div>
      )}

      <div className="flex flex-wrap gap-3 items-end bg-gov-card border border-gov-border rounded-sm p-3">
        <Filter className="w-4 h-4 text-gov-muted mb-3" aria-hidden="true" />
        <label className="space-y-1">
          <span className="block text-xs font-semibold text-gov-navy">State</span>
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="min-h-11 rounded-sm bg-gov-inset border border-gov-border px-2 text-sm"
          >
            <option value="">All states</option>
            {states.map((s) => (
              <option key={s.lgdCode} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1">
          <span className="block text-xs font-semibold text-gov-navy">District</span>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            disabled={!stateFilter}
            className="min-h-11 rounded-sm bg-gov-inset border border-gov-border px-2 text-sm disabled:opacity-50"
          >
            <option value="">{stateFilter ? 'All districts' : 'Select state first'}</option>
            {districts.map((d) => (
              <option key={d.lgdCode} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1">
          <span className="block text-xs font-semibold text-gov-navy">Urgency</span>
          <select value={urgency} onChange={(e) => setUrgency(e.target.value)} className="min-h-11 rounded-sm bg-gov-inset border border-gov-border px-2 text-sm">
            <option value="">All urgency</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </label>
        <label className="space-y-1">
          <span className="block text-xs font-semibold text-gov-navy">Department filter</span>
          <input value={department} onChange={(e) => setDepartment(e.target.value)} className="min-h-11 rounded-sm bg-gov-inset border border-gov-border px-2 text-sm" />
        </label>
        <label className="flex items-center gap-2 text-sm min-h-11">
          <input type="checkbox" checked={slaOnly} onChange={(e) => setSlaOnly(e.target.checked)} />
          SLA breach only
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
                        <td className="px-2 py-2 font-mono text-[11px] break-all">{c.trackingId}</td>
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

        <div className="lg:col-span-3 bg-gov-card border border-gov-border rounded-sm p-4 space-y-4">
          {!selected && <p className="text-gov-muted text-sm">Select a ticket</p>}
          {selected && nextStep && (
            <>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gov-text text-wrap">{selected.title}</h3>
                <p className="text-sm text-gov-muted">{selected.description}</p>
                <p className="text-xs text-gov-muted">
                  {selected.trackingId} · {selected.district}, {selected.state} · DIPS {selected.dipsScore} · {selected.suggestedScheme}
                </p>
              </div>

              <ol className="flex flex-wrap gap-2" aria-label="Ticket progress">
                {OFFICER_PIPELINE.map((stage, index) => {
                  const current = officerPipelineStage(selected.status);
                  const tone =
                    index === current
                      ? 'bg-gov-navy text-white'
                      : index < current
                        ? 'bg-gov-teal-soft text-gov-teal'
                        : 'bg-gov-inset text-gov-muted';
                  return (
                    <li
                      key={stage.key}
                      aria-current={index === current ? 'step' : undefined}
                      className={`min-h-11 px-3 inline-flex items-center rounded-sm text-xs font-semibold ${tone}`}
                    >
                      {index + 1}. {stage.label}
                    </li>
                  );
                })}
              </ol>

              {selected.lat && selected.lng && (
                <iframe
                  title="Map"
                  className="w-full h-48 rounded-sm border border-gov-border"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${selected.lng - 0.02}%2C${selected.lat - 0.02}%2C${selected.lng + 0.02}%2C${selected.lat + 0.02}&layer=mapnik&marker=${selected.lat}%2C${selected.lng}`}
                />
              )}
              <section
                className="border border-gov-border bg-gov-inset p-4 space-y-3"
                aria-labelledby="niti-heading"
              >
                <p className="text-xs uppercase font-bold text-gov-teal tracking-wide">NITI Aayog demographics</p>
                <h4 id="niti-heading" className="text-sm font-semibold text-gov-navy">
                  MPI & DIEW equity indices
                </h4>
                <p className="text-xs text-gov-muted">
                  Applies district Multi-Dimensional Poverty Index and Demographic-Inverse Equity Weighting to the ticket DIPS score.
                </p>
                <button
                  type="button"
                  disabled={nitiLoading || busy}
                  aria-busy={nitiLoading}
                  onClick={() => void loadNitiEnrichment()}
                  className="min-h-11 px-4 rounded-sm bg-gov-teal text-white text-sm font-semibold disabled:opacity-50"
                >
                  {nitiLoading ? 'Applying indices…' : 'Refresh NITI indices'}
                </button>
                {nitiError && <p className="text-sm text-gov-error">{nitiError}</p>}
                {(selected.nitiMpiScore != null || selected.mpiDeficitMultiplier) && (
                  <div className="rounded-sm border border-gov-border bg-gov-card p-3 text-sm space-y-1">
                    {selected.nitiMpiScore != null && (
                      <p>
                        <span className="font-semibold text-gov-navy">MPI:</span> {selected.nitiMpiScore.toFixed(2)}
                        {selected.nitiAspirationalDistrict ? ' · Aspirational district' : ''}
                      </p>
                    )}
                    {selected.nitiInfrastructureDeficit != null && (
                      <p>
                        <span className="font-semibold text-gov-navy">Infrastructure deficit:</span>{' '}
                        {selected.nitiInfrastructureDeficit}/100
                      </p>
                    )}
                    {selected.mpiDeficitMultiplier && (
                      <p className="text-gov-muted">{selected.mpiDeficitMultiplier}</p>
                    )}
                    <p>
                      <span className="font-semibold text-gov-navy">DIPS:</span> {selected.dipsScore}
                    </p>
                  </div>
                )}
              </section>
              <section
                className="border border-gov-border bg-gov-inset p-4 space-y-3"
                aria-labelledby="gati-shakti-heading"
              >
                <p className="text-xs uppercase font-bold text-gov-teal tracking-wide">PM GatiShakti masterplan</p>
                <h4 id="gati-shakti-heading" className="text-sm font-semibold text-gov-navy">
                  Geospatial triangulation (1,400+ NMMP layers)
                </h4>
                <p className="text-xs text-gov-muted">
                  Matches ticket location and category to national masterplan asset groups. Generates a Beckn-style UJWO reference for inter-agency routing.
                </p>
                <button
                  type="button"
                  disabled={gatiLoading || busy}
                  aria-busy={gatiLoading}
                  onClick={() => void loadGatiShaktiFusion()}
                  className="min-h-11 px-4 rounded-sm bg-gov-navy text-white text-sm font-semibold disabled:opacity-50"
                >
                  {gatiLoading ? 'Triangulating…' : 'Triangulate with GatiShakti'}
                </button>
                {gatiError && <p className="text-sm text-gov-error">{gatiError}</p>}
                {(selected.gatiShaktiAssetId || selected.jointWorkOrderCode) && (
                  <div className="rounded-sm border border-gov-border bg-gov-card p-3 text-sm space-y-1">
                    {selected.gatiShaktiAssetId && (
                      <p>
                        <span className="font-semibold text-gov-navy">Asset:</span> {selected.gatiShaktiAssetId}
                      </p>
                    )}
                    {selected.cadastralParcel && (
                      <p>
                        <span className="font-semibold text-gov-navy">Cadastral:</span> {selected.cadastralParcel}
                      </p>
                    )}
                    {selected.gatiShaktiSynergyScore != null && (
                      <p>
                        <span className="font-semibold text-gov-navy">Synergy (S_gati):</span>{' '}
                        {selected.gatiShaktiSynergyScore}
                      </p>
                    )}
                    {selected.gatiShaktiPrimaryDept && (
                      <p>
                        <span className="font-semibold text-gov-navy">Primary dept:</span>{' '}
                        {selected.gatiShaktiPrimaryDept}
                        {selected.gatiShaktiSecondaryDept ? ` · ${selected.gatiShaktiSecondaryDept}` : ''}
                      </p>
                    )}
                    {selected.jointWorkOrderCode && (
                      <p className="font-mono text-xs text-gov-teal">{selected.jointWorkOrderCode}</p>
                    )}
                  </div>
                )}
              </section>
              {(selected.photoUrl || selected.voiceUrl) && (
                <div className="space-y-2 border border-gov-border bg-gov-inset p-3">
                  <p className="text-sm font-semibold text-gov-navy">Citizen submitted media</p>
                  {selected.photoUrl && (
                    <img src={selected.photoUrl} alt="Citizen submitted photo" className="rounded-sm max-h-56 w-full object-cover" />
                  )}
                  {selected.voiceUrl && (
                    <>
                      <audio controls src={selected.voiceUrl} className="w-full">
                        Your browser does not support audio.
                      </audio>
                      <button
                        type="button"
                        disabled={transcribeLoading || busy}
                        aria-busy={transcribeLoading}
                        onClick={() => void loadBhashiniTranscript()}
                        className="min-h-11 px-3 rounded-sm bg-gov-navy text-white text-sm font-semibold disabled:opacity-50"
                      >
                        {transcribeLoading ? 'Transcribing…' : 'Transcribe voice (Bhashini)'}
                      </button>
                      {transcribeError && (
                        <p className="text-sm text-gov-error">{transcribeError}</p>
                      )}
                      {selected.voiceTranscript && (
                        <div className="rounded-sm border border-gov-border bg-gov-card p-3 text-sm">
                          <p className="text-xs font-semibold text-gov-navy">
                            Voice transcript ({selected.voiceTranscriptLanguage || 'hi'})
                          </p>
                          <p className="text-gov-text mt-1">{selected.voiceTranscript}</p>
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => setRemarks(selected.voiceTranscript || '')}
                            className="mt-2 min-h-11 px-3 rounded-sm bg-gov-inset border border-gov-border text-sm font-semibold"
                          >
                            Use transcript as remarks
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
              {selected.completionProof?.photoUrl && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gov-navy">Officer proof</p>
                  <img src={selected.completionProof.photoUrl} alt="Officer proof" className="rounded-sm max-h-56 w-full object-cover" />
                </div>
              )}

              <section
                className="border border-gov-border bg-gov-inset p-4 space-y-3"
                aria-labelledby="ai-assist-heading"
              >
                <p className="text-xs uppercase font-bold text-gov-teal tracking-wide">AI assist (optional)</p>
                <h4 id="ai-assist-heading" className="text-sm font-semibold text-gov-navy">
                  Suggested summary and routing
                </h4>
                <p className="text-xs text-gov-muted">
                  Suggestions only. You must still choose Accept, Assign, or other actions yourself.
                </p>
                <button
                  type="button"
                  disabled={assistLoading || busy}
                  aria-busy={assistLoading}
                  onClick={() => void loadDeskAssist()}
                  className="min-h-11 px-4 rounded-sm bg-gov-teal text-white text-sm font-semibold disabled:opacity-50"
                >
                  {assistLoading ? 'Getting suggestion…' : 'Get suggestion'}
                </button>
                {assistError && <p className="text-sm text-gov-error">{assistError}</p>}
                {assistResult && (
                  <div className="space-y-2 text-sm text-gov-text">
                    {assistResult.source === 'rules' && (
                      <p className="text-xs text-gov-muted">
                        Live AI unavailable; showing rule-based suggestion.
                      </p>
                    )}
                    <p>{assistResult.assist.summary}</p>
                    <p>
                      <span className="font-semibold text-gov-navy">Department:</span>{' '}
                      {assistResult.assist.suggestedDepartment}
                      {' · '}
                      <span className="font-semibold text-gov-navy">Urgency:</span>{' '}
                      {assistResult.assist.suggestedUrgency}
                    </p>
                    {assistResult.assist.remarksDraft && (
                      <p className="text-gov-muted">{assistResult.assist.remarksDraft}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => setDept(assistResult.assist.suggestedDepartment)}
                        className="min-h-11 px-3 rounded-sm bg-gov-card border border-gov-border text-sm font-semibold"
                      >
                        Apply department
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => setRemarks(assistResult.assist.remarksDraft)}
                        className="min-h-11 px-3 rounded-sm bg-gov-card border border-gov-border text-sm font-semibold"
                      >
                        Use remarks
                      </button>
                    </div>
                  </div>
                )}
              </section>

              <section className="border border-gov-navy bg-gov-navy-soft p-4 space-y-3" aria-labelledby="next-step-heading">
                <p className="text-xs uppercase font-bold text-gov-navy tracking-wide">Next step</p>
                <h4 id="next-step-heading" className="text-lg font-bold text-gov-navy">{nextStep.label}</h4>
                <p className="text-sm text-gov-text">{nextStep.hint}</p>

                {showDeptFields && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="space-y-1">
                      <span className="block text-sm font-semibold text-gov-navy">Department</span>
                      <select
                        value={dept}
                        onChange={(e) => setDept(e.target.value)}
                        className="w-full min-h-11 rounded-sm bg-gov-card border border-gov-border px-2 text-sm"
                      >
                        {departmentOptions.map((name) => (
                          <option key={name} value={name}>{name}</option>
                        ))}
                      </select>
                    </label>
                    <label className="space-y-1">
                      <span className="block text-sm font-semibold text-gov-navy">Assigned officer</span>
                      <input
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                        placeholder={session.name}
                        className="w-full min-h-11 rounded-sm bg-gov-card border border-gov-border px-2 text-sm"
                      />
                    </label>
                  </div>
                )}

                {showRemarks && (
                  <label className="block space-y-1">
                    <span className="block text-sm font-semibold text-gov-navy">Remarks</span>
                    <textarea
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      rows={3}
                      className="w-full rounded-sm bg-gov-card border border-gov-border px-2 py-2 text-sm"
                    />
                  </label>
                )}

                {showProof && (
                  <label className="flex flex-wrap items-center gap-2 text-sm min-h-11">
                    <Upload className="w-4 h-4" aria-hidden="true" />
                    <span className="font-semibold text-gov-navy">Proof photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        if (f) {
                          setProofFile(await fileToDataUrl(f));
                          setProofName(f.name);
                        }
                      }}
                    />
                    <span className="text-gov-muted">{proofName || 'No file chosen'}</span>
                  </label>
                )}

                {showOverride && (
                  <label className="block space-y-1">
                    <span className="block text-sm font-semibold text-gov-navy">Collector override reason</span>
                    <input
                      value={override}
                      onChange={(e) => setOverride(e.target.value)}
                      className="w-full min-h-11 rounded-sm bg-gov-card border border-gov-border px-2 text-sm"
                    />
                  </label>
                )}

                {fieldError && <p className="text-sm text-gov-error">{fieldError}</p>}

                {nextStep.kind !== 'wait' && (
                  <button
                    type="button"
                    disabled={busy}
                    aria-busy={busy}
                    onClick={() => void runDeskAction(nextStep)}
                    className="min-h-12 px-4 rounded-sm bg-gov-navy text-white text-sm font-bold disabled:opacity-50"
                  >
                    {busy ? 'Saving…' : nextStep.label}
                  </button>
                )}
              </section>

              {otherSteps.length > 0 && (
                <section className="space-y-2" aria-labelledby="other-actions-heading">
                  <h4 id="other-actions-heading" className="text-sm font-semibold text-gov-navy">Other actions</h4>
                  <div className="flex flex-wrap gap-2">
                    {otherSteps.map((step) => (
                      <button
                        key={step.action}
                        type="button"
                        disabled={busy}
                        aria-busy={busy}
                        title={step.hint}
                        onClick={() => void runDeskAction(step)}
                        className="min-h-11 px-3 rounded-sm bg-gov-inset border border-gov-border text-sm font-semibold disabled:opacity-50"
                      >
                        {busy ? 'Saving…' : step.label}
                      </button>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

async function executeDeskAction(
  action: OfficerDeskUiAction,
  selected: CitizenCase,
  session: OfficerSession,
  fields: { dept: string; assignee: string; remarks: string; override: string; proofFile: string }
): Promise<CitizenCase> {
  if (action === 'wait') return selected;
  if (action === 'request_info') {
    return apiOfficerUpdate(selected.trackingId, {
      status: selected.status,
      officerName: session.name,
      officerRoleKey: session.role,
      remarks: fields.remarks || 'Please provide additional site details.',
      noteOnly: true,
    });
  }
  if (action === 'escalate') {
    return apiOfficerUpdate(selected.trackingId, {
      status: selected.status,
      officerName: session.name,
      officerRoleKey: session.role,
      remarks: fields.remarks || 'Escalated to next authority.',
      noteOnly: true,
    });
  }
  if (action === 'proof') {
    const photoUrl = fields.proofFile ? await uploadTicketMedia(selected.trackingId, 'proof', fields.proofFile) : '';
    return apiProofTicket(selected.trackingId, {
      officerName: session.name,
      officerRoleKey: session.role,
      remarks: fields.remarks,
      completionProof: {
        photoUrl,
        notes: fields.remarks || 'Field inspection complete',
        inspectorName: session.name,
        signedOffAt: new Date().toISOString(),
        geoLatitude: selected.lat,
        geoLongitude: selected.lng,
      },
    });
  }
  if (action === 'assign') {
    return apiAssignTicket(selected.trackingId, {
      officerName: session.name,
      officerRoleKey: session.role,
      department: fields.dept,
      assignedOfficer: fields.assignee || session.name,
      remarks: fields.remarks || `Assigned to ${fields.dept}`,
      status: 'assigned',
    });
  }
  const statusByAction: Partial<Record<OfficerDeskUiAction, CaseStatus>> = {
    triage: 'triaged',
    start_work: 'in_progress',
    close_verified: 'closed',
    close_override: 'closed',
  };
  const status = statusByAction[action];
  if (!status) return selected;
  return apiOfficerUpdate(selected.trackingId, {
    status,
    officerName: session.name,
    officerRoleKey: session.role,
    remarks: fields.remarks || `Updated to ${status}`,
    department: fields.dept,
    assignedOfficer: fields.assignee,
    closeOverrideReason: action === 'close_override' ? fields.override : undefined,
  });
}
