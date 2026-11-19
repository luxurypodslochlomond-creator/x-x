import React from 'react';
import { Link } from 'react-router-dom';
import { RoomMarkSolution, RoomMarkCrisis, RoomMarkAction, RoomMarkGroups } from '@/components/climate/RoomMarks';
import { MarkSignal, MarkWall } from '@/components/climate/RecordFootMarks';

const ROOMS = [
  { key: 'solution', label: 'Solutions', line: 'What works, and how.', Mark: RoomMarkSolution },
  { key: 'climate_crisis', label: 'Crises', line: 'What is happening, and where.', Mark: RoomMarkCrisis },
  { key: 'actions', label: 'Actions', line: 'Things to do and join.', Mark: RoomMarkAction },
  { key: 'groups', label: 'Groups', line: 'People working together.', Mark: RoomMarkGroups },
  { key: 'signals', label: 'Signals', line: 'Dated updates, with their sources.', Mark: MarkSignal, to: '/ClimateWire' },
  { key: 'wall', label: 'The Wall', line: 'Cartoons and drawings.', Mark: MarkWall, to: '/ClimateCartoons' },
];

export default function RecordRoomNavigation({ counts = {}, selected, onSelect }) {
  return (
    <nav aria-label="Explore the record" className="record-room-nav mt-6 grid grid-cols-2 border-t border-record-ink/25 lg:grid-cols-6">
      {ROOMS.map(({ key, label, line, Mark, to }) => {
        const Door = to ? Link : 'button';
        return (
          <Door
            key={key}
            {...(to ? { to } : { type: 'button', onClick: () => onSelect(key), 'aria-pressed': selected === key, 'aria-controls': 'record-entries' })}
            data-room={key}
            className="record-room-link min-w-0 px-3 py-4 text-record-ink lg:py-5"
          >
            <span className="record-room-drawing" aria-hidden="true"><Mark size={32} /></span>
            <span className="record-room-label">
              {label}
              {!to && <span className="record-room-count">{counts[key] ?? 0}</span>}
            </span>
            <span className="record-description text-pretty">{line}</span>
          </Door>
        );
      })}
    </nav>
  );
}