import React from 'react';
import '@/components/climate/search/base-one.css';

// ── WHO IS ANSWERING, AND WHAT IT HOLDS ─────────────────────────────────────────
// Brian, 17 November: "why page look clunky and not out colours and not future and not
// you bro … this could be proper coolasfuck art." Then, an hour later, the correction
// that settled it: "need to look more like us haha and Beadie etc."
//
// Both are true together. The front of the index is still a printed plate — ink ground,
// the name of the thing at poster scale, the mark's red as the rule under it, the record's
// own yellow band closing it — because that IS this record's hand, the one the masthead
// opens with and the foot closes with. What has gone is the drawing I borrowed from
// somewhere else: the cut corners, the disc, the ladder, the constellation. None of that
// was ever ours. A sheet of this record is a rectangle with its guts printed on it, and
// that is what this is now.
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
    <section className="base-one relative border-2 border-record-ink bg-record-ink text-record-paper">
      {/* ── THE BAND ACROSS THE TOP ────────────────────────────────────────────────
          The masthead's own yellow, one line, edge to edge — the same band that runs over
          every page of the record and closes the foot of it. A reader arriving here should
          be able to tell, in half a second and without reading, that they are still in the
          book. */}
      <div className="flex items-center justify-between gap-3 border-b-2 border-record-ink bg-cartoon-sun px-3.5 py-1.5">
        <span className="font-mono text-[8.5px] uppercase leading-tight tracking-[0.22em] text-record-ink">
          Index · the record’s own
        </span>
        <span className="shrink-0 font-mono text-[8.5px] uppercase tracking-[0.18em] text-record-mark">
          Sheet 01
        </span>
      </div>

      <div className="base-one__ground relative px-3.5 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5">
        <h1
          className="relative text-record-paper"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(50px, 17vw, 104px)',
            lineHeight: 0.84,
            letterSpacing: '-0.045em',
          }}
        >
          BASE<span className="text-record-mark">&nbsp;1</span>
        </h1>

        {/* The red rule under the name: a bar, not an ornament. It is the same mark the
            record uses everywhere it wants a line to be a statement. */}
        <div aria-hidden="true" className="relative mt-2.5 flex items-center gap-2">
          <span className="h-1 w-20 bg-record-mark" />
          <span className="h-1 w-1 bg-cartoon-sun" />
          <span className="h-1 flex-1 bg-record-mark/30" />
        </div>

        <p className="relative mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-cartoon-sun">
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

        {/* The contents are on the plate on a phone too. They were once hidden below the
            small breakpoint, which left a mobile reader looking at a title and a rule and
            no answer at all to "what is in here". */}
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

      {/* ── THE FOOT OF THE SHEET ──────────────────────────────────────────────────
          Yellow again, with the record's own mark on the right in its red. The line on the
          left is the promise the plate is making; the mark on the right is the one every
          page of this book already carries. */}
      <div className="relative flex items-center justify-between gap-3 border-t-2 border-record-ink bg-cartoon-sun px-3.5 py-1.5">
        <span className="font-mono text-[8.5px] uppercase leading-tight tracking-[0.16em] text-record-ink">
          Nothing guessed · nothing ranked · nothing sold
        </span>
        <span className="shrink-0 font-mono text-[10px] font-black uppercase tracking-[0.1em] text-record-mark">
          x = x
        </span>
      </div>
    </section>
  );
}