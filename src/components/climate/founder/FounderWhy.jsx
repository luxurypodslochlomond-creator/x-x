import React from 'react';
import { Link } from 'react-router-dom';

// ── WHY THE RECORD EXISTS, SAID HARD ────────────────────────────────────────────
// Brian, 28 November: "words harder bro about problems the planet needs our help… not big
// standards bullshit… coolasfuck thinking about platform and record". So this is the argument
// in three steps, each one a fact with its source named in the line rather than a citation
// block at the foot. Nothing here is a slogan that would survive being checked and found
// empty: the two measured claims are attributed, and the third is a position, stated as one.
const ARGUMENT = [
  {
    number: '01',
    title: 'The reading is not in dispute.',
    body: '2015–2025 were the hottest eleven years on record, and Earth’s energy imbalance is the highest on record. That is a measurement, not a forecast. (WMO, State of the Global Climate 2025, published March 2026.)',
  },
  {
    number: '02',
    title: 'The machine is not built to remember.',
    body: 'A feed is built to keep you moving, and what keeps you moving is not the same thing as what tells you the truth. In a measured test, engagement ranking amplified hostile content that the people shown it said they did not want. (PNAS Nexus, 2025.)',
  },
  {
    number: '03',
    title: 'Knowing has never been the work.',
    body: 'Understanding the damage changes nothing on its own. The work is the response: the solution that was tried, the place it worked, and the person who can be found to do it again.',
  },
];

export default function FounderWhy() {
  return (
    <section className="record-founder-sheet" aria-labelledby="why-the-record">
      <p className="record-founder-kicker">The planet’s problem · not ours to sell</p>
      <h2 id="why-the-record" className="record-founder-h2">Why this<br />record exists.</h2>
      <p className="record-founder-lede">The planet is not short of evidence. It is short of places where evidence survives contact with power.</p>
      <ol className="record-founder-argument">
        {ARGUMENT.map(({ number, title, body }) => (
          <li key={number}>
            <span aria-hidden="true" className="record-founder-argument-number">{number}</span>
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="record-founder-slogan">A feed forgets by design.<br />A record remembers on purpose.</p>
      <p className="record-founder-sources">Both measured claims above are checkable in their own publications, and the full case with its limits is on <Link to="/XEqualsX">x = x</Link>.</p>
    </section>
  );
}