import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gigOfferId, managerEmail, venueName, date, time } = await req.json();

    // Get subscription for manager
    const subscriptions = await base44.entities.UserPushSubscription.filter({
      user_email: managerEmail
    });

    if (!subscriptions || subscriptions.length === 0) {
      return Response.json({ status: 'no_subscription' });
    }

    const subscription = subscriptions[0];
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY');
    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY');

    if (!vapidPrivateKey || !vapidPublicKey) {
      console.error('VAPID keys not configured');
      return Response.json({ error: 'VAPID keys not configured' }, { status: 500 });
    }

    const payload = JSON.stringify({
      title: `New Gig: ${venueName}`,
      body: `${date} @ ${time} - Confirm with band?`,
      icon: '/icon-192x192.png',
      tag: `gig-${gigOfferId}`,
      data: {
        gigOfferId,
        type: 'gig_offer',
        action: 'confirm'
      }
    });

    // Send push notification
    const webPush = await import('npm:web-push@3.6.7');
    webPush.setVapidDetails(
      'mailto:notifications@cb51.io',
      vapidPublicKey,
      vapidPrivateKey
    );

    try {
      await webPush.sendNotification(subscription.subscription_json, payload);
      return Response.json({ status: 'sent' });
    } catch (pushError) {
      if (pushError.statusCode === 410) {
        // Subscription expired, delete it
        await base44.entities.UserPushSubscription.delete(subscription.id);
      }
      throw pushError;
    }
  } catch (error) {
    console.error('Notification error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});