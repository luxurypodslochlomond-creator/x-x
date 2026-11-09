import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FOOTER_NAV } from '@/components/climate/recordFooterLinks';
import { useRecordCapacity } from '@/components/climate/useKeeper';
import ClimateLanguageBar from '@/components/climate/ClimateLanguageBar';
import RecordPagesPanel from '@/components/climate/RecordPagesPanel';

// Supporting doors share the same drawn hand as the main navigation.
const CAPTIONS = { '/XEqualsX': 'Why', '/ClimateMethod': 'Method', '/ClimateCorrections': 'Corrections', '/ClimateGuide': 'All pages' };

export default function RecordImprint() {
  const { pathname } = useLocation();
  const { isKeeper, isChecker } = useRecordCapacity();
  const hasKey = isKeeper || isChecker;
  const [pagesOpen, setPagesOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1 pb-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:pt-1.5">
      {/* ── ONE DRAWN HAND, NOT TWO ──────────────────────────────────────────────
          These four doors were drawings too, so a phone met six cut marks at the foot of
          the glass and another four at the top of the page. Two rows of the same
          instrument is what made the record feel like it was being operated rather than
          read. The drawn navigation is the dock, and only the dock; the masthead states
          the record's terms in words, as a printer's imprint does. */}
      <nav aria-label="How this record is kept" className="flex flex-wrap items-baseline gap-x-4 gap-y-1 sm:gap-x-5">
        {FOOTER_NAV.map(({ label, to, what }) => {
          const doorClass = `py-1.5 text-[10px] uppercase leading-none tracking-[0.1em] transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red ${
            pathname === to ? 'text-record-red' : 'text-record-ink/55'
          }`;
          // "All pages" is the one door that is not a place: it is the contents, so it comes
          // to the reader as a sheet over the page they are on rather than carrying them off
          // it. Every other door still leaves.
          if (to === '/ClimateGuide') {
            return (
              <button key={to} type="button" onClick={() => setPagesOpen(true)} title={`${label}. ${what}`} className={doorClass}>
                {CAPTIONS[to] || label}
              </button>
            );
          }
          return (
            <Link key={to} to={to} title={`${label}. ${what}`} aria-current={pathname === to ? 'page' : undefined} className={doorClass}>
              {CAPTIONS[to] || label}
            </Link>
          );
        })}

        <RecordPagesPanel open={pagesOpen} onClose={() => setPagesOpen(false)} />

        {hasKey && (
          <>
            <span aria-hidden="true" className="px-1 text-[12px] leading-none text-record-ink/20">·</span>
            <Link
              to="/ClimateKeeperRoom"
              aria-current={pathname === '/ClimateKeeperRoom' ? 'page' : undefined}
              className={`inline-flex items-center gap-1.5 py-2 text-[12px] leading-none font-medium text-record-red transition-colors hover:text-record-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red ${
                pathname === '/ClimateKeeperRoom' ? 'underline underline-offset-4 decoration-record-mark' : ''
              }`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              <span aria-hidden="true" className="block h-[5px] w-[5px] shrink-0 bg-current" />
              The shed
            </Link>
          </>
        )}
      </nav>

      <div className="min-w-0 sm:max-w-[19rem] sm:shrink-0">
        <ClimateLanguageBar tone="paper" />
      </div>
    </div>
  );
}