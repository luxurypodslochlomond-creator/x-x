import Stripe from 'npm:stripe@14.21.0';
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));
  const { tier, mode = 'monthly', success_url, cancel_url } = await req.json();

  const TIERS = {
    friend:  { amount: 1000,  monthlyLabel: 'UF51 Friend — £10/month',   onceLabel: 'UF51 Friend — £10 one-off' },
    builder: { amount: 5000,  monthlyLabel: 'UF51 Builder — £50/month',  onceLabel: 'UF51 Builder — £50 one-off' },
    founder: { amount: 20000, monthlyLabel: 'UF51 Founder — £200/month', onceLabel: 'UF51 Founder — £200 one-off' },
  };

  const t = TIERS[tier];
  if (!t) return Response.json({ error: 'Invalid tier' }, { status: 400 });

  const isOnce = mode === 'once';
  const label = isOnce ? t.onceLabel : t.monthlyLabel;

  const priceData = isOnce
    ? { currency: 'gbp', product_data: { name: label }, unit_amount: t.amount }
    : { currency: 'gbp', product_data: { name: label }, unit_amount: t.amount, recurring: { interval: 'month' } };

  const session = await stripe.checkout.sessions.create({
    mode: isOnce ? 'payment' : 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price_data: priceData, quantity: 1 }],
    success_url: success_url || 'https://uf51.love/Platform?supported=true',
    cancel_url: cancel_url || 'https://uf51.love/Platform',
    metadata: {
      base44_app_id: Deno.env.get('BASE44_APP_ID'),
      supporter_tier: tier,
      payment_mode: mode
    }
  });

  console.log(`Supporter checkout created: ${tier} — ${session.id}`);
  return Response.json({ url: session.url });
});