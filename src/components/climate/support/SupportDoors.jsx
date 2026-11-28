import React from 'react';
import { Link } from 'react-router-dom';

// Three things a person can actually do today. Each is a real door on the record, not a promise.
const DOORS = [
  {
    n: '01',
    title: 'Pay an artist.',
    line: 'Agree a fee, a deadline and the rights with the hand that draws. A private offer, not a payment.',
    to: '/ClimateLedger#offer-help',
    action: 'Offer a paid brief',
  },
  {
    n: '02',
    title: 'Give the work a place.',
    line: 'A classroom, a library, a hall. Print a show with every credit and source attached.',
    to: '/ClimateCartoons/Print',
    action: 'Choose drawings',
  },
  {
    n: '03',
    title: 'Keep the record.',
    line: 'Hosting, checking and translation cost money. Help with those and buy no influence.',
    to: '/ClimateSupport#give',
    action: 'See how giving works',
  },
];

export default function SupportDoors() {
  return <nav className="support-doors" aria-label="Ways to stand behind the work">
    {DOORS.map(door => <Link key={door.n} to={door.to} className="support-door">
      <span className="support-door-number" aria-hidden="true">{door.n}</span>
      <span className="support-door-title">{door.title}</span>
      <span className="support-door-line">{door.line}</span>
      <span className="support-door-action">{door.action} →</span>
    </Link>)}
  </nav>;
}