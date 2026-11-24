import React from 'react';
import { RoomMarkSolution, RoomMarkCrisis, RoomMarkAction, RoomMarkGroups } from '@/components/climate/RoomMarks';

// ── THE WAY IN, IN THE RECORD'S OWN HAND ──────────────────────────────────────────
// Brian, 24 November: adding a crisis, a solution, an action or a group "must be easy as
// fuck to get to", because on the day of an event the people with something to give are
// standing in a field with a phone and no patience.
//
// It was a line of four underlined words at ten pixels, in the grey kept for footnotes,
// under a heading that said "Put something on the record" in the same size. Four ways to
// give the world something, printed smaller than the small print. Nothing about the form
// was hard; finding the door was.
//
// So the four are a plate now: the record's own yellow, edge to edge, with each door
// wearing the drawing of the room it opens and its room's colour under the thumb. One tap
// and the form is already on that room — it does not ask again which of the four you meant.
// The yellow is the footer's yellow and the drawings are the record's own; no new colour,
// no new icon, nothing invented.
const DOORS = [
  { type: 'solution', label: 'A solution', line: 'What works, and can be copied.', Mark: RoomMarkSolution, ink: 'text-record-botanical', rule: 'bg-record-botanical' },
  { type: 'climate_crisis', label: 'A crisis', line: 'Something the world must know.', Mark: RoomMarkCrisis, ink: 'text-record-red', rule: 'bg-record-red' },
  { type: 'action', label: 'An action', line: 'A cleanup, a planting, a meeting.', Mark: RoomMarkAction, ink: 'text-record-clay', rule: 'bg-record-clay' },
  { type: 'group', label: 'A group', line: 'People working on the same thing.', Mark: RoomMarkGroups, ink: 'text-record-ink', rule: 'bg-record-ink' },
];

export default function RecordAddPlate({ onPick }) {
  return (
    <section aria-labelledby="record-add-title" className="mt-4 -mx-4 border-t-[3px] border-record-mark bg-cartoon-sun px-4 py-5 lg:-mx-10 lg:px-10 lg:py-6">
      <h2 id="record-add-title" className="font-display text-[19px] font-bold uppercase leading-tight text-record-ink lg:text-[24px]">
        Put something on the record
      </h2>
      <p className="mt-1 max-w-[46ch] text-[13px] leading-[1.5] text-record-ink/80 lg:text-[14px]">
        No account needed. Pick one and answer four short questions.
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {DOORS.map(({ type, label, line, Mark, ink, rule }) => (
          <button
            key={type}
            type="button"
            onClick={() => onPick(type)}
            className="group flex min-h-[92px] flex-col gap-1 border-2 border-record-ink bg-record-paper px-3 py-2.5 text-left transition-transform duration-150 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-ink"
          >
            <span className={`flex items-center gap-2 ${ink}`} aria-hidden="true">
              <Mark size={24} />
              <span className={`block h-1 w-5 ${rule}`} />
            </span>
            <span className="mt-0.5 text-[13px] font-bold uppercase tracking-[0.04em] text-record-ink">{label}</span>
            <span className="text-[11.5px] leading-[1.35] text-record-ink/70">{line}</span>
          </button>
        ))}
      </div>

      <p className="mt-3 text-[11.5px] leading-[1.5] text-record-ink/75">
        Clear entries go on at once. Anything unclear waits for a person, and we email you either way.
      </p>
    </section>
  );
}