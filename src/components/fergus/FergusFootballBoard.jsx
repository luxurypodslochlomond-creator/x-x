import React from 'react';
import { Link } from 'react-router-dom';
import { FileDown, ArrowUpRight } from 'lucide-react';
import BoardHead from '@/components/fergus/BoardHead';
import { FERGUS_FACTS, FERGUS_CLUBS } from '@/components/fergus/fergusFacts';

export default function FergusFootballBoard() {
  return <section className="fergus-board">
    <BoardHead kicker="Player profile · 2026" title="The player page." line="For a coach, not a video company." fullTo="/FergusHughesProfile" fullLabel="The full page" />
    <dl className="fergus-facts">
      {FERGUS_FACTS.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
    </dl>
    <ul className="fergus-clubs">
      {FERGUS_CLUBS.map(club => <li key={club.club}><strong>{club.club}</strong><span>{club.note}</span></li>)}
    </ul>
    <Link to="/FergusHughesProfile" className="fergus-big-action"><FileDown size={21} /><span>Open it and save the PDF</span><ArrowUpRight size={18} /></Link>
  </section>;
}