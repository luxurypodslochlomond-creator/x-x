import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Download } from 'lucide-react';

// One button that takes the record out whole, so it is never held hostage by the
// place it happens to be standing. No contact address travels in the file.
export default function RecordExportPanel() {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);
  const [error, setError] = useState('');

  const take = async () => {
    setBusy(true);
    setError('');
    setDone(null);
    try {
      const res = await base44.functions.invoke('climateRecordExport', {});
      const snapshot = res.data;
      const stamp = new Date().toISOString().slice(0, 10);
      const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `climate-record-${stamp}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      setDone(snapshot.counts);
    } catch (e) {
      setError(e?.response?.data?.error || e.message || 'The copy could not be taken.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-6 border-2 border-[#141210] bg-[#f7f1e5] p-4">
      <p className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] mb-1">Take the record out</p>
      <p className="text-[11px] font-mono leading-relaxed text-[#5a5246] mb-3">
        Downloads every entry with its source, signer, verification and corrections — plus groups, pictures, music and listener lines — as one file. No contact addresses are included, so the file can be handed to anyone.
      </p>
      <button
        onClick={take}
        disabled={busy}
        className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-[#141210] bg-[#141210] text-[#efe7d6] text-[10px] font-black font-mono uppercase tracking-widest disabled:opacity-40"
      >
        <Download className="w-3.5 h-3.5" />
        {busy ? 'Taking the copy…' : 'Download the whole record'}
      </button>
      {done && (
        <p className="mt-2 text-[10px] font-mono text-[#1e3a2b]">
          Taken · {Object.entries(done).map(([k, v]) => `${k.replace('Climate', '')} ${v}`).join(' · ')}
        </p>
      )}
      {error && <p className="mt-2 text-[10px] font-mono text-[#b3261e]">{error}</p>}
    </div>
  );
}