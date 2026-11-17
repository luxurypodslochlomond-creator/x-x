import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONTENT_GROUPS } from '@/components/climate/recordFooterLinks';
import { markFor } from '@/components/climate/pageMarks';
import { useRecordCapacity } from '@/components/climate/useKeeper';

// ── THE CONTENTS DRAWER IS PART OF THE PAINTING NOW ─────────────────────────────
// It was four columns of small grey words on white — a filing cabinet behind a door
// that opens onto the record's most colourful page. That is the whole complaint, and
// it was fair: the drawer looked like a settings menu sitting inside a painting.
//
// So every group is a plate of the record's own paper with a coloured rule over its
// head — the same red, ochre, botanical and ocean the plates and bands are painted
// with — and every door inside it answers a finger with the signal yellow rather than
// a grey underline. The colour is not decoration: a reader learns the shape of the
// record by which shelf a door sits on, and a shelf with no colour teaches nothing.
// One class list per shelf, written out, because the build only keeps classes it can
// read as words in this file.
const SHELVES = [
  { rule: 'border-record-red', ink: 'text-record-red' },
  { rule: 'border-record-ochre', ink: 'text-record-ochre' },
  { rule: 'border-record-botanical', ink: 'text-record-botanical' },
  { rule: 'border-record-ocean', ink: 'text-record-ocean' },
  { rule: 'border-record-mark', ink: 'text-record-mark' },
];

export default function RecordDesktopSections({ onNavigate }) {
  const { pathname } = useLocation();
  const { isKeeper, isChecker } = useRecordCapacity();
  const groups = isKeeper || isChecker
    ? [...CONTENT_GROUPS, { title: 'Yours', doors: [{ label: isKeeper ? 'Custodians’ room' : 'Witnesses’ room', to: '/ClimateKeeperRoom' }] }]
    : CONTENT_GROUPS;
  return (
    <div className="record-explore-shelves grid grid-cols-4 items-start gap-3 font-body">
      {groups.map(({ title, doors }, shelf) => {
        const paint = SHELVES[shelf % SHELVES.length];
        return (
          <section key={title} aria-label={title} className={`record-explore-group border-t-4 bg-record-paper/70 px-3 pb-2 pt-2 ${paint.rule}`}>
            <h2 className={`mb-2 flex items-baseline justify-between gap-2 border-b border-record-ink/15 pb-2 font-display text-[13px] font-bold uppercase tracking-tight ${paint.ink}`}>
              <span>{title}</span>
              <span aria-hidden="true" className="font-mono text-[10px] font-normal text-record-red">{doors.length}</span>
            </h2>
            <ul>
              {doors.map(({ label, to, what }) => {
                const Mark = markFor(to);
                const here = pathname === to;
                return (
                  <li key={to}>
                    <Link
                      to={to}
                      onClick={onNavigate}
                      title={what}
                      aria-current={here ? 'page' : undefined}
                      className={`flex min-h-10 items-center gap-2 py-1 pl-1 pr-1 text-sm leading-snug outline-offset-2 hover:bg-record-signal/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark ${here ? 'bg-record-signal/55 font-bold text-record-ink' : 'text-record-ink'}`}
                    >
                      <span className="shrink-0" aria-hidden="true"><Mark size={22} /></span>
                      <span>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}