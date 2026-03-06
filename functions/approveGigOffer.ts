import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gigId, artistId, gigData } = await req.json();

    if (!gigId || !artistId) {
      return Response.json({ error: 'Missing gigId or artistId' }, { status: 400 });
    }

    // Use gigData passed from frontend (avoids RLS issues with asServiceRole fetch)
    // Fall back to user-scoped fetch if gigData not provided
    let gig = gigData;
    if (!gig) {
      gig = await base44.entities.GigOffer.get(gigId);
    }

    if (!gig) {
      return Response.json({ error: 'Gig not found' }, { status: 404 });
    }

    // Ensure venue is set
    if (!gig.venue) gig.venue = gig.title || 'Untitled Gig';

    // Check if artist has band members (solo artist = 0 members)
    const bandMembers = await base44.asServiceRole.entities.TeamMember.filter({
      artist_id: artistId
    });
    const isSoloArtist = bandMembers.length === 0;

    // Update: auto-complete if solo, else band_voting
    await base44.asServiceRole.entities.GigOffer.update(gigId, {
      status: isSoloArtist ? 'confirmed' : 'band_voting',
      manager_approved: true
    });

    // CREATE EVENT (Calendar)
    const existingEvents = await base44.asServiceRole.entities.Event.filter({
      artist_id: artistId,
      title: gig.venue || gig.title || 'Gig'
    });
    const alreadyHasEvent = existingEvents.some(e => {
      const eDate = e.date ? e.date.slice(0, 10) : '';
      const gigDate = (gig.date || gig.date_start || '').slice(0, 10);
      return eDate === gigDate;
    });

    if (!alreadyHasEvent) {
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
    }

    // CREATE INVOICE (Finance) - if fee exists
    if (gig.fee && gig.fee > 0) {
      try {
        await base44.asServiceRole.entities.ScottInvoice.create({
          artist_id: artistId,
          amount: gig.fee,
          currency: gig.currency || 'GBP',
          description: `Gig: ${gig.venue || gig.title || 'Gig'} on ${gig.date_start || gig.date || 'TBD'}`,
          date: gig.date_start || gig.date || new Date().toISOString().split('T')[0],
          status: 'unpaid',
          accountant_notes: `Promoter: ${gig.promoter_name || gig.promoter || 'Unknown'}`
        });
      } catch (err) {
        console.log('Invoice creation (non-critical):', err.message);
      }
    }

    // CREATE TASK (Tasks) - post-show follow-up
    if (gig.date_start || gig.date) {
      try {
        const gigDate = new Date(gig.date_start || gig.date);
        const followUpDate = new Date(gigDate.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days after gig
        
        await base44.asServiceRole.entities.ScottTask.create({
          artist_id: artistId,
          title: `Follow-up: ${gig.venue || 'Gig'} ${gig.date_start || gig.date}`,
          deadline: followUpDate.toISOString().split('T')[0],
          priority: 'normal',
          status: 'pending',
          notes: `Send thank you to ${gig.promoter_name || gig.promoter || 'promoter'}. Confirm payment of £${gig.fee || 0} received.`
        });
      } catch (err) {
        console.log('Task creation (non-critical):', err.message);
      }
    }

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