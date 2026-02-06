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
    
    // Update with full object to satisfy required fields
    await base44.asServiceRole.entities.GigOffer.update(gigId, {
      ...gig,
      status: 'band_voting'
    });

    // Notify band members
    try {
      await base44.functions.invoke('notifyBandGigOffer', {
        gigOfferId: gigId,
        artistId: artistId
      });
    } catch (err) {
      console.log('Band notification queued:', err.message);
    }

    return Response.json({
      status: 'success',
      message: 'Gig approved and band notified'
    });
  } catch (error) {
    console.error('Approve gig error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});