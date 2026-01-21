import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * NOTIFY BAND - Push notification when manager sends gig offer
 * Triggered by entity automation when gig status = sent_to_band
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const { event, data } = payload;

    // Only trigger on sent_to_band status change
    if (data?.status !== 'sent_to_band') {
      return Response.json({ skipped: true });
    }

    // Get gig offer details
    const gigOffer = await base44.asServiceRole.entities.ScottGigOffer.get(data.id);
    
    // Get artist to find band members
    const artist = await base44.asServiceRole.entities.ScottArtist.get(gigOffer.artist_id);
    
    // Get band members
    const bandMembers = await base44.asServiceRole.entities.ScottBandMemember.filter({
      artist_id: gigOffer.artist_id
    });

    if (!bandMembers || bandMembers.length === 0) {
      return Response.json({ error: 'No band members found' }, { status: 400 });
    }

    // Create push notifications for each band member
    const notificationPromises = bandMembers.map(member => 
      base44.asServiceRole.entities.ScottNotification.create({
        recipient_email: member.email,
        notification_type: 'band_gig_offer',
        gig_offer_id: gigOffer.id,
        title: `VOTE: ${gigOffer.venue_name}`,
        message: `${artist.name} • ${gigOffer.date} • £${gigOffer.fee}`,
        decision_button: 'yes',
        action_url: `/pages/ScottBandVote?gig=${gigOffer.id}`
      })
    );

    await Promise.all(notificationPromises);

    // Create ScottBandResponse records with pending status for each member
    const responsePromises = bandMembers.map(member =>
      base44.asServiceRole.entities.ScottBandResponse.create({
        gig_offer_id: gigOffer.id,
        band_member_email: member.email,
        band_member_name: member.name,
        decision: 'pending',
        notification_sent_at: new Date().toISOString()
      })
    );

    await Promise.all(responsePromises);

    return Response.json({ 
      success: true,
      notified: bandMembers.length,
      gig: gigOffer.venue_name
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});