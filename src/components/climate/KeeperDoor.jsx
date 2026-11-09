import React from 'react';
import { Link } from 'react-router-dom';
import { useRecordCapacity } from '@/components/climate/useKeeper';

// The way in for the people who keep the record.
//
// It used to read "Reviewer sign-in" at eleven pixels in the last corner of the page,
// which is not a door — it is a footnote. A keeper who was sent an invitation went
// looking for a room and found a word. So it now says the room's name, in the record's
// own hand: "The shed" for someone already holding a key, and "The keeper's shed —
// sign in" for someone who has been told to come in and has not yet.
export default function KeeperDoor() {
  const { isKeeper, isChecker } = useRecordCapacity();
  const hasKey = isKeeper || isChecker;
  return (
    <Link
      to="/ClimateKeeperRoom"
      aria-label={hasKey ? 'Open the shed — the record’s working room' : 'Sign in to the record’s keeper shed'}
      className={`inline-flex min-h-[40px] items-center gap-1.5 text-[13px] transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red ${
        hasKey ? 'text-record-red' : 'text-record-muted'
      }`}
    >
      <span
        aria-hidden="true"
        className="block h-[6px] w-[6px] shrink-0 bg-current opacity-60"
      />
      {hasKey ? 'The shed' : 'The keeper’s shed'}
    </Link>
  );
}