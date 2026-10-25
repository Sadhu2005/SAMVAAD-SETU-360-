import React from 'react';
import {
  FileText,
  Volume2,
  MapPin,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
  Sparkles,
  Lock,
  Globe2,
  Users
} from 'lucide-react';

interface OverviewProps {
  onNavigateToTab: (tab: string) => void;
  onExportDocx: () => void;
}

export const Overview: React.FC<OverviewProps> = ({ onNavigateToTab, onExportDocx }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Executive Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-900/50 shadow-2xl p-6 sm:p-10 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Official Response Blueprint — BRICS Innovation Track 1
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Bridging the Voice of 1.4 Billion Citizens with National Infrastructure Planning
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Governments globally struggle to consolidate citizen feedback and align it with national infrastructure priorities. 
            Development requests live in fragmented, disconnected silos, leading to misaligned public spending, unaddressed infrastructure gaps, 
            and zero visibility into the real impact of multi-billion dollar Digital Public Infrastructure (DPI) initiatives.
          </p>

          <p className="text-amber-200/90 text-sm sm:text-base font-medium">
            <span className="font-bold text-amber-400">SAMVAAD-SETU 360°</span> is an AI-powered Digital Public Good that unifies 
            multilingual oral/text feedback (via <strong>Bhashini</strong>) with geospatial masterplans (<strong>PM GatiShakti</strong> 1,400+ layers) 
            and demographic indices (<strong>NITI Aayog</strong>), checking all 10 lethal edge cases to surface demand hotspots for BRICS policymakers.
          </p>

          {/* Quick CTA Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateToTab('prototype')}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-sm bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-slate-950 shadow-lg hover:shadow-amber-500/25 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              Launch Live Resolution Prototype (Solve Now)
            </button>

            <button
              onClick={onExportDocx}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              Download Official 360° DOCX Blueprint
            </button>

            <button
              onClick={() => onNavigateToTab('edge-cases')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Explore All 10 Edge Cases
            </button>

            <button
              onClick={() => onNavigateToTab('fusion')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-200 border border-cyan-700/60 transition-all cursor-pointer"
            >
              <span>Big Data Fusion (4 Datasets)</span>
            </button>

            <button
              onClick={() => onNavigateToTab('impact')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 transition-all cursor-pointer"
            >
              <span>DPI Impact Measurement</span>
            </button>

            <button
              onClick={() => onNavigateToTab('policymakers')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-indigo-900/60 hover:bg-indigo-800/80 text-indigo-200 border border-indigo-700/60 transition-all cursor-pointer"
            >
              <span>BRICS Policymaker Dossiers</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">22+</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Scheduled Indian Languages & Dialects (Bhashini)</div>
          </div>

          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">1,400+</div>
            <div className="text-xs text-slate-400 font-medium mt-1">PM GatiShakti Multi-Modal GIS Spatial Layers</div>
          </div>

          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">10 / 10</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Edge Cases Checked (Astroturfing to Oral Dialects)</div>
          </div>

          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
            <div className="text-2xl sm:text-3xl font-black text-indigo-400">BRICS+</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Transferable (Brazil, South Africa, Russia, China, Egypt)</div>
          </div>
        </div>
      </div>

      {/* The 3-Way Problem vs 360° Solution Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* The Problem */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-rose-200 dark:border-rose-950/60 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-base">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>The Status Quo: Fragmented Governance & Public Waste</span>
          </div>

          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
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
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-950/60 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-base">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>The 360° DPI Solution: Samvaad-Setu Architecture</span>
          </div>

          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
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
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              The 5-Layer Digital Public Good Architecture
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Designed as an open, interoperable Digital Public Good under DPGA principles
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-full font-mono">
            Stack: Bhashini + GatiShakti + Beckn + DPDP 2023
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Layer 1 */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Layer 1</div>
              <h4 className="font-bold text-sm text-white mb-2">Omni Ingestion</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Toll-free IVR (1912), WhatsApp Audio, 2G SMS micro-payloads, CSC VLEs for offline zero-connectivity zones.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-700/50 text-[11px] text-amber-300 font-medium">
              Zero Exclusion Barrier
            </div>
          </div>

          {/* Layer 2 */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Layer 2</div>
              <h4 className="font-bold text-sm text-white mb-2">Indic AI Engine</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Bhashini IndicConformer ASR, dialect de-noising, LLM Named Entity Recognition (asset, defect, urgency).
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-700/50 text-[11px] text-emerald-300 font-medium">
              22+ Languages & Dialects
            </div>
          </div>

          {/* Layer 3 */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">Layer 3</div>
              <h4 className="font-bold text-sm text-white mb-2">GatiShakti GIS</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Toponym resolver, telecom cell-ID bounding, Survey of India cadastral match, 1,400+ infrastructure layers.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-700/50 text-[11px] text-cyan-300 font-medium">
              Exact Asset Ownership
            </div>
          </div>

          {/* Layer 4 */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">Layer 4</div>
              <h4 className="font-bold text-sm text-white mb-2">Priority AI & Equity</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                NITI Aayog MPI fusion, Sybil bot defense, Demographic-Inverse Equity Weighting (DIEW), CAPEX optimization.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-700/50 text-[11px] text-indigo-300 font-medium">
              Objective Resource Allocation
            </div>
          </div>

          {/* Layer 5 */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">Layer 5</div>
              <h4 className="font-bold text-sm text-white mb-2">Closed Loop</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Smart Work Orders (Beckn), Geo-tagged before/after photos, native IVR citizen confirmation call, audit ledger.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-700/50 text-[11px] text-rose-300 font-medium">
              Citizen Trust Restoration
            </div>
          </div>
        </div>
      </div>

      {/* Global BRICS Scalability Matrix Preview */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 sm:p-8 rounded-2xl border border-slate-800 text-white space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">BRICS Cross-Nation Adaptability Blueprint</h3>
          </div>
          <span className="text-xs text-slate-400">Track 1 Core Deliverable</span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          While formulated and battle-tested in India, the core software principles of <strong>Samvaad-Setu</strong> conform to 
          the <strong>Digital Public Goods Alliance (DPGA)</strong> standard. The architectural patterns translate seamlessly 
          to address municipal backlogs in South Africa, Amazonian isolation in Brazil, desert corridors in Egypt, and vast pastoral zones in Ethiopia.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-center">
            <div className="text-xl">🇮🇳 India</div>
            <div className="text-[11px] text-amber-300 font-medium mt-1">22 Bhashini Langs</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-center">
            <div className="text-xl">🇧🇷 Brazil</div>
            <div className="text-[11px] text-emerald-300 font-medium mt-1">Amazon & Favelas</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-center">
            <div className="text-xl">🇿🇦 South Africa</div>
            <div className="text-[11px] text-cyan-300 font-medium mt-1">Township Backlogs</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-center">
            <div className="text-xl">🇷🇺 Russia</div>
            <div className="text-[11px] text-indigo-300 font-medium mt-1">Siberian Corridors</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-center">
            <div className="text-xl">🇨🇳 China</div>
            <div className="text-[11px] text-rose-300 font-medium mt-1">Western Revitalization</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-center">
            <div className="text-xl">🇪🇬 Egypt & 🇪🇹 Ethiopia</div>
            <div className="text-[11px] text-amber-200 font-medium mt-1">Nile Basin Water</div>
          </div>
        </div>
      </div>
    </div>
  );
};
