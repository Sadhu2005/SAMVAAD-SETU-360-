/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { LiveResolutionPrototype } from './components/LiveResolutionPrototype';
import { CitizenTrackPortal } from './components/CitizenTrackPortal';
import { GovernmentWorkSurface } from './components/GovernmentWorkSurface';
import { Overview } from './components/Overview';
import { EdgeCaseExplorer } from './components/EdgeCaseExplorer';
import { DatasetFusionEngine } from './components/DatasetFusionEngine';
import { GatiShaktiMapHub } from './components/GatiShaktiMapHub';
import { FeedbackSimulator } from './components/FeedbackSimulator';
import { DpiImpactTracker } from './components/DpiImpactTracker';
import { PolicymakerDossier } from './components/PolicymakerDossier';
import { DeepResearchStudio } from './components/DeepResearchStudio';
import { DocxStudio } from './components/DocxStudio';
import { MenuPage } from './components/MenuPage';
import { generateSamvaadSetuDocx } from './utils/docxExport';
import { CheckCircle2, Download } from 'lucide-react';
import { MENU_TAB_ID, isPortalTab } from './data/portalMenu';

const VIEW_TO_TAB: Record<string, string> = {
  citizen: 'citizen-portal',
  gov: 'government-desk',
  prototype: 'prototype',
  overview: 'overview',
  menu: MENU_TAB_ID,
};

function readDeepLink(): { tab: string; id?: string } {
  const params = new URLSearchParams(window.location.search);
  const view = params.get('view') || '';
  const id = params.get('id') || undefined;
  const mapped = VIEW_TO_TAB[view] || view;
  return { tab: isPortalTab(mapped) ? mapped : 'citizen-portal', id };
}

export default function App() {
  const initial = readDeepLink();
  const [activeTab, setActiveTab] = useState<string>(initial.tab);
  const [deepLinkId, setDeepLinkId] = useState<string | undefined>(initial.id);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const navigateTab = (tab: string, id?: string) => {
    setActiveTab(tab);
    setDeepLinkId(id);
    const params = new URLSearchParams(window.location.search);
    const view =
      tab === 'citizen-portal'
        ? 'citizen'
        : tab === 'government-desk'
          ? 'gov'
          : tab === MENU_TAB_ID
            ? 'menu'
            : tab === 'prototype'
              ? 'prototype'
              : tab;
    params.set('view', view);
    if (id) params.set('id', id);
    else params.delete('id');
    const next = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', next);
  };

  useEffect(() => {
    const onPop = () => {
      const link = readDeepLink();
      setActiveTab(link.tab);
      setDeepLinkId(link.id);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const handleQuickExportDocx = async () => {
    setIsExporting(true);
    try {
      const fileName = await generateSamvaadSetuDocx();
      setExportNotice(`Downloaded: ${fileName}`);
      setTimeout(() => setExportNotice(null), 6000);
    } catch (err) {
      console.error('Quick DOCX export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gov-page text-gov-text flex flex-col font-sans selection:bg-gov-teal-soft selection:text-gov-navy">
      <a href="#main-content" className="gov-skip-link">
        Skip to main content
      </a>

      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => navigateTab(tab)}
        onQuickExportDocx={handleQuickExportDocx}
        isExporting={isExporting}
      />

      {exportNotice && (
        <div
          role="status"
          className="gov-banner-success mx-4 sm:mx-auto mt-4 max-w-7xl w-auto px-4 py-3 flex items-center gap-3 font-semibold text-sm"
        >
          <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
          <span>{exportNotice}</span>
        </div>
      )}

      <main id="main-content" tabIndex={-1} className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === MENU_TAB_ID && <MenuPage activeTab={activeTab} onSelect={(tab) => navigateTab(tab)} />}

        {activeTab === 'citizen-portal' && <CitizenTrackPortal initialTrackingId={deepLinkId} />}

        {activeTab === 'government-desk' && <GovernmentWorkSurface initialTrackingId={deepLinkId} />}

        {activeTab === 'prototype' && (
          <LiveResolutionPrototype
            onExportDocx={handleQuickExportDocx}
            onSavedTicket={(id) => navigateTab('citizen-portal', id)}
          />
        )}

        {activeTab === 'overview' && (
          <Overview
            onNavigateToTab={(tab) => navigateTab(tab)}
            onExportDocx={handleQuickExportDocx}
          />
        )}

        {activeTab === 'edge-cases' && <EdgeCaseExplorer />}
        {activeTab === 'fusion' && <DatasetFusionEngine />}
        {activeTab === 'gatishakti' && <GatiShaktiMapHub />}
        {activeTab === 'simulator' && <FeedbackSimulator />}
        {activeTab === 'impact' && <DpiImpactTracker />}
        {activeTab === 'policymakers' && <PolicymakerDossier onExportDocx={handleQuickExportDocx} />}
        {activeTab === 'research' && <DeepResearchStudio onExportDocx={handleQuickExportDocx} />}
        {activeTab === 'docx-studio' && <DocxStudio />}
      </main>

      <footer className="gov-footer py-6 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>SAMVAAD-SETU 360. Official civic portal for citizen tickets and briefing materials.</span>
          <button
            type="button"
            onClick={handleQuickExportDocx}
            disabled={isExporting}
            className="inline-flex items-center justify-center gap-2 min-h-11 px-4 rounded-sm bg-gov-card border border-gov-border text-gov-navy"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Export DOCX
          </button>
        </div>
      </footer>
    </div>
  );
}
