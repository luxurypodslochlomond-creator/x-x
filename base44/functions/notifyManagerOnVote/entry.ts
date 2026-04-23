import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { gigId, artistId, memberName, vote, managerEmail } = await req.json();

    if (!gigId || !memberName || !vote || !managerEmail) {
      return Response.json({ error: 'Missing params' }, { status: 400 });
    }

    const voteText = vote === 'yes' ? '✅ YES' : '❌ NO';

    // Get vote tally
    const allVotes = await base44.asServiceRole.entities.GigVote.filter({ gig_id: gigId });
    const yesCount = allVotes.filter(v => v.vote === 'yes').length;
    const noCount = allVotes.filter(v => v.vote === 'no').length;
    const totalBandSize = allVotes.length;

    // Get gig details
    const gig = await base44.asServiceRole.entities.GigOffer.filter({ id: gigId });
    const gigData = gig?.[0];
    const gigVenue = gigData?.venue || 'Unknown';

    // Smart notification body — shows live tally
    const allVotedIn = noCount === 0 && yesCount > 0;
    const allRejected = yesCount === 0 && noCount > 0;
    const pending = totalBandSize - (yesCount + noCount);
    
    let statusText = '';
    if (allVotedIn) {
      statusText = `✓ All ${yesCount} in!`;
    } else if (allRejected) {
      statusText = `✗ All ${noCount} rejected`;
    } else {
      statusText = `${yesCount}✅ ${noCount}❌ (${pending} pending)`;
    }

    // Call sendBrowserPush with CB51 branding
    await base44.asServiceRole.functions.invoke('sendBrowserPush', {
      recipient_email: managerEmail,
      title: `${memberName}: ${voteText}`,
      message: `${gigVenue}\n${statusText}`,
      notification_type: 'vote_update',
      gig_offer_id: gigId,
      icon: '/api/functions/serveCB51Icon',
      badge: '/api/functions/serveCB51Icon'
    }).catch(e => console.log('Push failed:', e.message));

    return Response.json({ success: true, yesCount, noCount, pending });
  } catch (error) {
    console.error('notifyManagerOnVote error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});