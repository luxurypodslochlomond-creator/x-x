import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * NOTIFY MANAGER - New gig offer created
 * Triggered by entity automation when gig offer is created
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const { event, data } = payload;

    // Get gig offer - handle entity automation payload
    let gigOffer;
    if (data?.id) {
      gigOffer = await base44.asServiceRole.entities.ScottGigOffer.get(data.id);
    } else {
      return Response.json({ error: 'No gig offer ID' }, { status: 400 });
    }

    // Only trigger on new gig creation (notify manager to review)
    if (event?.type !== 'create') {
      return Response.json({ skipped: true, reason: 'Not a create event' });
    }

    // Notify manager to review this new gig
    await base44.asServiceRole.entities.ScottNotification.create({
      recipient_email: gigOffer.created_by,
      notification_type: 'manager_gig_review',
      gig_offer_id: gigOffer.id,
      title: `🎸 NEW GIG: ${gigOffer.venue || 'Unnamed venue'}`,
      message: `${gigOffer.date || 'No date'} • £${gigOffer.fee?.toLocaleString() || '?'} • Review in CB51`,
      action_url: `/CB51`
    });

    // Send email to manager
    try {
      await base44.asServiceRole.integrations.Core.SendEmail({
        from_name: 'CB51',
        to: gigOffer.created_by,
        subject: `🎸 New Gig: ${gigOffer.venue}`,
        body: `New gig offer:

${gigOffer.venue}
${gigOffer.date || 'No date'}
Fee: £${gigOffer.fee?.toLocaleString() || '?'}

Review in CB51 → https://app.base44.com/CB51

CB51 • Your AI Co-Manager`
      });
    } catch (e) {
      console.log('Email failed:', e);
    }

    return Response.json({ 
      success: true,
      manager_notified: true,
      gig: gigOffer.venue
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});