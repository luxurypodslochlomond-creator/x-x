import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { RefreshCw, ArrowRight } from 'lucide-react';
import DeskOrientation from '@/components/admin/DeskOrientation';

// One page, counted when you open it. The record has enough doors now that a keeper can lose
// ten minutes finding out whether anything is waiting, and a record nobody can see the state of
// is a record that quietly stops being tended. Nothing here changes anything: it is a window,
// and every number is a way in to the page where the work actually happens.
// A number you cannot open is a number you have to remember where to act on. Each figure now
// carries the door to the page where that number is actually dealt with: waiting goes to the
// queue, unopened goes to the room where a source is opened, and checks goes to who is checking.
const Figure = ({ value, label, tone, note, to }) => {
  const body = (
    <>
      <p className="text-2xl font-black leading-none mb-1" style={{ color: tone }}>
        {value}
      </p>
      <p className="text-[9px] font-mono font-black uppercase tracking-[0.15em] text-record-ink">{label}</p>
      {note && <p className="text-[9px] font-mono text-record-muted mt-1 leading-tight">{note}</p>}
      {to && <span className="block text-[8px] font-mono uppercase tracking-[0.15em] text-record-muted mt-1.5">open</span>}
    </>
  );
  const box = 'border-2 border-record-ink/20 bg-record-bone p-3';
  return to
    ? <Link to={to} className={`${box} block active:bg-record-paper`}>{body}</Link>
    : <div className={box}>{body}</div>;
};

// A figure that is also a door when there is somewhere to go, and just a figure when there is
// not. A keeper is never sent through a door that would refuse her.
const Panel = ({ to, className, children }) =>
  to ? <Link to={to} className={className}>{children}</Link> : <div className={className}>{children}</div>;

