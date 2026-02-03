import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * SCAN GIG OFFERS FROM EMAIL
 * Email-agnostic: Gmail, Outlook, Hotmail
 * Extracts: venue, location, capacity, promoter, fee, tour info, logistics
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin only' }, { status: 403 });
    }

    const { emailText, artistId } = await req.json();
    
    // World-class AI extraction - detailed prompt for perfect accuracy
    const prompt = `You are a professional tour manager's assistant extracting gig offer details.

    CRITICAL: Be thorough and accurate. This is going into a calendar and contracts.

    Extract from this document:

    ESSENTIAL:
    - Artist/Band name (who is performing?)
    - Venue name (exact name, don't abbreviate)
    - City (e.g., "Palma", "London", "Glasgow")
    - County/Region (e.g., "Mallorca", "Greater London", "Scotland")
    - Country (full name: "Spain", "United Kingdom", etc.)
    - Date (YYYY-MM-DD format - convert any date format to this)
    - Show time (HH:MM format in 24h, e.g., "20:00" for 8pm)
    - Fee (just the number, no currency symbol)
    - Currency (GBP/USD/EUR/JPY/KRW/AUD/CAD)

    IMPORTANT DETAILS:
    - Venue capacity (how many people?)
    - Promoter name (who is offering the gig?)
    - Promoter email and phone
    - Deposit required? (yes/no)
    - Deposit amount if mentioned

    TOUR INFO:
    - Is this part of a tour? (multiple dates mentioned?)
    - All tour dates as array
    - Distance/travel time to next show

    TECHNICAL/RIDER:
    - Stage size, backline, sound requirements
    - Accommodation included?
    - Food/hospitality details
    - Load-in time

    NOTES:
    - Any special requirements
    - Unusual terms
    - Red flags or concerns

    Return JSON:
    {
    "artist": "string or null",
    "venue": "string or null", 
    "city": "string or null",
    "county": "string or null",
    "country": "string or null",
    "date": "YYYY-MM-DD or null",
    "time": "HH:MM or null",
    "fee": number or null,
    "currency": "GBP/USD/EUR/etc or null",
    "capacity": number or null,
    "promoter": "string or null",
    "promoter_contact": "string or null",
    "deposit_required": boolean or null,
    "deposit_amount": number or null,
    "is_tour": boolean or null,
    "tour_dates": ["YYYY-MM-DD"] or null,
    "distance_to_next": "string or null",
    "requirements": "string or null",
    "notes": "string or null"
    }

    Document text:
    ${emailText}`;

    const extraction = await base44.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: "object",
        properties: {
          artist: { type: ["string", "null"] },
          venue: { type: ["string", "null"] },
          city: { type: ["string", "null"] },
          county: { type: ["string", "null"] },
          country: { type: ["string", "null"] },
          date: { type: ["string", "null"] },
          time: { type: ["string", "null"] },
          fee: { type: ["number", "null"] },
          currency: { type: ["string", "null"] },
          capacity: { type: ["number", "null"] },
          promoter: { type: ["string", "null"] },
          promoter_contact: { type: ["string", "null"] },
          deposit_required: { type: ["boolean", "null"] },
          deposit_amount: { type: ["number", "null"] },
          is_tour: { type: ["boolean", "null"] },
          tour_dates: { type: ["array", "null"], items: { type: "string" } },
          distance_to_next: { type: ["string", "null"] },
          requirements: { type: ["string", "null"] },
          notes: { type: ["string", "null"] }
        }
      }
    });

    // Create gig offer - ensure required fields have values
    const offer = await base44.asServiceRole.entities.ScottGigOffer.create({
      artist_id: artistId,
      venue: extraction.venue || 'TBC',
      city: extraction.city,
      county: extraction.county,
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
      is_tour: extraction.is_tour || false,
      tour_dates: extraction.tour_dates,
      distance_to_next: extraction.distance_to_next,
      requirements: extraction.requirements,
      notes: extraction.notes,
      raw_email: emailText,
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