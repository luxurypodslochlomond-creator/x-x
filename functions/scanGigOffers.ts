import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * SCAN GIG OFFERS - SINGLE AI CALL
 * Accepts: text OR file_url (PDF/image)
 * Extracts: venue, location, capacity, promoter, fee, tour info
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin only' }, { status: 403 });
    }

    const { emailText, artistId, file_url } = await req.json();
    
    if (!artistId || (!emailText && !file_url)) {
      return Response.json({ error: 'Missing artistId and text/file' }, { status: 400 });
    }

    // Fast AI extraction - vision if file, text otherwise
    const extraction = await base44.integrations.Core.InvokeLLM({
      prompt: `Extract ONLY these fields from gig offer. Return valid JSON ONLY.
venue, city, country, date (YYYY-MM-DD), time (HH:MM), fee (number), currency, promoter, capacity
If not found, use null.`,
      file_urls: file_url ? [file_url] : undefined,
      add_context_from_internet: false,
      response_json_schema: {
        type: "object",
        properties: {
          venue: { type: ["string", "null"] },
          city: { type: ["string", "null"] },
          country: { type: ["string", "null"] },
          date: { type: ["string", "null"] },
          time: { type: ["string", "null"] },
          fee: { type: ["number", "null"] },
          currency: { type: ["string", "null"] },
          promoter: { type: ["string", "null"] },
          capacity: { type: ["number", "null"] }
        }
      }
    });

    // Append text if provided (not in schema)
    if (emailText && emailText.length > 500) {
      extraction.raw_email = emailText.substring(0, 500);
    }

        console.log('AI extraction:', extraction);

    // Create gig offer
    const offer = await base44.asServiceRole.entities.ScottGigOffer.create({
    artist_id: artistId,
    venue: extraction.venue || 'Unknown Venue',
    city: extraction.city,
    country: extraction.country || 'UK',
    date: extraction.date || '2026-12-31',
    time: extraction.time,
    fee: extraction.fee || 0,
    currency: extraction.currency || 'GBP',
    capacity: extraction.capacity,
    promoter: extraction.promoter,
    promoter_contact: extraction.promoter_contact,
    deposit_required: extraction.deposit_required || false,
    deposit_amount: extraction.deposit_amount,
    requirements: extraction.requirements,
    notes: extraction.notes,
    raw_email: emailText || 'Scanned from PDF',
    status: 'pending_manager_review'
    });
    
    // Notify manager
    try {
      await base44.functions.invoke('notifyManagerGigOffer', {
        gigOfferId: offer.id,
        gigDetails: {
          artist_id: artistId,
          venue_name: offer.venue,
          date: offer.date,
          promoter_name: offer.promoter,
          fee: offer.fee
        }
      });
    } catch (e) {
      console.log('Notification creation failed:', e);
    }
    
    return Response.json({ 
      success: true,
      offer
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});