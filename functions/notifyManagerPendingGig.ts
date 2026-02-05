import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gigId, artistId, venueName, promoterName } = await req.json();

    if (!gigId || !artistId) {
      return Response.json({ error: 'Missing gigId or artistId' }, { status: 400 });
    }

    // Create notification record
    const notification = await base44.entities.PendingApproval.create({
      gig_id: gigId,
      artist_id: artistId,
      manager_id: user.id,
      venue_name: venueName,
      promoter_name: promoterName,
      status: 'pending_manager_review'
    });

    // Send browser push if subscribed
    try {
      const subscriptions = await base44.entities.ScottPushSubscription.filter({
        user_id: user.id
      });

      for (const sub of subscriptions) {
        const pushMessage = {
          title: `New Gig: ${venueName}`,
          body: `From ${promoterName} - needs approval`,
          icon: '/icon-192x192.png',
          badge: '/badge-72x72.png',
          tag: `gig-${gigId}`,
          data: {
            url: `/api/functions/notifyManagerPendingGig?id=${gigId}`,
            gigId
          }
        };

        try {
          // Send web push
          const response = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `key=${Deno.env.get('FCM_SERVER_KEY')}`
            },
            body: JSON.stringify({
              to: sub.endpoint,
              notification: pushMessage
            })
          });
        } catch (pushErr) {
          console.log('Push notification failed (non-critical):', pushErr.message);
        }
      }
    } catch (subErr) {
      console.log('Could not send push notifications');
    }

    return Response.json({
      success: true,
      notification
    });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});