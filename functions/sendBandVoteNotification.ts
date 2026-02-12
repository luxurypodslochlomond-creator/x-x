import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import webpush from 'npm:web-push@3.6.7';

/**
 * SEND BAND VOTE NOTIFICATION WITH YES/NO BUTTONS
 * This is the critical notification Scott needs for investment demo
 * Shows gig details + GREEN YES / RED NO buttons
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const {
      gigOfferId,
      venue,
      date,
      fee,
      promoterName,
      bandMemberEmail
    } = await req.json();

    if (!gigOfferId || !bandMemberEmail) {
      return Response.json({ error: 'Missing gigOfferId or bandMemberEmail' }, { status: 400 });
    }

    // Get band member's push subscriptions
    const subscriptions = await base44.asServiceRole.entities.UserPushSubscription.filter({
      user_email: bandMemberEmail,
      is_active: true
    });

    if (!subscriptions || subscriptions.length === 0) {
      return Response.json({ 
        success: false, 
        message: 'No active subscriptions for this user' 
      });
    }

    // Setup web-push with VAPID keys
    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY');
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY');

    if (!vapidPublicKey || !vapidPrivateKey) {
      return Response.json({ error: 'VAPID keys not configured' }, { status: 500 });
    }

    webpush.setVapidDetails(
      'mailto:support@universalfrequency51.com',
      vapidPublicKey,
      vapidPrivateKey
    );

    // Notification payload with ACTION BUTTONS
    const notificationPayload = {
      title: `🎸 GIG OFFER: ${venue || 'New Venue'}`,
      body: `${date}${fee ? ` • £${fee}` : ''}\n${promoterName || 'Promoter'}`,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      tag: `gig-vote-${gigOfferId}`,
      requireInteraction: true, // Keep notification visible until user acts
      data: {
        gigOfferId,
        type: 'band_vote',
        url: `/app/ScottBandVote?gigId=${gigOfferId}`
      },
      actions: [
        {
          action: 'approve',
          title: '✅ YES',
          icon: '/icon-192x192.png'
        },
        {
          action: 'reject',
          title: '❌ NO',
          icon: '/icon-192x192.png'
        }
      ]
    };

    // Send to all devices
    const sendPromises = subscriptions.map(async (sub) => {
      try {
        const subscription = JSON.parse(sub.subscription_data);
        await webpush.sendNotification(
          subscription,
          JSON.stringify(notificationPayload)
        );
        
        // Update notification count
        await base44.asServiceRole.entities.UserPushSubscription.update(sub.id, {
          notification_count: (sub.notification_count || 0) + 1,
          last_active: new Date().toISOString()
        });
        
        return { success: true };
      } catch (err) {
        console.error(`Failed to send to device:`, err);
        // Deactivate if subscription is invalid
        if (err.statusCode === 410 || err.statusCode === 404) {
          await base44.asServiceRole.entities.UserPushSubscription.update(sub.id, {
            is_active: false
          });
        }
        return { success: false, error: err.message };
      }
    });

    const results = await Promise.all(sendPromises);
    const successful = results.filter(r => r.success).length;

    return Response.json({
      success: successful > 0,
      sent: successful,
      total: subscriptions.length,
      message: `Sent notification to ${successful}/${subscriptions.length} devices`
    });

  } catch (error) {
    console.error('Band vote notification error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});