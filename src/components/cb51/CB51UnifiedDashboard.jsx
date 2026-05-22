import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle, DollarSign, Calendar, Zap, ArrowLeft, Brain, ChevronDown, Loader, TrendingUp, Clock, Star } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import CB51GigsTab from './CB51GigsTab';
import { CB51InboxTab, CB51TasksTab, CB51FinanceTab, CB51CalendarTab } from './CB51TabsContent';

const SECTIONS = [
  { id: 'gigs',     label: 'GIGS',     icon: Zap,         border: 'border-cyan-500',   bg: 'bg-cyan-500',    text: 'text-cyan-400',   glow: 'rgba(6,182,212,0.12)'   },
  { id: 'inbox',    label: 'INBOX',    icon: Mail,        border: 'border-orange-500', bg: 'bg-orange-500',  text: 'text-orange-400', glow: 'rgba(249,115,22,0.12)'  },
  { id: 'tasks',    label: 'TO-DO',    icon: CheckCircle, border: 'border-red-500',    bg: 'bg-red-500',     text: 'text-red-400',    glow: 'rgba(239,68,68,0.12)'   },
  { id: 'finance',  label: 'FINANCE',  icon: DollarSign,  border: 'border-green-500',  bg: 'bg-green-500',   text: 'text-green-400',  glow: 'rgba(16,185,129,0.12)'  },
  { id: 'calendar', label: 'CALENDAR', icon: Calendar,    border: 'border-amber-500',  bg: 'bg-amber-500',   text: 'text-amber-400',  glow: 'rgba(245,158,11,0.12)'  },
];

