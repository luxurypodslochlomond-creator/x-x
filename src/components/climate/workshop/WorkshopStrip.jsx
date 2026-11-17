import React from 'react';
import { PANELS } from './WorkshopPanels';

// ── THE STRIP, AND THE PANEL NOBODY HAS DRAWN ───────────────────────────────────
// Five frames tell the hour in ten seconds, and then the strip simply stops: the last panel
// is a printed frame with nothing in it, because that is the whole workshop. It is the one
// piece of design on this page that is not decoration — a reader who only looks at the
// pictures still understands that the room draws the ending, and that their frame is kept.
//
// On a phone it is two up, so it is read rather than swiped: nothing auto-plays, nothing
// moves, nothing is hidden behind an arrow that has to be found.

const Frame = ({ n, line, note, art }) => (
  <figure className="flex flex-col border border-record-ink/20 bg-record-bone/50">
    <div className="relative aspect-square border-b border-record-ink/15 p-2 text-record-ink">
      <span className="absolute left-2 top-1 font-mono text-[9px] tracking-[0.14em] text-record-muted">{n}</span>
      <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">{art}</svg>
    </div>
    <figcaption className="p-2 lg:p-3">
      <p className="text-[12.5px] leading-[1.15] lg:text-[16px]" style={{ fontFamily: 'var(--font-display)' }}>{line}</p>
      <p className="mt-1 font-mono text-[9px] uppercase leading-snug tracking-wide text-record-muted lg:text-[10px]">{note}</p>
    </figcaption>
  </figure>
);

export default function WorkshopStrip() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
        {PANELS.map((p) => <Frame key={p.n} {...p} />)}
      </div>

      {/* The sixth frame, deliberately empty. */}
      <figure className="mx-auto mt-3 lg:mt-5 lg:max-w-[620px]">
        <div className="relative flex aspect-[4/3] flex-col items-center justify-center border-2 border-dashed border-record-ink/35 bg-record-paper px-5 text-center">
          <span className="absolute left-2 top-1 font-mono text-[9px] tracking-[0.14em] text-record-red">06</span>
          <svg viewBox="0 0 40 40" className="absolute right-2 top-2 h-6 w-6 text-record-red" aria-hidden="true">
            <path d="M4 14V4h10M26 4h10v10M36 26v10H26M14 36H4V26" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <p className="text-[20px] leading-tight lg:text-[32px]" style={{ fontFamily: 'var(--font-display)' }}>
            The last panel is yours.
          </p>
          <p className="mt-2 max-w-[34ch] text-[12.5px] leading-relaxed text-record-muted lg:text-[14px]" style={{ fontFamily: 'var(--font-reading)' }}>
            It is blank on purpose. One sheet of paper, a pen, and the ending the room decides — then it goes on the wall
            with the name of the hand that drew it.
          </p>
        </div>
        <figcaption className="mt-1.5 font-mono text-[9.5px] uppercase tracking-wide text-record-muted lg:text-center">
          Printed flat, this frame is one A4 sheet — enough for a table of four.
        </figcaption>
      </figure>
    </div>
  );
}