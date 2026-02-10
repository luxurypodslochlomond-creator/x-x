import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * MANAGER VOTES YES → Band gets notification
 * MANAGER VOTES NO → Documented, no band notify
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gig_id, vote_type } = await req.json();

    // Record manager vote
    await base44.entities.GigVote.create({
      gig_id,
      voted_by_role: 'manager',
      vote_type,
      voted_at: new Date().toISOString()
    });

    console.log(`✓ Manager voted ${vote_type} on gig ${gig_id}`);

    // If manager said YES → notify band members
    if (vote_type === 'yes') {
      const gig = await base44.entities.GigOffer.get(gig_id).catch(() => null);
      
      if (gig) {
        // Get band members for this artist
        const bandMembers = await base44.entities.BandMember.filter({
          artist_id: gig.artist_id
        });

        console.log(`Notifying ${bandMembers.length} band members`);

        // Send each band member the notification (browser push)
        for (const member of bandMembers) {
          try {
            await base44.functions.invoke('sendCB51Notification', {
              title: `🎸 ${gig.venue || 'GIG OFFER'} - YES or NO?`,
              body: `${gig.date} • £${gig.fee}`,
              tag: `gig-vote-${gig_id}`,
              url: `/CB51?tab=gig-vote&gig=${gig_id}`
            });
          } catch (e) {
            console.log(`Notification for ${member.email} failed (non-critical):`, e);
          }
        }
      }
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Manager vote error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});