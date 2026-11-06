import React from 'react';
import { Link } from 'react-router-dom';

// One working entrance for keepers and checkers. The room itself explains the
// invitation and uses the platform sign-in; its server checks the roster.
export default function KeeperDoor() {
  return (
    <Link
      to="/ClimateKeeperRoom"
      aria-label="Workroom — invited keepers and checkers"
      className="text-[10px] font-mono font-black uppercase text-record-muted hover:text-record-red transition-colors"
    >
      Workroom
    </Link>
  );
}