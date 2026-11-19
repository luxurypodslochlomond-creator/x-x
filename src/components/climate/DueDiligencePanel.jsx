import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ArrowRight, RefreshCw } from 'lucide-react';

// ── WHAT THE RECORD HOLDS ────────────────────────────────────────────────────
// The questions a research panel asks before it lends its name, each one answered by counting
// rows in the record rather than by asking a model.
//
// There is no score here, and there was one for about an hour. A mark out of ten turns a
// record into a product being rated, and this record is not being sold, ranked or graded —
// it is being kept. So the same counts are shown as plain facts: what is held, and what is
// still open. Nothing is hidden because it looks bad; nothing is dressed up because it looks
// good. A person reading it in fifty years gets the state of the thing, not a verdict on it.
export default function DueDiligencePanel() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await base44.functions.invoke('climateDueDiligence', {});
      if (res.data?.error) {
        setError(res.data.error);
        return;
      }
      setData(res.data);
    } catch (e) {
      setError('The check could not be run just now.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading && !data) {
    return (
      <div className="flex items-center gap-2 py-10">
        <div
          className="w-5 h-5 rounded-full animate-spin"
          style={{ border: '2px solid rgba(20,18,16,0.15)', borderTopColor: '#b3261e' }}
        />
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#5a5246]">Running the checks</span>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="border-2 border-[#b3261e] bg-[#b3261e]/5 p-4">
        <p className="text-[12px] font-mono leading-relaxed text-[#141210]">{error}</p>
        <button onClick={load} className="mt-3 flex items-center gap-2 text-[11px] font-black font-mono uppercase text-[#b3261e]">
          <RefreshCw className="w-3.5 h-3.5" /> Run it again
        </button>
      </div>
    );
  }

  const { rows, counts, as_of } = data;
  return (
    <div>
      <div className="flex items-stretch border-2 border-[#141210] bg-[#efe7d6] mb-3">
        <div className="px-3 py-3 min-w-0 flex-1">
          <p className="text-[11px] font-black font-mono uppercase tracking-[0.12em] text-[#141210]">
            What the record holds, today
          </p>
          <p className="text-[10px] font-mono leading-snug text-[#5a5246] mt-1">
            {counts.published} published · {counts.seals} sealed · {counts.checks} checks · {counts.keepers} custodians ·{' '}
            {counts.checkers} witnesses
          </p>
          <p className="text-[9px] font-mono text-[#8a8375] mt-1">
            run {new Date(as_of).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <button
          onClick={load}
          aria-label="Run the checks again"
          className="px-3 border-l-2 border-[#141210] text-[#141210] active:bg-[#141210]/10"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="border-2 border-[#141210] divide-y divide-[#141210]/15">
        {rows.map((r) => (
          <div key={r.key} className="px-3 py-2.5 bg-[#f7f1e5]">
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-[11.5px] font-black leading-snug text-[#141210]">{r.test}</p>
                {!r.pass && (
                  <span className="flex-shrink-0 text-[9px] font-black font-mono uppercase tracking-[0.1em] text-[#b3261e]">
                    still open
                  </span>
                )}
              </div>
              <p className="text-[10.5px] font-mono leading-relaxed text-[#5a5246] mt-1">{r.detail}</p>
              {r.fix ? (
                <Link
                  to={r.fix.to}
                  className="inline-flex items-center gap-1 mt-1.5 text-[9.5px] font-black font-mono uppercase tracking-[0.1em] text-[#b3261e] underline decoration-2 underline-offset-2"
                >
                  {r.fix.label} <ArrowRight className="w-3 h-3" />
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] font-mono leading-relaxed text-[#5a5246] mt-4 border-t border-[#141210]/15 pt-3">
        No mark, no grade, no percentage: the record is not being sold or rated, and a number out of ten would
        only invite someone to chase it. These are counts, and every one can be checked against the record
        itself. A machine&apos;s approval is not among them — an AI nodding at a record is an opinion with no
        evidence behind it, and anyone would be right to disregard it. Run it again as the record changes; the
        facts are allowed to move, and they are meant to.
      </p>
    </div>
  );
}