import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gigOfferId, managerEmail, venueName, date, promoterEmail } = await req.json();

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

    const payload = JSON.stringify({
      title: `🎉 All Confirmed: ${venueName}`,
      body: `${date} - CB51 will send acceptance email + add to calendars`,
      icon: '/icon-192x192.png',
      tag: `confirmed-${gigOfferId}`,
      data: {
        gigOfferId,
        type: 'all_confirmed',
        venueName,
        date,
        promoterEmail
      }
    });

    const webPush = await import('npm:web-push@3.6.7');
    webPush.setVapidDetails('mailto:notifications@cb51.io', vapidPublicKey, vapidPrivateKey);

    try {
      await webPush.sendNotification(subscription.subscription_json, payload);
      
      // Auto-reply to promoter
      await base44.functions.invoke('sendPromoterConfirmationEmail', {
        gigOfferId,
        venueName,
        date,
        promoterEmail,
        managerEmail
      });

      return Response.json({ status: 'sent_and_confirmed' });
    } catch (pushError) {
      if (pushError.statusCode === 410) {
        await base44.entities.UserPushSubscription.delete(subscription.id);
      }
      throw pushError;
    }
  } catch (error) {
    console.error('Confirmation notification error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});