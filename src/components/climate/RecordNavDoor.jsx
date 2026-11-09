import React from 'react';
import { Link } from 'react-router-dom';
import { markFor } from '@/components/climate/pageMarks';

export default function RecordNavDoor({ to, label, what, active = false, size = 44, className = '' }) {
  const Mark = markFor(to);
  return (
    <Link
      to={to}
      title={what ? `${label}: ${what}` : label}
      aria-label={what ? `${label}. ${what}` : label}
      aria-current={active ? 'page' : undefined}
      className={`rec-art-door ${active ? 'rec-art-door-active' : ''} ${className}`}
    >
      <span className="rec-art-drawing" aria-hidden="true"><Mark size={size} /></span>
      <span className="rec-art-caption">{label}</span>
    </Link>
  );
}