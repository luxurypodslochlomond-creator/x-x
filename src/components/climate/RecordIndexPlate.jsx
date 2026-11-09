import React from 'react';
import { useLocation } from 'react-router-dom';
import { CONTENT_GROUPS } from '@/components/climate/recordFooterLinks';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import '@/components/climate/record-navigator.css';

// ── THE INDEX AS A PLATE OF DOORS, NOT A LIST OF NAMES ──────────────────────────
// The sheet that opens from the rail was set as a printed column index: names, hairlines,
// and the drawings shrunk to sixteen pixels in a gutter — legible, tidy, and exactly the
// look of a library card catalogue. A reader opening the record's own contents met a
// document about the record rather than the record.
//
// So the sheet is now what the rail is: every door of the record, cut in the same hand,
// at a size a thumb can see it at, in four equal columns. All of them, in four parts, on
// one screen — the ways in, how it is kept, what is elsewhere, and what is behind it.
// Nothing is added and nothing is dropped: it is the same CONTENT_GROUPS the written
// guide prints, drawn instead of typed, and it can never drift from the rail because
// both read the same list and the same marks.
export default function RecordIndexPlate({ onNavigate }) {
  const { pathname } = useLocation();

  return (
    <div className="text-record-ink">
      {CONTENT_GROUPS.map(({ title, doors }, part) => (
        <section key={title} className="mb-2.5 first:mt-0">
          <h2 className="mb-1 flex items-center gap-1.5">
            <span className="font-mono text-[9px] leading-none tabular-nums text-record-mark">
              {String(part + 1).padStart(2, '0')}
            </span>
            <span className="font-mono text-[9px] uppercase leading-none tracking-[0.16em] text-record-muted">{title}</span>
            <span aria-hidden="true" className="h-px flex-1 bg-record-ink/20" />
          </h2>
          {/* Four columns on every handset: the cell is wide enough for a mark and two
              short words, and every door of the record lands on one screen. */}
          <nav aria-label={title} className="grid grid-cols-4 items-start gap-x-1 gap-y-0.5 sm:grid-cols-5 sm:gap-x-3">
            {doors.map(({ label, to, what }) => (
              <RecordNavDoor
                key={to}
                to={to}
                label={label}
                what={what}
                size={28}
                active={pathname === to}
                onClick={onNavigate}
                className="w-full !min-h-0 !py-1"
              />
            ))}
          </nav>
        </section>
      ))}
    </div>
  );
}