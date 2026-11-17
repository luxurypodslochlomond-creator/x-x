import React from 'react';

// ── HER TOPIC, BEFORE ANYTHING OF OURS ─────────────────────────────────────────
// The page used to open with us: our proposal, our strip, our rules. Her topic sat four
// screens down inside a tile. That is backwards for the one person who has to stand up and
// give the hour — so the band below is the first thing on the page, in the record's red and
// the festival's yellow, and it says in one breath what the hour does.
//
// Nothing here is a claim about her work. The three beats are the shape of the hour, and
// the plain line under the headline is the whole argument in nine words. If she cuts the
// whole page, this band is still true.

const BEATS = [
  ['Three drawings', 'shown whole, credit kept on them'],
  ['Nineteen minutes', 'everyone draws — paper, pen, no screens'],
  ['One blank panel', 'the ending the room decides'],
];

export default function JanineTopicTop() {
  return (
    <section className="mt-4 bg-record-red text-record-paper">
      <div className="px-4 py-6 lg:px-8 lg:py-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cartoon-sun lg:text-[11px]">
          Her topic · her hour
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
          Nobody is going to explain climate change to this room. They know it. They draw it. Five frames go up
          whole, the room draws for nineteen minutes, and the last panel stays blank on purpose.
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
          Janine M. H. Selendy · Horizon International at Yale · Sunday 29 November · online
        </p>
      </div>
    </section>
  );
}