import React from 'react';
import { MarkPortrait } from './RecordFootMarks';

// ── AND ME ─────────────────────────────────────────────────────────────────────
// The page has a section saying whose record this is — Janine's — and none saying who
// made it. Which is why it read as a document about a principle rather than something
// a person did: there was a founder with a biography and a builder with no name at all.
//
// So: first person, short, nothing sold. Where it was built, whose work it was built
// around, and the two people it owes something to — said as debts rather than as
// credentials. A reader can disagree with all of it. The one thing they cannot do is not
// know who wrote it.
//
// An unnamed "research institute" stood in this note, and it is gone. It read as borrowed
// authority — a letterhead implied without one being named, which is the exact thing this
// page is written against — and it put a relationship on the record that nobody had agreed
// to. No university, funder or institute is named here as a backer, because none of them is
// one. The work is named, and the person who did it is named.
//
// Signed, because an unsigned page asking to be trusted is the exact thing this record
// was built against.
export default function XEqualsXNoteFromTheBuilder() {
  return (
    <section aria-labelledby="why-i-built-this" className="my-10 border-l-2 border-record-mark pl-5 sm:pl-7">
      <div className="flex items-center gap-3">
        <MarkPortrait size={22} className="shrink-0 text-record-ink" />
        <h2
          id="why-i-built-this"
          className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-record-muted"
        >
          Why I built this
        </h2>
      </div>

      <div className="mt-4 max-w-[54ch] space-y-3.5 text-[15.5px] leading-[1.62] text-record-ink">
        <p>
          I built this in a shed in Scotland, on a phone, in the gaps between other work. Not for a
          funder, not for a panel, and not for any institution's approval.
        </p>
        <p>
          It began as a question about one person's life work — forty years of it, gathered by
          Janine Selendy — and whether it could be kept whole and traceable instead of being
          admired and then lost. So I made it. That is the whole of my qualification: I am the one
          who did the work.
        </p>
        <p>
          Her name is on the record because the work is hers. Mine is on this page because the page
          is mine. Nobody else's is on either, and no letterhead stands behind it: no university,
          funder or institute has read this or agreed to it, and none is relied on. It is built to
          be taken apart by whoever wants to — every claim sourced, every limit stated, nothing
          asked for on trust.
        </p>
        <p>
          It is meant to look like a record somebody kept, because that is what it is. Not a brand,
          and deliberately not a logo.
        </p>
        <p>
          Janine Selendy spent forty years gathering what actually works on this planet and let it be
          opened to everyone. Laurie Anderson wrote a single in 1981 that taught me a flat sentence
          can be the loudest thing in a room. I borrowed one of her reds and one of her phrases to
          say thank you with — in the open, where she can take them back.
        </p>
        <p>
          Nothing here asks you to trust me. Every entry goes to its source, every correction is made
          in daylight, and the number of people who have signed off on this page is zero, because
          nobody has to. That is the only pass this record has ever needed.
        </p>
      </div>

      <p
        className="mt-5 text-[19px] leading-[1.2] text-record-ink"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Brian Hughes
      </p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-record-muted">
        Scotland · x = x
      </p>
    </section>
  );
}