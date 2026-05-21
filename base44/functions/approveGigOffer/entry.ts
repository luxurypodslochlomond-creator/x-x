import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

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

    // CREATE EVENT (Calendar) - dedup by artist_id + date
    const gigDateNorm = (gig.date || gig.date_start || '').slice(0, 10);
    let alreadyHasEvent = false;
    if (gigDateNorm) {
      const existingEvents = await base44.asServiceRole.entities.CB51Event.filter({ artist_id: artistId });
      alreadyHasEvent = existingEvents.some(e => (e.date || '').slice(0, 10) === gigDateNorm);
    }

    if (!alreadyHasEvent) {
      await base44.asServiceRole.entities.CB51Event.create({
        artist_id: artistId,
        owner_email: user.email,
        title: gig.venue || gig.title || 'Gig',
        date: gigDateNorm,
        time: gig.time || gig.time_start || '',
        venue: gig.venue || '',
        location: gig.location || gig.city || '',
        promoter: gig.promoter_name || gig.promoter || '',
        promoter_phone: gig.promoter_phone || gig.promoter_contact || '',
        promoter_email: gig.promoter_email || '',
        fee: gig.fee || null,
        notes: gig.offer_details || gig.notes || '',
        status: 'confirmed'
      });
    }

    // CREATE INVOICE (Finance) - if fee exists
    if (gig.fee && gig.fee > 0) {
      try {
        const gigDate = gigDateNorm || new Date().toISOString().split('T')[0];
        await base44.asServiceRole.entities.CB51Invoice.create({
          artist_id: artistId,
          owner_email: user.email,
          amount: gig.fee,
          currency: gig.currency || 'EUR',
          description: `Gig: ${gig.venue || gig.title || 'Gig'} on ${gigDate}`,
          date: gigDate,
          status: 'unpaid',
          accountant_notes: `Promoter: ${gig.promoter_name || gig.promoter || 'Unknown'} | Contact: ${gig.promoter_contact || gig.promoter_email || ''}`
        });
      } catch (err) {
        console.log('Invoice creation (non-critical):', err.message);
      }
    }

    // AUTO-COMPLETE the "Review & approve gig" pre-approval task
    try {
      const reviewTasks = await base44.asServiceRole.entities.CB51Task.filter({ artist_id: artistId, status: 'pending' });
      const preApprovalTask = reviewTasks.find(t => t.title?.includes(gig.venue || gig.title || ''));
      if (preApprovalTask) {
        await base44.asServiceRole.entities.CB51Task.update(preApprovalTask.id, { status: 'done' });
      }
    } catch (err) {
      console.log('Task auto-complete (non-critical):', err.message);
    }

    // CREATE TASK (Tasks) - post-show follow-up
    if (gigDateNorm) {
      try {
        const gigDate = new Date(gigDateNorm);
        const followUpDate = new Date(gigDate.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days after gig
        
        await base44.asServiceRole.entities.CB51Task.create({
          artist_id: artistId,
          owner_email: user.email,
          title: `Follow-up: ${gig.venue || 'Gig'} — chase payment & send thanks`,
          deadline: followUpDate.toISOString().split('T')[0],
          priority: 'normal',
          status: 'pending',
          notes: `Send thank you to ${gig.promoter_name || gig.promoter || 'promoter'}. Confirm €${gig.fee || 0} received. Contact: ${gig.promoter_contact || gig.promoter_email || 'N/A'}`
        });
      } catch (err) {
        console.log('Task creation (non-critical):', err.message);
      }
    }

    // Notify band members (skip if solo artist) — non-blocking
    if (!isSoloArtist) {
      base44.asServiceRole.functions.invoke('notifyBandOnGigOffer', {
        gigOfferId: gigId,
        artistId: artistId,
        venue: gig.venue,
        date: gig.date_start,
        promoterName: gig.promoter_name,
        fee: gig.fee
      }).catch(err => {
        console.log('Band notification (non-critical):', err.message);
      });
    }

    // Notify MANAGER they approved the gig
    try {
      await base44.asServiceRole.functions.invoke('sendBrowserPush', {
        title: '✅ Gig Approved',
        body: `You approved ${gig.venue || gig.title} on ${gig.date_start} for £${gig.fee || 0}`,
        badge: '/icon-192x192.png',
        icon: '/icon-192x192.png',
        tag: `cb51-approved-${gigId}`,
        requireInteraction: false
      });
    } catch (err) {
      console.log('Manager notification (non-critical):', err.message);
    }

    return Response.json({
      status: 'success',
      message: isSoloArtist ? 'Gig confirmed (solo artist) — push sent' : 'Gig approved — push sent'
    });
  } catch (error) {
    console.error('Approve gig error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});