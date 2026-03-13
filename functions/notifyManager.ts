import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * NOTIFY MANAGER
 * Generic - works for any artist's manager
 * Called when new gig offer extracted
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin only' }, { status: 403 });
    }

    const { offerId, venue, date } = await req.json();
    
    const managerEmail = user.email;
    
    // Create generic Notification record
    await base44.asServiceRole.entities.Notification.create({
      recipient_email: managerEmail,
      notification_type: 'new_gig',
      title: '🎸 New Gig Offer!',
      message: `${venue} • ${new Date(date).toLocaleDateString()}`,
      action_url: `/CB51`,
      gig_offer_id: offerId,
      urgency: 'normal',
      read: false
    });

    // Also send push notification
    try {
      await base44.asServiceRole.functions.invoke('sendBrowserPush', {
        recipient_email: managerEmail,
        title: '🎸 New Gig Offer!',
        message: `${venue} • ${new Date(date).toLocaleDateString()}`,
        notification_type: 'new_gig',
        gig_offer_id: offerId
      });
    } catch (pushErr) {
      console.log('Push failed (non-critical):', pushErr.message);
    }
    
    return Response.json({ 
      success: true,
      sent: 1
    });

  } catch (error) {
    console.error('notifyManager error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});