import React from 'react';
import { RoomMarkSolution, RoomMarkCrisis, RoomMarkAction, RoomMarkGroups } from '@/components/climate/RoomMarks';
import recordKindOf from '@/components/climate/recordKinds';

// One set of room marks: browse above, add directly below on a phone.
const ROOMS = [
  // "Crises" was the word of a report about reports. What is in this room is emergencies —
  // the record's own word everywhere else on the page — so the door says that now.
  { key: 'climate_crisis', type: 'climate_crisis', label: 'Crises', line: 'What is at risk, and where.', Mark: RoomMarkCrisis },
  { key: 'solution', type: 'solution', label: 'Solutions', line: 'Methods and the evidence behind them.', Mark: RoomMarkSolution },
  { key: 'actions', type: 'action', label: 'Actions', line: 'Something you can join or do.', Mark: RoomMarkAction },
  { key: 'groups', type: 'group', label: 'Groups', line: 'People working on the same thing.', Mark: RoomMarkGroups },
];

// The "+ Add" that used to hang inside each room cell is gone. It was the only way to add
// anything on a phone, and it was a nine-pixel link inside a grid cell — Brian, 27 November:
// "when try to add one very clunky." There is one way in now, on every width: the plate of
// four drawn doors that stands on the page itself (RecordAddPlate), where a thumb can hit it.
export default function RecordRoomNavigation({ counts = {}, selected, onSelect }) {
  return (
    <nav aria-label="Explore or add to the record" className="record-room-nav grid w-full grid-cols-2 lg:grid-cols-4">
      {ROOMS.map(({ key, type, label, line, Mark }) => (
        <div key={key} data-record-kind={recordKindOf(type)} className="record-room-cell min-w-0">
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
        </div>
      ))}
    </nav>
  );
}