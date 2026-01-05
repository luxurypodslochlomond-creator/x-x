import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * AUTO-CREATE CALENDAR EVENT
 * When gig is confirmed → create calendar event for the show
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { offerId } = await req.json();

    // Get offer details
    const offers = await base44.entities.ScottGigOffer.filter({ id: offerId });
    if (!offers || offers.length === 0) {
      return Response.json({ error: 'Offer not found' }, { status: 404 });
    }

    const offer = offers[0];

    // Create calendar event
    const event = await base44.entities.ScottEvent.create({
      artist_id: offer.artist_id,
      title: offer.venue,
      event_type: 'gig',
      location: `${offer.venue}, ${offer.city}, ${offer.county}, ${offer.country}`,
      date: offer.date,
      time: offer.time,
      status: 'confirmed',
      fee: offer.fee,
      currency: offer.currency,
      promoter: offer.promoter,
      promoter_contact: offer.promoter_contact,
      notes: offer.notes,
      gig_offer_id: offer.id
    });

    return Response.json({ 
      success: true, 
      eventId: event.id,
      message: 'Calendar event created'
    });

  } catch (error) {
    console.error('Calendar creation error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});