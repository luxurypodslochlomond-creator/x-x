import React from 'react';
import RecordTongueDoor from '@/components/climate/RecordTongueDoor';

// ── THE YELLOW LINE AT THE TOP OF THE RECORD ────────────────────────────────────
// First cut was set in the reading voice at eleven pixels, italic, next to a red x = x:
// three voices in one thin strip. Second cut fixed the voice — mono, uppercase, tracked,
// the way the foot's yellow chip and every card the record hands out already set this
// line — and then left x = x in the corner, which pushed the sentence into a ragged two
// lines to make room for something the foot already says at seventy pixels.
//
// So x = x comes out of the box. It is not lost: it is the first thing in the foot, and
// it has its own page. What is left is one sentence, broken where a reader would break it
// by hand — "the time" on one line, "the record of the time" on the next — and the tongue,
// which used to sit opposite the record's name and now sits here, because the name has gone
// from the top of the page and the tongue is the one control that must never be buried.
export default function RecordTimeBar({ className = '' }) {
  return (
    <div className={`bg-cartoon-sun text-record-ink ${className}`}>
      <div className="flex items-center gap-3 px-4 py-[3px] lg:gap-6 lg:px-10 lg:py-1">
        <p className="min-w-0 flex-1 font-mono text-[9px] uppercase leading-[1.5] tracking-[0.14em] lg:text-[10px] lg:tracking-[0.18em]">
          This is the time.
          <br className="sm:hidden" />{' '}
          And this is the record of the time.
        </p>

        <RecordTongueDoor size={17} inline />
      </div>
    </div>
  );
}