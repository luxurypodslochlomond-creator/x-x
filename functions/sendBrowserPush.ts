import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import webpush from 'npm:web-push@3.6.7';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    // Get VAPID keys from environment or database
    let vapidPublic = Deno.env.get('VAPID_PUBLIC_KEY');
    let vapidPrivate = Deno.env.get('VAPID_PRIVATE_KEY');
    const vapidSubject = Deno.env.get('VAPID_SUBJECT') || 'mailto:scott@cb51.com';
    
    // Fallback to database if env vars not set
    if (!vapidPublic || !vapidPrivate) {
      const users = await base44.asServiceRole.entities.User.filter({});
      let adminUser = users.find(u => u.vapid_public_key);
      
      // Auto-generate keys if none exist
      if (!adminUser?.vapid_public_key || !adminUser?.vapid_private_key) {
        const generateResponse = await base44.asServiceRole.functions.invoke('generateVapidKeys', {});
        vapidPublic = generateResponse.data.publicKey;
        vapidPrivate = generateResponse.data.privateKey;
      } else {
        vapidPublic = adminUser.vapid_public_key;
        vapidPrivate = adminUser.vapid_private_key;
      }
    }

    webpush.setVapidDetails(vapidSubject, vapidPublic, vapidPrivate);
    
    // Only process newly created notifications
    if (payload.event?.type !== 'create') {
      return Response.json({ message: 'Not a create event, skipping' });
    }

    const notification = payload.data;
    if (!notification) {
      return Response.json({ error: 'No notification data' }, { status: 400 });
    }

    // Get all push subscriptions for this user
    const subscriptions = await base44.asServiceRole.entities.ScottPushSubscription.filter({
      user_email: notification.recipient_email
    });

    if (subscriptions.length === 0) {
      // No push subscriptions - send email fallback
      try {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: notification.recipient_email,
          subject: notification.title,
          body: `${notification.message}\n\n${notification.action_url ? `View: ${notification.action_url}` : ''}`
        });
        return Response.json({ message: 'No push subscriptions - email sent instead' });
      } catch (emailError) {
        console.error('Email fallback failed:', emailError);
        return Response.json({ message: 'No subscriptions and email failed', error: emailError.message });
      }
    }

    // Send push notification to all subscriptions
    const pushPayload = JSON.stringify({
      title: notification.title,
      body: notification.message,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      tag: notification.notification_type,
      data: {
        url: notification.action_url || '/cb51',
        notificationId: notification.id
      }
    });

    let sentCount = 0;
    let failedCount = 0;

    for (const sub of subscriptions) {
      try {
        await webpush.sendNotification(sub.subscription_data, pushPayload);
        sentCount++;
      } catch (error) {
        console.error(`Failed to send to subscription ${sub.id}:`, error);
        failedCount++;
        
        // Remove invalid subscriptions
        if (error.statusCode === 410 || error.statusCode === 404) {
          await base44.asServiceRole.entities.ScottPushSubscription.delete(sub.id);
        }
      }
    }

    return Response.json({
      success: true,
      sent: sentCount,
      failed: failedCount,
      notificationId: notification.id
    });

  } catch (error) {
    console.error('Error sending browser push:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});