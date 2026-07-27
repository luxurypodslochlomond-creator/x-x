import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import {
  ArrowLeft as Back, Loader2, ChevronDown as Chevron,
  Radio, Mail, CheckSquare, PoundSterling, CalendarDays
} from 'lucide-react';
import CB51GigsTab from './CB51GigsTab';
import { CB51InboxTab, CB51TasksTab, CB51FinanceTab, CB51CalendarTab } from './CB51TabsContent';

// ─── SAFE DATE PARSE ──────────────────────────────────────────────────────────
const parseDate = (d) => {
  if (!d) return null;
  if (typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d)) {
    const [y, m, day] = d.split('-').map(Number);
    return new Date(y, m - 1, day);
  }
  return new Date(d);
};

// ─── AI ANALYSIS ─────────────────────────────────────────────────────────────
async function analyseGigQuick(gig, artistId) {
  try {
    const existing = await base44.entities.GigOffer.filter({ artist_id: artistId, status: 'confirmed' });
    const fees = existing.map(g => g.fee).filter(Boolean);
    const avg = fees.length ? Math.round(fees.reduce((a, b) => a + b, 0) / fees.length) : null;
    const res = await base44.integrations.Core.InvokeLLM({
      model: 'claude_sonnet_4_6',
      prompt: `Quick read on this gig. Return JSON only.
GIG: ${gig.venue}, ${gig.date_start || gig.date}, £${gig.fee || '?'}
CONTEXT: avg fee £${avg ?? '?'}, ${existing.length} past gigs`,
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
    return { ...res, avgFee: avg };
  } catch { return null; }
}

// ─── OFFER CARD ───────────────────────────────────────────────────────────────
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
  const scoreCol = score >= 75 ? '#059669' : score >= 50 ? '#d97706' : '#dc2626';
  const dateStr = gig.date_start || gig.date;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden"
      style={{ border: '1.5px solid rgba(6,182,212,0.4)', background: '#ffffff', boxShadow: '0 4px 24px rgba(6,182,212,0.12)' }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5"
        style={{ background: 'rgba(6,182,212,0.06)', borderBottom: '1px solid rgba(6,182,212,0.1)' }}>
        <span className="text-[10px] font-black tracking-[0.22em]" style={{ color: '#0891b2' }}>OFFER IN</span>
        <button onClick={expand} className="p-1 active:opacity-50 transition-opacity" style={{ color: '#0891b2' }}>
          <Chevron className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Core info */}
      <div className="px-4 pt-4 pb-3">
        <p className="font-black text-xl leading-tight" style={{ color: '#1c1917' }}>{gig.venue}</p>
        <p className="text-sm mt-1.5 font-mono" style={{ color: '#a8a29e' }}>
          {gig.city}{gig.city && dateStr ? ' · ' : ''}{dateStr}
        </p>
        {gig.fee > 0 && (
          <p className="text-base font-black mt-2" style={{ color: '#059669' }}>£{gig.fee.toLocaleString()}</p>
        )}
        {gig.promoter_name && (
          <p className="text-xs mt-1.5" style={{ color: '#78716c' }}>from {gig.promoter_name}</p>
        )}
      </div>

      {/* AI analysis */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
            style={{ borderTop: '1px solid rgba(6,182,212,0.08)' }}
          >
            <div className="px-4 py-4">
              {loading ? (
                <div className="flex items-center gap-2" style={{ color: '#a8a29e' }}>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="text-xs font-mono">Reading the offer…</span>
                </div>
              ) : ai ? (
                <div className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <span className="font-black text-3xl tabular-nums" style={{ color: scoreCol }}>{ai.score}</span>
                    <span className="text-xs leading-snug" style={{ color: '#94a3b8' }}>{ai.headline}</span>
                  </div>
                  {ai.flags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {ai.flags.map((f, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                          style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', color: '#92400e' }}>
                          ⚠ {f}
                        </span>
                      ))}
                    </div>
                  )}
                  {ai.positives?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {ai.positives.map((p, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                          style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', color: '#065f46' }}>
                          ✓ {p}
                        </span>
                      ))}
                    </div>
                  )}
                  {ai.avgFee && (
                    <p className="text-xs" style={{ color: '#78716c' }}>
                      avg fee on record: £{ai.avgFee.toLocaleString()}
                    </p>
                  )}
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="grid grid-cols-2" style={{ borderTop: '1px solid rgba(6,182,212,0.1)' }}>
        <button
          onClick={() => onReject(gig)}
          disabled={confirming}
          className="py-4 font-black text-sm tracking-widest active:opacity-40 disabled:opacity-30 transition-opacity"
          style={{ color: '#dc2626', borderRight: '1px solid rgba(6,182,212,0.1)' }}
        >
          PASS
        </button>
        <button
          onClick={() => onConfirm(gig)}
          disabled={confirming}
          className="py-4 font-black text-sm tracking-widest active:opacity-40 disabled:opacity-30 transition-opacity"
          style={{ color: '#059669' }}
        >
          {confirming ? '…' : 'CONFIRM'}
        </button>
      </div>
    </motion.div>
  );
}

// ─── NAV SECTIONS ─────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'gigs',     label: 'Gigs',    color: '#0891b2', Icon: Radio },
  { id: 'inbox',   label: 'Inbox',   color: '#ea580c', Icon: Mail },
  { id: 'tasks',   label: 'Tasks',   color: '#dc2626', Icon: CheckSquare },
  { id: 'finance', label: 'Money',   color: '#059669', Icon: PoundSterling },
  { id: 'calendar',label: 'Shows',   color: '#d97706', Icon: CalendarDays },
];

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function CB51Dashboard({ artistId, artistName }) {
  const [active, setActive] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const qc = useQueryClient();

  const { data: pending = [] } = useQuery({
    queryKey: ['pending', artistId],
    queryFn: () => base44.entities.GigOffer?.filter?.({ artist_id: artistId, status: 'manager_reviewing' }).catch(() => []),
    enabled: !!artistId, staleTime: 15000, refetchInterval: 30000,
  });

  const { data: confirmedRaw = [] } = useQuery({
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

  // ── Single source of truth — dedupe confirmed gigs ──
  const confirmed = confirmedRaw.filter((g, i, arr) => arr.findIndex(x => x.id === g.id) === i);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = confirmed
    .filter(g => {
      const d = parseDate(g.date_start || g.date);
      return d && d >= today;
    })
    .sort((a, b) => parseDate(a.date_start || a.date) - parseDate(b.date_start || b.date));

  const nextShow = upcoming[0] ?? null;
  const nextDate = nextShow ? parseDate(nextShow.date_start || nextShow.date) : null;
  const daysUntil = nextDate ? Math.ceil((nextDate - today) / 86400000) : null;

  const openTasks = tasks.filter(t => t.status !== 'done');
  const urgentTasks = openTasks.filter(t => t.priority === 'urgent' || t.priority === 'high');
  const totalBooked = confirmed.reduce((sum, g) => sum + (g.fee || 0), 0);

  const badges = {
    gigs:     pending.length,
    inbox:    messages.length,
    tasks:    openTasks.length,
    finance:  0,
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

  // ── Section view ──────────────────────────────────────────────────────────
  if (active) {
    const sec = SECTIONS.find(s => s.id === active);
    return (
      <div className="min-h-screen" style={{ background: '#f7f5f0', color: '#1c1917' }}>
        <button
          onClick={() => setActive(null)}
          className="flex items-center gap-2 px-4 pt-5 pb-3 active:opacity-50 transition-opacity"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <Back className="w-4 h-4" style={{ color: '#78716c' }} />
          <span className="text-sm font-black tracking-wide" style={{ color: sec?.color }}>{sec?.label}</span>
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

  // ── Greeting ──────────────────────────────────────────────────────────────
  const hour = new Date().getHours();
  const firstName = artistName ? artistName.split(' ')[0] : null;
  const greetWord = hour < 5 ? 'Still up' : hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : hour < 21 ? 'Evening' : 'Late one';
  const greeting = firstName ? `${greetWord}, ${firstName}` : greetWord;

  return (
    <div className="min-h-screen flex flex-col select-none" style={{ background: '#f7f5f0', color: '#1c1917', paddingBottom: 90 }}>

      {/* ── GREETING ── */}
      <div className="px-5 pt-8 pb-5 flex items-center justify-between">
        <div>
          <p className="font-black text-2xl tracking-tight" style={{ color: '#1c1917' }}>{greeting}.</p>
          <p className="text-sm mt-1 font-mono" style={{ color: '#78716c' }}>
            {pending.length > 0
              ? `${pending.length} offer${pending.length > 1 ? 's' : ''} to look at`
              : upcoming.length > 0
              ? `${upcoming.length} show${upcoming.length > 1 ? 's' : ''} locked in`
              : 'All caught up.'}
          </p>
        </div>
        {pending.length > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-10 h-10 rounded-full flex items-center justify-center font-black text-black text-sm"
            style={{ background: '#0891b2' }}
          >
            {pending.length}
          </motion.div>
        )}
      </div>

      {/* ── PENDING OFFER ── */}
      {pending[0] && (
        <div className="px-4 mb-4">
          <OfferCard
            gig={pending[0]}
            onConfirm={confirm}
            onReject={reject}
            confirming={confirming}
            artistId={artistId}
          />
          {pending.length > 1 && (
            <button onClick={() => setActive('gigs')}
              className="w-full text-center py-2 text-xs font-black active:opacity-50 transition-opacity"
              style={{ color: '#0891b2' }}>
              +{pending.length - 1} more offer{pending.length > 2 ? 's' : ''} →
            </button>
          )}
        </div>
      )}

      {/* ── NEXT SHOW ── */}
      <div className="px-4 mb-3">
        <button
          onClick={() => setActive('calendar')}
          className="w-full text-left rounded-2xl p-5 active:scale-[0.98] transition-transform"
          style={{ background: '#ffffff', border: 'rgba(6,182,212,0.12) 1px solid', WebkitTapHighlightColor: 'transparent' }}
        >
          <p className="text-[10px] font-black tracking-widest uppercase mb-3" style={{ color: '#78716c' }}>Next Show</p>
          {nextShow ? (
            <div className="flex items-end justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-black text-2xl leading-tight break-words" style={{ color: '#1c1917' }}>
                  {nextShow.venue}
                </p>
                {nextShow.city && (
                  <p className="text-sm mt-1" style={{ color: '#a8a29e' }}>{nextShow.city}</p>
                )}
                {nextDate && (
                  <p className="text-xs mt-2 font-mono" style={{ color: '#78716c' }}>
                    {nextDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                )}
                {nextShow.fee > 0 && (
                  <p className="text-sm font-black mt-2" style={{ color: '#059669' }}>£{nextShow.fee.toLocaleString()}</p>
                )}
              </div>
              <div className="flex-shrink-0 rounded-xl px-4 py-3 text-center"
                style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.15)' }}>
                <p className="font-black text-4xl leading-none tabular-nums"
                  style={{ color: daysUntil !== null && daysUntil <= 7 ? '#d97706' : '#0891b2' }}>
                  {daysUntil ?? '—'}
                </p>
                <p className="text-[9px] font-mono tracking-widest mt-1" style={{ color: '#78716c' }}>DAYS</p>
              </div>
            </div>
          ) : (
            <div>
              <p className="font-bold text-base" style={{ color: '#a8a29e' }}>Nothing booked yet.</p>
              <p className="text-sm mt-1" style={{ color: '#a8a29e' }}>Forward a gig offer email to start.</p>
            </div>
          )}
        </button>
      </div>

      {/* ── STATS GRID ── */}
      <div className="px-4 grid grid-cols-2 gap-3 mb-3">

        {/* Shows */}
        <button onClick={() => setActive('calendar')}
          className="rounded-2xl p-4 text-left active:scale-95 transition-transform"
          style={{ background: '#ffffff', border: '1px solid rgba(6,182,212,0.2)' }}>
          <Radio className="w-5 h-5 mb-3" style={{ color: '#0891b2' }} />
          <p className="font-black text-3xl leading-none tabular-nums" style={{ color: '#1c1917' }}>{upcoming.length}</p>
          <p className="text-xs mt-1.5 font-semibold" style={{ color: '#78716c' }}>Shows ahead</p>
        </button>

        {/* Tasks */}
        <button onClick={() => setActive('tasks')}
          className="rounded-2xl p-4 text-left active:scale-95 transition-transform"
          style={{
            background: '#ffffff',
            border: urgentTasks.length > 0 ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(6,182,212,0.12)'
          }}>
          <CheckSquare className="w-5 h-5 mb-3" style={{ color: urgentTasks.length > 0 ? '#dc2626' : '#78716c' }} />
          <p className="font-black text-3xl leading-none tabular-nums"
            style={{ color: urgentTasks.length > 0 ? '#dc2626' : '#1c1917' }}>
            {openTasks.length}
          </p>
          <p className="text-xs mt-1.5 font-semibold" style={{ color: '#78716c' }}>
            {urgentTasks.length > 0 ? `${urgentTasks.length} urgent` : 'Open tasks'}
          </p>
        </button>

        {/* Money */}
        <button onClick={() => setActive('finance')}
          className="rounded-2xl p-4 text-left active:scale-95 transition-transform"
          style={{ background: '#ffffff', border: '1px solid rgba(16,185,129,0.2)' }}>
          <PoundSterling className="w-5 h-5 mb-3" style={{ color: '#059669' }} />
          <p className="font-black text-3xl leading-none tabular-nums" style={{ color: '#1c1917' }}>
            £{totalBooked > 0 ? (totalBooked >= 1000 ? `${(totalBooked / 1000).toFixed(1)}k` : totalBooked.toLocaleString()) : '0'}
          </p>
          <p className="text-xs mt-1.5 font-semibold" style={{ color: '#78716c' }}>Booked value</p>
        </button>

        {/* Inbox */}
        <button onClick={() => setActive('inbox')}
          className="rounded-2xl p-4 text-left active:scale-95 transition-transform"
          style={{
            background: '#ffffff',
            border: messages.length > 0 ? '1px solid rgba(249,115,22,0.3)' : '1px solid rgba(6,182,212,0.12)'
          }}>
          <Mail className="w-5 h-5 mb-3" style={{ color: messages.length > 0 ? '#ea580c' : '#78716c' }} />
          <p className="font-black text-3xl leading-none tabular-nums"
            style={{ color: messages.length > 0 ? '#ea580c' : '#1c1917' }}>
            {messages.length}
          </p>
          <p className="text-xs mt-1.5 font-semibold" style={{ color: '#78716c' }}>Messages</p>
        </button>
      </div>

      {/* ── COMING UP (shows 2 onwards, no duplicate of next show) ── */}
      {upcoming.slice(1, 4).length > 0 && (
        <div className="px-4 mb-3">
          <div className="rounded-2xl overflow-hidden"
            style={{ background: '#ffffff', border: '1px solid rgba(6,182,212,0.1)' }}>
            <p className="text-[10px] font-black tracking-widest uppercase px-4 pt-4 pb-2" style={{ color: '#78716c' }}>
              Coming Up
            </p>
            {upcoming.slice(1, 4).map((gig, i) => {
              const d = parseDate(gig.date_start || gig.date);
              const days = d ? Math.ceil((d - today) / 86400000) : null;
              return (
                <button key={gig.id} onClick={() => setActive('calendar')}
                  className="w-full flex items-center justify-between px-4 py-3 text-left active:bg-white/[0.02] transition-colors"
                  style={{ borderTop: '1px solid rgba(6,182,212,0.07)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#059669' }} />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#1c1917' }}>{gig.venue}</p>
                      {gig.city && <p className="text-xs" style={{ color: '#78716c' }}>{gig.city}</p>}
                    </div>
                  </div>
                  {days !== null && (
                    <span className="text-xs font-mono tabular-nums" style={{ color: '#a8a29e' }}>{days}d</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── URGENT TASKS ── */}
      {urgentTasks.length > 0 && (
        <div className="px-4 mb-3">
          <div className="rounded-2xl overflow-hidden"
            style={{ background: '#ffffff', border: '1px solid rgba(239,68,68,0.15)' }}>
            <p className="text-[10px] font-black tracking-widest uppercase px-4 pt-4 pb-2" style={{ color: '#78716c' }}>
              Needs Attention
            </p>
            {urgentTasks.slice(0, 3).map(task => (
              <button key={task.id} onClick={() => setActive('tasks')}
                className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-white/[0.02] transition-colors"
                style={{ borderTop: '1px solid rgba(239,68,68,0.08)' }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#dc2626' }} />
                <p className="text-sm flex-1 truncate font-semibold" style={{ color: '#1c1917' }}>{task.title}</p>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{
                    background: task.priority === 'urgent' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                    color: task.priority === 'urgent' ? '#dc2626' : '#d97706'
                  }}>
                  {task.priority?.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── BOTTOM NAV ── */}
      <div className="fixed bottom-0 left-0 right-0 z-10"
        style={{
          background: 'rgba(247,245,240,0.97)',
          backdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          paddingBottom: 'env(safe-area-inset-bottom)'
        }}>
        <div className="flex">
          {SECTIONS.map(sec => {
            const b = badges[sec.id];
            const hasAlert = b > 0;
            return (
              <button
                key={sec.id}
                onClick={() => setActive(sec.id)}
                className="relative flex-1 flex flex-col items-center gap-1 py-3.5 active:opacity-30 transition-opacity"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {hasAlert && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full"
                    style={{ background: sec.color }} />
                )}
                <div className="relative">
                  <sec.Icon className="w-5 h-5"
                    style={{ color: hasAlert ? sec.color : 'rgba(120,113,108,0.45)' }} />
                  {b > 0 && (
                    <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full text-black text-[8px] font-black flex items-center justify-center"
                      style={{ background: sec.color }}>
                      {b > 9 ? '9' : b}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-semibold"
                  style={{ color: hasAlert ? sec.color : 'rgba(120,113,108,0.45)' }}>
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