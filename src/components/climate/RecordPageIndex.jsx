import React from 'react';
import { Link } from 'react-router-dom';
import { PAGE_INDEX } from '@/components/climate/recordFooterLinks';
import { markFor } from '@/components/climate/pageMarks';
import KeeperDoor from '@/components/climate/KeeperDoor';

export default function RecordPageIndex() {
  return (
    <section className="mb-10 font-body text-record-ink" aria-labelledby="all-pages-title">
      <h1 id="all-pages-title" className="mb-6 text-3xl">All pages</h1>
      <nav aria-label="All record pages">
        <ul className="grid grid-cols-2 gap-x-6 sm:gap-x-10">
          {PAGE_INDEX.map(({ label, to }) => {
            /* Every door here carries its own drawn mark, the same hand as the masthead.
               A contents page of plain words was the one place the record most obviously
               showed its typed back; now the whole index is cut by the same blade. */
            const Mark = markFor(to);
            return (
              <li key={to}>
                <Link
                  to={to}
                  className="group flex min-h-12 items-center gap-2.5 py-2 font-body text-sm leading-snug text-record-ink transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-record-red"
                >
                  <Mark size={18} className="shrink-0 opacity-80 transition-opacity group-hover:opacity-100" />
                  <span className="group-hover:underline">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-5 border-t border-record-ink/20 pt-2"><KeeperDoor /></div>
    </section>
  );
}