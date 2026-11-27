import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DOORS = [
  { title: 'Explore the record', body: 'Crises, solutions and actions, organised by subject. Start with what matters to you.', to: '/TogetherChangeClimate' },
  { title: 'Look at the drawings', body: 'The Wall: artists helping us see the climate differently, with their names and credits alongside their work.', to: '/ClimateCartoons' },
  { title: 'Find out what has changed', body: 'The Wire: reports and updates, with their sources and dates.', to: '/ClimateWire' },
  { title: 'Share something useful', body: 'Send in a source, a solution or an action for the record.', to: '/TogetherChangeClimate?submit=1' },
];

export default function XEqualsXCheck() {
  return (
    <section id="checkable" aria-labelledby="ways-in">
      <p className="covenant-kicker">Make it useful to you</p>
      <h2 id="ways-in">Where would you like to begin?</h2>
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