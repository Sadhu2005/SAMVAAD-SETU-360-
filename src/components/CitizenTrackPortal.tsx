import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ShieldCheck,
  Send,
  Building2,
  UserCheck,
  Camera,
  MapPin,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  ExternalLink,
  PhoneCall
} from 'lucide-react';
import {
  CitizenCase,
  AuditLogEntry,
  getCaseByTrackingId,
  submitCitizenCase,
  citizenVerifyResolution,
  getAllCases
} from '../services/caseService';
import confetti from 'canvas-confetti';

export const CitizenTrackPortal: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'track' | 'submit'>('track');
  const [trackingInput, setTrackingInput] = useState<string>('SETU-2026-CG-BST-4190');
  const [currentCase, setCurrentCase] = useState<CitizenCase | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [recentCases, setRecentCases] = useState<CitizenCase[]>([]);

  // Submission Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Bridges & Culverts' as CitizenCase['category'],
    district: 'Bastar',
    state: 'Chhattisgarh',
    contactNumber: '9876543210',
    spokenDialect: 'Bhojpuri / Bundeli',
    channel: 'Web Citizen Portal' as CitizenCase['channel'],
    urgency: 'Critical' as CitizenCase['urgency'],
    description: '',
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [newlyCreatedId, setNewlyCreatedId] = useState<string | null>(null);

  // Citizen Verification Form State
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackNotes, setFeedbackNotes] = useState<string>('');
  const [verifying, setVerifying] = useState<boolean>(false);

  useEffect(() => {
    loadRecentCases();
    handleSearchCase('SETU-2026-CG-BST-4190');
  }, []);

  const loadRecentCases = async () => {
    try {
      const list = await getAllCases();
      setRecentCases(list.slice(0, 5));
    } catch (e) {
      console.error('Failed to load cases:', e);
    }
  };

  const handleSearchCase = async (idToSearch?: string) => {
    const searchId = idToSearch || trackingInput;
    if (!searchId.trim()) return;
    setLoading(true);
    try {
      const res = await getCaseByTrackingId(searchId);
      if (res.caseData) {
        setCurrentCase(res.caseData);
        setAuditLogs(res.auditLogs);
      } else {
        setCurrentCase(null);
        setAuditLogs([]);
      }
    } catch (err) {
      console.error('Error fetching case:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitNewNeed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    setSubmitting(true);
    try {
      const newCase = await submitCitizenCase({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        district: formData.district,
        state: formData.state,
        contactNumber: formData.contactNumber,
        spokenDialect: formData.spokenDialect,
        channel: formData.channel,
        urgency: formData.urgency,
      });

      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setNewlyCreatedId(newCase.trackingId);
      setTrackingInput(newCase.trackingId);
      setCurrentCase(newCase);
      await loadRecentCases();
      await handleSearchCase(newCase.trackingId);
      setActiveSubTab('track');
    } catch (err) {
      console.error('Error submitting case:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCitizenSignOff = async (verified: boolean) => {
    if (!currentCase) return;
    setVerifying(true);
    try {
      const updated = await citizenVerifyResolution({
        trackingId: currentCase.trackingId,
        verified,
        satisfactionRating: feedbackRating,
        feedbackText: feedbackNotes || (verified ? 'Citizen confirmed on-ground resolution.' : 'Citizen escalated: problem remains unresolved.'),
      });
      setCurrentCase(updated);
      confetti({ particleCount: verified ? 80 : 30, spread: 60 });
      await handleSearchCase(currentCase.trackingId);
      await loadRecentCases();
    } catch (err) {
      console.error('Verification error:', err);
    } finally {
      setVerifying(false);
    }
  };

  // Status Stepper helpers
  const steps: { key: CitizenCase['status']; label: string }[] = [
    { key: 'submitted', label: '1. Ingested' },
    { key: 'triaged', label: '2. Triaged & Scored' },
    { key: 'assigned', label: '3. Assigned' },
    { key: 'in_progress', label: '4. Work Ongoing' },
    { key: 'proof_uploaded', label: '5. Proof Uploaded' },
    { key: 'citizen_verified', label: '6. Citizen Verified' },
  ];

  const getStepIndex = (status: CitizenCase['status']) => {
    switch (status) {
      case 'submitted': return 0;
      case 'triaged': return 1;
      case 'assigned': return 2;
      case 'in_progress': return 3;
      case 'proof_uploaded': return 4;
      case 'citizen_verified':
      case 'closed': return 5;
      case 'citizen_contested': return 4;
      default: return 0;
    }
  };

  const currentStepIdx = currentCase ? getStepIndex(currentCase.status) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Live Citizen Case Intake & Verification
              </span>
              <span className="text-xs text-slate-400">• DPDP Act 2023 Masked</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Citizen Tracking & Public Accountability Portal
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              File a real infrastructure development need, receive an immutable <code className="text-amber-400 font-mono">SETU-2026-XX-XXXX</code> public tracking ID, follow government action live, and inspect official site proofs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveSubTab('track')}
              className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                activeSubTab === 'track'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Search className="w-4 h-4" />
              Track Case by ID
            </button>
            <button
              onClick={() => setActiveSubTab('submit')}
              className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                activeSubTab === 'submit'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/50'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Send className="w-4 h-4" />
              Raise New Need
            </button>
          </div>
        </div>
      </div>

      {newlyCreatedId && (
        <div className="bg-emerald-500/10 border border-emerald-500/40 rounded-xl p-4 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">Your Development Request Has Been Registered!</p>
              <p className="text-xs text-emerald-200">
                Tracking Reference: <span className="font-mono font-bold text-amber-300">{newlyCreatedId}</span> (Saved to open public ledger)
              </p>
            </div>
          </div>
          <button
            onClick={() => setNewlyCreatedId(null)}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Content Area */}
      {activeSubTab === 'track' ? (
        <div className="space-y-6">
          {/* Search Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="Enter Tracking Reference e.g. SETU-2026-CG-BST-4190"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white font-mono placeholder:text-slate-500 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <button
                onClick={() => handleSearchCase()}
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Track Request
              </button>
            </div>

            {/* Quick Chips of Recent Cases */}
            {recentCases.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Recent Public Requests:</span>
                {recentCases.map((rc) => (
                  <button
                    key={rc.trackingId}
                    onClick={() => {
                      setTrackingInput(rc.trackingId);
                      handleSearchCase(rc.trackingId);
                    }}
                    className="text-xs font-mono bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-slate-800 px-2.5 py-1 rounded-md transition-colors"
                  >
                    {rc.trackingId}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Case Detail Card */}
          {currentCase ? (
            <div className="space-y-6">
              {/* Status Header */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/20">
                        {currentCase.trackingId}
                      </span>
                      <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded">
                        {currentCase.category}
                      </span>
                      <span className={`text-xs px-2.5 py-0.5 rounded font-bold uppercase ${
                        currentCase.urgency === 'Critical' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {currentCase.urgency} Urgency
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">{currentCase.title}</h2>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {currentCase.district}, {currentCase.state} • Channel: {currentCase.channel} • Dialect: {currentCase.spokenDialect}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end">
                    <div className="text-xs text-slate-400">Current Lifecycle Status</div>
                    <div className="text-base font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5 mt-0.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      {currentCase.status.replace(/_/g, ' ')}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 font-mono">
                      Filed: {new Date(currentCase.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Stepper */}
                <div className="py-6">
                  <div className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                    Statutory Progress Stepper
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                    {steps.map((st, i) => {
                      const isCompleted = i <= currentStepIdx;
                      const isCurrent = i === currentStepIdx;
                      return (
                        <div
                          key={st.key}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            isCompleted
                              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                              : 'bg-slate-950/50 border-slate-800 text-slate-500'
                          } ${isCurrent ? 'ring-2 ring-emerald-400' : ''}`}
                        >
                          <div className="text-xs font-bold">{st.label}</div>
                          <div className="text-[10px] mt-1 opacity-80">
                            {isCompleted ? '✓ Completed' : 'Pending'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Key Officers & Department Assignment */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                      <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                      Responsible Department
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {currentCase.assignedDept || 'Pending Administrative Routing'}
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                      <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                      Nodal Field Engineer
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {currentCase.assignedOfficer || 'Awaiting Officer Desk Claim'}
                    </div>
                    {currentCase.officerPhone && (
                      <div className="text-xs text-slate-400 font-mono mt-0.5">{currentCase.officerPhone}</div>
                    )}
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                      <Clock className="w-3.5 h-3.5 text-rose-400" />
                      Statutory SLA Deadline
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {currentCase.slaDeadlineHours} Hours Statutory SLA
                    </div>
                    <div className="text-xs text-emerald-400 font-medium mt-0.5">Escalation Threshold Active</div>
                  </div>
                </div>
              </div>

              {/* Citizen Closed-Loop Resolution Proof Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-bold text-white">On-Ground Resolution Proof & Verification</h3>
                  </div>
                  <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full font-mono">
                    DPGA Verified Asset
                  </span>
                </div>

                {currentCase.completionProof ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentCase.completionProof.photoUrl ? (
                        <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                          <img
                            src={currentCase.completionProof.photoUrl}
                            alt="Resolution site inspection proof"
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-48 rounded-xl bg-slate-950 border border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                          <Camera className="w-8 h-8 text-slate-500 mb-2" />
                          <p className="text-xs font-semibold text-white">Site Inspection Photographic Evidence</p>
                          <p className="text-[11px] text-slate-500 mt-1">
                            GPS Geo-tagged (Lat: 19.0742° N, Long: 81.9563° E)
                          </p>
                        </div>
                      )}

                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                        <div className="font-semibold text-white text-sm">Official Completion Sign-off</div>
                        <p className="text-slate-300">{currentCase.completionProof.notes || 'Engineering work order verified with structural load testing.'}</p>
                        <div className="pt-2 border-t border-slate-800/80 space-y-1 text-slate-400">
                          <div>Inspector: <span className="text-white font-medium">{currentCase.completionProof.inspectorName || 'Er. Rajeshwar Verma'}</span></div>
                          <div>Designation: <span className="text-white font-medium">{currentCase.completionProof.inspectorDesignation || 'Executive Engineer (PWD)'}</span></div>
                          <div>Work Order: <span className="text-amber-400 font-mono font-medium">{currentCase.completionProof.workOrderCode || 'UJWO-2026-CG-8821'}</span></div>
                        </div>
                      </div>
                    </div>

                    {/* Citizen Action Confirmation */}
                    <div className="bg-gradient-to-r from-indigo-950/60 to-emerald-950/60 border border-indigo-500/30 rounded-xl p-5">
                      <h4 className="text-sm font-bold text-white mb-1">
                        Citizen Confirmation Required: Did this fix your problem?
                      </h4>
                      <p className="text-xs text-slate-300 mb-4">
                        Government funds are held in escrow until you verify whether this bridge/facility is now functioning safely.
                      </p>

                      {currentCase.status === 'citizen_verified' ? (
                        <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-lg p-3 text-xs font-semibold flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          You verified this resolution on {new Date(currentCase.citizenFeedback?.verifiedAt || Date.now()).toLocaleDateString()}. Thank you!
                        </div>
                      ) : (
                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            onClick={() => handleCitizenSignOff(true)}
                            disabled={verifying}
                            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-2"
                          >
                            <ThumbsUp className="w-4 h-4" />
                            Yes, Problem is Resolved
                          </button>
                          <button
                            onClick={() => handleCitizenSignOff(false)}
                            disabled={verifying}
                            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-2"
                          >
                            <ThumbsDown className="w-4 h-4" />
                            No, Still Broken / Escalate
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Work is in progress by {currentCase.assignedDept || 'the district administration'}.</p>
                      <p className="text-slate-400 mt-0.5">
                        Once the field engineer completes construction and uploads site photographs, this section will activate for your confirmation.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Audit Trail Ledger */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-400" />
                    Immutable DPG Audit Log
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">
                    {auditLogs.length} Chronological Entries
                  </span>
                </div>

                <div className="space-y-3">
                  {auditLogs.map((log, index) => (
                    <div
                      key={index}
                      className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{log.action}</span>
                          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                            {log.role}
                          </span>
                        </div>
                        <p className="text-slate-300">{log.details}</p>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
              <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">No Case Found for &quot;{trackingInput}&quot;</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Check the tracking ID or select one of the recent cases listed above to view live progress.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Submission Form */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl max-w-3xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">File a Citizen Infrastructure Need</h2>
            <p className="text-xs text-slate-400 mt-1">
              Your submission will be immediately assigned a public tracking ID and routed to the district nodal engineer.
            </p>
          </div>

          <form onSubmit={handleSubmitNewNeed} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Development Issue Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Scoured Bridge Culvert Cut Off 14 Tribal Habitations"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Infrastructure Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="Bridges & Culverts">Bridges & Culverts</option>
                  <option value="Piped Drinking Water">Piped Drinking Water</option>
                  <option value="Rural Roads & Connectivity">Rural Roads & Connectivity</option>
                  <option value="Healthcare Sub-Center">Healthcare Sub-Center</option>
                  <option value="Power & Electrification">Power & Electrification</option>
                  <option value="Sanitation & Drainage">Sanitation & Drainage</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Urgency Priority *</label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="Critical">Critical (Immediate Hazard - 48hr SLA)</option>
                  <option value="High">High (Seasonal Disruptions - 72hr SLA)</option>
                  <option value="Medium">Medium (Routine Deficit)</option>
                  <option value="Low">Low (Long-term Expansion)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">District *</label>
                <input
                  type="text"
                  required
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">State *</label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Citizen Contact (DPDP Masked) *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  placeholder="e.g. 9876543210"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-amber-500"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Stored as ephemeral one-way hash</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Spoken Dialect</label>
                <input
                  type="text"
                  value={formData.spokenDialect}
                  onChange={(e) => setFormData({ ...formData, spokenDialect: e.target.value })}
                  placeholder="e.g. Bundeli / Bhojpuri / Gondi"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Description *</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the physical condition, location landmarks, and community impact..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {submitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Submit Development Request & Generate Tracking ID
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
