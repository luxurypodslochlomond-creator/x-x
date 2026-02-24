import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gigOfferId, yesCount, noCount, noResponses, managerEmail } = await req.json();

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
      return Response.json({ error: 'VAPID keys not configured' }, { status: 500 });
    }

    let messageBody = '';
    if (noCount === 0) {
      messageBody = `All ${yesCount} confirmed! ✅`;
    } else if (noCount > 0) {
      const noNames = noResponses.map(v => v.voter_email.split('@')[0]).join(', ');
      messageBody = `${yesCount} YES, ${noCount} NO from ${noNames}`;
    }

    const payload = JSON.stringify({
      title: `Vote Update: Gig ${gigOfferId}`,
      body: messageBody,
      icon: '/icon-192x192.png',
      tag: `vote-tally-${gigOfferId}`,
      data: {
        gigOfferId,
        type: 'vote_tally',
        yesCount,
        noCount
      }
    });

    const webPush = await import('npm:web-push@3.6.7');
    webPush.setVapidDetails('mailto:notifications@cb51.io', vapidPublicKey, vapidPrivateKey);

    try {
      await webPush.sendNotification(subscription.subscription_json, payload);
      return Response.json({ status: 'sent' });
    } catch (pushError) {
      if (pushError.statusCode === 410) {
        await base44.entities.UserPushSubscription.delete(subscription.id);
      }
      throw pushError;
    }
  } catch (error) {
    console.error('Tally notification error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});