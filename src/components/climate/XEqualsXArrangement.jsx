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
        <p className="covenant-kicker">Technology · BASE 1 · accountability</p>
        <h2 id="arrangement-heading">Machine speed.<br />Human responsibility.</h2>
        <p className="covenant-arrangement-line">BASE 1 works on the tools. It does not get the last word.</p>
        <p>BASE 1 is the name used here for the AI assistant. Brian Hughes builds this platform with it. AI assists search, screening and translation: practical work that makes the record more usable. It can also be wrong. Fluency is not evidence. An automatic pass is not a human signature.</p>
        <ol className="covenant-three">
          {THREE.map(({ name, body, to }) => (
            <li key={name}>
              <Link to={to} className="covenant-three-name">{name} <span aria-hidden="true">→</span></Link>
              <p>{body}</p>
            </li>
          ))}
        </ol>
        <div className="covenant-platform-part">
          <p><strong>Technical capability is not editorial authority.</strong> A machine can help find and connect work. It cannot stand in for a community’s knowledge, an artist’s voice or a person willing to put their name to a decision.</p>
          <p>We are responsible for what we build and publish. Researchers, communities and artists keep the credit for their work. The platform’s code is public: the design is open to scrutiny, too.</p>
          <p className="covenant-platform-mark">In defence of our planet and life.</p>
        </div>
        <a href="https://github.com/luxurypodslochlomond-creator/x-x" target="_blank" rel="noopener noreferrer" className="covenant-text-link">Inspect the public code <span aria-hidden="true">↗</span><span className="sr-only"> (opens a new tab)</span></a>
      </div>
    </section>
  );
}