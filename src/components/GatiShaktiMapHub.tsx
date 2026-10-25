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
      <div className="bg-gov-card text-gov-text p-6 sm:p-8 rounded-sm border border-gov-border  space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-gov-success border border-emerald-500/30">
          <Layers className="w-3.5 h-3.5" />
          PM GatiShakti & NITI Aayog Geospatial Fusion
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Ground Reality: Aligning Citizen Demand with 1,400+ National GIS Layers
        </h2>
        <p className="text-sm text-gov-muted max-w-4xl leading-relaxed">
          National infrastructure in India is coordinated via the <strong>PM GatiShakti National Master Plan</strong>. 
          By bridging citizen oral feedback from Aspirational Districts with GIS pipelines (roads, optical fiber, electricity feeders, railways), 
          <strong>Samvaad-Setu 360°</strong> synthesizes bankable capital projects with zero bureaucratic blind spots.
        </p>

        {/* Algorithm Control Toggle */}
        <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-gov-border">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gov-muted font-medium">Prioritization Logic:</span>
            <button
              onClick={() => setEquityMultiplierEnabled(!equityMultiplierEnabled)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-semibold transition-all cursor-pointer ${
                equityMultiplierEnabled
                  ? 'bg-emerald-500 text-gov-text shadow-md shadow-emerald-500/20'
                  : 'bg-gov-inset text-gov-muted hover:text-gov-text'
              }`}
            >
              {equityMultiplierEnabled
                ? 'DIEW Active (Poverty & Deficit Weighted)'
                : 'Raw Feedback Volume Only (Unweighted)'}
            </button>
          </div>

          <div className="text-xs text-gov-muted flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Live Data: Census 2011/2026 Projections + NITI Aayog MPI 2024
          </div>
        </div>
      </div>

      {/* Main District Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* District Selector & Mini Map Grid */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-gov-muted uppercase tracking-wider flex items-center justify-between px-1">
            <span>High-Deficit Corridors ({DISTRICT_HOTSPOTS.length})</span>
            <span className="text-gov-teal font-mono">Select to Triangulate</span>
          </div>

          <div className="space-y-2.5">
            {DISTRICT_HOTSPOTS.map((district) => {
              const isSelected = selectedDistrict.id === district.id;
              const score = getAdjustedScore(district);

              return (
                <div
                  key={district.id}
                  onClick={() => setSelectedDistrict(district)}
                  className={`p-4 rounded-sm border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gov-card border-emerald-500  ring-1 ring-emerald-500/50'
                      : 'bg-gov-card border-gov-border hover:border-gov-border'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gov-text text-base">
                          {district.name}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-gov-inset text-gov-muted">
                          {district.state}
                        </span>
                      </div>
                      <p className="text-xs text-gov-muted mt-1">
                        {district.topFeedbackCategory}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-base font-black text-gov-success">
                        {score}
                      </div>
                      <div className="text-[10px] text-gov-muted">Priority Score</div>
                    </div>
                  </div>

                  {/* Micro stats */}
                  <div className="mt-3 pt-2.5 border-t border-gov-border flex items-center justify-between text-[11px] text-gov-muted">
                    <span>
                      MPI: <strong className="text-gov-text">{district.mpiScore}</strong>
                    </span>
                    <span>
                      Deficit: <strong className="text-gov-teal">{district.infrastructureDeficitScore}/100</strong>
                    </span>
                    <span>
                      Feedback: <strong className="text-gov-teal">{district.citizenFeedbackVolume.toLocaleString()}</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected District Deep-Dive & Capital Project Proposal */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-gov-card p-6 rounded-sm border border-gov-border  space-y-5">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gov-border pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-gov-text">
                    {selectedDistrict.name}, {selectedDistrict.state}
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-gov-teal-soft text-gov-teal border border-gov-teal">
                    {selectedDistrict.category}
                  </span>
                </div>
                <div className="text-xs text-gov-muted mt-1 flex items-center gap-3">
                  <span>Pop: <strong>{selectedDistrict.population}</strong></span>
                  <span>•</span>
                  <span>Vernacular: <strong>{selectedDistrict.primaryLanguages.join(', ')}</strong></span>
                  <span>•</span>
                  <span>Unresolved Rate: <strong className="text-gov-error">{selectedDistrict.unresolvedGrievanceRate}</strong></span>
                </div>
              </div>

              <div className="bg-gov-inset px-4 py-2 rounded-sm text-center border border-gov-border">
                <div className="text-2xl font-black text-gov-success">
                  {getAdjustedScore(selectedDistrict)}
                </div>
                <div className="text-[10px] font-bold text-gov-muted uppercase tracking-wider">
                  DIPS Priority
                </div>
              </div>
            </div>

            {/* PM GatiShakti Triangulation Layer */}
            <div className="bg-gov-navy-soft p-4 rounded-sm border border-gov-border space-y-2">
              <div className="text-xs font-bold text-gov-navy uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-gov-navy" />
                PM GatiShakti National Masterplan Layer Triangulation
              </div>
              <p className="text-xs text-gov-navy/90 leading-relaxed font-mono">
                {selectedDistrict.keyGatiShaktiLayer}
              </p>
              <div className="text-[11px] text-gov-muted">
                GIS Cross-Reference: Geospatial intersection identified with National Highways, Optical Fiber Corridors, and Water Basin contours.
              </div>
            </div>

            {/* Prioritized High-Impact Project Card */}
            <div className="bg-gov-card p-5 rounded-sm border border-gov-border space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gov-success flex items-center gap-1.5 uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4" />
                  Recommended High-Priority Public Capital Project
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500 text-gov-text">
                  {selectedDistrict.prioritizedProjectRecommendation.estimatedCapex}
                </span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-gov-text leading-snug">
                  {selectedDistrict.prioritizedProjectRecommendation.title}
                </h4>
                <div className="text-xs text-gov-teal font-semibold mt-1">
                  Funding Scheme: {selectedDistrict.prioritizedProjectRecommendation.scheme}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-gov-inset p-3 rounded-sm border border-gov-border">
                  <div className="font-semibold text-gov-muted">Target Beneficiaries</div>
                  <div className="text-gov-muted mt-0.5">{selectedDistrict.prioritizedProjectRecommendation.beneficiaryPopulation}</div>
                </div>

                <div className="bg-gov-inset p-3 rounded-sm border border-gov-border">
                  <div className="font-semibold text-gov-muted">GatiShakti Infrastructure Synergy</div>
                  <div className="text-gov-muted mt-0.5">{selectedDistrict.prioritizedProjectRecommendation.synergyWithGatiShakti}</div>
                </div>
              </div>

              {/* BRICS Parallel Callout */}
              <div className="pt-2 border-t border-gov-border text-xs text-gov-muted">
                <span className="font-bold text-gov-teal">BRICS Parallel Context: </span>
                {selectedDistrict.prioritizedProjectRecommendation.bricsParallels}
              </div>
            </div>

            {/* Why This Project Was Selected vs Top-Down Alternative */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-sm bg-rose-950/20 border border-rose-900/40 text-gov-error">
                <div className="font-bold text-gov-error mb-1">Traditional Top-Down Plan</div>
                Allocates ₹40 Cr to urban beautification and highway toll plazas in district center, ignoring rural water crisis.
              </div>
              <div className="p-3 rounded-sm bg-emerald-950/20 border border-emerald-900/40 text-gov-success">
                <div className="font-bold text-gov-success mb-1">Samvaad-Setu Grounded Plan</div>
                Directs capital to decentralized solar water & culverts, solving 64% of recurring citizen distress calls.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
