import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gigOfferId, venueName, date, time, bandMemberEmails } = await req.json();

    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY');
    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY');

    if (!vapidPrivateKey || !vapidPublicKey) {
      return Response.json({ error: 'VAPID keys not configured' }, { status: 500 });
    }

    const webPush = await import('npm:web-push@3.6.7');
    webPush.setVapidDetails('mailto:notifications@cb51.io', vapidPublicKey, vapidPrivateKey);

    const results = [];

    for (const memberEmail of bandMemberEmails) {
      const subscriptions = await base44.entities.UserPushSubscription.filter({
        user_email: memberEmail
      });

      if (!subscriptions || subscriptions.length === 0) {
        results.push({ email: memberEmail, status: 'no_subscription' });
        continue;
      }

      const subscription = subscriptions[0];
      const payload = JSON.stringify({
        title: `Manager approved: ${venueName}`,
        body: `${date} @ ${time} - Are you in?`,
        icon: '/icon-192x192.png',
        tag: `band-vote-${gigOfferId}`,
        data: {
          gigOfferId,
          type: 'band_vote_request',
          venueName,
          date,
          time
        }
      });

      try {
        await webPush.sendNotification(subscription.subscription_json, payload);
        results.push({ email: memberEmail, status: 'sent' });
      } catch (pushError) {
        if (pushError.statusCode === 410) {
          await base44.entities.UserPushSubscription.delete(subscription.id);
        }
        results.push({ email: memberEmail, status: 'failed', error: pushError.message });
      }
    }

    return Response.json({ status: 'completed', results });
  } catch (error) {
    console.error('Band notification error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});