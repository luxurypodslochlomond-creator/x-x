// Server-side rate limit hook for SORTED
// Checks IP-based limit BEFORE each AI call — not bypassable via localStorage clear
import { sortedRateLimit } from '@/functions/sortedRateLimit';

export async function checkSortedRateLimit() {
  try {
    const res = await sortedRateLimit({ action: 'check' });
    return res.data || { allowed: true, remaining: 5 };
  } catch {
    // On network error — allow through, don't block real users
    return { allowed: true, remaining: 5 };
  }
}

export async function recordSortedUse() {
  try {
    const res = await sortedRateLimit({ action: 'record' });
    return res.data || { allowed: true, remaining: 4 };
  } catch {
    return { allowed: true, remaining: 4 };
  }
}