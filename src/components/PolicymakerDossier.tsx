import React, { useState } from 'react';
import {
  Building2,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  FileText,
  ExternalLink,
  Send,
  Download
} from 'lucide-react';
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
    }, 600);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gov-card text-gov-text p-6 sm:p-8 rounded-sm border border-gov-border  space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gov-teal-soft text-gov-teal border border-gov-teal">
          BRICS National Policymaker Executive Portal
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Surfacing Demand Hotspots & Recommending Bankable Projects across BRICS
        </h2>
        <p className="text-sm text-gov-muted max-w-4xl leading-relaxed">
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
              className={`px-3 py-1.5 rounded-sm text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCountry === c
                  ? 'bg-gov-teal text-white font-bold shadow-md'
                  : 'bg-gov-inset text-gov-muted hover:bg-gov-navy-soft'
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
          <div className="text-xs font-bold text-gov-muted uppercase tracking-wider flex items-center justify-between">
            <span>High-Priority Project Pipeline ({filteredDossiers.length})</span>
            <span className="text-gov-success font-mono">NDB Aligned</span>
          </div>

          <div className="space-y-2.5">
            {filteredDossiers.map((dossier, idx) => {
              const isSelected = selectedDossier.projectName === dossier.projectName;
              const isApproved = approvedProjects[dossier.projectName];

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedDossier(dossier)}
                  className={`p-4 rounded-sm border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gov-card border-gov-teal  ring-1 ring-gov-teal'
                      : 'bg-gov-card border-gov-border hover:border-gov-border'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base"></span>
                        <h4 className="font-bold text-gov-text text-sm line-clamp-1">
                          {dossier.projectName}
                        </h4>
                      </div>
                      <p className="text-xs text-gov-muted mt-1">
                        {dossier.corridor}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-xs font-black text-gov-success">
                        {dossier.capexUsd}
                      </div>
                      <div className="text-[10px] text-gov-muted font-mono">
                        {dossier.readinessIndex}% Shovel-Ready
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-gov-border flex items-center justify-between text-[11px] text-gov-muted">
                    <span>
                      Signals: <strong className="text-gov-teal">{dossier.demandHeatmapSignals.toLocaleString()}</strong>
                    </span>
                    <span>
                      EIRR: <strong className="text-gov-teal">{dossier.economicInternalRateOfReturn.split(' ')[0]}</strong>
                    </span>
                    {isApproved ? (
                      <span className="text-gov-success font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                      </span>
                    ) : (
                      <span className="text-gov-muted">Under Review</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Full Bankable Project Dossier */}
        <div className="lg:col-span-7">
          <div className="bg-gov-card p-6 sm:p-8 rounded-sm border border-gov-border  space-y-5">
            {/* Dossier Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gov-border pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl"></span>
                  <div>
                    <span className="text-[11px] font-bold text-gov-teal uppercase tracking-wider">
                      {selectedDossier.country} • {selectedDossier.corridor}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-gov-text leading-tight mt-0.5">
                      {selectedDossier.projectName}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="bg-gov-inset px-4 py-2 rounded-sm text-center border border-gov-border self-start sm:self-auto">
                <div className="text-lg font-black text-gov-success">
                  {selectedDossier.capexUsd}
                </div>
                <div className="text-[10px] text-gov-muted font-mono">
                  ({selectedDossier.capexInr})
                </div>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="bg-gov-inset p-3 rounded-sm border border-gov-border">
                <div className="text-gov-teal font-bold">{selectedDossier.demandHeatmapSignals.toLocaleString()}</div>
                <div className="text-[10px] text-gov-muted mt-0.5">Citizen Voice Signals</div>
              </div>

              <div className="bg-gov-inset p-3 rounded-sm border border-gov-border">
                <div className="text-gov-success font-bold">{selectedDossier.economicInternalRateOfReturn.split(' ')[0]}</div>
                <div className="text-[10px] text-gov-muted mt-0.5">Economic IRR</div>
              </div>

              <div className="bg-gov-inset p-3 rounded-sm border border-gov-border">
                <div className="text-gov-teal font-bold">{selectedDossier.readinessIndex}%</div>
                <div className="text-[10px] text-gov-muted mt-0.5">Shovel Readiness</div>
              </div>

              <div className="bg-gov-inset p-3 rounded-sm border border-gov-border">
                <div className="text-gov-navy font-bold truncate">{selectedDossier.beneficiaries.split(' ')[0]}</div>
                <div className="text-[10px] text-gov-muted mt-0.5">Beneficiaries</div>
              </div>
            </div>

            {/* Problem & Grounded Intervention */}
            <div className="space-y-3 text-xs">
              <div className="bg-rose-950/20 p-4 rounded-sm border border-rose-900/40 space-y-1">
                <div className="font-bold text-gov-error uppercase tracking-wider text-[11px]">
                  Grassroots Deficit & Community Distress
                </div>
                <p className="text-rose-100/90 leading-relaxed">
                  {selectedDossier.summaryProblem}
                </p>
              </div>

              <div className="bg-emerald-950/20 p-4 rounded-sm border border-emerald-900/40 space-y-1">
                <div className="font-bold text-gov-success uppercase tracking-wider text-[11px]">
                  Recommended Capital Public Works Intervention
                </div>
                <p className="text-emerald-100/90 leading-relaxed">
                  {selectedDossier.groundedIntervention}
                </p>
              </div>
            </div>

            {/* Scheme & NDB Financing Alignment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-gov-inset p-3.5 rounded-sm border border-gov-border">
                <div className="text-gov-muted text-[11px]">National Scheme Alignment</div>
                <div className="font-semibold text-gov-text mt-1">{selectedDossier.nationalScheme}</div>
              </div>

              <div className="bg-gov-inset p-3.5 rounded-sm border border-gov-border">
                <div className="text-gov-muted text-[11px]">BRICS New Development Bank (NDB) Window</div>
                <div className="font-semibold text-gov-teal mt-1">{selectedDossier.bricsNdbAlignment}</div>
              </div>
            </div>

            {/* Approval & Export Actions */}
            <div className="pt-3 border-t border-gov-border flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => handleApproveProject(selectedDossier)}
                disabled={isApproving || approvedProjects[selectedDossier.projectName]}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs sm:text-sm font-bold transition-all active:scale-95 cursor-pointer ${
                  approvedProjects[selectedDossier.projectName]
                    ? 'bg-gov-success text-white cursor-default'
                    : 'bg-gov-teal hover:bg-gov-navy text-white shadow-md'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {approvedProjects[selectedDossier.projectName]
                  ? 'Project Sanctioned & Transmitted to NDB'
                  : 'Approve & Sanction Project Pipeline'}
              </button>

              <button
                onClick={onExportDocx}
                className="flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs font-semibold bg-gov-inset hover:bg-gov-navy-soft text-gov-text border border-gov-border transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-gov-teal" />
                Export Dossier in DOCX
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
