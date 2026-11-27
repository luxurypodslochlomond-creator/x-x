import React from 'react';
import { Link } from 'react-router-dom';

const PROMISES = [
  { title: 'Follow a claim to its source.', body: 'Read the original. Check what it actually supports, and what remains uncertain.', to: '/ClimateSearch', link: 'Search the evidence' },
  { title: 'Read what we got wrong.', body: 'Corrections need a date and a reason. A changed mind should leave a visible trail.', to: '/ClimateCorrections', link: 'Read the corrections' },
  { title: 'Check a saved version.', body: 'A digital seal can reveal a change to saved content. It cannot prove that the original claim was true.', to: '/ClimateSeals', link: 'Check the seals' },
  { title: 'Inspect the rules, too.', body: 'No advertising or paid boosts. Sources and artists stay named. Read the commitments and their limits.', to: '/ExtractionProofCovenant', link: 'Read the commitments' },
];

export default function XEqualsXPromises() {
  return (
    <section id="what-is-promised" className="covenant-rules" aria-labelledby="promised-heading">
      <p className="covenant-kicker">Show the work · share the power</p>
      <h2 id="promised-heading">Check the work.<br />Including ours.</h2>
      <p className="covenant-rules-lead">A stand against extraction has to show its own workings. Do not believe a claim because it carries our mark. Follow it. Question it. Help correct it.</p>
      <ol className="covenant-rule-list">
        {PROMISES.map(({ title, body, to, link }, index) => (
          <li key={title}>
            <span className="covenant-rule-number" aria-hidden="true">0{index + 1}</span>
            <div><h3>{title}</h3><p>{body}</p></div>
            <Link to={to} className="covenant-text-link">{link} <span aria-hidden="true">↗</span></Link>
          </li>
        ))}
      </ol>
      <p className="covenant-proof-limit">Some early entries are unsigned. An automatic screening pass is not verification. <Link to="/ClimateMethod">The method names these gaps and who is accountable →</Link></p>
    </section>
  );
}