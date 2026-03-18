import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * DRAFT PROMOTER EMAIL
 * Auto-triggered when gig status = confirmed
 * Saves email draft to gig offer
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const { event, data } = payload;

    // Only trigger on status change to confirmed
    if (data?.status !== 'confirmed') {
      return Response.json({ skipped: true });
    }

    // Get gig offer
    const gigOffer = await base44.asServiceRole.entities.ScottGigOffer.get(data.id);

    // Check if already drafted
    if (gigOffer.ai_draft_accept) {
      return Response.json({ skipped: true, reason: 'Email already drafted' });
    }

    // Get artist name
    const artist = await base44.asServiceRole.entities.ScottArtist.get(gigOffer.artist_id);

    // Draft email
    const emailDraft = `Hi ${gigOffer.promoter || 'there'},

Great news - we can confirm ${artist.name} for ${gigOffer.venue} on ${new Date(gigOffer.date).toLocaleDateString('en-GB')}.

Fee: £${gigOffer.fee?.toLocaleString() || '?'}

Looking forward to it!

Best,
${gigOffer.created_by}`;

    // Save draft to gig offer
    await base44.asServiceRole.entities.ScottGigOffer.update(gigOffer.id, {
      ai_draft_accept: emailDraft,
      email_drafted_at: new Date().toISOString()
    });

    // Send email to manager with the draft
    try {
      await base44.asServiceRole.integrations.Core.SendEmail({
        from_name: 'CB51',
        to: gigOffer.created_by,
        subject: `✅ Gig Confirmed: ${gigOffer.venue}`,
        body: `Gig confirmed! Email draft ready:

━━━━━━━━━━━━━━━━━━━━

${emailDraft}

━━━━━━━━━━━━━━━━━━━━

Copy this and send to promoter when ready.

CB51 • Your AI Co-Manager`
      });
    } catch (e) {
      console.log('Email failed:', e);
    }

    return Response.json({ 
      success: true, 
      email_draft_created: true,
      gig: gigOffer.venue
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});