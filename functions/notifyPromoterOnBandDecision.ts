import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * NOTIFY PROMOTER WHEN BAND VOTES ON GIG OFFER
 * Called when band approves or rejects - tells promoter the result
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const {
      gigOfferId,
      promoterEmail,
      artistName,
      decision,
      rejectionReason
    } = await req.json();

    if (!gigOfferId || !promoterEmail || !decision) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const title = decision === 'approved' 
      ? `✅ ${artistName} ACCEPTED YOUR GIG`
      : `❌ ${artistName} declined your offer`;

    const message = decision === 'approved'
      ? 'They said YES! Next steps coming soon.'
      : rejectionReason || 'They had to pass this time.';

    // Send to promoter via email + push if they have subscription
    try {
      await base44.asServiceRole.functions.invoke('sendBrowserPush', {
        recipient_email: promoterEmail,
        title,
        message,
        notification_type: 'gig_decision',
        gig_offer_id: gigOfferId
      }).catch(() => null); // Push is optional
    } catch (e) {
      console.log('Push to promoter failed (non-critical):', e.message);
    }

    // Email the promoter
    try {
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: promoterEmail,
        subject: title,
        body: `${message}\n\nGig ID: ${gigOfferId}`
      });
    } catch (e) {
      console.log('Email to promoter failed:', e.message);
    }

    return Response.json({
      success: true,
      notified: promoterEmail,
      decision
    });

  } catch (error) {
    console.error('Promoter notification error:', error);
    return Response.json(
      { error: error.message || 'Failed to notify promoter' },
      { status: 500 }
    );
  }
});