import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

// Is this reader a keeper? Asked once per session, then remembered.
//
// The record's chrome is public and read by everyone, so this must never break a page for a
// visitor who is not signed in, and must never cost a request on every page they open. One
// answer, held for the session, is enough: a keeper who signs in is handed a fresh page anyway.
let cached = null;

export default function useKeeper() {
  const [isKeeper, setIsKeeper] = useState(false);

  useEffect(() => {
    let live = true;
    if (!cached) {
      cached = base44.auth
        .me()
        .then((u) => u?.role === 'admin')
        .catch(() => false);
    }
    cached.then((v) => { if (live) setIsKeeper(v); });
    return () => { live = false; };
  }, []);

  return isKeeper;
}