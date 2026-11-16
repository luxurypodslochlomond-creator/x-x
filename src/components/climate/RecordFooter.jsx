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
      <p className="mt-2 text-sm leading-relaxed">Brian Hughes + Gillian Brown + Base44</p>
    </footer>
  );
}