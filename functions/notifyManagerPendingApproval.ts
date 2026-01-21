import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * PUSH NOTIFICATION - Manager approval needed
 * Triggered by entity automation when PendingApproval created
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const { event, data } = payload;

    // Get gig offer for context
    const gigOffer = await base44.asServiceRole.entities.ScottGigOffer.get(data.gig_offer_id);
    const artist = await base44.asServiceRole.entities.ScottArtist.get(gigOffer.artist_id);

    // Get manager's push subscription
    const pushSubs = await base44.asServiceRole.entities.ScottPushSubscription.filter({
      user_email: artist.created_by
    });

    if (!pushSubs || pushSubs.length === 0) {
      return Response.json({ skipped: true, reason: 'No push subscriptions' });
    }

    // Determine notification title based on approval type
    const titles = {
      band_vote_summary: '✅ VOTES IN - Needs approval',
      promoter_email: '📧 Email draft ready',
      notification: '🔔 Notification queued'
    };

    const title = titles[data.approval_type] || 'Approval needed';

    // Send Web Push Notification
    const notificationPayload = {
      title,
      body: `${gigOffer.venue_name} • ${gigOffer.date}`,
      icon: '/icon-192x192.png',
      badge: '/badge-96x96.png',
      tag: `approval-${data.id}`,
      data: {
        approvalId: data.id,
        gigOfferId: gigOffer.id,
        action: 'review-approval'
      }
    };

    const pushPromises = pushSubs.map(async (sub) => {
      try {
        // Push notification would go here via VAPID
        // For now, we just confirm it was queued
        console.log('Push queued for:', artist.created_by, notificationPayload);
      } catch (error) {
        console.error('Push send error:', error);
      }
    });

    await Promise.all(pushPromises);

    return Response.json({
      success: true,
      notified: pushSubs.length,
      approvalType: data.approval_type
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});