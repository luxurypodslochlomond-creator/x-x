import React from 'react';
import { Link } from 'react-router-dom';
import { useRecordCapacity } from '@/components/climate/useKeeper';

export default function KeeperDoor() {
  const { isKeeper, isChecker } = useRecordCapacity();
  return (
    <Link
      to="/ClimateKeeperRoom"
      aria-label="Review entries — sign-in for invited keepers and checkers"
      className="inline-flex min-h-11 items-center font-body text-xs text-record-muted transition-colors hover:text-record-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-red"
    >
      {isKeeper || isChecker ? 'Review entries' : 'Reviewer sign-in'}
    </Link>
  );
}