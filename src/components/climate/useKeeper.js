import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

// Is this reader a keeper of the record? Asked once per session from one shared answer, so
// the record's own bar can offer them the door without asking the server on every page.
//
// It is answered by the record, not by the app: a line on the record's own guest list with the
// keeper flag set is enough. That person does not need to be an administrator of this app, and
// should not be pushed to become one — the record's keys are not the building's keys.
let answer = null;

function ask() {
  if (!answer) {
    answer = base44.functions
      .invoke('climateKeeperRoom', { action: 'whoami' })
      .then((res) => Boolean(res?.data?.isKeeper))
      .catch(() => false);
  }
  return answer;
}

export default function useKeeper() {
  const [isKeeper, setIsKeeper] = useState(false);

  useEffect(() => {
    let live = true;
    ask().then((yes) => { if (live) setIsKeeper(yes); });
    return () => { live = false; };
  }, []);

  return isKeeper;
}