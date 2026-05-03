// Tracks free usage count in localStorage — 3 free uses then paywall
// On Stripe success: marks as paid so they get unlimited access for this session/device
import { useState, useEffect } from 'react';

const KEY = 'sorted_uses';
const PAID_KEY = 'sorted_paid';
const FREE_LIMIT = 5;

export function useSortedUsage() {
  const [uses, setUses] = useState(() => {
    try { return parseInt(localStorage.getItem(KEY) || '0', 10); } catch { return 0; }
  });

  const [isPaid, setIsPaid] = useState(() => {
    try { return localStorage.getItem(PAID_KEY) === 'true'; } catch { return false; }
  });

  // If returning from Stripe success, mark as paid and reset counter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('sorted') === 'success') {
      try {
        localStorage.setItem(PAID_KEY, 'true');
        localStorage.setItem(KEY, '0');
      } catch {}
      setIsPaid(true);
      setUses(0);
    }
  }, []);

  const isLocked = !isPaid && uses >= FREE_LIMIT;

  const recordUse = () => {
    if (isPaid) return; // paid users — never lock
    const next = uses + 1;
    setUses(next);
    try { localStorage.setItem(KEY, String(next)); } catch {}
  };

  const remaining = isPaid ? Infinity : Math.max(0, FREE_LIMIT - uses);

  return { uses, isPaid, isLocked, remaining, recordUse };
}