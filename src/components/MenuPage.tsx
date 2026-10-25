import React from 'react';
import { BRIEFING_TABS, PRODUCT_TABS } from '../data/portalMenu';

interface MenuPageProps {
  activeTab: string;
  onSelect: (tab: string) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ activeTab, onSelect }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-gov-teal">Portal</p>
        <h2 className="text-2xl sm:text-3xl font-black text-gov-text">Menu</h2>
        <p className="text-sm text-gov-muted">Choose a ticket desk or a briefing page.</p>
      </div>

      <section className="bg-gov-card border border-gov-border rounded-sm p-4 space-y-3" aria-labelledby="menu-tickets">
        <h3 id="menu-tickets" className="text-lg font-black text-gov-navy">
          Tickets
        </h3>
        <ul className="divide-y divide-gov-border">
          {PRODUCT_TABS.map((item) => {
            const current = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelect(item.id)}
                  className={`w-full min-h-11 text-left px-2 py-3 ${
                    current ? 'bg-gov-navy-soft' : ''
                  }`}
                >
                  <span className="block text-sm font-bold text-gov-navy">{item.label}</span>
                  <span className="block text-sm text-gov-muted">{item.summary}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="bg-gov-card border border-gov-border rounded-sm p-4 space-y-3" aria-labelledby="menu-briefing">
        <h3 id="menu-briefing" className="text-lg font-black text-gov-navy">
          Briefing
        </h3>
        <ul className="divide-y divide-gov-border">
          {BRIEFING_TABS.map((item) => {
            const current = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelect(item.id)}
                  className={`w-full min-h-11 text-left px-2 py-3 ${
                    current ? 'bg-gov-navy-soft' : ''
                  }`}
                >
                  <span className="block text-sm font-bold text-gov-navy">{item.label}</span>
                  <span className="block text-sm text-gov-muted">{item.summary}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};
