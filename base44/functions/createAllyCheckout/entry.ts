import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import Stripe from 'npm:stripe@17.5.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();
        
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { p51_amount, currency } = await req.json();

        if (!p51_amount || p51_amount <= 0) {
            return Response.json({ error: 'Invalid amount' }, { status: 400 });
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'paypal'],
            line_items: [{
                price_data: {
                    currency: currency.toLowerCase(),
                    product_data: {
                        name: `${p51_amount} $P51 - Ally Support`,
                        description: 'Support healers by providing liquidity to the $P51 ecosystem',
                        images: ['https://uf51.com/icon-512x512.png']
                    },
                    unit_amount: Math.round(p51_amount * 100) // Convert to cents
                },
                quantity: 1
            }],
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/AllyBridge?success=true&amount=${p51_amount}`,
            cancel_url: `${req.headers.get('origin')}/AllyBridge?cancelled=true`,
            metadata: {
                user_id: user.id,
                user_email: user.email,
                p51_amount: p51_amount.toString(),
                currency: currency,
                user_type: 'ally'
            }
        });

        // Create pending bridge record
        await base44.asServiceRole.entities.UniversalBridge.create({
            bridge_type: 'fiat_to_p51',
            user_type: 'ally',
            user_id: user.id,
            p51_amount: p51_amount,
            target_currency: currency,
            fiat_amount: p51_amount,
            bank_details: {
                method: 'stripe',
                session_id: session.id
            },
            processing_status: 'pending',
            reference_code: session.id
        });

        return Response.json({ 
            checkout_url: session.url,
            session_id: session.id 
        });

    } catch (error) {
        console.error('Ally checkout error:', error);
        return Response.json({ 
            error: error.message 
        }, { status: 500 });
    }
});