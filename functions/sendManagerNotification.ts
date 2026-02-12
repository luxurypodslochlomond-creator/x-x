import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import webpush from 'npm:web-push@3.6.7';

/**
 * SEND NOTIFICATION TO MANAGER
 * When band votes complete or individual votes come in
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const {
      managerEmail,
      title,
      body,
      gigOfferId,
      allConfirmed
    } = await req.json();

    if (!managerEmail || !title || !body) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get manager's push subscriptions
    const subscriptions = await base44.asServiceRole.entities.UserPushSubscription.filter({
      user_email: managerEmail,
      is_active: true
    });

    if (!subscriptions || subscriptions.length === 0) {
      return Response.json({ 
        success: false, 
        message: 'No active subscriptions for manager' 
      });
    }

    // Setup web-push
    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY');
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY');

    webpush.setVapidDetails(
      'mailto:support@universalfrequency51.com',
      vapidPublicKey,
      vapidPrivateKey
    );

    // Notification payload
    const notificationPayload = {
      title: title,
      body: body,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      tag: `manager-update-${gigOfferId}`,
      requireInteraction: allConfirmed, // Keep visible if all confirmed
      data: {
        gigOfferId,
        type: 'manager_update',
        url: allConfirmed 
          ? `/app/CB51DraftEmails?gigId=${gigOfferId}`
          : `/app/CB51BandVotingDashboard?id=${gigOfferId}`
      },
      actions: allConfirmed ? [
        {
          action: 'view_draft',
          title: '📧 View Draft Email',
          icon: '/icon-192x192.png'
        }
      ] : []
    };

    // Send to all manager devices
    const sendPromises = subscriptions.map(async (sub) => {
      try {
        const subscription = JSON.parse(sub.subscription_data);
        await webpush.sendNotification(
          subscription,
          JSON.stringify(notificationPayload)
        );
        
        await base44.asServiceRole.entities.UserPushSubscription.update(sub.id, {
          notification_count: (sub.notification_count || 0) + 1,
          last_active: new Date().toISOString()
        });
        
        return { success: true };
      } catch (err) {
        console.error(`Failed to send to manager device:`, err);
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
      total: subscriptions.length
    });

  } catch (error) {
    console.error('Manager notification error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});