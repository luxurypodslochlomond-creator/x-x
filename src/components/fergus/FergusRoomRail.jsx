import React from 'react';
import { FERGUS_SECTIONS } from '@/components/fergus/fergusSections';
export default function FergusRoomRail({ selected, onSelect }) {
  return <nav className="fergus-rail" aria-label="Everything in Fergus’s room">
    {FERGUS_SECTIONS.map(({ id, label, Icon }) => <button type="button" key={id} aria-pressed={selected === id} onClick={() => onSelect(id)} aria-controls="fergus-workspace"><Icon size={19} aria-hidden="true" /><span>{label}</span></button>)}
  </nav>;
}