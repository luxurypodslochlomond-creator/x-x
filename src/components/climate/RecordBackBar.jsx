import React from 'react';
import useRecordBack from './useRecordBack';
import { ArrowLeft } from 'lucide-react';

/* ── ONE WAY BACK, ON EVERY PAGE OF THE RECORD ─────────────────────────────────────
   This bar existed four times: in the shell, and hand-copied into the map page, the
   impact page and anywhere else somebody needed a way out. Four copies drift — a
   different size here, a different border there, and one that quietly stopped going
   back to where the reader came from. On a record whose whole claim is that it is one
   place, the one control a reader touches on every single page has to be the same
   control: same size, same place, same behaviour, every time.

   The behaviour is the only interesting part, and it is deliberately dull: go back to
   the page you came from. If you arrived from a link in a message, there is no page
   you came from, so back opens the record rather than showing you a dead end. */
export default function RecordBackBar({ eyebrow, fallback = '/TogetherChangeClimate', right }) {
  const back = useRecordBack(fallback);

  return (
    <div className="border-b-2 border-[#141210] bg-[#efe7d6]">
      <div className="max-w-[1100px] mx-auto flex items-center gap-3 px-4 lg:px-10 py-3">
        <button
          onClick={back}
          aria-label="Back"
          className="w-11 h-11 flex items-center justify-center bg-[#f7f1e5] border-2 border-[#141210] text-[#141210] active:bg-[#e2602a] transition-colors flex-shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-[10px] font-black font-mono uppercase tracking-widest text-[#5a5246] min-w-0 truncate">
          {eyebrow}
        </span>
        {right ? <div className="ml-auto flex-shrink-0">{right}</div> : null}
      </div>
    </div>
  );
}