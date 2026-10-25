import React, { useState } from 'react';
import {
  Volume2,
  Mic,
  MessageSquare,
  PhoneCall,
  Smartphone,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Send
} from 'lucide-react';
import { SAMPLE_FEEDBACK_SIMULATIONS, CitizenFeedbackSimulation } from '../data/nationalData';

export const FeedbackSimulator: React.FC = () => {
  const [selectedSim, setSelectedSim] = useState<CitizenFeedbackSimulation>(SAMPLE_FEEDBACK_SIMULATIONS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(4); // Completed by default for sample

  const handleSelectSample = (sample: CitizenFeedbackSimulation) => {
    setSelectedSim(sample);
    setCustomInput('');
    setActiveStep(4);
  };

  const handleSimulateCustom = () => {
    if (!customInput.trim()) return;
    setIsProcessing(true);
    setActiveStep(1);

    setTimeout(() => setActiveStep(2), 600);
    setTimeout(() => setActiveStep(3), 1200);
    setTimeout(() => {
      setActiveStep(4);
      setIsProcessing(false);
      setSelectedSim({
        id: `CUSTOM-${Date.now()}`,
        sourceChannel: 'WhatsApp Voice Note',
        language: 'Vernacular Indic / Auto-Detected',
        citizenName: 'Verified Citizen (Anonymized via DPDP Zero-Knowledge Token)',
        location: 'Auto-Geotagged Cadastral Parcel (Within 3km tower bound)',
        rawInput: customInput,
        englishTranslation: `Canonical Synthesis: "${customInput}" — Categorized as high-priority public infrastructure repair signal.`,
        detectedEmotionUrgency: customInput.toLowerCase().includes('urgent') || customInput.toLowerCase().includes('पानी') || customInput.toLowerCase().includes('danger') ? 'Emergency Critical' : 'High Public Distress',
        extractedEntities: {
          assetType: 'Public Municipal/Rural Infrastructure Asset',
          defect: 'Reported physical degradation / public access obstruction',
          landmark: 'Correlated against local Gram Panchayat GIS polygon',
          impactRadius: 'Local Community Cluster'
        },
        gatiShaktiTriangulation: {
          layerMatched: 'PM GatiShakti Local Asset GIS Layer ID #98214',
          responsibleAgency: 'Nodal District Works Division / Local Body',
          gisConfidence: '93.4% spatial match',
          recommendedEscalation: 'Issued Unified Joint Work Order (UJWO) with 72h statutory resolution clock'
        }
      });
    }, 1800);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
          <Cpu className="w-3.5 h-3.5" />
          Multilingual Ingestion & Bhashini ASR Pipeline
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Test Citizen Feedback Ingestion in Real Indian Vernaculars
        </h2>
        <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">
          Experience how <strong>Samvaad-Setu 360°</strong> receives unstructured voice notes, toll-free calls, and SMS in 
          languages like Bhojpuri, Tamil, Bengali, and Marathi, filters background noise, translates into canonical text via 
          <strong>Bhashini</strong>, and instantly triangulates with <strong>PM GatiShakti</strong>.
        </p>

        {/* Sample Selector Tabs */}
        <div className="pt-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {SAMPLE_FEEDBACK_SIMULATIONS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSelectSample(sample)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                selectedSim.id === sample.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>{sample.language}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-900 text-amber-400">
                {sample.sourceChannel.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Citizen Ingestion Interface */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                Citizen Ingestion Point
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-medium bg-slate-800 text-slate-300">
                {selectedSim.sourceChannel}
              </span>
            </div>

            {/* Citizen Profile & Geotag */}
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="text-slate-400">
                Citizen: <strong className="text-white">{selectedSim.citizenName}</strong>
              </div>
              <div className="text-slate-400">
                Location: <strong className="text-amber-300">{selectedSim.location}</strong>
              </div>
            </div>

            {/* Raw Vernacular Audio/Text Display */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Raw Vernacular Speech ({selectedSim.language})</span>
                <span className="text-emerald-400 font-semibold">Bhashini IndicConformer</span>
              </div>
              <p className="text-sm text-white font-serif leading-relaxed italic bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                "{selectedSim.rawInput}"
              </p>
            </div>

            {/* Try Custom Vernacular Input */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Or Type Your Own Citizen Feedback:</span>
                <span className="text-[10px] text-slate-500">Any language / dialect</span>
              </label>
              <textarea
                rows={3}
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Type or paste any road, water, or electric issue in Hindi, Tamil, Bengali, or English..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleSimulateCustom}
                disabled={isProcessing || !customInput.trim()}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <>Processing through Bhashini & GatiShakti...</>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Process Custom Feedback
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Extraction & GatiShakti Triangulation */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                Live 4-Stage AI Triangulation Pipeline
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                  selectedSim.detectedEmotionUrgency === 'Emergency Critical'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {selectedSim.detectedEmotionUrgency}
              </span>
            </div>

            {/* Pipeline Stage Indicators */}
            <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
              <div className={`p-2 rounded-lg border ${activeStep >= 1 ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
                1. Speech ASR
              </div>
              <div className={`p-2 rounded-lg border ${activeStep >= 2 ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
                2. NLU Canonical
              </div>
              <div className={`p-2 rounded-lg border ${activeStep >= 3 ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
                3. Entity & Risk
              </div>
              <div className={`p-2 rounded-lg border ${activeStep >= 4 ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
                4. GatiShakti GIS
              </div>
            </div>

            {/* Canonical English Translation */}
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/60 space-y-1">
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Canonical English Translation & Intent
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedSim.englishTranslation}
              </p>
            </div>

            {/* Named Entity Extraction Grid */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Extracted Infrastructure Entities
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/60">
                  <div className="text-slate-400 text-[11px]">Asset Type</div>
                  <div className="font-bold text-white mt-0.5">{selectedSim.extractedEntities.assetType}</div>
                </div>

                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/60">
                  <div className="text-slate-400 text-[11px]">Defect & Threat</div>
                  <div className="font-bold text-rose-300 mt-0.5">{selectedSim.extractedEntities.defect}</div>
                </div>

                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/60">
                  <div className="text-slate-400 text-[11px]">Colloquial Landmark</div>
                  <div className="font-bold text-amber-300 mt-0.5">{selectedSim.extractedEntities.landmark}</div>
                </div>

                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/60">
                  <div className="text-slate-400 text-[11px]">Public Impact Radius</div>
                  <div className="font-bold text-cyan-300 mt-0.5">{selectedSim.extractedEntities.impactRadius}</div>
                </div>
              </div>
            </div>

            {/* PM GatiShakti Triangulation Result */}
            <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900 p-4 rounded-xl border border-indigo-500/40 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  PM GatiShakti Masterplan Reconciled Match
                </span>
                <span className="font-mono text-[11px] text-emerald-400">
                  {selectedSim.gatiShaktiTriangulation.gisConfidence}
                </span>
              </div>

              <div className="text-xs space-y-1">
                <div className="text-slate-300">
                  GIS Layer: <strong className="text-white font-mono">{selectedSim.gatiShaktiTriangulation.layerMatched}</strong>
                </div>
                <div className="text-slate-300">
                  Responsible Agency: <strong className="text-amber-300">{selectedSim.gatiShaktiTriangulation.responsibleAgency}</strong>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-indigo-900/40 border border-indigo-700/60 text-xs text-indigo-100 font-medium">
                <strong>Automated DPI Action: </strong>
                {selectedSim.gatiShaktiTriangulation.recommendedEscalation}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
