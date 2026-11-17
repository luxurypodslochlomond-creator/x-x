import React from 'react';
import { Link } from 'react-router-dom';

// ── THE YELLOW BAND ACROSS THE TOP OF THE RECORD ────────────────────────────────
// The foot of the record has carried this sentence for a while, and it is the best thing on
// the page: Laurie Anderson's line, in the reading voice, under a yellow band. The top of the
// record only ever said "Record of the Time" in a bare name line, which was true and had no
// music in it at all.
//
// So the foot's band goes up top as well — the same cartridge yellow, the same ink, the same
// sentence — and it pins with the masthead, so wherever a reader has scrolled to, the record
// says out loud whose phrase it borrowed. The credit travels with the sentence here exactly as
// it does at the foot: the line is hers, and the record does not print it without her name on
// it. x = x sits at the far end, in the mark's borrowed red, as the mark always does.
export default function RecordTimeBar() {
  return (
    <div className="bg-cartoon-sun text-record-ink">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-3 px-4 py-1 lg:gap-6 lg:px-10 lg:py-1.5">
        <span className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.16em] text-record-ink/70 lg:block">
          Laurie Anderson · “From the Air” · Big Science, 1982
        </span>

        <p
          className="min-w-0 text-[11px] leading-[1.35] lg:text-[13.5px]"
          style={{ fontFamily: 'var(--font-reading)', fontStyle: 'italic' }}
        >
          “This is the time. And this is the record of the time.”
        </p>

        <Link
          to="/XEqualsX"
          aria-label="x = x — what the mark means, and what it does not"
          className="shrink-0 text-record-mark transition-colors hover:text-record-ink"
          style={{ fontFamily: 'var(--font-reading)', fontSize: 17, lineHeight: 1, letterSpacing: '-0.03em' }}
        >
          x = x
        </Link>
      </div>
    </div>
  );
}