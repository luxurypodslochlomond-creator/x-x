import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * SYNC GIG TO GOOGLE CALENDAR
 * Auto-triggered when gig status = confirmed
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const { event, data } = payload;

    // Only trigger on status change to confirmed
    if (data?.status !== 'confirmed') {
      return Response.json({ skipped: true });
    }

    // Get gig offer
    const gigOffer = await base44.asServiceRole.entities.ScottGigOffer.get(data.id);

    // Check if already synced
    if (gigOffer.calendar_event_id) {
      return Response.json({ skipped: true, reason: 'Already synced' });
    }

    // Try to sync to Google Calendar
    try {
      const accessToken = await base44.asServiceRole.connectors.getAccessToken('googlecalendar');
      const artist = await base44.asServiceRole.entities.ScottArtist.get(gigOffer.artist_id);
      
      const event_data = {
        summary: `🎵 ${artist.name} @ ${gigOffer.venue || gigOffer.venue_name}`,
        description: `Confirmed gig\nPromoter: ${gigOffer.promoter_name || 'Unknown'}\nFee: £${gigOffer.fee || 0}`,
        start: {
          dateTime: new Date(gigOffer.date).toISOString(),
          timeZone: 'Europe/London'
        },
        end: {
          dateTime: new Date(new Date(gigOffer.date).getTime() + 2 * 60 * 60 * 1000).toISOString(),
          timeZone: 'Europe/London'
        },
        location: gigOffer.venue || gigOffer.venue_name || 'TBC'
      };

      const calendarRes = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event_data)
        }
      );

      if (!calendarRes.ok) {
        throw new Error(`Calendar API error: ${calendarRes.status}`);
      }

      const calEvent = await calendarRes.json();
      
      // Save calendar event ID
      await base44.asServiceRole.entities.ScottGigOffer.update(gigOffer.id, {
        calendar_event_id: calEvent.id,
        calendar_synced_at: new Date().toISOString()
      });

      return Response.json({ 
        success: true, 
        calendar_event_id: calEvent.id,
        gig: gigOffer.venue || gigOffer.venue_name
      });

    } catch (calError) {
      // Calendar not connected - skip silently
      return Response.json({ 
        skipped: true, 
        reason: 'Calendar not connected',
        error: calError.message 
      });
    }

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});