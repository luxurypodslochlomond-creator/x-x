import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import webpush from 'npm:web-push@3.6.7';

/**
 * SEND BAND VOTE NOTIFICATION
 * 
 * Scott's spec (from NOTIFICATIONS.pdf):
 * - Band member receives notification (push OR email)
 * - They see: OFFER DETAILS · GREEN YES / RED NO
 * - They tap YES or NO → manager notified instantly
 * - No login, no app, no friction
 * 
 * Delivery:
 * 1. Push notification (if they have CB51 PWA) — tapping opens /CB51Vote?token=xxx
 * 2. Email ALWAYS sent as fallback — big link to same page
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const {
      gigOfferId,
      venue,
      date,
      fee,
      promoterName,
      bandMemberEmail,
      bandMemberName
    } = await req.json();

    if (!gigOfferId || !bandMemberEmail) {
      return Response.json({ error: 'Missing gigOfferId or bandMemberEmail' }, { status: 400 });
    }

    // Build tokenised vote URL — no login needed, works from any phone
    const voteToken = btoa(`${gigOfferId}:${bandMemberEmail}`);
    const voteUrl = `https://uf51.app/CB51Vote?token=${voteToken}`;

    const gigSummary = [
      venue,
      date,
      fee ? `£${fee}` : null,
      promoterName ? `via ${promoterName}` : null
    ].filter(Boolean).join(' · ');

    const results = { push: null, email: null };

    // ── 1. PUSH NOTIFICATION (if subscribed) ──
    try {
      const subscriptions = await base44.asServiceRole.entities.UserPushSubscription.filter({
        user_email: bandMemberEmail,
        is_active: true
      });

      if (subscriptions && subscriptions.length > 0) {
        const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY');
        const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY');

        if (vapidPublicKey && vapidPrivateKey) {
          webpush.setVapidDetails('mailto:hello@cb51.io', vapidPublicKey, vapidPrivateKey);

          const payload = JSON.stringify({
            title: `🎸 GIG OFFER — ${venue || 'New Show'}`,
            body: `${gigSummary}\n\nTap to vote YES or NO`,
            icon: '/api/functions/serveCB51PNGIcon?size=192',
            badge: '/api/functions/serveCB51PNGMaskableIcon?size=192',
            tag: `cb51-gig-vote-${gigOfferId}`,
            requireInteraction: true,
            data: { gigOfferId, type: 'band_vote', url: voteUrl },
            actions: [
              { action: 'approve', title: '✅ YES' },
              { action: 'reject', title: '❌ NO' }
            ]
          });

          let pushSent = 0;
          for (const sub of subscriptions) {
            try {
              await webpush.sendNotification(JSON.parse(sub.subscription_data), payload);
              await base44.asServiceRole.entities.UserPushSubscription.update(sub.id, {
                notification_count: (sub.notification_count || 0) + 1,
                last_active: new Date().toISOString()
              });
              pushSent++;
            } catch (err) {
              if (err.statusCode === 410 || err.statusCode === 404) {
                await base44.asServiceRole.entities.UserPushSubscription.update(sub.id, { is_active: false });
              }
            }
          }
          results.push = { sent: pushSent, total: subscriptions.length };
        }
      } else {
        results.push = { sent: 0, total: 0, reason: 'no_subscription' };
      }
    } catch (e) {
      console.error('Push failed (non-fatal):', e.message);
      results.push = { sent: 0, error: e.message };
    }

    // ── 2. EMAIL — ALWAYS SENT (primary delivery for non-PWA users) ──
    try {
      const name = bandMemberName || bandMemberEmail.split('@')[0];
      
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: bandMemberEmail,
        from_name: 'CB51',
        subject: `🎸 Gig Offer — ${venue || 'New Show'}${date ? ' · ' + date : ''}`,
        body: `Hey ${name},

Your manager has a gig offer that needs your vote.

━━━━━━━━━━━━━━━━━━━━
${venue || 'Venue TBC'}${date ? '\n' + date : ''}${fee ? '\n£' + fee : ''}${promoterName ? '\nVia ' + promoterName : ''}
━━━━━━━━━━━━━━━━━━━━

Check your diary and vote here:

${voteUrl}

It takes 5 seconds. Your manager is waiting.

—
CB51 · hello@cb51.io`
      });
      results.email = { sent: true };
    } catch (e) {
      console.error('Email failed:', e.message);
      results.email = { sent: false, error: e.message };
    }

    return Response.json({
      success: true,
      push: results.push,
      email: results.email,
      voteUrl,
      message: `Vote link sent to ${bandMemberEmail}`
    });

  } catch (error) {
    console.error('sendBandVoteNotification error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});