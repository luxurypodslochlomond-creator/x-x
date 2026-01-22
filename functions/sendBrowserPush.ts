import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import webpush from 'npm:web-push@3.6.7';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    // Get VAPID keys from database
    const users = await base44.asServiceRole.entities.User.filter({});
    const adminUser = users.find(u => u.vapid_public_key);
    
    if (!adminUser?.vapid_public_key || !adminUser?.vapid_private_key) {
      return Response.json({ 
        error: 'VAPID keys not set up. Call /api/generateVapidKeys first' 
      }, { status: 500 });
    }

    webpush.setVapidDetails(
      'mailto:scott@uf51.com',
      adminUser.vapid_public_key,
      adminUser.vapid_private_key
    );
    
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
      return Response.json({ message: 'No subscriptions found for user' });
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