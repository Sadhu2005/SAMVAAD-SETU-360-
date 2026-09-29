import React, { useState } from 'react';
import {
  Layers,
  Database,
  GitMerge,
  ArrowRight,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  PieChart,
  Sparkles,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import {
  FRAGMENTED_SYSTEMS,
  MISALIGNMENT_DATA,
  FragmentedSystemSource,
  MisalignmentMetric
} from '../data/fusionData';

export const DatasetFusionEngine: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<FragmentedSystemSource>(FRAGMENTED_SYSTEMS[0]);
  const [selectedMisalignment, setSelectedMisalignment] = useState<MisalignmentMetric>(MISALIGNMENT_DATA[0]);
  const [activeDatasetTab, setActiveDatasetTab] = useState<'fragmentation' | 'misalignment' | 'fusionMatrix'>('misalignment');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
          <Database className="w-3.5 h-3.5" />
          4-Way Big Data Fusion & Fiscal Realignment Engine
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Solving the Multi-Billion Dollar Misalignment in Public Spending
        </h2>
        <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">
          Governments struggle because citizen requests live in fragmented, disconnected silos—leading to misaligned public spending, 
          unaddressed infrastructure gaps, and zero measurement of DPI impact. <strong>Samvaad-Setu 360°</strong> fuses 
          <strong> 4 massive national datasets</strong> into a single authoritative capital allocation pipeline.
        </p>

        {/* Sub-Tabs */}
        <div className="pt-3 flex items-center gap-2 border-t border-slate-800/80">
          <button
            onClick={() => setActiveDatasetTab('misalignment')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeDatasetTab === 'misalignment'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <TrendingDown className="w-3.5 h-3.5" />
            Misalignment & Fiscal Drift Calculator
          </button>

          <button
            onClick={() => setActiveDatasetTab('fragmentation')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeDatasetTab === 'fragmentation'
                ? 'bg-indigo-600 text-white font-bold shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <GitMerge className="w-3.5 h-3.5" />
            Fragmented System Consolidator (5 Sources)
          </button>

          <button
            onClick={() => setActiveDatasetTab('fusionMatrix')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeDatasetTab === 'fusionMatrix'
                ? 'bg-emerald-600 text-white font-bold shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            4-Way Big Data Fusion Architecture
          </button>
        </div>
      </div>

      {/* View 1: Misalignment & Fiscal Drift Calculator */}
      {activeDatasetTab === 'misalignment' && (
        <div className="space-y-6">
          {/* Top High-Yield Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900 p-5 rounded-2xl border border-rose-900/40 space-y-1">
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Status Quo Misallocation
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">₹61,500 Cr</div>
              <p className="text-xs text-slate-400">
                Annual public capex directed to low-utility projects due to vocal lobbying and top-down inertia.
              </p>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-emerald-900/40 space-y-1">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Grounded Realignment
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">82.6%</div>
              <p className="text-xs text-slate-400">
                Precision match when capex is redirected to verified high-distress citizen hotspots.
              </p>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-cyan-900/40 space-y-1">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Public Funds Saved
              </div>
              <div className="text-2xl sm:text-3xl font-black text-cyan-400">₹4,200 Cr+</div>
              <p className="text-xs text-slate-400">
                Preserved across Aspirational Districts from contractor cartels and duplicate procurement.
              </p>
            </div>
          </div>

          {/* Sector Misalignment Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sector Selector */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Sectors Analyzed for Fiscal Drift
              </div>

              <div className="space-y-2.5">
                {MISALIGNMENT_DATA.map((item, idx) => {
                  const isSelected = selectedMisalignment.sector === item.sector;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedMisalignment(item)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 border-amber-500 shadow-lg ring-1 ring-amber-500/50'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white text-sm">{item.sector}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-rose-950/60 text-rose-300 border border-rose-900/50">
                          {item.misalignmentVariance}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                        {item.riskOfMisallocation}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Sector Deep Comparison */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white">
                    {selectedMisalignment.sector}
                  </h3>
                  <span className="text-xs font-bold text-rose-400 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30">
                    {selectedMisalignment.misalignmentVariance}
                  </span>
                </div>

                {/* Top-Down vs Citizen Ground Reality Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-rose-950/20 p-4 rounded-xl border border-rose-900/40 space-y-2">
                    <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Status Quo Top-Down Allocation
                    </div>
                    <p className="text-xs text-rose-200/90 leading-relaxed">
                      {selectedMisalignment.traditionalTopDownAllocation}
                    </p>
                  </div>

                  <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-900/40 space-y-2">
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Grounded Citizen Need (Bhashini + GatiShakti)
                    </div>
                    <p className="text-xs text-emerald-200/90 leading-relaxed">
                      {selectedMisalignment.groundedCitizenDemandNeed}
                    </p>
                  </div>
                </div>

                {/* Human Consequences */}
                <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/60 space-y-1">
                  <div className="text-xs font-bold text-slate-300">
                    Ground Reality Risk of Misallocation
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {selectedMisalignment.riskOfMisallocation}
                  </p>
                </div>

                {/* The 360° Realignment Solution */}
                <div className="bg-gradient-to-r from-amber-950/30 to-slate-900 p-4 rounded-xl border border-amber-500/40 space-y-2">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    Samvaad-Setu 360° AI Realignment Action
                  </div>
                  <p className="text-xs text-amber-100/90 leading-relaxed">
                    {selectedMisalignment.samvaadSetuRealignmentSolution}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 2: Fragmented System Consolidator */}
      {activeDatasetTab === 'fragmentation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Source List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Fragmented Ingestion Channels
            </div>

            <div className="space-y-2.5">
              {FRAGMENTED_SYSTEMS.map((sys) => {
                const isSelected = selectedSystem.id === sys.id;
                return (
                  <div
                    key={sys.id}
                    onClick={() => setSelectedSystem(sys)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-indigo-500 shadow-lg ring-1 ring-indigo-500/50'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm">{sys.systemName}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {sys.unificationStatus}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                      <span>{sys.governingBody}</span>
                      <strong className="text-amber-400">{sys.monthlyVolume}</strong>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Unified Architecture Details */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedSystem.systemName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedSystem.governingBody}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-400">{selectedSystem.monthlyVolume}</div>
                  <div className="text-[10px] text-slate-500 font-mono">Unification: {selectedSystem.unificationStatus}</div>
                </div>
              </div>

              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/60 space-y-2">
                <div className="text-xs font-bold text-slate-300">Linguistic Reach & Modality</div>
                <p className="text-xs text-slate-400">{selectedSystem.linguisticSupport}</p>
              </div>

              <div className="bg-rose-950/20 p-4 rounded-xl border border-rose-900/40 space-y-1">
                <div className="text-xs font-bold text-rose-400">The Data Silo Crisis in Traditional Architecture</div>
                <p className="text-xs text-rose-200/90 leading-relaxed">
                  {selectedSystem.dataSiloProblem}
                </p>
              </div>

              <div className="bg-indigo-950/30 p-4 rounded-xl border border-indigo-500/40 space-y-2">
                <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <GitMerge className="w-4 h-4 text-cyan-400" />
                  Samvaad-Setu Unified DPI Ingestion Adapter
                </div>
                <p className="text-xs text-indigo-100/90 leading-relaxed font-mono">
                  {selectedSystem.samvaadSetuDpiIntegration}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 3: 4-Way Big Data Fusion Architecture */}
      {activeDatasetTab === 'fusionMatrix' && (
        <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              The 4-Way Big Data Fusion Pipeline
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              How four disparate national datasets are synthesized into high-priority development recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            {/* Dataset 1 */}
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Dataset 1</span>
                <h4 className="font-bold text-white text-sm mt-1">Citizen Feedback Stream</h4>
                <p className="text-slate-300 mt-2 leading-relaxed">
                  Aggregated voice, text, WhatsApp, and IVR requests in 22+ languages; de-duplicated semantic demand clusters.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-700/50 text-[11px] text-amber-300 font-mono">
                Source: Bhashini IndicConformer
              </div>
            </div>

            {/* Dataset 2 */}
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Dataset 2</span>
                <h4 className="font-bold text-white text-sm mt-1">National Demographics</h4>
                <p className="text-slate-300 mt-2 leading-relaxed">
                  Census 2011/2026 population projections, gender distribution, tribal habitations, literacy, and female labor participation.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-700/50 text-[11px] text-emerald-300 font-mono">
                Source: Registrar General & Census
              </div>
            </div>

            {/* Dataset 3 */}
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Dataset 3</span>
                <h4 className="font-bold text-white text-sm mt-1">Infrastructure Indices</h4>
                <p className="text-slate-300 mt-2 leading-relaxed">
                  NITI Aayog MPI, Jal Jeevan Mission tap gap, PMGSY unpaved road density, and health sub-centre deficit per 10k population.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-700/50 text-[11px] text-cyan-300 font-mono">
                Source: NITI Aayog ADP & Line Ministries
              </div>
            </div>

            {/* Dataset 4 */}
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Dataset 4</span>
                <h4 className="font-bold text-white text-sm mt-1">Public Investment Plans</h4>
                <p className="text-slate-300 mt-2 leading-relaxed">
                  PM GatiShakti 1,400+ layers, Union Budget capex pipelines, State PWD masterplans, and BRICS New Development Bank loans.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-700/50 text-[11px] text-indigo-300 font-mono">
                Source: PM GatiShakti & NDB
              </div>
            </div>
          </div>

          {/* Synthesis Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950 via-slate-900 to-emerald-950 border border-indigo-500/40 text-xs text-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-bold text-white">Algorithmic Correlation Output: </span>
              Produces the <strong>Dynamic Infrastructure Priority Score (DIPS)</strong>, turning raw public distress into bankable, shovel-ready projects.
            </div>
            <div className="text-emerald-400 font-mono font-bold flex-shrink-0">
              98.4% Correlation Reliability
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
