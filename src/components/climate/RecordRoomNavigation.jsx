import React from 'react';
import { RoomMarkSolution, RoomMarkCrisis, RoomMarkAction, RoomMarkGroups } from '@/components/climate/RoomMarks';

// Four rooms beneath Jane's words, each drawn by one line behaving differently.
//
// The lines under each name carry the difference between the rooms, because it is the
// question Brian asked and it is the one a reader asks too: a solution is a method that
// works — usually with a source behind it — and an action is a thing you can turn up to or
// do yourself. One is the idea, the other is the join-in. Saying it here means nobody has
// to guess which door they want.
const ROOMS = [
  { key: 'climate_crisis', label: 'Crises', line: 'What is happening, and where.', Mark: RoomMarkCrisis },
  { key: 'solution', label: 'Solutions', line: 'What works — the method, and its source.', Mark: RoomMarkSolution },
  { key: 'actions', label: 'Actions', line: 'What you can join, or do yourself.', Mark: RoomMarkAction },
  { key: 'groups', label: 'Groups', line: 'People working on the same thing.', Mark: RoomMarkGroups },
];

export default function RecordRoomNavigation({ counts = {}, selected, onSelect }) {
  return (
    <nav aria-label="Explore the record" className="record-room-nav grid w-full grid-cols-2 lg:grid-cols-4">
      {ROOMS.map(({ key, label, line, Mark }) => (
        <button
          key={key}
          type="button"
          onClick={() => onSelect(key)}
          aria-pressed={selected === key}
          aria-controls="record-entries"
          data-room={key}
          className="record-room-link min-w-0"
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