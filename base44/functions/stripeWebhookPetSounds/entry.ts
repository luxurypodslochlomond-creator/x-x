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
                subject: `Welcome to PetSounds51 — your animals are going to love this`,
                body: `Hi!

Your payment was successful. Thank you for trusting us with your animals.

Access all protocols here: https://uf51.love/PetSounds51

What you now have:
• All 10 healing protocols — anxiety, pain, trauma, dementia, recovery & more
• Species-specific audio for dogs, cats & horses
• Unlimited sessions — play as often as you like

Just open the link, pick a protocol that matches what your animal needs, and press play. That's it.

If you have any questions, reply to this email and we'll get back to you.

With love for your animals ♾️❤️
PetSounds51 Team
family@uf51.love`.trim()
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