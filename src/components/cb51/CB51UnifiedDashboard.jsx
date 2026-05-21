import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle, DollarSign, Calendar, Zap, ArrowLeft, Brain } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import CB51GigsTab from './CB51GigsTab';
import { CB51InboxTab, CB51TasksTab, CB51FinanceTab, CB51CalendarTab } from './CB51TabsContent';

const SECTIONS = [
  { id: 'gigs',     label: 'GIGS',     icon: Zap,         border: 'border-cyan-500',   bg: 'bg-cyan-500',    text: 'text-cyan-400'   },
  { id: 'inbox',    label: 'INBOX',    icon: Mail,        border: 'border-orange-500', bg: 'bg-orange-500',  text: 'text-orange-400' },
  { id: 'tasks',    label: 'TO-DO',    icon: CheckCircle, border: 'border-green-500',  bg: 'bg-green-500',   text: 'text-green-400'  },
  { id: 'finance',  label: 'FINANCE',  icon: DollarSign,  border: 'border-red-500',    bg: 'bg-red-500',     text: 'text-red-400'    },
  { id: 'calendar', label: 'CALENDAR', icon: Calendar,    border: 'border-amber-500',  bg: 'bg-amber-500',   text: 'text-amber-400'  },
];

// ── AUTO BRIEFING BANNER ─────────────────────────────────────────────────────
function AutoBriefingBanner({ artistId, onClose }) {
  const [briefing, setBriefing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateAutoBriefing = async () => {
      try {
        const [gigOffers, invoices, tasks] = await Promise.all([
          base44.entities.GigOffer?.filter?.({ artist_id: artistId, status: 'manager_reviewing' }).catch(() => []),
          base44.entities.CB51Invoice?.filter?.({ artist_id: artistId, status: 'unpaid' }).catch(() => []),
          base44.entities.CB51Task?.filter?.({ artist_id: artistId, status: { $ne: 'done' } }).catch(() => []),
        ]);

        const urgentItems = [];
        if (gigOffers.length > 0) urgentItems.push(`${gigOffers.length} gig offer${gigOffers.length > 1 ? 's' : ''} waiting`);
        if (invoices.length > 0) urgentItems.push(`${invoices.length} unpaid invoice${invoices.length > 1 ? 's' : ''}`);
        if (tasks.length > 0) urgentItems.push(`${tasks.length} open task${tasks.length > 1 ? 's' : ''}`);

        if (urgentItems.length === 0) {
          setBriefing({ text: 'All clear — nothing urgent right now.', type: 'calm' });
        } else {
          setBriefing({
            text: `Priority: ${urgentItems.join(' · ')}.`,
            type: 'urgent'
          });
        }
      } catch (err) {
        console.error('Auto-briefing error:', err);
      } finally {
        setLoading(false);
      }
    };

    generateAutoBriefing();
  }, [artistId]);

  if (loading) return null;
  if (!briefing) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className={`mx-3 mb-3 rounded-xl px-4 py-3 flex items-center justify-between ${
        briefing.type === 'urgent' 
          ? 'bg-cyan-500/10 border border-cyan-500/40' 
          : 'bg-gray-900/50 border border-gray-800'
      }`}
    >
      <div className="flex items-center gap-3">
        <Brain className={`w-4 h-4 ${briefing.type === 'urgent' ? 'text-cyan-400' : 'text-gray-500'}`} />
        <p className={`text-sm font-mono ${briefing.type === 'urgent' ? 'text-cyan-400 font-bold' : 'text-gray-500'}`}>
          {briefing.text}
        </p>
      </div>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-300">
        <span className="text-xs font-black">×</span>
      </button>
    </motion.div>
  );
}

// ── PENDING GIG ALERT — green YES / red NO ──────────────────────────────────
function PendingGigAlert({ gig, onConfirm, onReject, confirming }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-3 mb-3 border-2 border-cyan-500 rounded-xl overflow-hidden"
    >
      {/* Header strip */}
      <div className="bg-cyan-500/10 px-4 py-2 flex items-center justify-between">
        <span className="text-cyan-400 font-black font-mono text-[10px] tracking-widest">NEW GIG OFFER</span>
        <span className="text-gray-500 text-[10px] font-mono">tap YES or NO</span>
      </div>
      {/* Gig details */}
      <div className="px-4 py-3 bg-black">
        <p className="text-white font-black text-base leading-tight">{gig.venue}</p>
        {gig.date_start && <p className="text-gray-400 text-sm mt-0.5">{gig.date_start}</p>}
        {gig.city && <p className="text-gray-500 text-xs">{gig.city}</p>}
        {gig.fee && <p className="text-cyan-400 font-black text-lg mt-1">£{Number(gig.fee).toLocaleString()}</p>}
        {gig.promoter_name && <p className="text-gray-500 text-xs mt-1">From: {gig.promoter_name}</p>}
      </div>
      {/* YES / NO */}
      <div className="grid grid-cols-2">
        <button
          onClick={() => onReject(gig)}
          disabled={confirming}
          className="py-4 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-black text-lg tracking-widest transition-all disabled:opacity-50"
        >
          ✕ NO
        </button>
        <button
          onClick={() => onConfirm(gig)}
          disabled={confirming}
          className="py-4 bg-green-500 hover:bg-green-400 active:scale-95 text-black font-black text-lg tracking-widest transition-all disabled:opacity-50"
        >
          ✓ YES
        </button>
      </div>
    </motion.div>
  );
}

