import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import KeeperDoor from '@/components/climate/KeeperDoor';
import { FOOTER_NAV } from '@/components/climate/recordFooterLinks';
import { markFor } from '@/components/climate/pageMarks';

// ── THE COLOPHON ───────────────────────────────────────────────────────────────
// The foot of a printed record is not a menu bolted on underneath: it is the page that
// says who made the thing and what it stands on. Ours has one mark worth printing at
// any size — x = x — and three doors into how the record is kept.
//
// So the mark is set once, large, in its own red, and it is a real door to the page
// that says what it means. The housekeeping sits opposite it as a short column, and
// the rest is air. Nothing here explains itself, because a colophon never does.
export default function RecordFooter({ showKeeper = true }) {
  const { pathname } = useLocation();

  return (
    <footer className="mt-4 border-t border-record-ink/20 bg-record-paper text-record-ink">
      <div className="mx-auto max-w-[1100px] px-4 pb-8 pt-8 lg:px-10">
        <div className="grid gap-8 sm:grid-cols-[1.1fr_1fr_auto] sm:gap-10">
          {/* The mark, and the only sentence it needs. */}
          <div>
            <Link
              to="/XEqualsX"
              className="inline-block text-record-mark transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-record-red"
              style={{ fontFamily: 'var(--font-reading)', fontSize: '38px', lineHeight: 1, letterSpacing: '-0.01em' }}
            >
              x = x
            </Link>
            <p className="mt-3 max-w-[30ch] text-[13px] leading-relaxed text-record-muted">
              The mark this record is built on. Read what it means, and what it does not.
            </p>
          </div>

          {/* How the record is kept — three doors, set as an index. */}
          <nav aria-label="How the record is kept" className="flex flex-col">
            {FOOTER_NAV.map(({ label, to }) => {
              /* The four doors of the colophon now carry the same drawn marks as the
                 masthead, so a reader who has learned the hand at the top meets it again
                 at the foot. Terms and privacy stay as small type: they are housekeeping,
                 not doors, and marking them would make every line look equally important. */
              const Mark = markFor(to);
              return (
                <Link
                  key={to}
                  to={to}
                  aria-current={pathname === to ? 'page' : undefined}
                  className={`group flex min-h-[44px] items-center gap-2.5 border-t border-record-ink/15 text-[14px] leading-snug transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red ${
                    pathname === to ? 'text-record-red' : ''
                  }`}
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  <Mark size={17} className="shrink-0 opacity-75 transition-opacity group-hover:opacity-100" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Housekeeping, and the way in for the people who keep it. */}
          <nav aria-label="Privacy, terms and reviewer access" className="flex flex-col sm:items-end sm:text-right">
            {[
              { label: 'Terms', to: '/ClimateTerms' },
              { label: 'Privacy', to: '/ClimatePrivacy' },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                aria-current={pathname === to ? 'page' : undefined}
                className={`flex min-h-[44px] items-center text-[13px] text-record-muted transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red ${
                  pathname === to ? 'text-record-red' : ''
                }`}
              >
                {label}
              </Link>
            ))}
            {showKeeper && <KeeperDoor />}
          </nav>
        </div>

        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-record-ink/15 pt-3">
          {/* Where it was made, and out of what. Not a badge: an imprint, the way a
              printer puts one at the foot of a sheet and never mentions it again. */}
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-record-muted">
            Made in Scotland from photons
          </span>
          <span className="text-[12px] text-record-muted">A public service · for the world</span>
        </div>
      </div>
    </footer>
  );
}