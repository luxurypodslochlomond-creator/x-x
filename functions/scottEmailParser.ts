import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * SCOTT EMAIL PARSER
 * Receives forwarded emails → AI extracts → Creates tasks/events/messages
 * Forward emails to: scott@uf51.app (or whatever domain)
 */

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Check authentication
        const user = await base44.auth.me();
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { emailBody, subject, from, to, attachments } = await req.json();

        // Extract artist name from "to" field if present (e.g., dave@scott.uf51.app)
        const artistNameFromEmail = to?.split('@')[0] || null;

        // AI EXTRACTION - Get structured data
        const extractionPrompt = `Extract ALL relevant information from this email:

Subject: ${subject}
From: ${from}
Body: ${emailBody}

Extract:
1. Is this about a GIG/EVENT? If yes, extract: venue name, date, time, load-in time, soundcheck time, set time, fee/payment
2. Is this about a TASK? If yes, extract: what needs doing, deadline
3. Is this about MONEY? Extract: amount, invoice/payment details
4. Is this about TRAVEL/VISA? Extract: dates, locations, requirements
5. Artist/client name (if mentioned or if it's from "${artistNameFromEmail}")
6. General message/notes

Return JSON with clear structure. Be specific about dates/times/money.`;

        const extraction = await base44.integrations.Core.InvokeLLM({
            prompt: extractionPrompt,
            response_json_schema: {
                type: "object",
                properties: {
                    type: { type: ["string", "null"], enum: ["gig", "task", "payment", "visa", "general", null] },
                    artist_name: { type: ["string", "null"] },
                    gig_details: {
                        type: ["object", "null"],
                        properties: {
                            venue: { type: ["string", "null"] },
                            date: { type: ["string", "null"] },
                            time: { type: ["string", "null"] },
                            load_in: { type: ["string", "null"] },
                            soundcheck: { type: ["string", "null"] },
                            set_time: { type: ["string", "null"] },
                            fee: { type: ["string", "null"] }
                        }
                    },
                    task_details: {
                        type: ["object", "null"],
                        properties: {
                            description: { type: ["string", "null"] },
                            deadline: { type: ["string", "null"] }
                        }
                    },
                    payment_details: {
                        type: ["object", "null"],
                        properties: {
                            amount: { type: ["number", "null"] },
                            description: { type: ["string", "null"] }
                        }
                    },
                    notes: { type: ["string", "null"] }
                }
            }
        });

        const data = extraction;
        const results = [];

        // Find or create artist
        let artist = null;
        if (data.artist_name) {
            const artists = await base44.asServiceRole.entities.ScottArtist.filter({ name: data.artist_name });
            if (artists.length > 0) {
                artist = artists[0];
            } else {
                // Create new artist
                artist = await base44.asServiceRole.entities.ScottArtist.create({
                    name: data.artist_name,
                    email: from,
                    type: 'artist'
                });
                results.push({ type: 'artist_created', artist });
            }
        }

        // CREATE GIG/EVENT
        if (data.type === 'gig' && data.gig_details && artist) {
            const event = await base44.asServiceRole.entities.ScottEvent.create({
                title: `Gig at ${data.gig_details.venue || 'TBC'}`,
                artist_id: artist.id,
                event_type: 'gig',
                date: data.gig_details.date || new Date().toISOString(),
                location: data.gig_details.venue,
                notes: `From email: ${subject}\n\nLoad-in: ${data.gig_details.load_in || 'TBC'}\nSoundcheck: ${data.gig_details.soundcheck || 'TBC'}\nSet time: ${data.gig_details.set_time || 'TBC'}\nFee: ${data.gig_details.fee || 'TBC'}\n\n${data.notes || ''}`,
                status: 'pending'
            });
            results.push({ type: 'event_created', event });
        }

        // CREATE TASK
        if (data.type === 'task' && data.task_details && artist) {
            const task = await base44.asServiceRole.entities.ScottTask.create({
                title: data.task_details.description,
                artist_id: artist.id,
                due_date: data.task_details.deadline || null,
                priority: 'normal',
                status: 'todo',
                notes: `From email: ${subject}\n${data.notes || ''}`
            });
            results.push({ type: 'task_created', task });
        }

        // CREATE INVOICE (if payment mentioned)
        if (data.type === 'payment' && data.payment_details && artist) {
            const invoice = await base44.asServiceRole.entities.ScottInvoice.create({
                artist_id: artist.id,
                amount: data.payment_details.amount,
                description: data.payment_details.description || subject,
                date: new Date().toISOString().split('T')[0],
                status: 'unpaid',
                accountant_notes: `From email: ${from}`
            });
            results.push({ type: 'invoice_created', invoice });
        }

        // CREATE MESSAGE (always log the email)
        if (artist) {
            const message = await base44.asServiceRole.entities.ScottMessage.create({
                artist_id: artist.id,
                message: `EMAIL: ${subject}\nFrom: ${from}\n\n${emailBody}`,
                direction: 'received'
            });
            results.push({ type: 'message_logged', message });
        }

        return Response.json({
            success: true,
            extracted: data,
            created: results,
            message: `Processed email: ${results.length} items created`
        });

    } catch (error) {
        console.error('Email parser error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});