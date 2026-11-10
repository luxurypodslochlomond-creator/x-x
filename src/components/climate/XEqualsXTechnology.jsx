import React from 'react';
import { Link } from 'react-router-dom';

const CHECKS = [
  {
    title: 'Versions you can compare',
    plain: 'A seal compares an entry with a saved fingerprint. A match does not prove the claim is true or provide an independent timestamp.',
    to: '/ClimateSeals',
    link: 'Check a seal',
  },
  {
    title: 'Access with a second key',
    plain: 'The guest-list change process asks two different keepers to agree. App administrators retain direct access to the underlying records.',
    to: '/ClimateMethod',
    link: 'Read the method',
  },
  {
    title: 'Decisions that leave a record',
    plain: 'The review log is internal; published correction notes are public. Neither proves a decision was right. An unsigned entry is still unsigned.',
    to: '/ClimateCorrections',
    link: 'Read the corrections',
  },
];

export default function XEqualsXTechnology() {
  return (
    <div className="pb-4 pt-3">
      <p className="text-record-muted">Technology can expose a change. It cannot make a claim true or put its operator beyond scrutiny.</p>
      <dl>
        {CHECKS.map(({ title, plain, to, link }) => (
          <div key={title} className="covenant-check">
            <dt>{title}</dt>
            <dd>{plain}<br /><Link to={to}>{link} →</Link></dd>
          </div>
        ))}
      </dl>
    </div>
  );
}