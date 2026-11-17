import React from 'react';
import { Link } from 'react-router-dom';

// ── THE YELLOW LINE UNDER THE RECORD'S NAME ─────────────────────────────────────
// First cut of this was set in the reading voice at eleven pixels, in italic, next to a
// red x = x — three voices in one thin strip, and on a phone it read as a squint rather
// than as a stamp. It was dire, and it was dire because it was the wrong voice.
//
// The yellow on this record already has one voice, and it is the foot's: the credit chip,
// mono, uppercase, widely tracked, ink on cartridge yellow. The same line is set the same
// way on every card the record hands out ("THIS IS THE TIME…"). So the top line is now
// that exact voice, at that exact weight — not a new treatment, the one the record already
// uses for a fact it wants read as a stamp. And it sits under the record's name rather
// than above it, so the name still opens the page and the yellow line sits beneath it like
// a dateline, which is what it is.
export default function RecordTimeBar({ className = '' }) {
  return (
    <div className={`bg-cartoon-sun text-record-ink ${className}`}>
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-3 px-4 py-[3px] lg:gap-6 lg:px-10 lg:py-1">
        <p className="min-w-0 font-mono text-[9px] uppercase leading-[1.45] tracking-[0.14em] lg:text-[10px] lg:tracking-[0.18em]">
          This is the time. And this is the record of the time.
        </p>

        <Link
          to="/XEqualsX"
          aria-label="x = x — what the mark means, and what it does not"
          className="shrink-0 text-record-mark transition-colors hover:text-record-ink"
          style={{ fontFamily: 'var(--font-reading)', fontSize: 15, lineHeight: 1, letterSpacing: '-0.03em' }}
        >
          x = x
        </Link>
      </div>
    </div>
  );
}