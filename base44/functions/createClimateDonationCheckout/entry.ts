import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

// Starts a Stripe Checkout for a gift to the climate record.
// The gift buys nothing on the page: Stripe gets the amount and the giver's
// payment details, and the only other thing collected is whether a name is shown.

const MIN_AMOUNT = 100;      // £1
const MAX_AMOUNT = 500000;   // £5,000
const VISIBILITIES = ['anonymous', 'public', 'private'];

// A name that will stand in public: letters in any script, marks, spaces,
// apostrophes, hyphens and stops. Anything else (links, symbols, markup) is dropped.
function cleanDisplayName(raw) {
  if (typeof raw !== 'string') return '';
  return raw
    .replace(/[^\p{L}\p{M}\s'’.-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 40);
}

export default async function (req) {
  try {
    const appUrl = (req.headers.get('X-Base44-App-Url') || '').replace(/\/$/, '');
    if (!appUrl) {
      console.error('[ClimateSupport] X-Base44-App-Url missing — cannot build return links');
      return Response.json({ error: 'Giving is unavailable right now. Please try again shortly.' }, { status: 500 });
    }

    const body = await req.json().catch(() => ({}));
    const amount = Math.round(Number(body.amount));
    const frequency = body.frequency === 'monthly' ? 'monthly' : 'one_time';
    const visibility = VISIBILITIES.includes(body.visibility) ? body.visibility : 'anonymous';
    const displayName = visibility === 'anonymous' ? '' : cleanDisplayName(body.display_name);

    if (!Number.isFinite(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
      return Response.json({ error: 'Please choose an amount between £1 and £5,000.' }, { status: 400 });
    }
    if (visibility !== 'anonymous' && displayName.length < 2) {
      return Response.json({ error: 'Please add the name you would like shown, or give without one.' }, { status: 400 });
    }

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      console.error('[ClimateSupport] STRIPE_SECRET_KEY is not set');
      return Response.json({ error: 'Giving is unavailable right now. Please try again shortly.' }, { status: 500 });
    }

    const appId = Deno.env.get('BASE44_APP_ID') || '';
    const productName = frequency === 'monthly'
      ? 'Keeping the climate record — each month'
      : 'Keeping the climate record';

    const params = new URLSearchParams();
    params.set('mode', frequency === 'monthly' ? 'subscription' : 'payment');
    params.set('line_items[0][quantity]', '1');
    params.set('line_items[0][price_data][currency]', 'gbp');
    params.set('line_items[0][price_data][unit_amount]', String(amount));
    params.set('line_items[0][price_data][product_data][name]', productName);
    params.set('line_items[0][price_data][product_data][description]',
      'A gift that buys nothing on the page. No advertising, no sponsorship, no place for sale.');

    if (frequency === 'monthly') {
      params.set('line_items[0][price_data][recurring][interval]', 'month');
      params.set('subscription_data[metadata][base44_app_id]', appId);
      params.set('subscription_data[metadata][type]', 'climate_support');
    } else {
      params.set('payment_intent_data[statement_descriptor]', 'CLIMATE RECORD');
    }

    params.set('billing_address_collection', 'auto');
    params.set('success_url', `${appUrl}/ClimateSupport?support=thanks&session_id={CHECKOUT_SESSION_ID}`);
    params.set('cancel_url', `${appUrl}/ClimateSupport`);
    params.set('metadata[base44_app_id]', appId);
    params.set('metadata[type]', 'climate_support');
    params.set('metadata[frequency]', frequency);
    params.set('metadata[visibility]', visibility);
    if (displayName) params.set('metadata[display_name]', displayName);

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        'Stripe-Version': '2025-10-29.clover',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Idempotency-Key': crypto.randomUUID(),
      },
      body: params,
      signal: AbortSignal.timeout(15000),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error('[ClimateSupport] Stripe refused the session:', res.status, data?.error?.message);
      return Response.json({ error: 'We could not open the payment page. Please try again.' }, { status: 502 });
    }

    console.log(`[ClimateSupport] opened a ${frequency} session for ${amount} gbp (${visibility})`);
    return Response.json({ url: data.url });
  } catch (error) {
    console.error('[ClimateSupport] Error:', error.message);
    return Response.json({ error: 'Giving is unavailable right now. Please try again shortly.' }, { status: 500 });
  }
}