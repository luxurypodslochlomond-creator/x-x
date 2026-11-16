import React from 'react';
import { ChevronDown } from 'lucide-react';
import SignalCode from '@/components/climate/SignalCode';

// ── THE SUBJECT LINE ────────────────────────────────────────────────────────────
// This was a filled box: a caption, a divider, a label, a second line of counts and an
// arrow — four things to say one thing. And it had quietly grown, because the record's own
// type floor lifts every nine-pixel label to twelve, so a control designed to be small was
// being drawn larger than the button that submits an entry.
//
// It is a line of type now, the way an index marks itself on the edge of a page: what you
// are reading on the left, how much of it there is on the right, a hairline under it, and
// the whole width of the page to put your thumb on. Nothing is boxed, because a record
// does not put a frame around the fact that you are standing in Water.
export default function SubjectDoor({ active, totalEntries, allLabel, open = false, onOpen, onClose }) {
  return (
    <button
      type="button"
      onClick={onClose ? () => (open ? onClose() : onOpen()) : onOpen}
      aria-expanded={open}
      aria-haspopup="true"
      className="lg:hidden w-full flex items-center gap-2.5 py-3 min-h-[48px] border-b border-[#141210] text-left active:opacity-60 transition-opacity"
    >
      <span className="flex-shrink-0 text-[11px] font-black font-mono uppercase tracking-[0.16em] text-[#5a5246]">
        Subject
      </span>
      {active ? <SignalCode code={active.code} /> : null}
      <span className="flex-1 min-w-0 truncate text-[13px] font-black font-mono uppercase text-[#141210]">
        {active ? active.label : allLabel}
      </span>
      <span className="flex-shrink-0 text-[11px] font-mono text-[#5a5246]">
        {active
          ? `${active.count} ${active.count === 1 ? 'entry' : 'entries'}`
          : `${totalEntries} entries`}
      </span>
      <ChevronDown
        className={`w-4 h-4 flex-shrink-0 text-[#141210] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      />
    </button>
  );
}