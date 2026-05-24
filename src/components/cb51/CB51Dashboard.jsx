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
      className="rounded-2xl overflow-hidden"
      style={{ border: '1.5px solid rgba(6,182,212,0.4)', background: '#0e1420', boxShadow: '0 4px 24px rgba(6,182,212,0.15)' }}
    >
      {/* Offer header */}
      <div className="flex items-center justify-between px-4 py-2"
        style={{ background: 'rgba(6,182,212,0.07)', borderBottom: '1px solid rgba(6,182,212,0.12)' }}>
        <span className="text-[10px] font-black tracking-[0.25em]" style={{ color: '#06b6d4' }}>OFFER IN</span>
        <button onClick={expand} className="p-1 transition-opacity active:opacity-50" style={{ color: '#06b6d4' }}>
          <Chevron className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Details */}
      <div className="px-4 py-4">
        <p className="font-black text-xl leading-tight" style={{ color: '#f0f4ff' }}>{gig.venue}</p>
        <p className="text-sm mt-1" style={{ color: '#64748b' }}>{gig.city}{gig.city && gig.date_start ? ' · ' : ''}{gig.date_start}</p>
        {gig.promoter_name && <p className="text-xs mt-2" style={{ color: '#475569' }}>from {gig.promoter_name}</p>}
      </div>

      {/* AI read */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
            style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
          >
            <div className="px-4 py-3">
              {loading ? (
                <div className="flex items-center gap-2" style={{ color: '#aaa' }}>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span className="text-xs">Reading…</span>
                </div>
              ) : ai ? (
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-black text-2xl" style={{ color: scoreCol }}>{ai.score}</span>
                    <span className="text-xs" style={{ color: '#94a3b8' }}>{ai.headline}</span>
                  </div>
                  {ai.flags?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {ai.flags.map((f, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#b45309' }}>
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                  {ai.positives?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {ai.positives.map((p, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#047857' }}>
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
      <div className="grid grid-cols-2" style={{ borderTop: '1px solid rgba(6,182,212,0.12)' }}>
        <button
          onClick={() => onReject(gig)}
          disabled={confirming}
          className="py-4 font-black text-sm tracking-widest transition-colors active:opacity-50 disabled:opacity-40"
          style={{ color: '#ef4444', borderRight: '1px solid rgba(6,182,212,0.12)' }}
        >
          PASS
        </button>
        <button
          onClick={() => onConfirm(gig)}
          disabled={confirming}
          className="py-4 font-black text-sm tracking-widest transition-colors active:opacity-50 disabled:opacity-40"
          style={{ color: '#10b981' }}
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

export default function CB51Dashboard({ artistId, artistName }) {
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
    .filter(g => (g.date || g.date_start) && new Date(g.date || g.date_start) >= now)
    .sort((a, b) => new Date(a.date || a.date_start) - new Date(b.date || b.date_start));
  const nextShow = upcoming[0] || null;
  const nextShowDate = nextShow ? new Date(nextShow.date || nextShow.date_start) : null;
  const daysUntil = nextShowDate ? Math.ceil((nextShowDate - now) / 86400000) : null;
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
      <div className="min-h-screen" style={{ background: '#070a0f', color: '#f0f4ff' }}>
        <button
          onClick={() => setActive(null)}
          className="flex items-center gap-2 px-4 py-5 active:opacity-60 transition-opacity"
          style={{ WebkitTapHighlightColor: 'transparent', color: '#555' }}
        >
          <Back className="w-4 h-4" />
          <span className="text-sm font-bold" style={{ color: sec?.color }}>{sec?.label}</span>
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

  // ── Time-aware greeting ──
  const hour = now.getHours();
  const greeting = hour < 5 ? 'Still up?' : hour < 12 ? 'Morning.' : hour < 17 ? 'Afternoon.' : hour < 21 ? 'Evening.' : 'Late one.';

  // ── Home ──
  const urgentTasks = openTasks.filter(t => t.priority === 'urgent' || t.priority === 'high');

  const BG = '#070a0f';
  const CARD = '#0e1420';
  const TEXT = '#f0f4ff';
  const MUTED = '#64748b';
  const BORDER = 'rgba(6,182,212,0.12)';

  return (
    <div className="min-h-screen flex flex-col select-none" style={{ background: BG, color: TEXT, paddingBottom: 90 }}>

      {/* ── GREETING ── */}
      <div className="px-5 pt-8 pb-4 flex items-center justify-between">
        <div>
          <p className="font-black text-2xl tracking-tight" style={{ color: TEXT }}>{greeting}</p>
          <p className="text-sm mt-0.5" style={{ color: MUTED }}>
            {pending.length > 0 ? `${pending.length} offer${pending.length > 1 ? 's' : ''} waiting`
             : upcoming.length > 0 ? `${upcoming.length} show${upcoming.length > 1 ? 's' : ''} booked`
             : 'All clear today.'}
          </p>
        </div>
        {pending.length > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm"
            style={{ background: '#06b6d4' }}
          >
            {pending.length}
          </motion.div>
        )}
      </div>

      {/* ── PENDING OFFER — most urgent ── */}
      {pending[0] && (
        <div className="px-4 mb-3">
          <OfferCard
            gig={pending[0]}
            onConfirm={confirm}
            onReject={reject}
            confirming={confirming}
            artistId={artistId}
          />
          {pending.length > 1 && (
            <button onClick={() => setActive('gigs')} className="w-full text-center text-xs py-1 active:opacity-50 font-bold" style={{ color: '#06b6d4' }}>
              +{pending.length - 1} more offer{pending.length - 1 > 1 ? 's' : ''} →
            </button>
          )}
        </div>
      )}

      {/* ── NEXT SHOW CARD ── */}
      <div className="px-4 mb-3">
        <button
          onClick={() => setActive('calendar')}
          className="w-full text-left rounded-2xl p-5 active:scale-[0.98] transition-transform"
          style={{ background: CARD, border: `1px solid ${BORDER}`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', WebkitTapHighlightColor: 'transparent' }}
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: MUTED }}>Next Show</p>
          {nextShow ? (
            <div className="flex items-end justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-black text-2xl leading-tight break-words" style={{ color: TEXT }}>{nextShow.venue}</p>
                {nextShow.city && <p className="text-sm mt-1" style={{ color: MUTED }}>{nextShow.city}</p>}
                {nextShowDate && (
                  <p className="text-xs mt-2 font-mono" style={{ color: '#aaa' }}>
                    {nextShowDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                )}
              </div>
              <div className="text-right flex-shrink-0 rounded-xl px-4 py-3" style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)' }}>
                <p className="font-black text-4xl leading-none tabular-nums" style={{ color: daysUntil <= 7 ? '#f59e0b' : '#06b6d4' }}>{daysUntil}</p>
                <p className="text-[9px] font-mono tracking-widest mt-1" style={{ color: '#aaa' }}>DAYS</p>
              </div>
            </div>
          ) : (
            <div>
              <p className="font-bold text-lg" style={{ color: TEXT }}>Nothing booked yet.</p>
              <p className="text-sm mt-1" style={{ color: MUTED }}>Forward a gig offer email to get started.</p>
            </div>
          )}
        </button>
      </div>

      {/* ── QUICK ACTIONS GRID ── */}
      <div className="px-4 grid grid-cols-2 gap-3 mb-3">
        <button onClick={() => setActive('gigs')}
          className="rounded-2xl p-4 text-left active:scale-95 transition-transform"
          style={{ background: CARD, border: `1px solid rgba(6,182,212,0.25)`, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <Radio className="w-5 h-5 mb-3" style={{ color: '#06b6d4' }} />
          <p className="font-black text-2xl leading-none" style={{ color: TEXT }}>{upcoming.length}</p>
          <p className="text-xs mt-1 font-semibold" style={{ color: MUTED }}>Shows booked</p>
        </button>

        <button onClick={() => setActive('tasks')}
          className="rounded-2xl p-4 text-left active:scale-95 transition-transform"
          style={{ background: CARD, border: urgentTasks.length > 0 ? '1px solid rgba(239,68,68,0.35)' : `1px solid ${BORDER}`, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <CheckSquare className="w-5 h-5 mb-3" style={{ color: urgentTasks.length > 0 ? '#ef4444' : '#aaa' }} />
          <p className="font-black text-2xl leading-none" style={{ color: urgentTasks.length > 0 ? '#ef4444' : TEXT }}>{openTasks.length}</p>
          <p className="text-xs mt-1 font-semibold" style={{ color: MUTED }}>{urgentTasks.length > 0 ? `${urgentTasks.length} urgent` : 'Open tasks'}</p>
        </button>

        <button onClick={() => setActive('finance')}
          className="rounded-2xl p-4 text-left active:scale-95 transition-transform"
          style={{ background: CARD, border: `1px solid rgba(16,185,129,0.25)`, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <DollarSign className="w-5 h-5 mb-3" style={{ color: '#10b981' }} />
          <p className="font-black text-2xl leading-none" style={{ color: TEXT }}>
            £{confirmed.filter(g => g.fee).reduce((a, g) => a + (g.fee || 0), 0).toLocaleString()}
          </p>
          <p className="text-xs mt-1 font-semibold" style={{ color: MUTED }}>Total booked</p>
        </button>

        <button onClick={() => setActive('inbox')}
          className="rounded-2xl p-4 text-left active:scale-95 transition-transform"
          style={{ background: CARD, border: messages.length > 0 ? '1px solid rgba(249,115,22,0.35)' : `1px solid ${BORDER}`, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <Mail className="w-5 h-5 mb-3" style={{ color: messages.length > 0 ? '#f97316' : '#aaa' }} />
          <p className="font-black text-2xl leading-none" style={{ color: messages.length > 0 ? '#f97316' : TEXT }}>{messages.length}</p>
          <p className="text-xs mt-1 font-semibold" style={{ color: MUTED }}>Messages</p>
        </button>
      </div>

      {/* ── UPCOMING SHOWS LIST ── */}
      {upcoming.slice(1, 4).length > 0 && (
        <div className="px-4 mb-3">
          <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}`, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <p className="text-xs font-bold tracking-widest uppercase px-4 pt-4 pb-2" style={{ color: MUTED }}>Coming Up</p>
            {upcoming.slice(1, 4).map((gig, i) => {
              const d = Math.ceil((new Date(gig.date || gig.date_start) - now) / 86400000);
              return (
                <button key={gig.id} onClick={() => setActive('calendar')}
                  className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors active:bg-black/5"
                  style={{ borderTop: i >= 0 ? `1px solid ${BORDER}` : 'none' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#10b981' }} />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: TEXT }}>{gig.venue}</p>
                      {gig.city && <p className="text-xs" style={{ color: MUTED }}>{gig.city}</p>}
                    </div>
                  </div>
                  <span className="text-xs font-mono tabular-nums" style={{ color: MUTED }}>{d}d</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── URGENT TASKS LIST ── */}
      {urgentTasks.length > 0 && (
        <div className="px-4 mb-3">
          <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: '1px solid rgba(239,68,68,0.2)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <p className="text-xs font-bold tracking-widest uppercase px-4 pt-4 pb-2" style={{ color: MUTED }}>Needs Attention</p>
            {urgentTasks.slice(0, 3).map((task, i) => (
              <button key={task.id} onClick={() => setActive('tasks')}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors active:bg-black/5"
                style={{ borderTop: `1px solid ${BORDER}` }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#ef4444' }} />
                <p className="text-sm flex-1 truncate font-medium" style={{ color: TEXT }}>{task.title}</p>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
                  style={{ background: task.priority === 'urgent' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)', color: task.priority === 'urgent' ? '#ef4444' : '#f59e0b' }}>
                  {task.priority}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── NAV BAR ── */}
      <div className="fixed bottom-0 left-0 right-0"
        style={{ background: 'rgba(7,10,15,0.97)', backdropFilter: 'blur(24px)', borderTop: `1px solid rgba(6,182,212,0.2)`, zIndex: 10, paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="flex">
          {SECTIONS.map(sec => {
            const b = badges[sec.id];
            const hasAlert = b > 0;
            return (
              <button
                key={sec.id}
                onClick={() => setActive(sec.id)}
                className="relative flex-1 flex flex-col items-center gap-1 py-3 active:opacity-40 transition-opacity"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {hasAlert && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full"
                    style={{ background: sec.color }} />
                )}
                <div className="relative">
                  <sec.Icon className="w-5 h-5" style={{ color: hasAlert ? sec.color : 'rgba(255,255,255,0.25)' }} />
                  {b > 0 && (
                    <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full text-white text-[8px] font-black flex items-center justify-center"
                      style={{ background: sec.color }}>
                      {b > 9 ? '9' : b}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-semibold" style={{ color: hasAlert ? sec.color : 'rgba(255,255,255,0.25)' }}>
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