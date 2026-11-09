import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONTENT_GROUPS } from '@/components/climate/recordFooterLinks';
import KeeperDoor from '@/components/climate/KeeperDoor';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import '@/components/climate/record-navigator.css';

// ── TWO FORMS OF THE SAME INDEX ────────────────────────────────────────────────
// The drawn doors are the record's own hand, and on a page with room they are the right
// thing: they can be looked at as pictures and tapped as doors. A sheet that opens over a
// phone has no room — it must show every way in at once — so there the same doors are set
// as names in columns, printed index rather than a wall of plates. One list, two settings:
// nothing is added, nothing is dropped, and the two can never drift apart.
export default function RecordPageIndex({ showHeading = true, showKeeper = true, onNavigate, compact = false }) {
  const { pathname } = useLocation();

  if (compact) {
    return (
      <div className="text-record-ink">
        <div className="grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-5">
          {CONTENT_GROUPS.map(({ title, doors }) => (
            <section key={title}>
              <h2 className="mb-1 font-mono text-[9px] uppercase tracking-[0.16em] text-record-muted">{title}</h2>
              <ul>
                {doors.map(({ label, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      onClick={onNavigate}
                      aria-current={pathname === to ? 'page' : undefined}
                      className={`block py-[3px] text-[13px] leading-snug sm:text-[14px] ${
                        pathname === to ? 'text-record-mark' : 'text-record-ink'
                      }`}
                      style={{ fontFamily: 'var(--font-reading)' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        {showKeeper && <div className="mt-4"><KeeperDoor /></div>}
      </div>
    );
  }

  return (
    <div className="mb-8 text-record-ink">
      {showHeading && <h1 className="mb-8 text-4xl font-display">Index</h1>}
      {CONTENT_GROUPS.map(({ title, doors }) => (
        <section key={title} className="mb-8">
          <h2 className="mb-4 font-body text-[11px] uppercase tracking-[0.12em] text-record-muted">{title}</h2>
          <nav aria-label={title} className="grid grid-cols-3 items-start gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-8">
            {doors.map(({ label, to, what }) => (
              <RecordNavDoor key={to} to={to} label={label} what={what} size={52} active={pathname === to} onClick={onNavigate} />
            ))}
          </nav>
        </section>
      ))}
      {showKeeper && <KeeperDoor />}
    </div>
  );
}