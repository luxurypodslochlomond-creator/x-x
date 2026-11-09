import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import KeeperDoor from '@/components/climate/KeeperDoor';
import { FOOTER_NAV, ELSEWHERE_NAV } from '@/components/climate/recordFooterLinks';
import { markFor } from '@/components/climate/pageMarks';

// ── THE COLOPHON ───────────────────────────────────────────────────────────────
// The foot of a printed record is not a second menu: it is the page that says who made
// the thing, what it stands on, and where the parts that were not on the way in can be
// found. So it does three jobs and no more — the mark and whose record this is; the four
// doors that state the record's terms; and the five doors the masthead does not carry.
//
// The bar is not repeated down here. It used to be, and a foot that says exactly what
// the head already said is why the bottom of the page felt wrong: nothing at the foot
// was new, so the eye learned to skip the whole column.
const FootDoor = ({ to, label, active }) => {
  const Mark = markFor(to);
  return (
    <Link
      to={to}
      aria-current={active ? 'page' : undefined}
      className={`group flex min-h-[44px] items-center gap-2.5 border-t border-record-ink/15 text-[14px] leading-snug transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red ${
        active ? 'text-record-red' : ''
      }`}
      style={{ fontFamily: 'var(--font-display)' }}
    >
      <Mark size={17} className="shrink-0 opacity-75 transition-opacity group-hover:opacity-100" />
      <span>{label}</span>
    </Link>
  );
};

export default function RecordFooter({ showKeeper = true }) {
  const { pathname } = useLocation();

  return (
    <footer className="mt-4 border-t border-record-ink/20 bg-record-paper text-record-ink">
      <div className="mx-auto max-w-[1100px] px-4 pb-8 pt-9 lg:px-10">
        <div className="grid gap-8 sm:grid-cols-[1.15fr_1fr_1fr] sm:gap-10">
          {/* The mark, whose record this is, and the only sentence either needs. */}
          <div>
            <Link
              to="/XEqualsX"
              className="inline-block text-record-mark transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-record-red"
              style={{ fontFamily: 'var(--font-reading)', fontSize: '38px', lineHeight: 1, letterSpacing: '-0.01em' }}
            >
              x = x
            </Link>
            <p className="mt-3 max-w-[34ch] text-[13px] leading-relaxed text-record-muted">
              The mark this record is built on. Read what it means, and what it does not.
            </p>
            <p className="mt-4 max-w-[34ch] border-t border-record-ink/15 pt-3 text-[12.5px] leading-relaxed text-record-ink/80">
              <span className="block" style={{ fontFamily: 'var(--font-display)' }}>Record of the Time</span>
              A public record of climate emergencies, and of the actions that actually work.
            </p>
          </div>

          {/* How the record is kept — the same four doors that are stated at the top. */}
          <nav aria-label="How the record is kept" className="flex flex-col">
            <p className="mb-1 font-mono text-[12px] uppercase tracking-[0.16em] text-record-muted">How it is kept</p>
            {FOOTER_NAV.map(({ label, to }) => (
              <FootDoor key={to} to={to} label={label} active={pathname === to} />
            ))}
          </nav>

          {/* The rest of the book — only the doors the masthead does not carry. */}
          <nav aria-label="Elsewhere on the record" className="flex flex-col">
            <p className="mb-1 font-mono text-[12px] uppercase tracking-[0.16em] text-record-muted">The rest of the book</p>
            {ELSEWHERE_NAV.map(({ label, to }) => (
              <FootDoor key={to} to={to} label={label} active={pathname === to} />
            ))}
          </nav>
        </div>

        {/* Housekeeping, the way in for the people who keep it, and the imprint. */}
        <div className="mt-7 flex flex-col gap-4 border-t border-record-ink/15 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Privacy, terms and reviewer access" className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {[
              { label: 'Terms', to: '/ClimateTerms' },
              { label: 'Privacy', to: '/ClimatePrivacy' },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                aria-current={pathname === to ? 'page' : undefined}
                className={`flex min-h-[40px] items-center text-[13px] transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red ${
                  pathname === to ? 'text-record-red' : 'text-record-muted'
                }`}
              >
                {label}
              </Link>
            ))}
            {showKeeper && <KeeperDoor />}
          </nav>

          <div className="flex flex-col gap-1 sm:items-end">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-record-muted">
              Made in Scotland from photons
            </span>
            <span className="text-[12px] text-record-muted">A public service · for the world</span>
          </div>
        </div>
      </div>
    </footer>
  );
}