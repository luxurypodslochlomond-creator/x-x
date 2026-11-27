import React from 'react';
import { Link } from 'react-router-dom';

// ── THE THREE DOORS, NAMED LIKE SOMETHING THAT MATTERS ─────────────────────────
// Brian, 27 November: "you sure crises solutions actions have right secretions bro sound
// like nursery school to me". He is right, and it is worth saying why rather than just
// swapping the words.
//
// Crisis / solution / action is the vocabulary of a funding application. It is accurate and
// it is also a place to hide: a category lets an institution file a thing without ever
// saying what is breaking or what it is doing on Monday. So the doors are named by the
// question a person actually arrives with, and the record's own words are kept underneath
// in small type, because a reader searching the record still needs to find them and because
// pretending the plain terms do not exist would be its own small dishonesty.
//
// Nothing about the data changes. These are the same three entities the record has always
// had; only the sign on the door is written in a language an adult would use out loud.
const THREE = [
  {
    plain: 'A crisis',
    name: 'What is breaking',
    question: 'Where, and who is carrying it?',
    body: 'The harm itself, and a link to whoever reported it. No source, no entry.',
  },
  {
    plain: 'A solution',
    name: 'What is working',
    question: 'What has been tried, and did it hold?',
    body: 'Not an idea and not a promise. Something with a record behind it, and the place it came from.',
  },
  {
    plain: 'An action',
    name: 'What you can do',
    question: 'This week. Not someday.',
    body: 'A cleaning, a planting, a meeting, a letter. Join one, or start one so others can find it.',
  },
];

export default function XEqualsXArrangement() {
  return (
    <section id="arrangement" className="covenant-arrangement" aria-labelledby="arrangement-heading">
      <div className="covenant-arrangement-inner">
        <p className="covenant-kicker">How the record is arranged</p>
        <h2 id="arrangement-heading">Three doors.<br />One question: what can be done?</h2>
        <ol className="covenant-three">
          {THREE.map(({ plain, name, question, body }) => (
            <li key={plain}>
              <span className="covenant-three-name">{name}</span>
              <span className="covenant-three-question">{question}</span>
              <p>{body}</p>
              <span className="covenant-three-plain">Filed on the record as {plain.toLowerCase()}</span>
            </li>
          ))}
        </ol>
        <p className="covenant-arrangement-line">A wound with nothing working beside it is only a warning. A thing that works with nothing to do about it is only a shelf. A thing to do with neither is only noise.</p>
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