import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gigOfferId } = await req.json();

    if (!gigOfferId) {
      return Response.json({ error: 'Missing gigOfferId' }, { status: 400 });
    }

    // Get the gig offer
    const gig = await base44.entities.GigOffer.get(gigOfferId);
    if (!gig) {
      return Response.json({ error: 'Gig not found' }, { status: 404 });
    }

    // Get band members for this artist
    const bandMembers = await base44.asServiceRole.entities.TeamMember.filter({ artist_id: gig.artist_id });

    if (bandMembers.length === 0) {
      return Response.json({ 
        status: 'no_band_members',
        message: 'No band members to notify'
      });
    }

    // Send push notification to each band member
    const pushResults = await Promise.all(
      bandMembers.map(async (member) => {
        if (!member.email) return null;
        
        try {
          await base44.asServiceRole.functions.invoke('sendBrowserPush', {
            recipient_email: member.email,
            title: '🎸 Vote on Gig',
            message: `${gig.venue || 'New gig'} - Manager approved`,
            notification_type: 'band_vote_request',
            gig_offer_id: gigOfferId
          });
          return { success: true, email: member.email };
        } catch (err) {
          console.error(`Failed to notify ${member.email}:`, err.message);
          return { success: false, email: member.email };
        }
      })
    );

    const successCount = pushResults.filter(r => r?.success).length;

    return Response.json({
      status: 'success',
      gigOfferId,
      bandMembersNotified: successCount,
      message: `Notified ${successCount}/${bandMembers.length} band members to vote`
    });
  } catch (error) {
    console.error('Error notifying band:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});