import React from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import useKeeper from '@/components/climate/useKeeper';

// ── THE KEEPER'S DOOR, IN THE FOOT OF THE RECORD ────────────────────────────────
// The desk already has a door in the record's bar, but that door only appears to someone the
// record already recognises. Which leaves the one person it was built for — a keeper on a new
// phone — with no way in at all, except the app's own sign-in page and then finding their way
// back to the desk afterwards.
//
// So there is one quiet word here, in the foot of every page, among the other quiet words.
// To a reader it is nothing: no glow, no invitation, no explanation. To a keeper it is the way
// back in.
//
// How it stays frictionless without asking for anything:
//   · already carrying a session → it is a link, and costs not one screen.
//   · anyone else → one tap on the account they already have, and it returns them to the desk
//     itself rather than the front of the app.
// Their address is never typed here, never sent a code, never repeated back to them. It is the
// identity behind the tap, not a field on a form.
const DESK = 'AdminClimateDesk';

const WORD_CLASS =
  'text-[10px] font-mono font-black uppercase text-[#6b6258] hover:text-[#b3261e] transition-colors';

export default function KeeperDoor() {
  const keeper = useKeeper();

  // A keeper who is already in: the door is simply a door.
  if (keeper) {
    return (
      <Link to={createPageUrl(DESK)} className={WORD_CLASS}>
        Keepers
      </Link>
    );
  }

  // Everyone else: one tap, straight to the account they already hold, back to the desk.
  return (
    <button
      type="button"
      onClick={() => base44.auth.loginWithProvider('google', createPageUrl(DESK))}
      aria-label="Keepers — sign in to the record's desk"
      className={WORD_CLASS}
    >
      Keepers
    </button>
  );
}