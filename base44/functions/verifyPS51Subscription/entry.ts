import Stripe from 'npm:stripe@17';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

Deno.serve(async (req) => {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: 'Email required' }, { status: 400 });
    }

    // Look up active subscriptions for this email
    const customers = await stripe.customers.list({ email });

    if (customers.data.length === 0) {
      return Response.json({ subscribed: false });
    }

    // Check if any subscription is active (trialing or active status)
    for (const customer of customers.data) {
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: 'active'
      });

      if (subscriptions.data.length > 0) {
        return Response.json({
          subscribed: true,
          email: customer.email,
          customerId: customer.id
        });
      }
    }

    return Response.json({ subscribed: false });
  } catch (error) {
    console.error('Subscription verification error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});