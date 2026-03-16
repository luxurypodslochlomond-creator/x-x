import Stripe from 'npm:stripe@17';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { email, successUrl, cancelUrl } = await req.json();

    if (!successUrl || !cancelUrl) {
      return Response.json({ error: 'Success and cancel URLs required' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: email || undefined,
      line_items: [
        {
          price: 'price_1TBLebLgeWr0ng8pRrxfkItO',
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        base44_app_id: Deno.env.get('BASE44_APP_ID'),
        service: 'petsounds51',
      },
    });

    console.log(`[PetSounds51] Checkout session created: ${session.id}`);
    return Response.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('[PetSounds51 Checkout Error]:', error);
    return Response.json({ error: error.message || 'Checkout creation failed' }, { status: 500 });
  }
});