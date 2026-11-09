import React from 'react';
import { PRIMARY_NAV } from '@/components/climate/recordFooterLinks';
import RecordNavDoor from '@/components/climate/RecordNavDoor';
import '@/components/climate/record-navigator.css';

export default function RecordNavigator({ currentPage }) {
  return (
    <nav aria-label="The way through the record" className="rec-art-navigator">
      <div className="rec-art-rail">
        {PRIMARY_NAV.map(({ label, to, page, what }) => (
          <RecordNavDoor key={to} to={to} label={label} what={what} active={currentPage === page} size={46} />
        ))}
      </div>
    </nav>
  );
}