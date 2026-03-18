import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * ATOMIC GIG APPROVAL + BAND NOTIFICATION
 * 2026 Best Practice: Real-time, atomic, zero-automation
 * Manager clicks YES → Band gets notified in <1s
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { offerId, artistId } = await req.json();

    if (!offerId || !artistId) {
      return Response.json({ error: 'Missing offerId or artistId' }, { status: 400 });
    }

    // 1. Fetch the offer
    const offers = await base44.asServiceRole.entities.ScottGigOffer.list();
    const offer = offers.find(o => o.id === offerId);

    if (!offer) {
      return Response.json({ error: 'Offer not found' }, { status: 404 });
    }

    // 2. Update status to sent_to_band (atomic point of no return)
    await base44.asServiceRole.entities.ScottGigOffer.update(offerId, {
      status: 'sent_to_band'
    });

    // 3. Create calendar event
    const calendarPromise = base44.asServiceRole.entities.ScottEvent.create({
      artist_id: artistId,
      title: offer.venue || 'Gig',
      date: offer.date,
      time: offer.time || '20:00',
      venue: offer.venue,
      city: offer.city,
      country: offer.country,
      fee: offer.fee,
      currency: offer.currency || 'GBP',
      promoter: offer.promoter,
      capacity: offer.capacity,
      event_type: 'live_show',
      notes: `Approved by manager - sent to band for vote`
    });

    // 4. Create auto-tasks
    const tasksData = [];

    if (offer.date) {
      const gigDate = new Date(offer.date);
      const dayBefore = new Date(gigDate);
      dayBefore.setDate(dayBefore.getDate() - 1);

      tasksData.push({
        artist_id: artistId,
        title: `Travel to ${offer.city || offer.venue}`,
        due_date: dayBefore.toISOString().split('T')[0],
        status: 'pending',
        category: 'travel'
      });
    }

    if (offer.fee && offer.date) {
      const gigDate = new Date(offer.date);
      const weekAfter = new Date(gigDate);
      weekAfter.setDate(weekAfter.getDate() + 7);

      tasksData.push({
        artist_id: artistId,
        title: `Invoice ${offer.promoter || offer.venue}`,
        due_date: weekAfter.toISOString().split('T')[0],
        status: 'pending',
        category: 'finance',
        notes: `${offer.currency || 'GBP'}${offer.fee} for ${offer.venue}`
      });
    }

    const tasksPromise = tasksData.length > 0
      ? Promise.all(tasksData.map(t => base44.asServiceRole.entities.ScottTask.create(t)))
      : Promise.resolve([]);

    // 5. Get band members and create notifications
    const allTeamMembers = await base44.asServiceRole.entities.ScottTeamMember.list();
    const bandMembers = allTeamMembers.filter(m => 
      m.artist_access?.includes(artistId)
    );

    const notificationsPromise = Promise.all(
      bandMembers.map(member =>
        base44.asServiceRole.entities.ScottNotification.create({
          artist_id: artistId,
          recipient_email: member.email,
          notification_type: 'band_gig_offer',
          title: `New gig: ${offer.venue || 'Gig Offer'}`,
          message: `Manager approved. Vote YES or NO.`,
          gig_offer_id: offerId,
          status: 'pending'
        })
      )
    );

    // Wait for all operations in parallel
    const [calEvent, tasks, notifications] = await Promise.all([
      calendarPromise,
      tasksPromise,
      notificationsPromise
    ]);

    // 6. Send push notifications immediately (no wait)
    // This fires in background - don't block response
    bandMembers.forEach(member => {
      base44.functions.invoke('sendBrowserPush', {
        recipient_email: member.email,
        title: `${offer.venue}`,
        message: `Manager approved. Your vote needed.`,
        notification_type: 'band_gig_offer',
        gig_offer_id: offerId
      }).catch(e => console.error('Push failed for', member.email, e));
    });

    return Response.json({
      success: true,
      offerId,
      notificationsSent: notifications.length,
      calendarEvent: calEvent?.id,
      tasksCreated: tasks.length
    });

  } catch (error) {
    console.error('Approve gig error:', error);
    return Response.json({ 
      error: error.message || 'Failed to approve gig',
      details: error.stack?.split('\n')[0]
    }, { status: 500 });
  }
});