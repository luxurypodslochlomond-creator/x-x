import React from 'react';
import { X_EQUALS_X_EVIDENCE } from '@/components/climate/xEqualsXEvidence';

export default function XEqualsXStand() {
  return (
    <section className="covenant-world" aria-labelledby="the-world">
      <p className="covenant-kicker">Sources</p>
      <h2 id="the-world">What the evidence says.</h2>
      <p>We are against the extraction of living places, people’s work and the attention they need to act. This record chooses another job: keep knowledge connected to the people who can use it.</p>
      <aside className="covenant-case" aria-label="Evidence behind the argument">
        <p className="covenant-case-label">Read the original sources</p>
        <dl className="covenant-facts">
          {X_EQUALS_X_EVIDENCE.map(({ title, body, source, href }) => (
            <div key={title}>
              <dt>{title}</dt>
              <dd>{body}</dd>
              <dd className="covenant-facts-source">
                <a href={href} target="_blank" rel="noopener noreferrer">{source} ↗<span className="sr-only"> (opens a new tab)</span></a>
              </dd>
            </div>
          ))}
        </dl>
        <p className="covenant-case-small">These sources support the statements above. They are not endorsements of this platform or evidence of its impact.</p>
      </aside>
    </section>
  );
}