export default function CB51UnifiedDashboard({ artistId }) {
  const [activeSection, setActiveSection] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [showBriefing, setShowBriefing] = useState(true);
  const queryClient = useQueryClient();

  const { data: pendingGigs = [] } = useQuery({
    queryKey: ['pendingGigsAlert', artistId],
    queryFn: () => base44.entities.GigOffer?.filter?.({ artist_id: artistId, status: 'manager_reviewing' }).catch(() => []),
    enabled: !!artistId,
    staleTime: 15000,
    refetchInterval: 30000,
  });

  const handleConfirm = async (gig) => {
    setConfirming(true);
    try {
      await base44.entities.GigOffer.update(gig.id, { status: 'confirmed', manager_approved: true });
      try {
        await base44.functions.invoke('sendGigConfirmationPush', { artistId, gigId: gig.id, gigVenue: gig.venue, gigDate: gig.date_start, gigFee: gig.fee });
      } catch (e) { /* non-critical */ }
      queryClient.invalidateQueries({ queryKey: ['pendingGigsAlert', artistId] });
      queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] });
      queryClient.invalidateQueries({ queryKey: ['confirmedGigs', artistId] });
    } finally {
      setConfirming(false);
    }
  };

  const handleReject = async (gig) => {
    setConfirming(true);
    try {
      await base44.entities.GigOffer.update(gig.id, { status: 'rejected_by_manager' });
      queryClient.invalidateQueries({ queryKey: ['pendingGigsAlert', artistId] });
      queryClient.invalidateQueries({ queryKey: ['pendingGigs', artistId] });
    } finally {
      setConfirming(false);
    }
  };

  if (activeSection) {
    const section = SECTIONS.find(s => s.id === activeSection);
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <button
            onClick={() => setActiveSection(null)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-black font-mono tracking-wider">BACK</span>
          </button>
          <span className={`text-xs font-black font-mono tracking-widest ${section?.text}`}>
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
            {activeSection === 'gigs'     && <div className="px-4"><CB51GigsTab artistId={artistId} /></div>}
            {activeSection === 'inbox'    && <CB51InboxTab artistId={artistId} />}
            {activeSection === 'tasks'    && <CB51TasksTab artistId={artistId} />}
            {activeSection === 'finance'  && <CB51FinanceTab artistId={artistId} />}
            {activeSection === 'calendar' && <CB51CalendarTab artistId={artistId} />}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // Show first pending gig as alert card
  const topPendingGig = pendingGigs[0] || null;

  return (
    <div className="pt-2 pb-8">
      {/* AUTO BRIEFING — AI reads everything, surfaces what matters */}
      <AnimatePresence>
        {showBriefing && (
          <AutoBriefingBanner artistId={artistId} onClose={() => setShowBriefing(false)} />
        )}
      </AnimatePresence>

      {/* PENDING GIG ALERT — shows when there's an offer waiting */}
      <AnimatePresence>
        {topPendingGig && (
          <PendingGigAlert
            gig={topPendingGig}
            onConfirm={handleConfirm}
            onReject={handleReject}
            confirming={confirming}
          />
        )}
        {pendingGigs.length > 1 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-amber-400 font-black font-mono text-[10px] tracking-widest mb-3"
          >
            +{pendingGigs.length - 1} MORE OFFER{pendingGigs.length - 1 > 1 ? 'S' : ''} WAITING
          </motion.p>
        )}
      </AnimatePresence>

      {/* NAV GRID — 2x2 + calendar full width */}
      <div className="px-3 grid grid-cols-2 gap-2">
        {SECTIONS.slice(0, 4).map((section) => {
          const Icon = section.icon;
          return (
            <motion.button
              key={section.id}
              whileTap={{ scale: 0.94 }}
              onClick={() => setActiveSection(section.id)}
              className={`bg-black border-2 ${section.border} rounded-xl p-4 text-center active:opacity-80 transition-opacity`}
            >
              <div className={`w-14 h-14 rounded-lg ${section.bg} text-black flex items-center justify-center mx-auto mb-2`}>
                <Icon className="w-7 h-7" strokeWidth={2.5} />
              </div>
              <p className="text-white font-black text-xs font-mono tracking-widest">{section.label}</p>
            </motion.button>
          );
        })}
      </div>

      {/* CALENDAR — full width */}
      <div className="px-3 mt-2">
        {(() => {
          const section = SECTIONS[4];
          const Icon = section.icon;
          return (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveSection(section.id)}
              className={`w-full bg-black border-2 ${section.border} rounded-xl p-4 flex items-center gap-4 active:opacity-80 transition-opacity`}
            >
              <div className={`w-14 h-14 rounded-lg ${section.bg} text-black flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-7 h-7" strokeWidth={2.5} />
              </div>
              <p className="text-white font-black text-xs font-mono tracking-widest">{section.label}</p>
            </motion.button>
          );
        })()}
      </div>
    </div>
  );
}