import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Same fingerprint recipe the rate limiter uses, so a paid pass and the daily
// counter always describe the same device.
function getFingerprint(req) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')
    || 'unknown';
  const ua = req.headers.get('user-agent') || '';
  return `rl::${ip}::${ua.slice(0, 30)}`;
}

// Confirms a SORTED purchase with Stripe and, once confirmed, records the pass.
// The browser cannot mint a pass — the session id is only ever a claim, checked here.
export default async function(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const sessionId = typeof body.session_id === 'string' ? body.session_id.trim() : '';
    if (!sessionId) {
      return Response.json({ paid: false, error: 'session_id required' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);
    const fingerprint = getFingerprint(req);

    // Already issued against this receipt? Then this is the buyer coming back
    // on a device we have not stamped yet — stamp it, no second Stripe call.
    const existing = await base44.asServiceRole.entities.SortedPass.filter({ stripe_session_id: sessionId });
    if (existing.length > 0) {
      const pass = existing[0];
      if (pass.status !== 'active') {
        console.log('[SortedPass] inactive pass presented:', sessionId, pass.status);
        return Response.json({ paid: false, status: pass.status });
      }
      if (pass.fingerprint !== fingerprint) {
        await base44.asServiceRole.entities.SortedPass.update(pass.id, { fingerprint });
        console.log('[SortedPass] stamped an additional device for the same receipt');
      }
      return Response.json({ paid: true });
    }

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      console.error('[SortedPass] STRIPE_SECRET_KEY is not set');
      return Response.json({ paid: false, error: 'Payment check unavailable' }, { status: 500 });
    }

    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      {
        headers: {
          Authorization: `Bearer ${stripeKey}`,
          'Stripe-Version': '2025-10-29.clover',
        },
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!res.ok) {
      const detail = await res.json().catch(() => ({}));
      console.error('[SortedPass] Stripe lookup failed:', res.status, detail?.error?.message);
      return Response.json({ paid: false, error: 'Could not confirm payment' }, { status: 402 });
    }

    const session = await res.json();
    const product = session.metadata?.product || 'sorted_for_life';

    // Money must genuinely be in, and for a SORTED product.
    if (session.payment_status !== 'paid' || product !== 'sorted_for_life') {
      console.log('[SortedPass] not a paid SORTED session:', session.payment_status, product);
      return Response.json({ paid: false });
    }

    await base44.asServiceRole.entities.SortedPass.create({
      stripe_session_id: sessionId,
      email: session.customer_details?.email || session.customer_email || '',
      amount_paid: session.amount_total || 0,
      currency: session.currency || '',
      fingerprint,
      product,
      status: 'active',
    });

    console.log(`[SortedPass] redeemed ${session.amount_total} ${session.currency} — device unlocked`);
    return Response.json({ paid: true });

  } catch (error) {
    console.error('[SortedPass] Error:', error.message);
    return Response.json({ paid: false, error: error.message }, { status: 500 });
  }
}