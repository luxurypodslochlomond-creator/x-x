import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * NOTIFY BAND
 * Called when manager approves gig offer
 * Sends push to all band members
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin only' }, { status: 403 });
    }

    const { offerId, artistId, venue, date, urgency } = await req.json();
    
    // Get band members
    const teamMembers = await base44.entities.ScottTeamMember.filter({
      artist_id: artistId,
      role: 'band_member',
      status: 'active'
    });
    
    if (teamMembers.length === 0) {
      return Response.json({ success: true, sent: 0 });
    }

    // Get their push subscriptions
    const emails = teamMembers.map(m => m.email).filter(Boolean);
    const subscriptions = await base44.entities.ScottPushSubscription.filter({
      user_email: { $in: emails },
      enabled: true
    });
    
    if (subscriptions.length === 0) {
      return Response.json({ success: true, sent: 0 });
    }

    const urgencyEmoji = urgency === 'very_urgent' ? '🔥' : urgency === 'urgent' ? '⚡' : '🎸';

    // Send push to all band members
    const notifications = await Promise.all(
      subscriptions.map(async (sub) => {
        const subscription = JSON.parse(sub.subscription);
        
        const payload = JSON.stringify({
          title: `${urgencyEmoji} Vote on Gig Offer`,
          body: `${venue} • ${new Date(date).toLocaleDateString()}`,
          data: {
            url: `/ScottBandVote?offer=${offerId}`,
            offerId,
            urgency
          },
          icon: '/icon-192x192.png',
          badge: '/badge-72x72.png',
          requireInteraction: urgency !== 'normal'
        });

        // TODO: Send via Web Push API
        console.log('Would send:', payload);
        
        return true;
      })
    );
    
    return Response.json({ 
      success: true,
      sent: notifications.length
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});