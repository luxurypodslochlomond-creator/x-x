import React from 'react';
import { Link } from 'react-router-dom';

const PROMISES = [
  { title: 'Your time belongs to you.', body: 'No advertising or paid placement in the record. No public likes or follower scores deciding what deserves attention.', to: '/ExtractionProofCovenant', link: 'What we commit to' },
  { title: 'The work keeps its name.', body: 'Follow an entry back to its source. See who made a drawing. Sharing someone’s work should not mean losing the person behind it.', to: '/ClimateMethod', link: 'How sources and credits are kept' },
  { title: 'Your trust is not owed.', body: 'An entry can be mistaken. Dates, sources and visible corrections help you question it. Equal respect for people does not mean equal weight for every claim.', to: '/ClimateCorrections', link: 'See what has been corrected' },
];

export default function XEqualsXPromises() {
  return (
    <section id="what-is-promised" aria-labelledby="promised-heading">
      <p className="covenant-kicker">A different way to use the internet</p>
      <h2 id="promised-heading">Here to help. Not to keep you here.</h2>
      <p>Too many platforms turn our attention, our worries and our work into something to sell. This record has a different purpose: help someone find something useful, then let them get on with their life.</p>
      <ul className="covenant-plain-list">
        {PROMISES.map(({ title, body, to, link }) => (
          <li key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
            <Link to={to} className="covenant-text-link">{link} <span aria-hidden="true">→</span></Link>
          </li>
        ))}
      </ul>
      <p className="covenant-caption">The record does keep submissions, contact details needed to handle them, and counts of entries being opened. <Link to="/ClimatePrivacy" className="covenant-text-link">Read what is kept and why.</Link></p>
    </section>
  );
}