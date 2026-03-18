import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gigId } = await req.json();

    if (!gigId) {
      return Response.json({ error: 'Missing gigId' }, { status: 400 });
    }

    // Get the gig
    const gig = await base44.entities.GigOffer.get(gigId);
    if (!gig) {
      return Response.json({ error: 'Gig not found' }, { status: 404 });
    }

    // Get all votes for this gig
    const votes = await base44.asServiceRole.entities.GigVote.filter({ 
      gig_id: gigId 
    });

    // Get band members count for this artist
    const bandMembers = await base44.asServiceRole.entities.TeamMember.filter({ 
      artist_id: gig.artist_id 
    });

    // Count votes
    const yesVotes = votes.filter(v => v.vote_type === 'yes').length;
    const noVotes = votes.filter(v => v.vote_type === 'no').length;
    const pendingVotes = bandMembers.length - votes.length;
    const allVoted = pendingVotes === 0;
    const allYes = allVoted && noVotes === 0;
    const hasRejection = noVotes > 0;

    return Response.json({
      gigId,
      gigTitle: gig.venue || gig.title,
      totalBandMembers: bandMembers.length,
      yesVotes,
      noVotes,
      pendingVotes,
      allVoted,
      allYes,
      hasRejection,
      rejectionReasons: votes
        .filter(v => v.vote_type === 'no' && v.reason)
        .map(v => v.reason)
    });
  } catch (error) {
    console.error('Vote summary error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});