import React from 'react';
import { Download, ShieldCheck, Globe2, Layers, Cpu, Sparkles, FileText } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onQuickExportDocx: () => void;
  isExporting: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onQuickExportDocx,
  isExporting,
}) => {
  const tabs = [
    { id: 'overview', label: '360° DPI Overview', icon: Globe2 },
    { id: 'edge-cases', label: '10 Edge Cases Matrix', icon: ShieldCheck, badge: 'All 360°' },
    { id: 'gatishakti', label: 'GatiShakti & Districts', icon: Layers, badge: 'India Grounded' },
    { id: 'simulator', label: 'Multilingual Ingestion', icon: Cpu },
    { id: 'research', label: 'Deep Research Studio', icon: Sparkles, badge: 'Gemini AI' },
    { id: 'docx-studio', label: 'DOCX Blueprint Studio', icon: FileText, highlight: true },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-xl backdrop-blur-md bg-opacity-95">
      {/* Top Banner - BRICS Theme & DPI Track */}
      <div className="bg-gradient-to-r from-amber-600 via-emerald-600 to-indigo-700 px-4 py-1.5 text-xs text-white font-medium flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="bg-black/30 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[11px]">
            BRICS 2026 Innovation
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="font-semibold">Track 1 — AI for Digital Public Infrastructure & Governance</span>
        </div>
        <div className="flex items-center space-x-4 text-[11px] opacity-95">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            DPGA Open Standard
          </span>
          <span className="hidden md:inline">• DPDP Act 2023 Compliant</span>
          <span className="hidden lg:inline">• PM GatiShakti & Bhashini Integrated</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-indigo-600 to-emerald-500 p-0.5 shadow-lg flex-shrink-0">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center font-black text-xl text-amber-400">
              सं
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-300 bg-clip-text text-transparent">
                SAMVAAD-SETU 360°
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                संवाद सेतु
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5">
              Multilingual AI Digital Public Good for Citizen Feedback to National Masterplan Alignment
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={onQuickExportDocx}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md hover:shadow-amber-500/20 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
            title="Download the full comprehensive 360° Blueprint as a Microsoft Word DOCX document"
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'Generating DOCX...' : 'Export DOCX Blueprint'}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto no-scrollbar border-t border-slate-800">
        <nav className="flex space-x-1 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600/30 text-amber-300 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                      isActive
                        ? 'bg-amber-400 text-slate-900'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
