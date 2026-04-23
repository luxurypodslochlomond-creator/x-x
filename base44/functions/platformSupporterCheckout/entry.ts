import Stripe from 'npm:stripe@14.21.0';

Deno.serve(async (req) => {
  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));
    const { tier, mode = 'monthly', amount_pence, currency = 'gbp', success_url, cancel_url } = await req.json();

    // Monthly subscription tiers (always GBP)
    const MONTHLY_TIERS = {
      friend:  { amount: 1000,  label: 'UF51 Friend — £10/month' },
      builder: { amount: 5000,  label: 'UF51 Builder — £50/month' },
      founder: { amount: 20000, label: 'UF51 Founder — £200/month' },
    };

    // Supported currencies for one-off donations
    const VALID_CURRENCIES = ['gbp','usd','eur','aud','cad','jpy','nzd','chf','sek','nok','dkk','inr','brl','mxn','sgd','hkd','pln','czk','huf','ron'];
    const safeCurrency = VALID_CURRENCIES.includes(currency.toLowerCase()) ? currency.toLowerCase() : 'gbp';

    // Zero-decimal currencies (amount is already in smallest unit, not multiplied)
    const ZERO_DECIMAL = ['jpy','krw','bif','gnf','mga','pyg','rwf','ugx','vnd','xaf','xof'];
    const isZeroDecimal = ZERO_DECIMAL.includes(safeCurrency);

    let sessionMode, priceData;

    if (mode === 'monthly') {
      // Subscription — fixed GBP tiers
      const t = MONTHLY_TIERS[tier];
      if (!t) return Response.json({ error: 'Invalid tier' }, { status: 400 });

      sessionMode = 'subscription';
      priceData = {
        currency: 'gbp',
        product_data: { name: t.label },
        unit_amount: t.amount,
        recurring: { interval: 'month' }
      };
    } else {
      // One-off donation — any amount, any currency
      // amount_pence = amount in smallest currency unit (e.g. pence, cents)
      const donationAmount = Math.round(Number(amount_pence));

      // Minimum check: at least 50 pence / cents (or 50 for zero-decimal)
      const minAmount = isZeroDecimal ? 50 : 50;
      if (!donationAmount || donationAmount < minAmount) {
        return Response.json({ error: 'Minimum donation is too small' }, { status: 400 });
      }

      // Cap at 1,000,000 GBP equivalent (100,000,000 pence) to prevent abuse
      if (donationAmount > 100000000) {
        return Response.json({ error: 'Amount too large — email us instead: family@uf51.love' }, { status: 400 });
      }

      const currencySymbols = { gbp:'£', usd:'$', eur:'€', aud:'A$', cad:'C$', jpy:'¥', nzd:'NZ$', chf:'CHF', sek:'kr', nok:'kr', dkk:'kr', inr:'₹', brl:'R$', mxn:'MX$', sgd:'S$', hkd:'HK$', pln:'zł', czk:'Kč', huf:'Ft', ron:'lei' };
      const symbol = currencySymbols[safeCurrency] || safeCurrency.toUpperCase();
      const displayAmount = isZeroDecimal ? donationAmount : (donationAmount / 100).toFixed(2);
      const label = `UF51 Donation — ${symbol}${displayAmount}`;

      sessionMode = 'payment';
      priceData = {
        currency: safeCurrency,
        product_data: { name: label },
        unit_amount: donationAmount,
      };
    }

    const session = await stripe.checkout.sessions.create({
      mode: sessionMode,
      payment_method_types: ['card'],
      line_items: [{ price_data: priceData, quantity: 1 }],
      success_url: success_url || 'https://uf51.love/Platform?supported=true',
      cancel_url: cancel_url || 'https://uf51.love/Platform',
      metadata: {
        base44_app_id: Deno.env.get('BASE44_APP_ID'),
        supporter_tier: tier || 'custom',
        payment_mode: mode,
        currency: safeCurrency,
      }
    });

    console.log(`Supporter checkout created: ${tier || 'custom'} ${mode} ${safeCurrency} — ${session.id}`);
    return Response.json({ url: session.url });

  } catch (err) {
    console.error('platformSupporterCheckout error:', err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
});