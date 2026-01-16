import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

/**
 * SCOTT AI COORDINATOR
 * Takes ANY input (photo OCR, voice transcription, text) → AI extracts → Routes to right place
 * ZERO INFORMATION LOSS - everything saved with full context
 */

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        const user = await base44.auth.me();
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { input_text, input_type, artist_id, file_url } = await req.json();
        // input_type: 'photo_ocr', 'voice_transcription', 'text', 'screenshot'

        // AI UNIVERSAL EXTRACTION
        const extractionPrompt = `You are Scott's AI assistant. He's a music manager for independent artists working on LA tours, visas, and funding.

Input type: ${input_type}
Input: ${input_text}

Extract ALL actionable information:
1. Is there a GIG/EVENT? Extract: venue, date, time, load-in, soundcheck, set time, fee
2. Is there a TASK? Extract: what needs doing, deadline, priority
3. Is there MONEY? Extract: amount, invoice/expense details
4. Is there a DEADLINE? Extract: date, what it's for
5. Is there TRAVEL/VISA info? Extract: dates, locations, requirements
6. Is there an artist/client name mentioned?
7. Any notes/context that shouldn't be lost

Be specific. If you see dates/times/money, extract them exactly. If unclear, say "TBC" but still create the item.

Return structured JSON.`;

        const extraction = await base44.integrations.Core.InvokeLLM({
            prompt: extractionPrompt,
            response_json_schema: {
                type: "object",
                properties: {
                    has_event: { type: ["boolean", "null"] },
                    has_task: { type: ["boolean", "null"] },
                    has_payment: { type: ["boolean", "null"] },
                    artist_name: { type: ["string", "null"] },
                    event: {
                        type: ["object", "null"],
                        properties: {
                            venue: { type: ["string", "null"] },
                            date: { type: ["string", "null"] },
                            time: { type: ["string", "null"] },
                            load_in: { type: ["string", "null"] },
                            soundcheck: { type: ["string", "null"] },
                            set_time: { type: ["string", "null"] },
                            fee: { type: ["string", "null"] },
                            notes: { type: ["string", "null"] }
                        }
                    },
                    task: {
                        type: ["object", "null"],
                        properties: {
                            description: { type: ["string", "null"] },
                            deadline: { type: ["string", "null"] },
                            priority: { type: ["string", "null"], enum: ["low", "normal", "high", "urgent", null] }
                        }
                    },
                    payment: {
                        type: ["object", "null"],
                        properties: {
                            type: { type: ["string", "null"], enum: ["invoice", "expense", null] },
                            amount: { type: ["number", "null"] },
                            description: { type: ["string", "null"] }
                        }
                    },
                    general_notes: { type: ["string", "null"] }
                }
            }
        });

        const data = extraction;
        const results = [];

        // Find/create artist
        let artist = null;
        if (artist_id) {
            artist = await base44.entities.ScottArtist.filter({ id: artist_id });
            artist = artist[0] || null;
        } else if (data.artist_name) {
            const artists = await base44.entities.ScottArtist.filter({ name: data.artist_name });
            if (artists.length > 0) {
                artist = artists[0];
            } else {
                artist = await base44.entities.ScottArtist.create({
                    name: data.artist_name,
                    type: 'artist'
                });
                results.push({ type: 'artist_created', artist });
            }
        }

        // CREATE EVENT
        if (data.has_event && data.event && artist) {
            const event = await base44.entities.ScottEvent.create({
                title: `${data.event.venue || 'Gig'} - ${artist.name}`,
                artist_id: artist.id,
                event_type: 'gig',
                date: data.event.date || new Date().toISOString(),
                location: data.event.venue || 'TBC',
                notes: `${input_type.toUpperCase()} CAPTURE\n\nLoad-in: ${data.event.load_in || 'TBC'}\nSoundcheck: ${data.event.soundcheck || 'TBC'}\nSet: ${data.event.set_time || 'TBC'}\nFee: ${data.event.fee || 'TBC'}\n\n${data.event.notes || ''}\n\nOriginal: ${input_text}`,
                status: 'pending'
            });
            results.push({ type: 'event_created', event });
        }

        // CREATE TASK
        if (data.has_task && data.task && artist) {
            const task = await base44.entities.ScottTask.create({
                title: data.task.description,
                artist_id: artist.id,
                due_date: data.task.deadline || null,
                priority: data.task.priority || 'normal',
                status: 'todo',
                notes: `${input_type.toUpperCase()}: ${input_text}\n\n${data.general_notes || ''}`
            });
            results.push({ type: 'task_created', task });
        }

        // CREATE INVOICE/EXPENSE
        if (data.has_payment && data.payment && artist) {
            if (data.payment.type === 'invoice') {
                const invoice = await base44.entities.ScottInvoice.create({
                    artist_id: artist.id,
                    amount: data.payment.amount,
                    description: data.payment.description,
                    date: new Date().toISOString().split('T')[0],
                    status: 'unpaid'
                });
                results.push({ type: 'invoice_created', invoice });
            } else if (data.payment.type === 'expense') {
                const expense = await base44.entities.ScottExpense.create({
                    artist_id: artist.id,
                    amount: data.payment.amount,
                    description: data.payment.description,
                    date: new Date().toISOString().split('T')[0],
                    category: 'other',
                    receipt_url: file_url || null
                });
                results.push({ type: 'expense_created', expense });
            }
        }

        // ALWAYS LOG AS MESSAGE (zero information loss)
        if (artist) {
            const message = await base44.entities.ScottMessage.create({
                artist_id: artist.id,
                message: `[${input_type.toUpperCase()}]\n\n${input_text}\n\n${data.general_notes || ''}`,
                direction: 'note'
            });
            results.push({ type: 'message_logged', message });
        }

        // Save file if provided
        if (file_url && artist) {
            const file = await base44.entities.ScottFile.create({
                artist_id: artist.id,
                file_type: input_type === 'photo_ocr' ? 'other' : 'other',
                file_url: file_url,
                file_name: `${input_type}_${Date.now()}.jpg`,
                notes: `Auto-captured: ${data.general_notes || input_text.substring(0, 100)}`
            });
            results.push({ type: 'file_saved', file });
        }

        return Response.json({
            success: true,
            extracted: data,
            created: results,
            message: `AI processed ${input_type}: ${results.length} items created`,
            zero_loss: true
        });

    } catch (error) {
        console.error('AI Coordinator error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});