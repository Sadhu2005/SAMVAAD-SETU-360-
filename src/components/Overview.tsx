import React from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

interface OverviewProps {
  onNavigateToTab: (tab: string) => void;
  onExportDocx: () => void;
}

export const Overview: React.FC<OverviewProps> = ({ onNavigateToTab, onExportDocx }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Executive Card */}
      <div className="relative overflow-hidden rounded-sm bg-gov-card border border-gov-border  p-6 sm:p-10 text-gov-text">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gov-teal-soft text-gov-teal border border-gov-teal">
            Official Response Blueprint — BRICS Innovation Track 1
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gov-text leading-tight">
            Bridging the Voice of 1.4 Billion Citizens with National Infrastructure Planning
          </h2>

          <p className="text-gov-muted text-sm sm:text-base leading-relaxed">
            Governments globally struggle to consolidate citizen feedback and align it with national infrastructure priorities. 
            Development requests live in fragmented, disconnected silos, leading to misaligned public spending, unaddressed infrastructure gaps, 
            and zero visibility into the real impact of multi-billion dollar Digital Public Infrastructure (DPI) initiatives.
          </p>

          <p className="text-gov-navy text-sm sm:text-base font-medium">
            <span className="font-bold text-gov-teal">SAMVAAD-SETU 360°</span> is an AI-powered Digital Public Good that unifies 
            multilingual oral/text feedback (via <strong>Bhashini</strong>) with geospatial masterplans (<strong>PM GatiShakti</strong> 1,400+ layers) 
            and demographic indices (<strong>NITI Aayog</strong>), checking all 10 lethal edge cases to surface demand hotspots for BRICS policymakers.
          </p>

          {/* Quick CTA Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateToTab('prototype')}
              className="flex items-center justify-center gap-2 min-h-11 px-6 py-2.5 rounded-sm font-bold text-sm bg-gov-teal hover:bg-gov-navy text-white cursor-pointer"
            >
              Launch Live Resolution Prototype (Solve Now)
            </button>

            <button
              onClick={onExportDocx}
              className="flex items-center gap-2 px-5 py-2.5 rounded-sm font-bold text-sm bg-gov-inset hover:bg-gov-navy-soft text-gov-text border border-gov-border transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-gov-teal" />
              Download Official 360° DOCX Blueprint
            </button>

            <button
              onClick={() => onNavigateToTab('edge-cases')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-sm font-semibold text-sm bg-gov-inset hover:bg-gov-navy-soft text-gov-text border border-gov-border hover:border-gov-border transition-all cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-gov-teal" />
              Explore All 10 Edge Cases
            </button>

            <button
              onClick={() => onNavigateToTab('fusion')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-sm font-semibold text-sm bg-gov-teal-soft hover:bg-gov-teal-soft text-gov-teal border border-gov-teal transition-all cursor-pointer"
            >
              <span>Big Data Fusion (4 Datasets)</span>
            </button>

            <button
              onClick={() => onNavigateToTab('impact')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-sm font-semibold text-sm bg-gov-success-bg hover:bg-gov-success-bg text-gov-success border border-gov-success transition-all cursor-pointer"
            >
              <span>DPI Impact Measurement</span>
            </button>

            <button
              onClick={() => onNavigateToTab('policymakers')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-sm font-semibold text-sm bg-gov-navy-soft hover:bg-gov-navy-soft text-gov-navy border border-gov-border transition-all cursor-pointer"
            >
              <span>BRICS Policymaker Dossiers</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="mt-8 pt-8 border-t border-gov-border grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gov-inset p-4 rounded-sm border border-gov-border">
            <div className="text-2xl sm:text-3xl font-black text-gov-teal">22+</div>
            <div className="text-xs text-gov-muted font-medium mt-1">Scheduled Indian Languages & Dialects (Bhashini)</div>
          </div>

          <div className="bg-gov-inset p-4 rounded-sm border border-gov-border">
            <div className="text-2xl sm:text-3xl font-black text-gov-success">1,400+</div>
            <div className="text-xs text-gov-muted font-medium mt-1">PM GatiShakti Multi-Modal GIS Spatial Layers</div>
          </div>

          <div className="bg-gov-inset p-4 rounded-sm border border-gov-border">
            <div className="text-2xl sm:text-3xl font-black text-gov-teal">10 / 10</div>
            <div className="text-xs text-gov-muted font-medium mt-1">Edge Cases Checked (Astroturfing to Oral Dialects)</div>
          </div>

          <div className="bg-gov-inset p-4 rounded-sm border border-gov-border">
            <div className="text-2xl sm:text-3xl font-black text-gov-navy">BRICS+</div>
            <div className="text-xs text-gov-muted font-medium mt-1">Transferable (Brazil, South Africa, Russia, China, Egypt)</div>
          </div>
        </div>
      </div>

      {/* The 3-Way Problem vs 360° Solution Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* The Problem */}
        <div className="bg-white bg-gov-card p-6 rounded-sm border border-gov-error border-gov-error shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-gov-error text-gov-error font-bold text-base">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>The Status Quo: Fragmented Governance & Public Waste</span>
          </div>

          <ul className="space-y-3 text-sm text-slate-600 text-gov-muted">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 flex-shrink-0"></span>
              <span><strong>Isolated Grievance Portals:</strong> Feedback lands in isolated portals (CP-GRAMS, state CM helplines, WhatsApp groups), treated as temporary complaints rather than strategic capital signals.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 flex-shrink-0"></span>
              <span><strong>The Linguistic Exclusion Wall:</strong> Over 70% of rural citizens speak unstandardized dialects (Bundeli, Santhali, Gondi, Varhadi). Text-based English/Hindi web portals exclude illiterate citizens.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 flex-shrink-0"></span>
              <span><strong>Contractor Cartels & Astroturfing:</strong> Well-funded syndicates script thousands of demands for unnecessary road contracts while starving villages remain invisible.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 flex-shrink-0"></span>
              <span><strong>No Impact Loop:</strong> Once funds are spent, policymakers have zero automated mechanism to measure whether the new bridge or water pipe actually resolved citizen distress.</span>
            </li>
          </ul>
        </div>

        {/* The Solution */}
        <div className="bg-white bg-gov-card p-6 rounded-sm border border-emerald-200 border-gov-success shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 text-gov-success font-bold text-base">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>The 360° DPI Solution: Samvaad-Setu Architecture</span>
          </div>

          <ul className="space-y-3 text-sm text-slate-600 text-gov-muted">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
              <span><strong>Omni-Channel Voice & Text Ingestion:</strong> Citizens speak in their native tongue via missed-call IVR (1912), WhatsApp, or CSC centers; Bhashini converts speech into structured tokens.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
              <span><strong>PM GatiShakti Geospatial Fusion:</strong> Colloquial landmarks ("old peepal tree") are matched with 1,400+ GIS layers to assign exact cadastral parcels and responsible departments.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
              <span><strong>Inverse Equity Prioritization:</strong> Weighted scoring combines citizen demand with NITI Aayog Multi-Dimensional Poverty Index (MPI), preventing urban elite capture.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
              <span><strong>Closed-Loop Native Proof:</strong> Field engineers must provide geo-tagged proof, followed by an automated Bhashini voice confirmation call to the citizen in their mother tongue.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* The 5-Layer End-to-End DPI Architecture */}
      <div className="bg-gov-card text-gov-text p-6 sm:p-8 rounded-sm border border-gov-border  space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gov-border pb-4">
          <div>
            <h3 className="text-xl font-bold text-gov-text">
              The 5-Layer Digital Public Good Architecture
            </h3>
            <p className="text-xs text-gov-muted mt-0.5">
              Designed as an open, interoperable Digital Public Good under DPGA principles
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 bg-gov-navy-soft text-gov-navy rounded-full font-mono">
            Stack: Bhashini + GatiShakti + Beckn + DPDP 2023
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Layer 1 */}
          <div className="bg-gov-inset p-4 rounded-sm border border-gov-border flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-gov-teal uppercase tracking-wider mb-1">Layer 1</div>
              <h4 className="font-bold text-sm text-gov-text mb-2">Omni Ingestion</h4>
              <p className="text-xs text-gov-muted leading-relaxed">
                Toll-free IVR (1912), WhatsApp Audio, 2G SMS micro-payloads, CSC VLEs for offline zero-connectivity zones.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-gov-border text-[11px] text-gov-teal font-medium">
              Zero Exclusion Barrier
            </div>
          </div>

          {/* Layer 2 */}
          <div className="bg-gov-inset p-4 rounded-sm border border-gov-border flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-gov-success uppercase tracking-wider mb-1">Layer 2</div>
              <h4 className="font-bold text-sm text-gov-text mb-2">Indic AI Engine</h4>
              <p className="text-xs text-gov-muted leading-relaxed">
                Bhashini IndicConformer ASR, dialect de-noising, LLM Named Entity Recognition (asset, defect, urgency).
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-gov-border text-[11px] text-gov-success font-medium">
              22+ Languages & Dialects
            </div>
          </div>

          {/* Layer 3 */}
          <div className="bg-gov-inset p-4 rounded-sm border border-gov-border flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-gov-teal uppercase tracking-wider mb-1">Layer 3</div>
              <h4 className="font-bold text-sm text-gov-text mb-2">GatiShakti GIS</h4>
              <p className="text-xs text-gov-muted leading-relaxed">
                Toponym resolver, telecom cell-ID bounding, Survey of India cadastral match, 1,400+ infrastructure layers.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-gov-border text-[11px] text-gov-teal font-medium">
              Exact Asset Ownership
            </div>
          </div>

          {/* Layer 4 */}
          <div className="bg-gov-inset p-4 rounded-sm border border-gov-border flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-gov-navy uppercase tracking-wider mb-1">Layer 4</div>
              <h4 className="font-bold text-sm text-gov-text mb-2">Priority AI & Equity</h4>
              <p className="text-xs text-gov-muted leading-relaxed">
                NITI Aayog MPI fusion, Sybil bot defense, Demographic-Inverse Equity Weighting (DIEW), CAPEX optimization.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-gov-border text-[11px] text-gov-navy font-medium">
              Objective Resource Allocation
            </div>
          </div>

          {/* Layer 5 */}
          <div className="bg-gov-inset p-4 rounded-sm border border-gov-border flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-gov-error uppercase tracking-wider mb-1">Layer 5</div>
              <h4 className="font-bold text-sm text-gov-text mb-2">Closed Loop</h4>
              <p className="text-xs text-gov-muted leading-relaxed">
                Smart Work Orders (Beckn), Geo-tagged before/after photos, native IVR citizen confirmation call, audit ledger.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-gov-border text-[11px] text-gov-error font-medium">
              Citizen Trust Restoration
            </div>
          </div>
        </div>
      </div>

      {/* Global BRICS Scalability Matrix Preview */}
      <div className="bg-gov-card p-6 sm:p-8 rounded-sm border border-gov-border text-gov-text space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gov-text">BRICS Cross-Nation Adaptability Blueprint</h3>
          </div>
          <span className="text-xs text-gov-muted">Track 1 Core Deliverable</span>
        </div>

        <p className="text-sm text-gov-muted leading-relaxed">
          While formulated and battle-tested in India, the core software principles of <strong>Samvaad-Setu</strong> conform to 
          the <strong>Digital Public Goods Alliance (DPGA)</strong> standard. The architectural patterns translate seamlessly 
          to address municipal backlogs in South Africa, Amazonian isolation in Brazil, desert corridors in Egypt, and vast pastoral zones in Ethiopia.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          <div className="p-3 rounded-sm bg-gov-inset border border-gov-border text-center">
            <div className="text-xl font-semibold text-gov-navy">India</div>
            <div className="text-[11px] text-gov-teal font-medium mt-1">22 Bhashini Langs</div>
          </div>
          <div className="p-3 rounded-sm bg-gov-inset border border-gov-border text-center">
            <div className="text-xl font-semibold text-gov-navy">Brazil</div>
            <div className="text-[11px] text-gov-success font-medium mt-1">Amazon & Favelas</div>
          </div>
          <div className="p-3 rounded-sm bg-gov-inset border border-gov-border text-center">
            <div className="text-xl font-semibold text-gov-navy">South Africa</div>
            <div className="text-[11px] text-gov-teal font-medium mt-1">Township Backlogs</div>
          </div>
          <div className="p-3 rounded-sm bg-gov-inset border border-gov-border text-center">
            <div className="text-xl font-semibold text-gov-navy">Russia</div>
            <div className="text-[11px] text-gov-navy font-medium mt-1">Siberian Corridors</div>
          </div>
          <div className="p-3 rounded-sm bg-gov-inset border border-gov-border text-center">
            <div className="text-xl font-semibold text-gov-navy">China</div>
            <div className="text-[11px] text-gov-error font-medium mt-1">Western Revitalization</div>
          </div>
          <div className="p-3 rounded-sm bg-gov-inset border border-gov-border text-center">
            <div className="text-xl font-semibold text-gov-navy">Egypt and Ethiopia</div>
            <div className="text-[11px] text-gov-navy font-medium mt-1">Nile Basin Water</div>
          </div>
        </div>
      </div>
    </div>
  );
};
