import React from 'react';
import { RoomMarkSolution, RoomMarkCrisis, RoomMarkAction, RoomMarkGroups } from '@/components/climate/RoomMarks';

// One set of room marks: browse above, add directly below on a phone.
const ROOMS = [
  { key: 'climate_crisis', type: 'climate_crisis', label: 'Crises', line: 'What is at risk, and where.', Mark: RoomMarkCrisis },
  { key: 'solution', type: 'solution', label: 'Solutions', line: 'Methods and the evidence behind them.', Mark: RoomMarkSolution },
  { key: 'actions', type: 'action', label: 'Actions', line: 'Something you can join or do.', Mark: RoomMarkAction },
  { key: 'groups', type: 'group', label: 'Groups', line: 'People working on the same thing.', Mark: RoomMarkGroups },
];

export default function RecordRoomNavigation({ counts = {}, selected, onSelect, onAdd }) {
  return (
    <nav aria-label="Explore or add to the record" className="record-room-nav grid w-full grid-cols-2 lg:grid-cols-4">
      {ROOMS.map(({ key, type, label, line, Mark }) => (
        <div key={key} className="record-room-cell min-w-0">
          <button
            type="button"
            onClick={() => onSelect(key)}
            aria-pressed={selected === key}
            aria-controls="record-entries"
            aria-label={`Browse ${label.toLowerCase()}: ${line}`}
            data-room={key}
            className="record-room-link min-w-0"
          >
            <span className="record-room-drawing" aria-hidden="true"><Mark size={44} /></span>
            <span className="record-room-label">
              {label}<span className="record-room-count">{counts[key] ?? 0}</span>
            </span>
            <span className="record-description text-pretty">{line}</span>
          </button>
          {onAdd && (
            <button type="button" className="record-room-add sm:hidden" onClick={() => onAdd(type)} aria-label={`Add ${type === 'climate_crisis' ? 'a climate crisis' : `a ${type}`}`}>
              + Add
            </button>
          )}
        </div>
      ))}
    </nav>
  );
}