import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content, contentType, source } = await req.json();

    if (!content) {
      return Response.json({ error: 'No content to parse' }, { status: 400 });
    }

    // PLANET-CLASS GIG EXTRACTION - handles emails, WhatsApp, PDFs, contracts
    const parseRes = await base44.integrations.Core.InvokeLLM({
      prompt: `You are the world's best gig extraction AI. Your job: find EVERY detail about gigs, events, sessions, or anything work-related.

INPUT: Raw text from email, WhatsApp, PDF, contract, or forward

EXTRACT WITH ZERO EGO:
- venue_name: Exact venue name (check for: "at", "at the", "@", location names)
- date_start: YYYY-MM-DD format. Parse ANY date format: "15 March", "March 15", "15/3", "3-15", "next Tuesday" (estimate). Must be date.
- time_start: HH:MM 24-hour. "8pm"=20:00, "3:30pm"=15:30, "8"=08:00, "afternoon"=14:00
- location: Full address, city, country (check for: street address, city name, postal code, country)
- promoter_name: Person or company (check for: sender name, contact name, company name, promoter title)
- promoter_email: Full email address
- promoter_phone: With country code if present (+44, +1, etc)
- fee: JUST THE NUMBER (£800="800", €500="500", "5000 PLN"="5000")
- offer_details: EVERYTHING about the gig - equipment provided, PA system, duration, setup requirements, technical specs, travel, accommodation, meals, load-in time, any special requests
- artist_name: Who's performing (check for: artist name, band name, who it's for, "for [artist]")
- title: Event name if different from venue (festival name, event title, gig name)

KEY RULES:
1. If NO date found, leave date_start empty
2. If currency mentioned, extract number only
3. offer_details = be GREEDY. Include EVERYTHING mentioned
4. Dates: Try to infer year from context. If no year, use 2026
5. Check subject lines, signatures, headers for contact info
6. Extract multiple dates if gig repeats (festival with multiple days)

Content:
${content}`,
      response_json_schema: {
        type: 'object',
        properties: {
          venue_name: { type: 'string' },
          date_start: { type: 'string' },
          time_start: { type: 'string' },
          location: { type: 'string' },
          promoter_name: { type: 'string' },
          promoter_email: { type: 'string' },
          promoter_phone: { type: 'string' },
          fee: { type: ['string', 'number', 'null'] },
          offer_details: { type: 'string' },
          artist_name: { type: ['string', 'null'] },
          title: { type: ['string', 'null'] }
        }
      }
    });

    const missingCritical = [];
    if (!parseRes.venue_name?.trim()) missingCritical.push('Venue');
    if (!parseRes.date_start?.trim()) missingCritical.push('Date');
    if (!parseRes.promoter_name?.trim()) missingCritical.push('Promoter');

    // Clean fee
    const feeCleaned = parseRes.fee 
      ? String(parseRes.fee).replace(/[^0-9.]/g, '').replace(/\.(?=.*\.)/g, '') 
      : null;

    return Response.json({
      extracted: {
        venue_name: (parseRes.venue_name || '').trim(),
        date_start: (parseRes.date_start || '').trim(),
        time_start: (parseRes.time_start || '').trim(),
        location: (parseRes.location || '').trim(),
        promoter_name: (parseRes.promoter_name || '').trim(),
        promoter_email: (parseRes.promoter_email || '').trim(),
        promoter_phone: (parseRes.promoter_phone || '').trim(),
        fee: feeCleaned ? parseFloat(feeCleaned) : null,
        offer_details: (parseRes.offer_details || '').trim(),
        artist_name: (parseRes.artist_name || '').trim(),
        title: (parseRes.title || '').trim()
      },
      missingCritical,
      source
    });
  } catch (error) {
    console.error('Parse error:', error);
    return Response.json({ 
      extracted: {},
      missingCritical: ['Parse failed - check PDF format'],
      error: error.message 
    }, { status: 200 });
  }
});