import React from 'react';
import { Link } from 'react-router-dom';
import { PRIMARY_NAV } from '@/components/climate/recordFooterLinks';

// ── THE INDEX ───────────────────────────────────────────────────────────────────
// Five plain words in a row read as a website's menu no matter how well they are set.
// What a printed record does instead is number its way through itself: an index, with
// the figure above the word, hairline under the one you are standing on. That is the
// whole difference between a menu and a piece of printed matter — and it needs no
// icon, no box, no border and no picture to be unmistakably this record's.
//
// The numbers are not decoration and not a sequence to follow: 01 to 05 are the order
// the record itself moves in, said once, in the machine's small hand. The words are the
// record's voice. Everything else is air.
export default function ClimateNav({ currentPage }) {
  return (
    <nav
      aria-label="Main navigation"
      className="grid grid-cols-5 gap-x-1 sm:flex sm:flex-wrap sm:items-start sm:justify-end sm:gap-x-6 lg:gap-x-8"
    >
      {PRIMARY_NAV.map(({ label, to, page }, i) => {
        const active = currentPage === page;
        return (
          <Link
            key={to}
            to={to}
            aria-current={active ? 'page' : undefined}
            className={`group flex min-h-[46px] flex-col items-center justify-center gap-1 px-1 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red sm:min-h-0 sm:items-start sm:gap-1.5 sm:px-0 ${
              active ? 'text-record-red' : 'text-record-ink hover:text-record-red'
            } transition-colors`}
          >
            <span
              aria-hidden="true"
              className={`font-mono text-[12px] leading-none tabular-nums ${
                active ? 'text-record-mark' : 'text-record-muted'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className="text-[12px] leading-none sm:text-[14.5px]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {label}
            </span>
            {/* The hairline is the only thing that moves: it is drawn under the page you
                are actually on, and nowhere else. A record does not wag. */}
            <span
              aria-hidden="true"
              className={`block h-px w-full transition-colors ${
                active ? 'bg-record-mark' : 'bg-transparent group-hover:bg-record-ink/25'
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}