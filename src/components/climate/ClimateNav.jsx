import React from 'react';
import { PRIMARY_NAV } from '@/components/climate/recordFooterLinks';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import '@/components/climate/record-navigator.css';

// The masthead uses the very same drawings, captions and active state as the dock.
export default function ClimateNav({ currentPage }) {
  return (
    <nav aria-label="Main navigation" className="mt-3 w-full pb-2 sm:mt-0 sm:w-auto sm:flex-1">
      <div className="rec-art-rail">
        {PRIMARY_NAV.map(({ label, to, page, what }) => (
          <RecordNavDoor key={to} to={to} label={label} what={what} active={currentPage === page} size={38} />
        ))}
      </div>
    </nav>
  );
}