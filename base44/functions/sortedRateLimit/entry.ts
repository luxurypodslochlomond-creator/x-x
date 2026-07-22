import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const DAILY_LIMIT = 10; // resets every day — no lifetime lockout, the door's always open tomorrow

function isSameDay(dateStr) {
  if (!dateStr) return false;
  try {
    return new Date(dateStr).toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10);
  } catch { return false; }
}

function getClientFingerprint(req) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')
    || 'unknown';
  const ua = req.headers.get('user-agent') || '';
  return `rl::${ip}::${ua.slice(0, 30)}`;
}

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204 });
    }

    const body = await req.json().catch(() => ({}));
    const action = body.action || 'check';
    const fingerprint = getClientFingerprint(req);

    const base44 = createClientFromRequest(req);

    let records = [];
    try {
      records = await base44.asServiceRole.entities.PrivacyAnalytics.filter({
        event_type: 'feature_used',
        page_name: fingerprint
      });
    } catch { records = []; }

    const record = records[0] || null;

    if (action === 'check') {
      if (!record) {
        return Response.json({ allowed: true, remaining: DAILY_LIMIT, used: 0 });
      }
      // New day → count resets, no permanent lockout
      if (!isSameDay(record.updated_date)) {
        return Response.json({ allowed: true, remaining: DAILY_LIMIT, used: 0 });
      }
      const used = record.session_duration_seconds || 0;
      const remaining = Math.max(0, DAILY_LIMIT - used);
      return Response.json({
        allowed: used < DAILY_LIMIT,
        remaining,
        used,
      });
    }

    if (action === 'record') {
      // New day → reset counter to 1 (fresh start, no lifetime lockout)
      if (record && !isSameDay(record.updated_date)) {
        try {
          await base44.asServiceRole.entities.PrivacyAnalytics.update(record.id, {
            session_duration_seconds: 1
          });
        } catch (e) {
          console.error('[RateLimit] reset error:', e.message);
        }
        console.log(`[RateLimit] NEW DAY ${fingerprint.slice(0, 25)} — reset to 1/${DAILY_LIMIT}`);
        return Response.json({ allowed: true, remaining: DAILY_LIMIT - 1, used: 1 });
      }

      if (!record) {
        try {
          await base44.asServiceRole.entities.PrivacyAnalytics.create({
            event_type: 'feature_used',
            page_name: fingerprint,
            session_duration_seconds: 1,
            device_type: 'unknown',
          });
        } catch (e) {
          console.error('[RateLimit] create error:', e.message);
        }
        console.log(`[RateLimit] NEW user ${fingerprint.slice(0, 25)} — used: 1/${DAILY_LIMIT}`);
        return Response.json({ allowed: true, remaining: DAILY_LIMIT - 1, used: 1 });
      }

      const used = record.session_duration_seconds || 0;

      if (used >= DAILY_LIMIT) {
        console.log(`[RateLimit] DAILY LIMIT ${fingerprint.slice(0, 25)} — used: ${used}/${DAILY_LIMIT}`);
        return Response.json({
          allowed: false,
          remaining: 0,
          message: "That's today's free limit — come back tomorrow. No paywall, just a daily reset so everyone gets a turn."
        }, { status: 429 });
      }

      const newCount = used + 1;
      try {
        await base44.asServiceRole.entities.PrivacyAnalytics.update(record.id, {
          session_duration_seconds: newCount
        });
      } catch (e) {
        console.error('[RateLimit] update error:', e.message);
      }

      const remaining = Math.max(0, DAILY_LIMIT - newCount);
      console.log(`[RateLimit] ${fingerprint.slice(0, 25)} — used: ${newCount}/${DAILY_LIMIT}`);
      return Response.json({ allowed: true, remaining, used: newCount });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('[RateLimit] Error:', error.message);
    return Response.json({ allowed: true, remaining: DAILY_LIMIT, used: 0 });
  }
});