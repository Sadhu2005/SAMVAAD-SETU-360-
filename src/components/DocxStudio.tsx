import React, { useState } from 'react';
import {
  FileText,
  Download,
  CheckCircle2,
  Settings,
  BookOpen,
  Layers,
  ShieldAlert,
  Table as TableIcon
} from 'lucide-react';
import { generateSamvaadSetuDocx, DocxOptions } from '../utils/docxExport';

export const DocxStudio: React.FC = () => {
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const [options, setOptions] = useState<DocxOptions>({
    includeEdgeCases: true,
    includeBricsBlueprint: true,
    includeMathFormulation: true,
    includeGatiShaktiDetails: true,
    includeMisalignmentData: true,
    includeDpiImpactMetrics: true,
    includePolicymakerDossiers: true,
    customAuthor: 'BRICS Track 1 DPI & Governance AI Taskforce',
    customTargetNation: 'India & BRICS Member Nations (Brazil, South Africa, Russia, China, Egypt)',
  });

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      const fileName = await generateSamvaadSetuDocx(options);
      setDownloadSuccess(fileName);
      setTimeout(() => setDownloadSuccess(null), 8000);
    } catch (err) {
      console.error('Failed to export DOCX:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gov-card text-gov-text p-6 sm:p-8 rounded-sm border border-gov-border  space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gov-teal-soft text-gov-teal border border-gov-teal">
          <FileText className="w-3.5 h-3.5" />
          Official Deliverable Generator
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Export the Complete 360° BRICS Track 1 Blueprint in Microsoft Word (.docx)
        </h2>
        <p className="text-sm text-gov-muted max-w-4xl leading-relaxed">
          Generate an exhaustive, publication-grade <strong>.docx</strong> document formatted according to 
          official international policy standards. Contains the executive summary, 5-layer DPI architecture, 
          the complete 10-point edge case matrix, mathematical formulation (DIPS & DIEW), empirical Indian district studies, 
          and BRICS New Development Bank (NDB) transferability roadmap.
        </p>

        {/* Big Download Button */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="flex items-center justify-center gap-2.5 min-h-11 px-6 py-3.5 rounded-sm font-bold text-sm sm:text-base bg-gov-teal text-white disabled:opacity-50 cursor-pointer"
          >
            <Download className="w-5 h-5" />
            {isExporting ? 'Packaging & Generating DOCX...' : 'Download Complete Blueprint (.docx)'}
          </button>

          {downloadSuccess && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-sm bg-emerald-500/20 text-gov-success border border-gov-success text-xs font-medium animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-gov-success" />
              <span>Downloaded: <strong>{downloadSuccess}</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* Two-Column Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Customization Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gov-card p-6 rounded-sm border border-gov-border  space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-gov-muted uppercase tracking-wider border-b border-gov-border pb-3">
              <Settings className="w-4 h-4 text-gov-teal" />
              Document Customization Options
            </div>

            {/* Author & Nation Inputs */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gov-muted">Author / Organization Name</label>
                <input
                  type="text"
                  value={options.customAuthor}
                  onChange={(e) => setOptions({ ...options, customAuthor: e.target.value })}
                  className="w-full mt-1 bg-gov-inset border border-gov-border rounded-sm px-3 py-2 text-xs text-gov-text focus:outline-none focus:border-gov-teal"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gov-muted">Target Geographical Scope</label>
                <input
                  type="text"
                  value={options.customTargetNation}
                  onChange={(e) => setOptions({ ...options, customTargetNation: e.target.value })}
                  className="w-full mt-1 bg-gov-inset border border-gov-border rounded-sm px-3 py-2 text-xs text-gov-text focus:outline-none focus:border-gov-teal"
                />
              </div>
            </div>

            {/* Section Toggles */}
            <div className="space-y-3 pt-2 border-t border-gov-border">
              <div className="text-xs font-semibold text-gov-muted mb-2">Include Document Chapters:</div>

              <label className="flex items-center justify-between p-3 rounded-sm bg-gov-inset border border-gov-border cursor-pointer hover:bg-gov-inset/70">
                <span className="text-xs text-gov-text font-medium">
                  360° Edge Case Matrix (All 10 Failure Modes)
                </span>
                <input
                  type="checkbox"
                  checked={options.includeEdgeCases}
                  onChange={(e) => setOptions({ ...options, includeEdgeCases: e.target.checked })}
                  className="w-4 h-4 accent-gov-teal rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-sm bg-gov-inset border border-gov-border cursor-pointer hover:bg-gov-inset/70">
                <span className="text-xs text-gov-text font-medium">
                  Mathematical Formulation (DIPS, DIEW, Sybil Guard)
                </span>
                <input
                  type="checkbox"
                  checked={options.includeMathFormulation}
                  onChange={(e) => setOptions({ ...options, includeMathFormulation: e.target.checked })}
                  className="w-4 h-4 accent-gov-teal rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-sm bg-gov-inset border border-gov-border cursor-pointer hover:bg-gov-inset/70">
                <span className="text-xs text-gov-text font-medium">
                  PM GatiShakti & Indian Aspirational Districts
                </span>
                <input
                  type="checkbox"
                  checked={options.includeGatiShaktiDetails}
                  onChange={(e) => setOptions({ ...options, includeGatiShaktiDetails: e.target.checked })}
                  className="w-4 h-4 accent-gov-teal rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-sm bg-gov-inset border border-gov-border cursor-pointer hover:bg-gov-inset/70">
                <span className="text-xs text-gov-text font-medium">
                  BRICS Global Scalability & New Development Bank (NDB)
                </span>
                <input
                  type="checkbox"
                  checked={options.includeBricsBlueprint}
                  onChange={(e) => setOptions({ ...options, includeBricsBlueprint: e.target.checked })}
                  className="w-4 h-4 accent-gov-teal rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-sm bg-gov-inset border border-gov-border cursor-pointer hover:bg-gov-inset/70">
                <span className="text-xs text-gov-text font-medium">
                  Big Data 4-Way Fusion & Fiscal Misalignment Calculator
                </span>
                <input
                  type="checkbox"
                  checked={options.includeMisalignmentData}
                  onChange={(e) => setOptions({ ...options, includeMisalignmentData: e.target.checked })}
                  className="w-4 h-4 accent-gov-teal rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-sm bg-gov-inset border border-gov-border cursor-pointer hover:bg-gov-inset/70">
                <span className="text-xs text-gov-text font-medium">
                  DPI Impact Measurement & Closed-Loop Verification
                </span>
                <input
                  type="checkbox"
                  checked={options.includeDpiImpactMetrics}
                  onChange={(e) => setOptions({ ...options, includeDpiImpactMetrics: e.target.checked })}
                  className="w-4 h-4 accent-gov-teal rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-sm bg-gov-inset border border-gov-border cursor-pointer hover:bg-gov-inset/70">
                <span className="text-xs text-gov-text font-medium">
                  Bankable High-Priority Project Dossiers for BRICS
                </span>
                <input
                  type="checkbox"
                  checked={options.includePolicymakerDossiers}
                  onChange={(e) => setOptions({ ...options, includePolicymakerDossiers: e.target.checked })}
                  className="w-4 h-4 accent-gov-teal rounded"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Document Structure Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-gov-card p-6 rounded-sm border border-gov-border  space-y-5">
            <div className="flex items-center justify-between border-b border-gov-border pb-3">
              <span className="text-xs font-bold text-gov-teal uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                Table of Contents & Structure Preview
              </span>
              <span className="text-[11px] font-mono text-gov-muted">Microsoft Word (.docx) Format</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-sm bg-gov-inset border border-gov-border flex items-start gap-3">
                <span className="font-mono text-gov-teal font-bold">01</span>
                <div>
                  <div className="font-bold text-gov-text text-sm">Executive Summary & Problem Statement</div>
                  <div className="text-gov-muted mt-0.5">
                    Quantifying the disconnect between top-down public capital spending and grassroots citizen distress; the Digital Public Good (DPG) imperative.
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-sm bg-gov-inset border border-gov-border flex items-start gap-3">
                <span className="font-mono text-gov-teal font-bold">02</span>
                <div>
                  <div className="font-bold text-gov-text text-sm">The 5-Layer DPI Architecture Specification</div>
                  <div className="text-gov-muted mt-0.5">
                    Detailed technical breakdown: Bhashini ASR, PM GatiShakti GIS 1400+ layers, Toponym Resolver, Demographic-Inverse Equity Weighting, and Beckn Protocol.
                  </div>
                </div>
              </div>

              {options.includeMathFormulation && (
                <div className="p-3.5 rounded-sm bg-gov-inset border border-gov-border flex items-start gap-3">
                  <span className="font-mono text-gov-teal font-bold">03</span>
                  <div>
                    <div className="font-bold text-gov-text text-sm">Mathematical Formulation: Dynamic Infrastructure Priority Score (DIPS)</div>
                    <div className="text-gov-muted mt-0.5">
                      Formal formula combining citizen volume, poverty multipliers, infrastructure deficit index, geospatial synergy, and Sybil resistance.
                    </div>
                  </div>
                </div>
              )}

              {options.includeEdgeCases && (
                <div className="p-3.5 rounded-sm bg-gov-inset border border-gov-border flex items-start gap-3">
                  <span className="font-mono text-gov-teal font-bold">04</span>
                  <div>
                    <div className="font-bold text-gov-text text-sm">The 360° Edge Case Stress Matrix (10 Lethal Failure Modes)</div>
                    <div className="text-gov-muted mt-0.5">
                      Exhaustive tables detailing failure modes and AI DPI mitigations: Bundeli/oral dialects, zero-connectivity mesh, contractor bot farms, vague landmarks, and DPDP 2023.
                    </div>
                  </div>
                </div>
              )}

              {options.includeGatiShaktiDetails && (
                <div className="p-3.5 rounded-sm bg-gov-inset border border-gov-border flex items-start gap-3">
                  <span className="font-mono text-gov-teal font-bold">05</span>
                  <div>
                    <div className="font-bold text-gov-text text-sm">Indian Aspirational District Field Case Studies</div>
                    <div className="text-gov-muted mt-0.5">
                      Empirical evidence across Bastar, Nuh, Kalahandi, Vidarbha, Baramulla, and Chamba with capex estimates and PMGSY/Jal Jeevan alignment.
                    </div>
                  </div>
                </div>
              )}

              {options.includeBricsBlueprint && (
                <div className="p-3.5 rounded-sm bg-gov-inset border border-gov-border flex items-start gap-3">
                  <span className="font-mono text-gov-teal font-bold">06</span>
                  <div>
                    <div className="font-bold text-gov-text text-sm">BRICS Global Scalability & New Development Bank (NDB) Blueprint</div>
                    <div className="text-gov-muted mt-0.5">
                      Portability mappings for Brazil, South Africa, Russia, China, Egypt, and Ethiopia; NDB loan pipeline integration.
                    </div>
                  </div>
                </div>
              )}

              {options.includeMisalignmentData && (
                <div className="p-3.5 rounded-sm bg-gov-inset border border-gov-border flex items-start gap-3">
                  <span className="font-mono text-gov-teal font-bold">07</span>
                  <div>
                    <div className="font-bold text-gov-text text-sm">Big Data 4-Way Fusion & Solving Public Spending Misalignment</div>
                    <div className="text-gov-muted mt-0.5">
                      Quantifying the ₹61,500 Cr fiscal drift; cross-correlation of citizen feedback, demographic vulnerability, and capex budgets.
                    </div>
                  </div>
                </div>
              )}

              {options.includeDpiImpactMetrics && (
                <div className="p-3.5 rounded-sm bg-gov-inset border border-gov-border flex items-start gap-3">
                  <span className="font-mono text-gov-teal font-bold">08</span>
                  <div>
                    <div className="font-bold text-gov-text text-sm">Measuring the Impact of Large-Scale Digital Public Infrastructure</div>
                    <div className="text-gov-muted mt-0.5">
                      Empirical before/after metrics (+5.8x alignment precision, 99.9% hazard latency drop, +68% net trust surge) and Closed-Loop Proof of Completion (CL-PoC).
                    </div>
                  </div>
                </div>
              )}

              {options.includePolicymakerDossiers && (
                <div className="p-3.5 rounded-sm bg-gov-inset border border-gov-border flex items-start gap-3">
                  <span className="font-mono text-gov-teal font-bold">09</span>
                  <div>
                    <div className="font-bold text-gov-text text-sm">Bankable High-Priority Project Dossiers for BRICS National Policymakers</div>
                    <div className="text-gov-muted mt-0.5">
                      Pre-appraised capital project dossiers for India, Brazil, South Africa, Russia, and Egypt with Capex, EIRR, and NDB blended-finance windows.
                    </div>
                  </div>
                </div>
              )}

              <div className="p-3.5 rounded-sm bg-gov-inset border border-gov-border flex items-start gap-3">
                <span className="font-mono text-gov-teal font-bold">10</span>
                <div>
                  <div className="font-bold text-gov-text text-sm">DPDP Act 2023 Compliance & 3-Year Implementation Roadmap</div>
                  <div className="text-gov-muted mt-0.5">
                    Zero-knowledge tokenization, differential privacy heatmaps, and phased rollout timeline from Aspirational Districts to Pan-BRICS deployment.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
