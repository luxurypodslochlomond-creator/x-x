import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONTENT_GROUPS } from '@/components/climate/recordFooterLinks';
import { markFor } from '@/components/climate/pageMarks';
import { useRecordCapacity } from '@/components/climate/useKeeper';

export default function RecordDesktopSections({ onNavigate }) {
  const { pathname } = useLocation();
  const { isKeeper, isChecker } = useRecordCapacity();
  const groups = isKeeper || isChecker
    ? [...CONTENT_GROUPS, { title: 'Yours', doors: [{ label: isKeeper ? 'Custodians’ room' : 'Witnesses’ room', to: '/ClimateKeeperRoom' }] }]
    : CONTENT_GROUPS;
  return (
    <div className="flex flex-col font-body">
      {groups.map(({ title, doors }) => (
          <section key={title} aria-label={title} className="grid grid-cols-[9rem_minmax(0,1fr)] items-start gap-x-5 border-t border-record-mark/30 py-2">
            <h2 className="record-header-type flex items-baseline gap-2 pt-3 text-[11px] leading-relaxed text-record-mark">
              <span>{title}</span>
              <span aria-hidden="true" className="text-[10px]">{doors.length}</span>
            </h2>
            <ul className="grid grid-cols-3 gap-x-4">
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
                      className={`flex min-h-10 items-center gap-2 py-1 text-[13px] font-normal uppercase leading-relaxed tracking-[0.08em] outline-offset-2 hover:text-record-mark focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark ${here ? 'text-record-mark underline underline-offset-4' : 'text-record-ink'}`}
                    >
                      <span className="shrink-0" aria-hidden="true"><Mark size={22} /></span>
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