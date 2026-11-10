import React from 'react';
import { Link } from 'react-router-dom';

const CHECKS = [
  {
    title: 'Versions',
    plain: 'A seal checks whether an entry matches its saved fingerprint. It does not prove the claim is true, fair or correctly credited. Music is not covered by these seals yet.',
    to: '/ClimateSeals',
    link: 'Check a seal',
  },
  {
    title: 'Access',
    plain: 'Guest-list changes normally need two different keepers. An app administrator can reach the list directly, so this is not an unbreakable lock.',
    to: '/ClimateMethod',
    link: 'Read the method',
  },
  {
    title: 'Decisions and corrections',
    plain: 'The review log is internal. Published correction notes are public. Neither is a certificate that a decision was right.',
    to: '/ClimateCorrections',
    link: 'Read the corrections',
  },
];

export default function XEqualsXTechnology() {
  return (
    <div className="pb-4 pt-5">
      <p className="text-record-muted">The tools help us check versions and decisions. They cannot establish equal worth or guarantee good judgement.</p>
      <dl className="mt-6 space-y-6">
        {CHECKS.map(({ title, plain, to, link }) => (
          <div key={title}>
            <dt className="font-semibold text-record-ink">{title}</dt>
            <dd className="mt-1 text-[16px] leading-relaxed text-record-ink">
              {plain}{' '}
              <Link to={to} className="underline decoration-record-mark underline-offset-4">{link}.</Link>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}