import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Archive, ChevronDown } from 'lucide-react';

// A link is a promise somebody else keeps. Where the record has taken a copy of
// what the source actually said, it says so here, dates the copy, and lets anyone
// read it — so an entry can still be checked on the day the origin goes dark.
export default function SourceArchiveNote({ entryId, sourceUrl }) {
  const [copy, setCopy] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let live = true;
    if (!entryId) return undefined;
    base44.entities.ClimateSourceArchive
      .filter({ entry_id: entryId }, { sort: '-fetched_at', limit: 1 })
      .then(page => { if (live) setCopy(page.items?.[0] || null); })
      .catch(() => {});
    return () => { live = false; };
  }, [entryId]);

  if (!copy) return null;

  const when = new Date(copy.fetched_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="mt-2 border-l-4 border-l-[#0f5f7a] bg-[#0f5f7a]/5 px-3 py-2">
      <button onClick={() => setOpen(!open)} className="w-full flex items-start gap-2 text-left">
        <Archive className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#0f5f7a]" />
        <span className="flex-1">
          <span className="block text-[10px] font-black font-mono uppercase tracking-widest text-[#0f5f7a]">
            A copy of this source is kept
          </span>
          <span className="block text-[10px] font-mono text-[#6b6258] leading-relaxed mt-0.5">
            Taken {when} · {copy.chars?.toLocaleString()} characters, exactly as the origin had them. Read it even if the link above stops working.
          </span>
        </span>
        <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#0f5f7a] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="mt-2">
          <pre className="max-h-72 overflow-y-auto whitespace-pre-wrap break-words text-[11px] font-mono text-[#141210] bg-[#f7f1e5] border border-[#141210]/20 p-3">
{copy.archived_text}
          </pre>
          <p className="mt-2 text-[9px] font-mono text-[#6b6258] break-all">
            {sourceUrl} · fingerprint {copy.content_sha256?.slice(0, 16)}…
          </p>
        </div>
      )}
    </div>
  );
}