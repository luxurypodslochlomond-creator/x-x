import Stripe from 'npm:stripe@14.21.0';

Deno.serve(async (req) => {
  try {
    const { amount, currency = 'gbp' } = await req.json();

    if (!amount || amount < 100) {
      return Response.json({ error: 'Minimum donation is £1' }, { status: 400 });
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

    const session = await stripe.checkout.sessions.create({
      // Let Stripe show ALL available methods incl Apple Pay, Google Pay, Link
      payment_method_types: ['card', 'link'],
      payment_method_options: {
        card: {
          // Enables Apple Pay + Google Pay automatically via Stripe
        },
      },
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: 'Support Learn51 — Free Education for Every Child',
            description: 'Keeps Learn51 completely free for children worldwide. No ads, no tracking, no corporate capture. Thank you ♾️❤️',
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      // Allow any billing country — global donations
      billing_address_collection: 'auto',
      success_url: `${req.headers.get('origin') || 'https://uf51.love'}/Learn51?donated=true`,
      cancel_url: `${req.headers.get('origin') || 'https://uf51.love'}/SupportLearn51`,
      metadata: {
        base44_app_id: Deno.env.get('BASE44_APP_ID'),
        type: 'donation',
        currency,
        amount_requested: amount,
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Donation checkout error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});