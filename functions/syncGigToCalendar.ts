import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * SYNC GIG TO GOOGLE CALENDAR
 * Triggered when gig status = confirmed
 * Adds event to artist's Google Calendar
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const { event, data } = payload;

    // Only trigger on confirmed status
    if (data?.status !== 'confirmed') {
      return Response.json({ skipped: true });
    }

    // Get access token for Google Calendar
    const accessToken = await base44.asServiceRole.connectors.getAccessToken('googlecalendar');
    
    // Get gig offer details
    const gigOffer = await base44.asServiceRole.entities.ScottGigOffer.get(data.id);
    
    // Get artist
    const artist = await base44.asServiceRole.entities.ScottArtist.get(gigOffer.artist_id);

    // Get band members for description
    const bandMembers = await base44.asServiceRole.entities.ScottBandMember.filter({
      artist_id: gigOffer.artist_id
    });

    // Build calendar event
    const startDate = new Date(gigOffer.date);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hour default

    const event_data = {
      summary: `🎵 ${artist.name} @ ${gigOffer.venue_name}`,
      description: `Gig with ${artist.name}\n\nVenue: ${gigOffer.venue_name}\nPromoter: ${gigOffer.promoter_name}\nFee: £${gigOffer.fee}\n\nBand: ${bandMembers.map(m => m.name).join(', ')}\n\nNotes: ${gigOffer.manager_notes || 'None'}`,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: 'Europe/London'
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: 'Europe/London'
      },
      location: gigOffer.venue_name
    };

    // Create calendar event
    const calendarResponse = await fetch(
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

    if (!calendarResponse.ok) {
      const error = await calendarResponse.text();
      return Response.json({ 
        error: `Google Calendar API error: ${error}`,
        status: calendarResponse.status
      }, { status: 500 });
    }

    const calendarEvent = await calendarResponse.json();

    // Store calendar event ID for reference
    await base44.asServiceRole.entities.ScottGigOffer.update(gigOffer.id, {
      calendar_event_id: calendarEvent.id
    });

    return Response.json({ 
      success: true,
      event_id: calendarEvent.id,
      gig: gigOffer.venue_name,
      date: gigOffer.date
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});