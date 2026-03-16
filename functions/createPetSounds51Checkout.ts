import Stripe from 'npm:stripe@14.0.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { email, successUrl, cancelUrl } = await req.json();

    if (!email) {
      return Response.json({ error: 'Email required' }, { status: 400 });
    }

    if (!successUrl || !cancelUrl) {
      return Response.json({ error: 'Success and cancel URLs required' }, { status: 400 });
    }

    // Check if running in iframe
    const origin = req.headers.get('origin');
    if (origin && origin.includes('iframe')) {
      return Response.json({ 
        error: 'Iframe detected. Checkout must be accessed from published app.',
        requiresPublished: true 
      }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',

      customer_email: email,
      line_items: [
        {
          price: 'price_1TBLebLgeWr0ng8pRrxfkItO', // PetSounds51 monthly
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

    console.log(`[PetSounds51] Checkout session created: ${session.id} for ${email}`);

    return Response.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('[PetSounds51 Checkout Error]:', error);
    return Response.json({ 
      error: error.message || 'Checkout creation failed' 
    }, { status: 500 });
  }
});