import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PenLine, Users } from 'lucide-react';

const CONNECTIONS = [
  { name: 'Evidence', detail: 'Find what is known', to: '/ClimateSearch', Icon: BookOpen },
  { name: 'Imagination', detail: 'See through other eyes', to: '/ClimateCartoons', Icon: PenLine },
  { name: 'Action', detail: 'Find a way to help', to: '/TogetherChangeClimate', Icon: Users },
];

export default function XEqualsXCollective() {
  return (
    <section id="collective" className="covenant-collective" aria-labelledby="collective-heading">
      <div className="covenant-collective-inner">
        <p className="covenant-kicker">Love · connection · collective action</p>
        <h2 id="collective-heading">No one holds<br />the whole picture.</h2>
        <p>A researcher brings evidence. A community brings knowledge of the place it lives. A cartoonist makes a question impossible to ignore. Each can notice what another misses.</p>
        <div className="covenant-connections" aria-label="Three connected ways into the work, none ranked">
          {CONNECTIONS.map(({ name, detail, to, Icon }) => (
            <Link to={to} key={name} className="covenant-connection">
              <span className="covenant-connection-node"><Icon aria-hidden="true" /></span>
              <strong>{name}</strong><span>{detail}</span>
            </Link>
          ))}
        </div>
        <p><strong>Collective intelligence is not everyone agreeing.</strong> It is different people being able to question, connect and improve what we know, without losing their own voice.</p>
        <p className="covenant-love-line">Love is the intention. Care is the work.</p>
        <p>Here, that means protecting life, sharing what helps, crediting the hand that made it, and changing our minds when the evidence asks us to. A commitment to one another, not a claim about a mysterious force.</p>
        <Link to="/TogetherChangeClimate#record-room-groups" className="covenant-text-link">Find people working on the same thing <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}