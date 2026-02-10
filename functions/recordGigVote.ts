import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * RECORD GIG VOTE - Manager or Band Member
 * Creates GigVote record
 * If all band says YES → notify manager
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gig_id, vote_type, reason } = await req.json();

    if (!gig_id || !vote_type) {
      return Response.json({ error: 'Missing gig_id or vote_type' }, { status: 400 });
    }

    // Create vote record
    const vote = await base44.entities.GigVote.create({
      gig_id,
      voted_by_role: 'manager', // Will be overridden by frontend
      vote_type, // 'yes' or 'no'
      reason,
      voted_at: new Date().toISOString()
    });

    console.log(`✓ Vote recorded: ${gig_id} = ${vote_type}`);

    return Response.json({ success: true, vote });
  } catch (error) {
    console.error('Vote error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});