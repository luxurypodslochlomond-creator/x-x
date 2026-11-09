import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONTENT_GROUPS } from '@/components/climate/recordFooterLinks';
import KeeperDoor from '@/components/climate/KeeperDoor';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import { markFor } from '@/components/climate/pageMarks';
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
        {/* ── SET AS A PRINTED INDEX, NOT AS A GRID OF LINKS ─────────────────────
            The names were floating in white space, each one its own little island, which
            is what a menu looks like. An index is ruled: a numeral for the part, the part
            named, and every entry sitting on a hairline so the eye runs down a column
            instead of hopping between islands. Nothing is boxed — the rules are one pixel
            of ink, the same hairline the rail and the foot are drawn with. The drawings sit
            in their own column so every name starts on the same vertical, and they stay at
            full ink: a mark at seventy per cent is a smudge, not an engraving. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-x-8">
          {CONTENT_GROUPS.map(({ title, doors }, part) => (
            <section key={title}>
              <h2 className="mb-1.5 flex items-center gap-1.5">
                <span className="font-mono text-[8.5px] leading-none tabular-nums text-record-mark">
                  {String(part + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-[9px] uppercase leading-none tracking-[0.16em] text-record-muted">{title}</span>
                <span aria-hidden="true" className="h-px flex-1 bg-record-ink/20" />
              </h2>
              <ul>
                {doors.map(({ label, to }) => {
                  // The drawing comes with the name, the same drawing the door carries on
                  // the page itself — so the index and the record are one hand, and a reader
                  // who has learnt a mark at the foot of a page finds it again here.
                  const Mark = markFor(to);
                  const on = pathname === to;
                  return (
                    <li key={to} className="border-b border-record-ink/12">
                      <Link
                        to={to}
                        onClick={onNavigate}
                        aria-current={on ? 'page' : undefined}
                        className={`flex items-center gap-1.5 py-[5px] text-[13.5px] leading-tight sm:text-[14px] ${
                          on ? 'text-record-mark' : 'text-record-ink'
                        }`}
                        style={{ fontFamily: 'var(--font-reading)' }}
                      >
                        <span aria-hidden="true" className="flex w-[19px] shrink-0 justify-center">
                          <Mark size={16} />
                        </span>
                        <span className="truncate">{label}</span>
                      </Link>
                    </li>
                  );
                })}
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