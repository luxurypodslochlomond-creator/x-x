import React from 'react';
import { Link } from 'react-router-dom';
import { markFor } from '@/components/climate/pageMarks';

export default function RecordNavDoor({ to, label, what, active = false, size = 44, className = '', onClick, asButton = false, expanded, controls }) {
  const Mark = markFor(to);
  const Door = asButton ? 'button' : Link;
  return (
    <Door
      {...(asButton ? { type: 'button', 'aria-expanded': expanded, 'aria-controls': controls, 'aria-haspopup': 'dialog' } : { to })}
      onClick={onClick}
      title={what ? `${label}: ${what}` : label}
      aria-label={what ? `${label}. ${what}` : label}
      aria-current={!asButton && active ? 'page' : undefined}
      className={`rec-art-door ${active ? 'rec-art-door-active' : ''} ${className}`}
    >
      <span className="rec-art-drawing" aria-hidden="true"><Mark size={size} /></span>
      <span className="rec-art-caption">{label}</span>
    </Door>
  );
}