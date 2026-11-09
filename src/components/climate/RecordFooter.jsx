import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import KeeperDoor from '@/components/climate/KeeperDoor';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import { ELSEWHERE_NAV, FOOTER_NAV } from '@/components/climate/recordFooterLinks';

// The colophon keeps the doors not carried by the primary navigation.
const ALL_PAGES = FOOTER_NAV.find((door) => door.to === '/ClimateGuide');
const REST = [...ELSEWHERE_NAV, ALL_PAGES].filter(Boolean);

export default function RecordFooter({ showKeeper = true }) {
  const { pathname } = useLocation();

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
                fontSize: 'clamp(38px, 10.5vw, 58px)',
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

        <nav aria-label="Elsewhere on the record" className="mt-9 flex flex-wrap items-start gap-x-5 gap-y-5">
          {REST.map(({ label, to, what }) => (
            <RecordNavDoor key={to} to={to} label={label} what={what} active={pathname === to} size={28} className="w-[calc((100%-2.5rem)/3)] sm:w-24" />
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