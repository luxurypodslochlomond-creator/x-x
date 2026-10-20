import Stripe from 'npm:stripe@14.21.0';

export default async function(req) {
  try {
    // Where the buyer lands comes from the server-set app origin — never from the
    // caller and never from the request Host. No header, no checkout session.
    const appUrl = req.headers.get('X-Base44-App-Url');
    if (!appUrl) {
      console.error('[SortedCheckout] missing X-Base44-App-Url header — refusing to create a session');
      return Response.json({ error: 'Checkout unavailable right now.' }, { status: 500 });
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price: 'price_1TM6esLgeWr0ng8pa8EX1QNP', // £9.99 one-time — Sorted For Life
        quantity: 1,
      }],
      // {CHECKOUT_SESSION_ID} is filled in by Stripe. SORTED only unlocks after
      // the backend has confirmed that id with Stripe.
      success_url: `${appUrl}/Sorted?sorted=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/Sorted`,
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      metadata: {
        base44_app_id: Deno.env.get('BASE44_APP_ID'),
        product: 'sorted_for_life',
      },
    });

    console.log('[SortedCheckout] session created:', session.id);
    return Response.json({ url: session.url });

  } catch (error) {
    console.error('SORTED checkout error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}