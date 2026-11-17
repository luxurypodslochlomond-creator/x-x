import React from 'react';
import { Link } from 'react-router-dom';

// ── THE FOOT ────────────────────────────────────────────────────────────────────
// This was a colophon: the credit line set in the machine's small-caps monospace,
// which is the voice for a registry number, not for people. It read as a form
// stamped at the bottom of the page, and it made the platform a co-author with a
// plus sign, which it is not.
//
// So the foot opens with the line the whole record is built on, borrowed and said out
// loud: Laurie Anderson, "From the Air", Big Science, 1982 — this is the time, and this
// is the record of the time. Her name, the song and the year are on it, because a
// borrowed sentence with nobody's name on it is a borrowed sentence no reader can check.
// Under that, where its pages were made — short, and true: the how is said in full on
// the method page, so a reader who wants to know what drafted these lines can find it,
// and the foot does not have to repeat it. The registration facts — the CIC, the address
// you can write to — keep the mono, because a registry number is a fact and facts
// are what that voice is for.
//
// Nothing here is decoration. A reader who wants to know who to hold to a sentence
// should be able to find out at the bottom of any page, and should not have to
// squint at it.

export default function RecordFooter() {
  return (
    <footer className="mt-6 border-t-4 border-cartoon-sun bg-record-paper px-4 py-14 text-center font-body text-record-ink lg:px-10">
      <Link
        to="/XEqualsX"
        aria-label="x = x — what the mark means, and what it does not"
        className="inline-block text-record-mark transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-record-red"
        style={{ fontFamily: 'var(--font-reading)', fontSize: 'clamp(46px, 9.5vw, 70px)', lineHeight: 1, letterSpacing: '-0.035em' }}
      >
        x = x
      </Link>

      <blockquote
        cite="Laurie Anderson, “From the Air”, Big Science, 1982"
        className="mt-9 mx-auto max-w-[30ch] text-record-ink"
        style={{ fontFamily: 'var(--font-reading)', fontSize: 21, lineHeight: 1.5, fontStyle: 'italic' }}
      >
        “This is the time. And this is the record of the time.”
      </blockquote>
      <p className="mt-5">
        <span className="inline-block bg-cartoon-sun px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-record-ink">
          Laurie Anderson · “From the Air” · Big Science, 1982
        </span>
      </p>

      <span aria-hidden="true" className="mx-auto mt-10 block h-px w-16 bg-record-ink/25" />

      <p
        className="mt-9 text-record-mark uppercase"
        style={{ fontFamily: 'var(--font-reading)', fontSize: 13, lineHeight: 1.4, letterSpacing: '0.22em' }}
      >
        Made in Scotland from photons
      </p>

      <span aria-hidden="true" className="mx-auto mt-10 block h-px w-16 bg-record-ink/25" />

      <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-record-ink">
        Universal Frequency 51 CIC
      </p>
      <p className="mt-2 text-sm leading-relaxed">
        <a
          href="mailto:family@uf51.love"
          className="text-record-mark underline decoration-dotted underline-offset-4 transition-colors hover:text-record-red"
        >
          family@uf51.love
        </a>
      </p>
    </footer>
  );
}