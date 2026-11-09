import React from 'react';
import { Link } from 'react-router-dom';
import { PRIMARY_NAV } from '@/components/climate/recordFooterLinks';

// ── THE WAY THROUGH THE RECORD ─────────────────────────────────────────────────
// This was a ruled grid of six cells, each with a small drawn mark above a word. It looked
// like software, and here is why: six equal cells, six equal marks, six equal words is a
// tab bar wearing a paper colour. Nothing on it had any more weight than anything else, so
// nothing on it led anywhere — which is exactly what "clunky" means.
//
// A sleeve is not built that way. Big Science puts huge air around a few words and lets one
// line of small type do all the explaining. So the bar is not a row of buttons now: it is
// one line of type. Six words, set in the record's own serif at a size a thumb can read,
// spaced wide, on paper, with no borders, no cells, no boxes and no icons. The current page
// is the only thing in colour, and it is the only thing wearing a rule.
//
// The drawn marks have not gone — they are on the plates and the share cards, at the size
// they were cut for. A 40px engraving shrunk to 18px beside a word is not a mark any more,
// it is an icon, and icons are what made the menu look like a template.
//
// On a phone the six wrap onto two lines rather than shrinking, because a word squeezed to
// fit six-across is a word nobody reads.
export default function ClimateNav({ currentPage }) {
  return (
    <nav
      aria-label="Main navigation"
      className="mt-2.5 flex flex-wrap items-baseline gap-x-5 gap-y-0 sm:mt-4 sm:justify-end sm:gap-x-9"
    >
      {PRIMARY_NAV.map(({ label, to, page }) => {
        const active = currentPage === page;
        return (
          <Link
            key={to}
            to={to}
            aria-current={active ? 'page' : undefined}
            className={`inline-block border-b py-2.5 text-[15px] leading-none transition-colors sm:py-2 sm:text-[16px] ${
              active
                ? 'border-record-mark text-record-red'
                : 'border-transparent text-record-ink/85 hover:border-record-ink/30 hover:text-record-red'
            }`}
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.005em' }}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}