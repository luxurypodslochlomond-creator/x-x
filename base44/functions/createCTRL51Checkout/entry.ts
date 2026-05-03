import Stripe from 'npm:stripe@14.5.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

Deno.serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return Response.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const { plan = 'pilot', success_url, cancel_url } = await req.json();

    if (!success_url || !cancel_url) {
      return Response.json({ error: 'Missing redirect URLs' }, { status: 400 });
    }

    const prices = {
      pilot: 'price_1TSz8gLgeWr0ng8pVBLpsoQu', // £5,000/month
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: prices[plan],
          quantity: 1,
        },
      ],
      success_url,
      cancel_url,
      metadata: {
        base44_app_id: Deno.env.get('BASE44_APP_ID'),
        plan,
      },
    });

    console.log(`Checkout session created: ${session.id} for plan: ${plan}`);

    return Response.json({ 
      checkout_url: session.url,
      session_id: session.id 
    });
  } catch (error) {
    console.error('Stripe checkout error:', error.message);
    return Response.json(
      { error: error.message || 'Checkout creation failed' },
      { status: 500 }
    );
  }
});