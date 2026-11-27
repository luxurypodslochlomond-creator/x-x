import React from 'react';
import { X_EQUALS_X_EVIDENCE } from '@/components/climate/xEqualsXEvidence';

export default function XEqualsXStand() {
  return (
    <section className="covenant-world" aria-labelledby="the-world">
      <div className="covenant-evidence-head">
        <p className="covenant-kicker">The case · sources checked 27 November 2026</p>
        <h2 id="the-world">Power is built<br />into the system.</h2>
        <p>A ranking system decides what becomes visible. That is power, not plumbing. These findings are why we choose a record over a feed, and collective use over captive attention.</p>
      </div>
      <aside className="covenant-case" aria-label="Evidence behind the argument">
        <p className="covenant-case-label">Our headings make the argument. The sources show what is known.</p>
        <dl className="covenant-facts">
          {X_EQUALS_X_EVIDENCE.map(({ title, field, published, body, scope, source, href }) => (
            <div key={title} className="covenant-evidence-entry">
              <dt>
                <span className="covenant-evidence-index">{field} · {published}</span>
                <span className="covenant-evidence-title">{title}</span>
              </dt>
              <dd>
                <p>{body}</p>
                <a className="covenant-evidence-source" href={href} target="_blank" rel="noopener noreferrer">{source} ↗<span className="sr-only"> (opens a new tab)</span></a>
                <p className="covenant-evidence-scope"><strong>What this does and does not show.</strong> {scope}</p>
              </dd>
            </div>
          ))}
        </dl>
        <p className="covenant-case-small">These are sources, not sponsors. None is presented as an endorsement by the UN, a university or any individual. A public record is a tool for action, not proof that action has happened.</p>
      </aside>
    </section>
  );
}