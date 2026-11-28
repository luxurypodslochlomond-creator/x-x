import React from 'react';
import { Link } from 'react-router-dom';
import RecordSectionHeading from '@/components/climate/RecordSectionHeading';
import useGestureDoors from '@/components/climate/useGestureDoors';

// Janine's list of the smallest gestures. Not advice, not a campaign — the things a
// person can start today with nothing bought and nothing asked of anyone. x = x.

// Mangrove planting was on this list. Janine asked for it to stand on its own — it is a
// major item on the record, not a small gesture. It now lives under the Mangroves
// category and its own entries, the Bonaire film among them.

// ── FIVE GESTURES, FIVE DOORS ──────────────────────────────────────────────────
// These five used to open the wall of drawings, all five to the same address. Brian,
// 28 November: "small gestures theres probably many more but they dont go to right place
// bro". He is right, and the fault was mine: a person who presses "using mass
// transportation" wants the thing, not a picture of somebody's feelings about it. Each
// line now opens the entry the record actually holds on that subject — and where it
// holds none, the record's own search, which says so plainly.
// The five live in smallGestures.js and their doors in useGestureDoors.js, so the map's
// foot and this band cannot disagree.

export default function SmallGesturesBand() {
  const doors = useGestureDoors();
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
        {doors.map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            className="border-2 border-record-ink bg-record-signal px-3 py-2 font-display text-xs font-bold uppercase tracking-wide text-record-ink underline decoration-transparent transition-colors hover:decoration-record-ink active:translate-y-px active:bg-record-ink active:text-record-paper"
          >
            {label}
          </Link>
        ))}
      </div>
      {/* ── WHERE THE ARGUMENT HAS ALREADY BEEN PROVED, IN THE SAME CITY ────────────
          A claim that small repeated gestures build something vast needs a proof, or it is
          just a nice sentence. The proof is Benin's, and the biennial is held in the city that
          built it: the Walls of Benin — Iya. Archaeologist Patrick Darling estimated their total
          length at around 16,000 km, in a mosaic of hundreds of interconnected boundaries, with
          ramparts reaching some twenty metres; the Metropolitan Museum dates their construction
          from roughly the seventh to the fourteenth century.

          ── AND GUINNESS IS OFF THE PAGE ─────────────────────────────────────────────
          Brian, 27 November: "you sure mention Guinness? They coolasfuck bri not sure?"
          He is right to stop it. Guinness World Records is an entertainment brand — stunts,
          television, a book at Christmas — and it is not the body a Yale archaeologist, a
          Tufts climate researcher or a Nigerian cartoonist would accept as the authority on
          what Edo built. Worse, it was never the authority here: the figure is Darling's, and
          Guinness only repeated it. So the record now cites the archaeology that cites him —
          a 2025 peer-reviewed paper in the African Archaeological Review, which gives 16,000 km
          and 6,500 km² to Darling (1984) — and the superlative goes with it. A number with a
          survey behind it is worth more than a title from a record book, and it is the number
          that is impressive anyway.

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
        Benin — Iya — run to an estimated 16,000 km in all, enclosing around 6,500 km², in a
        mosaic of hundreds of interconnected boundaries with ramparts reaching some twenty
        metres. That estimate is Patrick Darling’s, from his surveys of the earthworks, and it is
        still the one the archaeology cites; the Metropolitan Museum dates the work around Benin
        City from roughly the seventh to the fourteenth century. Nobody built that in one act,
        and it took the better part of a millennium — which is the one thing we have not got. It
        is one basket of earth, repeated at a scale no single act could produce — which is
        exactly Janine’s argument, made in Edo soil several centuries before anyone wrote it
        down, and the reason the small gesture is not a slow answer but the only fast one.
      </p>
      <p className="mb-3 text-[10px] font-mono leading-relaxed text-[#5a5246]">
        Sources: <a className="underline" href="https://link.springer.com/article/10.1007/s10437-025-09630-y" target="_blank" rel="noopener noreferrer">African Archaeological Review, 2025 — citing Darling’s survey estimate</a>
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