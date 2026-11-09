import React from 'react';
import { Link } from 'react-router-dom';
import { PRIMARY_NAV } from '@/components/climate/recordFooterLinks';

export default function ClimateNav({ currentPage, variant = 'desktop' }) {
  const mobile = variant === 'mobile';
  return (
    <nav
      aria-label="Main navigation"
      className={mobile ? 'grid grid-cols-5 px-3 font-body' : 'flex flex-wrap items-center justify-end gap-x-3 font-body'}
    >
      {PRIMARY_NAV.map(({ label, to, page }) => {
        const active = currentPage === page;
        return (
          <Link
            key={to}
            to={to}
            aria-current={active ? 'page' : undefined}
            className={`flex min-h-12 items-center justify-center border-b-2 px-1 py-2 text-center text-[13px] leading-snug font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-record-red sm:px-2 ${
              active
                ? 'border-record-red text-record-red'
                : 'border-transparent text-record-ink hover:text-record-red'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}