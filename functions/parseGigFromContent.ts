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

    // Use AI to extract EVERYTHING needed for gigs - zero ego, complete
    const parseRes = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a world-class gig extraction AI. Extract EVERY detail from this gig offer document.

Be thorough. Find every piece of info:
- venue_name: The actual venue/location name
- date_start: Date in YYYY-MM-DD format (extract from any format - 15th March 2026 = 2026-03-15)
- time_start: Start time in HH:MM 24-hour format (8pm = 20:00, 3:30pm = 15:30)
- location: Full address or city/country
- promoter_name: Person or company promoting the gig
- promoter_email: Contact email
- promoter_phone: Phone number (keep country code if present)
- fee: Just the number (£800 = 800, €500 = 500)
- offer_details: Everything about the gig - equipment, setup, duration, requirements, anything relevant
- artist_name: The band/artist this gig is for (if mentioned)
- title: Event title if different from venue

Extract EVERYTHING. Be greedy. If it mentions anything about the gig, include it in offer_details.

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