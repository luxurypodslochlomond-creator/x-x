import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const url = new URL(req.url);
    
    const token = url.searchParams.get('token');
    const gigId = url.searchParams.get('gigId');
    const memberId = url.searchParams.get('memberId');
    const answer = url.searchParams.get('answer'); // yes, no, maybe
    const reason = url.searchParams.get('reason'); // optional explanation

    // Validate required params
    if (!token || !gigId || !memberId || !answer) {
      return Response.json({ 
        error: 'Missing required params: token, gigId, memberId, answer' 
      }, { status: 400 });
    }

    if (!['yes', 'no', 'maybe'].includes(answer)) {
      return Response.json({ 
        error: 'answer must be yes, no, or maybe' 
      }, { status: 400 });
    }

    // Get gig and band member
    const gig = await base44.entities.GigOffer.get(gigId);
    if (!gig) {
      return Response.json({ error: 'Gig not found' }, { status: 404 });
    }

    const member = await base44.entities.BandMember.get(memberId);
    if (!member || member.artist_id !== gig.artist_id) {
      return Response.json({ error: 'Band member not found or not in this band' }, { status: 404 });
    }

    // Check if they already voted
    const existingVote = await base44.entities.GigVote.filter({ 
      gig_offer_id: gigId,
      band_member_id: memberId 
    });

    if (existingVote.length > 0) {
      return Response.json({ 
        error: 'You already voted on this gig' 
      }, { status: 400 });
    }

    // Record the vote
    const vote = await base44.entities.GigVote.create({
      gig_offer_id: gigId,
      band_member_id: memberId,
      answer,
      reason: reason || null,
      voted_at: new Date().toISOString()
    });

    // Get all band members to check if voting is complete
    const bandMembers = await base44.entities.BandMember.filter({ 
      artist_id: gig.artist_id 
    });
    
    const allVotes = await base44.entities.GigVote.filter({ 
      gig_offer_id: gigId 
    });

    const allVoted = allVotes.length === bandMembers.length;
    const hasNos = allVotes.some(v => v.answer === 'no');

    // If all voted, notify manager
    if (allVoted) {
      if (hasNos) {
        // Band rejected - notify manager
        await base44.functions.invoke('notifyManagerBandRejected', { gigOfferId: gigId });
      } else {
        // All yes - notify manager with draft email
        await base44.functions.invoke('notifyManagerAllVotesIn', { gigOfferId: gigId });
      }
    }

    return Response.json({
      status: 'Vote recorded',
      vote: {
        id: vote.id,
        answer,
        memberId,
        gigId
      },
      allVoted,
      voteProgress: `${allVotes.length}/${bandMembers.length} voted`
    });
  } catch (error) {
    console.error('bandVote error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});