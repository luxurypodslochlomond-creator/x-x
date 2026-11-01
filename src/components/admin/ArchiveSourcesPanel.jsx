import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Archive } from 'lucide-react';

// Keeps the words a source actually said, so the record survives the day its links
// stop working. Safe to press again: it only takes copies that are still missing.
export default function ArchiveSourcesPanel() {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const keep = async () => {
    setBusy(true);
    setError('');
    setResult(null);
    try {
      const res = await base44.functions.invoke('climateArchiveSources', { limit: 60 });
      setResult(res.data);
    } catch (e) {
      setError(e?.response?.data?.error || e.message || 'The copies could not be taken.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-6 border-2 border-[#141210] bg-[#f7f1e5] p-4">
      <p className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] mb-1">Keep what the sources said</p>
      <p className="text-[11px] font-mono leading-relaxed text-[#5a5246] mb-3">
        Reads every cited origin and keeps its words exactly as they stand today, with a fingerprint and the date. Links rot — this is what stops the record dying with them. Press it as often as you like; it only takes the copies still missing.
      </p>
      <button
        onClick={keep}
        disabled={busy}
        className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-[#141210] bg-[#141210] text-[#efe7d6] text-[10px] font-black font-mono uppercase tracking-widest disabled:opacity-40"
      >
        <Archive className="w-3.5 h-3.5" />
        {busy ? 'Reading the origins…' : 'Keep a copy of every source'}
      </button>
      {result && (
        <div className="mt-2 space-y-1">
          <p className="text-[10px] font-mono text-[#1e3a2b]">
            Kept {result.kept} · already held {result.skipped} · still to keep {result.stillToKeep}
          </p>
          {result.failed?.length > 0 && (
            <div className="text-[10px] font-mono text-[#b3261e]">
              <p className="font-black uppercase tracking-widest">These would not answer:</p>
              {result.failed.slice(0, 8).map((f, i) => (
                <p key={i} className="break-all">· {f.url} — {f.reason}</p>
              ))}
              <p className="mt-1 text-[#6b6258]">A dead origin is worth knowing about: it is the link a reader would have hit.</p>
            </div>
          )}
        </div>
      )}
      {error && <p className="mt-2 text-[10px] font-mono text-[#b3261e]">{error}</p>}
    </div>
  );
}