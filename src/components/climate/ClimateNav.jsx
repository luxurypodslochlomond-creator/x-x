import React from 'react';
import { Link } from 'react-router-dom';
import { PRIMARY_NAV } from '@/components/climate/recordFooterLinks';
import { MarkBrief, MarkSignal, MarkHorizon, MarkPortrait, MarkLens } from './RecordFootMarks';

// ── THE WAY THROUGH THE RECORD ─────────────────────────────────────────────────
// This has been through several hands: plain words, then nine drawn doors, then words
// again, then marks with a printed contents number above each one. The numbers were the
// last thing to go, and they went for a plain reason — a number beside an icon is two
// systems saying the same thing, and a reader had to decide which one to trust. A door
// needs one mark and one word.
//
// So: the same five hairline engravings, sitting beside their names, in the same order on
// every screen. On a phone the mark sits above the word because a thumb needs the target
// square; on a wider page it sits beside it, because a line reads across. Nothing is
// numbered, nothing is abbreviated, and the current page is said in the mark, in the word,
// and in one hairline under it — never in a colour alone.
const MARKS = {
  '/TogetherChangeClimate': MarkBrief,
  '/ClimateWire': MarkSignal,
  '/ClimateMap': MarkHorizon,
  '/ClimateFounder': MarkPortrait,
  '/ClimateSearch': MarkLens,
};

export default function ClimateNav({ currentPage }) {
  return (
    <nav
      aria-label="Main navigation"
      className="grid grid-cols-5 gap-x-1 sm:flex sm:flex-wrap sm:items-center sm:justify-end sm:gap-x-5 lg:gap-x-7"
    >
      {PRIMARY_NAV.map(({ label, to, page }) => {
        const active = currentPage === page;
        const Mark = MARKS[to] || MarkBrief;
        return (
          <Link
            key={to}
            to={to}
            aria-current={active ? 'page' : undefined}
            className={`group flex min-h-[52px] flex-col items-center justify-center gap-1 px-1 py-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red sm:min-h-[44px] sm:flex-row sm:gap-1.5 sm:px-0 ${
              active ? 'text-record-red' : 'text-record-ink hover:text-record-red'
            }`}
          >
            <Mark size={18} className="shrink-0" />
            <span
              className={`border-b pb-0.5 text-[12px] leading-none transition-colors sm:text-[14px] ${
                active ? 'border-record-mark' : 'border-transparent group-hover:border-record-ink/25'
              }`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}