import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

/**
 * NOTIFY BAND WHEN GIG OFFER ARRIVES
 * Called when a new gig offer is created
 * Sends push notification to all band members
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const {
      gigOfferId,
      artistId,
      venue,
      date,
      promoterName,
      fee
    } = await req.json();

    if (!gigOfferId || !artistId) {
      return Response.json(
        { error: 'Missing gigOfferId or artistId' },
        { status: 400 }
      );
    }

    // Get all band members for this artist
    const bandMembers = await base44.asServiceRole.entities.TeamMember.filter({
      artist_id: artistId,
      status: { $ne: 'inactive' }
    });

    if (!bandMembers || bandMembers.length === 0) {
      return Response.json({ sent: 0, message: 'No band members to notify' });
    }

    // Send push notification with YES/NO buttons + tokenised vote URL (no login needed)
    const notifyPromises = bandMembers.map(member => {
      const voteToken = btoa(`${gigOfferId}:${member.email}`);
      return base44.asServiceRole.functions.invoke('sendBandVoteNotification', {
        gigOfferId: gigOfferId,
        venue: venue,
        date: date,
        fee: fee,
        promoterName: promoterName,
        bandMemberEmail: member.email,
        voteUrl: `/CB51Vote?token=${voteToken}`
      }).catch(e => {
        console.log(`Failed to notify ${member.email}:`, e.message);
        return null;
      });
    });

    const results = await Promise.all(notifyPromises);
    const successful = results.filter(r => r && r.success).length;

    return Response.json({
      success: true,
      sent: successful,
      total: bandMembers.length,
      message: `Notified ${successful}/${bandMembers.length} band members`
    });

  } catch (error) {
    console.error('Band notification error:', error);
    return Response.json(
      { error: error.message || 'Failed to notify band' },
      { status: 500 }
    );
  }
});