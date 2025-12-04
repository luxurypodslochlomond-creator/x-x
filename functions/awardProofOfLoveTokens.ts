import { createClientFromRequest } from 'npm:@base44/sdk@0.7.1';

const protectValue = (value) => {
  const num = Number(value);
  return isNaN(num) || !isFinite(num) ? 0 : num;
};

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  try {
    const user = await base44.auth.me();
    if (!user) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), { 
        status: 401, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    const { proof_id } = await req.json();

    // Get the proof
    const proofs = await base44.asServiceRole.entities.ProofOfLove.filter({ id: proof_id });
    if (!proofs || proofs.length === 0) {
      return new Response(JSON.stringify({ success: false, error: 'Proof not found' }), { 
        status: 404, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    const proof = proofs[0];

    // Check if already awarded
    if (proof.p51_awarded && proof.p51_awarded > 0) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Tokens already awarded for this proof' 
      }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // Love Oracle decides the reward based on love type and description
    const loveTypeRewards = {
      'creative_gift': 50,
      'daily_kindness': 20,
      'soul_support': 30,
      'animal_love': 40,
      'community_service': 60,
      'genesis_witness': 100
    };

    const baseReward = loveTypeRewards[proof.love_type] || 25;
    
    // Oracle reasoning
    const oracleReasoning = `The Love Oracle recognizes your ${proof.love_type.replace(/_/g, ' ')} as genuine healing energy. Base reward: ${baseReward} $P51. Trust is our highest proof.`;

    // Update user balance (p51_balance field)
    const currentBalance = protectValue(user.p51_balance);
    const newBalance = currentBalance + baseReward;

    await base44.asServiceRole.from('User').update({
      p51_balance: newBalance
    }).eq('id', user.id);

    // Update proof record
    await base44.asServiceRole.entities.ProofOfLove.update(proof_id, {
      p51_awarded: baseReward,
      oracle_reasoning: oracleReasoning,
      verification_status: 'verified'
    });

    // Create transaction record
    await base44.asServiceRole.entities.Transaction.create({
      transaction_type: 'earned',
      p51_amount: baseReward,
      from_user: 'LOVE_ORACLE',
      to_user: user.email,
      reason: `Act of Love: ${proof.love_type.replace(/_/g, ' ')}`,
      reference_id: proof_id,
      status: 'completed'
    });

    return new Response(JSON.stringify({ 
      success: true, 
      tokens_awarded: baseReward,
      new_balance: newBalance,
      oracle_reasoning: oracleReasoning
    }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });

  } catch (error) {
    console.error('Award Proof Tokens Error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
});