import React from 'react';
import { Link } from 'react-router-dom';
import {
  PRIMARY_NAV,
  FOOTER_NAV,
  ELSEWHERE_NAV,
  SUPPORTING_PAGES,
} from '@/components/climate/recordFooterLinks';
import KeeperDoor from '@/components/climate/KeeperDoor';
import { markFor } from '@/components/climate/pageMarks';

// The directory uses the same drawings as the persistent navigation.
const GROUPS = [
  { title: 'The main navigation', doors: PRIMARY_NAV },
  { title: 'How the record is kept', doors: FOOTER_NAV },
  { title: 'The rest of the book', doors: ELSEWHERE_NAV },
  { title: 'For a host or a keeper', doors: SUPPORTING_PAGES },
];

export default function RecordPageIndex() {
  return (
    <div className="mb-10 text-record-ink">
      {/* One voice at the top of the page, at the size a contents page deserves. The shell
          around this page is compact — it keeps the way back and nothing else — so without
          this the page opened with a small grey eyebrow and fell straight into a list, which
          is the whole reason it read as an admin screen. */}
      <header className="mb-9 border-b border-record-ink/20 pb-5">
        <h1
          className="text-record-ink"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(34px, 9vw, 48px)',
            lineHeight: 0.98,
            letterSpacing: '-0.02em',
          }}
        >
          All pages
        </h1>
        <p className="mt-3 max-w-[42ch] text-[14px] leading-relaxed text-record-muted">
          Every public door on the record, in the order a reader meets them.
        </p>
      </header>

      {GROUPS.map((group) => (
        <section key={group.title} className="mb-9">
          <h2
            className="mb-2 text-[12px] uppercase tracking-[0.16em] text-record-muted"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {group.title}
          </h2>
          <nav aria-label={group.title}>
            <ul className="sm:grid sm:grid-cols-2 sm:gap-x-10">
              {group.doors.map(({ label, to, what }) => (
                <li key={to} className="border-t border-record-ink/15">
                  <Link
                    to={to}
                    className="group flex items-center gap-5 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red"
                  >
                    <span aria-hidden="true" className="shrink-0 text-record-ink group-hover:text-record-red">
                      {React.createElement(markFor(to), { size: 50 })}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[19px] leading-tight text-record-ink transition-colors group-hover:text-record-red sm:text-[21px]" style={{ fontFamily: 'var(--font-display)' }}>
                        {label}
                      </span>
                      {what && <span className="mt-1 block max-w-[46ch] text-[13px] leading-snug text-record-muted">{what}</span>}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      ))}

      <div className="border-t border-record-ink/20 pt-3">
        <KeeperDoor />
      </div>
    </div>
  );
}