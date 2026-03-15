import Stripe from 'npm:stripe@14.21.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));
const PRICE_ID = 'price_1TBLebLgeWr0ng8pRrxfkItO';

Deno.serve(async (req) => {
  try {
    const { successUrl, cancelUrl } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      success_url: successUrl || 'https://uf51.love/PetSounds51?subscribed=true',
      cancel_url: cancelUrl || 'https://uf51.love/PetSounds51',
      allow_promotion_codes: true,
      // Stripe Link = one-tap Face ID checkout for returning Stripe users
      // Apple Pay + Google Pay auto-enabled on compatible devices
      payment_method_types: ['card'],
      payment_method_options: {
        card: { request_three_d_secure: 'automatic' }
      },
      metadata: {
        base44_app_id: Deno.env.get('BASE44_APP_ID'),
        product: 'petsounds51'
      }
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});