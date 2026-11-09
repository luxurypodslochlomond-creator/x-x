import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import KeeperDoor from '@/components/climate/KeeperDoor';
import { FOOTER_NAV } from '@/components/climate/recordFooterLinks';

export default function RecordFooter({ showKeeper = true }) {
  const { pathname } = useLocation();
  return (
    <footer className="border-t-2 border-record-red bg-record-paper font-body text-record-ink">
      <div className="mx-auto max-w-[1100px] px-4 py-3 lg:px-10">
        <nav aria-label="About the record and all pages" className="flex flex-wrap items-center gap-x-5">
          {FOOTER_NAV.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              aria-current={pathname === to ? 'page' : undefined}
              className={`inline-flex min-h-12 items-center text-sm leading-snug hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-record-red ${pathname === to ? 'text-record-red underline underline-offset-4' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-5 border-t border-record-ink/15 pt-2">
          <span aria-hidden="true" className="font-mono text-xs tracking-[0.15em] text-record-mark">x = x</span>
          <nav aria-label="Privacy, terms and reviewer access" className="flex flex-wrap items-center gap-x-4 text-xs text-record-muted">
            <Link to="/ClimateTerms" aria-current={pathname === '/ClimateTerms' ? 'page' : undefined} className="inline-flex min-h-11 items-center hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-red">Terms</Link>
            <Link to="/ClimatePrivacy" aria-current={pathname === '/ClimatePrivacy' ? 'page' : undefined} className="inline-flex min-h-11 items-center hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-red">Privacy</Link>
            {showKeeper && <KeeperDoor />}
          </nav>
        </div>
      </div>
    </footer>
  );
}