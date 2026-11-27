import React from 'react';
import { Link } from 'react-router-dom';

// ── THREE DOORS, SAID PLAINLY ──────────────────────────────────────────────────
// Brian, 27 November: "simplify how crises and solutions make clear difference and connect
// it all." A reader arriving from a cartoon, a chat or a conference should be able to tell
// the three doors apart without reading the method page first.
//
// The second half is the part nobody else says: a drawing is not a fourth door. It travels
// through all three, which is exactly what a transmission does. And the platform builders
// have their own part in it, stated in their own voice, because a record that names
// everybody's contribution except the people holding it up is not being modest, it is
// being evasive.
const THREE = [
  {
    name: 'A crisis',
    question: 'What is happening, and to whom?',
    body: 'Where it is, who is carrying it, and a link to whoever reported it. No source, no entry.',
  },
  {
    name: 'A solution',
    question: 'What has been tried, and did it work?',
    body: 'Not an idea and not a promise. Something with a record behind it, and the place it came from.',
  },
  {
    name: 'An action',
    question: 'What can a person do this week?',
    body: 'A cleanup, a planting, a meeting, a letter. Join one, or start one so others can find it.',
  },
];

export default function XEqualsXArrangement() {
  return (
    <section id="arrangement" className="covenant-arrangement" aria-labelledby="arrangement-heading">
      <div className="covenant-arrangement-inner">
        <p className="covenant-kicker">How the record is arranged</p>
        <h2 id="arrangement-heading">Three doors.<br />One question: what can be done?</h2>
        <ol className="covenant-three">
          {THREE.map(({ name, question, body }) => (
            <li key={name}>
              <span className="covenant-three-name">{name}</span>
              <span className="covenant-three-question">{question}</span>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <p className="covenant-arrangement-line">A crisis without a solution is only a warning. A solution without an action is only a shelf. An action without either is only noise.</p>
        <p className="covenant-arrangement-drawings"><strong>A drawing is not a fourth door.</strong> It travels through all three. A cartoon can make a crisis impossible to look away from, a solution stick in the memory, an action feel possible. That is what a transmission is: not the message alone, but the message arriving somewhere it changes what a person does.</p>
        <div className="covenant-platform-part">
          <p><strong>Our part, said plainly.</strong> We are not the authors of this work. Researchers made the evidence, communities made the actions, artists made the drawings. Our job is to keep the record standing, the sources attached, the doors open, and the machine honest about what it did and did not do.</p>
          <p>That is the whole of our claim. A platform can carry a movement. It cannot be one.</p>
          <p className="covenant-platform-mark">x = x &middot; no one left behind</p>
        </div>
        <Link to="/ClimateMethod" className="covenant-text-link">How an entry gets on, and who signs it <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}