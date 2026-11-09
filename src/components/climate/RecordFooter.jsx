import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecordCover from '@/components/climate/RecordCover';
import RecordCosmos from '@/components/climate/RecordCosmos';
import KeeperDoor from '@/components/climate/KeeperDoor';
import FOOTER_DOORS from '@/components/climate/recordFooterLinks';

export default function RecordFooter({ showKeeper = true }) {
  const { pathname } = useLocation();

  return (
    <footer className="border-t-2 border-record-ink/15 bg-record-bone font-body text-record-ink">
      <div className="relative h-14 overflow-hidden sm:h-20" aria-hidden="true">
        <RecordCover position="center 76%" strength={0.95} />
        <div className="absolute inset-0 bg-gradient-to-b from-record-earth/20 to-record-earth/90" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <RecordCosmos size={28} className="opacity-80" />
        </div>
      </div>

      <nav aria-label="The record" className="mx-auto grid max-w-[1100px] grid-cols-3 sm:grid-cols-5 lg:grid-cols-9">
        {FOOTER_DOORS.map(({ label, to, mark: Mark, what }) => {
          const current = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              title={what}
              aria-label={what}
              aria-current={current ? 'page' : undefined}
              className={`flex flex-col items-center gap-2 pb-4 pt-5 text-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red ${
                current ? 'text-record-red' : 'text-record-ink/70 hover:text-record-red'
              }`}
            >
              <Mark size={26} />
              <span className="text-[11.5px] leading-none">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-x-5 border-t border-record-ink/15 px-4 py-1.5">
        <Link
          to="/XEqualsX"
          aria-label="x equals x — why this record is kept"
          className={`inline-flex min-h-11 items-center text-[13px] tracking-[0.2em] text-record-mark hover:underline underline-offset-4 ${pathname === '/XEqualsX' ? 'underline' : ''}`}
        >
          x = x
        </Link>
        <nav aria-label="The guide, the terms and keeper access" className="flex flex-wrap items-center gap-x-4 text-[11.5px] text-record-muted">
          <Link to="/ClimateGuide" className="inline-flex min-h-11 items-center hover:text-record-red">Guide</Link>
          <Link to="/ClimateTerms" className="inline-flex min-h-11 items-center hover:text-record-red">Terms</Link>
          <Link to="/ClimatePrivacy" className="inline-flex min-h-11 items-center hover:text-record-red">Privacy</Link>
          {showKeeper && <KeeperDoor />}
        </nav>
      </div>
    </footer>
  );
}