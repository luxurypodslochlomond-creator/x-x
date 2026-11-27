import React from 'react';
import { Link } from 'react-router-dom';
import { RoomMarkCrisis, RoomMarkSolution, RoomMarkAction } from '@/components/climate/RoomMarks';

// The record's own cut marks, not a set of stock pictograms: the break, the mended break and
// the ground stepped up. They are drawn by the same hand as the record's doors, so the three
// rooms are recognisable at a glance and belong to this book rather than to a icon library.
const CONNECTIONS = [
  { name: 'Crises', detail: 'The harm. The place. The source.', to: '/TogetherChangeClimate#record-room-climate_crisis', Mark: RoomMarkCrisis },
  { name: 'Solutions', detail: 'The response. The evidence. The limits.', to: '/TogetherChangeClimate#record-room-solution', Mark: RoomMarkSolution },
  { name: 'Actions', detail: 'The work. The organiser. A way to take part.', to: '/TogetherChangeClimate#record-room-actions', Mark: RoomMarkAction },
];

export default function XEqualsXCollective() {
  return (
    <section id="collective" className="covenant-collective" aria-labelledby="collective-heading">
      <div className="covenant-collective-inner">
        <p className="covenant-kicker">The record</p>
        <h2 id="collective-heading">What the record holds.</h2>
        <p>Reported harm, responses and organised work, with links to the people and sources behind them. Filing a response under “Solutions” is not proof that it works.</p>
        <nav className="covenant-connections" aria-label="Explore crises, solutions and actions">
          {CONNECTIONS.map(({ name, detail, to, Mark }) => (
            <Link to={to} key={name} className="covenant-connection">
              <span className="covenant-connection-node"><Mark size={26} /></span>
              <strong>{name}</strong><span>{detail}</span>
            </Link>
          ))}
        </nav>
        <p>Entries and groups can be found by subject. Custodians can link a drawing to the entry it addresses. Researchers, communities, artists and organisers keep the credit for their work.</p>
        <div className="covenant-inline-links">
          <Link to="/TogetherChangeClimate#record-room-groups">Find people working on the same thing →</Link>
          <Link to="/TogetherChangeClimate?submit=1&type=group">Start a group →</Link>
        </div>
      </div>
    </section>
  );
}