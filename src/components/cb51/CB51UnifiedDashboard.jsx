import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle, DollarSign, Calendar, Zap } from 'lucide-react';
import CB51GigsTab from './CB51GigsTab';
import { CB51InboxTab, CB51TasksTab, CB51FinanceTab, CB51CalendarTab } from './CB51TabsContent';

/**
 * CB51 UNIFIED DASHBOARD
 * Bottom tab bar — native app feel, like Spotify/Instagram
 * No clutter. Clean. World-class.
 */

const TABS = [
  { id: 'gigs',     label: 'Gigs',     icon: Zap,         color: '#06b6d4' },
  { id: 'inbox',    label: 'Inbox',    icon: Mail,        color: '#06b6d4' },
  { id: 'tasks',    label: 'Tasks',    icon: CheckCircle, color: '#10b981' },
  { id: 'finance',  label: 'Finance',  icon: DollarSign,  color: '#ef4444' },
  { id: 'calendar', label: 'Calendar', icon: Calendar,    color: '#f59e0b' },
];

export default function CB51UnifiedDashboard({ artistId }) {
  const [activeTab, setActiveTab] = useState('gigs');

  const activeColor = TABS.find(t => t.id === activeTab)?.color || '#06b6d4';

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 160px)' }}>
      {/* ── SCROLLABLE CONTENT ── */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            {activeTab === 'gigs'     && <CB51GigsTab artistId={artistId} />}
            {activeTab === 'inbox'    && <CB51InboxTab artistId={artistId} />}
            {activeTab === 'tasks'    && <CB51TasksTab artistId={artistId} />}
            {activeTab === 'finance'  && <CB51FinanceTab artistId={artistId} />}
            {activeTab === 'calendar' && <CB51CalendarTab artistId={artistId} />}
          </motion.div>
        </AnimatePresence>
        <div className="h-24" />
      </div>

      {/* ── BOTTOM TAB BAR ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex items-end pb-safe"
        style={{
          background: 'linear-gradient(to top, #000 80%, transparent)',
          paddingBottom: 'max(env(safe-area-inset-bottom), 12px)',
        }}
      >
        <div
          className="flex w-full px-2 py-2 mx-auto"
          style={{ maxWidth: 600, gap: 0 }}
        >
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 flex flex-col items-center gap-1 py-2 transition-all active:scale-90"
              >
                <div
                  className="w-8 h-8 flex items-center justify-center rounded-xl transition-all"
                  style={isActive ? { background: `${tab.color}20` } : {}}
                >
                  <Icon
                    className="w-5 h-5 transition-all"
                    style={{ color: isActive ? tab.color : '#4b5563' }}
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                </div>
                <span
                  className="text-[10px] font-bold transition-all"
                  style={{ color: isActive ? tab.color : '#6b7280' }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}