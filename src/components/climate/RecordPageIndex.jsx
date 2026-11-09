import React from 'react';
import { useLocation } from 'react-router-dom';
import { CONTENT_GROUPS } from '@/components/climate/recordFooterLinks';
import KeeperDoor from '@/components/climate/KeeperDoor';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import '@/components/climate/record-navigator.css';

export default function RecordPageIndex({ showHeading = true, showKeeper = true, onNavigate }) {
  const { pathname } = useLocation();
  return (
    <div className="mb-8 text-record-ink">
      {showHeading && <h1 className="mb-8 text-4xl font-display">Contents</h1>}
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