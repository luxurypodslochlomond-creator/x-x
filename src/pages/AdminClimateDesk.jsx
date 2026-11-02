import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { RefreshCw, ArrowRight } from 'lucide-react';

// One page, counted when you open it. The record has enough doors now that a keeper can lose
// ten minutes finding out whether anything is waiting, and a record nobody can see the state of
// is a record that quietly stops being tended. Nothing here changes anything: it is a window,
// and every number is a way in to the page where the work actually happens.
const Figure = ({ value, label, tone, note }) => (
  <div className="border-2 border-record-ink/20 bg-record-bone p-3">
    <p className="text-2xl font-black leading-none mb-1" style={{ color: tone }}>
      {value}
    </p>
    <p className="text-[9px] font-mono font-black uppercase tracking-[0.15em] text-record-ink">{label}</p>
    {note && <p className="text-[9px] font-mono text-record-muted mt-1 leading-tight">{note}</p>}
  </div>
);

export default function AdminClimateDesk() {
  const [d, setD] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await base44.functions.invoke('climateDeskStats', {});
      setD(res.data);
    } catch (e) {
      setError(e?.response?.data?.error || 'That did not load. Try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading && !d) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-record-paper">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-record-muted">counting</span>
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

  return (
    <div className="min-h-screen bg-record-paper pb-24">
      <div className="max-w-2xl mx-auto px-4 pt-8">
        <div className="flex items-start justify-between gap-3 mb-1">
          <p className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-record-red">the desk</p>
          <button onClick={load} className="inline-flex items-center gap-1 text-[9px] font-mono uppercase text-record-muted">
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> count again
          </button>
        </div>
        <h1 className="font-black text-record-ink text-2xl leading-tight mb-1">The record, at a glance.</h1>
        <p className="text-[10px] font-mono text-record-muted mb-6">
          counted {new Date(d.as_of).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </p>

        <div className="grid grid-cols-3 gap-2 mb-6">
          <Figure value={d.waitingTotal} label="waiting" tone="#1a1612" note="held for a person" />
          <Figure value={d.unchecked} label="unopened" tone="#b3261e" note="no one has checked" />
          <Figure value={d.recentChecks} label="checks / 7d" tone="#1e3a2b" note="last seven days" />
        </div>

        {d.contested > 0 && (
          <Link to="/AdminClimateReview" className="block border-2 border-record-red bg-record-red/5 p-3 mb-6">
            <p className="text-[10px] font-mono font-black uppercase tracking-[0.15em] text-record-red">
              {d.contested} {d.contested === 1 ? 'check says' : 'checks say'} the source does not hold
            </p>
            <p className="text-[11px] font-mono text-record-ink/70 mt-1">Read what they found, then decide.</p>
          </Link>
        )}

        <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-record-ink mb-2">waiting, by kind</p>
        <Link to="/AdminClimateReview" className="block bg-record-bone border-2 border-record-ink/20 divide-y divide-record-ink/10 mb-2">
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
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.15em] text-record-ink">open the review queue</span>
            <ArrowRight className="w-3.5 h-3.5 text-record-ink" />
          </div>
        </Link>

        <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-record-ink mt-6 mb-2">who is checking</p>
        <Link to="/AdminClimateCheckers" className="block bg-record-bone border-2 border-record-ink/20 divide-y divide-record-ink/10 mb-2">
          {!d.checkers.length && (
            <p className="px-3 py-3 text-[11px] font-mono text-record-muted">
              Nobody on the list yet. Add one and they get an invitation.
            </p>
          )}
          {d.checkers.map((c) => (
            <div key={c.id} className="flex items-center justify-between px-3 py-2">
              <span className="min-w-0">
                <span className="text-[11px] font-mono text-record-ink block truncate">{c.name || c.email}</span>
                <span className="text-[9px] font-mono text-record-muted block truncate">{c.email}</span>
              </span>
              <span className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[9px] font-mono uppercase" style={{ color: c.active ? '#1e3a2b' : '#b3261e' }}>
                  {c.active ? 'checking' : 'paused'}
                </span>
                <span className="text-[11px] font-mono text-record-muted">{c.notes} notes</span>
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.15em] text-record-ink">the guest list</span>
            <ArrowRight className="w-3.5 h-3.5 text-record-ink" />
          </div>
        </Link>

        <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-record-ink mt-6 mb-2">the diary</p>
        <Link to="/AdminClimateLog" className="block bg-record-bone border-2 border-record-ink/20 divide-y divide-record-ink/10 mb-2">
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
            <ArrowRight className="w-3.5 h-3.5 text-record-ink" />
          </div>
        </Link>

        <div className="grid grid-cols-2 gap-2 mt-6">
          {[
            { to: '/ClimateCorrections', label: 'corrections' },
            { to: '/ClimateMethod', label: 'the method' },
            { to: '/ClimateHandover', label: 'handover' },
            { to: '/AdminClimateLog', label: "keeper's log" },
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