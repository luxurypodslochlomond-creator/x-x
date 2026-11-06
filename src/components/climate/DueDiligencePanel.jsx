import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ArrowRight, Check, RefreshCw, X } from 'lucide-react';

// ── THE DUE DILIGENCE PASS, ON THE PAGE ──────────────────────────────────────
// Ten questions a research panel asks before it lends its name, each one counted from the
// record rather than answered by a model. The score is the number of rows that are true —
// nothing else. It is shown to the keeper first, because it is far more useful as a list of
// what is missing than as a mark.
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

  const { score, rows, counts, as_of } = data;
  const open = rows.filter((r) => !r.pass);

  return (
    <div>
      <div className="flex items-stretch border-2 border-[#141210] bg-[#efe7d6] mb-3">
        <div className="flex flex-col justify-center px-4 py-3 border-r-2 border-[#141210] flex-shrink-0">
          <p className="text-[28px] font-black leading-none text-[#141210]" style={{ fontFamily: 'var(--font-display)' }}>
            {score.passed}
            <span className="text-[#8a8375]">/{score.total}</span>
          </p>
          <p className="text-[9px] font-mono font-black uppercase tracking-[0.16em] text-[#5a5246] mt-1">{score.percent}%</p>
        </div>
        <div className="px-3 py-3 min-w-0">
          <p className="text-[11px] font-black font-mono uppercase tracking-[0.12em] text-[#141210]">
            {open.length === 0 ? 'Nothing outstanding' : `${open.length} still open`}
          </p>
          <p className="text-[10px] font-mono leading-snug text-[#5a5246] mt-1">
            {counts.published} published · {counts.seals} sealed · {counts.checks} checks · {counts.keepers} keepers ·{' '}
            {counts.checkers} checkers
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
          <div key={r.key} className="flex items-start gap-2 px-3 py-2.5 bg-[#f7f1e5]">
            <span
              className="flex-shrink-0 w-5 h-5 flex items-center justify-center border-2 mt-0.5"
              style={{
                borderColor: r.pass ? '#1e3a2b' : '#b3261e',
                background: r.pass ? '#1e3a2b' : 'transparent',
              }}
            >
              {r.pass ? <Check className="w-3 h-3 text-[#f4efe4]" /> : <X className="w-3 h-3 text-[#b3261e]" />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11.5px] font-black leading-snug text-[#141210]">{r.test}</p>
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
        Ten questions, each answered by counting rows rather than by asking a model. A machine&apos;s approval
        would be an opinion with no evidence behind it, and a panel would be right to disregard it — so it is not
        counted here at all. This is what the record actually holds, and it is meant to be run again as the
        record changes.
      </p>
    </div>
  );
}