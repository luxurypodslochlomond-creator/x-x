import Stripe from 'npm:stripe@14.21.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

Deno.serve(async (req) => {
  try {
    const { success_url, cancel_url } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{
        price: 'price_1TM6omLgeWr0ng8p0puGXadx', // £9.99/month
        quantity: 1,
      }],
      success_url: success_url || 'https://uf51.love/Sorted?sorted=success',
      cancel_url:  cancel_url  || 'https://uf51.love/Sorted',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      metadata: {
        base44_app_id: Deno.env.get('BASE44_APP_ID'),
        product: 'sorted_for_life',
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('SORTED checkout error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});