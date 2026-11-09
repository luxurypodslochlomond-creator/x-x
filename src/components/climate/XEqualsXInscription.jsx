import React from 'react';

// The statement itself now lives on the plate, where it is printed at the size it
// deserves rather than as a second heading under the first. What stays here is the
// opening of the argument, so a reader arriving from the plate is already inside it.
export default function XEqualsXInscription() {
  return (
    <section aria-labelledby="the-covenant" className="pb-2 pt-7">
      <div className="flex items-baseline justify-between gap-4 border-b border-record-ink/20 pb-2">
        <span id="the-covenant" className="font-mono text-[12px] uppercase tracking-[0.16em] text-record-muted">
          The covenant
        </span>
        <span aria-label="x equals x" className="font-mono text-[13px] text-record-mark">x = x</span>
      </div>
      <div className="mt-5 max-w-[48ch] space-y-4">
        <p>
          Good work happens far from the loudest microphone. This record is where it gets kept.
        </p>
        <p>
          An entry needs a source, not a following. A correction needs to be seen, not quietly
          written over.
        </p>
      </div>
      <p className="mt-5 border-l-2 border-record-mark pl-4 text-record-ink">
        x = x is the whole of it. Whoever did the work keeps their name on it, and the record is
        what keeps it there after the room empties.
      </p>
      <p className="record-meta mt-3 text-record-muted">
        Equal human worth. Not equal evidence, and not equal scale.
      </p>
    </section>
  );
}