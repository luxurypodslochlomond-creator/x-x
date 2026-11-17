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
    <div className="grid grid-cols-4 gap-x-6 gap-y-5">
      {groups.map(({ title, doors }) => (
        <section key={title} aria-label={title}>
          <h2 className="mb-2 border-b border-record-ink/20 pb-2 text-xs font-bold uppercase tracking-wide text-record-muted">{title}</h2>
          <ul className="space-y-1">
            {doors.map(({ label, to, what }) => {
              const Mark = markFor(to);
              return (
                <li key={to}>
                  <Link to={to} onClick={onNavigate} title={what} aria-current={pathname === to ? 'page' : undefined} className={`flex min-h-10 items-center gap-2 py-1 text-sm leading-snug outline-offset-2 hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark ${pathname === to ? 'font-bold text-record-red' : 'text-record-ink'}`}>
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