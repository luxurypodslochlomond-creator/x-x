import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { gigId, bandMemberId, voteType, reason } = await req.json();

    if (!gigId) {
      return Response.json({ error: 'Missing gigId' }, { status: 400 });
    }

    // Get the gig
    const gigs = await base44.asServiceRole.entities.ScottGigOffer.filter({ id: gigId });
    const gig = gigs?.[0];
    if (!gig) {
      return Response.json({ error: 'Gig not found' }, { status: 404 });
    }

    // Get band member name
    const member = bandMemberId 
      ? await base44.asServiceRole.entities.ScottTeamMember.filter({ id: bandMemberId }).then(m => m?.[0])
      : null;

    // Get vote summary to show progress
    const votes = await base44.asServiceRole.entities.ScottBandResponse.filter({ 
      gig_offer_id: gigId 
    });

    const bandMembers = await base44.asServiceRole.entities.ScottTeamMember.filter({ 
      artist_access: { $in: [gig.artist_id] } 
    });

    const yesCount = votes.filter(v => v.vote === 'yes' || v.vote_type === 'yes').length;
    const noCount = votes.filter(v => v.vote === 'no' || v.vote_type === 'no').length;
    const pending = bandMembers.length - votes.length;

    // Build notification message
    const memberName = member?.name || 'Band member';
    const action = voteType === 'yes' ? '✅ said YES' : '❌ said NO';
    
    let reasonText = '';
    if (voteType === 'no' && reason) {
      reasonText = `\nReason: "${reason}"`;
    }

    const message = `${memberName} ${action} to ${gig.venue}\n${yesCount} YES • ${noCount} NO • ${pending} pending${reasonText}`;

    // ONLY notify manager when ALL votes are in (not after every single vote)
    const allVotesIn = (yesCount + noCount) === bandMembers.length;
    
    if (allVotesIn) {
      const artists = await base44.asServiceRole.entities.ScottArtist.filter({ id: gig.artist_id });
      const artist = artists?.[0];
      if (artist?.email || gig.manager_email) {
        try {
          // Create notification in CB51 inbox
          await base44.asServiceRole.entities.ScottNotification.create({
            artist_id: gig.artist_id,
            title: yesCount === bandMembers.length ? '✅ All YES - Ready to confirm!' : '⚠️ Mixed votes',
            message,
            type: 'votes_complete',
            gig_offer_id: gigId,
            read: false
          });
        } catch (pushErr) {
          console.error('Manager notification failed:', pushErr.message);
        }
      }
    }

    // All votes in - auto-confirm and sync to calendar
    let draftEmail = null;
    if (yesCount === bandMembers.length && bandMembers.length > 0 && allVotesIn) {
      try {
        // Auto-confirm gig
        await base44.asServiceRole.entities.ScottGigOffer.update(gigId, {
          status: 'confirmed'
        });

        // Sync to calendar
        await base44.asServiceRole.functions.invoke('syncGigToCalendar', {
          gigId,
          artistId: gig.artist_id
        });
      } catch (err) {
        console.log('Auto-confirm (non-critical):', err.message);
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