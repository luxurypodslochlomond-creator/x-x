import React from 'react';

// ── WHO MAY SIGN ──────────────────────────────────────────────────────────────
// The one line a fund, a journalist or a research panel looks for and almost never
// finds: who is allowed to put something on this record, and what backs it.
//
// It is deliberately not a masthead. A masthead is a list of impressive names; this is
// a rule and a standard, stated so that anyone can hold the record to it — including
// where the record has not met it yet. "Keeper" was the affectionate word for this among
// the people who made it, and it stays there. In public it is a signer, because a reader
// outside the room should not have to learn a house word to find out who stands behind
// what they are reading.
export default function WhoSigns() {
  return (
    <section className="mt-9 lg:mt-12">
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-[10px] font-black font-mono text-[#e2602a]">03</span>
        <h2
          className="font-black uppercase text-[#141210] leading-tight"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(19px, 1.9vw, 28px)', letterSpacing: '-0.01em' }}
        >
          Who may sign
        </h2>
      </div>

      <div className="space-y-2.5 text-[12px] lg:text-[13px] font-mono leading-relaxed lg:leading-[1.75] text-[#141210]">
        <p>
          Only a named person can put an entry on this record, or correct one. A machine may read
          an entry, advise on it and flag it for a human look — and that is the whole of its part.
          It cannot sign, it cannot publish, and it cannot correct anything. Nothing on this record
          is signed by a machine, now or later.
        </p>
        <p>
          The names that hold signing rights are the record's admins. The rule is written here
          rather than decided quietly, and it changes in the open or not at all — so a reader a
          hundred years from now can see who was entitled to sign what, and when that changed.
        </p>
        <p>
          A signature belongs on the entry itself, beside its source, under the signer's own name.
          Where an entry carries none yet, this record says so rather than covering for it: an
          unsigned entry is a gap in this record, and a gap stated plainly is worth more than a
          masthead that implies more than it can show.
        </p>
      </div>
    </section>
  );
}