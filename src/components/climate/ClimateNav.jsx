import React from 'react';
import { Link } from 'react-router-dom';
import { PRIMARY_NAV } from '@/components/climate/recordFooterLinks';
import { markFor } from './pageMarks';

// ── THE WAY THROUGH THE RECORD ─────────────────────────────────────────────────
// Six doors, one drawn mark and one word each, in the order a reader arrives: what is
// on the record, what changed, where it is, who is reading it, whose record it is, and
// the one that reaches everything else.
//
// It is a ruled block of printed contents, not a row of buttons. On a phone the six sit
// three across and two down, each in its own ruled cell, mark above word, so every door
// has a thumb-sized square and nothing has to be swiped or folded away to be found. On a
// wider page the same six sit in one line to the right, mark beside word, because a line
// reads across. Nothing is abbreviated, nothing is numbered, and the current page is said
// twice over — in the word's colour and in a hairline under it — never in colour alone.
//
// The marks all come from pageMarks, so the masthead, the foot and the contents page can
// never drift into three different hands.
export default function ClimateNav({ currentPage }) {
  return (
    <nav
      aria-label="Main navigation"
      className="-mx-4 mt-2 grid grid-cols-3 border-y border-record-ink/15 sm:mx-0 sm:mt-3 sm:flex sm:flex-wrap sm:items-center sm:justify-end sm:gap-x-6 sm:border-y-0 lg:gap-x-9"
    >
      {PRIMARY_NAV.map(({ label, to, page }) => {
        const active = currentPage === page;
        const Mark = markFor(to);
        return (
          <Link
            key={to}
            to={to}
            aria-current={active ? 'page' : undefined}
            className={`group relative flex min-h-[64px] flex-col items-center justify-center gap-1.5 px-1 py-3 transition-colors [&:nth-child(n+4)]:border-t [&:nth-child(n+4)]:border-record-ink/15 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-record-red sm:min-h-[44px] sm:flex-row sm:gap-2 sm:border-0 sm:px-0 sm:py-1 ${
              active ? 'text-record-red' : 'text-record-ink hover:text-record-red'
            }`}
          >
            <Mark
              size={21}
              className={`shrink-0 transition-opacity sm:h-[18px] sm:w-[18px] ${
                active ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
              }`}
            />
            <span
              className={`border-b pb-0.5 text-[13px] leading-none sm:text-[14px] ${
                active ? 'border-record-mark' : 'border-transparent group-hover:border-record-ink/25'
              }`}
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.01em' }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}