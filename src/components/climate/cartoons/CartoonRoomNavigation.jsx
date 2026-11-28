import React from 'react';
import { Link } from 'react-router-dom';
import { MarkContactSheet, MarkInOrder, MarkOneHand, MarkTwoEdges, MarkRoom, MarkWhere, MarkCounted } from '@/components/climate/cartoons/SetListMarks';
import '@/components/climate/cartoons/wall-navigation.css';

const LINKS = [
  { href: '/ClimateCartoons/Print', label: 'Print a show', line: 'Choose drawings, print them, hang them', Mark: MarkContactSheet },
  { href: '/ClimateCartoons/Thread', label: 'Read in order', line: 'One drawing after another', Mark: MarkInOrder },
  { href: '/ClimateCartoons/WhatThisIs', label: 'Your work and your rights', line: 'What this room does and does not claim', Mark: MarkRoom },
  { href: '/ClimateLedger', label: 'Money and payment', line: 'The payment rules and the public ledger', Mark: MarkCounted },
  { href: '/ClimateCartoons/Francis', label: 'Francis’s own page', line: 'The artist and his work on the record', Mark: MarkOneHand },
  { href: '/ClimateCartoons/CAIB', label: 'Where this stands beside CAIB', line: 'Independent records, clearly credited', Mark: MarkTwoEdges },
  { href: '/ClimateMap', label: 'Where the drawings come from', line: 'The countries named by their senders', Mark: MarkWhere },
];

export default function CartoonRoomNavigation() {
  return <nav className="wall-setlist" aria-label="Use the wall and check its terms">
    <div className="wall-setlist-head"><h3 className="wall-setlist-title">Use it. Check it. Take it with you.</h3></div>
    <ul>{LINKS.map(({ href, label, line, Mark }) => <li key={href}>
      <Link to={href}><span className="wall-setlist-label">{label}<span className="wall-setlist-line">{line}</span></span><Mark /></Link>
    </li>)}</ul>
  </nav>;
}