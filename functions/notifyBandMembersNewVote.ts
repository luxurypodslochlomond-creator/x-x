import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * AUTO-TRIGGERED when GigOffer status → "band_voting"
 * Sends push notification to all band members instantly
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { gigId, artistId } = await req.json();

    // Get gig details
    const gigs = await base44.asServiceRole.entities.GigOffer.filter({ id: gigId });
    const gig = gigs[0];
    
    if (!gig) {
      return Response.json({ error: 'Gig not found' }, { status: 404 });
    }

    // Get all band members for this artist
    const bandMembers = await base44.asServiceRole.entities.TeamMember.filter({
      artist_id: artistId,
      role: 'band_member',
      status: 'active'
    });

    if (bandMembers.length === 0) {
      return Response.json({ message: 'No band members to notify' });
    }

    // Get push subscriptions for each band member
    const subscriptions = [];
    for (const member of bandMembers) {
      const memberSubs = await base44.asServiceRole.entities.ScottPushSubscription.filter({
        user_email: member.email,
        is_active: true
      });
      subscriptions.push(...memberSubs);
    }

    if (subscriptions.length === 0) {
      console.log('No push subscriptions found for band members');
      return Response.json({ message: 'No push subscriptions' });
    }

    // Send push notification to all devices
    const pushPromises = subscriptions.map(sub => 
      base44.asServiceRole.functions.invoke('sendBrowserPush', {
        subscriptionId: sub.id,
        title: '🎸 New Gig to Vote On',
        body: `${gig.venue || gig.title} - ${gig.date_start || 'Date TBC'}`,
        data: {
          url: `/CB51BandVote?id=${gigId}`,
          gigId: gigId,
          type: 'gig_vote'
        }
      }).catch(err => {
        console.log(`Push failed for ${sub.user_email}:`, err.message);
        return null;
      })
    );

    await Promise.all(pushPromises);

    return Response.json({ 
      success: true, 
      notified: bandMembers.length,
      pushSent: subscriptions.length
    });

  } catch (error) {
    console.error('Notify band error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});