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
//
// 17 November, again: "still feels linear to me bro and not alive." So the plate is no
// longer a rectangle. It is cut by hand — two corners pulled, two left square — and a red
// disc has been printed on it, with a ladder in the corner and a constellation over the
// foot, the way Miró fills a field: forms of different sizes, none of them explaining
// anything, all of them holding the eye in one place instead of letting it slide down a
// column. The disc turns once every seventy seconds. Nothing else moves.
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

// The ladder. Miró's own way out of a field, and the right mark for an index: an index is
// a way up and out of a pile, not another pile. Drawn in paper so it reads as printed on
// the ink rather than laid over it.
function Ladder() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 26 74" className="h-full w-full" fill="none">
      <path d="M3 1v72M23 1v72" stroke="rgb(239 231 214)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 13h20M3 27h20M3 41h20M3 55h20" stroke="rgb(239 231 214)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// A constellation: four points of four different sizes, joined by a hairline that leads
// nowhere. Drawn at a fixed size so no circle is ever stretched by a wide screen.
function Constellation() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 118 46" className="h-full w-full" fill="none">
      <path d="M2 34 L34 12 L62 26 L92 9 L116 20" stroke="rgb(239 231 214)" strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="34" cy="12" r="3.4" fill="#b3261e" />
      <circle cx="62" cy="26" r="2" fill="rgb(239 231 214)" fillOpacity="0.8" />
      <circle cx="92" cy="9" r="1.6" fill="#ffd447" />
      <circle cx="2" cy="34" r="1.4" fill="rgb(239 231 214)" fillOpacity="0.55" />
    </svg>
  );
}

export default function BaseOnePlate({ statement }) {
  return (
    <section className="base-one base-one__cut relative border-2 border-record-ink bg-record-ink text-record-paper">
      <div className="base-one__ground relative px-3.5 pb-4 pt-5 sm:px-5 sm:pb-5 sm:pt-6">
        {/* Printed on the ink, bleeding off the right edge, held at low weight wherever
            any type has to survive on top of it. */}
        <div aria-hidden="true" className="pointer-events-none absolute -right-7 -top-8 h-[86px] w-[86px] sm:h-[110px] sm:w-[110px]">
          <svg viewBox="0 0 100 100" className="bo-sun h-full w-full" fill="none">
            <circle cx="50" cy="50" r="44" fill="#b3261e" />
            <circle cx="50" cy="50" r="30" stroke="rgb(239 231 214)" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 6" />
            <circle cx="50" cy="50" r="6" fill="rgb(244 239 228)" />
          </svg>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute bottom-16 left-2 h-[34px] w-[92px] opacity-60 sm:h-[46px] sm:w-[118px]">
          <Constellation />
        </div>
        <div aria-hidden="true" className="bo-drift pointer-events-none absolute -right-1 bottom-14 h-[58px] w-[21px] opacity-45">
          <Ladder />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute right-4 top-[46%] h-2.5 w-2.5 rounded-full bg-cartoon-sun" />

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
          BASE<span className="text-record-mark">&nbsp;1</span>
        </h1>

        <div aria-hidden="true" className="relative mt-2.5 flex items-center gap-2">
          <span className="h-[3px] w-16 bg-record-mark" />
          <span className="h-2 w-2 rounded-full bg-record-mark" />
        </div>

        <p className="relative mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-record-light-signal">
          One question · every room · every tongue
        </p>

        {statement && (
          <p
            className="relative mt-2.5 hidden max-w-[44ch] text-[13px] leading-relaxed text-record-paper/75 sm:block"
            style={{ fontFamily: 'var(--font-reading)' }}
          >
            {statement}
          </p>
        )}

        {/* The contents are on the plate on a phone too. They were hidden below the small
            breakpoint, which left a mobile reader looking at a title and a rule and no
            answer at all to "what is in here". */}
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

      <div className="relative flex items-center justify-between gap-3 border-t-2 border-record-ink bg-cartoon-sun px-3.5 py-1.5">
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