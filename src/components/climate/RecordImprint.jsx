import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import { FOOTER_NAV } from '@/components/climate/recordFooterLinks';
import { useRecordCapacity } from '@/components/climate/useKeeper';
import ClimateLanguageBar from '@/components/climate/ClimateLanguageBar';

// Supporting doors share the same drawn hand as the main navigation.
const CAPTIONS = { '/XEqualsX': 'Why', '/ClimateMethod': 'Method', '/ClimateCorrections': 'Corrections', '/ClimateGuide': 'All pages' };

export default function RecordImprint() {
  const { pathname } = useLocation();
  const { isKeeper, isChecker } = useRecordCapacity();
  const hasKey = isKeeper || isChecker;

  return (
    <div className="flex flex-col gap-1 pb-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:pt-1.5">
      <nav aria-label="How this record is kept" className="flex flex-wrap items-center justify-between gap-2 sm:justify-start sm:gap-5">
        {FOOTER_NAV.map(({ label, to, what }) => (
          <RecordNavDoor key={to} to={to} label={CAPTIONS[to] || label} what={`${label}. ${what}`} active={pathname === to} size={38} />
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