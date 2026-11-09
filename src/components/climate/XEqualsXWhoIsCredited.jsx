import React from 'react';

// ── WHO GETS REMEMBERED ────────────────────────────────────────────────────────
// The page used to keep Morse in "What is owed", as a thank-you. That was the wrong
// shelf, and it was also the reason the page read as a mood rather than an argument: a
// borrowed name dropped in gratitude says nothing a reader can check, and it invites the
// one question the record cannot dodge — why this name, and not the uncomfortable part
// of it.
//
// So he is here as evidence instead, and the evidence is a case rather than a compliment.
// Alfred Vail built the machinery and turned the dots into an alphabet; the patents
// carried Morse's name, and the history carried his name only. That is the whole reason
// a record exists: not to praise anybody, but to keep the name of the person who did the
// work attached to the work after the room empties.
//
// And Morse's own record is stated, because a page that says nobody is above anybody
// cannot quietly leave out the parts of a man's life that contradict it. Yale's own
// research project records him as a leading proslavery advocate; he stood for mayor on a
// nativist ticket. Naming both facts is what makes the rest of this page worth reading,
// and it is why he is cited rather than thanked.
//
// Nothing here is endorsed by Yale, by the Smithsonian, or by anyone else. Both are named
// because they are where the claim comes from — an origin, not an ally.

const SOURCES = [
  {
    label: 'Smithsonian Institution Archives — “A Forgotten History: Alfred Vail and Samuel Morse”, Courtney Bellizzi, 24 May 2011',
    href: 'https://siarchives.si.edu/blog/forgotten-history-alfred-vail-and-samuel-morse',
    what: 'Vail built and financed the machines and developed the simpler dot-and-dash alphabet; the patents carried Morse’s name.',
  },
  {
    label: 'Yale & Slavery Research Project — “Samuel F.B. Morse: Artist, Inventor, White Supremacist”',
    href: 'https://yaleandslavery.yale.edu/',
    what: 'Yale’s own project records Morse, B.A. 1810, as one of the most notorious proslavery advocates of his era.',
  },
  {
    label: 'Library of Congress — Samuel Morse papers, timeline 1791–1839',
    href: 'https://www.loc.gov/collections/samuel-morse-papers/articles-and-essays/timeline/1791-1839/',
    what: 'Morse graduated from Yale College in 1810, and later ran for mayor on a nativist, anti-immigration ticket.',
  },
];

export default function XEqualsXWhoIsCredited() {
  return (
    <section aria-labelledby="who-is-credited" className="my-10 border-y border-record-ink/20 py-7">
      <div className="flex items-baseline justify-between gap-4 border-b border-record-ink/20 pb-2">
        <span id="who-is-credited" className="font-mono text-[12px] uppercase tracking-[0.16em] text-record-muted">
          Why any of this is written down
        </span>
      </div>

      <div
        className="mt-5 text-record-ink"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 4.6vw, 26px)', lineHeight: 1.18 }}
      >
        Who gets remembered
      </div>

      <div className="mt-4 max-w-[52ch] space-y-4">
        <p>
          A message can cross a country in dots. What cannot travel is the name of the person who
          made the dots work: it stays where the room was, and the room empties.
        </p>
        <p>
          Alfred Vail built and paid for the telegraph machinery and turned it into a working
          alphabet. The patents carried Morse’s name, and the history carried his alone. The
          invention was never the hard part. Keeping the name of the person who did the work
          attached to the work is the hard part, and it is the only thing a record does that a feed
          cannot.
        </p>
        <p>
          Morse is named here, not thanked. Yale’s own research project records him as one of the
          most notorious proslavery advocates of his era, and he stood for mayor on a nativist
          ticket. A page that says nobody is above anybody does not get to leave that out and keep
          the borrowed prestige.
        </p>
        <p>
          That is the whole argument of this record, and it fits in a sentence: whatever is done on
          this planet that works is only worth anything if the next person can find it, check where
          it came from, and see that it was somebody’s work.
        </p>
      </div>

      <div className="mt-6 border-t border-record-ink/15 pt-4">
        {SOURCES.map(({ label, href, what }) => (
          <div key={href} className="border-b border-record-ink/10 py-3 last:border-b-0">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12.5px] leading-relaxed text-record-red underline decoration-dotted underline-offset-2 transition-colors hover:text-record-ink"
            >
              {label}
            </a>
            <p className="record-meta mt-1 text-record-muted">{what}</p>
          </div>
        ))}
        <p className="record-meta mt-4 text-record-muted">
          Cited, not endorsed. Nothing here is approved by Yale, by the Smithsonian, or by anyone
          else — they are named because they are where the claim comes from.
        </p>
      </div>
    </section>
  );
}