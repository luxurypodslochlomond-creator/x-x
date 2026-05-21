import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle, DollarSign, Calendar, Zap, ArrowLeft } from 'lucide-react';
import CB51GigsTab from './CB51GigsTab';
import { CB51InboxTab, CB51TasksTab, CB51FinanceTab, CB51CalendarTab } from './CB51TabsContent';

/**
 * CB51 UNIFIED DASHBOARD
 * COOLASFUCK coloured grid — raw, musician-first, no corporate bullshit
 */

const SECTIONS = [
  { id: 'gigs',     label: 'GIGS',     icon: Zap,         border: 'border-cyan-500',   bg: 'bg-cyan-500'   },
  { id: 'inbox',    label: 'INBOX',    icon: Mail,        border: 'border-orange-500', bg: 'bg-orange-500' },
  { id: 'tasks',    label: 'TO-DO',    icon: CheckCircle, border: 'border-green-500',  bg: 'bg-green-500'  },
  { id: 'finance',  label: 'FINANCE',  icon: DollarSign,  border: 'border-red-500',    bg: 'bg-red-500'    },
  { id: 'calendar', label: 'CALENDAR', icon: Calendar,    border: 'border-amber-500',  bg: 'bg-amber-500'  },
];

export default function CB51UnifiedDashboard({ artistId }) {
  const [activeSection, setActiveSection] = useState(null);

  if (activeSection) {
    const section = SECTIONS.find(s => s.id === activeSection);
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Back bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <button
            onClick={() => setActiveSection(null)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-black font-mono tracking-wider">BACK</span>
          </button>
          <span className={`text-xs font-black font-mono tracking-widest ${section?.border.replace('border-', 'text-')}`}>
            {section?.label}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.15 }}
          >
            {activeSection === 'gigs'     && <CB51GigsTab artistId={artistId} />}
            {activeSection === 'inbox'    && <CB51InboxTab artistId={artistId} />}
            {activeSection === 'tasks'    && <CB51TasksTab artistId={artistId} />}
            {activeSection === 'finance'  && <CB51FinanceTab artistId={artistId} />}
            {activeSection === 'calendar' && <CB51CalendarTab artistId={artistId} />}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="px-3 py-2">
      <div className="grid grid-cols-2 gap-2">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <motion.button
              key={section.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveSection(section.id)}
              className={`bg-black border-2 ${section.border} rounded-lg p-3 text-center active:opacity-80 transition-opacity`}
            >
              <div className={`w-12 h-12 rounded ${section.bg} text-black flex items-center justify-center mx-auto mb-2`}>
                <Icon className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <p className="text-white font-black text-[11px] font-mono tracking-wider">{section.label}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}