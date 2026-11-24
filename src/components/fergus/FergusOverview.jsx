import React from 'react';
import { FERGUS_ICONS, GoIcon } from '@/components/fergus/FergusIcons';
import { FERGUS_SECTIONS } from '@/components/fergus/fergusSections';

// Four doors, four drawings, almost no words. He should see what to press before reading it.
export default function FergusOverview({ onSelect }) {
  const doors = FERGUS_SECTIONS.filter(item => ['note', 'film', 'football', 'card'].includes(item.id));
  return <section className="fergus-overview">
    <header className="fergus-hero">
      <span className="fergus-hero-mark" aria-hidden="true">FH</span>
      <h1>Everything<br />in one room.</h1>
      <p>Pick one. Start there.</p>
    </header>
    <div className="fergus-tiles">
      {doors.map(({ id, title, line, Icon }) => <button type="button" key={id} className="fergus-tile" onClick={() => onSelect(id)}>
        <span className="fergus-tile-art" aria-hidden="true"><Icon size={38} /></span>
        <strong>{title}</strong>
        <span className="fergus-tile-line">{line}</span>
        <span className="fergus-tile-go" aria-hidden="true"><GoIcon size={19} /></span>
      </button>)}
    </div>
    <button type="button" className="fergus-notes-strip" onClick={() => onSelect('notes')}>
      <span aria-hidden="true"><FERGUS_ICONS.notes size={26} /></span>
      <span><strong>Notes from Dad</strong><small>Read them. Leave one back.</small></span>
      <GoIcon size={19} aria-hidden="true" />
    </button>
  </section>;
}