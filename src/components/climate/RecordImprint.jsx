import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FOOTER_NAV } from '@/components/climate/recordFooterLinks';
import ClimateLanguageBar from '@/components/climate/ClimateLanguageBar';

// ── THE IMPRINT LINE ────────────────────────────────────────────────────────────
// The colophon already said how this record is kept — why it exists, how an entry is
// checked, where corrections live, the whole index. It said it only at the foot, which
// meant a reader met five places to go and no terms at all until they had scrolled the
// page to the end.
//
// So the same four doors are set into the masthead's imprint line, in the machine's
// small hand, with no marks and no numbers: they are not five more destinations, they
// are the record's terms stated where the reader arrives. A word or two each, hairline
// apart, and the tongue and the mark on the same line — a printer's imprint, not a
// second menu. Nothing is repeated that a reader has to learn twice, because it is the
// same wording in both places.
export default function RecordImprint() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col gap-1 pb-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:pt-1.5">
      <nav aria-label="How this record is kept" className="flex flex-wrap items-baseline gap-x-1 gap-y-0.5">
        {FOOTER_NAV.map(({ label, to }, i) => (
          <React.Fragment key={to}>
            {i > 0 && <span aria-hidden="true" className="px-1 text-[12px] leading-none text-record-ink/20">·</span>}
            <Link
              to={to}
              aria-current={pathname === to ? 'page' : undefined}
              className={`inline-flex items-center py-2 text-[12px] leading-none transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red ${
                pathname === to ? 'text-record-red' : 'text-record-muted'
              }`}
              style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.01em' }}
            >
              {label}
            </Link>
          </React.Fragment>
        ))}
      </nav>

      <div className="flex items-baseline justify-between gap-4 sm:shrink-0 sm:justify-end">
        <ClimateLanguageBar tone="paper" />
        <Link
          to="/XEqualsX"
          aria-current={pathname === '/XEqualsX' ? 'page' : undefined}
          className="shrink-0 pb-1 text-[15px] leading-none text-record-mark transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red"
          style={{ fontFamily: 'var(--font-reading)' }}
        >
          x = x
        </Link>
      </div>
    </div>
  );
}