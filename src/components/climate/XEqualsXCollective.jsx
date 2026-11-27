import React from 'react';
import { Link } from 'react-router-dom';
import { TriangleAlert, Lightbulb, Users } from 'lucide-react';

const CONNECTIONS = [
  { name: 'Crises', detail: 'The harm. The place. The source.', to: '/TogetherChangeClimate#record-room-climate_crisis', Icon: TriangleAlert },
  { name: 'Solutions', detail: 'The response. The evidence. The limits.', to: '/TogetherChangeClimate#record-room-solution', Icon: Lightbulb },
  { name: 'Actions', detail: 'The work. The organiser. A way to take part.', to: '/TogetherChangeClimate#record-room-actions', Icon: Users },
];

export default function XEqualsXCollective() {
  return (
    <section id="collective" className="covenant-collective" aria-labelledby="collective-heading">
      <div className="covenant-collective-inner">
        <p className="covenant-kicker">The record · evidence into action</p>
        <h2 id="collective-heading">Confront the harm.<br />Organise the response.</h2>
        <p>A warning is not enough. The harm needs a record. A proposed solution needs scrutiny. Action needs people who can carry it through.</p>
        <nav className="covenant-connections" aria-label="Explore crises, solutions and actions">
          {CONNECTIONS.map(({ name, detail, to, Icon }) => (
            <Link to={to} key={name} className="covenant-connection">
              <span className="covenant-connection-node"><Icon aria-hidden="true" /></span>
              <strong>{name}</strong><span>{detail}</span>
            </Link>
          ))}
        </nav>
        <p><strong>The aim is not another audience. It is informed, organised action.</strong> Researchers, communities, artists and organisers bring different knowledge. The record makes that work easier to find without claiming it as its own.</p>
        <p className="covenant-love-line">Find the source.<br />Question the claim.<br />Act with others.</p>
        <p>Related entries share a subject. Groups name the subject they work on. Custodians can link a drawing to the entry it answers. These are links people can follow, not a claim that every connection has already been made.</p>
        <div className="covenant-inline-links">
          <Link to="/TogetherChangeClimate#record-room-groups">Find people working on the same thing →</Link>
          <Link to="/TogetherChangeClimate?submit=1&type=group">Start a group →</Link>
        </div>
      </div>
    </section>
  );
}