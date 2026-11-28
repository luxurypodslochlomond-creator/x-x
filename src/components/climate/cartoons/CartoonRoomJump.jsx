import React from 'react';
import WallChapterMark from '@/components/climate/cartoons/WallChapterMark';
import '@/components/climate/cartoons/cartoon-room-jump.css';

const SECTIONS = [
  { id: 'drawings', href: '#press-wall', label: 'The drawings' },
  // What a cartoonist is paid is a chapter of the room, not a footnote under the pictures.
  { id: 'money', href: '#wall-money', label: 'Pay an artist' },
  { id: 'send', href: '#cartoon-your-turn', label: 'Send a drawing' },
  { id: 'goals', href: '#cartoon-goals', label: '17 UN goals' },
  { id: 'about', href: '#wall-about', label: 'People & sources' },
];

export default function CartoonRoomJump({ active, onNavigate }) {
  return <nav className="cartoon-room-jump" aria-label="Explore the wall">
    <ul>{SECTIONS.map(({ id, href, label }) => <li key={id}>
      <a href={href} aria-current={active === id ? 'location' : undefined} onClick={(event) => { event.preventDefault(); onNavigate(href); }}>
        <WallChapterMark kind={id} /><span>{label}</span>
      </a>
    </li>)}</ul>
  </nav>;
}