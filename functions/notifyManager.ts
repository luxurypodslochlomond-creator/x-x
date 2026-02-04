import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * NOTIFY MANAGER
 * Called when new gig offer extracted
 * Sends push notification to manager
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin only' }, { status: 403 });
    }

    const { offerId, venue, date } = await req.json();
    
    // Get manager's push subscriptions
    const subscriptions = await base44.entities.ScottPushSubscription.filter({
      enabled: true
    });
    
    if (subscriptions.length === 0) {
      return Response.json({ success: true, sent: 0 });
    }

    // Get manager email (assuming user is manager)
    const managerEmail = user.email;
    
    // Create ScottNotification - sendBrowserPush automation will send it
    await base44.asServiceRole.entities.ScottNotification.create({
      recipient_email: managerEmail,
      notification_type: 'new_gig',
      title: '🎸 New Gig Offer!',
      message: `${venue} • ${new Date(date).toLocaleDateString()}`,
      action_url: `/ScottGigOffers`,
      gig_offer_id: offerId,
      urgency: 'normal',
      read: false
    });
    
    const notifications = [true];
    
    return Response.json({ 
      success: true,
      sent: notifications.length
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});