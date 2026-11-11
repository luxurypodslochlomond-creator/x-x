import React from 'react';
import useRecordBack from './useRecordBack';
import { ArrowLeft } from 'lucide-react';

/* ── ONE WAY BACK, ON EVERY PAGE OF THE RECORD ─────────────────────────────────────
   This bar existed four times: in the shell, and hand-copied into the map page, the
   impact page and anywhere else somebody needed a way out. Four copies drift — a
   different size here, a different border there, and one that quietly stopped going
   back to where the reader came from. On a record whose whole claim is that it is one
   place, the one control a reader touches on every single page has to be the same
   control: same size, same place, same behaviour, every time.

   It was a black-rimmed block with a fat arrow in it — a button from another product
   sitting under a printed page. It is now a hairline and a drawn arrow in the record's
   own ink: the same hand as the doors, so the way out belongs to the same book. */
export default function RecordBackBar({ eyebrow, fallback = '/TogetherChangeClimate', right }) {
  const back = useRecordBack(fallback);

  return (
    <div className="record-back-bar border-b border-record-ink/15">
      <div className="mx-auto flex max-w-[1100px] items-center gap-3 px-4 py-2 lg:px-10">
        <button
          type="button"
          onClick={back}
          aria-label="Back"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center text-record-ink transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1.6} />
        </button>
        <span className="min-w-0 truncate font-mono text-[11px] uppercase tracking-[0.16em] text-record-muted">
          {eyebrow}
        </span>
        {right ? <div className="ml-auto flex-shrink-0">{right}</div> : null}
      </div>
    </div>
  );
}