// ── LIVE STATS STRIP ─────────────────────────────────────────────────────────
function LiveStatsStrip({ artistId }) {
  const { data: confirmedGigs = [] } = useQuery({
    queryKey: ['confirmedGigs', artistId],
    queryFn: () => base44.entities.GigOffer?.filter?.({ artist_id: artistId, status: 'confirmed' }).catch(() => []),
    enabled: !!artistId,
    staleTime: 60000,
  });
  const { data: pendingGigs = [] } = useQuery({
    queryKey: ['pendingGigsAlert', artistId],
    queryFn: () => base44.entities.GigOffer?.filter?.({ artist_id: artistId, status: 'manager_reviewing' }).catch(() => []),
    enabled: !!artistId,
    staleTime: 15000,
  });
  const { data: tasks = [] } = useQuery({
    queryKey: ['cb51Tasks', artistId],
    queryFn: () => base44.entities.CB51Task?.filter?.({ artist_id: artistId }).catch(() => []),
    enabled: !!artistId,
    staleTime: 30000,
  });

  const totalEarned = confirmedGigs.reduce((sum, g) => sum + (g.fee || 0), 0);
  const openTasks = tasks.filter(t => t.status !== 'done').length;

  // Next upcoming gig
  const now = new Date();
  const upcomingGigs = confirmedGigs
    .filter(g => g.date_start && new Date(g.date_start) >= now)
    .sort((a, b) => new Date(a.date_start) - new Date(b.date_start));
  const nextGig = upcomingGigs[0];
  let daysUntil = null;
  if (nextGig) {
    daysUntil = Math.ceil((new Date(nextGig.date_start) - now) / (1000 * 60 * 60 * 24));
  }

  const stats = [
    {
      icon: TrendingUp,
      label: 'EARNED',
      value: `£${totalEarned.toLocaleString()}`,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
    },
    {
      icon: Clock,
      label: 'NEXT GIG',
      value: nextGig ? `${daysUntil}d` : '—',
      sub: nextGig ? nextGig.venue?.slice(0, 14) : 'none booked',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    {
      icon: Star,
      label: 'TO-DO',
      value: openTasks,
      color: openTasks > 0 ? 'text-red-400' : 'text-gray-500',
      bg: openTasks > 0 ? 'bg-red-500/10' : 'bg-gray-800',
      border: openTasks > 0 ? 'border-red-500/20' : 'border-gray-700',
    },
    {
      icon: Zap,
      label: 'OFFERS',
      value: pendingGigs.length,
      color: pendingGigs.length > 0 ? 'text-cyan-400' : 'text-gray-500',
      bg: pendingGigs.length > 0 ? 'bg-cyan-500/10' : 'bg-gray-800',
      border: pendingGigs.length > 0 ? 'border-cyan-500/30' : 'border-gray-700',
    },
  ];

  return (
    <div className="px-3 mb-4 grid grid-cols-4 gap-2">
      {stats.map(({ icon: Icon, label, value, sub, color, bg, border }) => (
        <div key={label} className={`${bg} border ${border} rounded-xl p-2.5 text-center`}>
          <Icon className={`w-3.5 h-3.5 ${color} mx-auto mb-1`} />
          <p className={`font-black text-base leading-none ${color}`}>{value}</p>
          {sub && <p className="text-gray-600 text-[9px] mt-0.5 truncate">{sub}</p>}
          <p className="text-gray-600 font-mono text-[8px] tracking-widest mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  );
}

// ── AI ANALYSIS (from Decision Engine) ──
async function analyseGigQuick(gig, artistId) {
  try {
    const existingGigs = await base44.entities.GigOffer.filter({ artist_id: artistId, status: 'confirmed' });
    const feesHistory = existingGigs.map(g => g.fee).filter(f => f && f > 0);
    const avgFee = feesHistory.length > 0 ? feesHistory.reduce((a, b) => a + b, 0) / feesHistory.length : null;
    const feeRatio = avgFee && gig.fee ? (gig.fee / avgFee) : null;
    
    const aiRead = await base44.integrations.Core.InvokeLLM({
      model: 'claude_sonnet_4_6',
      prompt: `Quick read on this gig for a manager. Return JSON only.
GIG: ${gig.venue}, ${gig.date_start}, £${gig.fee || '?'}
CONTEXT: Artist avg fee: £${avgFee ? Math.round(avgFee) : '?'}, ${existingGigs.length} past gigs`,
      response_json_schema: {
        type: "object",
        properties: {
          score: { type: "number", description: "0-100" },
          headline: { type: "string", description: "One line read" },
          flags: { type: "array", items: { type: "string" } },
          positives: { type: "array", items: { type: "string" } }
        },
        required: ["score", "headline"]
      }
    });
    return { ...aiRead, avgFee: avgFee ? Math.round(avgFee) : null, feeRatio };
  } catch {
    return null;
  }
}

function scoreColor(score) {
  if (score >= 75) return 'text-green-400';
  if (score >= 50) return 'text-amber-400';
  return 'text-red-400';
}

// ── PENDING GIG ALERT — YES/NO with AI expansion ──
function PendingGigAlert({ gig, onConfirm, onReject, confirming, artistId }) {
  const [expanded, setExpanded] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const handleExpand = async () => {
    if (!expanded && !aiAnalysis && !aiLoading) {
      setAiLoading(true);
      const analysis = await analyseGigQuick(gig, artistId);
      setAiAnalysis(analysis);
      setAiLoading(false);
    }
    setExpanded(!expanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mx-3 mb-3 border-2 border-cyan-500 rounded-xl overflow-hidden transition-all ${expanded ? 'ring-2 ring-cyan-500/40' : ''}`}
    >
      {/* Header strip */}
      <div className="bg-cyan-500/10 px-4 py-2 flex items-center justify-between">
        <span className="text-cyan-400 font-black font-mono text-[10px] tracking-widest">NEW GIG OFFER</span>
        <button onClick={handleExpand} className="text-gray-500 hover:text-cyan-400 text-xs">
          <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Gig details */}
      <div className="px-4 py-3 bg-black">
        <p className="text-white font-black text-base leading-tight">{gig.venue}</p>
        {gig.date_start && <p className="text-gray-400 text-sm mt-0.5">{gig.date_start}</p>}
        {gig.city && <p className="text-gray-500 text-xs">{gig.city}</p>}
        {gig.fee && <p className="text-cyan-400 font-black text-lg mt-1">£{Number(gig.fee).toLocaleString()}</p>}
        {gig.promoter_name && <p className="text-gray-500 text-xs mt-1">From: {gig.promoter_name}</p>}
      </div>

      {/* AI Analysis - expand on tap */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-cyan-500/20 bg-cyan-950/20 px-4 py-3 space-y-2"
          >
            {aiLoading ? (
              <div className="flex items-center gap-2 text-gray-500">
                <Loader className="w-3 h-3 animate-spin" />
                <span className="text-xs font-mono">CB51 analyzing…</span>
              </div>
            ) : aiAnalysis ? (
              <>
                <div className="flex items-center gap-2">
                  <span className={`text-xl font-black font-mono ${scoreColor(aiAnalysis.score)}`}>
                    {aiAnalysis.score}
                  </span>
                  <p className={`text-xs font-bold ${scoreColor(aiAnalysis.score)}`}>{aiAnalysis.headline}</p>
                  <Brain className={`w-3 h-3 flex-shrink-0 ${scoreColor(aiAnalysis.score)}`} />
                </div>
                {aiAnalysis.flags?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {aiAnalysis.flags.map((f, i) => (
                      <span key={i} className="text-[9px] bg-amber-950/40 border border-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">
                        ⚠ {f}
                      </span>
                    ))}
                  </div>
                )}
                {aiAnalysis.positives?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {aiAnalysis.positives.map((p, i) => (
                      <span key={i} className="text-[9px] bg-green-950/40 border border-green-500/20 text-green-400 px-1.5 py-0.5 rounded">
                        ✓ {p}
                      </span>
                    ))}
                  </div>
                )}
              </>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>

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
  const queryClient = useQueryClient();

  const { data: pendingGigsForBadge = [] } = useQuery({
    queryKey: ['pendingGigsBadge', artistId],
    queryFn: () => base44.entities.GigOffer?.filter?.({ artist_id: artistId, status: 'manager_reviewing' }).catch(() => []),
    enabled: !!artistId,
    staleTime: 15000,
    refetchInterval: 30000,
  });
  const { data: openTasks = [] } = useQuery({
    queryKey: ['cb51Tasks', artistId],
    queryFn: () => base44.entities.CB51Task?.filter?.({ artist_id: artistId }).catch(() => []),
    enabled: !!artistId,
    staleTime: 30000,
  });
  const { data: messages = [] } = useQuery({
    queryKey: ['cb51Messages', artistId],
    queryFn: () => base44.entities.CB51Message?.filter?.({ artist_id: artistId }).catch(() => []),
    enabled: !!artistId,
    staleTime: 30000,
  });
  const { data: confirmedGigs = [] } = useQuery({
    queryKey: ['confirmedGigs', artistId],
    queryFn: () => base44.entities.GigOffer?.filter?.({ artist_id: artistId, status: 'confirmed' }).catch(() => []),
    enabled: !!artistId,
    staleTime: 60000,
  });

  const badges = {
    gigs: pendingGigsForBadge.length,
    inbox: messages.length,
    tasks: openTasks.filter(t => t.status !== 'done').length,
    finance: 0,
    calendar: 0,
  };

  const { data: pendingGigs = [] } = useQuery({
    queryKey: ['pendingGigsAlert', artistId],
    queryFn: () => base44.entities.GigOffer?.filter?.({ artist_id: artistId, status: 'manager_reviewing' }).catch(() => []),
    enabled: !!artistId,
    staleTime: 15000,
    refetchInterval: 30000,
  });

  // Compute next gig for hero card
  const now = new Date();
  const nextGig = confirmedGigs
    .filter(g => g.date_start && new Date(g.date_start) >= now)
    .sort((a, b) => new Date(a.date_start) - new Date(b.date_start))[0] || null;
  const daysUntil = nextGig ? Math.ceil((new Date(nextGig.date_start) - now) / (1000 * 60 * 60 * 24)) : null;
  const urgentTasks = openTasks.filter(t => t.status !== 'done' && t.priority === 'urgent').length;

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
    const SectionIcon = section?.icon;
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="flex items-center gap-3 px-4 py-4 border-b border-white/5 bg-gray-950/80">
          <button
            onClick={() => setActiveSection(null)}
            className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors active:scale-95 mr-1"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          {SectionIcon && <SectionIcon className={`w-4 h-4 ${section?.text}`} />}
          <span className={`text-sm font-black font-mono tracking-widest ${section?.text}`}>
            {section?.label}
          </span>
        </div>
        {/* No AnimatePresence - instant switch, no judder */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.08 }}
        >
          {activeSection === 'gigs'     && <div className="px-4"><CB51GigsTab artistId={artistId} /></div>}
          {activeSection === 'inbox'    && <CB51InboxTab artistId={artistId} />}
          {activeSection === 'tasks'    && <CB51TasksTab artistId={artistId} />}
          {activeSection === 'finance'  && <CB51FinanceTab artistId={artistId} />}
          {activeSection === 'calendar' && <CB51CalendarTab artistId={artistId} />}
        </motion.div>
      </div>
    );
  }

  // Show first pending gig as alert card
  const topPendingGig = pendingGigs[0] || null;

  return (
    <div className="pb-8">

      {/* ── HERO CARD — next gig or offer waiting ── */}
      <div className="px-4 pt-2 pb-4">
        {topPendingGig ? (
          <PendingGigAlert
            gig={topPendingGig}
            onConfirm={handleConfirm}
            onReject={handleReject}
            confirming={confirming}
            artistId={artistId}
          />
        ) : nextGig ? (
          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveSection('calendar')}
            className="w-full text-left bg-[#0d1a0d] border border-green-500/20 rounded-2xl p-5 active:opacity-80 transition-all"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <p className="text-green-400 font-mono text-[10px] font-black tracking-widest mb-2">NEXT SHOW</p>
            <p className="text-white font-black text-xl leading-tight">{nextGig.venue}</p>
            {nextGig.city && <p className="text-gray-400 text-sm mt-0.5">{nextGig.city}</p>}
            <div className="flex items-end justify-between mt-3">
              <div>
                {nextGig.date_start && <p className="text-gray-500 text-xs">{new Date(nextGig.date_start).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>}
                {nextGig.fee && <p className="text-green-400 font-black text-base mt-1">£{Number(nextGig.fee).toLocaleString()}</p>}
              </div>
              <div className="text-right">
                <p className="text-white font-black text-4xl leading-none">{daysUntil}</p>
                <p className="text-gray-500 text-xs font-mono">days away</p>
              </div>
            </div>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl p-5"
          >
            <p className="text-gray-600 font-mono text-[10px] tracking-widest mb-1">STATUS</p>
            <p className="text-white font-black text-lg">No upcoming shows</p>
            <p className="text-gray-600 text-sm mt-1">Add a gig offer to get started</p>
          </motion.div>
        )}

        {pendingGigs.length > 1 && (
          <p className="text-center text-amber-400 font-black font-mono text-[10px] tracking-widest mt-2">
            +{pendingGigs.length - 1} MORE OFFER{pendingGigs.length - 1 > 1 ? 'S' : ''} WAITING
          </p>
        )}
      </div>

      {/* ── QUICK STATS ROW (only if there's data worth showing) ── */}
      {(urgentTasks > 0 || pendingGigsForBadge.length > 0) && (
        <div className="px-4 mb-4 flex gap-2">
          {pendingGigsForBadge.length > 0 && (
            <div className="flex-1 bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-3 py-2.5 text-center">
              <p className="text-cyan-400 font-black text-lg leading-none">{pendingGigsForBadge.length}</p>
              <p className="text-gray-500 font-mono text-[9px] tracking-widest mt-0.5">OFFER{pendingGigsForBadge.length > 1 ? 'S' : ''}</p>
            </div>
          )}
          {urgentTasks > 0 && (
            <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5 text-center">
              <p className="text-red-400 font-black text-lg leading-none">{urgentTasks}</p>
              <p className="text-gray-500 font-mono text-[9px] tracking-widest mt-0.5">URGENT</p>
            </div>
          )}
        </div>
      )}

      {/* ── NAV GRID — 2×2 ── */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {SECTIONS.slice(0, 4).map((section) => {
          const Icon = section.icon;
          const badge = badges[section.id];
          return (
            <motion.button
              key={section.id}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                setActiveSection(section.id);
                if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(8);
              }}
              className="relative bg-[#0f0f0f] rounded-2xl py-6 px-4 text-center active:opacity-70 transition-all"
              style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
            >
              {badge > 0 && (
                <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center leading-none">
                  {badge > 9 ? '9+' : badge}
                </span>
              )}
              <div className={`w-14 h-14 rounded-2xl ${section.bg} text-black flex items-center justify-center mx-auto mb-3`}
                style={{ boxShadow: `0 6px 24px ${section.glow}` }}>
                <Icon className="w-7 h-7" strokeWidth={2.5} />
              </div>
              <p className="text-white font-black text-xs font-mono tracking-widest">{section.label}</p>
            </motion.button>
          );
        })}
      </div>

      {/* ── CALENDAR — full width ── */}
      <div className="px-4 mt-3">
        {(() => {
          const section = SECTIONS[4];
          const Icon = section.icon;
          const calLabel = confirmedGigs.length > 0
            ? `${confirmedGigs.length} confirmed show${confirmedGigs.length > 1 ? 's' : ''}`
            : 'No shows booked yet';
          return (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveSection(section.id);
                if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(8);
              }}
              className="relative w-full bg-[#0f0f0f] rounded-2xl p-4 flex items-center gap-4 active:opacity-70 transition-all"
              style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
            >
              <div className={`w-14 h-14 rounded-2xl ${section.bg} text-black flex items-center justify-center flex-shrink-0`}
                style={{ boxShadow: `0 6px 24px ${section.glow}` }}>
                <Icon className="w-7 h-7" strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <p className="text-white font-black text-sm font-mono tracking-widest">{section.label}</p>
                <p className="text-gray-600 text-xs mt-0.5">{calLabel}</p>
              </div>
            </motion.button>
          );
        })()}
      </div>
    </div>
  );
}