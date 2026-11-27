import React from 'react';
import { Link } from 'react-router-dom';

const PROMISES = [
  { title: 'No engagement-ranked feed.', body: 'No advertising. No paid boosts. Browse by subject, not by likes.', to: '/ClimateMethod', link: 'The method' },
  { title: 'Names stay on the work.', body: 'Sources, artists and credits travel with what you share.', to: '/ClimateCartoons', link: 'The Wall' },
  { title: 'Changes leave a trace.', body: 'Read the corrections. Question the record, including us.', to: '/ClimateCorrections', link: 'The corrections' },
];

export default function XEqualsXPromises() {
  return (
    <section id="what-is-promised" className="covenant-rules" aria-labelledby="promised-heading">
      <div className="covenant-section-heading">
        <p className="covenant-kicker">A record, not an attention business</p>
        <h2 id="promised-heading">Different rules. In practice.</h2>
      </div>
      <ol className="covenant-rule-list">
        {PROMISES.map(({ title, body, to, link }, index) => (
          <li key={title}>
            <span className="covenant-rule-number" aria-hidden="true">0{index + 1}</span>
            <div><h3>{title}</h3><p>{body}</p></div>
            <Link to={to} className="covenant-text-link">{link} <span aria-hidden="true">↗</span></Link>
          </li>
        ))}
      </ol>
    </section>
  );
}