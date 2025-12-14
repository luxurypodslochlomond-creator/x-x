import Stripe from 'npm:stripe@17.5.0';
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * STRIPE WEBHOOK HANDLER
 * Listen for subscription events → update user status
 */

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'), {
            apiVersion: '2024-12-18.acacia'
        });

        const signature = req.headers.get('stripe-signature');
        const body = await req.text();

        // Verify webhook signature
        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            Deno.env.get('STRIPE_WEBHOOK_SECRET')
        );

        // Handle events
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                const userId = session.metadata.user_id;
                const plan = session.metadata.plan;

                // Update user subscription status
                await base44.asServiceRole.entities.User.update(userId, {
                    subscription_plan: plan,
                    subscription_status: 'active',
                    stripe_customer_id: session.customer,
                    subscription_started: new Date().toISOString()
                });

                break;
            }

            case 'customer.subscription.updated': {
                const subscription = event.data.object;
                const userId = subscription.metadata.user_id;

                await base44.asServiceRole.entities.User.update(userId, {
                    subscription_status: subscription.status,
                    subscription_current_period_end: new Date(subscription.current_period_end * 1000).toISOString()
                });

                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object;
                const userId = subscription.metadata.user_id;

                await base44.asServiceRole.entities.User.update(userId, {
                    subscription_status: 'cancelled',
                    subscription_ended: new Date().toISOString()
                });

                break;
            }

            case 'invoice.payment_failed': {
                const invoice = event.data.object;
                // Could send email alert here
                console.log('Payment failed for:', invoice.customer);
                break;
            }
        }

        return Response.json({ received: true });

    } catch (error) {
        console.error('Webhook error:', error);
        return Response.json({ 
            error: error.message 
        }, { status: 400 });
    }
});