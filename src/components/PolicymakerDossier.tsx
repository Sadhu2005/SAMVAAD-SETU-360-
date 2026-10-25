import React, { useState } from 'react';
import {
  Globe2,
  Building2,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  FileText,
  Sparkles,
  ExternalLink,
  Send,
  Download,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { POLICYMAKER_DOSSIERS, PolicymakerProjectDossier } from '../data/fusionData';

interface PolicymakerDossierProps {
  onExportDocx: () => void;
}

export const PolicymakerDossier: React.FC<PolicymakerDossierProps> = ({ onExportDocx }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedDossier, setSelectedDossier] = useState<PolicymakerProjectDossier>(POLICYMAKER_DOSSIERS[0]);
  const [approvedProjects, setApprovedProjects] = useState<{ [key: string]: boolean }>({});
  const [isApproving, setIsApproving] = useState<boolean>(false);

  const countries = ['All', 'India', 'Brazil', 'South Africa', 'Russia', 'Egypt & Ethiopia'];

  const filteredDossiers = POLICYMAKER_DOSSIERS.filter(
    (d) => selectedCountry === 'All' || d.country.includes(selectedCountry)
  );

  const handleApproveProject = (dossier: PolicymakerProjectDossier) => {
    setIsApproving(true);
    setTimeout(() => {
      setApprovedProjects((prev) => ({ ...prev, [dossier.projectName]: true }));
      setIsApproving(false);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
          <Globe2 className="w-3.5 h-3.5" />
          BRICS National Policymaker Executive Portal
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Surfacing Demand Hotspots & Recommending Bankable Projects across BRICS
        </h2>
        <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">
          National policymakers across BRICS member nations receive pre-appraised, high-priority public works dossiers 
          synthesized directly from aggregated citizen demand, demographic vulnerability, and masterplan corridors. 
          Each project is structured for immediate co-financing by the <strong>New Development Bank (NDB)</strong>.
        </p>

        {/* Country Filter Bar */}
        <div className="pt-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCountry(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCountry === c
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {c === 'All' ? 'All BRICS Nations' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recommended Projects List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>High-Priority Project Pipeline ({filteredDossiers.length})</span>
            <span className="text-emerald-400 font-mono">NDB Aligned</span>
          </div>

          <div className="space-y-2.5">
            {filteredDossiers.map((dossier, idx) => {
              const isSelected = selectedDossier.projectName === dossier.projectName;
              const isApproved = approvedProjects[dossier.projectName];

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedDossier(dossier)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-amber-500 shadow-lg ring-1 ring-amber-500/50'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base">{dossier.countryFlag}</span>
                        <h4 className="font-bold text-white text-sm line-clamp-1">
                          {dossier.projectName}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {dossier.corridor}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-xs font-black text-emerald-400">
                        {dossier.capexUsd}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {dossier.readinessIndex}% Shovel-Ready
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      Signals: <strong className="text-cyan-400">{dossier.demandHeatmapSignals.toLocaleString()}</strong>
                    </span>
                    <span>
                      EIRR: <strong className="text-amber-400">{dossier.economicInternalRateOfReturn.split(' ')[0]}</strong>
                    </span>
                    {isApproved ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                      </span>
                    ) : (
                      <span className="text-slate-400">Under Review</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Full Bankable Project Dossier */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-5">
            {/* Dossier Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedDossier.countryFlag}</span>
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                      {selectedDossier.country} • {selectedDossier.corridor}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white leading-tight mt-0.5">
                      {selectedDossier.projectName}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/80 px-4 py-2 rounded-xl text-center border border-slate-700 self-start sm:self-auto">
                <div className="text-lg font-black text-emerald-400">
                  {selectedDossier.capexUsd}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  ({selectedDossier.capexInr})
                </div>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <div className="text-amber-400 font-bold">{selectedDossier.demandHeatmapSignals.toLocaleString()}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Citizen Voice Signals</div>
              </div>

              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <div className="text-emerald-400 font-bold">{selectedDossier.economicInternalRateOfReturn.split(' ')[0]}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Economic IRR</div>
              </div>

              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <div className="text-cyan-400 font-bold">{selectedDossier.readinessIndex}%</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Shovel Readiness</div>
              </div>

              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                <div className="text-indigo-400 font-bold truncate">{selectedDossier.beneficiaries.split(' ')[0]}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Beneficiaries</div>
              </div>
            </div>

            {/* Problem & Grounded Intervention */}
            <div className="space-y-3 text-xs">
              <div className="bg-rose-950/20 p-4 rounded-xl border border-rose-900/40 space-y-1">
                <div className="font-bold text-rose-400 uppercase tracking-wider text-[11px]">
                  Grassroots Deficit & Community Distress
                </div>
                <p className="text-rose-100/90 leading-relaxed">
                  {selectedDossier.summaryProblem}
                </p>
              </div>

              <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-900/40 space-y-1">
                <div className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                  Recommended Capital Public Works Intervention
                </div>
                <p className="text-emerald-100/90 leading-relaxed">
                  {selectedDossier.groundedIntervention}
                </p>
              </div>
            </div>

            {/* Scheme & NDB Financing Alignment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/60">
                <div className="text-slate-400 text-[11px]">National Scheme Alignment</div>
                <div className="font-semibold text-white mt-1">{selectedDossier.nationalScheme}</div>
              </div>

              <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/60">
                <div className="text-slate-400 text-[11px]">BRICS New Development Bank (NDB) Window</div>
                <div className="font-semibold text-cyan-300 mt-1">{selectedDossier.bricsNdbAlignment}</div>
              </div>
            </div>

            {/* Approval & Export Actions */}
            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => handleApproveProject(selectedDossier)}
                disabled={isApproving || approvedProjects[selectedDossier.projectName]}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95 cursor-pointer ${
                  approvedProjects[selectedDossier.projectName]
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {approvedProjects[selectedDossier.projectName]
                  ? 'Project Sanctioned & Transmitted to NDB'
                  : 'Approve & Sanction Project Pipeline'}
              </button>

              <button
                onClick={onExportDocx}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                Export Dossier in DOCX
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
