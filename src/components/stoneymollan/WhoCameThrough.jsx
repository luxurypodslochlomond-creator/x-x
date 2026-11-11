import React from 'react';
import {
  CrownMark,
  SwordMark,
  CastleMark,
  ShipMark,
  HoofMark,
  QuillMark,
  MountainMark,
} from './StoneymollanIcons';

// ── WHO CAME THROUGH ──
// A dated list rather than a paragraph, because a date is the thing a reader checks.
// Name in the record's display face, dates in the machine's small voice, and one line
// of what it has to do with this hill. Left-aligned on the centred sheet: a list of
// people reads down, not out from a middle line.
//
// Each name now carries one of the hill's own cut marks, set a degree or two off true
// the way the six doors are — so a list of kings belongs to the same sheet as the row
// at the top of the page instead of reading as bullet points. The mark says what the
// person is, not what they are worth: a crown for the two kings, a blade for the man
// taken at Robroyston, the tower that still stands on Inchmurrin for the family that
// built it, the sail for a five-year-old leaving from Dumbarton, a cloven hoof for the
// cattle lifted off the island, a quill for the writer, a hill for the walker.
const MARKS_BY_NAME = {
  'Robert the Bruce': CrownMark,
  'James VI': CrownMark,
  'William Wallace': SwordMark,
  'Duncan, 8th Earl of Lennox': CastleMark,
  'Isabella, Countess of Lennox': CastleMark,
  'Mary, Queen of Scots': ShipMark,
  'Rob Roy MacGregor': HoofMark,
  'Tobias Smollett': QuillMark,
  'John Muir': MountainMark,
};

const TILT = [-3, 2.2, -1.6, 2.6, -2.1, 1.4, -1.1, 2.8, -2.4];

export default function WhoCameThrough({ people }) {
  return (
    <ul className="mx-auto mt-1 max-w-[46ch] divide-y divide-record-ink/15 border-y border-record-ink/25">
      {people.map((person, i) => {
        const Mark = MARKS_BY_NAME[person.name];
        return (
          <li key={person.name} className="flex items-start gap-3 py-3.5 text-left">
            {Mark && (
              <span
                aria-hidden="true"
                className="mt-[5px] shrink-0 text-record-ink/75"
                style={{ transform: `rotate(${TILT[i % TILT.length]}deg)` }}
              >
                <Mark className="h-[19px] w-[19px]" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <span className="text-[18px] leading-tight" style={{ fontFamily: 'var(--record-display)' }}>
                  {person.name}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-record-muted">
                  {person.dates}
                </span>
              </div>
              <p
                className="mt-1.5 text-[15.5px] leading-[1.62] text-record-ink/85"
                style={{ fontFamily: 'var(--font-record-reading)' }}
              >
                {person.line}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}