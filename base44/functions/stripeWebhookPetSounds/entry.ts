import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';
import Stripe from 'npm:stripe@17';

/**
 * STRIPE WEBHOOK FOR PETSOUNDS51
 * Handles successful payments + sends access emails
 */

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));
        const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

        // Get raw body for signature verification
        const body = await req.text();
        const signature = req.headers.get('stripe-signature');

        // CRITICAL: Verify webhook signature BEFORE processing
        let event;
        try {
            event = await stripe.webhooks.constructEventAsync(
                body,
                signature,
                webhookSecret
            );
        } catch (err) {
            console.error('Webhook signature verification failed:', err);
            return Response.json({ error: 'Invalid signature' }, { status: 400 });
        }

        // Handle successful payment
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            
            const customerEmail = session.customer_email || session.customer_details?.email;
            const tier = session.metadata?.tier || 'premium';
            const amount = session.amount_total / 100; // Convert from cents
            const currency = session.currency.toUpperCase();

            // Record payment
            await base44.asServiceRole.entities.PetSounds51Payment.create({
                email: customerEmail,
                tier,
                price: amount,
                currency,
                payment_method: 'card',
                status: 'verified',
                verified_at: new Date().toISOString(),
                stripe_session_id: session.id
            });

            // Send access email
            await base44.asServiceRole.integrations.Core.SendEmail({
                to: customerEmail,
                subject: `Welcome to PetSounds51 ${tier.charAt(0).toUpperCase() + tier.slice(1)}!`,
                body: `
Hi!

Your payment was successful! Welcome to PetSounds51 ${tier} tier.

Access your account: https://uf51.love/PetSounds51

What you get:
${tier === 'basic' ? '• 5 healing protocols\n• Basic frequency library' : ''}
${tier === 'premium' ? '• ALL healing protocols\n• Full frequency library\n• AI51 text analysis\n• Priority support' : ''}
${tier === 'concierge' ? '• ALL features\n• Custom AI51 protocols\n• Voice consultations\n• 24/7 priority support' : ''}

Questions? Reply to this email.

With love for your animals ♾️❤️
PetSounds51 Team
                `.trim()
            });

            console.log(`✅ Payment processed: ${customerEmail} - ${tier} - ${currency}${amount}`);
        }

        // Handle subscription renewal
        if (event.type === 'invoice.payment_succeeded') {
            const invoice = event.data.object;
            console.log(`✅ Subscription renewed: ${invoice.customer_email}`);
        }

        return Response.json({ received: true });

    } catch (error) {
        console.error('Webhook error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});