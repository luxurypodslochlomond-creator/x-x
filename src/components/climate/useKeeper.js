import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

// What may this reader do on the record? Asked once per session from one shared answer, so
// the record's own bar can offer the door without asking the server on every page.
//
// It is answered by the record, not by the app: a line on the record's own guest list is
// enough, and a keeper's line is also a checker's line — one person, two capacities. Nobody
// with either capacity needs to be an administrator of this app, and should not be pushed to
// become one: the record's keys are not the building's keys.
let answer = null;

function ask() {
  if (!answer) {
    answer = base44.functions
      .invoke('climateKeeperRoom', { action: 'whoami' })
      .then((res) => ({
        isKeeper: Boolean(res?.data?.isKeeper),
        isChecker: Boolean(res?.data?.isChecker),
      }))
      .catch(() => ({ isKeeper: false, isChecker: false }));
  }
  return answer;
}

// Either capacity opens the workroom, so this is what the bar asks.
export function useRecordCapacity() {
  const [capacity, setCapacity] = useState({ isKeeper: false, isChecker: false });

  useEffect(() => {
    let live = true;
    ask().then((yes) => { if (live) setCapacity(yes); });
    return () => { live = false; };
  }, []);

  return capacity;
}

export default function useKeeper() {
  const { isKeeper } = useRecordCapacity();
  return isKeeper;
}