import React from 'react';
import RecordBand from './RecordBand';

// ── THE CASE, NOT THE ESSAY ────────────────────────────────────────────────────
// The founder asked the right question about this section: why is Morse here at all, and
// is it even valid? It is valid, and it is here for one reason only — it is the best
// documented case on earth of the thing this page is about: the man who built the working
// machine lost the name, and the man whose name went on the patent kept it.
//
// What was cut: four paragraphs of my own argument wrapped round it, and the long formal
// citation strings, which read as legal boilerplate ("L words" — the founder's words) and
// made a reader scroll past the evidence rather than check it. The sources are now named
// the way a person names a source: who it is, and what it says.
//
// Morse is cited, never thanked. Both facts about him are printed, because a page that
// says nobody is above anybody cannot quietly leave out the parts of a man that contradict
// it — and because naming only the convenient half would make the rest of the page worth
// nothing.

const SOURCES = [
  {
    who: 'Smithsonian Institution Archives',
    says: 'Vail built and financed the machines and worked out the simpler dot-and-dash alphabet. The patents carried Morse’s name.',
    href: 'https://siarchives.si.edu/blog/forgotten-history-alfred-vail-and-samuel-morse',
  },
  {
    who: 'Yale & Slavery Research Project',
    says: 'Morse, Yale 1810, recorded by his own university as one of the most notorious proslavery advocates of his era.',
    href: 'https://yaleandslavery.yale.edu/',
  },
  {
    who: 'Library of Congress — Morse papers',
    says: 'Graduated Yale College in 1810, and later stood for mayor on a nativist, anti-immigration ticket.',
    href: 'https://www.loc.gov/collections/samuel-morse-papers/articles-and-essays/timeline/1791-1839/',
  },
];

export default function XEqualsXWhoIsCredited() {
  return (
    <RecordBand id="who-is-credited" label="The case · 1844" title="The name that stayed">
      <div className="max-w-[52ch] space-y-4 text-[15.5px] leading-[1.6] text-record-ink">
        <p>
          A message crossed a country in dots. The name of the man who made the dots work did not
          travel with it.
        </p>
        <p>
          Alfred Vail built and paid for the telegraph machinery and turned it into a working
          alphabet. The patents carried Morse’s name. The history carried Morse’s name. The
          invention was never the hard part — keeping the name of the person who did the work
          attached to the work is the hard part.
        </p>
        <p>
          Morse is named here, not thanked. His own university records him as one of the most
          notorious proslavery advocates of his era, and he stood for mayor on a nativist ticket. A
          page that says nobody is above anybody does not get to leave that out and keep the
          borrowed prestige.
        </p>
      </div>

      <div className="mt-6 border-t border-record-ink/15">
        {SOURCES.map(({ who, says, href }) => (
          <div key={href} className="border-b border-record-ink/10 py-3">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-record-red transition-colors hover:text-record-ink"
            >
              {who} ↗
            </a>
            <p className="mt-1.5 max-w-[50ch] text-[14px] leading-[1.5] text-record-muted">{says}</p>
          </div>
        ))}
        <p className="mt-3 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.12em] text-record-muted">
          Cited, not endorsed. Named because they are where the claim comes from.
        </p>
      </div>
    </RecordBand>
  );
}