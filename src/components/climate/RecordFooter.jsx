import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import KeeperDoor from '@/components/climate/KeeperDoor';
import { ELSEWHERE_NAV, FOOTER_NAV } from '@/components/climate/recordFooterLinks';

// ── THE COLOPHON ───────────────────────────────────────────────────────────────
// It was three columns of small rows, each row carrying a tick of a drawn mark — a sitemap.
// A sitemap at the foot of a record is the single clearest sign that a page was assembled
// rather than composed, and it is why the bottom of this one felt wrong: equal columns,
// equal rows, equal weight, nothing to look at.
//
// The back of a sleeve does two things. It prints the mark large, and it lets one run of
// type carry everything else. So: x = x at the size of a statement, one line saying what it
// means, the imprint opposite, and then the doors as words on a line — spaced wide, no
// ticks, no headings, no boxes.
//
// And only the doors the masthead does not carry. The four terms of the record are stated
// at the top of every page; printing them again down here is what made the foot feel like
// a second copy of the head.
const ALL_PAGES = FOOTER_NAV.find((door) => door.to === '/ClimateGuide');
const REST = [...ELSEWHERE_NAV, ALL_PAGES].filter(Boolean);

export default function RecordFooter({ showKeeper = true }) {
  const { pathname } = useLocation();

  const Door = ({ to, label }) => (
    <Link
      to={to}
      aria-current={pathname === to ? 'page' : undefined}
      className={`inline-block border-b py-1.5 text-[16px] leading-none transition-colors ${
        pathname === to
          ? 'border-record-mark text-record-red'
          : 'border-transparent text-record-ink/85 hover:border-record-ink/30 hover:text-record-red'
      }`}
      style={{ fontFamily: 'var(--font-display)' }}
    >
      {label}
    </Link>
  );

  return (
    <footer className="mt-4 border-t border-record-ink/20 bg-record-paper text-record-ink">
      <div className="mx-auto max-w-[1100px] px-4 pb-9 pt-10 lg:px-10">
        <div className="sm:flex sm:items-end sm:justify-between sm:gap-12">
          <div className="min-w-0">
            <Link
              to="/XEqualsX"
              className="block text-record-mark transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-record-red"
              style={{
                fontFamily: 'var(--font-reading)',
                fontSize: 'clamp(46px, 13vw, 74px)',
                lineHeight: 0.82,
                letterSpacing: '-0.03em',
              }}
            >
              x = x
            </Link>
            <p className="mt-4 max-w-[40ch] text-[13.5px] leading-relaxed text-record-muted">
              The mark this record is built on. Read what it means, and what it does not.
            </p>
          </div>

          {/* The imprint sits opposite the mark, the way a printer puts one at the foot of
              a sheet and never mentions it again. */}
          <p className="mt-6 shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-record-muted sm:mt-0 sm:pb-1 sm:text-right">
            Made in Scotland from photons
            <span className="mt-1 block text-[12.5px] normal-case tracking-normal">
              A public service · for the world
            </span>
          </p>
        </div>

        {/* The doors, as words on a line. Everything here is something the masthead does
            not already carry, so the foot is never a second copy of the head. */}
        <nav aria-label="Elsewhere on the record" className="mt-9 flex flex-wrap items-baseline gap-x-6 gap-y-1">
          {REST.map(({ label, to }) => (
            <Door key={to} to={to} label={label} />
          ))}
        </nav>

        <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-1">
          {[
            { label: 'Terms', to: '/ClimateTerms' },
            { label: 'Privacy', to: '/ClimatePrivacy' },
          ].map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              aria-current={pathname === to ? 'page' : undefined}
              className={`inline-block py-1.5 text-[13px] transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red ${
                pathname === to ? 'text-record-red' : 'text-record-muted'
              }`}
            >
              {label}
            </Link>
          ))}
          {showKeeper && <KeeperDoor />}
        </div>
      </div>
    </footer>
  );
}