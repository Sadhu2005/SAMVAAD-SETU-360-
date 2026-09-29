import React, { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  PhoneCall,
  Camera,
  Layers,
  Sparkles,
  ArrowRight,
  FileCheck,
  RefreshCw
} from 'lucide-react';
import { DPI_IMPACT_METRICS, DpiImpactMetric } from '../data/fusionData';

export const DpiImpactTracker: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<DpiImpactMetric>(DPI_IMPACT_METRICS[0]);
  const [isVerifyingAudit, setIsVerifyingAudit] = useState<boolean>(false);
  const [auditStep, setAuditStep] = useState<number>(3); // Completed by default

  const handleSimulateAudit = () => {
    setIsVerifyingAudit(true);
    setAuditStep(1);
    setTimeout(() => setAuditStep(2), 700);
    setTimeout(() => setAuditStep(3), 1400);
    setTimeout(() => {
      setIsVerifyingAudit(false);
    }, 1800);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <Activity className="w-3.5 h-3.5" />
          DPI Impact Measurement & Post-Commissioning Evaluation
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Measuring the Ground-Level Impact of Large-Scale Digital Public Infrastructure
        </h2>
        <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">
          Traditional public works stop at financial disbursement—with zero automated way to verify whether a ₹100-crore 
          bridge or water pipeline solved real community distress. <strong>Samvaad-Setu 360°</strong> institutes 
          <strong> Closed-Loop Proof-of-Completion (CL-PoC)</strong> combining geo-tagged photo audits, satellite SAR telemetry, 
          and automated native-language citizen voice callbacks.
        </p>
      </div>

      {/* 5 Core Impact Indicators Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {DPI_IMPACT_METRICS.map((metric, idx) => {
          const isSelected = selectedMetric.indicator === metric.indicator;
          return (
            <div
              key={idx}
              onClick={() => setSelectedMetric(metric)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-emerald-500 shadow-lg ring-1 ring-emerald-500/50'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="text-xs font-semibold text-slate-300 line-clamp-1">
                  {metric.indicator}
                </div>
                <div className="text-lg font-black text-emerald-400 mt-2">
                  {metric.deltaImprovement}
                </div>
              </div>
              <div className="text-[10px] text-slate-500 mt-3 pt-2 border-t border-slate-800/80 font-mono">
                Click to Inspect
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Indicator Deep-Dive */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Selected Impact Indicator
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              {selectedMetric.indicator}
            </h3>
          </div>
          <div className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black self-start sm:self-auto">
            {selectedMetric.deltaImprovement}
          </div>
        </div>

        {/* Before vs After Baseline Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pre-DPI Baseline */}
          <div className="bg-rose-950/20 p-5 rounded-xl border border-rose-900/40 space-y-2">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              Pre-DPI Status Quo Baseline
            </div>
            <p className="text-sm text-rose-100/90 leading-relaxed font-medium">
              {selectedMetric.preDpiBaseline}
            </p>
          </div>

          {/* Post-DPI Grounded Outcome */}
          <div className="bg-emerald-950/20 p-5 rounded-xl border border-emerald-900/40 space-y-2">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Post-DPI Samvaad-Setu Grounded Outcome
            </div>
            <p className="text-sm text-emerald-100/90 leading-relaxed font-medium">
              {selectedMetric.postDpiGroundedOutcome}
            </p>
          </div>
        </div>

        {/* Verification Methodology */}
        <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/60 space-y-1">
          <div className="text-xs font-bold text-slate-300">
            Authoritative Verification Methodology
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-mono">
            {selectedMetric.verificationMethod}
          </p>
        </div>
      </div>

      {/* Closed-Loop Proof of Completion Audit Simulator */}
      <div className="bg-gradient-to-br from-indigo-950/30 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-500/40 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Closed-Loop Proof-of-Completion (CL-PoC) Verification Engine
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Preventing the "Grievance Black Hole" & Measuring Physical Completion
            </h3>
          </div>

          <button
            onClick={handleSimulateAudit}
            disabled={isVerifyingAudit}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer self-start sm:self-auto"
          >
            {isVerifyingAudit ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Executing Triangulated Audit...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Simulate Project Verification Audit
              </>
            )}
          </button>
        </div>

        {/* 3 Verification Gates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Gate 1 */}
          <div className={`p-4 rounded-xl border transition-all ${auditStep >= 1 ? 'bg-slate-800/80 border-emerald-500' : 'bg-slate-800/40 border-slate-700'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Camera className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-white">Gate 1: Geo-Tagged Photos</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Field Engineer uploads EXIF-verified, timestamped before & after photos linked to PM GatiShakti asset ID.
            </p>
            <div className="mt-3 text-[10px] text-emerald-400 font-mono">
              Status: EXIF Metadata Verified (Lat: 19.07, Long: 81.95)
            </div>
          </div>

          {/* Gate 2 */}
          <div className={`p-4 rounded-xl border transition-all ${auditStep >= 2 ? 'bg-slate-800/80 border-emerald-500' : 'bg-slate-800/40 border-slate-700'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white">Gate 2: Satellite SAR Check</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Synthetic Aperture Radar telemetry detects concrete culvert bridge signature across monsoon drainage line.
            </p>
            <div className="mt-3 text-[10px] text-cyan-400 font-mono">
              Status: 99.4% Surface Linear Match
            </div>
          </div>

          {/* Gate 3 */}
          <div className={`p-4 rounded-xl border transition-all ${auditStep >= 3 ? 'bg-slate-800/80 border-emerald-500' : 'bg-slate-800/40 border-slate-700'}`}>
            <div className="flex items-center gap-2 mb-2">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white">Gate 3: Native Voice Callback</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Automated Bhashini IVR calls the original complainant in Bhojpuri: <em>"Did tractors cross the bridge? Press 1."</em>
            </p>
            <div className="mt-3 text-[10px] text-emerald-300 font-mono font-bold">
              Status: Citizen Confirmed (DTMF Key 1)
            </div>
          </div>
        </div>

        {/* Immutable Audit Ledger Result */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-mono text-slate-300">
            <FileCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="truncate">Cryptographic Audit Hash: 0x8f2a93c7...b41e (Verified & Published to Open DPG Ledger)</span>
          </div>
          <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            Tamper-Proof Sign-off
          </span>
        </div>
      </div>
    </div>
  );
};
