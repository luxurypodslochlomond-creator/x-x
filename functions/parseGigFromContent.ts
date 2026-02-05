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

    // Use AI to extract gig details from the content
    const parseRes = await base44.integrations.Core.InvokeLLM({
      prompt: `Extract gig/event details from this document. Return JSON with: venue_name, date_start (YYYY-MM-DD), time_start (HH:MM), location, promoter_name, promoter_email, promoter_phone, fee (number), offer_details (text). Be strict - only extract what's clearly there.

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
          fee: { type: 'number' },
          offer_details: { type: 'string' }
        }
      }
    });

    const missingCritical = [];
    if (!parseRes.venue_name) missingCritical.push('Venue');
    if (!parseRes.date_start) missingCritical.push('Date');
    if (!parseRes.promoter_name) missingCritical.push('Promoter');

    return Response.json({
      extracted: {
        venue_name: parseRes.venue_name || '',
        date_start: parseRes.date_start || '',
        time_start: parseRes.time_start || '',
        location: parseRes.location || '',
        promoter_name: parseRes.promoter_name || '',
        promoter_email: parseRes.promoter_email || '',
        promoter_phone: parseRes.promoter_phone || '',
        fee: parseRes.fee || null,
        offer_details: parseRes.offer_details || ''
      },
      missingCritical,
      source
    });
  } catch (error) {
    console.error('Parse error:', error);
    return Response.json({ 
      extracted: {},
      missingCritical: ['Failed to parse'],
      error: error.message 
    }, { status: 200 });
  }
});