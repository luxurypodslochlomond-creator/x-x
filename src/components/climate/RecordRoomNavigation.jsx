import React from 'react';
import { RoomMarkSolution, RoomMarkCrisis, RoomMarkAction, RoomMarkGroups } from '@/components/climate/RoomMarks';

// ── THE FOUR ROOMS, DIRECTLY UNDER THE TOP NAVIGATION ──────────────────────────
// Brian, 19 November: "they are so important for this and should sit underneath the top
// navigation… the most important." So this is the first thing on the front page, not the
// fifth: the record says what it is made of before it shows you the painting.
//
// Signals, The Wall and x = x came off it. All three already stand in the top navigation,
// and having them here as well made the record say the same three words twice before a
// reader had met a single entry. The four that remain are the four the entries are sorted
// into, and each one is the same weight as the others.
const ROOMS = [
  { key: 'solution', label: 'Solutions', line: 'What works, and how.', Mark: RoomMarkSolution },
  { key: 'climate_crisis', label: 'Crises', line: 'What is happening, and where.', Mark: RoomMarkCrisis },
  { key: 'actions', label: 'Actions', line: 'Things to do and join.', Mark: RoomMarkAction },
  { key: 'groups', label: 'Groups', line: 'People working together.', Mark: RoomMarkGroups },
];

export default function RecordRoomNavigation({ counts = {}, selected, onSelect }) {
  return (
    <nav aria-label="Explore the record" className="record-room-nav grid grid-cols-2 border-y border-record-ink/25 bg-record-paper lg:grid-cols-4">
      {ROOMS.map(({ key, label, line, Mark }) => (
        <button
          key={key}
          type="button"
          onClick={() => onSelect(key)}
          aria-pressed={selected === key}
          aria-controls="record-entries"
          data-room={key}
          className="record-room-link min-w-0 px-3 py-5 text-record-ink lg:px-4 lg:py-6"
        >
          <span className="record-room-drawing" aria-hidden="true"><Mark size={44} /></span>
          <span className="record-room-label">
            {label}
            <span className="record-room-count">{counts[key] ?? 0}</span>
          </span>
          <span className="record-description text-pretty">{line}</span>
        </button>
      ))}
    </nav>
  );
}