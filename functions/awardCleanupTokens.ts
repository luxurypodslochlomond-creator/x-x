import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const authUser = await base44.auth.me();

        if (!authUser) {
            return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { cleanup_id } = await req.json();

        if (!cleanup_id) {
            return Response.json({ success: false, error: 'cleanup_id required' }, { status: 400 });
        }

        const cleanup = await base44.asServiceRole.entities.Cleanup.filter({ id: cleanup_id });
        if (!cleanup || cleanup.length === 0) {
            return Response.json({ success: false, error: 'Cleanup not found' }, { status: 404 });
        }

        const cleanupData = cleanup[0];

        const users = await base44.asServiceRole.entities.User.filter({ email: authUser.email });
        if (!users || users.length === 0) {
            return Response.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        const user = users[0];

        // SIMPLE: 1kg = 1 token. That's it. No manipulation.
        let tokensToAward = Math.round(cleanupData.litter_weight);

        // Apply quantum multiplier (trust-based, NOT streak-based)
        const multiplier = user.quantum_multiplier || 1;
        tokensToAward = Math.round(tokensToAward * multiplier);

        // Update user - SIMPLE NUMBERS ONLY
        const newTotalWeight = (user.total_litter_weight || 0) + cleanupData.litter_weight;
        const newVerifiedCleanups = (user.verified_cleanups || 0) + 1;
        const newBalance = (user.p51_balance || 0) + tokensToAward;
        const newTotalEarnings = (user.total_earnings || 0) + tokensToAward;

        await base44.asServiceRole.entities.User.update(user.id, {
            p51_balance: newBalance,
            total_litter_weight: newTotalWeight,
            verified_cleanups: newVerifiedCleanups,
            total_earnings: newTotalEarnings
        });

        // Create transaction
        await base44.asServiceRole.entities.Transaction.create({
            transaction_type: 'earned',
            p51_amount: tokensToAward,
            to_user: authUser.email,
            reason: `Cleanup: ${cleanupData.litter_weight}kg`,
            reference_id: cleanup_id,
            status: 'completed'
        });

        return Response.json({
            success: true,
            tokens_awarded: tokensToAward,
            multiplier_applied: multiplier,
            new_total_weight: newTotalWeight,
            new_cleanups: newVerifiedCleanups
        });

    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
});