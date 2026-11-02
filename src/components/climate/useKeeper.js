import { useState, useEffect } from 'react';
import { currentUser } from '@/lib/currentUser';

// Is this reader a keeper? Asked once per page, from the one shared answer, and never allowed
// to break a page for a visitor who is not signed in.
export default function useKeeper() {
  const [isKeeper, setIsKeeper] = useState(false);

  useEffect(() => {
    let live = true;
    currentUser().then((u) => { if (live) setIsKeeper(u?.role === 'admin'); });
    return () => { live = false; };
  }, []);

  return isKeeper;
}