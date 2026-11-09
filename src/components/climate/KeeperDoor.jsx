import React from 'react';
import { Link } from 'react-router-dom';

// One working entrance for keepers and checkers. The room itself explains the
// invitation and uses the platform sign-in; its server checks the roster.
export default function KeeperDoor() {
  return (
    <Link
      to="/ClimateKeeperRoom"
      aria-label="Sign in to the shed — invited keepers and checkers"
      className="inline-flex min-h-11 items-center font-body text-[11.5px] text-record-muted transition-colors hover:text-record-red"
    >
      Keeper sign-in
    </Link>
  );
}