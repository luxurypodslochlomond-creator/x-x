import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FOOTER_NAV } from '@/components/climate/recordFooterLinks';
import { useRecordCapacity } from '@/components/climate/useKeeper';
import ClimateLanguageBar from '@/components/climate/ClimateLanguageBar';

// ── THE IMPRINT LINE ────────────────────────────────────────────────────────────
// The colophon already said how this record is kept — why it exists, how an entry is
// checked, where the corrections live, the whole index. It said it only at the foot,
// which meant a reader met six places to go and no terms at all until they had scrolled
// to the end.
//
// So the same four doors are set into the masthead's imprint line, in the same wording
// and the machine's small hand, with no marks and no numbers: they are not four more
// destinations, they are the record's terms stated where the reader arrives — the reason
// first, then the method, then what happens when it is wrong, then everything else.
//
// ── AND THE SHED, FOR THE ONE READER HOLDING A KEY ─────────────────────────────
// The shed is not public, so it is not in the bar: a door that refuses most people is
// not a way in, it is a locked door in a corridor. But for a keeper it is the most
// important room on the record, and it had been left to eleven grey pixels at the very
// bottom of the page under the phrase "reviewer sign-in". Now, for the person holding a
// key, the shed is stated here — in the masthead, on every page, in the record's red,
// because for that one reader it is part of how the record is kept. Everyone else sees
// the four terms and nothing more, which is exactly right.
//
// x = x is not repeated here. It is already set under the founder's quoted line on the
// page itself and again, large, in the colophon; a third time at the top would make the
// mark a decoration instead of a promise. One mark, in the two places it does work.
export default function RecordImprint() {
  const { pathname } = useLocation();
  const { isKeeper, isChecker } = useRecordCapacity();
  const hasKey = isKeeper || isChecker;

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