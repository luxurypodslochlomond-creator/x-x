import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { gigId, bandMemberId, voteType, reason } = await req.json();

    if (!gigId) {
      return Response.json({ error: 'Missing gigId' }, { status: 400 });
    }

    // Get the gig
    const gig = await base44.asServiceRole.entities.GigOffer.get(gigId);
    if (!gig) {
      return Response.json({ error: 'Gig not found' }, { status: 404 });
    }

    // Get band member name
    const member = bandMemberId 
      ? await base44.asServiceRole.entities.TeamMember.get(bandMemberId)
      : null;

    // Get vote summary to show progress
    const votes = await base44.asServiceRole.entities.GigVote.filter({ 
      gig_id: gigId 
    });

    const bandMembers = await base44.asServiceRole.entities.TeamMember.filter({ 
      artist_id: gig.artist_id 
    });

    const yesCount = votes.filter(v => v.vote_type === 'yes').length;
    const noCount = votes.filter(v => v.vote_type === 'no').length;
    const pending = bandMembers.length - votes.length;

    // Build notification message
    const memberName = member?.name || 'Band member';
    const action = voteType === 'yes' ? '✅ said YES' : '❌ said NO';
    
    let reasonText = '';
    if (voteType === 'no' && reason) {
      reasonText = `\nReason: "${reason}"`;
    }

    const message = `${memberName} ${action} to ${gig.venue}\n${yesCount} YES • ${noCount} NO • ${pending} pending${reasonText}`;

    // In production, send push notification to manager
    // For now, just log and return summary
    console.log(`📢 Manager notification: ${message}`);

    return Response.json({
      status: 'success',
      memberName,
      voteType,
      reason,
      voteSummary: {
        yesCount,
        noCount,
        pending,
        total: bandMembers.length
      }
    });
  } catch (error) {
    console.error('Band vote notification error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});