import React from 'react';
import '@/components/climate/search/base-one.css';

// ── WHO IS ANSWERING, AND WHAT IT HOLDS ─────────────────────────────────────────
// Brian, 17 November: "why page look clunky and not out colours and not future and not
// you bro … this could be proper coolasfuck art." He was right: the front of the index
// was a paragraph of grey explanation above a yellow field, which is a form, and a form
// is what a record of the world should never look like.
//
// So the front of it is a printed plate: ink ground, the name of the thing at poster
// scale, the mark's red as the rule under it, and the record's own yellow band closing
// it — the same three colours the masthead opens with and the foot closes with, so the
// index belongs to the book instead of sitting inside it. The ten rooms it reads are
// printed on the plate, in colour, because the honest answer to "what is in here" is the
// record's own contents and not a sentence about them.
const HOLDS = [
  { label: 'Solutions', tone: 'border-cartoon-sun text-cartoon-sun' },
  { label: 'Crises', tone: 'border-record-mark text-record-mark' },
  { label: 'Actions', tone: 'border-record-light-signal text-record-light-signal' },
  { label: 'Groups', tone: 'border-record-light-signal text-record-light-signal' },
  { label: 'The wire', tone: 'border-cartoon-sun text-cartoon-sun' },
  { label: 'Pictures', tone: 'border-record-light-signal text-record-light-signal' },
  { label: 'Readers’ words', tone: 'border-record-paper/60 text-record-paper/85' },
  { label: 'The roll', tone: 'border-record-mark text-record-mark' },
  { label: 'Music', tone: 'border-cartoon-sun text-cartoon-sun' },
  { label: 'Drawings', tone: 'border-record-light-signal text-record-light-signal' },
];

export default function BaseOnePlate({ statement }) {
  return (
    <section className="base-one border-2 border-record-ink bg-record-ink text-record-paper">
      <div className="base-one__ground px-3.5 pb-4 pt-5 sm:px-5 sm:pb-5 sm:pt-6">
        <span aria-hidden="true" className="base-one__reg left-1.5 top-1.5">+</span>
        <span aria-hidden="true" className="base-one__reg right-1.5 top-1.5">+</span>
        <span aria-hidden="true" className="base-one__reg bottom-1.5 left-1.5">+</span>
        <span aria-hidden="true" className="base-one__reg bottom-1.5 right-1.5">+</span>

        <p className="relative font-mono text-[9px] uppercase tracking-[0.34em] text-cartoon-sun">
          Index · the record’s own
        </p>

        <h1
          className="relative mt-1 text-record-paper"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(50px, 17vw, 104px)',
            lineHeight: 0.84,
            letterSpacing: '-0.045em',
          }}
        >
          BASE 1
        </h1>

        <div aria-hidden="true" className="relative mt-2.5 h-[3px] w-16 bg-record-mark" />

        <p className="relative mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-record-light-signal">
          One question · every room · every tongue
        </p>

        {statement && (
          <p
            className="relative mt-2.5 max-w-[44ch] text-[13px] leading-relaxed text-record-paper/75"
            style={{ fontFamily: 'var(--font-reading)' }}
          >
            {statement}
          </p>
        )}

        <ul className="relative mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 sm:grid-cols-3">
          {HOLDS.map((hold) => (
            <li
              key={hold.label}
              className={`border-l-2 pl-2 font-mono text-[9px] uppercase leading-tight tracking-[0.12em] ${hold.tone}`}
            >
              {hold.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between gap-3 border-t-2 border-record-ink bg-cartoon-sun px-3.5 py-1.5">
        <span className="font-mono text-[8.5px] uppercase leading-tight tracking-[0.16em] text-record-ink">
          Nothing guessed · nothing ranked · nothing sold
        </span>
        <span className="shrink-0 font-mono text-[8.5px] uppercase tracking-[0.16em] text-record-mark">
          Sheet 01
        </span>
      </div>
    </section>
  );
}