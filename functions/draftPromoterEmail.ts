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
    if (gigOffer.promoter_email_draft) {
      return Response.json({ skipped: true, reason: 'Email already drafted' });
    }

    // Get artist name
    const artist = await base44.asServiceRole.entities.ScottArtist.get(gigOffer.artist_id);

    // Draft email
    const emailDraft = `Hi ${gigOffer.promoter_name || 'there'},

Great news - we can confirm ${artist.name} for ${gigOffer.venue || gigOffer.venue_name} on ${new Date(gigOffer.date).toLocaleDateString('en-GB')}.

Fee: £${gigOffer.fee?.toLocaleString() || '?'}

Looking forward to it!

Best,
${gigOffer.created_by}`;

    // Save draft to gig offer
    await base44.asServiceRole.entities.ScottGigOffer.update(gigOffer.id, {
      promoter_email_draft: emailDraft,
      email_drafted_at: new Date().toISOString()
    });

    return Response.json({ 
      success: true, 
      email_draft_created: true,
      gig: gigOffer.venue || gigOffer.venue_name
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});