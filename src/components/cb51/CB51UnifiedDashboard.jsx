import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Mail, CheckCircle, DollarSign, Calendar, Zap, ArrowUp
} from 'lucide-react';
import CB51GigsTab from './CB51GigsTab';
import { CB51InboxTab, CB51TasksTab, CB51FinanceTab, CB51CalendarTab } from './CB51TabsContent';

/**
 * CB51 UNIFIED DASHBOARD
 * Single screen, native app feel
 * Tabs: Gigs, Inbox, Tasks, Finance, Calendar
 * Everything scrolls inline, no page jumps ♾️❤️
 */

export default function CB51UnifiedDashboard({ artistId }) {
  const [activeTab, setActiveTab] = useState('gigs');
  const scrollContainerRef = useRef(null);

  // Tab config with colour system
  const tabs = [
    { id: 'gigs', label: 'Gigs', icon: Zap, color: 'cyan' },
    { id: 'inbox', label: 'Inbox', icon: Mail, color: 'cyan' },
    { id: 'tasks', label: 'TO-DO', icon: CheckCircle, color: 'green' },
    { id: 'finance', label: 'Finance', icon: DollarSign, color: 'red' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, color: 'amber' }
  ];

  return (
    <div className="h-screen bg-gray-950 flex flex-col overflow-hidden">
      {/* ── STICKY TAB BAR ── */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/10">
        {/* SCROLL TABS */}
        <div className="flex overflow-x-auto scrollbar-hide whitespace-nowrap gap-2 px-4 py-4">
          {tabs.map(tab => {
           const Icon = tab.icon;
           const isActive = activeTab === tab.id;
           const colorMap = {
              cyan: { active: 'border-cyan-400 text-cyan-400 bg-cyan-500/10', inactive: 'border-transparent text-gray-500 hover:text-gray-300' },
              orange: { active: 'border-orange-500 text-orange-400 bg-orange-500/10', inactive: 'border-transparent text-gray-500 hover:text-gray-300' },
              green: { active: 'border-green-500 text-green-400 bg-green-500/10', inactive: 'border-transparent text-gray-500 hover:text-gray-300' },
              red: { active: 'border-red-500 text-red-400 bg-red-500/10', inactive: 'border-transparent text-gray-500 hover:text-gray-300' },
              amber: { active: 'border-amber-400 text-amber-400 bg-amber-500/10', inactive: 'border-transparent text-gray-500 hover:text-gray-300' }
            };
            const colors = colorMap[tab.color] || colorMap.cyan;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1.5 px-4 py-3 font-black text-xs whitespace-nowrap transition-all border-b-2 flex-shrink-0 rounded-lg ${
                  isActive ? colors.active : colors.inactive
                }`}
              >
                 <Icon className="w-6 h-6" />
                 <span>{tab.label}</span>
               </button>
             );
           })}
         </div>
       </div>

      {/* ── SCROLLABLE CONTENT ── */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {/* GIGS TAB */}
            {activeTab === 'gigs' && <CB51GigsTab artistId={artistId} />}

            {/* INBOX TAB */}
            {activeTab === 'inbox' && <CB51InboxTab artistId={artistId} />}

            {/* TASKS TAB */}
            {activeTab === 'tasks' && <CB51TasksTab artistId={artistId} />}

            {/* FINANCE TAB */}
            {activeTab === 'finance' && <CB51FinanceTab artistId={artistId} />}

            {/* CALENDAR TAB */}
            {activeTab === 'calendar' && <CB51CalendarTab artistId={artistId} />}
          </AnimatePresence>
        </div>

        {/* PADDING FOR SCROLL */}
        <div className="h-6" />
      </div>




      </div>
      );
      }