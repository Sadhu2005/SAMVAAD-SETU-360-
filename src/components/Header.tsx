import React from 'react';
import { Download } from 'lucide-react';
import { MENU_TAB_ID, PRODUCT_TABS } from '../data/portalMenu';

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
  const menuOpen = activeTab === MENU_TAB_ID;

  return (
    <header className="gov-masthead sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">SAMVAAD-SETU 360</h1>
          <p className="text-sm text-slate-200">Citizen feedback to infrastructure alignment</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-1" aria-label="Product">
            {PRODUCT_TABS.map((tab, index) => {
              const active = activeTab === tab.id;
              return (
                <React.Fragment key={tab.id}>
                  {index > 0 && (
                    <span className="text-slate-400 select-none" aria-hidden="true">
                      |
                    </span>
                  )}
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
            <span className="text-slate-400 select-none" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={() => setActiveTab(MENU_TAB_ID)}
              aria-current={menuOpen ? 'page' : undefined}
              className={`gov-nav-link min-h-11 px-2 text-sm font-semibold bg-transparent ${
                menuOpen
                  ? 'text-white underline underline-offset-4 decoration-2'
                  : 'text-slate-200 hover:text-white hover:underline hover:underline-offset-4'
              }`}
            >
              Menu
            </button>
          </nav>
          <button
            type="button"
            onClick={onQuickExportDocx}
            disabled={isExporting}
            className="inline-flex items-center justify-center gap-2 min-h-11 px-4 rounded-sm font-semibold text-sm bg-gov-teal text-white disabled:opacity-60"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            {isExporting ? 'Exporting…' : 'Export DOCX'}
          </button>
        </div>
      </div>
    </header>
  );
};
