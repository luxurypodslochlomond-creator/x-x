import React from 'react';
import { Link } from 'react-router-dom';

export default function RecordFooter() {
  return (
    <footer className="mt-6 border-t border-record-ink/20 bg-record-paper px-4 py-12 text-center font-body text-record-ink lg:px-10">
      <Link
        to="/XEqualsX"
        aria-label="x = x — what the mark means, and what it does not"
        className="inline-block text-record-mark transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-record-red"
        style={{ fontFamily: 'var(--font-reading)', fontSize: 'clamp(46px, 9.5vw, 70px)', lineHeight: 1, letterSpacing: '-0.035em' }}
      >
        x = x
      </Link>
      <p className="mt-6 text-base leading-relaxed">A public service for the world</p>

      <span aria-hidden="true" className="mx-auto mt-7 block h-px w-16 bg-record-ink/25" />

      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-record-ink">
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

      {/* A plus sign made the platform a co-author, which it is not. The people who decided
          are the authors; the machine's part is said in words, in its own name, so a reader
          can see exactly which of the two did what. */}
      <p className="mt-6 text-sm leading-relaxed text-record-muted">
        Kept by Brian Hughes and Gillian Brown
      </p>
      <p className="mt-2 text-sm leading-relaxed text-record-muted">
        Drafted and coded by Base 1, a machine built by Base44. It wrote; a person decided, and
        nothing here is published on a machine's word.
      </p>
    </footer>
  );
}