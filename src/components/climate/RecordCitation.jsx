import React, { useState } from 'react';
import { Copy, Check, Printer } from 'lucide-react';

// CITE THIS ENTRY — one block, on every entry, whatever its kind.
//
// A researcher quotes and cites. Without this, an entry is an interesting page; with it, an
// entry is quotable — the origin, the record and the address travel together. The citation
// is shown in a selectable field as well as on the copy button, so it still works where the
// clipboard is blocked (in-app browsers, some phones).
//
// The note is not decoration: when an entry carries no origin, the note says so here, in the
// one place a reader is about to quote it from.

export default function RecordCitation({ citation, note, label = 'Cite this entry' }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked — the citation sits selectable in the field above the button.
    }
  };

  return (
    <div className="mt-6 bg-[#f7f1e5] border-2 border-[#141210] p-4 lg:p-6">
      <p className="text-[10px] font-black font-mono uppercase tracking-widest text-[#141210] mb-2">{label}</p>
      {note && <p className="text-[10px] font-mono text-[#5a5246] leading-relaxed mb-3">{note}</p>}
      <textarea
        readOnly
        value={citation}
        onFocus={(e) => e.target.select()}
        rows={3}
        className="w-full bg-[#efe7d6] border border-[#141210] px-3 py-2.5 text-[11px] lg:text-[12px] font-mono text-[#141210] outline-none resize-none"
      />
      <div className="mt-3 flex flex-col lg:flex-row gap-2">
        <button
          onClick={copy}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] bg-[#141210] text-[#efe7d6] text-[11px] lg:text-[12px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#e2602a] active:text-[#141210] transition-colors"
        >
          {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy the citation</>}
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] bg-[#efe7d6] text-[#141210] text-[11px] lg:text-[12px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#141210] active:text-[#efe7d6] transition-colors"
        >
          <Printer className="w-4 h-4" /> Print
        </button>
      </div>
    </div>
  );
}