import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * PARSE GIG FROM CONTENT
 * Universal gig parser - handles emails, WhatsApp, PDFs, docs, pastes
 * Works for ANY manager across CB51
 * Extracts: venue, date, time, fee, contact info, requirements
 */

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Check authentication
        const user = await base44.auth.me();
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { content, contentType = 'text', source = 'paste' } = await req.json();

        // AI EXTRACTION - Get structured gig data
        const extractionPrompt = `Extract ALL gig offer details from this ${contentType}:

${content}

Extract EVERYTHING about the gig:
1. Venue/Event name
2. Date (extract full date, be precise)
3. Time/Set time (when they perform)
4. Load-in time (when to arrive)
5. Soundcheck time
6. Fee/Payment (amount, currency, payment terms)
7. Duration of set
8. Contact person (promoter/organizer)
9. Contact email
10. Contact phone
11. Address/Location details
12. Travel requirements
13. Technical requirements (PA, drums, etc)
14. Any special notes or requirements
15. Confidence level on each field (high/medium/low)

Return ONLY valid JSON. If a field is missing or unclear, set to null. Include confidence_score (0-1) for each field.`;

        const extraction = await base44.integrations.Core.InvokeLLM({
            prompt: extractionPrompt,
            response_json_schema: {
                type: "object",
                properties: {
                    venue_name: { type: ["string", "null"] },
                    date_start: { type: ["string", "null"] },
                    time_start: { type: ["string", "null"] },
                    time_end: { type: ["string", "null"] },
                    load_in_time: { type: ["string", "null"] },
                    soundcheck_time: { type: ["string", "null"] },
                    set_duration_minutes: { type: ["number", "null"] },
                    fee: { type: ["number", "null"] },
                    fee_currency: { type: ["string", "null"] },
                    payment_terms: { type: ["string", "null"] },
                    promoter_name: { type: ["string", "null"] },
                    promoter_email: { type: ["string", "null"] },
                    promoter_phone: { type: ["string", "null"] },
                    location: { type: ["string", "null"] },
                    travel_info: { type: ["string", "null"] },
                    technical_requirements: { type: ["string", "null"] },
                    notes: { type: ["string", "null"] },
                    confidence_scores: {
                        type: ["object", "null"],
                        properties: {
                            venue: { type: ["number", "null"] },
                            date: { type: ["number", "null"] },
                            time: { type: ["number", "null"] },
                            fee: { type: ["number", "null"] },
                            contact: { type: ["number", "null"] }
                        }
                    }
                }
            }
        });

        const data = extraction;

        // Validate critical fields
        const missingCritical = [];
        if (!data.venue_name) missingCritical.push('venue');
        if (!data.date_start) missingCritical.push('date');
        if (!data.promoter_name) missingCritical.push('promoter_name');

        return Response.json({
            success: true,
            extracted: data,
            source: source,
            missingCritical: missingCritical,
            ready_to_save: missingCritical.length === 0,
            message: missingCritical.length === 0 
                ? 'Ready to save' 
                : `Missing critical fields: ${missingCritical.join(', ')} - review before saving`
        });

    } catch (error) {
        console.error('Gig parser error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});