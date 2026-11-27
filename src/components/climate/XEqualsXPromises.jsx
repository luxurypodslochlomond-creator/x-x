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
      <p className="covenant-kicker">What we do about it</p>
      <h2 id="promised-heading">A platform is not a protest.<br />It is what people use between them.</h2>
      <p className="covenant-rules-lead">We cannot rebuild the internet. We can make one corner of it work differently, in the open, where anyone can check us.</p>
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