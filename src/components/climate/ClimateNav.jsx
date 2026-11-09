import React from 'react';
import { Link } from 'react-router-dom';
import { PRIMARY_NAV } from '@/components/climate/recordFooterLinks';
import { MarkBrief, MarkSignal, MarkHorizon, MarkPortrait, MarkLens } from './RecordFootMarks';

// ── THE INDEX, IN THE SAME HAND AS THE PAGE ───────────────────────────────────
// A row of plain words is a website's menu. So each door now carries the same hairline
// engraving the rest of the record is drawn with — a folded sheet, a message going out,
// a world in three lines, a bust on its plinth, a lens. One hand, one weight, no second
// colour, and no picture that means something other than the door it stands on.
//
// The figure above the word keeps it a printed contents page rather than a toolbar. On a
// phone the figure comes off, because a masthead is not the place to make somebody count.
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
      className="grid grid-cols-5 gap-x-1 sm:flex sm:flex-wrap sm:items-start sm:justify-end sm:gap-x-6 lg:gap-x-8"
    >
      {PRIMARY_NAV.map(({ label, to, page }, i) => {
        const active = currentPage === page;
        const Mark = MARKS[to] || MarkBrief;
        return (
          <Link
            key={to}
            to={to}
            aria-current={active ? 'page' : undefined}
            className={`group flex min-h-[52px] flex-col items-center justify-center gap-1 px-1 py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red sm:min-h-0 sm:items-start sm:gap-1 sm:px-0 ${
              active ? 'text-record-red' : 'text-record-ink hover:text-record-red'
            } transition-colors`}
          >
            <Mark size={19} className="shrink-0 sm:mb-0.5" />
            <span
              aria-hidden="true"
              className={`hidden font-mono text-[12px] leading-none tabular-nums sm:block ${
                active ? 'text-record-mark' : 'text-record-muted'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-[12px] leading-none sm:text-[14.5px]" style={{ fontFamily: 'var(--font-display)' }}>
              {label}
            </span>
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