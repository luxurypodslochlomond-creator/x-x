import React from 'react';
import { Link } from 'react-router-dom';
import { useRecordCapacity } from '@/components/climate/useKeeper';

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
export default function KeeperDoor() {
  const { isKeeper, isChecker } = useRecordCapacity();
  const hasKey = isKeeper || isChecker;
  return (
    <Link
      to="/ClimateKeeperRoom"
      aria-label={hasKey ? 'Open the keeper’s room — the record’s working room' : 'Sign in to the keeper’s room'}
      className={`inline-flex min-h-[40px] items-center gap-1.5 text-[13px] transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red ${
        hasKey ? 'text-record-red' : 'text-record-muted'
      }`}
    >
      <span
        aria-hidden="true"
        className="block h-[6px] w-[6px] shrink-0 bg-current opacity-60"
      />
      {hasKey ? 'The keeper’s room' : 'Keeper’s room — sign in'}
    </Link>
  );
}