import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const MAX_CALLS = 3; // lifetime — no daily reset

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
        return Response.json({ allowed: true, remaining: MAX_CALLS, used: 0 });
      }
      const used = record.session_duration_seconds || 0;
      const remaining = Math.max(0, MAX_CALLS - used);
      return Response.json({
        allowed: used < MAX_CALLS,
        remaining,
        used,
      });
    }

    if (action === 'record') {
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
        console.log(`[RateLimit] NEW user ${fingerprint.slice(0, 25)} — used: 1/${MAX_CALLS}`);
        return Response.json({ allowed: true, remaining: MAX_CALLS - 1, used: 1 });
      }

      const used = record.session_duration_seconds || 0;

      if (used >= MAX_CALLS) {
        console.log(`[RateLimit] BLOCKED ${fingerprint.slice(0, 25)} — used: ${used}/${MAX_CALLS}`);
        return Response.json({
          allowed: false,
          remaining: 0,
          message: 'Free limit reached. Subscribe for unlimited access.'
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

      const remaining = Math.max(0, MAX_CALLS - newCount);
      console.log(`[RateLimit] ${fingerprint.slice(0, 25)} — used: ${newCount}/${MAX_CALLS}`);
      return Response.json({ allowed: true, remaining, used: newCount });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('[RateLimit] Error:', error.message);
    return Response.json({ allowed: true, remaining: 3, used: 0 });
  }
});