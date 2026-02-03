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
    
    // World-class AI extraction - SINGLE CALL (text or vision)
    const prompt = `Extract gig offer details from this ${file_url ? 'PDF/image' : 'text'}.

    WHAT I NEED:

    - Venue name (e.g. "Mallorca Live Festival")
    - City (e.g. "Palma", "Glasgow")
    - Country (e.g. "Spain", "UK")
    - Date (YYYY-MM-DD - if it says "June 12 2026" → "2026-06-12")
    - Show time (HH:MM in 24h - if it says "8pm" → "20:00")
    - Fee (just the number - if it says "3000€" → 3000)
    - Currency (GBP/USD/EUR/etc)
    - Promoter name
    - Promoter contact (email/phone)
    - Capacity (venue size)

    OPTIONAL:
    - Deposit details
    - Technical rider/requirements
    - Travel/accommodation
    - Any red flags

    Return ONLY this JSON (no markdown, no explanation):
    {
      "venue": "string or null",
      "city": "string or null",
      "country": "string or null",
      "date": "YYYY-MM-DD or null",
      "time": "HH:MM or null",
      "fee": number or null,
      "currency": "GBP/USD/EUR/etc or null",
      "promoter": "string or null",
      "promoter_contact": "string or null",
      "capacity": number or null,
      "deposit_required": boolean or null,
      "deposit_amount": number or null,
      "requirements": "string or null",
      "notes": "string or null"
    }`;

    // Single AI call with vision if file_url provided
    const extraction = await base44.integrations.Core.InvokeLLM({
      prompt: file_url ? prompt : `${prompt}\n\nDocument text:\n${emailText}`,
      file_urls: file_url ? [file_url] : undefined,
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
          promoter_contact: { type: ["string", "null"] },
          capacity: { type: ["number", "null"] },
          deposit_required: { type: ["boolean", "null"] },
          deposit_amount: { type: ["number", "null"] },
          requirements: { type: ["string", "null"] },
          notes: { type: ["string", "null"] }
        }
        }
        });

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