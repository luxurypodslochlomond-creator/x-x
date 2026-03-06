import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gigId, artistId } = await req.json();

    if (!gigId || !artistId) {
      return Response.json({ error: 'Missing gigId or artistId' }, { status: 400 });
    }

    // Get existing gig first
    const gig = await base44.asServiceRole.entities.GigOffer.get(gigId);

    // Ensure venue is set (use title if venue is missing)
    if (!gig.venue) {
      gig.venue = gig.title;
    }

    // Validate gig belongs to this artist
    if (gig.artist_id !== artistId) {
      return Response.json({ error: 'Gig does not belong to this artist' }, { status: 403 });
    }

    // Check if artist has band members (solo artist = 0 members)
    const bandMembers = await base44.asServiceRole.entities.TeamMember.filter({
      artist_id: artistId
    });
    const isSoloArtist = bandMembers.length === 0;

    // Update: auto-complete if solo, else band_voting
    await base44.asServiceRole.entities.GigOffer.update(gigId, {
      ...gig,
      status: isSoloArtist ? 'confirmed' : 'band_voting'
    });

    // Create calendar event so it shows up
    await base44.asServiceRole.entities.Event.create({
      artist_id: artistId,
      title: gig.venue || gig.title || 'Gig',
      date: gig.date || gig.date_start || '',
      time: gig.time || gig.time_start || '',
      venue: gig.venue || '',
      location: gig.location || gig.city || '',
      promoter: gig.promoter_name || gig.promoter || '',
      promoter_phone: gig.promoter_phone || '',
      promoter_email: gig.promoter_email || '',
      fee: gig.fee || null,
      notes: gig.offer_details || gig.notes || ''
    });

    // Notify band members (skip if solo artist)
    if (!isSoloArtist) {
      try {
        await base44.asServiceRole.functions.invoke('notifyBandOnGigOffer', {
          gigOfferId: gigId,
          artistId: artistId,
          venue: gig.venue,
          date: gig.date_start,
          promoterName: gig.promoter_name,
          fee: gig.fee
        });
      } catch (err) {
        console.log('Band notification (non-critical):', err.message);
      }
    }

    return Response.json({
      status: 'success',
      message: isSoloArtist ? 'Gig confirmed (solo artist)' : 'Gig approved and band notified'
    });
  } catch (error) {
    console.error('Approve gig error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});