import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * NOTIFY BAND: GIG CONFIRMED
 * When manager confirms gig, tell the band it's happening
 * Triggered by entity automation when ScottGigOffer.status = confirmed
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const { event, data } = payload;

    // Only process confirmed gigs
    if (data?.status !== 'confirmed') {
      return Response.json({ skipped: true });
    }

    const gigOffer = await base44.asServiceRole.entities.ScottGigOffer.get(data.id);
    const artist = await base44.asServiceRole.entities.ScottArtist.get(gigOffer.artist_id);

    // Get all band members
    const bandMembers = await base44.asServiceRole.entities.ScottTeamMember.filter({
      artist_id: gigOffer.artist_id
    });

    // Send "It's on!" notification to each band member
    const notificationPromises = bandMembers.map(member =>
      base44.asServiceRole.entities.ScottNotification.create({
        recipient_email: member.email,
        notification_type: 'band_confirmed',
        gig_offer_id: gigOffer.id,
        title: `✅ CONFIRMED: ${gigOffer.venue}`,
        message: `${artist.name} • ${gigOffer.date} • £${gigOffer.fee}`,
        action_url: `/pages/ScottCalendarView?id=${gigOffer.artist_id}`
      })
    );

    await Promise.all(notificationPromises);

    return Response.json({ 
      success: true, 
      type: 'band_confirmed_notifications_sent', 
      count: bandMembers.length 
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});