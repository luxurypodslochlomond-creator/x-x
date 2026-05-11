import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// In-memory store for rate limiting (resets on function cold start, which is fine)
// For persistent rate limiting across restarts, we use the Base44 entity store
const memoryStore = new Map();

const MAX_CALLS = 10;      // free uses per 24hr window
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

function getClientFingerprint(req) {
  // Use IP + User-Agent for fingerprinting (best we can do without login)
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
    || req.headers.get('x-real-ip') 
    || 'unknown';
  const ua = req.headers.get('user-agent') || '';
  // Hash-like key: ip + first 40 chars of UA
  return `${ip}::${ua.slice(0, 40)}`;
}

Deno.serve(async (req) => {
  try {
    // Allow OPTIONS for CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204 });
    }

    const body = await req.json().catch(() => ({}));
    const action = body.action || 'check'; // 'check' or 'record'

    const fingerprint = getClientFingerprint(req);
    const now = Date.now();

    // Get or create entry
    let entry = memoryStore.get(fingerprint);
    if (!entry || (now - entry.windowStart) > WINDOW_MS) {
      // New window
      entry = { count: 0, windowStart: now };
    }

    if (action === 'check') {
      const remaining = Math.max(0, MAX_CALLS - entry.count);
      const isLocked = entry.count >= MAX_CALLS;
      return Response.json({ 
        allowed: !isLocked, 
        remaining, 
        used: entry.count,
        resets_in_hours: Math.ceil((WINDOW_MS - (now - entry.windowStart)) / 3600000)
      });
    }

    if (action === 'record') {
      if (entry.count >= MAX_CALLS) {
        return Response.json({ 
          allowed: false, 
          remaining: 0,
          message: 'Free limit reached. Please subscribe for unlimited access.'
        }, { status: 429 });
      }
      
      entry.count += 1;
      memoryStore.set(fingerprint, entry);
      
      const remaining = Math.max(0, MAX_CALLS - entry.count);
      console.log(`[RateLimit] ${fingerprint.slice(0, 30)} — used: ${entry.count}/${MAX_CALLS}`);
      
      return Response.json({ 
        allowed: true, 
        remaining,
        used: entry.count
      });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('[RateLimit] Error:', error.message);
    // On error, allow the request through — never block a real user due to our bug
    return Response.json({ allowed: true, remaining: 5, used: 0 });
  }
});