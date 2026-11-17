import React from 'react';
import { Link } from 'react-router-dom';
import { useRecordCapacity } from '@/components/climate/useKeeper';
import { MarkHost } from '@/components/climate/RecordFootMarks';

// The way in for the people who keep the record.
//
// It used to read "Reviewer sign-in" at eleven pixels in the last corner of the page,
// which is not a door — it is a footnote. A keeper who was sent an invitation went
// looking for a room and found a word. So it now says the room's name, in the record's
// own hand: "The keeper's room" for someone already holding a key, and "The keeper's room
// — sign in" for someone who has been told to come in and has not yet.
//
// It said "shed" for a while. That was the founder's word for the hut at the end of her
// garden, and it is warm in her mouth and meaningless on a stranger's screen — this record
// had already found that out once, when a rail mark called "Shed" was opened by nobody. A
// door names the room it opens, so the label is the room's own name.
//
// And it names the room the person holding the key is actually walking into. A checker
// holds a key too, and had no business signing in at a door named after somebody else's
// job. It is one room either way — the record checks its guest list on the server and
// gives each key its own powers once inside — but a door you were invited to should use
// your name for it, not the other person's.
export default function KeeperDoor() {
  const { isKeeper, isChecker } = useRecordCapacity();
  const hasKey = isKeeper || isChecker;
  const label = isKeeper ? 'The custodians’ room' : isChecker ? 'The signatories’ room' : 'Custodians’ room — sign in';
  const spoken = isKeeper
    ? 'Open the custodians’ room — where the record is decided'
    : isChecker
    ? 'Open the checker’s room — where a checker writes their notes'
    : 'Sign in to the custodians’ room';
  return (
    <Link
      to="/ClimateKeeperRoom"
      aria-label={spoken}
      className={`inline-flex min-h-[40px] items-center gap-1.5 text-[13px] transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red ${
        hasKey ? 'text-record-red' : 'text-record-muted'
      }`}
    >
      {/* The same key the sheet draws. It was a six-pixel square here — a full stop beside
          a room's name, at the foot of every page and on the guide's index, while every
          neighbouring door had an engraving. One door, one drawing, in all three places. */}
      <span aria-hidden="true" className="shrink-0">
        <MarkHost size={18} />
      </span>
      {label}
    </Link>
  );
}