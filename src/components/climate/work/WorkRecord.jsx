import React from 'react';
import { Link } from 'react-router-dom';

// ── 03 · WHAT THIS ACTUALLY IS ────────────────────────────────────────────────
// The difference between this and every other climate platform is not a feature list, it is
// five things it does that a platform with money cannot do, because they take money out of
// the room. Each one is a page, so the claim can be tested instead of believed.
const PROOFS = [
  {
    lead: 'Nobody can buy a line.',
    line: 'No advertising, no sponsored entry, no paywall on a solution or a crisis. Not a policy in a footer: the pages have nowhere for a buyer to stand.',
    to: '/ExtractionProofCovenant',
    door: 'The covenant',
  },
  {
    lead: 'Every entry is fingerprinted, and the reader checks it.',
    line: 'Each entry is sealed, and the check runs in the reader’s own browser rather than on our server. You do not have to trust the person who built it.',
    to: '/ClimateSeals',
    door: 'The seals',
  },
  {
    lead: 'The arithmetic of what is counted is published.',
    line: 'A reading is counted by country, never a person, and the mathematics of both is on its own page. There is no hidden analytics layer to be sold later.',
    to: '/PrivacyMathematics',
    door: 'Privacy, in mathematics',
  },
  {
    lead: 'Being wrong has a place to go.',
    line: 'A correction is a published act with a date and a name on it, not a quiet edit. The method says who checks an entry and what happens when it fails.',
    to: '/ClimateMethod',
    door: 'The method',
  },
  {
    lead: 'It can be rebuilt without us.',
    line: 'Every API is documented and the code is open. If you do not trust the builder, you can take the thing and stand it up somewhere else, which is the only real proof of open.',
    to: '/Platform',
    door: 'The open platform',
  },
];

export default function WorkRecord() {
  return (
    <section className="work-band">
      <p className="work-band-head"><span>03</span>What this is, and what a platform with money cannot do</p>
      <p className="work-band-note">
        Five things, each of which costs something to keep. Each one is a page you can open now.
      </p>
      <ul className="work-proofs">
        {PROOFS.map((p) => (
          <li key={p.lead}>
            <b>{p.lead}</b>
            <em>{p.line}</em>
            <Link to={p.to}>{p.door}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}