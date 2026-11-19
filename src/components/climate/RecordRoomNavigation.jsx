import React from 'react';
import { RoomMarkSolution, RoomMarkCrisis, RoomMarkAction, RoomMarkGroups } from '@/components/climate/RoomMarks';

// ── WHAT THE FOUR ROOMS ARE FOR, SAID IN THE RECORD'S OWN VOICE ───────────────
// These four lines were labels: "What works, and how it works." — true, and flat as a
// form field, which is exactly the texture Brian meant by old web 2. A line under a
// mark is not a caption; it is the record saying what it keeps, and it should sound
// like somebody who has actually read the entries.
//
// So each line now says the thing plainly and warmly, and none of them overclaims:
// the record does not promise these are the answer, only that they are what it holds
// and why a reader might want them.
const ROOMS = [
  {
    key: 'solution',
    label: 'Solutions',
    line: 'Something that worked somewhere, kept here so it can work again.',
    Mark: RoomMarkSolution,
  },
  {
    key: 'climate_crisis',
    label: 'Crises',
    line: 'What is happening now, and where — with the source it came from.',
    Mark: RoomMarkCrisis,
  },
  {
    key: 'actions',
    label: 'Actions',
    line: 'Something you can join this week, on the ground or from your kitchen.',
    Mark: RoomMarkAction,
  },
  {
    key: 'groups',
    label: 'Groups',
    line: 'People working on the same thing, meeting through one line they chose.',
    Mark: RoomMarkGroups,
  },
];

export default function RecordRoomNavigation({ counts = {}, selected, onSelect }) {
  return (
    <nav
      aria-label="The four rooms of the record"
      className="record-room-nav mt-6 grid grid-cols-2 border-t border-record-ink/25 lg:grid-cols-4"
    >
      {ROOMS.map(({ key, label, line, Mark }) => (
        <button
          key={key}
          type="button"
          onClick={() => onSelect(key)}
          aria-pressed={selected === key}
          aria-controls="record-entries"
          data-room={key}
          className="record-room-link min-w-0 border-b-2 border-transparent px-3 py-4 text-left text-record-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-record-paper lg:px-4 lg:py-5"
        >
          <span className="flex items-start justify-between gap-2">
            <Mark size={26} className="h-[26px] w-[26px] shrink-0 text-record-ink lg:h-8 lg:w-8" />
            <span className="text-[12px] font-mono tabular-nums text-record-muted">{counts[key] ?? 0}</span>
          </span>
          <span className="mt-3 block font-heading text-[19px] leading-[1.1] tracking-[-0.01em] lg:text-[23px]">
            {label}
          </span>
          <span className="record-description mt-1.5 block text-pretty">{line}</span>
        </button>
      ))}
    </nav>
  );
}