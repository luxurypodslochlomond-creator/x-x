import React from 'react';
import '@/components/climate/cartoons/cartoon-room-jump.css';

// ── THE ROOM IS LONG, AND THERE WAS NO WAY ALONG IT ──────────────────────────
// Brian, 28 November: "it's difficult to get to the sections and the sequence isn't right for
// me, it's confusing me… can you take a good look at this."
//
// He was right, and the fault was structural rather than editorial. The room runs to eleven
// chapters, and its only contents — the set list, with its drawn marks and its twelve doors —
// stands at the very bottom, which is a contents page you can only reach by walking past
// everything it lists. So a reader who wanted the seventeen goals had to scroll through the
// drawings, the why, the laugh and half the argument to find the word "goals".
//
// This is the smallest thing that fixes it: one line, the room's chapters in the order they
// are set, and nothing else. It is not a contents page and it does not try to be — the set
// list at the foot still does that job properly, with the marks and the doors out. This is a
// hand on the shoulder at the door: here is what is in the room, and here is how to get to
// the part you came for.
const CHAPTERS = [
  { href: '#press-wall', label: 'The drawings' },
  { href: '#cartoon-why-title', label: 'Why a cartoon' },
  { href: '#cartoon-humour', label: 'The missing laugh' },
  { href: '#cartoon-goals', label: 'Seventeen goals' },
  { href: '#cartoon-your-turn', label: 'Send one' },
  { href: '#press-book', label: 'The three days' },
];

export default function CartoonRoomJump() {
  return (
    <nav className="cartoon-room-jump" aria-label="The chapters of this room">
      <span className="cartoon-room-jump-label">In this room</span>
      <ul>
        {CHAPTERS.map((chapter) => (
          <li key={chapter.href}>
            <a href={chapter.href}>{chapter.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}