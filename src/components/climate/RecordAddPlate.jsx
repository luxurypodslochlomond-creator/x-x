import React from 'react';
import { RoomMarkSolution, RoomMarkCrisis, RoomMarkAction, RoomMarkGroups } from '@/components/climate/RoomMarks';

// ── THE WAY IN, AT THE SIZE OF THE TOP NAV ────────────────────────────────────────
// Brian, 24 November, on the plate that stood here: "boxes too big and weird… feels not
// easy to add crisis etc… not coolasfuck like top nav". He is right, and it was my doing —
// I answered "too hard to find" with four fat tiles on a yellow slab, which is a billboard
// where a door was needed. The record already has the right door: the masthead's rail of
// drawn marks with a small tracked word under each. Four doors in that same hand are
// unmistakably part of the record, are the easiest thing on a phone to hit, and take one
// line instead of a third of a screen.
//
// Nothing about the form changed. Tap a door and it opens already on that room.
const DOORS = [
  { type: 'solution', label: 'Solution', Mark: RoomMarkSolution, ink: 'text-record-botanical' },
  { type: 'climate_crisis', label: 'Crisis', Mark: RoomMarkCrisis, ink: 'text-record-red' },
  { type: 'action', label: 'Action', Mark: RoomMarkAction, ink: 'text-record-clay' },
  { type: 'group', label: 'Group', Mark: RoomMarkGroups, ink: 'text-record-ink' },
];

export default function RecordAddPlate({ onPick }) {
  return (
    <section aria-labelledby="record-add-title" className="mt-4 border-t-[3px] border-cartoon-sun pt-2.5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
        <h2 id="record-add-title" className="font-mono text-[10.5px] font-black uppercase tracking-[0.18em] text-record-ink">
          Put something on the record
        </h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#5a5246]">
          No account needed
        </span>
      </div>

      <div className="mt-2 grid grid-cols-4 divide-x divide-record-ink/15 border-y border-record-ink/15">
        {DOORS.map(({ type, label, Mark, ink }) => (
          <button
            key={type}
            type="button"
            onClick={() => onPick(type)}
            aria-label={`Add a ${label.toLowerCase()}`}
            className="group flex min-h-[66px] flex-col items-center justify-center gap-1 px-1 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-mark"
          >
            <span className={`${ink} transition-transform duration-150 group-active:scale-95`} aria-hidden="true">
              <Mark size={26} />
            </span>
            <span className="text-[10px] font-black uppercase leading-[1.1] tracking-[0.07em] text-record-ink">
              {label}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-1.5 text-[11px] font-mono leading-relaxed text-[#5a5246]">
        Clear entries go on at once. Anything unclear waits for a person, and we email you either way.
      </p>
    </section>
  );
}