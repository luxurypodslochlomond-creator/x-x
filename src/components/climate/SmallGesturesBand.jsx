import React from 'react';
import { Link } from 'react-router-dom';
import RecordSectionHeading from '@/components/climate/RecordSectionHeading';

// Janine's list of the smallest gestures. Not advice, not a campaign — the things a
// person can start today with nothing bought and nothing asked of anyone. x = x.

// Mangrove planting was on this list. Janine asked for it to stand on its own — it is a
// major item on the record, not a small gesture. It now lives under the Mangroves
// category and its own entries, the Bonaire film among them.

// ── THE GESTURES GO TO THE REAL DRAWINGS, NOT TO OURS ──────────────────────────
// These five used to open the record's own illustrated strips. Brian, 19 November: "maybe
// smallest gestures goes to real cartoonists bro". He is right, and for the room's own
// reason: a strip a machine illustrated is fiction, and a list of things a person can do
// today should send a reader to work a human hand made. So every line here opens the wall
// of real drawings. The record's own strips are still in the room, below the wall, and are
// still labelled as fiction — they are simply not what a gesture points at any more.
const GESTURES = [
  'Repairing a sweater / cardigan',
  'Buying less',
  'Walking',
  'Using mass transportation',
  'Not wasting food',
];

const THE_WALL = '/ClimateCartoons#press-wall';

export default function SmallGesturesBand() {
  return (
    <section className="px-4 pb-7 pt-9 lg:px-10 lg:pt-12">
      <RecordSectionHeading title="The smallest gestures" />
      <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed mb-3">
        Small enough to start today, and free.
      </p>
      <div className="flex flex-wrap gap-2">
        {GESTURES.map(gesture => (
          <Link
            key={gesture}
            to={THE_WALL}
            className="border-2 border-record-ink bg-record-signal px-3 py-2 font-display text-xs font-bold uppercase tracking-wide text-record-ink underline decoration-transparent transition-colors hover:decoration-record-ink active:translate-y-px active:bg-record-ink active:text-record-paper"
          >
            {gesture}
          </Link>
        ))}
      </div>
      <p className="text-[10px] font-mono text-[#5a5246] leading-relaxed mt-3">
        From Janine Selendy's own list for the record. Each one opens the wall, where the real
        cartoonists' drawings hang. The room's own little strips are fiction, and stand apart from them.
      </p>
    </section>
  );
}