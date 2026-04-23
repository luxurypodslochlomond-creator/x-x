import Stripe from 'npm:stripe@14.21.0';
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));
  const { tier, success_url, cancel_url } = await req.json();

  const TIERS = {
    friend:  { amount: 1000, label: 'UF51 Friend — £10/month', interval: 'month' },
    builder: { amount: 5000, label: 'UF51 Builder — £50/month', interval: 'month' },
    founder: { amount: 20000, label: 'UF51 Founder — £200/month', interval: 'month' },
  };

  const t = TIERS[tier];
  if (!t) return Response.json({ error: 'Invalid tier' }, { status: 400 });

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'gbp',
        product_data: { name: t.label },
        unit_amount: t.amount,
        recurring: { interval: t.interval }
      },
      quantity: 1
    }],
    success_url: success_url || 'https://uf51.love/Platform?supported=true',
    cancel_url: cancel_url || 'https://uf51.love/Platform',
    metadata: {
      base44_app_id: Deno.env.get('BASE44_APP_ID'),
      supporter_tier: tier
    }
  });

  console.log(`Supporter checkout created: ${tier} — ${session.id}`);
  return Response.json({ url: session.url });
});