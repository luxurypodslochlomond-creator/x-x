import React from 'react';
import { RoomMarkSolution, RoomMarkCrisis, RoomMarkAction, RoomMarkGroups } from '@/components/climate/RoomMarks';

// Four rooms beneath Jane's quote, in the reader's requested order.
const ROOMS = [
  { key: 'climate_crisis', label: 'Crises', line: 'What is happening, and where.', Mark: RoomMarkCrisis },
  { key: 'solution', label: 'Solutions', line: 'What works, and how.', Mark: RoomMarkSolution },
  { key: 'actions', label: 'Actions', line: 'Things to do and join.', Mark: RoomMarkAction },
  { key: 'groups', label: 'Groups', line: 'People working together.', Mark: RoomMarkGroups },
];

export default function RecordRoomNavigation({ counts = {}, selected, onSelect }) {
  return (
    <nav aria-label="Explore the record" className="record-room-nav mx-auto grid w-full max-w-[820px] grid-cols-2 border-b border-record-ink/25 bg-record-paper lg:grid-cols-4">
      {ROOMS.map(({ key, label, line, Mark }) => (
        <button
          key={key}
          type="button"
          onClick={() => onSelect(key)}
          aria-pressed={selected === key}
          aria-controls="record-entries"
          data-room={key}
          className="record-room-link min-w-0 px-3 py-5 text-record-ink lg:px-4"
        >
          <span className="record-room-drawing" aria-hidden="true"><Mark size={36} /></span>
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