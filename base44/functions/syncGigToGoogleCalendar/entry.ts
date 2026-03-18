import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * SYNC GIG TO GOOGLE CALENDAR
 * Creates or updates a calendar event for a confirmed gig
 * Handles two-way sync with Google Calendar
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gigId, action = 'create' } = await req.json();

    if (!gigId) {
      return Response.json({ error: 'Missing gigId' }, { status: 400 });
    }

    // Get the gig
    const gig = await base44.asServiceRole.entities.GigOffer.get(gigId);
    if (!gig) {
      return Response.json({ error: 'Gig not found' }, { status: 404 });
    }

    // Get Google Calendar access token
    const accessToken = await base44.asServiceRole.connectors.getAccessToken('googlecalendar');

    // Prepare event data
    const startDateTime = gig.time_start 
      ? `${gig.date_start}T${gig.time_start}:00`
      : `${gig.date_start}T20:00:00`;

    const event = {
      summary: `${gig.venue || gig.title}`,
      description: `Promoter: ${gig.promoter_name || 'N/A'}\nFee: £${gig.fee || 0}\n\n${gig.offer_details || ''}`,
      location: gig.location || gig.venue,
      start: {
        dateTime: startDateTime,
        timeZone: 'Europe/London'
      },
      end: {
        dateTime: startDateTime.replace(/T\d{2}:\d{2}/, 'T23:59'),
        timeZone: 'Europe/London'
      },
      extendedProperties: {
        private: {
          cb51_gig_id: gigId,
          cb51_artist_id: gig.artist_id
        }
      }
    };

    let calendarEventId = gig.google_calendar_event_id;

    if (action === 'delete' && calendarEventId) {
      // Delete from Google Calendar
      await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${calendarEventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      // Clear the calendar event ID from gig
      await base44.asServiceRole.entities.GigOffer.update(gigId, {
        google_calendar_event_id: null
      });

      return Response.json({ 
        status: 'deleted',
        message: 'Event removed from Google Calendar'
      });
    }

    if (action === 'update' && calendarEventId) {
      // Update existing event
      const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${calendarEventId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });

      if (!response.ok) {
        throw new Error('Failed to update Google Calendar event');
      }

      return Response.json({
        status: 'updated',
        message: 'Event updated in Google Calendar'
      });
    }

    // Create new event
    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create Google Calendar event: ${error}`);
    }

    const createdEvent = await response.json();

    // Save the calendar event ID to gig
    await base44.asServiceRole.entities.GigOffer.update(gigId, {
      google_calendar_event_id: createdEvent.id
    });

    return Response.json({
      status: 'created',
      eventId: createdEvent.id,
      message: 'Gig synced to Google Calendar'
    });

  } catch (error) {
    console.error('Google Calendar sync error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});