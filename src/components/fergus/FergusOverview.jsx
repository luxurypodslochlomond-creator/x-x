import React from 'react';
import { ArrowUpRight, MessageSquare, ArrowRight } from 'lucide-react';
import { FERGUS_SECTIONS } from '@/components/fergus/fergusSections';
export default function FergusOverview({ onSelect }) {
  return <section className="fergus-overview">
    <header><span className="fergus-eyebrow">Fergus Hughes · Glasgow</span><h1>Make things.<br />Make your move.</h1><p>The application, the film, the football and your card. Open any of them without leaving your room.</p></header>
    <div className="fergus-overview-grid">
      {FERGUS_SECTIONS.filter(item => item.path).map(({ id, title, line, Icon }) => <button type="button" className="fergus-project" key={id} onClick={() => onSelect(id)}>
        <Icon size={25} aria-hidden="true" /><strong>{title}</strong><p>{line}</p><ArrowUpRight size={19} aria-hidden="true" />
      </button>)}
    </div>
    <button type="button" className="fergus-notes-door" onClick={() => onSelect('notes')}><MessageSquare size={23} aria-hidden="true" /><span><strong>Notes from Dad</strong><small>Read what’s here. Leave something for next time.</small></span><ArrowRight size={19} aria-hidden="true" /></button>
  </section>;
}