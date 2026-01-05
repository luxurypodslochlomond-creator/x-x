import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * NOTIFY MANAGER ALL VOTES IN
 * Grouped notification when all band members voted
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin only' }, { status: 403 });
    }

    const { offerId, venue, allYes } = await req.json();
    
    // Get manager's push subscriptions
    const subscriptions = await base44.entities.ScottPushSubscription.filter({
      enabled: true
    });
    
    if (subscriptions.length === 0) {
      return Response.json({ success: true, sent: 0 });
    }

    const result = allYes ? '✅ All YES' : '⚠️ Mixed Votes';

    // Send grouped notification
    const notifications = await Promise.all(
      subscriptions.map(async (sub) => {
        const subscription = JSON.parse(sub.subscription);
        
        const payload = JSON.stringify({
          title: `${result} - Band Voted`,
          body: `${venue} - Ready to respond`,
          data: {
            url: `/ScottGigOffers`,
            offerId
          },
          icon: '/icon-192x192.png',
          badge: '/badge-72x72.png',
          requireInteraction: true
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