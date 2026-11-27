import React from 'react';
import { Link } from 'react-router-dom';
import { Network, Palette, Users } from 'lucide-react';

const CONNECTIONS = [
  { name: 'Art', detail: 'The Wall. The artists. The work itself.', to: '/ClimateCartoons', Icon: Palette },
  { name: 'Intelligence', detail: 'Search the record. Question the evidence.', to: '/ClimateSearch', Icon: Network },
  { name: 'Activism', detail: 'Find an action. Contact its organiser.', to: '/TogetherChangeClimate#record-room-actions', Icon: Users },
];

export default function XEqualsXCollective() {
  return (
    <section id="collective" className="covenant-collective" aria-labelledby="collective-heading">
      <div className="covenant-collective-inner">
        <p className="covenant-kicker">The platform · connected work, not collected attention</p>
        <h2 id="collective-heading">Connect the work.<br />Build collective power.</h2>
        <p>Art can confront what a report cannot. Evidence can expose what power would rather leave unseen. People can turn both into organised action. This platform brings those kinds of work within reach of one another.</p>
        <nav className="covenant-connections" aria-label="Explore art, intelligence and activism">
          {CONNECTIONS.map(({ name, detail, to, Icon }) => (
            <Link to={to} key={name} className="covenant-connection">
              <span className="covenant-connection-node"><Icon aria-hidden="true" /></span>
              <strong>{name}</strong><span>{detail}</span>
            </Link>
          ))}
        </nav>
        <p><strong>Art is not decoration. People are not an audience. Life is not a resource to exhaust.</strong> The work belongs to the people who make it, not to the platform that carries it.</p>
        <p className="covenant-love-line">Human knowledge.<br />Machine assistance.<br />Collective action.</p>
        <p>AI helps with searching and translation. It does not replace an artist’s voice, lived knowledge or an accountable decision. Collective intelligence means we can question one another, connect what we know and act without having to become the same.</p>
        <div className="covenant-inline-links">
          <Link to="/TogetherChangeClimate#record-room-groups">Find people working on the same thing →</Link>
          <Link to="/TogetherChangeClimate?submit=1&type=group">Start a group →</Link>
        </div>
      </div>
    </section>
  );
}