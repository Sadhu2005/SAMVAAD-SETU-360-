/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { LiveResolutionPrototype } from './components/LiveResolutionPrototype';
import { Overview } from './components/Overview';
import { EdgeCaseExplorer } from './components/EdgeCaseExplorer';
import { DatasetFusionEngine } from './components/DatasetFusionEngine';
import { GatiShaktiMapHub } from './components/GatiShaktiMapHub';
import { FeedbackSimulator } from './components/FeedbackSimulator';
import { DpiImpactTracker } from './components/DpiImpactTracker';
import { PolicymakerDossier } from './components/PolicymakerDossier';
import { DeepResearchStudio } from './components/DeepResearchStudio';
import { DocxStudio } from './components/DocxStudio';
import { generateSamvaadSetuDocx } from './utils/docxExport';
import confetti from 'canvas-confetti';
import {
  FileText,
  Download,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  Sparkles,
  Layers
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('prototype');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleQuickExportDocx = async () => {
    setIsExporting(true);
    try {
      const fileName = await generateSamvaadSetuDocx();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
      setExportNotice(`Downloaded: ${fileName}`);
      setTimeout(() => setExportNotice(null), 6000);
    } catch (err) {
      console.error('Quick DOCX export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Sticky Main Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onQuickExportDocx={handleQuickExportDocx}
        isExporting={isExporting}
      />

      {/* Quick Export Toast Alert */}
      {exportNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 font-semibold text-xs sm:text-sm animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'prototype' && (
          <LiveResolutionPrototype onExportDocx={handleQuickExportDocx} />
        )}

        {activeTab === 'overview' && (
          <Overview
            onNavigateToTab={(tab) => setActiveTab(tab)}
            onExportDocx={handleQuickExportDocx}
          />
        )}

        {activeTab === 'edge-cases' && <EdgeCaseExplorer />}

        {activeTab === 'fusion' && <DatasetFusionEngine />}

        {activeTab === 'gatishakti' && <GatiShaktiMapHub />}

        {activeTab === 'simulator' && <FeedbackSimulator />}

        {activeTab === 'impact' && <DpiImpactTracker />}

        {activeTab === 'policymakers' && (
          <PolicymakerDossier onExportDocx={handleQuickExportDocx} />
        )}

        {activeTab === 'research' && (
          <DeepResearchStudio onExportDocx={handleQuickExportDocx} />
        )}

        {activeTab === 'docx-studio' && <DocxStudio />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-8 px-4 sm:px-6 text-xs mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center border border-amber-500/30">
              सं
            </div>
            <div>
              <div className="font-bold text-white text-sm">
                SAMVAAD-SETU 360° (संवाद सेतु)
              </div>
              <div className="text-[11px] text-slate-500">
                Track 1: AI for Digital Public Infrastructure & Governance • BRICS Innovation 2026
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
            <span>Bhashini Multilingual ASR</span>
            <span>•</span>
            <span>PM GatiShakti 1,400+ GIS Layers</span>
            <span>•</span>
            <span>DPDP Act 2023 Compliant</span>
            <span>•</span>
            <span>Digital Public Goods Standard</span>
          </div>

          <button
            onClick={handleQuickExportDocx}
            disabled={isExporting}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Exporting...' : 'Export DOCX'}</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
