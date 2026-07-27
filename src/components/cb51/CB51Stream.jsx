import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Check, X, Plus, Home, User, AlertTriangle, CalendarClock } from 'lucide-react';
import CB51GigUploadParser from './CB51GigUploadParser';

const PAPER = '#f7f5f0';
const CARD = '#ffffff';
const INK = '#1c1917';
const MUTED = '#78716c';
const SOFT = '#57534e';
const CYAN = '#0891b2';
const CYAN_SOFT = 'rgba(8,145,178,0.10)';
const DANGER = '#c2410c';
const DANGER_SOFT = 'rgba(194,65,12,0.10)';
const GOOD = '#15803d';
const LINE = 'rgba(28,25,23,0.06)';

const daysUntil = (d) => {
  if (!d) return null;
  const t = new Date(d); if (isNaN(t)) return null;
  const now = new Date(); now.setHours(0, 0, 0, 0);
  return Math.round((t - now) / 86400000);
};
const fmtDay = (d) => (d === 0 ? 'today' : d === 1 ? 'tomorrow' : d < 0 ? `${Math.abs(d)}d late` : `in ${d}d`);
const money = (n, cur) => {
  if (n == null) return null;
  const sym = (cur === 'USD' ? '$' : cur === 'EUR' ? '€' : '£');
  return `${sym}${Number(n).toLocaleString()}`;
};

const verdictCache = new Map();
function useGigVerdict(offer) {
  const key = offer?.id;
  const [state, setState] = useState({ loading: false, verdict: null, flags: [] });
  useEffect(() => {
    if (!key) return;
    if (verdictCache.has(key)) { setState(verdictCache.get(key)); return; }
    let cancelled = false;
    setState({ loading: true, verdict: null, flags: [] });
    (async () => {
      try {
        const prompt = `You are a calm, honest artist-manager's assistant. A gig offer just came in. Give ONE short sentence in plain English on whether it's worth taking (fee vs a typical UK gig, how soon it is, any obvious concern). Then list 0-2 red flags, each under 5 words. No hype, no emoji. Offer: venue="${offer.venue || offer.title || ''}", date="${offer.date_start || offer.date || ''}", fee=${offer.fee == null ? 'unknown' : offer.fee} ${offer.currency || 'GBP'}, promoter="${offer.promoter_name || offer.promoter || ''}". Reply as JSON {"verdict": string, "flags": string[]}.`;
        const res = await base44.integrations.Core.InvokeLLM({
          prompt,
          response_json_schema: { type: 'object', properties: { verdict: { type: 'string' }, flags: { type: 'array', items: { type: 'string' } } } },
        });
        if (cancelled) return;
        const v = { loading: false, verdict: res?.verdict || null, flags: Array.isArray(res?.flags) ? res.flags.slice(0, 2) : [] };
        verdictCache.set(key, v);
        setState(v);
      } catch {
        if (!cancelled) setState({ loading: false, verdict: null, flags: [] });
      }
    })();
    return () => { cancelled = true; };
  }, [key]);
  return state;
}

