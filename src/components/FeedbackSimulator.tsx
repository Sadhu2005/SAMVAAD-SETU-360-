import React, { useState } from 'react';
import {
  Volume2,
  Mic,
  MessageSquare,
  PhoneCall,
  Smartphone,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
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
      <div className="bg-gov-card text-gov-text p-6 sm:p-8 rounded-sm border border-gov-border  space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gov-teal-soft text-gov-teal border border-gov-teal">
          Multilingual Ingestion & Bhashini ASR Pipeline
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Test Citizen Feedback Ingestion in Real Indian Vernaculars
        </h2>
        <p className="text-sm text-gov-muted max-w-4xl leading-relaxed">
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
              className={`px-3 py-2 rounded-sm text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                selectedSim.id === sample.id
                  ? 'bg-gov-navy text-white shadow-md'
                  : 'bg-gov-inset text-gov-muted hover:bg-gov-navy-soft'
              }`}
            >
              <span>{sample.language}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-gov-card text-gov-teal">
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
          <div className="bg-gov-card p-6 rounded-sm border border-gov-border  space-y-4">
            <div className="flex items-center justify-between border-b border-gov-border pb-3">
              <span className="text-xs font-bold text-gov-teal uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                Citizen Ingestion Point
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-medium bg-gov-inset text-gov-muted">
                {selectedSim.sourceChannel}
              </span>
            </div>

            {/* Citizen Profile & Geotag */}
            <div className="bg-gov-inset p-3 rounded-sm border border-gov-border text-xs space-y-1">
              <div className="text-gov-muted">
                Citizen: <strong className="text-gov-text">{selectedSim.citizenName}</strong>
              </div>
              <div className="text-gov-muted">
                Location: <strong className="text-gov-teal">{selectedSim.location}</strong>
              </div>
            </div>

            {/* Raw Vernacular Audio/Text Display */}
            <div className="bg-gov-inset p-4 rounded-sm border border-gov-border space-y-2">
              <div className="flex items-center justify-between text-[11px] text-gov-muted font-mono">
                <span>Raw Vernacular Speech ({selectedSim.language})</span>
                <span className="text-gov-success font-semibold">Bhashini IndicConformer</span>
              </div>
              <p className="text-sm text-gov-text font-serif leading-relaxed italic bg-gov-card p-3 rounded-sm border border-gov-border">
                "{selectedSim.rawInput}"
              </p>
            </div>

            {/* Try Custom Vernacular Input */}
            <div className="pt-2 border-t border-gov-border space-y-2">
              <label className="text-xs font-semibold text-gov-muted flex items-center justify-between">
                <span>Or Type Your Own Citizen Feedback:</span>
                <span className="text-[10px] text-gov-muted">Any language / dialect</span>
              </label>
              <textarea
                rows={3}
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Type or paste any road, water, or electric issue in Hindi, Tamil, Bengali, or English..."
                className="w-full bg-gov-inset border border-gov-border rounded-sm p-3 text-xs text-gov-text placeholder-slate-500 focus:outline-none focus:border-gov-navy"
              />
              <button
                onClick={handleSimulateCustom}
                disabled={isProcessing || !customInput.trim()}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-sm text-xs font-bold bg-gov-navy hover:bg-gov-teal text-white shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
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
          <div className="bg-gov-card p-6 rounded-sm border border-gov-border  space-y-5">
            <div className="flex items-center justify-between border-b border-gov-border pb-3">
              <span className="text-xs font-bold text-gov-success uppercase tracking-wider">
                Live 4-Stage AI Triangulation Pipeline
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                  selectedSim.detectedEmotionUrgency === 'Emergency Critical'
                    ? 'bg-rose-500/20 text-gov-error border border-rose-500/30'
                    : 'bg-gov-teal-soft text-gov-teal border border-gov-teal'
                }`}
              >
                {selectedSim.detectedEmotionUrgency}
              </span>
            </div>

            {/* Pipeline Stage Indicators */}
            <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
              <div className={`p-2 rounded-sm border ${activeStep >= 1 ? 'bg-gov-success-bg border-emerald-500 text-gov-success' : 'bg-gov-inset text-gov-muted border-gov-border'}`}>
                1. Speech ASR
              </div>
              <div className={`p-2 rounded-sm border ${activeStep >= 2 ? 'bg-gov-success-bg border-emerald-500 text-gov-success' : 'bg-gov-inset text-gov-muted border-gov-border'}`}>
                2. NLU Canonical
              </div>
              <div className={`p-2 rounded-sm border ${activeStep >= 3 ? 'bg-gov-success-bg border-emerald-500 text-gov-success' : 'bg-gov-inset text-gov-muted border-gov-border'}`}>
                3. Entity & Risk
              </div>
              <div className={`p-2 rounded-sm border ${activeStep >= 4 ? 'bg-gov-success-bg border-emerald-500 text-gov-success' : 'bg-gov-inset text-gov-muted border-gov-border'}`}>
                4. GatiShakti GIS
              </div>
            </div>

            {/* Canonical English Translation */}
            <div className="bg-gov-inset p-4 rounded-sm border border-gov-border space-y-1">
              <div className="text-xs font-semibold text-gov-muted flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-gov-success" />
                Canonical English Translation & Intent
              </div>
              <p className="text-xs text-gov-text leading-relaxed">
                {selectedSim.englishTranslation}
              </p>
            </div>

            {/* Named Entity Extraction Grid */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-gov-muted uppercase tracking-wider">
                Extracted Infrastructure Entities
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-gov-inset p-3 rounded-sm border border-gov-border">
                  <div className="text-gov-muted text-[11px]">Asset Type</div>
                  <div className="font-bold text-gov-text mt-0.5">{selectedSim.extractedEntities.assetType}</div>
                </div>

                <div className="bg-gov-inset p-3 rounded-sm border border-gov-border">
                  <div className="text-gov-muted text-[11px]">Defect & Threat</div>
                  <div className="font-bold text-gov-error mt-0.5">{selectedSim.extractedEntities.defect}</div>
                </div>

                <div className="bg-gov-inset p-3 rounded-sm border border-gov-border">
                  <div className="text-gov-muted text-[11px]">Colloquial Landmark</div>
                  <div className="font-bold text-gov-teal mt-0.5">{selectedSim.extractedEntities.landmark}</div>
                </div>

                <div className="bg-gov-inset p-3 rounded-sm border border-gov-border">
                  <div className="text-gov-muted text-[11px]">Public Impact Radius</div>
                  <div className="font-bold text-gov-teal mt-0.5">{selectedSim.extractedEntities.impactRadius}</div>
                </div>
              </div>
            </div>

            {/* PM GatiShakti Triangulation Result */}
            <div className="bg-gov-card p-4 rounded-sm border border-gov-border space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gov-navy">
                  PM GatiShakti Masterplan Reconciled Match
                </span>
                <span className="font-mono text-[11px] text-gov-success">
                  {selectedSim.gatiShaktiTriangulation.gisConfidence}
                </span>
              </div>

              <div className="text-xs space-y-1">
                <div className="text-gov-muted">
                  GIS Layer: <strong className="text-gov-text font-mono">{selectedSim.gatiShaktiTriangulation.layerMatched}</strong>
                </div>
                <div className="text-gov-muted">
                  Responsible Agency: <strong className="text-gov-teal">{selectedSim.gatiShaktiTriangulation.responsibleAgency}</strong>
                </div>
              </div>

              <div className="p-3 rounded-sm bg-gov-navy-soft border border-gov-border text-xs text-gov-text font-medium">
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
