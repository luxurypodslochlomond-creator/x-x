import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * HANDLE BAND VOTE FROM NOTIFICATION
 * Called when band member clicks YES or NO on push notification
 * Records vote + notifies manager
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gigOfferId, vote, reason } = await req.json();

    if (!gigOfferId || !vote) {
      return Response.json({ error: 'Missing gigOfferId or vote' }, { status: 400 });
    }

    // Get gig details
    const gig = await base44.asServiceRole.entities.GigOffer.get(gigOfferId);

    if (!gig) {
      return Response.json({ error: 'Gig not found' }, { status: 404 });
    }

    // Get band member details
    const bandMember = await base44.asServiceRole.entities.TeamMember.filter({
      email: user.email,
      artist_id: gig.artist_id
    });

    if (!bandMember || bandMember.length === 0) {
      return Response.json({ error: 'Not a band member' }, { status: 403 });
    }

    const member = bandMember[0];

    // Check if already voted
    const existingVote = await base44.asServiceRole.entities.GigVote.filter({
      gig_id: gigOfferId,
      voted_by_role: 'band_member',
      created_by: user.email
    });

    if (existingVote && existingVote.length > 0) {
      // Update existing vote
      await base44.asServiceRole.entities.GigVote.update(existingVote[0].id, {
        vote_type: vote,
        reason: reason || null,
        voted_at: new Date().toISOString()
      });
    } else {
      // Create new vote
      await base44.asServiceRole.entities.GigVote.create({
        gig_id: gigOfferId,
        voted_by_role: 'band_member',
        vote_type: vote,
        reason: reason || null,
        voted_at: new Date().toISOString()
      });
    }

    // Get all votes for this gig
    const allVotes = await base44.asServiceRole.entities.GigVote.filter({
      gig_id: gigOfferId,
      voted_by_role: 'band_member'
    });

    // Get total band members
    const allBandMembers = await base44.asServiceRole.entities.TeamMember.filter({
      artist_id: gig.artist_id,
      status: { $ne: 'inactive' }
    });

    const yesVotes = allVotes.filter(v => v.vote_type === 'yes').length;
    const noVotes = allVotes.filter(v => v.vote_type === 'no').length;
    const totalMembers = allBandMembers.length;
    const allVotedYes = yesVotes === totalMembers && noVotes === 0;

    // Notify manager about vote
    const manager = await base44.asServiceRole.entities.User.filter({
      email: gig.created_by
    });

    if (manager && manager.length > 0) {
      const managerSubscriptions = await base44.asServiceRole.entities.UserPushSubscription.filter({
        user_email: manager[0].email,
        is_active: true
      });

      if (managerSubscriptions.length > 0) {
        const notificationTitle = allVotedYes 
          ? `✅ ${gig.venue} - ALL YES!`
          : vote === 'no'
            ? `❌ ${member.name} voted NO`
            : `✅ ${member.name} voted YES`;

        const notificationBody = allVotedYes
          ? `Band confirmed! You can email the promoter.`
          : `${yesVotes}/${totalMembers} YES • ${noVotes}/${totalMembers} NO`;

        await base44.asServiceRole.functions.invoke('sendManagerNotification', {
          managerEmail: manager[0].email,
          title: notificationTitle,
          body: notificationBody,
          gigOfferId: gigOfferId,
          allConfirmed: allVotedYes
        });
      }
    }

    // If all voted yes, update gig status
    if (allVotedYes) {
      await base44.asServiceRole.entities.GigOffer.update(gigOfferId, {
        status: 'confirmed'
      });
    }

    return Response.json({
      success: true,
      vote: vote,
      allVotedYes: allVotedYes,
      voteCount: { yes: yesVotes, no: noVotes, total: totalMembers },
      message: allVotedYes ? 'Gig confirmed!' : 'Vote recorded'
    });

  } catch (error) {
    console.error('Vote action error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});