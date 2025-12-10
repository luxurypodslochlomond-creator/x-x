import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * CALENDAR EXPORT - iCal FORMAT
 * Hardware agnostic - works with Apple Calendar, Google, Outlook, Thunderbird
 * Scott's events → Universal calendar file
 */

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        const user = await base44.auth.me();
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get all events
        const events = await base44.asServiceRole.entities.ScottEvent.list();
        const artists = await base44.asServiceRole.entities.ScottArtist.list();

        // Generate iCal format
        let ical = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Kingdom Management//Scott's Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Kingdom Management
X-WR-TIMEZONE:Europe/London
X-WR-CALDESC:Scott's gigs, sessions, and events

`;

        events.forEach(event => {
            const artist = artists.find(a => a.id === event.artist_id);
            const eventDate = new Date(event.date);
            const dtstart = eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
            const dtend = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

            ical += `BEGIN:VEVENT
UID:${event.id}@kingdom-management.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${dtstart}
DTEND:${dtend}
SUMMARY:${event.title}
DESCRIPTION:${artist?.name || ''} - ${event.notes || ''}
LOCATION:${event.location || ''}
STATUS:${event.status === 'confirmed' ? 'CONFIRMED' : 'TENTATIVE'}
END:VEVENT

`;
        });

        ical += 'END:VCALENDAR';

        return new Response(ical, {
            status: 200,
            headers: {
                'Content-Type': 'text/calendar; charset=utf-8',
                'Content-Disposition': 'attachment; filename="kingdom_calendar.ics"'
            }
        });

    } catch (error) {
        console.error('Calendar export error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});