function OfferVerdict({ offer }) {
  const v = useGigVerdict(offer);
  if (!v.loading && !v.verdict && v.flags.length === 0) return null;
  return (
    <div className="mt-1.5">
      {v.loading && <p className="text-xs italic" style={{ color: MUTED }}>reading the offer…</p>}
      {v.verdict && <p className="text-xs leading-snug" style={{ color: SOFT }}>{v.verdict}</p>}
      {v.flags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {v.flags.map((f, i) => (
            <span key={i} className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: DANGER_SOFT, color: DANGER }}>{f}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CB51Stream({ artistId, artistName }) {
  const [showAdd, setShowAdd] = useState(false);
  const [busy, setBusy] = useState(null);
  const qc = useQueryClient();

  const { data: pending = [] } = useQuery({
    queryKey: ['streamPending', artistId],
    queryFn: () => base44.entities.GigOffer?.filter?.({ artist_id: artistId, status: 'manager_reviewing' }).catch(() => []),
    enabled: !!artistId, staleTime: 20000,
  });
  const { data: invoices = [] } = useQuery({
    queryKey: ['streamInvoices', artistId],
    queryFn: () => base44.entities.CB51Invoice?.filter?.({ artist_id: artistId, status: 'unpaid' }).catch(() => []),
    enabled: !!artistId, staleTime: 30000,
  });
  const { data: tasks = [] } = useQuery({
    queryKey: ['streamTasks', artistId],
    queryFn: () => base44.entities.CB51Task?.filter?.({ artist_id: artistId }).catch(() => []),
    enabled: !!artistId, staleTime: 30000,
  });
  const { data: confirmed = [] } = useQuery({
    queryKey: ['streamConfirmed', artistId],
    queryFn: () => base44.entities.GigOffer?.filter?.({ artist_id: artistId, status: 'confirmed' }).catch(() => []),
    enabled: !!artistId, staleTime: 30000,
  });

  const needs = useMemo(() => {
    const items = [];
    pending.forEach(g => items.push({ kind: 'offer', id: g.id, data: g }));
    invoices.forEach(inv => items.push({ kind: 'invoice', id: inv.id, data: inv }));
    tasks.forEach(t => {
      if (t.status === 'done') return;
      const d = daysUntil(t.deadline);
      if (d !== null && d <= 1) items.push({ kind: 'task', id: t.id, data: t });
    });
    return items;
  }, [pending, invoices, tasks]);

  const upcoming = useMemo(() =>
    confirmed
      .map(g => ({ g, d: daysUntil(g.date_start || g.date) }))
      .filter(x => x.d !== null && x.d >= 0)
      .sort((a, b) => a.d - b.d)
      .slice(0, 4),
    [confirmed]);

  const refresh = () => {
    ['streamPending', 'streamConfirmed', 'streamInvoices', 'streamTasks'].forEach(k =>
      qc.invalidateQueries({ queryKey: [k, artistId] }));
  };
  const act = async (key, fn) => {
    setBusy(key);
    try { await fn(); } finally { setBusy(null); refresh(); }
  };

  const firstName = artistName ? artistName.split(' ')[0] : null;

  return (
    <div className="h-full flex flex-col" style={{ background: PAPER, color: INK }}>
      <div className="px-5 pt-3 pb-1">
        {firstName && (
          <p className="text-[11px] font-mono tracking-[0.2em] uppercase" style={{ color: MUTED }}>{firstName} · today</p>
        )}
        <h1 className="text-[26px] font-black leading-tight mt-1" style={{ letterSpacing: '-0.02em' }}>
          What needs you today
        </h1>
      </div>

      <div className="flex-1 px-5 pb-28 overflow-y-auto">
        {needs.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-20 text-center px-6">
            <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: CYAN_SOFT }}>
              <Check className="w-7 h-7" style={{ color: GOOD }} />
            </div>
            <p className="text-lg font-black" style={{ color: INK }}>All caught up</p>
            <p className="text-sm mt-1" style={{ color: MUTED }}>Nothing needs you right now. Take a breath.</p>
          </motion.div>
        ) : (
          <div className="space-y-3 mt-3">
            <AnimatePresence initial={false}>
              {needs.map(item => (
                <StreamCard key={`${item.kind}:${item.id}`} item={item} busy={busy} act={act} artistId={artistId} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {upcoming.length > 0 && (
          <div className="mt-8">
            <p className="text-[11px] font-mono tracking-[0.2em] uppercase mb-3 flex items-center gap-1.5" style={{ color: MUTED }}>
              <CalendarClock className="w-3.5 h-3.5" /> Upcoming
            </p>
            <div className="space-y-2">
              {upcoming.map(({ g, d }) => (
                <div key={g.id} className="flex items-center justify-between px-4 py-3 rounded-xl"
                  style={{ background: CARD, border: `1px solid ${LINE}` }}>
                  <div className="min-w-0">
                    <p className="font-bold truncate text-sm" style={{ color: INK }}>{g.venue || g.title || 'Gig'}</p>
                    <p className="text-xs mt-0.5" style={{ color: MUTED }}>{g.date_start || g.date}</p>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: CYAN_SOFT, color: CYAN }}>
                    {fmtDay(d)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomBar onAdd={() => setShowAdd(true)} />

      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end" style={{ background: 'rgba(28,25,23,0.45)' }}
            onClick={() => setShowAdd(false)}>
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="w-full rounded-t-3xl p-5 pb-8 max-h-[85vh] overflow-y-auto"
              style={{ background: PAPER }}
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-black" style={{ color: INK }}>Add an offer</h2>
                <button onClick={() => setShowAdd(false)} className="p-2"><X className="w-5 h-5" style={{ color: MUTED }} /></button>
              </div>
              <CB51GigUploadParser
                artistId={artistId}
                onSuccess={() => { setShowAdd(false); refresh(); }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StreamCard({ item, busy, act, artistId }) {
  const { kind, id, data } = item;
  const key = `${kind}:${id}`;
  const isBusy = busy === key;

  if (kind === 'offer') {
    const d = daysUntil(data.date_start || data.date);
    const fee = money(data.fee, data.currency);
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -8 }}
        className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${LINE}` }}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-mono tracking-[0.18em] uppercase mb-1" style={{ color: CYAN }}>Offer in</p>
            <p className="font-black text-base leading-tight truncate" style={{ color: INK }}>{data.venue || data.title || 'Gig'}</p>
            <p className="text-sm mt-0.5" style={{ color: SOFT }}>
              {data.date_start || data.date}{fee ? ` · ${fee}` : ''}
            </p>
            {data.promoter_name && <p className="text-xs mt-1" style={{ color: MUTED }}>{data.promoter_name}</p>}
            <OfferVerdict offer={data} />
          </div>
          {d !== null && (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap"
              style={{ background: d < 0 ? DANGER_SOFT : CYAN_SOFT, color: d < 0 ? DANGER : CYAN }}>
              {fmtDay(d)}
            </span>
          )}
        </div>
        <div className="flex gap-2 mt-3">
          <button
            disabled={isBusy}
            onClick={() => act(key, () => base44.entities.GigOffer.update(id, { status: 'rejected_by_manager' }))}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors disabled:opacity-40"
            style={{ background: 'rgba(28,25,23,0.04)', color: SOFT }}>
            Pass
          </button>
          <button
            disabled={isBusy}
            onClick={() => act(key, async () => {
              await base44.entities.GigOffer.update(id, { status: 'confirmed', manager_approved: true });
              base44.functions.invoke('sendGigConfirmationPush', {
                artistId, gigId: id, gigVenue: data.venue, gigDate: data.date_start, gigFee: data.fee
              }).catch(() => {});
            })}
            className="flex-1 py-2.5 rounded-xl text-sm font-black text-white transition-colors disabled:opacity-40"
            style={{ background: CYAN }}>
            {isBusy ? '…' : 'Take'}
          </button>
        </div>
      </motion.div>
    );
  }

  if (kind === 'invoice') {
    const amt = money(data.amount, data.currency);
    const d = daysUntil(data.date);
    const overdue = d !== null && d < 0;
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -8 }}
        className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${LINE}` }}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-mono tracking-[0.18em] uppercase mb-1 flex items-center gap-1" style={{ color: DANGER }}>
              <AlertTriangle className="w-3 h-3" /> {overdue ? 'Overdue' : 'Unpaid'}
            </p>
            <p className="font-black text-base leading-tight truncate" style={{ color: INK }}>{data.description || 'Invoice'}</p>
            <p className="text-sm mt-0.5" style={{ color: SOFT }}>{amt}{data.date ? ` · due ${data.date}` : ''}</p>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            disabled={isBusy}
            onClick={() => act(key, () => base44.entities.CB51Invoice.update(id, { status: 'paid' }))}
            className="flex-1 py-2.5 rounded-xl text-sm font-black text-white transition-colors disabled:opacity-40"
            style={{ background: GOOD }}>
            {isBusy ? '…' : 'Mark paid'}
          </button>
        </div>
      </motion.div>
    );
  }

  // task
  const d = daysUntil(data.deadline);
  const overdue = d !== null && d < 0;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -8 }}
      className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${LINE}` }}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-mono tracking-[0.18em] uppercase mb-1" style={{ color: overdue ? DANGER : MUTED }}>
            {overdue ? 'Overdue' : 'Due today'}
          </p>
          <p className="font-black text-base leading-tight truncate" style={{ color: INK }}>{data.title}</p>
          {data.responsible_name && <p className="text-xs mt-1" style={{ color: MUTED }}>{data.responsible_name}</p>}
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          disabled={isBusy}
          onClick={() => act(key, () => base44.entities.CB51Task.update(id, { status: 'done' }))}
          className="flex-1 py-2.5 rounded-xl text-sm font-black text-white transition-colors disabled:opacity-40"
          style={{ background: INK }}>
          {isBusy ? '…' : 'Done'}
        </button>
      </div>
    </motion.div>
  );
}

function BottomBar({ onAdd }) {
  const [active, setActive] = useState('home');
  const NavBtn = ({ id, icon: Icon, label, onClick }) => {
    const on = active === id;
    return (
      <button
        onClick={() => { setActive(id); onClick && onClick(); }}
        className="flex flex-col items-center gap-1 flex-1 py-2">
        <Icon className="w-5 h-5" style={{ color: on ? CYAN : MUTED }} />
        <span className="text-[10px] font-bold tracking-wide" style={{ color: on ? CYAN : MUTED }}>{label}</span>
      </button>
    );
  };
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 px-4 pb-4 pt-6"
      style={{ background: 'linear-gradient(to top, #f7f5f0 60%, rgba(247,245,240,0))' }}>
      <div className="mx-auto w-full max-w-sm flex items-center rounded-2xl px-2"
        style={{ background: CARD, border: `1px solid ${LINE}`, boxShadow: '0 6px 24px rgba(28,25,23,0.07)' }}>
        <NavBtn id="home" icon={Home} label="Home" />
        <div className="flex items-center justify-center">
          <button onClick={onAdd}
            className="w-12 h-12 -my-2 rounded-full flex items-center justify-center"
            style={{ background: CYAN, boxShadow: '0 6px 18px rgba(8,145,178,0.35)' }}>
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>
        <NavBtn id="you" icon={User} label="You" />
      </div>
    </div>
  );
}