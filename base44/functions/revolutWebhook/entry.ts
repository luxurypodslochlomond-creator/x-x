
import { createClientFromRequest } from 'npm:@base44/sdk@0.7.1';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Parse webhook payload from Revolut
        const payload = await req.json();
        
        console.log('Revolut webhook received:', payload);
        
        // Validate webhook signature (Revolut provides this in headers)
        const signature = req.headers.get('x-revolut-signature');
        
        // TODO: Implement signature validation when Revolut provides webhook secret
        // For now, we'll process all incoming webhooks
        
        // Extract payment details
        const {
            amount,
            currency,
            reference,
            sender_name,
            sender_account,
            transaction_id,
            status
        } = payload;
        
        // Only process completed payments
        if (status !== 'completed') {
            return Response.json({ 
                message: 'Payment not completed yet',
                status: status 
            });
        }
        
        // Calculate base $P51 amount (100 $P51 per 1 currency unit)
        const baseP51Amount = parseFloat(amount) * 100;
        
        // Find bridge request by reference or create new one
        const bridgeRequests = await base44.asServiceRole.entities.UniversalBridge.filter({
            reference_code: reference
        });
        
        let bridgeRequest;
        
        if (bridgeRequests && bridgeRequests.length > 0) {
            bridgeRequest = bridgeRequests[0];
        } else {
            // Create new bridge request if none found
            bridgeRequest = await base44.asServiceRole.entities.UniversalBridge.create({
                bridge_type: 'fiat_to_p51',
                p51_amount: baseP51Amount,
                target_currency: currency,
                processing_status: 'completed',
                reference_code: reference,
                transaction_id: transaction_id,
                sender_details: {
                    name: sender_name,
                    account: sender_account
                }
            });
        }
        
        // Update bridge request status
        await base44.asServiceRole.entities.UniversalBridge.update(bridgeRequest.id, {
            processing_status: 'completed',
            transaction_id: transaction_id,
            completed_at: new Date().toISOString()
        });
        
        // Find user by email (from bridge request)
        if (bridgeRequest.created_by) {
            const users = await base44.asServiceRole.entities.User.filter({
                email: bridgeRequest.created_by
            });
            
            if (users && users.length > 0) {
                const user = users[0];
                
                // QUANTUM ALLY PROTOCOL: Check if user is marked as Ally
                const isAlly = bridgeRequest.user_type === 'ally';
                
                let userP51 = baseP51Amount;
                let familyFundP51 = 0;
                
                if (isAlly) {
                    // Allies: 90% to user, 10% to Family Fund
                    userP51 = Math.floor(baseP51Amount * 0.9);
                    familyFundP51 = Math.floor(baseP51Amount * 0.1);
                }
                
                // Credit $P51 to user
                const currentBalance = parseFloat(user.total_tokens_earned || 0);
                const newBalance = currentBalance + userP51;
                
                await base44.asServiceRole.entities.User.update(user.id, {
                    total_tokens_earned: newBalance
                });
                
                // Create transaction record
                await base44.asServiceRole.entities.Transaction.create({
                    transaction_type: 'purchased',
                    p51_amount: userP51,
                    to_user: user.email,
                    reason: isAlly 
                        ? `Ally Contribution: ${currency} ${amount} → ${userP51} $P51`
                        : `$P51 Bridge: ${currency} ${amount} → ${userP51} $P51`,
                    reference_id: bridgeRequest.id,
                    status: 'completed'
                });
                
                // NEW: Create a ProofOfLove record for the Ally's contribution, framing it as a healing act
                if (isAlly) {
                    await base44.asServiceRole.entities.ProofOfLove.create({
                        love_type: 'humanitarian_aid',
                        description: `Quantum Ally contribution of ${amount} ${currency} to fuel the Universal Love Treasury and enable planetary healing missions.`,
                        p51_awarded: userP51,
                        created_by: user.email,
                        verification_status: 'verified',
                        oracle_reasoning: 'Financial energy transmuted directly into healing potential.'
                    });
                }

                // If Ally: Credit Family Fund
                if (isAlly && familyFundP51 > 0) {
                    const treasury = await base44.asServiceRole.entities.UniversalLoveTreasury.list();
                    if (treasury && treasury.length > 0) {
                        const currentTreasury = treasury[0];
                        const newBalance = (currentTreasury.current_balance_gmt || 0) + familyFundP51;
                        const newTotal = (currentTreasury.total_collected_gmt || 0) + familyFundP51;
                        
                        await base44.asServiceRole.entities.UniversalLoveTreasury.update(currentTreasury.id, {
                            current_balance_gmt: newBalance,
                            total_collected_gmt: newTotal
                        });
                    }
                }
                
                // Send confirmation email
                // TODO: Implement email notification
                
                return Response.json({
                    success: true,
                    message: '$P51 credited successfully',
                    user_type: isAlly ? 'ally' : 'healer',
                    p51_to_user: userP51,
                    p51_to_family_fund: familyFundP51,
                    user_email: user.email,
                    new_balance: newBalance
                });
            }
        }
        
        return Response.json({
            success: true,
            message: 'Payment received but user not found',
            bridge_request_id: bridgeRequest.id
        });
        
    } catch (error) {
        console.error('Webhook processing error:', error);
        return Response.json({ 
            error: error.message 
        }, { 
            status: 500 
        });
    }
});
