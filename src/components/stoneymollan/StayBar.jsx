import React from 'react';
import { BOOK_DIRECT, EMAIL } from './links';
import { EnvelopeMark } from './StoneymollanIcons';

/* A phone has one job on this page: get somebody to the booking. So on a narrow
   screen only, one line sits at the foot of the glass with the door on it — the
   direct one, in the record's red, with the email beside it for anyone who would
   rather ask a question first. Desktop keeps the page clean; it has the room. */
export default function StayBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-record-ink/25 bg-record-bone/95 backdrop-blur md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center gap-2 px-3 py-2.5">
        <a
          href={BOOK_DIRECT}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[44px] flex-1 items-center justify-center border-2 border-record-signal bg-record-signal px-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-record-paper active:bg-record-ink"
        >
          Check dates &middot; book direct
        </a>
        <a
          href={`mailto:${EMAIL}`}
          aria-label="Email Brian and Gillian"
          className="flex h-11 w-11 items-center justify-center border-2 border-record-ink/30 text-record-ink active:bg-record-ink/10"
        >
          <EnvelopeMark className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}