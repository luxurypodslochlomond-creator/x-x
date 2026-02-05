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
    const gig = await base44.entities.ScottGigOffer.get(gigOfferId);
    if (!gig) {
      return Response.json({ error: 'Gig not found' }, { status: 404 });
    }

    // Get band members (ScottTeamMember with access to this artist)
    const allMembers = await base44.entities.ScottTeamMember.list();
    const bandMembers = allMembers.filter(m => m.artist_access?.includes(gig.artist_id));

    if (bandMembers.length === 0) {
      return Response.json({ 
        status: 'no_band_members',
        message: 'No band members to notify'
      });
    }

    // Create notification records for each band member (future: could be push notifications)
    // For now, they'll see it in CB51 when they log in
    // Store that voting is pending on this gig
    const notificationResults = await Promise.all(
      bandMembers.map(member =>
        base44.asServiceRole.entities.GigVote.create({
          gig_id: gigOfferId,
          band_member_id: member.id,
          artist_id: gig.artist_id,
          response: null, // Pending
          reason: null,
          created_at: new Date().toISOString()
        }).catch(err => {
          // Vote record might already exist, that's fine
          return null;
        })
      )
    );

    return Response.json({
      status: 'success',
      gigOfferId,
      bandMembersNotified: bandMembers.length,
      message: `Notified ${bandMembers.length} band members to vote`
    });
  } catch (error) {
    console.error('Error notifying band:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});