// Tracks free usage count in localStorage — 3 free uses then paywall
import { useState, useEffect } from 'react';

const KEY = 'sorted_uses';
const FREE_LIMIT = 3;

export function useSortedUsage() {
  const [uses, setUses] = useState(() => {
    try { return parseInt(localStorage.getItem(KEY) || '0', 10); } catch { return 0; }
  });

  const isLocked = uses >= FREE_LIMIT;

  const recordUse = () => {
    const next = uses + 1;
    setUses(next);
    try { localStorage.setItem(KEY, String(next)); } catch {}
  };

  const remaining = Math.max(0, FREE_LIMIT - uses);

  return { uses, isLocked, remaining, recordUse };
}