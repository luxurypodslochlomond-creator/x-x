import React from 'react';
import { Link } from 'react-router-dom';
import '@/components/climate/cartoons/wall-navigation.css';

const LINKS = [
  { href: '/ClimateCartoons/Print', label: 'Print a show', line: 'Choose the drawings; keep the credits.' },
  { href: '/ClimateCartoons/Thread', label: 'Present the wall', line: 'One drawing at a time.' },
  { href: '/ClimateLedger', label: 'Stand behind the work', line: 'Paid work, skills, space and the public ledger.' },
  { href: '/ClimateCartoons/WhatThisIs', label: 'Your work and your rights', line: 'The terms for showing and sharing.' },
  { href: '/ClimateCartoons/Francis', label: 'Francis Umendu Odupute', line: 'The artist and his work.' },
  { href: '/ClimateCartoons/CAIB', label: 'CartoonAFRICA and this record', line: 'Separate work, properly credited.' },
  { href: '/ClimateMap', label: 'Where the drawings were made', line: 'Places named by their senders.' },
];

export default function CartoonRoomNavigation() {
  return <nav className="wall-setlist" aria-label="Use the wall and check its terms">
    <div className="wall-setlist-head"><h3 className="wall-setlist-title">Use it. Check it. Take it with you.</h3></div>
    <ul>{LINKS.map(({ href, label, line }) => <li key={href}>
      <Link to={href}><span className="wall-setlist-label">{label}<span className="wall-setlist-line">{line}</span></span></Link>
    </li>)}</ul>
  </nav>;
}