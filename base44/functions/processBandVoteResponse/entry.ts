import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gigOfferId, bandMemberEmail, vote, reason } = await req.json();

    if (!['yes', 'no'].includes(vote)) {
      return Response.json({ error: 'Invalid vote' }, { status: 400 });
    }

    // Record the vote
    const voteRecord = await base44.entities.GigVote.create({
      gig_offer_id: gigOfferId,
      voter_email: bandMemberEmail,
      vote_response: vote,
      reason_if_no: vote === 'no' ? reason : null
    });

    // Get all band members for this gig to check tally
    const gigOffer = await base44.entities.GigOffer.filter({ id: gigOfferId });
    if (!gigOffer || gigOffer.length === 0) {
      return Response.json({ error: 'Gig offer not found' }, { status: 404 });
    }

    const allVotes = await base44.entities.GigVote.filter({
      gig_offer_id: gigOfferId
    });

    const yesCount = allVotes.filter(v => v.vote_response === 'yes').length;
    const noCount = allVotes.filter(v => v.vote_response === 'no').length;
    const noResponses = allVotes.filter(v => v.vote_response === 'no');

    // Notify manager of new vote
    await base44.functions.invoke('notifyManagerOfVoteTally', {
      gigOfferId,
      yesCount,
      noCount,
      noResponses,
      managerEmail: gigOffer[0].created_by
    });

    return Response.json({ 
      status: 'recorded',
      voteId: voteRecord.id,
      tally: { yes: yesCount, no: noCount }
    });
  } catch (error) {
    console.error('Vote processing error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});