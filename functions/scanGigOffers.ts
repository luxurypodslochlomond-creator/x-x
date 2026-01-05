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
    
    // AI extracts gig offer details from email text
    const prompt = `You are scanning an email for a gig/booking offer.
    
Extract these details if present:
- Artist/Band name
- Venue name
- Full location (city, county/state, country)
- Date and time
- Fee/payment amount
- Capacity
- Promoter name and contact
- Deposit info
- Is this part of a tour? Any other dates mentioned?
- Distance to next show (if tour)
- Any special requirements or notes
- Contact email/phone for confirmation

Return JSON with these fields:
{
  "artist": "string",
  "venue": "string", 
  "city": "string",
  "county": "string",
  "country": "string",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "fee": "number",
  "currency": "GBP/USD/EUR",
  "capacity": "number",
  "promoter": "string",
  "promoter_contact": "string",
  "deposit_required": "boolean",
  "deposit_amount": "number",
  "is_tour": "boolean",
  "tour_dates": ["array of dates"],
  "distance_to_next": "string",
  "requirements": "string",
  "notes": "string",
  "raw_email": "full email text"
}

If field not found, use null.

Email text: ${emailText}`;

    const extraction = await base44.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: "object",
        properties: {
          artist: { type: "string" },
          venue: { type: "string" },
          city: { type: "string" },
          county: { type: "string" },
          country: { type: "string" },
          date: { type: "string" },
          time: { type: "string" },
          fee: { type: "number" },
          currency: { type: "string" },
          capacity: { type: "number" },
          promoter: { type: "string" },
          promoter_contact: { type: "string" },
          deposit_required: { type: "boolean" },
          deposit_amount: { type: "number" },
          is_tour: { type: "boolean" },
          tour_dates: { type: "array", items: { type: "string" } },
          distance_to_next: { type: "string" },
          requirements: { type: "string" },
          notes: { type: "string" }
        }
      }
    });

    // Create gig offer
    const offer = await base44.asServiceRole.entities.ScottGigOffer.create({
      artist_id: artistId,
      ...extraction,
      raw_email: emailText,
      status: 'pending_manager_review'
    });
    
    // Notify manager
    try {
      await base44.functions.invoke('notifyManager', {
        offerId: offer.id,
        venue: offer.venue,
        date: offer.date
      });
    } catch (e) {
      console.log('Push notification failed:', e);
    }
    
    return Response.json({ 
      success: true,
      offer
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});