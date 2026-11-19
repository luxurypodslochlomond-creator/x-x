import React from 'react';
import { RoomMarkSolution, RoomMarkCrisis, RoomMarkAction, RoomMarkGroups } from '@/components/climate/RoomMarks';

const ROOMS = [
  { key: 'solution', label: 'Solutions', line: 'What works, and how it works.', Mark: RoomMarkSolution },
  { key: 'climate_crisis', label: 'Crises', line: 'What’s at risk, and where.', Mark: RoomMarkCrisis },
  { key: 'actions', label: 'Actions', line: 'Something to join. Something to do.', Mark: RoomMarkAction },
  { key: 'groups', label: 'Groups', line: 'Find people working on the same thing.', Mark: RoomMarkGroups },
];

export default function RecordRoomNavigation({ counts = {}, selected, onSelect }) {
  return (
    <nav aria-label="Browse the climate record" className="mt-5 grid grid-cols-2 border-t border-record-ink/25 lg:grid-cols-4">
      {ROOMS.map(({ key, label, line, Mark }) => (
        <button
          key={key}
          type="button"
          onClick={() => onSelect(key)}
          aria-pressed={selected === key}
          aria-controls="record-entries"
          data-room={key}
          className="record-room-link min-w-0 border-b-2 border-transparent px-3 py-4 text-left text-record-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark"
        >
          <span className="flex items-center gap-2">
            <Mark size={26} className="h-[26px] w-[26px] shrink-0 text-record-ink lg:h-8 lg:w-8" />
            <span className="text-lg font-bold leading-tight lg:text-[22px]">{label}</span>
            <span className="ml-auto text-sm tabular-nums text-record-muted">{counts[key] ?? 0}</span>
          </span>
          <span className="record-description mt-2 block text-pretty">{line}</span>
        </button>
      ))}
    </nav>
  );
}