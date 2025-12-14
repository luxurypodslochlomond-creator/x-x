import Stripe from 'npm:stripe@17.5.0';
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * CREATE STRIPE CHECKOUT SESSION
 * Label subscriptions → £99/month
 * Returns checkout URL → redirect user
 */

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { plan, priceId, successUrl, cancelUrl } = await req.json();

        const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'), {
            apiVersion: '2024-12-18.acacia'
        });

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
            customer_email: user.email,
            mode: 'subscription',
            line_items: [
                {
                    price: priceId, // Set in Stripe dashboard: price_label_99
                    quantity: 1,
                },
            ],
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: {
                user_id: user.id,
                user_email: user.email,
                plan: plan
            },
            subscription_data: {
                metadata: {
                    user_id: user.id,
                    plan: plan
                },
                trial_period_days: 7 // 7 day free trial
            }
        });

        return Response.json({ 
            url: session.url,
            sessionId: session.id
        });

    } catch (error) {
        console.error('Stripe checkout error:', error);
        return Response.json({ 
            error: error.message 
        }, { status: 500 });
    }
});