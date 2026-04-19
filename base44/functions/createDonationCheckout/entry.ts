import Stripe from 'npm:stripe@14.21.0';

Deno.serve(async (req) => {
  try {
    const { amount, currency = 'gbp' } = await req.json();

    if (!amount || amount < 100) {
      return Response.json({ error: 'Minimum donation is £1' }, { status: 400 });
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency,
          product_data: {
            name: 'Support Learn51 — Free Education for Every Child',
            description: 'Your donation keeps Learn51 completely free for children worldwide. No ads, no tracking, no corporate capture.',
            images: [],
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      success_url: `${req.headers.get('origin')}/Learn51?donated=true`,
      cancel_url: `${req.headers.get('origin')}/SupportLearn51`,
      metadata: {
        base44_app_id: Deno.env.get('BASE44_APP_ID'),
        type: 'donation',
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Donation checkout error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});