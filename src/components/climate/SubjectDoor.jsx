import React from 'react';
import { ChevronDown } from 'lucide-react';
import SignalCode from '@/components/climate/SignalCode';

// ── THE SUBJECT DOOR ────────────────────────────────────────────────────────────
// A phone used to be handed thirty-two subject pills in a sideways strip: two screens of
// swiping to reach Zooplankton, and half of them opened a blank page. A strip tells you
// how long the list is and nothing about the record.
//
// This is one line instead, shaped like the index plate it opens: what you are reading on
// the left, how much of it there is on the right. Nothing hidden — the whole taxonomy is
// one tap away, and the line itself says out loud that only sixteen of thirty-two subjects
// carry anything yet. A record that admits where it is thin is worth more than one that
// hides it behind a scroll.
export default function SubjectDoor({ active, totalEntries, filled, totalSubjects, allLabel, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="lg:hidden w-full flex items-center gap-2.5 px-3 py-2.5 min-h-[56px] bg-[#efe7d6] border border-[#141210] active:border-[#e2602a] transition-colors text-left"
    >
      <span className="text-[9px] font-black font-mono uppercase tracking-[0.18em] text-[#5a5246] leading-none">Subject</span>
      <span className="w-px h-7 bg-[#141210]/25 flex-shrink-0" />
      {active ? <SignalCode code={active.code} /> : null}
      <span className="flex-1 min-w-0 flex flex-col">
        <span className="text-[12px] font-black font-mono uppercase text-[#141210] truncate leading-tight">
          {active ? active.label : allLabel}
        </span>
        <span className="text-[9px] font-mono uppercase tracking-wider text-[#5a5246] mt-1 truncate">
          {active
            ? `${active.count} ${active.count === 1 ? 'entry' : 'entries'}`
            : `${totalEntries} entries · ${filled} of ${totalSubjects} subjects`}
        </span>
      </span>
      <ChevronDown className="w-4 h-4 text-[#141210] flex-shrink-0" />
    </button>
  );
}