import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { RefreshCw, Search, AlertTriangle, Check, Link2 } from 'lucide-react';

// THE PROVENANCE SWEEP, in one small panel.
//
// Two taps, and the machine has found every entry on the record with no link to its origin
// and offered a candidate for the first few. The second tap holds them back. Nothing is
// written into a source link automatically — a machine-written origin would look verified
// and be worthless, so the person keeps that one word.

export default function ProvenanceSweep() {
  const [report, setReport] = useState(null);
  const [busy, setBusy] = useState(false);

  const run = async (apply) => {
    setBusy(true);
    try {
      const res = await base44.functions.invoke('climateSweepSources', { apply });
      const data = res?.data ?? res;
      if (data?.error) throw new Error(data.error);
      setReport(data);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mb-4 bg-[#efe7d6] border-2 border-[#1a1612]/25 p-3">
      <div className="flex items-center gap-2 mb-2">
        <Link2 className="w-3.5 h-3.5 text-[#b3261e] flex-shrink-0" />
        <span className="text-[10px] font-black font-mono uppercase text-[#1a1612]">Provenance sweep</span>
        <span className="text-[9px] font-mono text-[#6b6258] ml-auto">no entry without its origin</span>
      </div>

      {!report && (
        <p className="text-[10px] font-mono text-[#6b6258] leading-relaxed mb-2">
          Find every entry on the record that carries no link to its origin. The machine looks for the origin and offers it as a candidate — it never writes a source itself.
        </p>
      )}

      {report && (
        <div className="mb-2">
          <p className="text-[10px] font-mono text-[#1a1612] leading-relaxed">
            <b className="font-black">{report.missing_total}</b> {report.missing_total === 1 ? 'entry' : 'entries'} with no source link
            {report.missing_total > 0 && <> · <b className="font-black">{report.researched}</b> researched for a candidate{report.remaining > 0 ? ` · ${report.remaining} still to research` : ''}</>}
            {report.applied && <> · <b className="font-black text-[#b3261e]">{report.held}</b> held back</>}
          </p>
          {report.missing_total === 0 && (
            <p className="text-[10px] font-mono text-[#1e3a2b] mt-1 flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Every entry on the record traces to an origin.</p>
          )}
          {report.missing_total > 0 && (
            <div className="mt-2 space-y-1.5 max-h-64 overflow-y-auto">
              {report.entries.map((e) => (
                <div key={e.id} className="border-l-2 border-l-[#b3261e] pl-2">
                  <p className="text-[10px] font-mono text-[#1a1612] leading-snug">{e.title}</p>
                  <p className="text-[9px] font-mono text-[#6b6258] uppercase">{e.label}{e.named_origin ? ` · names ${e.named_origin}` : ''}</p>
                  {e.candidate_url ? (
                    <a href={e.candidate_url} target="_blank" rel="noopener noreferrer" className="text-[9px] font-mono text-[#0f5f7a] underline break-all">
                      candidate: {e.candidate_url}
                    </a>
                  ) : (
                    <p className="text-[9px] font-mono text-[#b3261e]">no candidate found — needs a source by hand</p>
                  )}
                  {e.candidate_why && <p className="text-[9px] font-mono text-[#6b6258] leading-snug">{e.candidate_why}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-2">
        <button
          onClick={() => run(false)}
          disabled={busy}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[44px] bg-[#efe7d6] border-2 border-[#1a1612] text-[#1a1612] text-[10px] font-black font-mono uppercase active:bg-[#1a1612] active:text-[#efe7d6] transition-colors disabled:opacity-50"
        >
          {busy ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />} Find entries with no source
        </button>
        {report && report.missing_total > 0 && !report.applied && (
          <button
            onClick={() => run(true)}
            disabled={busy}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[44px] bg-[#b3261e] border-2 border-[#b3261e] text-[#f4efe4] text-[10px] font-black font-mono uppercase active:bg-[#1a1612] active:border-[#1a1612] transition-colors disabled:opacity-50"
          >
            <AlertTriangle className="w-3.5 h-3.5" /> Hold back {report.missing_total} until a source is given
          </button>
        )}
      </div>

      {report && report.missing_total > 0 && !report.applied && (
        <p className="text-[9px] font-mono text-[#6b6258] mt-2 leading-relaxed">
          Holding an entry back takes it off the record until it carries a source — it still holds all its text, and publishing it again is one tap once the link is in.
        </p>
      )}
    </div>
  );
}