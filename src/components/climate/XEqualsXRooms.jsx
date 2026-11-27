import React from 'react';
import { Link } from 'react-router-dom';
import { RoomMarkCrisis, RoomMarkSolution, RoomMarkAction } from '@/components/climate/RoomMarks';

// ── THE THREE ROOMS, AS THE RECORD PRINTS ITS OWN ──────────────────────────────
// On the record's front page the four rooms sit in one solid yellow band with the drawings
// in ink and a hairline between each tap. It is the loudest thing on the page and the one
// thing a reader can use immediately. The three rooms here wear the same band, the same
// hand-drawn cuts and the same hairlines, so a reader who has been on the record recognises
// this as the same book rather than a page about it.
const ROOMS = [
  { name: 'Crises', detail: 'The harm. The place. The source.', to: '/TogetherChangeClimate#record-room-climate_crisis', Mark: RoomMarkCrisis },
  { name: 'Solutions', detail: 'The response. The evidence. The limits.', to: '/TogetherChangeClimate#record-room-solution', Mark: RoomMarkSolution },
  { name: 'Actions', detail: 'The work. The organiser. A way in.', to: '/TogetherChangeClimate#record-room-actions', Mark: RoomMarkAction },
];

export default function XEqualsXRooms() {
  return (
    <nav className="covenant-rooms" aria-label="Open the climate record by room">
      <div className="covenant-rooms-inner">
        {ROOMS.map(({ name, detail, to, Mark }) => (
          <Link to={to} key={name} className="covenant-room">
            <Mark size={40} className="covenant-room-mark" />
            <strong>{name}</strong>
            <span>{detail}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}