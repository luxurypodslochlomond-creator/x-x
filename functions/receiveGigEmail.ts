import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * RECEIVE GIG EMAIL - WEBHOOK FOR FORWARDED EMAILS
 * 
 * SETUP:
 * 1. Get email forwarding service (e.g., SendGrid Inbound Parse, Mailgun Routes)
 * 2. Set up email: gigs@cb51.uf51.love → this function URL
 * 3. Scott forwards gig offers to: gigs@cb51.uf51.love
 * 4. This function parses + creates ScottGigOffer automatically
 * 
 * WHITE LABEL:
 * - Each subdomain gets own email: gigs@yourband.cb51.uf51.love
 * - Same function, different artist_id
 */

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Authenticate user
        const user = await base44.auth.me();
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get email content from request
        const body = await req.json();
        const emailText = body.text || body.html || body.body || '';
        const emailFrom = body.from || '';
        const emailSubject = body.subject || '';

        if (!emailText) {
            return Response.json({ error: 'No email content' }, { status: 400 });
        }

        // Parse gig offer using AI
        const parseResult = await base44.integrations.Core.InvokeLLM({
            prompt: `Parse this gig offer email into structured data. Extract all details.

Email From: ${emailFrom}
Subject: ${emailSubject}
Body:
${emailText}

Return JSON with these fields (use null if not found):
{
    "venue": "venue name",
    "city": "city",
    "county": "county",
    "country": "country (default UK)",
    "date": "YYYY-MM-DD format",
    "time": "HH:MM format",
    "fee": number (just the number, no currency symbol),
    "currency": "GBP/USD/EUR",
    "capacity": number or null,
    "promoter": "promoter name",
    "promoter_contact": "email or phone",
    "requirements": "any special requirements",
    "notes": "other relevant info"
}`,
            response_json_schema: {
                type: "object",
                properties: {
                    venue: { type: "string" },
                    city: { type: ["string", "null"] },
                    county: { type: ["string", "null"] },
                    country: { type: "string" },
                    date: { type: ["string", "null"] },
                    time: { type: ["string", "null"] },
                    fee: { type: ["number", "null"] },
                    currency: { type: "string" },
                    capacity: { type: ["number", "null"] },
                    promoter: { type: ["string", "null"] },
                    promoter_contact: { type: ["string", "null"] },
                    requirements: { type: ["string", "null"] },
                    notes: { type: ["string", "null"] }
                }
            }
        });

        // Get artist_id (if specified in request, otherwise use first artist)
        let artistId = body.artist_id;
        
        if (!artistId) {
            // Get user's first artist
            const artists = await base44.asServiceRole.entities.ScottArtist.filter({ 
                created_by: user.email 
            });
            
            if (artists.length === 0) {
                return Response.json({ 
                    error: 'No artist found. Create an artist first.' 
                }, { status: 400 });
            }
            
            artistId = artists[0].id;
        }

        // Create gig offer
        const gigOffer = await base44.asServiceRole.entities.ScottGigOffer.create({
            artist_id: artistId,
            venue: parseResult.venue,
            city: parseResult.city,
            county: parseResult.county,
            country: parseResult.country || 'UK',
            date: parseResult.date,
            time: parseResult.time,
            fee: parseResult.fee,
            currency: parseResult.currency || 'GBP',
            capacity: parseResult.capacity,
            promoter: parseResult.promoter,
            promoter_contact: parseResult.promoter_contact,
            requirements: parseResult.requirements,
            notes: parseResult.notes,
            raw_email: emailText,
            status: 'pending_manager_review',
            time_saved_minutes: 120 // AI parsing + drafting saves 2 hours
        });

        return Response.json({ 
            success: true,
            message: 'Gig offer parsed and created',
            offer_id: gigOffer.id,
            parsed_data: parseResult
        });

    } catch (error) {
        console.error('Email parsing error:', error);
        return Response.json({ 
            error: error.message,
            details: 'Failed to parse email or create gig offer'
        }, { status: 500 });
    }
});