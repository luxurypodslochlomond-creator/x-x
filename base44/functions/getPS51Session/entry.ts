import Stripe from 'npm:stripe@17';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

Deno.serve(async (req) => {
  try {
    const { sessionId } = await req.json();
    if (!sessionId) return Response.json({ error: 'Session ID required' }, { status: 400 });

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const email = session.customer_details?.email || session.customer_email;

    return Response.json({ email, subscribed: session.payment_status === 'paid' || session.status === 'complete' });
  } catch (error) {
    console.error('Session fetch error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});