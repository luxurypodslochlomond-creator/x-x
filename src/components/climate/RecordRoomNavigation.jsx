import React from 'react';
import { RoomMarkSolution, RoomMarkCrisis, RoomMarkAction, RoomMarkGroups } from '@/components/climate/RoomMarks';

// The drawing accompanies a plain label; the words explain what each room holds.
const ROOMS = [
  { key: 'climate_crisis', label: 'Crises', line: 'What is at risk, and where.', Mark: RoomMarkCrisis },
  { key: 'solution', label: 'Solutions', line: 'Methods and the evidence behind them.', Mark: RoomMarkSolution },
  { key: 'actions', label: 'Actions', line: 'Something you can join or do.', Mark: RoomMarkAction },
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