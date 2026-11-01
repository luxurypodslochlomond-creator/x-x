import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Archive, ChevronDown } from 'lucide-react';

// A link is a promise somebody else keeps. Where the record has taken a copy of
// what the source actually said, it says so here and dates it — but it shows only
// an excerpt, never the source's whole page: the origin keeps its words and its
// rights, and the record's job is to send the reader there, not to replace it.
export default function SourceArchiveNote({ entryId, sourceUrl }) {
  const [copy, setCopy] = useState(null);
  const [asked, setAsked] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let live = true;
    if (!entryId) return undefined;
    base44.functions.invoke('climateSourceNote', { entry_id: entryId })
      .then(res => { if (!live) return; if (res.data?.found) setCopy(res.data); setAsked(true); })
      .catch(() => { if (live) setAsked(true); });
    return () => { live = false; };
  }, [entryId]);

  // Where no copy could be taken, the entry says so rather than showing nothing. It
  // does not name a reason it cannot know: a reader is told what is and is not held,
  // never why.
  if (!copy) {
    if (!asked || !sourceUrl) return null;
    return (
      <p className="mt-2 border-l-4 border-l-[#141210]/20 pl-3 text-[10px] font-mono leading-relaxed text-[#6b6258]">
        No copy of this source is kept here. The link above goes to the origin itself, and this entry cannot show you
        what it said on the day.
      </p>
    );
  }

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
            Taken {when} · {copy.chars?.toLocaleString()} characters held. Open it if the link above ever stops working.
          </span>
        </span>
        <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#0f5f7a] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="mt-2">
          <p className="whitespace-pre-wrap break-words text-[11px] font-mono leading-relaxed text-[#141210] bg-[#f7f1e5] border border-[#141210]/20 p-3">
            {copy.excerpt}
          </p>
          <p className="mt-2 text-[9px] font-mono leading-relaxed text-[#6b6258]">
            An excerpt, in the source's own words, {copy.http_status ? `read straight from the origin (status ${copy.http_status})` : 'read straight from the origin'}. The whole copy is held by the record's keeper and read on request — the words and the rights stay with the source.
          </p>
          <p className="mt-1 text-[9px] font-mono text-[#6b6258] break-all">
            {sourceUrl} · fingerprint {copy.content_sha256?.slice(0, 16)}…
          </p>
          {/* A copy taken from somebody is theirs to object to. Asking is all it takes. */}
          <p className="mt-2 text-[9px] font-mono leading-relaxed text-[#6b6258]">
            If you publish this source and would rather a copy were not kept here, say so and it comes off. The
            link to your page stays; the copy goes.{' '}
            <Link to="/ClimateCorrections" className="underline text-[#0f5f7a]">Ask the keeper</Link>
          </p>
        </div>
      )}
    </div>
  );
}