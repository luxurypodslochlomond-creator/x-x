import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import webpush from 'npm:web-push@3.6.7';

/**
 * SEND BROWSER PUSH NOTIFICATION
 * Uses Web Push Protocol + VAPID keys to send real push notifications
 * No third-party service needed - standard web protocol
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Get authenticated user — no email needed from frontend
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ 
        error: 'Unauthorized' 
      }, { status: 401 });
    }
    
    const { 
      title, 
      message, 
      notification_type,
      gig_offer_id,
      icon,
      badge,
      brand
    } = await req.json();
    
    // Auto-detect brand if not provided (for gig notifications)
    const detectedBrand = brand || (gig_offer_id ? 'cb51' : null);
    const recipient_email = user.email;

    if (!title || !message) {
      return Response.json({ 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Get VAPID keys
    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY');
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY');

    if (!vapidPublicKey || !vapidPrivateKey) {
      console.warn('VAPID keys not configured');
      return Response.json({ 
        success: true, 
        message: 'VAPID not configured - notifications skipped',
        sent: 0 
      });
    }

    // Set VAPID keys for web-push
    try {
      webpush.setVapidDetails(
        'mailto:noreply@cb51.io',
        vapidPublicKey,
        vapidPrivateKey
      );
    } catch (e) {
      console.error('VAPID validation error:', e.message);
      console.error('Public key length:', vapidPublicKey?.length);
      console.error('Private key length:', vapidPrivateKey?.length);
      return Response.json({ 
        error: `VAPID configuration invalid: ${e.message}`,
        debug: { publicLength: vapidPublicKey?.length, privateLength: vapidPrivateKey?.length }
      }, { status: 500 });
    }

    // 1. Find all active subscriptions for this user — single source of truth
    const subscriptions = await base44.asServiceRole.entities.UserPushSubscription.filter({
      user_email: recipient_email,
      is_active: true
    });

    if (!subscriptions || subscriptions.length === 0) {
      return Response.json({ 
        success: true, 
        message: 'No active subscriptions',
        sent: 0 
      });
    }

    // 2. Build payload - ALWAYS use CB51 PNG endpoints for icon rendering
    const isGigNotification = !!gig_offer_id;
    const isCB51Brand = brand === 'cb51' || isGigNotification;
    const cacheBust = Math.floor(Date.now() / 60000); // Cache-bust every minute
    
    const payload = JSON.stringify({
      title,
      body: message,
      icon: isCB51Brand ? `/api/functions/serveCB51PNGIcon?v=${cacheBust}` : (icon || '/icon-192x192.png'),
      badge: isCB51Brand ? `/api/functions/serveCB51PNGMaskableIcon?v=${cacheBust}` : (badge || '/icon-192x192.png'),
      tag: `cb51-${gig_offer_id || Date.now()}`,
      data: {
        notification_type,
        gigOfferId: gig_offer_id,  // camelCase to match SW handler
        timestamp: new Date().toISOString(),
        url: '/CB51'
      },
      requireInteraction: true,
      vibrate: [200, 100, 200],
      // Include approve/reject actions for gig offer notifications
      actions: isGigNotification ? [
        { action: 'approve', title: 'Yes' },
        { action: 'reject', title: 'No' }
      ] : []
    });

    // 3. Send to each subscribed device in parallel
    const sendPromises = subscriptions.map(async (sub) => {
      try {
        const subData = typeof sub.subscription_data === 'string' 
          ? JSON.parse(sub.subscription_data) 
          : sub.subscription_data;

        await webpush.sendNotification(subData, payload);
        
        console.log(`✓ Push sent to ${recipient_email}`);
        return { success: true, recipient: recipient_email };
      } catch (e) {
        // 410 Gone or 404 = subscription expired/revoked — clean it up
        if (e.statusCode === 410 || e.statusCode === 404) {
          console.log(`Stale subscription for ${sub.user_email} — deactivating`);
          await base44.asServiceRole.entities.UserPushSubscription.update(sub.id, { is_active: false });
        } else {
          console.error(`✕ Push to ${sub.user_email} failed: ${e.message}`);
        }
        return { success: false, recipient: sub.user_email, error: e.message };
      }
    });

    const results = await Promise.allSettled(sendPromises);
    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length;

    return Response.json({
      success: true,
      sent: successful,
      total: subscriptions.length,
      message: `Pushed to ${successful}/${subscriptions.length} devices`
    });

  } catch (error) {
    console.error('Browser push error:', error);
    return Response.json({ 
      error: error.message || 'Failed to send push notification'
    }, { status: 500 });
  }
});