import React from 'react';
import { Link } from 'react-router-dom';

// One line per hand: the number they were read in, their name as they signed it, where they
// came from, and how many drawings of theirs are up. The name is the door — every hand has
// an address of their own on this record.
export default function HandsRoll({ hands }) {
  return (
    <ol className="hands-roll">
      {hands.map((hand, i) => (
        <li key={hand.name} className="hand-row">
          <span className="hand-no">{String(i + 1).padStart(2, '0')}</span>
          <div className="hand-body">
            <Link className="hand-name" to={`/ClimateCartoons/Artist/${encodeURIComponent(hand.name)}`}>
              {hand.name}
            </Link>
            {hand.places.length > 0 && (
              <p className="hand-where">{hand.places.join(' · ')}</p>
            )}
          </div>
          <span className="hand-count">
            {hand.drawings === 1 ? 'one drawing' : `${hand.drawings} drawings`}
          </span>
        </li>
      ))}
    </ol>
  );
}