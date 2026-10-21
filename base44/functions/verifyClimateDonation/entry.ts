import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

// Confirms a gift to the climate record with Stripe and, once the money is
// genuinely in, writes it down. The browser cannot mint a record — the session
// id is only ever a claim, checked here against Stripe itself.

export default async function (req) {
  try {
    const body = await req.json().catch(() => ({}));
    const sessionId = typeof body.session_id === 'string' ? body.session_id.trim() : '';
    if (!sessionId) {
      return Response.json({ recorded: false, error: 'session_id required' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    // Already written down? Then this is the giver coming back, or a reload.
    const existing = await base44.asServiceRole.entities.ClimateSupport.filter({ stripe_session_id: sessionId });
    if (existing.length > 0) {
      const gift = existing[0];
      return Response.json({
        recorded: true,
        already: true,
        visibility: gift.visibility,
        display_name: gift.display_name || '',
      });
    }

    // Confirmed against the same climate account the gift was taken into — never
    // another product's. If that account is not in place, no gift can exist.
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY_CLIMATE');
    if (!stripeKey) {
      console.error('[ClimateSupport] STRIPE_SECRET_KEY_CLIMATE is not set');
      return Response.json({ recorded: false, error: 'Could not confirm the gift' }, { status: 500 });
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
      console.error('[ClimateSupport] Stripe lookup failed:', res.status, detail?.error?.message);
      return Response.json({ recorded: false, error: 'Could not confirm the gift' }, { status: 402 });
    }

    const session = await res.json();
    const meta = session.metadata || {};

    if (meta.type !== 'climate_support' || session.payment_status !== 'paid') {
      console.log('[ClimateSupport] not a paid gift:', meta.type, session.payment_status);
      return Response.json({ recorded: false });
    }

    const visibility = ['anonymous', 'public', 'private'].includes(meta.visibility)
      ? meta.visibility
      : 'anonymous';

    await base44.asServiceRole.entities.ClimateSupport.create({
      stripe_session_id: sessionId,
      display_name: visibility === 'anonymous' ? '' : (meta.display_name || ''),
      visibility,
      frequency: meta.frequency === 'monthly' ? 'monthly' : 'one_time',
      amount_paid: session.amount_total || 0,
      currency: session.currency || 'gbp',
      email: session.customer_details?.email || session.customer_email || '',
      status: 'paid',
      product: 'climate_record',
    });

    console.log(`[ClimateSupport] recorded a ${visibility} gift of ${session.amount_total} ${session.currency}`);
    return Response.json({
      recorded: true,
      visibility,
      display_name: visibility === 'anonymous' ? '' : (meta.display_name || ''),
    });
  } catch (error) {
    console.error('[ClimateSupport] Error:', error.message);
    return Response.json({ recorded: false, error: error.message }, { status: 500 });
  }
}