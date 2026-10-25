import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  BookOpen,
  Send,
  RefreshCw,
  Copy,
  Check,
  FileText,
  Globe2,
  Building2,
  ExternalLink
} from 'lucide-react';

interface DeepResearchStudioProps {
  onExportDocx: () => void;
}

export const DeepResearchStudio: React.FC<DeepResearchStudioProps> = ({ onExportDocx }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('Full 360° India DPI Masterplan & Edge Case Architecture');
  const [targetCountry, setTargetCountry] = useState<string>('India');
  const [targetState, setTargetState] = useState<string>('Pan-India / Aspirational Districts');
  const [customQuery, setCustomQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [researchResult, setResearchResult] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const predefinedPrompts = [
    {
      title: 'Full 360° DPI Architecture',
      topic: 'Full 360° India DPI Masterplan & Edge Case Architecture',
      query: 'Synthesize the complete end-to-end Digital Public Infrastructure blueprint uniting Bhashini ASR, PM GatiShakti GIS 1400+ layers, and NITI Aayog Aspirational District indices to check all 10 edge cases.',
    },
    {
      title: 'Contractor Cartel & Astroturfing Defense',
      topic: 'Sybil Resistance & Anti-Astroturfing in Public Works Allocation',
      query: 'Analyze how municipal contractor syndicates game grievance portals to siphon MLA/MP Local Area Development funds, and detail the graph-entropy and cell-tower AI defense algorithms.',
    },
    {
      title: 'BRICS Multi-Nation Adaptation',
      topic: 'BRICS Cross-Border DPI Scalability & New Development Bank (NDB) Financing',
      query: 'How does this India-grounded DPI model scale to Brazil (Amazonian quilombos/favelas), South Africa (municipal backlogs), Egypt, Ethiopia, and Russia? Detail NDB project preparation requirements.',
    },
    {
      title: 'DPDP Act 2023 & Whistleblower Privacy',
      topic: 'DPDP Act 2023 Zero-Knowledge Proofs for Open Digital Public Goods',
      query: 'Formulate the mathematical differential privacy (Laplace mechanism) and zero-knowledge tokenization architecture protecting rural whistleblowers reporting substandard public construction.',
    },
    {
      title: 'Fiscal Realism & The 500-Cr Metro Trap',
      topic: 'Aspirational Intent Extraction & Multimodal Pragmatic Tiering',
      query: 'How should an AI platform parse unrealistic community requests (e.g. 500-crore metro in small village) to derive latent commute needs and generate realistic phased bus/road capex projects?',
    },
  ];

  const handleRunResearch = async (topicToRun?: string, queryToRun?: string) => {
    const topic = topicToRun || selectedTopic;
    const query = queryToRun || customQuery || 'Conduct deep research into edge cases, geospatial triangulation with PM GatiShakti, and citizen feedback synthesis.';
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/gemini/deep-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          query,
          country: targetCountry,
          state: targetState,
          district: 'Corridor Level'
        })
      });
      const data = await response.json();
      setResearchResult(data.result);
    } catch (err) {
      console.error('Deep research failed:', err);
      setResearchResult('Error connecting to Gemini 3.8 Flash research engine. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!researchResult) return;
    navigator.clipboard.writeText(researchResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          Powered by Gemini 3.8 Flash
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Deep Research & Policy Synthesis Studio
        </h2>
        <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">
          Formulate grounded policy research queries combining India's Digital Public Infrastructure, 
          Bhashini language models, PM GatiShakti geospatial analytics, and BRICS New Development Bank (NDB) financing structures.
        </p>

        {/* Quick Predefined Research Prompts */}
        <div className="pt-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {predefinedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedTopic(p.topic);
                setCustomQuery(p.query);
                handleRunResearch(p.topic, p.query);
              }}
              className="px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>{p.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Query Formulation Form */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-400">Target Jurisdiction / Nation</label>
            <select
              value={targetCountry}
              onChange={(e) => setTargetCountry(e.target.value)}
              className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="India">India (PM GatiShakti & Bhashini)</option>
              <option value="Brazil">Brazil (Amazonia & Favelas / PIX)</option>
              <option value="South Africa">South Africa (Township Backlogs / GovChat)</option>
              <option value="Russia">Russia (Remote Siberian Corridors)</option>
              <option value="China">China (Western Revitalization Masterplan)</option>
              <option value="Egypt & Ethiopia">Egypt & Ethiopia (Nile Basin Infrastructure)</option>
              <option value="Pan-BRICS Alliance">Pan-BRICS Alliance (NDB Financing)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400">Regional / State Corridor</label>
            <input
              type="text"
              value={targetState}
              onChange={(e) => setTargetState(e.target.value)}
              placeholder="e.g. Bastar, Vidarbha, Kalahandi..."
              className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400">Core Subject Focus</label>
            <input
              type="text"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              placeholder="e.g. Edge Case Analysis, Budget Alignment..."
              className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-400">Custom Deep Research Inquiry</label>
          <textarea
            rows={3}
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            placeholder="Type your specific research question (e.g. How does the Bhashini IndicConformer handle acoustic tractor noise when farmers report flood damage?)..."
            className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-400">
            Grounds responses in official government schemas, NITI Aayog indicators, and DPGA requirements.
          </div>

          <button
            onClick={() => handleRunResearch()}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-lg shadow-indigo-600/25 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Executing Deep Research with Gemini...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                Execute Deep Research
              </>
            )}
          </button>
        </div>
      </div>

      {/* Research Output Panel */}
      {researchResult && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden animate-fadeIn">
          {/* Output Action Bar */}
          <div className="bg-slate-800/80 px-6 py-3 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Grounded Research Memorandum
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                Grounded: PM GatiShakti & Bhashini
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Memorandum'}
              </button>

              <button
                onClick={onExportDocx}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                Export in DOCX
              </button>
            </div>
          </div>

          {/* Research Content */}
          <div className="p-6 sm:p-8 prose prose-invert prose-indigo max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-line">
            {researchResult}
          </div>
        </div>
      )}
    </div>
  );
};
