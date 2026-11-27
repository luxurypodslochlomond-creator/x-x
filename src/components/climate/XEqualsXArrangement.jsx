import React from 'react';
import { Link } from 'react-router-dom';

const THREE = [
  { name: 'Follow the answer to its sources.', body: 'Search the record. Follow the entries an answer cites. Read the original sources and decide what they actually support.', to: '/ClimateSearch' },
  { name: 'Check the saved content yourself.', body: 'Compare an entry’s SHA-256 fingerprint in your own browser. A matching seal checks the saved content, not whether its claims are true.', to: '/ClimateSeals' },
  { name: 'See how publication is decided.', body: 'The method names the screening process, unsigned entries and the gaps still to close. Automatic clearance is not independent verification.', to: '/ClimateMethod' },
];

export default function XEqualsXArrangement() {
  return (
    <section id="arrangement" className="covenant-arrangement" aria-labelledby="arrangement-heading">
      <div className="covenant-arrangement-inner">
        <p className="covenant-kicker">Technology · accountability</p>
        <h2 id="arrangement-heading">How the tools are used.</h2>
        <p>AI assists search, screening and translation. It can make mistakes; automatic screening is not independent verification. Brian Hughes builds the platform with BASE 1, the name used here for the AI assistant.</p>
        <ol className="covenant-three">
          {THREE.map(({ name, body, to }) => (
            <li key={name}>
              <Link to={to} className="covenant-three-name">{name} <span aria-hidden="true">→</span></Link>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <div className="covenant-platform-part">
          <p><strong>Technical capability is not editorial authority.</strong> A machine does not speak for a community or an artist. We remain responsible for what we build and publish. The code is public for inspection.</p>
        </div>
        <a href="https://github.com/luxurypodslochlomond-creator/x-x" target="_blank" rel="noopener noreferrer" className="covenant-text-link">Inspect the public code <span aria-hidden="true">↗</span><span className="sr-only"> (opens a new tab)</span></a>
      </div>
    </section>
  );
}