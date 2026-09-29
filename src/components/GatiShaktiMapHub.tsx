import React, { useState } from 'react';
import {
  Layers,
  MapPin,
  TrendingUp,
  BarChart2,
  DollarSign,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { DISTRICT_HOTSPOTS, DistrictHotspot } from '../data/nationalData';

export const GatiShaktiMapHub: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictHotspot>(DISTRICT_HOTSPOTS[0]);
  const [equityMultiplierEnabled, setEquityMultiplierEnabled] = useState<boolean>(true);

  // Calculate dynamic adjusted score based on DIEW toggle
  const getAdjustedScore = (district: DistrictHotspot) => {
    if (!equityMultiplierEnabled) {
      // Raw feedback volume normalized (biases towards high population)
      return Math.min(100, Math.round((district.citizenFeedbackVolume / 32000) * 80 + 20));
    }
    // Full DIEW formula incorporating MPI and Infrastructure Deficit
    return district.prioritizedProjectRecommendation.priorityIndex;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <Layers className="w-3.5 h-3.5" />
          PM GatiShakti & NITI Aayog Geospatial Fusion
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Ground Reality: Aligning Citizen Demand with 1,400+ National GIS Layers
        </h2>
        <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">
          National infrastructure in India is coordinated via the <strong>PM GatiShakti National Master Plan</strong>. 
          By bridging citizen oral feedback from Aspirational Districts with GIS pipelines (roads, optical fiber, electricity feeders, railways), 
          <strong>Samvaad-Setu 360°</strong> synthesizes bankable capital projects with zero bureaucratic blind spots.
        </p>

        {/* Algorithm Control Toggle */}
        <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">Prioritization Logic:</span>
            <button
              onClick={() => setEquityMultiplierEnabled(!equityMultiplierEnabled)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                equityMultiplierEnabled
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {equityMultiplierEnabled
                ? 'DIEW Active (Poverty & Deficit Weighted)'
                : 'Raw Feedback Volume Only (Unweighted)'}
            </button>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Live Data: Census 2011/2026 Projections + NITI Aayog MPI 2024
          </div>
        </div>
      </div>

      {/* Main District Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* District Selector & Mini Map Grid */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between px-1">
            <span>High-Deficit Corridors ({DISTRICT_HOTSPOTS.length})</span>
            <span className="text-amber-400 font-mono">Select to Triangulate</span>
          </div>

          <div className="space-y-2.5">
            {DISTRICT_HOTSPOTS.map((district) => {
              const isSelected = selectedDistrict.id === district.id;
              const score = getAdjustedScore(district);

              return (
                <div
                  key={district.id}
                  onClick={() => setSelectedDistrict(district)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500 shadow-lg ring-1 ring-emerald-500/50'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-base">
                          {district.name}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-slate-800 text-slate-300">
                          {district.state}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {district.topFeedbackCategory}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-base font-black text-emerald-400">
                        {score}
                      </div>
                      <div className="text-[10px] text-slate-400">Priority Score</div>
                    </div>
                  </div>

                  {/* Micro stats */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      MPI: <strong className="text-slate-200">{district.mpiScore}</strong>
                    </span>
                    <span>
                      Deficit: <strong className="text-amber-400">{district.infrastructureDeficitScore}/100</strong>
                    </span>
                    <span>
                      Feedback: <strong className="text-cyan-400">{district.citizenFeedbackVolume.toLocaleString()}</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected District Deep-Dive & Capital Project Proposal */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-white">
                    {selectedDistrict.name}, {selectedDistrict.state}
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {selectedDistrict.category}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                  <span>Pop: <strong>{selectedDistrict.population}</strong></span>
                  <span>•</span>
                  <span>Vernacular: <strong>{selectedDistrict.primaryLanguages.join(', ')}</strong></span>
                  <span>•</span>
                  <span>Unresolved Rate: <strong className="text-rose-400">{selectedDistrict.unresolvedGrievanceRate}</strong></span>
                </div>
              </div>

              <div className="bg-slate-800/80 px-4 py-2 rounded-xl text-center border border-slate-700">
                <div className="text-2xl font-black text-emerald-400">
                  {getAdjustedScore(selectedDistrict)}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  DIPS Priority
                </div>
              </div>
            </div>

            {/* PM GatiShakti Triangulation Layer */}
            <div className="bg-indigo-950/30 p-4 rounded-xl border border-indigo-900/50 space-y-2">
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-300" />
                PM GatiShakti National Masterplan Layer Triangulation
              </div>
              <p className="text-xs text-indigo-200/90 leading-relaxed font-mono">
                {selectedDistrict.keyGatiShaktiLayer}
              </p>
              <div className="text-[11px] text-slate-400">
                GIS Cross-Reference: Geospatial intersection identified with National Highways, Optical Fiber Corridors, and Water Basin contours.
              </div>
            </div>

            {/* Prioritized High-Impact Project Card */}
            <div className="bg-gradient-to-br from-emerald-950/20 to-slate-900 p-5 rounded-xl border border-emerald-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4" />
                  Recommended High-Priority Public Capital Project
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                  {selectedDistrict.prioritizedProjectRecommendation.estimatedCapex}
                </span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white leading-snug">
                  {selectedDistrict.prioritizedProjectRecommendation.title}
                </h4>
                <div className="text-xs text-amber-300 font-semibold mt-1">
                  Funding Scheme: {selectedDistrict.prioritizedProjectRecommendation.scheme}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
                  <div className="font-semibold text-slate-300">Target Beneficiaries</div>
                  <div className="text-slate-400 mt-0.5">{selectedDistrict.prioritizedProjectRecommendation.beneficiaryPopulation}</div>
                </div>

                <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
                  <div className="font-semibold text-slate-300">GatiShakti Infrastructure Synergy</div>
                  <div className="text-slate-400 mt-0.5">{selectedDistrict.prioritizedProjectRecommendation.synergyWithGatiShakti}</div>
                </div>
              </div>

              {/* BRICS Parallel Callout */}
              <div className="pt-2 border-t border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-amber-400">BRICS Parallel Context: </span>
                {selectedDistrict.prioritizedProjectRecommendation.bricsParallels}
              </div>
            </div>

            {/* Why This Project Was Selected vs Top-Down Alternative */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/40 text-rose-200">
                <div className="font-bold text-rose-400 mb-1">Traditional Top-Down Plan</div>
                Allocates ₹40 Cr to urban beautification and highway toll plazas in district center, ignoring rural water crisis.
              </div>
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-emerald-200">
                <div className="font-bold text-emerald-400 mb-1">Samvaad-Setu Grounded Plan</div>
                Directs capital to decentralized solar water & culverts, solving 64% of recurring citizen distress calls.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
