import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * DRAFT EMAIL TO PROMOTER - When gig confirmed
 * Creates email body Scott can review & send
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const { event, data } = payload;

    // Only trigger on confirmed status
    if (data?.status !== 'confirmed') {
      return Response.json({ skipped: true });
    }

    // Get gig offer
    const gigOffer = await base44.asServiceRole.entities.ScottGigOffer.get(data.id);
    
    // Get artist
    const artist = await base44.asServiceRole.entities.ScottArtist.get(gigOffer.artist_id);

    // Get band members
    const bandMembers = await base44.asServiceRole.entities.ScottBandMember.filter({
      artist_id: gigOffer.artist_id
    });

    // Draft email
    const emailBody = `Hi ${gigOffer.promoter_name},

Great news! ${artist.name} is confirmed for the gig at ${gigOffer.venue_name} on ${gigOffer.date}.

All band members are locked in and ready:
${bandMembers.map(m => `• ${m.name}`).join('\n')}

Fee: £${gigOffer.fee}

Looking forward to it!

${artist.name}`;

    // Save draft to gig offer
    await base44.asServiceRole.entities.ScottGigOffer.update(gigOffer.id, {
      promoter_email_draft: emailBody
    });

    return Response.json({ 
      success: true,
      draft_created: true,
      gig: gigOffer.venue_name
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});