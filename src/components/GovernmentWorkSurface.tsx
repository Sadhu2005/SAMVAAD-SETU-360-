import React, { useState, useEffect } from 'react';
import {
  Building2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  UserCheck,
  Filter,
  Camera,
  Upload,
  RefreshCw,
  Search,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  FileCheck2,
  Activity,
  Layers
} from 'lucide-react';
import {
  CitizenCase,
  CaseStatus,
  getAllCases,
  updateCaseByOfficer,
  AuditLogEntry
} from '../services/caseService';
import confetti from 'canvas-confetti';

export const GovernmentWorkSurface: React.FC = () => {
  const [cases, setCases] = useState<CitizenCase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCase, setSelectedCase] = useState<CitizenCase | null>(null);
  const [filterDept, setFilterDept] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Officer Action Modal State
  const [actionStatus, setActionStatus] = useState<CaseStatus>('in_progress');
  const [officerName, setOfficerName] = useState<string>('Er. Rajeshwar Verma');
  const [department, setDepartment] = useState<string>('State PWD (Bridges & Roads)');
  const [assignedEngineer, setAssignedEngineer] = useState<string>('Er. Alok Sharma (Assistant Engineer)');
  const [officerPhone, setOfficerPhone] = useState<string>('+91 94252 88410');
  const [remarks, setRemarks] = useState<string>('');
  const [proofPhotoUrl, setProofPhotoUrl] = useState<string>(
    'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=600&q=80'
  );
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    setLoading(true);
    try {
      const list = await getAllCases();
      setCases(list);
      if (list.length > 0 && !selectedCase) {
        setSelectedCase(list[0]);
      }
    } catch (err) {
      console.error('Error fetching cases:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyOfficerAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCase) return;
    setIsUpdating(true);
    try {
      const updated = await updateCaseByOfficer({
        trackingId: selectedCase.trackingId,
        status: actionStatus,
        officerName,
        officerRole: 'field_officer',
        department,
        assignedOfficer: assignedEngineer,
        officerPhone,
        remarks: remarks || `Officer updated case status to ${actionStatus}`,
        completionProof: actionStatus === 'proof_uploaded' ? {
          photoUrl: proofPhotoUrl,
          photoDescription: 'Reinforced concrete bridge span constructed and inspected.',
          inspectorName: officerName,
          inspectorDesignation: 'Executive Engineer (PWD)',
          signedOffAt: new Date().toISOString(),
          notes: remarks || 'Structural load testing completed; certified safe for vehicular movement.',
          workOrderCode: `UJWO-2026-CG-${Math.floor(1000 + Math.random() * 9000)}`,
        } : selectedCase.completionProof,
      });

      confetti({ particleCount: 60, spread: 50 });
      setUpdateSuccess(`Case ${selectedCase.trackingId} updated to "${actionStatus}"!`);
      setTimeout(() => setUpdateSuccess(null), 5000);
      setSelectedCase(updated);
      await fetchCases();
    } catch (err) {
      console.error('Update error:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredCases = cases.filter((c) => {
    if (filterDept !== 'all' && c.assignedDept && !c.assignedDept.toLowerCase().includes(filterDept.toLowerCase())) {
      return false;
    }
    if (filterStatus !== 'all' && c.status !== filterStatus) {
      return false;
    }
    return true;
  });

  // KPI Calculations
  const totalCount = cases.length;
  const pendingTriage = cases.filter(c => c.status === 'submitted' || c.status === 'triaged').length;
  const inProgress = cases.filter(c => c.status === 'assigned' || c.status === 'in_progress').length;
  const verifiedCount = cases.filter(c => c.status === 'citizen_verified' || c.status === 'closed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                Government Departmental Console
              </span>
              <span className="text-xs text-slate-400">• Nodal Officer & District DM Work Surface</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Inter-Departmental Case Inbox & Execution Surface
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Live operational triage queue for State PWD, Jal Jeevan Mission, DISCOMs, and District Magistrates. Assign field engineers, enforce statutory SLA clocks, and upload on-ground completion proofs.
            </p>
          </div>

          <button
            onClick={fetchCases}
            disabled={loading}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-semibold text-xs transition-all flex items-center gap-2 shadow-sm self-start md:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh Queue
          </button>
        </div>

        {/* Live KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Total Intake</div>
            <div className="text-2xl font-black text-white mt-0.5">{totalCount}</div>
            <div className="text-[10px] text-indigo-400 mt-0.5">Live cases filed</div>
          </div>
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Pending Triage</div>
            <div className="text-2xl font-black text-amber-400 mt-0.5">{pendingTriage}</div>
            <div className="text-[10px] text-amber-400/80 mt-0.5">Needs department assignment</div>
          </div>
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Work In Progress</div>
            <div className="text-2xl font-black text-blue-400 mt-0.5">{inProgress}</div>
            <div className="text-[10px] text-blue-400/80 mt-0.5">Under execution</div>
          </div>
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Citizen Confirmed</div>
            <div className="text-2xl font-black text-emerald-400 mt-0.5">{verifiedCount}</div>
            <div className="text-[10px] text-emerald-400/80 mt-0.5">Closed-loop verified</div>
          </div>
        </div>
      </div>

      {updateSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/40 rounded-xl p-4 flex items-center justify-between text-xs text-emerald-300 font-semibold animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {updateSuccess}
          </div>
        </div>
      )}

      {/* Main Grid: Case Queue & Action Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Filterable Case Queue (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Filter className="w-4 h-4 text-indigo-400" />
                Case Triage Queue ({filteredCases.length})
              </h3>
            </div>

            {/* Filter controls */}
            <div className="grid grid-cols-2 gap-2">
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Departments</option>
                <option value="pwd">State PWD</option>
                <option value="water">Jal Jeevan</option>
                <option value="power">Electricity/DISCOM</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Statuses</option>
                <option value="submitted">Submitted</option>
                <option value="assigned">Assigned</option>
                <option value="in_progress">In Progress</option>
                <option value="proof_uploaded">Proof Uploaded</option>
                <option value="citizen_verified">Citizen Verified</option>
              </select>
            </div>
          </div>

          {/* Cases List */}
          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredCases.map((c) => {
              const isSelected = selectedCase?.trackingId === c.trackingId;
              return (
                <div
                  key={c.trackingId}
                  onClick={() => {
                    setSelectedCase(c);
                    setActionStatus(c.status);
                    if (c.assignedDept) setDepartment(c.assignedDept);
                    if (c.assignedOfficer) setAssignedEngineer(c.assignedOfficer);
                  }}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500/60 shadow-md ring-1 ring-indigo-500'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-[11px] font-bold text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {c.trackingId}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      c.status === 'citizen_verified'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : c.status === 'proof_uploaded'
                        ? 'bg-blue-500/20 text-blue-300'
                        : c.status === 'assigned' || c.status === 'in_progress'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {c.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <h4 className="font-semibold text-white text-xs sm:text-sm line-clamp-1">{c.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{c.description}</p>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>{c.district}, {c.state}</span>
                    <span className="text-amber-400 font-semibold">DIPS: {c.dipsScore}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Case Action & Proof Workspace (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {selectedCase ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-amber-400">{selectedCase.trackingId}</span>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">{selectedCase.category}</span>
                  </div>
                  <h2 className="text-lg font-bold text-white">{selectedCase.title}</h2>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-400">Citizen Token (DPDP 2023)</div>
                  <div className="text-xs font-mono text-emerald-400">{selectedCase.citizenToken}</div>
                </div>
              </div>

              {/* Citizen Description Card */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-slate-400">Ground Reality & Citizen Narrative</div>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedCase.description}</p>
                <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-400 font-mono">
                  <span>Channel: {selectedCase.channel}</span>
                  <span>•</span>
                  <span>Dialect: {selectedCase.spokenDialect}</span>
                  <span>•</span>
                  <span>Urgency: {selectedCase.urgency}</span>
                </div>
              </div>

              {/* Officer Action Form */}
              <form onSubmit={handleApplyOfficerAction} className="space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-indigo-400" />
                  Departmental Action & Triage Dispatch
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Update Lifecycle Status</label>
                    <select
                      value={actionStatus}
                      onChange={(e) => setActionStatus(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
                    >
                      <option value="submitted">1. Ingested / Submitted</option>
                      <option value="triaged">2. Triaged & Prioritized</option>
                      <option value="assigned">3. Assigned to Department</option>
                      <option value="in_progress">4. Work In Progress (Construction)</option>
                      <option value="proof_uploaded">5. Proof Uploaded (Work Completed)</option>
                      <option value="closed">6. Administratively Closed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Assigned Department</label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Nodal Executive Engineer</label>
                    <input
                      type="text"
                      value={officerName}
                      onChange={(e) => setOfficerName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Field Assistant Engineer</label>
                    <input
                      type="text"
                      value={assignedEngineer}
                      onChange={(e) => setAssignedEngineer(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* If Proof Uploaded is selected, show Proof Form */}
                {actionStatus === 'proof_uploaded' && (
                  <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                      <Camera className="w-4 h-4 text-indigo-400" />
                      Attach Geo-Tagged Physical Completion Proof
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Site Photograph URL</label>
                      <input
                        type="url"
                        value={proofPhotoUrl}
                        onChange={(e) => setProofPhotoUrl(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Official Remarks / Execution Notes</label>
                  <textarea
                    rows={3}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Enter dispatch order, contractor details, or site completion notes..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {isUpdating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileCheck2 className="w-4 h-4" />}
                    Apply Action & Sync to Citizen Tracking Portal
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
              Select a case from the queue to take departmental action.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
