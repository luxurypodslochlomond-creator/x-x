import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONTENT_GROUPS } from '@/components/climate/recordFooterLinks';
import { markFor } from '@/components/climate/pageMarks';
import { useRecordCapacity } from '@/components/climate/useKeeper';

export default function RecordDesktopSections({ onNavigate, layout = 'desk' }) {
  // ── ONE INDEX, TWO GLASSES ────────────────────────────────────────────────────
  // The sheet a thumb opens and the panel a mouse opens were two different indexes: this
  // one, grouped, ruled and named in red with a count beside each name, and on a phone a
  // plate of drawn doors in numbered rows. Brian, 18 November: the explore is coolasfuck
  // on desktop and did not change on mobile. He is right, and the fault was that a phone
  // was still being shown the older sheet.
  //
  // So it is the same index at both widths — the same groups, the same order, the same
  // red name and count, the same hairline before each shelf, the same mark beside each
  // door — and only the shape changes: three across on a desk's width, three on a handset
  // too, where the type is smaller rather than the doors being fewer.
  //
  // ── ONE SCREEN IS THE WHOLE POINT OF AN INDEX ─────────────────────────────────
  // Brian, 18 November: "you think could get all in one screen on mobile without squashing?"
  // Two across put the shelves four rows deeper than they needed to be, and the last shelf
  // fell below the glass — so a reader opened the index to find their way and had to scroll
  // the index itself to do it. Three across is what the desk already does, and on a phone it
  // brings every door inside one screen: eight rows in all, at forty-four pixels each.
  //
  // Nothing is squashed to buy that: the rows are not shortened below a fingertip (the
  // question of tapping them on an iPhone is answered by the height, not by the drawing), and
  // a name that needs two lines gets two lines — the type is smaller, the doors are not.
  const phone = layout === 'phone';
  const { pathname } = useLocation();
  const { isKeeper, isChecker } = useRecordCapacity();
  const groups = isKeeper || isChecker
    ? [...CONTENT_GROUPS, { title: 'Yours', doors: [{ label: isKeeper ? 'Custodians’ room' : 'Witnesses’ room', to: '/ClimateKeeperRoom' }] }]
    : CONTENT_GROUPS;
  return (
    <div className="flex flex-col font-body">
      {groups.map(({ title, doors }) => (
          <section key={title} aria-label={title} className={phone ? 'grid grid-cols-1 border-t border-record-mark/30 pb-1 pt-1.5' : 'grid grid-cols-[9rem_minmax(0,1fr)] items-start gap-x-5 border-t border-record-mark/30 py-2'}>
            <h2 className={`record-header-type flex items-baseline gap-2 leading-relaxed text-record-mark ${phone ? 'pb-0.5 text-[10px]' : 'pt-3 text-[11px]'}`}>
              <span>{title}</span>
              <span aria-hidden="true" className="text-[10px]">{doors.length}</span>
            </h2>
            <ul className={`grid ${phone ? 'grid-cols-3 gap-x-2' : 'grid-cols-3 gap-x-4'}`}>
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
                      className={`flex items-center outline-offset-2 hover:text-record-mark focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark ${phone ? 'min-h-11 gap-1.5 py-1 text-[10px] uppercase leading-[1.25] tracking-[0.04em]' : 'min-h-10 gap-2 py-1 text-[13px] uppercase leading-relaxed tracking-[0.08em]'} ${here ? 'text-record-mark underline underline-offset-4' : 'text-record-ink'}`}
                    >
                      <span className="shrink-0" aria-hidden="true"><Mark size={phone ? 18 : 22} /></span>
                      <span>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
      ))}
    </div>
  );
}