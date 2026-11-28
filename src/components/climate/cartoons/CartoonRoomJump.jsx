import React from 'react';
import { HungWall, HandPencil } from '@/components/climate/cartoons/CartoonInkIcons';
import { MarkCounted, MarkBook } from '@/components/climate/cartoons/SetListMarks';
import '@/components/climate/cartoons/cartoon-room-jump.css';

const SECTIONS = [
  { id: 'drawings', href: '#press-wall', label: 'Drawings', Mark: HungWall },
  { id: 'goals', href: '#cartoon-goals', label: '17 goals', Mark: MarkCounted },
  { id: 'send', href: '#cartoon-your-turn', label: 'Send one', Mark: HandPencil },
  { id: 'about', href: '#wall-about', label: 'About the wall', Mark: MarkBook },
];

export default function CartoonRoomJump({ active, onNavigate }) {
  return <nav className="cartoon-room-jump" aria-label="Explore the wall">
    <ul>{SECTIONS.map(({ id, href, label, Mark }) => <li key={id}>
      <a href={href} aria-current={active === id ? 'location' : undefined} onClick={(event) => { event.preventDefault(); onNavigate(href); }}>
        <Mark size={24} aria-hidden="true" /><span>{label}</span>
      </a>
    </li>)}</ul>
  </nav>;
}