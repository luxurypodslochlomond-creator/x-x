import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { gigId, artistId, memberName, vote, managerEmail } = await req.json();

    if (!gigId || !memberName || !vote || !managerEmail) {
      return Response.json({ error: 'Missing params' }, { status: 400 });
    }

    const voteEmoji = vote === 'yes' ? '✓' : '✗';
    const voteText = vote === 'yes' ? 'YES' : 'NO';

    // Get vote tally
    const allVotes = await base44.asServiceRole.entities.GigVote.filter({ gig_id: gigId });
    const yesCount = allVotes.filter(v => v.vote === 'yes').length;
    const noCount = allVotes.filter(v => v.vote === 'no').length;

    // Get gig details
    const gig = await base44.asServiceRole.entities.GigOffer.filter({ id: gigId });
    const gigData = gig?.[0];
    const gigVenue = gigData?.venue || 'Unknown';

    // Notify manager
    await base44.integrations.Core.SendPushNotification({
      user_email: managerEmail,
      title: `${voteEmoji} ${memberName}: ${voteText}`,
      body: `${gigVenue} • ${yesCount} yes, ${noCount} no`,
      tag: `gig_vote_tally_${gigId}`,
      data: {
        type: 'vote_update',
        gigId,
        artistId,
        action_url: `/CB51?view=gigDetail&id=${gigId}`
      }
    }).catch(e => console.log('Push failed:', e.message));

    return Response.json({ success: true, yesCount, noCount });
  } catch (error) {
    console.error('notifyManagerOnVote error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});