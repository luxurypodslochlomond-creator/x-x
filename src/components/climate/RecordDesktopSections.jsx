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
  // door — and only the shape changes: three across on a desk's width, two on a handset,
  // where each door gets a whole fingertip of height and its name can wrap rather than be
  // squeezed.
  const phone = layout === 'phone';
  const { pathname } = useLocation();
  const { isKeeper, isChecker } = useRecordCapacity();
  const groups = isKeeper || isChecker
    ? [...CONTENT_GROUPS, { title: 'Yours', doors: [{ label: isKeeper ? 'Custodians’ room' : 'Witnesses’ room', to: '/ClimateKeeperRoom' }] }]
    : CONTENT_GROUPS;
  return (
    <div className="flex flex-col font-body">
      {groups.map(({ title, doors }) => (
          <section key={title} aria-label={title} className={phone ? 'grid grid-cols-1 border-t border-record-mark/30 pb-1.5 pt-2' : 'grid grid-cols-[9rem_minmax(0,1fr)] items-start gap-x-5 border-t border-record-mark/30 py-2'}>
            <h2 className={`record-header-type flex items-baseline gap-2 text-[11px] leading-relaxed text-record-mark ${phone ? 'pb-1' : 'pt-3'}`}>
              <span>{title}</span>
              <span aria-hidden="true" className="text-[10px]">{doors.length}</span>
            </h2>
            <ul className={`grid gap-x-3 ${phone ? 'grid-cols-2' : 'grid-cols-3 gap-x-4'}`}>
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
                      className={`flex items-center gap-2 leading-relaxed outline-offset-2 hover:text-record-mark focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark ${phone ? 'min-h-11 py-1.5 text-[12px] uppercase tracking-[0.06em]' : 'min-h-10 py-1 text-[13px] uppercase tracking-[0.08em]'} ${here ? 'text-record-mark underline underline-offset-4' : 'text-record-ink'}`}
                    >
                      <span className="shrink-0" aria-hidden="true"><Mark size={phone ? 20 : 22} /></span>
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