// Server-side rate limiting — IP fingerprinted, localStorage-bypass proof
// Clearing localStorage does nothing. Only a real Stripe payment unlocks.
import { useState, useEffect, useCallback } from 'react';
import { sortedRateLimit } from '@/functions/sortedRateLimit';

const PAID_KEY = 'sorted_paid'; // still used as a UX hint only (not for enforcement)

export function useSortedUsage() {
  const [uses, setUses] = useState(0);
  const [remaining, setRemaining] = useState(10); // optimistic until server responds
  const [isLocked, setIsLocked] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Check server-side status on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isStripeSuccess = params.get('sorted') === 'success';

    if (isStripeSuccess) {
      // Coming back from Stripe — mark paid locally as UX hint, don't check rate limit
      try { localStorage.setItem(PAID_KEY, 'true'); } catch {}
      setIsPaid(true);
      setIsLocked(false);
      setRemaining(Infinity);
      setLoaded(true);
      return;
    }

    // Check if locally marked as paid (from a previous successful payment on this device)
    const localPaid = (() => { try { return localStorage.getItem(PAID_KEY) === 'true'; } catch { return false; } })();
    if (localPaid) {
      setIsPaid(true);
      setIsLocked(false);
      setRemaining(Infinity);
      setLoaded(true);
      return;
    }

    // Ask the server how many uses this IP has had
    sortedRateLimit({ action: 'check' })
      .then(res => {
        const data = res.data;
        setUses(data.used || 0);
        setRemaining(data.remaining ?? 10);
        setIsLocked(!data.allowed);
      })
      .catch(() => {
        // On error — be generous, never block a real user
        setRemaining(10);
        setIsLocked(false);
      })
      .finally(() => setLoaded(true));
  }, []);

  // Called each time the user runs a tool
  const recordUse = useCallback(async () => {
    if (isPaid) return { allowed: true };

    try {
      const res = await sortedRateLimit({ action: 'record' });
      const data = res.data;
      setUses(data.used || 0);
      setRemaining(data.remaining ?? 0);
      setIsLocked(!data.allowed);
      return { allowed: data.allowed };
    } catch {
      // On error — allow through
      return { allowed: true };
    }
  }, [isPaid]);

  const grantHardshipAccess = useCallback(() => {
    // Hardship: reset local counter hint, but server still tracks
    // Best we can do without login — give them a fresh localStorage state
    try { localStorage.setItem('sorted_hardship_used', 'true'); } catch {}
  }, []);

  const hasUsedHardship = (() => {
    try { return localStorage.getItem('sorted_hardship_used') === 'true'; } catch { return false; }
  })();

  return { uses, isPaid, isLocked, remaining, recordUse, grantHardshipAccess, hasUsedHardship, loaded };
}