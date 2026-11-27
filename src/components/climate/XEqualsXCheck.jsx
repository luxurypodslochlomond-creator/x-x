import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DOORS = [
  { title: 'Read the record.', body: 'Crises, solutions and actions, with their sources.', to: '/TogetherChangeClimate' },
  { title: 'Open the Wall.', body: 'Cartoonists from Africa, Asia and beyond. Each hand named.', to: '/ClimateCartoons' },
  { title: 'Follow the Wire.', body: 'Dated reports, with links to where they came from.', to: '/ClimateWire' },
  { title: 'Hear the music.', body: 'Artists’ work. Pressed to play, never played at you.', to: '/ClimateMusic' },
  { title: 'Put work on the record.', body: 'Offer a source, a solution or an action.', to: '/TogetherChangeClimate?submit=1' },
  { title: 'Help check it.', body: 'Bring a careful pair of eyes. Learn what checking involves.', to: '/ClimateFellows' },
];

export default function XEqualsXCheck() {
  return (
    <section id="checkable" className="covenant-use" aria-labelledby="ways-in">
      <p className="covenant-kicker">Use the platform · add to the collective work</p>
      <h2 id="ways-in">Bring evidence.<br />Bring art. Bring action.</h2>
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