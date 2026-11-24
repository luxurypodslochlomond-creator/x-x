import React from 'react';
import { Download, Signature, Eraser } from 'lucide-react';
import '@/components/climate/cartoons/room-new.css';

// What is new in this room, said to the hand that made the drawing rather than to a reader.
const POINTS = [
  { Icon: Download, head: 'Take your drawing whole', line: 'One tap saves or shares the picture exactly as you sent it. No crop, no tint, no re-draw.' },
  { Icon: Signature, head: 'Your name travels with it', line: 'The credit line, where it came from and the record’s address go beside the picture.' },
  { Icon: Eraser, head: 'Off on your word', line: 'Ask and it comes off — no argument, no form — and the room notes that it was here.' },
];

export default function CartoonRoomNew() {
  return <section className="room-new" aria-labelledby="room-new-title">
    <h2 id="room-new-title" className="room-new-head">New in this room</h2>
    <ul className="room-new-points">
      {POINTS.map(({ Icon, head, line }) => <li key={head}>
        <span className="room-new-mark" aria-hidden="true"><Icon size={22} /></span>
        <span><strong>{head}</strong><small>{line}</small></span>
      </li>)}
    </ul>
  </section>;
}