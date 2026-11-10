import React from 'react';
import { Link } from 'react-router-dom';

export default function XEqualsXOpening() {
  return (
    <header aria-labelledby="the-principle" className="covenant-opening">
      <h1 id="the-principle" className="covenant-equation" aria-label="x equals x" translate="no">
        <span aria-hidden="true">x</span><span aria-hidden="true">=</span><span aria-hidden="true">x</span>
      </h1>
      <h2>The principle</h2>
      <p className="covenant-purpose">
        A solution is a solution. An action is an action. A person is a person.
        No algorithm ranks them. No money amplifies them. The record is the record
        — every entry equal because it is true, not because it is loud.
      </p>
      <p className="covenant-caption covenant-principle-note">
        <em>This is what an honest record looks like. This is the opposite of the feed.</em>
      </p>
      <Link className="covenant-open" to="/TogetherChangeClimate">Read the record <span aria-hidden="true">→</span></Link>
    </header>
  );
}