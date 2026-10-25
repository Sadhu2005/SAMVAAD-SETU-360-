import React, { useState } from 'react';
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  PieChart,
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
      <div className="bg-gov-card text-gov-text p-6 sm:p-8 rounded-sm border border-gov-border  space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gov-teal-soft text-gov-teal border border-gov-teal">
          4-Way Big Data Fusion & Fiscal Realignment Engine
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Solving the Multi-Billion Dollar Misalignment in Public Spending
        </h2>
        <p className="text-sm text-gov-muted max-w-4xl leading-relaxed">
          Governments struggle because citizen requests live in fragmented, disconnected silos—leading to misaligned public spending, 
          unaddressed infrastructure gaps, and zero measurement of DPI impact. <strong>Samvaad-Setu 360°</strong> fuses 
          <strong> 4 massive national datasets</strong> into a single authoritative capital allocation pipeline.
        </p>

        {/* Sub-Tabs */}
        <div className="pt-3 flex items-center gap-2 border-t border-gov-border">
          <button
            onClick={() => setActiveDatasetTab('misalignment')}
            className={`px-3 py-2 rounded-sm text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeDatasetTab === 'misalignment'
                ? 'bg-gov-teal text-white font-bold shadow-md'
                : 'bg-gov-inset text-gov-muted hover:bg-gov-navy-soft'
            }`}
          >
            Misalignment & Fiscal Drift Calculator
          </button>

          <button
            onClick={() => setActiveDatasetTab('fragmentation')}
            className={`px-3 py-2 rounded-sm text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeDatasetTab === 'fragmentation'
                ? 'bg-gov-navy text-white font-bold shadow-md'
                : 'bg-gov-inset text-gov-muted hover:bg-gov-navy-soft'
            }`}
          >
            Fragmented System Consolidator (5 Sources)
          </button>

          <button
            onClick={() => setActiveDatasetTab('fusionMatrix')}
            className={`px-3 py-2 rounded-sm text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeDatasetTab === 'fusionMatrix'
                ? 'bg-gov-success text-white font-bold shadow-md'
                : 'bg-gov-inset text-gov-muted hover:bg-gov-navy-soft'
            }`}
          >
            4-Way Big Data Fusion Architecture
          </button>
        </div>
      </div>

      {/* View 1: Misalignment & Fiscal Drift Calculator */}
      {activeDatasetTab === 'misalignment' && (
        <div className="space-y-6">
          {/* Top High-Yield Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gov-card p-5 rounded-sm border border-rose-900/40 space-y-1">
              <div className="text-xs font-bold text-gov-error uppercase tracking-wider">
                Status Quo Misallocation
              </div>
              <div className="text-2xl sm:text-3xl font-black text-gov-text">₹61,500 Cr</div>
              <p className="text-xs text-gov-muted">
                Annual public capex directed to low-utility projects due to vocal lobbying and top-down inertia.
              </p>
            </div>

            <div className="bg-gov-card p-5 rounded-sm border border-emerald-900/40 space-y-1">
              <div className="text-xs font-bold text-gov-success uppercase tracking-wider">
                Grounded Realignment
              </div>
              <div className="text-2xl sm:text-3xl font-black text-gov-success">82.6%</div>
              <p className="text-xs text-gov-muted">
                Precision match when capex is redirected to verified high-distress citizen hotspots.
              </p>
            </div>

            <div className="bg-gov-card p-5 rounded-sm border border-cyan-900/40 space-y-1">
              <div className="text-xs font-bold text-gov-teal uppercase tracking-wider">
                Public Funds Saved
              </div>
              <div className="text-2xl sm:text-3xl font-black text-gov-teal">₹4,200 Cr+</div>
              <p className="text-xs text-gov-muted">
                Preserved across Aspirational Districts from contractor cartels and duplicate procurement.
              </p>
            </div>
          </div>

          {/* Sector Misalignment Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sector Selector */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-bold text-gov-muted uppercase tracking-wider">
                Sectors Analyzed for Fiscal Drift
              </div>

              <div className="space-y-2.5">
                {MISALIGNMENT_DATA.map((item, idx) => {
                  const isSelected = selectedMisalignment.sector === item.sector;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedMisalignment(item)}
                      className={`p-4 rounded-sm border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gov-card border-gov-teal  ring-1 ring-gov-teal'
                          : 'bg-gov-card border-gov-border hover:border-gov-border'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-gov-text text-sm">{item.sector}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-rose-950/60 text-gov-error border border-rose-900/50">
                          {item.misalignmentVariance}
                        </span>
                      </div>
                      <p className="text-xs text-gov-muted mt-1 line-clamp-1">
                        {item.riskOfMisallocation}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Sector Deep Comparison */}
            <div className="lg:col-span-7">
              <div className="bg-gov-card p-6 rounded-sm border border-gov-border  space-y-5">
                <div className="flex items-center justify-between border-b border-gov-border pb-3">
                  <h3 className="text-lg font-bold text-gov-text">
                    {selectedMisalignment.sector}
                  </h3>
                  <span className="text-xs font-bold text-gov-error px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30">
                    {selectedMisalignment.misalignmentVariance}
                  </span>
                </div>

                {/* Top-Down vs Citizen Ground Reality Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-rose-950/20 p-4 rounded-sm border border-rose-900/40 space-y-2">
                    <div className="text-xs font-bold text-gov-error uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Status Quo Top-Down Allocation
                    </div>
                    <p className="text-xs text-gov-error/90 leading-relaxed">
                      {selectedMisalignment.traditionalTopDownAllocation}
                    </p>
                  </div>

                  <div className="bg-emerald-950/20 p-4 rounded-sm border border-emerald-900/40 space-y-2">
                    <div className="text-xs font-bold text-gov-success uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Grounded Citizen Need (Bhashini + GatiShakti)
                    </div>
                    <p className="text-xs text-gov-success/90 leading-relaxed">
                      {selectedMisalignment.groundedCitizenDemandNeed}
                    </p>
                  </div>
                </div>

                {/* Human Consequences */}
                <div className="bg-gov-inset p-4 rounded-sm border border-gov-border space-y-1">
                  <div className="text-xs font-bold text-gov-muted">
                    Ground Reality Risk of Misallocation
                  </div>
                  <p className="text-xs text-gov-muted leading-relaxed">
                    {selectedMisalignment.riskOfMisallocation}
                  </p>
                </div>

                {/* The 360° Realignment Solution */}
                <div className="bg-gov-inset p-4 rounded-sm border border-gov-border space-y-2">
                  <div className="text-xs font-bold text-gov-teal uppercase tracking-wider flex items-center gap-1.5">
                    Samvaad-Setu 360° AI Realignment Action
                  </div>
                  <p className="text-xs text-gov-navy/90 leading-relaxed">
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
            <div className="text-xs font-bold text-gov-muted uppercase tracking-wider">
              Fragmented Ingestion Channels
            </div>

            <div className="space-y-2.5">
              {FRAGMENTED_SYSTEMS.map((sys) => {
                const isSelected = selectedSystem.id === sys.id;
                return (
                  <div
                    key={sys.id}
                    onClick={() => setSelectedSystem(sys)}
                    className={`p-4 rounded-sm border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gov-card border-gov-navy  ring-1 ring-gov-navy'
                        : 'bg-gov-card border-gov-border hover:border-gov-border'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gov-text text-sm">{sys.systemName}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-gov-navy-soft text-gov-navy border border-gov-navy">
                        {sys.unificationStatus}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-gov-muted mt-2">
                      <span>{sys.governingBody}</span>
                      <strong className="text-gov-teal">{sys.monthlyVolume}</strong>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Unified Architecture Details */}
          <div className="lg:col-span-7">
            <div className="bg-gov-card p-6 rounded-sm border border-gov-border  space-y-5">
              <div className="flex items-center justify-between border-b border-gov-border pb-3">
                <div>
                  <h3 className="text-lg font-bold text-gov-text">
                    {selectedSystem.systemName}
                  </h3>
                  <p className="text-xs text-gov-muted mt-0.5">{selectedSystem.governingBody}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-gov-success">{selectedSystem.monthlyVolume}</div>
                  <div className="text-[10px] text-gov-muted font-mono">Unification: {selectedSystem.unificationStatus}</div>
                </div>
              </div>

              <div className="bg-gov-inset p-4 rounded-sm border border-gov-border space-y-2">
                <div className="text-xs font-bold text-gov-muted">Linguistic Reach & Modality</div>
                <p className="text-xs text-gov-muted">{selectedSystem.linguisticSupport}</p>
              </div>

              <div className="bg-rose-950/20 p-4 rounded-sm border border-rose-900/40 space-y-1">
                <div className="text-xs font-bold text-gov-error">The Data Silo Crisis in Traditional Architecture</div>
                <p className="text-xs text-gov-error/90 leading-relaxed">
                  {selectedSystem.dataSiloProblem}
                </p>
              </div>

              <div className="bg-gov-navy-soft p-4 rounded-sm border border-gov-navy space-y-2">
                <div className="text-xs font-bold text-gov-navy uppercase tracking-wider">
                  Samvaad-Setu Unified DPI Ingestion Adapter
                </div>
                <p className="text-xs text-gov-text leading-relaxed font-mono">
                  {selectedSystem.samvaadSetuDpiIntegration}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 3: 4-Way Big Data Fusion Architecture */}
      {activeDatasetTab === 'fusionMatrix' && (
        <div className="bg-gov-card p-6 sm:p-8 rounded-sm border border-gov-border  space-y-6">
          <div className="border-b border-gov-border pb-4">
            <h3 className="text-xl font-bold text-gov-text">
              The 4-Way Big Data Fusion Pipeline
            </h3>
            <p className="text-xs text-gov-muted mt-1">
              How four disparate national datasets are synthesized into high-priority development recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            {/* Dataset 1 */}
            <div className="bg-gov-inset p-4 rounded-sm border border-gov-border space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-gov-teal uppercase tracking-wider">Dataset 1</span>
                <h4 className="font-bold text-gov-text text-sm mt-1">Citizen Feedback Stream</h4>
                <p className="text-gov-muted mt-2 leading-relaxed">
                  Aggregated voice, text, WhatsApp, and IVR requests in 22+ languages; de-duplicated semantic demand clusters.
                </p>
              </div>
              <div className="pt-2 border-t border-gov-border text-[11px] text-gov-teal font-mono">
                Source: Bhashini IndicConformer
              </div>
            </div>

            {/* Dataset 2 */}
            <div className="bg-gov-inset p-4 rounded-sm border border-gov-border space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-gov-success uppercase tracking-wider">Dataset 2</span>
                <h4 className="font-bold text-gov-text text-sm mt-1">National Demographics</h4>
                <p className="text-gov-muted mt-2 leading-relaxed">
                  Census 2011/2026 population projections, gender distribution, tribal habitations, literacy, and female labor participation.
                </p>
              </div>
              <div className="pt-2 border-t border-gov-border text-[11px] text-gov-success font-mono">
                Source: Registrar General & Census
              </div>
            </div>

            {/* Dataset 3 */}
            <div className="bg-gov-inset p-4 rounded-sm border border-gov-border space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-gov-teal uppercase tracking-wider">Dataset 3</span>
                <h4 className="font-bold text-gov-text text-sm mt-1">Infrastructure Indices</h4>
                <p className="text-gov-muted mt-2 leading-relaxed">
                  NITI Aayog MPI, Jal Jeevan Mission tap gap, PMGSY unpaved road density, and health sub-centre deficit per 10k population.
                </p>
              </div>
              <div className="pt-2 border-t border-gov-border text-[11px] text-gov-teal font-mono">
                Source: NITI Aayog ADP & Line Ministries
              </div>
            </div>

            {/* Dataset 4 */}
            <div className="bg-gov-inset p-4 rounded-sm border border-gov-border space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-gov-navy uppercase tracking-wider">Dataset 4</span>
                <h4 className="font-bold text-gov-text text-sm mt-1">Public Investment Plans</h4>
                <p className="text-gov-muted mt-2 leading-relaxed">
                  PM GatiShakti 1,400+ layers, Union Budget capex pipelines, State PWD masterplans, and BRICS New Development Bank loans.
                </p>
              </div>
              <div className="pt-2 border-t border-gov-border text-[11px] text-gov-navy font-mono">
                Source: PM GatiShakti & NDB
              </div>
            </div>
          </div>

          {/* Synthesis Box */}
          <div className="p-4 rounded-sm bg-gov-card border border-gov-border text-xs text-gov-text flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-bold text-gov-text">Algorithmic Correlation Output: </span>
              Produces the <strong>Dynamic Infrastructure Priority Score (DIPS)</strong>, turning raw public distress into bankable, shovel-ready projects.
            </div>
            <div className="text-gov-success font-mono font-bold flex-shrink-0">
              98.4% Correlation Reliability
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
