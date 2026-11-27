import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DOORS = [
  { title: 'Find the evidence.', body: 'Search crises, solutions and actions.', to: '/ClimateSearch' },
  { title: 'Put work on the record.', body: 'Offer a source, a solution or an action.', to: '/TogetherChangeClimate?submit=1' },
  { title: 'Bring a drawing.', body: 'The Wall. Your name stays on your work.', to: '/ClimateCartoons#cartoon-your-turn' },
  { title: 'Help check it.', body: 'See what checking sources involves.', to: '/ClimateFellows' },
];

export default function XEqualsXCheck() {
  return (
    <section id="checkable" className="covenant-use" aria-labelledby="ways-in">
      <p className="covenant-kicker">Off the feed. Into the world.</p>
      <h2 id="ways-in">Put it to work.</h2>
      <ul className="covenant-doors">
        {DOORS.map(({ title, body, to }) => (
          <li key={to}>
            <Link to={to} className="covenant-door">
              <span><strong className="covenant-door-title">{title}</strong><span className="covenant-door-detail">{body}</span></span>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}