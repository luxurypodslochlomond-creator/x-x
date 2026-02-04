import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    if (req.method !== 'POST') {
        return Response.json({ error: 'POST only' }, { status: 405 });
    }

    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { from, subject, body: emailBody, timestamp } = body;

        if (!from || !emailBody) {
            return Response.json({ error: 'Missing from or body' }, { status: 400 });
        }

        // Parse email with AI51
        const parseResult = await base44.integrations.Core.InvokeLLM({
            prompt: `Parse this email and extract gig offer details if present. Return JSON with: venue, date, fee, city, promoter, promoter_contact, capacity, requirements, notes, email_type (gig_offer, invoice, contract, task, other).
            
Email:
Subject: ${subject}
From: ${from}
Body: ${emailBody}`,
            response_json_schema: {
                type: 'object',
                properties: {
                    email_type: { type: 'string' },
                    venue: { type: 'string' },
                    date: { type: 'string' },
                    fee: { type: 'number' },
                    city: { type: 'string' },
                    promoter: { type: 'string' },
                    promoter_contact: { type: 'string' },
                    capacity: { type: 'number' },
                    requirements: { type: 'string' },
                    notes: { type: 'string' }
                }
            }
        });

        // Create ScottMessage record
        const message = await base44.entities.ScottMessage.create({
            from: from,
            subject: subject || 'Forwarded Email',
            body: emailBody,
            message_type: parseResult.email_type || 'other',
            status: 'pending',
            created_at: timestamp || new Date().toISOString(),
            parsed_data: parseResult
        });

        // If gig offer detected, create ScottGigOffer automatically
        if (parseResult.email_type === 'gig_offer' && parseResult.venue) {
            const artists = await base44.entities.ScottArtist.list();
            const defaultArtist = artists[0];

            if (defaultArtist) {
                await base44.entities.ScottGigOffer.create({
                    artist_id: defaultArtist.id,
                    venue: parseResult.venue,
                    date: parseResult.date,
                    fee: parseResult.fee,
                    city: parseResult.city,
                    promoter: parseResult.promoter,
                    promoter_contact: parseResult.promoter_contact,
                    capacity: parseResult.capacity,
                    requirements: parseResult.requirements,
                    notes: parseResult.notes,
                    raw_email: emailBody,
                    status: 'pending_manager_review'
                });
            }
        }

        return Response.json({ success: true, message_id: message.id, email_type: parseResult.email_type });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});