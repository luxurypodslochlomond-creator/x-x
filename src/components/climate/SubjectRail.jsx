import React from 'react';
import { ChevronRight } from 'lucide-react';

// ── THE SUBJECT RAIL ────────────────────────────────────────────────────────────
// The scroll that was here before this got over-thought. It looked right, and it was
// thrown out because it was fiddly to use — not because it looked wrong. So the look is
// back exactly as it was, and only the difficulties are answered.
//
// What it is: the record's subjects running along the edge of the page in the reading
// voice, each with its count, separated by hairlines rather than sitting in boxes. No
// fills, no chips, no bar — nothing here is a widget. The selected subject is marked the
// way a printed page marks a thumb index: a short rule of ink under its name.
//
// What makes it usable now, all of it underneath the look and none of it visible:
//   · every subject is a full-height tap, not a small chip to be aimed at;
//   · the rail snaps, so a thumb never stops between two subjects;
//   · "All subjects" is the FIRST thing in the rail, not something you reach after
//     swiping past thirty of them — the complete list, with the subjects carrying
//     nothing, is one tap away and never needs sideways searching;
//   · the rail scrolls sideways on its own and never widens the page.
// A subject holding nothing is not in the rail. It is in the index, where it belongs.
export default function SubjectRail({ subjects, totalEntries, allLabel, selected, onSelect, onOpenIndex }) {
  return (
    <div className="lg:hidden bg-[#efe7d6] border-y border-[#141210]/25">
      <div
        className="climate-nav-rail flex overflow-x-auto overflow-y-hidden"
        style={{ scrollSnapType: 'x proximity' }}
        aria-label="Filter by subject"
      >
        <button
          type="button"
          onClick={onOpenIndex}
          aria-haspopup="true"
          className="snap-start flex-none flex items-center gap-1.5 pl-4 pr-4 min-h-[54px] border-b-2 border-b-transparent border-r border-r-[#141210]/35 active:bg-[#f7f1e5] transition-colors"
        >
          <span className="text-[10px] font-black font-mono uppercase tracking-[0.16em] text-[#141210] whitespace-nowrap">
            All subjects
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#141210]" />
        </button>

        <button
          type="button"
          onClick={() => onSelect('all')}
          className={`snap-start flex-none flex items-baseline gap-1.5 px-4 min-h-[54px] pt-[17px] pb-3 border-b-2 whitespace-nowrap transition-colors ${
            selected === 'all'
              ? 'border-b-[#141210] text-[#141210]'
              : 'border-b-transparent text-[#5a5246] active:bg-[#f7f1e5]'
          }`}
        >
          <span style={{ fontFamily: 'var(--font-reading)', fontSize: 16 }}>{allLabel}</span>
          <span className={`text-[10px] font-mono tabular-nums ${selected === 'all' ? 'text-[#141210]' : 'text-[#5a5246]/70'}`}>
            {totalEntries}
          </span>
        </button>

        {subjects.map(s => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(s.id)}
            className={`snap-start flex-none flex items-baseline gap-1.5 px-4 min-h-[54px] pt-[17px] pb-3 border-b-2 whitespace-nowrap transition-colors ${
              selected === s.id
                ? 'border-b-[#141210] text-[#141210]'
                : 'border-b-transparent text-[#5a5246] active:bg-[#f7f1e5]'
            }`}
          >
            <span style={{ fontFamily: 'var(--font-reading)', fontSize: 16 }}>{s.label}</span>
            <span className={`text-[10px] font-mono tabular-nums ${selected === s.id ? 'text-[#141210]' : 'text-[#5a5246]/70'}`}>
              {s.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}