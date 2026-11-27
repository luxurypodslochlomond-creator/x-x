import React from 'react';
import { Link } from 'react-router-dom';

// ── THE THREE DOORS, IN THE RECORD'S OWN VOICE ─────────────────────────────────
// Brian, 27 November: "crisis solutions and actions right bro but sentence underneath isn't
// hitting the right spot... they are reading us like 'post gesture notification', no soul."
//
// He is right about the cause. The lines underneath were questions, and a question on a
// page is the voice of a form: it asks the reader to supply the meaning the page should
// have supplied. So they are statements now, three beats each, in the voice the rest of the
// record uses out loud — a place, a people, a source; tried, costed, held; a Monday.
//
// The names stay exactly as they were, because those are the record's words and a reader
// searching for them has to land here. Only the line beneath each one changed.
const THREE = [
  {
    name: 'A crisis',
    body: 'A place. A people. A link to whoever said so. No source, no entry.',
  },
  {
    name: 'A solution',
    body: 'What was tried, what it cost, and whether it held. Not a promise. A record.',
  },
  {
    name: 'An action',
    body: 'Something a person can do on Monday. Join one, or start one so the next person can find it.',
  },
];

export default function XEqualsXArrangement() {
  return (
    <section id="arrangement" className="covenant-arrangement" aria-labelledby="arrangement-heading">
      <div className="covenant-arrangement-inner">
        <p className="covenant-kicker">The record, in three doors</p>
        <h2 id="arrangement-heading">Three doors.<br />One record.<br />Nothing in it is decoration.</h2>
        <ol className="covenant-three">
          {THREE.map(({ name, body }) => (
            <li key={name}>
              <span className="covenant-three-name">{name}</span>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <p className="covenant-arrangement-line">A crisis with nothing working beside it is only a warning. A thing that works with nothing to do about it is only a shelf. A thing to do with neither is only noise.</p>
        <p className="covenant-arrangement-drawings"><strong>A drawing is not a fourth door.</strong> It travels through all three. A cartoon can make the damage impossible to look away from, make a working answer stick in the memory, make the next move feel possible. That is what a transmission is: not the message alone, but the message arriving somewhere it changes what a person does.</p>
        <div className="covenant-platform-part">
          <p><strong>Our part, said plainly.</strong> We are not the authors of this work. Researchers made the evidence, communities made the actions, artists made the drawings. Our job is to keep the record standing, the sources attached, the doors open, and nothing that was given lost.</p>
          <p>That is the whole of our claim. A platform can carry a movement. It cannot be one.</p>
          <p className="covenant-platform-mark">x = x &middot; no one left behind</p>
        </div>
        <Link to="/ClimateMethod" className="covenant-text-link">How an entry gets on, and who signs it <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}