import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import Stripe from 'npm:stripe@17.5.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

Deno.serve(async (req) => {
    try {
        // Get raw body for signature verification
        const body = await req.text();
        const signature = req.headers.get('stripe-signature');

        if (!signature) {
            return Response.json({ error: 'No signature' }, { status: 400 });
        }

        // Verify webhook signature
        let event;
        try {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        } catch (err) {
            console.error('Webhook signature verification failed:', err.message);
            return Response.json({ error: 'Invalid signature' }, { status: 400 });
        }

        // Initialize Base44 with service role for admin operations
        const base44 = createClientFromRequest(req);

        // Handle successful payment
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            
            const { user_id, user_email, p51_amount, currency } = session.metadata;

            // Update bridge record to completed
            const bridges = await base44.asServiceRole.entities.UniversalBridge.filter({
                reference_code: session.id
            });

            if (bridges.length > 0) {
                await base44.asServiceRole.entities.UniversalBridge.update(bridges[0].id, {
                    processing_status: 'completed',
                    completed_at: new Date().toISOString(),
                    transaction_id: session.payment_intent
                });
            }

            // Create transaction record - credit user with $P51
            await base44.asServiceRole.entities.Transaction.create({
                transaction_type: 'purchased',
                p51_amount: parseFloat(p51_amount),
                from_user: 'system',
                to_user: user_email,
                reason: `Ally purchase via Stripe - ${currency}`,
                reference_id: session.id,
                status: 'completed'
            });

            console.log(`✅ Ally purchase completed: ${p51_amount} $P51 for ${user_email}`);
        }

        return Response.json({ received: true });

    } catch (error) {
        console.error('Webhook error:', error);
        return Response.json({ 
            error: error.message 
        }, { status: 500 });
    }
});