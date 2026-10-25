import React from 'react';
import { Download } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onQuickExportDocx: () => void;
  isExporting: boolean;
}

const PRODUCT_TABS = [
  { id: 'citizen-portal', label: 'Citizen' },
  { id: 'government-desk', label: 'Government' },
];

const BRIEFING_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'prototype', label: 'Prototype' },
  { id: 'edge-cases', label: '10 Edge Cases' },
  { id: 'fusion', label: 'Big Data Fusion' },
  { id: 'gatishakti', label: 'GatiShakti GIS' },
  { id: 'simulator', label: 'Multilingual Voice' },
  { id: 'impact', label: 'DPI Impact' },
  { id: 'policymakers', label: 'Policymaker Dossiers' },
  { id: 'research', label: 'Deep Research' },
  { id: 'docx-studio', label: 'DOCX Blueprint' },
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onQuickExportDocx,
  isExporting,
}) => {
  return (
    <header className="gov-masthead sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">SAMVAAD-SETU 360</h1>
          <p className="text-sm text-slate-200">Citizen feedback to infrastructure alignment</p>
        </div>
        <button
          type="button"
          onClick={onQuickExportDocx}
          disabled={isExporting}
          className="hidden sm:inline-flex items-center justify-center gap-2 min-h-11 px-4 rounded-sm font-semibold text-sm bg-gov-teal text-white disabled:opacity-60"
        >
          <Download className="w-4 h-4" aria-hidden="true" />
          {isExporting ? 'Exporting…' : 'Export DOCX'}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3 space-y-2">
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-1" aria-label="Product">
          {PRODUCT_TABS.map((tab, index) => {
            const active = activeTab === tab.id;
            return (
              <React.Fragment key={tab.id}>
                {index > 0 && <span className="text-slate-400 select-none" aria-hidden="true">|</span>}
                <button
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`gov-nav-link min-h-11 px-1 text-sm font-semibold bg-transparent ${
                    active
                      ? 'text-white underline underline-offset-4 decoration-2'
                      : 'text-slate-200 hover:text-white hover:underline hover:underline-offset-4'
                  }`}
                >
                  {tab.label}
                </button>
              </React.Fragment>
            );
          })}
        </nav>
        <nav className="flex flex-wrap gap-x-4 gap-y-1" aria-label="Briefing">
          {BRIEFING_TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`gov-nav-link min-h-11 px-0 text-sm bg-transparent ${
                  active
                    ? 'text-white underline underline-offset-4 decoration-2 font-semibold'
                    : 'text-slate-300 hover:text-white hover:underline hover:underline-offset-4'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
