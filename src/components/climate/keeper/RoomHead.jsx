import React from 'react';
import { MarkStamp, MarkEye, MarkGate, MarkLedger, MarkRoot } from './KeeperMarks';

// ── THE MARK INSIDE THE ROOM ────────────────────────────────────────────────────
// The drawn marks were taken off the row of doors because five pictures in a line turn
// into a puzzle: nobody can tell a ledger from a stamp at twenty pixels, and a door you
// have to decode is slower than a word. So the row says the room in words, and the mark
// comes back here — once, at the head of the room you are actually standing in, where
// there is room for it to be drawn properly and only one thing to look at.
//
// One red mark on the page, as everywhere on this record: the drawing is the red, the
// sentence beside it is ink. That is the whole colour scheme of a room, and it is enough.
const ROOM = {
  decide: {
    Mark: MarkStamp,
    line: 'One entry comes up at a time. You say the yes, or you hold it — and either is written down in your name.',
  },
  check: {
    Mark: MarkEye,
    line: 'Open a source and say what you found. Nothing on this page decides anything.',
  },
  people: {
    Mark: MarkGate,
    line: 'Who holds a key to this record, and who is asking for one.',
  },
  counts: {
    Mark: MarkLedger,
    line: 'What the record holds, counted fresh, so no figure here is carried over from memory.',
  },
  sourcing: {
    Mark: MarkRoot,
    line: 'What a claim rests on, and what that rests on — followed back until it stops.',
  },
};

export default function RoomHead({ tab }) {
  const room = ROOM[tab];
  if (!room) return null;
  const { Mark, line } = room;

  return (
    <div className="mt-5 flex items-start gap-3 border-t border-[#141210]/12 pt-4">
      <span className="mt-0.5 shrink-0 text-[#b3261e]">
        <Mark size={34} />
      </span>
      <p
        className="text-[12.5px] leading-[1.5] text-[#3a342c]"
        style={{ fontFamily: 'var(--font-reading)', textWrap: 'pretty' }}
      >
        {line}
      </p>
    </div>
  );
}