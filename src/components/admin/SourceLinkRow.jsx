import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Link2, Check, ExternalLink } from 'lucide-react';

// THE LINK ITSELF — where a held entry gets its origin.
//
// Holding an entry back for having no source is worthless if the person who knows the link
// has nowhere to put it. So the link lives in the queue, next to the entry, in a field that
// says plainly which one is missing it. Paste, save, publish — three taps and it is on the
// record with its origin attached. The machine never fills this field.

export default function SourceLinkRow({ item, entityName, onSaved }) {
  const [url, setUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    if (!url.trim()) return;
    setBusy(true);
    try {
      await base44.entities[entityName].update(item.id, { source_url: url.trim() });
      setSaved(true);
      setUrl('');
      onSaved?.();
    } catch (e) {
      alert('Could not save the source link: ' + e.message);
    } finally {
      setBusy(false);
    }
  };

  if (item.source_url) {
    return (
      <a
        href={item.source_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-1.5 text-[9px] font-mono text-[#0f5f7a] underline break-all mb-2"
      >
        <ExternalLink className="w-3 h-3 flex-shrink-0 mt-0.5" /> {item.source_url}
      </a>
    );
  }

  return (
    <div className="flex gap-1.5 mb-2">
      <input
        value={url}
        onChange={(e) => { setUrl(e.target.value); setSaved(false); }}
        placeholder="No source link — paste the link to its origin…"
        className="flex-1 min-w-0 bg-[#efe7d6] border-2 border-[#b3261e] px-2 py-2 text-[10px] font-mono text-[#1a1612] outline-none focus:border-[#1a1612]"
      />
      <button
        onClick={save}
        disabled={busy || !url.trim()}
        className="flex-shrink-0 flex items-center gap-1 px-2.5 py-2 bg-[#b3261e] text-[#f4efe4] text-[9px] font-black font-mono uppercase border-2 border-[#b3261e] active:bg-[#1a1612] active:border-[#1a1612] transition-colors disabled:opacity-40"
      >
        {saved ? <><Check className="w-3 h-3" /> Saved</> : <><Link2 className="w-3 h-3" /> Save link</>}
      </button>
    </div>
  );
}