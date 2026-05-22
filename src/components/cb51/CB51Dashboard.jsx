import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowLeft as Back, Loader2, ChevronDown as Chevron, Radio, Mail, CheckSquare, DollarSign, CalendarDays } from 'lucide-react';
import CB51GigsTab from './CB51GigsTab';
import { CB51InboxTab, CB51TasksTab, CB51FinanceTab, CB51CalendarTab } from './CB51TabsContent';

// ─── AI ANALYSIS ────────────────────────────────────────────────────────────
async function analyseGigQuick(gig, artistId) {
  try {
    const existing = await base44.entities.GigOffer.filter({ artist_id: artistId, status: 'confirmed' });
    const fees = existing.map(g => g.fee).filter(Boolean);
    const avg = fees.length ? fees.reduce((a, b) => a + b, 0) / fees.length : null;
    const res = await base44.integrations.Core.InvokeLLM({
      model: 'claude_sonnet_4_6',
      prompt: `Quick read on this gig. Return JSON only.
GIG: ${gig.venue}, ${gig.date_start}, £${gig.fee || '?'}
CONTEXT: avg fee £${avg ? Math.round(avg) : '?'}, ${existing.length} past gigs`,
      response_json_schema: {
        type: 'object',
        properties: {
          score: { type: 'number' },
          headline: { type: 'string' },
          flags: { type: 'array', items: { type: 'string' } },
          positives: { type: 'array', items: { type: 'string' } }
        },
        required: ['score', 'headline']
      }
    });
    return { ...res, avgFee: avg ? Math.round(avg) : null };
  } catch { return null; }
}

