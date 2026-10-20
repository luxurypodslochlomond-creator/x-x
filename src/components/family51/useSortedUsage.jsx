// SORTED access is decided by the SERVER, never by the browser.
// A daily free allowance keeps the door open for everyone; a Stripe payment
// that the backend has confirmed unlocks it properly. Nothing stored locally
// can grant access on its own — it can only prove which receipt is ours.
import { useState, useEffect, useCallback } from 'react';
import { sortedRateLimit } from '@/functions/sortedRateLimit';
import { verifySortedPass } from '@/functions/verifySortedPass';

const PASS_KEY = 'sorted_pass_session'; // the Stripe receipt id, kept for this device

export function useSortedUsage() {
  const [uses, setUses] = useState(0);
  const [remaining, setRemaining] = useState(10); // optimistic until server responds
  const [isLocked, setIsLocked] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const applyStatus = (data) => {
      setUses(data.used || 0);
      setIsPaid(!!data.paid);
      setRemaining(data.paid ? Infinity : (data.remaining ?? 10));
      setIsLocked(!data.allowed && !data.paid);
    };

    const check = async () => {
      const res = await sortedRateLimit({ action: 'check' });
      return res?.data ?? res;
    };

    const storedSession = () => {
      try { return localStorage.getItem(PASS_KEY); } catch { return null; }
    };

    const run = async () => {
      let status = null;
      try {
        const fromStripe = new URLSearchParams(window.location.search).get('session_id');
        const sessionId = fromStripe || storedSession();

        status = await check();

        // Not unlocked on this device, but we hold a receipt — confirm it once
        // with Stripe, then ask the server again.
        if (!status?.paid && sessionId) {
          const res = await verifySortedPass({ session_id: sessionId });
          const verified = res?.data ?? res;
          if (verified?.paid) {
            try { localStorage.setItem(PASS_KEY, sessionId); } catch {}
            status = await check();
          } else if (fromStripe) {
            try { localStorage.removeItem(PASS_KEY); } catch {}
          }
        }
      } catch (err) {
        // A network wobble must never lock someone out of help.
        console.error('[SORTED] status check failed:', err?.message);
      } finally {
        if (!cancelled) {
          applyStatus(status || { allowed: true, remaining: 10, used: 0 });
          setLoaded(true);
        }
      }
    };

    run();
    return () => { cancelled = true; };
  }, []);

  // Called each time the user runs a tool
  const recordUse = useCallback(async () => {
    if (isPaid) return { allowed: true };

    try {
      const res = await sortedRateLimit({ action: 'record' });
      const data = res?.data ?? res;
      setUses(data.used || 0);
      setIsPaid(!!data.paid);
      setRemaining(data.paid ? Infinity : (data.remaining ?? 0));
      setIsLocked(!data.allowed && !data.paid);
      return { allowed: data.allowed || !!data.paid };
    } catch {
      // On error — allow through, never block a real person
      return { allowed: true };
    }
  }, [isPaid]);

  const grantHardshipAccess = useCallback(() => {
    // Hardship: reset local counter hint, but server still tracks
    try { localStorage.setItem('sorted_hardship_used', 'true'); } catch {}
  }, []);

  const hasUsedHardship = (() => {
    try { return localStorage.getItem('sorted_hardship_used') === 'true'; } catch { return false; }
  })();

  // Paywall trigger — scrolls to the Sorted For Life card so locked users
  // find out BEFORE they type a whole letter, not after they hit Decode.
  const onPaywall = useCallback(() => {
    try {
      document.getElementById('sorted-paywall')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch {}
  }, []);

  return { uses, isPaid, isLocked, remaining, recordUse, grantHardshipAccess, hasUsedHardship, loaded, onPaywall };
}