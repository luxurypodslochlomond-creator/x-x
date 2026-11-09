import React from 'react';
import { Link } from 'react-router-dom';
import { PAGE_INDEX } from '@/components/climate/recordFooterLinks';
import KeeperDoor from '@/components/climate/KeeperDoor';

export default function RecordPageIndex() {
  return (
    <section className="mb-10 font-body text-record-ink" aria-labelledby="all-pages-title">
      <h1 id="all-pages-title" className="mb-6 text-3xl">All pages</h1>
      <nav aria-label="All record pages">
        <ul className="grid grid-cols-2 gap-x-6 sm:gap-x-10">
          {PAGE_INDEX.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className="flex min-h-12 items-center py-2 font-body text-sm leading-snug hover:text-record-red hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-record-red"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-5 border-t border-record-ink/20 pt-2"><KeeperDoor /></div>
    </section>
  );
}