// ─── PENDING OFFER CARD ───────────────────────────────────────────────────────
function OfferCard({ gig, onConfirm, onReject, confirming, artistId }) {
  const [expanded, setExpanded] = useState(false);
  const [ai, setAi] = useState(null);
  const [loading, setLoading] = useState(false);

  const expand = async () => {
    if (!expanded && !ai && !loading) {
      setLoading(true);
      setAi(await analyseGigQuick(gig, artistId));
      setLoading(false);
    }
    setExpanded(v => !v);
  };

  const score = ai?.score;
  const scoreCol = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 mb-4 rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(6,182,212,0.3)', background: '#050f14' }}
    >
      {/* Offer header */}
      <div className="flex items-center justify-between px-4 py-2"
        style={{ background: 'rgba(6,182,212,0.08)', borderBottom: '1px solid rgba(6,182,212,0.1)' }}>
        <span className="text-cyan-400 text-[10px] font-mono tracking-[0.25em]">OFFER IN</span>
        <button onClick={expand} className="text-gray-600 hover:text-cyan-400 transition-colors p-1">
          <Chevron className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Details */}
      <div className="px-4 py-4">
        <p className="text-white font-black text-xl leading-tight">{gig.venue}</p>
        <p className="text-gray-500 text-sm mt-1">{gig.city}{gig.city && gig.date_start ? ' · ' : ''}{gig.date_start}</p>
        {gig.promoter_name && <p className="text-gray-700 text-xs mt-2">from {gig.promoter_name}</p>}
      </div>

      {/* AI read */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
            style={{ borderTop: '1px solid rgba(6,182,212,0.1)' }}
          >
            <div className="px-4 py-3">
              {loading ? (
                <div className="flex items-center gap-2 text-gray-600">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span className="text-xs">Reading…</span>
                </div>
              ) : ai ? (
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-black text-2xl" style={{ color: scoreCol }}>{ai.score}</span>
                    <span className="text-xs text-gray-400">{ai.headline}</span>
                  </div>
                  {ai.flags?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {ai.flags.map((f, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full text-amber-400"
                          style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                  {ai.positives?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {ai.positives.map((p, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full text-emerald-400"
                          style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm / Reject */}
      <div className="grid grid-cols-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <button
          onClick={() => onReject(gig)}
          disabled={confirming}
          className="py-4 text-red-400 font-black text-sm tracking-widest active:bg-red-950 transition-colors disabled:opacity-40"
          style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}
        >
          PASS
        </button>
        <button
          onClick={() => onConfirm(gig)}
          disabled={confirming}
          className="py-4 text-emerald-400 font-black text-sm tracking-widest active:bg-emerald-950 transition-colors disabled:opacity-40"
        >
          CONFIRM
        </button>
      </div>
    </motion.div>
  );
}

// ─── MAIN DASHBOARD ──────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'gigs',     label: 'Gigs',     color: '#06b6d4', Icon: Radio },
  { id: 'inbox',    label: 'Inbox',    color: '#f97316', Icon: Mail },
  { id: 'tasks',    label: 'Tasks',    color: '#ef4444', Icon: CheckSquare },
  { id: 'finance',  label: 'Finance',  color: '#10b981', Icon: DollarSign },
  { id: 'calendar', label: 'Cal',      color: '#f59e0b', Icon: CalendarDays },
];

export default function CB51Dashboard({ artistId }) {
  const [active, setActive] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const qc = useQueryClient();

  const { data: pending = [] } = useQuery({
    queryKey: ['pending', artistId],
    queryFn: () => base44.entities.GigOffer?.filter?.({ artist_id: artistId, status: 'manager_reviewing' }).catch(() => []),
    enabled: !!artistId, staleTime: 15000, refetchInterval: 30000,
  });
  const { data: confirmed = [] } = useQuery({
    queryKey: ['confirmed', artistId],
    queryFn: () => base44.entities.GigOffer?.filter?.({ artist_id: artistId, status: 'confirmed' }).catch(() => []),
    enabled: !!artistId, staleTime: 60000,
  });
  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks', artistId],
    queryFn: () => base44.entities.CB51Task?.filter?.({ artist_id: artistId }).catch(() => []),
    enabled: !!artistId, staleTime: 30000,
  });
  const { data: messages = [] } = useQuery({
    queryKey: ['messages', artistId],
    queryFn: () => base44.entities.CB51Message?.filter?.({ artist_id: artistId }).catch(() => []),
    enabled: !!artistId, staleTime: 30000,
  });

  const now = new Date();
  const upcoming = confirmed
    .filter(g => g.date_start && new Date(g.date_start) >= now)
    .sort((a, b) => new Date(a.date_start) - new Date(b.date_start));
  const nextShow = upcoming[0] || null;
  const daysUntil = nextShow ? Math.ceil((new Date(nextShow.date_start) - now) / 86400000) : null;
  const openTasks = tasks.filter(t => t.status !== 'done');

  const badges = {
    gigs: pending.length,
    inbox: messages.length,
    tasks: openTasks.length,
    finance: 0,
    calendar: 0,
  };

  const confirm = async (gig) => {
    setConfirming(true);
    try {
      await base44.entities.GigOffer.update(gig.id, { status: 'confirmed', manager_approved: true });
      try { await base44.functions.invoke('sendGigConfirmationPush', { artistId, gigId: gig.id, gigVenue: gig.venue, gigDate: gig.date_start, gigFee: gig.fee }); } catch {}
      qc.invalidateQueries({ queryKey: ['pending', artistId] });
      qc.invalidateQueries({ queryKey: ['confirmed', artistId] });
    } finally { setConfirming(false); }
  };

  const reject = async (gig) => {
    setConfirming(true);
    try {
      await base44.entities.GigOffer.update(gig.id, { status: 'rejected_by_manager' });
      qc.invalidateQueries({ queryKey: ['pending', artistId] });
    } finally { setConfirming(false); }
  };

  // ── Section view ──
  if (active) {
    const sec = SECTIONS.find(s => s.id === active);
    return (
      <div className="min-h-screen bg-black text-white">
        <button
          onClick={() => setActive(null)}
          className="flex items-center gap-2 px-4 py-5 text-gray-600 hover:text-white transition-colors active:opacity-60"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <Back className="w-4 h-4" />
          <span className="text-sm font-semibold" style={{ color: sec?.color }}>{sec?.label}</span>
        </button>
        <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1 }}>
          {active === 'gigs'     && <div className="px-4"><CB51GigsTab artistId={artistId} /></div>}
          {active === 'inbox'    && <CB51InboxTab artistId={artistId} />}
          {active === 'tasks'    && <CB51TasksTab artistId={artistId} />}
          {active === 'finance'  && <CB51FinanceTab artistId={artistId} />}
          {active === 'calendar' && <CB51CalendarTab artistId={artistId} />}
        </motion.div>
      </div>
    );
  }

  // ── Home ──
  return (
    <div className="min-h-screen bg-black text-white flex flex-col select-none" style={{ paddingBottom: 80 }}>

      {/* ── OFFER IN ── */}
      {pending[0] && (
        <div className="px-4 pt-2">
          <OfferCard
            gig={pending[0]}
            onConfirm={confirm}
            onReject={reject}
            confirming={confirming}
            artistId={artistId}
          />
          {pending.length > 1 && (
            <p className="text-center text-gray-700 text-xs mb-4">+{pending.length - 1} more</p>
          )}
        </div>
      )}

      {/* ── NEXT SHOW — pure type ── */}
      <button
        onClick={() => setActive('calendar')}
        className="w-full text-left px-6 pt-6 pb-6"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {nextShow ? (
          <>
            <p className="text-gray-700 text-[10px] font-mono tracking-[0.35em] mb-4">NEXT SHOW</p>
            <div className="flex items-end justify-between">
              <div className="flex-1 min-w-0 pr-4">
                <p className="text-white font-black leading-[0.9] tracking-tight" style={{ fontSize: 36 }}>
                  {nextShow.venue}
                </p>
                {nextShow.city && (
                  <p className="text-gray-600 text-sm mt-2">{nextShow.city}</p>
                )}
                {nextShow.date_start && (
                  <p className="text-gray-700 text-xs mt-3 font-mono">
                    {new Date(nextShow.date_start).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                )}
              </div>
              <div className="text-right flex-shrink-0 pl-2">
                <p className="text-white font-black leading-none" style={{ fontSize: 72 }}>{daysUntil}</p>
                <p className="text-gray-700 text-[9px] font-mono tracking-[0.3em] mt-1">DAYS</p>
              </div>
            </div>
          </>
        ) : (
          <div className="py-4">
            <p className="text-gray-700 text-[10px] font-mono tracking-[0.35em] mb-3">STATUS</p>
            <p className="text-gray-500 text-xl font-light">No shows booked.</p>
          </div>
        )}
      </button>

      {/* ── DIVIDER ── */}
      <div className="mx-6 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

      {/* ── COMING UP — skip the next show (already shown above), show the rest ── */}
      <div className="px-6 pt-4">
        {upcoming.slice(1, 5).map((gig, i) => {
          const d = Math.ceil((new Date(gig.date_start) - now) / 86400000);
          return (
            <motion.button
              key={gig.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ opacity: 0.5 }}
              onClick={() => setActive('calendar')}
              className="w-full flex items-center justify-between py-3 text-left"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', WebkitTapHighlightColor: 'transparent' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-[3px] h-4 rounded-full flex-shrink-0" style={{ background: '#10b981' }} />
                <div>
                  <p className="text-gray-300 text-sm font-semibold">{gig.venue}</p>
                  {gig.city && <p className="text-gray-600 text-xs">{gig.city}</p>}
                </div>
              </div>
              <span className="text-gray-600 text-xs font-mono">{d}d</span>
            </motion.button>
          );
        })}

        {/* Open tasks — urgent ones only on home */}
        {openTasks.filter(t => t.priority === 'urgent' || t.priority === 'high').slice(0, 3).map((task, i) => (
          <motion.button
            key={task.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.04 }}
            whileTap={{ opacity: 0.5 }}
            onClick={() => setActive('tasks')}
            className="w-full flex items-center gap-3 py-3 text-left"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="w-[3px] h-4 rounded-full flex-shrink-0" style={{ background: '#ef4444' }} />
            <p className="text-gray-400 text-sm truncate flex-1">{task.title}</p>
            <span className="text-[9px] text-red-500 font-mono uppercase">{task.priority}</span>
          </motion.button>
        ))}

        {upcoming.length <= 1 && openTasks.filter(t => t.priority === 'urgent' || t.priority === 'high').length === 0 && (
          <p className="text-gray-800 text-sm py-4 font-mono">Nothing pressing right now.</p>
        )}
      </div>

      {/* ── QUICK STATS — only show if there's something to say ── */}
      {(upcoming.length > 0 || openTasks.length > 0 || pending.length > 0) && (
        <div className="flex px-6 pt-5 pb-2 gap-8">
          {upcoming.length > 0 && (
            <button onClick={() => setActive('calendar')} className="text-left active:opacity-50" style={{ WebkitTapHighlightColor: 'transparent' }}>
              <p className="text-white font-black text-3xl leading-none">{upcoming.length}</p>
              <p className="text-gray-700 text-[9px] font-mono tracking-widest mt-1">SHOWS</p>
            </button>
          )}
          {openTasks.length > 0 && (
            <button onClick={() => setActive('tasks')} className="text-left active:opacity-50" style={{ WebkitTapHighlightColor: 'transparent' }}>
              <p className="text-white font-black text-3xl leading-none">{openTasks.length}</p>
              <p className="text-gray-700 text-[9px] font-mono tracking-widest mt-1">TASKS</p>
            </button>
          )}
          {pending.length > 0 && (
            <button onClick={() => setActive('gigs')} className="text-left active:opacity-50" style={{ WebkitTapHighlightColor: 'transparent' }}>
              <p className="font-black text-3xl leading-none" style={{ color: '#06b6d4' }}>{pending.length}</p>
              <p className="text-gray-700 text-[9px] font-mono tracking-widest mt-1">OFFERS</p>
            </button>
          )}
        </div>
      )}

      {/* ── NAV BAR ── */}
      <div className="fixed bottom-0 left-0 right-0"
        style={{ background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.06)', zIndex: 10, paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="flex">
          {SECTIONS.map(sec => {
            const b = badges[sec.id];
            const active = b > 0;
            return (
              <button
                key={sec.id}
                onClick={() => setActive(sec.id)}
                className="relative flex-1 flex flex-col items-center gap-1 py-3 active:opacity-40 transition-opacity"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <div className="relative">
                  <sec.Icon
                    className="w-5 h-5"
                    style={{ color: active ? sec.color : 'rgba(255,255,255,0.2)' }}
                  />
                  {b > 0 && (
                    <span
                      className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full text-black text-[8px] font-black flex items-center justify-center"
                      style={{ background: sec.color }}
                    >
                      {b > 9 ? '9' : b}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-semibold"
                  style={{ color: active ? sec.color : 'rgba(255,255,255,0.2)' }}>
                  {sec.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}