export default function AdminClimateDesk({ plain = false }) {
  const [d, setD] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (fresh = false) => {
    setLoading(true);
    setError('');
    try {
      const res = await base44.functions.invoke('climateDeskStats', fresh ? { fresh: true } : {});
      setD(res.data);
    } catch (e) {
      setError(e?.response?.data?.error || 'That did not load. Try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // The desk is a counted page, so it is always a moment behind the finger. It shows itself
  // straight away and fills in, rather than holding a blank screen until the count is done.
  if (loading && !d) {
    return (
      <div className="pb-16">
        <div className="max-w-2xl mx-auto px-4 pt-8">
          <p className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-record-red mb-1">the shed</p>
          <h1 className="font-black text-record-ink text-2xl leading-tight mb-1">The record, at a glance.</h1>
          <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-record-muted mb-6 animate-pulse">counting</p>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="border-2 border-record-ink/10 bg-record-bone p-3 animate-pulse">
                <div className="h-5 w-8 bg-record-ink/10 mb-2" />
                <div className="h-2 w-full bg-record-ink/10" />
              </div>
            ))}
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="border-2 border-record-ink/10 bg-record-bone p-3 mb-2 animate-pulse">
              <div className="h-2 w-1/3 bg-record-ink/10 mb-2" />
              <div className="h-2 w-2/3 bg-record-ink/10" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error && !d) {
    return (
      <div className="min-h-[60vh] bg-record-paper px-5 py-16">
        <p className="text-[11px] font-mono text-record-red">{error}</p>
      </div>
    );
  }

  // A keeper reads this desk through the record's own door, not the building's. Her queue is her
  // room, and the pages that belong to the building's admins are simply not offered to her — a
  // link that ends in "Admins only" is a dead end dressed up as a way through.
  const isAdmin = d?.isAdmin !== false;

  return (
    <div className={plain ? 'pb-4' : 'pb-16'}>
      <div className={plain ? '' : 'max-w-2xl mx-auto px-4 pt-8'}>
        {/* Opened as a room inside the shed, the page's own name and eyebrow would be the
            room announcing itself inside itself. The count and the figure a keeper can tap
            are the only things that need to be here. */}
        <div className="flex items-start justify-between gap-3 mb-1">
          {plain ? (
            <p className="text-[13px] text-[#3a342c]" style={{ fontFamily: 'var(--font-reading)' }}>
              What the record holds, counted just now.
            </p>
          ) : (
            <p className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-record-red">the shed</p>
          )}
          <button onClick={() => load(true)} className="inline-flex items-center gap-1 min-h-[32px] text-[12px] text-[#6b5f4f] active:text-[#b3261e]" style={{ fontFamily: 'var(--font-reading)' }}>
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> count again
          </button>
        </div>
        {!plain && <h1 className="font-black text-record-ink text-2xl leading-tight mb-1">The record, at a glance.</h1>}
        <p className="record-meta text-record-muted mb-5">
          counted {new Date(d.as_of).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {/* Every figure is a way to the room where that number is dealt with — and for a
              keeper those rooms are the shed's own doors, never a page that answers
              "Admins only" the moment it opens. */}
          <Figure value={d.waitingTotal} label="waiting" tone="#1a1612" note="held for a person" to={isAdmin ? '/AdminClimateReview' : '/ClimateKeeperRoom?tab=decide'} />
          <Figure value={d.unchecked} label="unopened" tone="#b3261e" note="no one has checked" to="/ClimateKeeperRoom?tab=check" />
          <Figure value={d.recentChecks} label="checks / 7d" tone="#1e3a2b" note="last seven days" to={isAdmin ? '/AdminClimateCheckers' : undefined} />
        </div>

        {/* A keeper's way in to the work itself, one tap from the counts — dropped when the
            desk is opened as a room inside the shed, because the doors are already above it. */}
        {!isAdmin && !plain && (
          <Link to="/ClimateKeeperRoom" className="flex items-center justify-between border-2 border-record-red bg-record-red/5 px-3 py-3 mb-6">
            <span>
              <span className="block text-[10px] font-mono font-black uppercase tracking-[0.15em] text-record-red">your room</span>
              <span className="block text-[11px] font-mono text-record-ink/75 mt-1">Everything waiting, one tap each: yes, or not yet.</span>
            </span>
            <ArrowRight className="w-4 h-4 text-record-red flex-shrink-0" />
          </Link>
        )}

        <DeskOrientation />

        {d.contested > 0 && (
          <Link to="/AdminClimateReview" className="block border-2 border-record-red bg-record-red/5 p-3 mb-6">
            <p className="text-[10px] font-mono font-black uppercase tracking-[0.15em] text-record-red">
              {d.contested} {d.contested === 1 ? 'check says' : 'checks say'} the source does not hold
            </p>
            <p className="text-[11px] font-mono text-record-ink/70 mt-1">Read what they found, then decide.</p>
          </Link>
        )}

        <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-record-ink mb-2">waiting, by kind</p>
        <Panel to={isAdmin ? '/AdminClimateReview' : '/ClimateKeeperRoom'} className="block bg-record-bone border-2 border-record-ink/20 divide-y divide-record-ink/10 mb-2">
          {d.waiting.map((k) => (
            <div key={k.type} className="flex items-center justify-between px-3 py-2">
              <span className="text-[11px] font-mono text-record-ink">{k.label}</span>
              <span className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-record-muted">{k.published} on the record</span>
                <span className="text-[12px] font-black text-record-ink w-6 text-right">{k.waiting}</span>
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.15em] text-record-ink">
              {isAdmin ? 'open the review queue' : 'open your room'}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-record-ink" />
          </div>
        </Panel>

        <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-record-ink mt-6 mb-2">who is checking</p>
        <Panel to={isAdmin ? '/AdminClimateCheckers' : null} className="block bg-record-bone border-2 border-record-ink/20 divide-y divide-record-ink/10 mb-2">
          {!d.checkers.length && (
            <p className="px-3 py-3 text-[11px] font-mono text-record-muted">
              Nobody on the list yet. Add one and they get an invitation.
            </p>
          )}
          {d.checkers.map((c) => (
            <div key={c.id} className="flex items-center justify-between px-3 py-2">
              <span className="min-w-0">
                <span className="text-[11px] font-mono text-record-ink block truncate">
                  {c.name || c.email}
                  {c.is_keeper ? <span className="text-[9px] font-black uppercase tracking-[0.15em] text-record-red"> · keys</span> : null}
                </span>
                <span className="text-[9px] font-mono text-record-muted block truncate">{c.email}</span>
              </span>
              <span className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[9px] font-mono uppercase" style={{ color: c.active ? '#1e3a2b' : '#b3261e' }}>
                  {c.active ? (c.is_keeper ? 'keeper' : 'checking') : 'paused'}
                </span>
                <span className="text-[11px] font-mono text-record-muted">{c.notes} notes</span>
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.15em] text-record-ink">
              {isAdmin ? 'the guest list' : 'the whole list, in one place'}
            </span>
            {isAdmin && <ArrowRight className="w-3.5 h-3.5 text-record-ink" />}
          </div>
        </Panel>

        <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-record-ink mt-6 mb-2">the diary</p>
        <Panel to={isAdmin ? '/AdminClimateLog' : null} className="block bg-record-bone border-2 border-record-ink/20 divide-y divide-record-ink/10 mb-2">
          {!d.log.length && <p className="px-3 py-3 text-[11px] font-mono text-record-muted">Nothing written yet.</p>}
          {d.log.slice(0, 4).map((l) => (
            <div key={l.id} className="px-3 py-2">
              <p className="text-[9px] font-mono uppercase text-record-muted">
                {l.kind} · {l.entry_date}
                {l.pinned ? ' · held at the top' : ''}
              </p>
              <p className="text-[11px] font-mono text-record-ink leading-snug">{l.title}</p>
            </div>
          ))}
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.15em] text-record-ink">
              {d.openNext} still owed
            </span>
            {isAdmin && <ArrowRight className="w-3.5 h-3.5 text-record-ink" />}
          </div>
        </Panel>

        <div className="grid grid-cols-2 gap-2 mt-6">
          {[
            // Every tool the record needs, reachable from this one screen. A keeper should
            // never have to remember an address to tend the thing they are responsible for.
            ...(plain ? [] : [{ to: '/ClimateKeeperRoom', label: 'your room' }]),
            ...(isAdmin
              ? [
                  { to: '/AdminClimateReview', label: 'review queue' },
                  { to: '/AdminClimateCheckers', label: 'the guest list' },
                  { to: '/AdminClimateLog', label: "keeper's log" },
                  { to: '/AdminClimateCategories', label: 'categories' },
                  { to: '/AdminClimatePhotos', label: 'top crawl' },
                ]
              : []),
            { to: '/ClimateCorrections', label: 'corrections' },
            { to: '/ClimateMethod', label: 'the method' },
            { to: '/ClimateHandover', label: 'handover' },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="flex items-center justify-between min-h-[44px] px-3 border-2 border-record-ink/20 bg-record-bone text-[10px] font-mono font-black uppercase tracking-[0.12em] text-record-ink"
            >
              {l.label} <ArrowRight className="w-3 h-3" />
            </Link>
          ))}
        </div>

        <p className="text-[10px] font-mono text-record-muted leading-relaxed mt-8 border-t border-record-ink/15 pt-4">
          {d.lastSweep
            ? `Last automatic source sweep: ${d.lastSweep.entry_date} · ${d.lastSweep.title}`
            : 'No automatic source sweep has been written to the diary yet.'}
        </p>
      </div>
    </div>
  );
}