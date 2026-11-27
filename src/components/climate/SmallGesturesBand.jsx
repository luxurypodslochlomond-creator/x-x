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
      {/* ── WHERE THE ARGUMENT HAS ALREADY BEEN PROVED, IN THE SAME CITY ────────────
          A claim that small repeated gestures build something vast needs a proof, or it is
          just a nice sentence. The proof is Benin's, and the biennial is held in the city that
          built it: the Walls of Benin — Iya — which Guinness records as the longest earthworks
          of the pre-mechanical era. Archaeologist Patrick Darling estimated their total length
          at around 16,000 km in 1977, in a mosaic of hundreds of interconnected boundaries,
          with ramparts reaching some twenty metres; the Metropolitan Museum dates their
          construction from roughly the seventh to the fourteenth century.

          Every figure here is attributed rather than asserted, and the 16,000 km is named as
          Darling's estimate rather than as a measurement, because on this record a number
          without its source is a rumour with a typeface. Nothing is added about who built it
          beyond the plain fact that no single act built it.

          Janine Selendy's note of 27 November added the area enclosed and, with it, the one
          thing this paragraph had been missing: the wall took the better part of a millennium,
          and we have not got one. That is her point exactly — the small gesture is not the slow
          answer, it is the only one that can be made at speed — and it belongs on the same page
          as the proof, not in a new section. */}
      <p
        className="mb-3 max-w-[62ch] text-[12px] leading-relaxed text-record-ink/85 lg:text-[13.5px]"
        style={{ fontFamily: 'var(--font-reading)' }}
      >
        And it has already been proved once, in the city this biennial is held in. The Walls of
        Benin — Iya — are recorded by Guinness as the longest earthworks of the pre-mechanical
        era: archaeologist Patrick Darling estimated their total length at around 16,000 km in
        1977, in a mosaic of hundreds of interconnected boundaries, with ramparts reaching some
        twenty metres, built between roughly the seventh and fourteenth centuries and enclosing
        around 6,500 km². Nobody built that in one act, and it took the better part of a
        millennium — which is the one thing we have not got. It is one basket of earth, repeated
        until it became the longest structure of the pre-mechanical world — which is exactly
        Janine’s argument, made in Edo soil several centuries before anyone wrote it down, and
        the reason the small gesture is not a slow answer but the only fast one.
      </p>
      <p className="mb-3 text-[10px] font-mono leading-relaxed text-[#5a5246]">
        Sources: <a className="underline" href="https://www.guinnessworldrecords.com/world-records/97959-longest-earthworks-of-the-pre-mechanical-era" target="_blank" rel="noopener noreferrer">Guinness World Records</a>
        {' · '}
        <a className="underline" href="https://www.metmuseum.org/perspectives/benin-city-earthworks" target="_blank" rel="noopener noreferrer">The Metropolitan Museum of Art</a>
        {' · '}
        <a className="underline" href="https://www.theguardian.com/cities/2016/mar/18/story-of-cities-5-benin-city-edo-nigeria-mighty-medieval-capital-lost-without-trace" target="_blank" rel="noopener noreferrer">The Guardian, on Benin City</a>
        {' · '}
        <a className="underline" href="https://en.wikipedia.org/wiki/Benin_Moat" target="_blank" rel="noopener noreferrer">Wikipedia’s Benin Moat</a>, sent by Janine Selendy, 27 November 2026
      </p>
      <p className="text-[10px] font-mono text-[#5a5246] leading-relaxed mt-3">
        From Janine Selendy's own list for the record. Each one opens the wall, where the real
        cartoonists' drawings hang. Nothing on that wall was drawn by a machine.
      </p>
    </section>
  );
}