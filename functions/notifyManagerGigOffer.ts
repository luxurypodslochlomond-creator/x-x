import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { gigOfferId } = await req.json();

    if (!gigOfferId) {
      return Response.json({ error: 'gigOfferId required' }, { status: 400 });
    }

    const gig = await base44.entities.GigOffer.get(gigOfferId);
    if (!gig) {
      return Response.json({ error: 'GigOffer not found' }, { status: 404 });
    }

    const artist = await base44.entities.Artist.get(gig.artist_id);
    if (!artist) {
      return Response.json({ error: 'Artist not found' }, { status: 404 });
    }

    // Send email to manager
    await base44.integrations.Core.SendEmail({
      to: artist.primary_manager_email,
      subject: `New Gig Offer: ${gig.title}`,
      body: `
New gig offer received for ${artist.name}:

Festival: ${gig.title}
Location: ${gig.location}
Date: ${gig.date_start}
Fee: £${gig.fee || '0'}
Promoter: ${gig.promoter_name}

Details: ${gig.offer_details || 'No details provided'}

Review and approve/reject in CB51.
      `
    });

    return Response.json({ 
      status: 'Manager notified',
      gigId: gigOfferId,
      managerEmail: artist.primary_manager_email
    });
  } catch (error) {
    console.error('notifyManagerGigOffer error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});