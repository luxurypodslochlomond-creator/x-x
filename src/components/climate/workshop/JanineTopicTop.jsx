import React from 'react';

// ── HER TOPIC, BEFORE ANYTHING OF OURS ─────────────────────────────────────────
// The page used to open with us: our proposal, our strip, our rules. Her topic sat four
// screens down inside a tile. That is backwards for the one person who has to stand up and
// give the hour — so the band below is the first thing on the page, in the record's red and
// the festival's yellow, and it says in one breath what the hour does.
//
// IT USED TO SAY THE WRONG HOUR. Until 24 November the three beats were ours: three drawings,
// nineteen minutes of drawing, one blank panel. Nobody had seen her agenda when they were
// written, and her agenda has no drawing exercise in it at all. So the band was the first
// thing a stranger read and the first thing that was untrue — on the one page whose whole
// argument is that the record does not say things that are untrue.
//
// The beats are hers now. Her topic, the artists speaking about their own work, and the
// record keeping each drawing with its maker's name on it. Nothing in this band asks the
// room to do anything, because the host did not ask it to.

const BEATS = [
  ['Her topic', '“Together we can change the course of climate change”'],
  ['The hands', 'African cartoonists on their own drawings, in their own words'],
  ['The record', 'each drawing kept with the name of the hand that made it'],
];

export default function JanineTopicTop() {
  return (
    <section className="mt-4 bg-record-red text-record-paper">
      <div className="px-4 py-6 lg:px-8 lg:py-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cartoon-sun lg:text-[11px]">
          Janine M. H. Selendy’s topic · her hour
        </p>

        <h2
          className="mt-2 max-w-[26ch] text-[27px] leading-[1.05] lg:text-[46px]"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.005em' }}
        >
          One drawing is an opinion.<br />A room of them is a record.
        </h2>

        <p
          className="mt-3 max-w-[46ch] text-[13.5px] leading-relaxed lg:text-[16.5px]"
          style={{ fontFamily: 'var(--font-reading)' }}
        >
          Nobody is going to explain climate change to this room. They know it. They draw it. Cartoonists from
          across Africa take the floor on the drawing they made — what inspired it, and where it hangs — and
          every one of them goes onto a public record with its maker’s name on it.
        </p>

        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {BEATS.map(([head, sub]) => (
            <li key={head} className="border-t-2 border-cartoon-sun pt-2">
              <p className="font-mono text-[11px] font-black uppercase tracking-wide lg:text-[12px]">{head}</p>
              <p className="mt-1 text-[12px] leading-snug text-record-paper/80 lg:text-[13px]">{sub}</p>
            </li>
          ))}
        </ul>

        <p className="mt-5 border-t border-record-paper/25 pt-3 font-mono text-[10.5px] leading-relaxed uppercase tracking-[0.14em] text-record-paper/75">
          Horizon International at Yale · Sunday 29 November · the 8th CartoonAFRICA Biennial, Benin City · online
        </p>
      </div>
    </section>
  );
}