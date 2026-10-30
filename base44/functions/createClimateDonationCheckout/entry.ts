import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

// Starts a Stripe Checkout for a gift to the climate record.
// The gift buys nothing on the page: Stripe gets the amount and the giver's
// payment details, and the only other thing collected is whether a name is shown.

const MIN_AMOUNT = 100;         // £1
const MAX_AMOUNT = 2500000;     // £25,000 — a person or an institution may give any size they choose
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
    const visibility = VISIBILITIES.includes(body.visibility) ? body.visibility : 'anonymous';
    const displayName = visibility === 'anonymous' ? '' : cleanDisplayName(body.display_name);

    if (!Number.isFinite(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
      return Response.json({ error: 'Please choose an amount between £1 and £25,000.' }, { status: 400 });
    }
    if (visibility !== 'anonymous' && displayName.length < 2) {
      return Response.json({ error: 'Please add the name you would like shown, or give without one.' }, { status: 400 });
    }

    // A climate gift must never land in another product's Stripe account. This is
    // the climate record's OWN account key — set once the founder's handlers say
    // where the money is held. Until then this stays closed and nothing is taken.
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY_CLIMATE');
    if (!stripeKey) {
      console.error('[ClimateSupport] STRIPE_SECRET_KEY_CLIMATE is not set — climate giving is held closed');
      return Response.json({ error: 'Giving is not open yet. The record only takes gifts into a climate account of its own.' }, { status: 503 });
    }

    const appId = Deno.env.get('BASE44_APP_ID') || '';
    // One gift, never a standing order. The record does not take money off people
    // every month: a gift is a decision someone makes once, at whatever size they choose.
    const productName = 'Keeping the climate record';

    const params = new URLSearchParams();
    params.set('mode', 'payment');
    params.set('line_items[0][quantity]', '1');
    params.set('line_items[0][price_data][currency]', 'gbp');
    params.set('line_items[0][price_data][unit_amount]', String(amount));
    params.set('line_items[0][price_data][product_data][name]', productName);
    params.set('line_items[0][price_data][product_data][description]',
      'A gift that buys nothing on the page. No advertising, no sponsorship, no place for sale.');

    params.set('payment_intent_data[statement_descriptor]', 'CLIMATE RECORD');

    params.set('billing_address_collection', 'auto');
    params.set('success_url', `${appUrl}/ClimateSupport?support=thanks&session_id={CHECKOUT_SESSION_ID}`);
    params.set('cancel_url', `${appUrl}/ClimateSupport`);
    params.set('metadata[base44_app_id]', appId);
    params.set('metadata[type]', 'climate_support');
    params.set('metadata[frequency]', 'one_time');
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

    console.log(`[ClimateSupport] opened a one-off gift session for ${amount} gbp (${visibility})`);
    return Response.json({ url: data.url });
  } catch (error) {
    console.error('[ClimateSupport] Error:', error.message);
    return Response.json({ error: 'Giving is unavailable right now. Please try again shortly.' }, { status: 500 });
  }
}