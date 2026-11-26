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
// of real drawings — and the machine-drawn strips that used to sit below it came off the
// record on 19 November, so the wall is now all there is: drawings, and the hands that made
// them.
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
      {/* ── WHY THE SMALLEST ONE IS THE ONE THAT GROWS ─────────────────────────────
          The list above says what a person can do and never says why the size matters, which
          is the part Janine keeps returning to. Her mechanism is in her own description: 5.86
          billion smartphones, and people learning about positive actions and being
          "encouraged to do what they themselves can do". Encouraged, not instructed — that
          distinction is the whole design of this record.

          The economics are the same argument from the other side. A copy of an example costs
          nothing to make: the second one and the billionth one are free, so it can grow
          without charging anybody. A thing that must be sold has to stay scarce to be worth
          paying for. Which is why nothing on this record is ranked, run as a competition or
          sold — ranking is what turns a thing people copy into a thing people buy, and it is
          also what makes the person at the bottom of the list quietly stop doing it. */}
      <p
        className="mb-3 max-w-[62ch] text-[12px] leading-relaxed text-record-ink/85 lg:text-[13.5px]"
        style={{ fontFamily: 'var(--font-reading)' }}
      >
        The smallest gesture is the only size most people can start today, and the only one that
        survives a bad week. It is also the only thing that can grow without anybody being charged
        for it: a copy of an example costs nothing to make, so the second one and the billionth one
        are free — while anything that has to be sold must stay scarce to be worth paying for. That
        is why nothing here is ranked, counted as a competition or sold. Janine’s other half is the
        mechanism: people see what somebody else did, and are “encouraged to do what they themselves
        can do”.
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
        cartoonists' drawings hang. Nothing on that wall was drawn by a machine.
      </p>
    </section>
  );
}