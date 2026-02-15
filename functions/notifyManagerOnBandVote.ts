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

    // Send push notification to manager
    const artist = await base44.asServiceRole.entities.Artist.get(gig.artist_id);
    if (artist?.primary_manager_email) {
      try {
        await base44.asServiceRole.functions.invoke('sendBrowserPush', {
          recipient_email: artist.primary_manager_email,
          title: allVotesIn ? '✅ All Votes In!' : '📊 Band Vote Update',
          message,
          notification_type: allVotesIn ? 'votes_complete' : 'vote_update',
          gig_offer_id: gigId
        });
      } catch (pushErr) {
        console.error('Manager push notification failed:', pushErr.message);
      }
    }

    // If all votes are YES, generate draft confirmation email
    let draftEmail = null;
    const allVotesIn = (yesCount + noCount) === bandMembers.length;
    if (yesCount === bandMembers.length && bandMembers.length > 0) {
      try {
        const emailRes = await base44.asServiceRole.functions.invoke('generateGigConfirmationEmail', {
          gigId: gigId,
          artistId: gig.artist_id
        });
        draftEmail = emailRes.data?.draft || emailRes.draft;
      } catch (emailErr) {
        console.log('Draft email generation (non-critical):', emailErr.message);
      }
    }

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
      },
      draftEmail: draftEmail
    });
  } catch (error) {
    console.error('Band vote notification error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});