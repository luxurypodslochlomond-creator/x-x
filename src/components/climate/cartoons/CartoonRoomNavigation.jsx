import React from 'react';
import { Link } from 'react-router-dom';
import { HungWall, HandPencil, BookRibbon } from '@/components/climate/cartoons/CartoonInkIcons';
import '@/components/climate/cartoons/wall-navigation.css';

const DOORS = [
  { href: '#press-wall', label: 'Drawings', Mark: HungWall },
  { href: '#cartoon-your-turn', label: 'Take part', Mark: HandPencil },
  { href: '#press-book', label: 'The book', Mark: BookRibbon },
];

export default function CartoonRoomNavigation() {
  return (
    <div className="wall-wayfinding">
      <nav className="wall-room-nav" aria-label="The Wall: drawings, taking part and the book">
        {DOORS.map(({ href, label, Mark }) => (
          <a href={href} key={href}>
            <Mark size={32} />
            <span>{label}</span>
          </a>
        ))}
      </nav>
      <details className="wall-reading">
        <summary>About this wall</summary>
        <nav aria-label="More about the Wall">
          <Link to="/ClimateCartoons/WhatThisIs">What this is · your work and rights</Link>
          <Link to="/ClimateCartoons/BaseOne">Drawn by the machine · four wordless marks</Link>
          <a href="#cartoon-why-title">Why cartoons</a>
          <a href="#press-world">Cartoonists around the world</a>
          <a href="#cartoon-goals">The seventeen goals</a>
        </nav>
      </details>
    </div>
  );
}