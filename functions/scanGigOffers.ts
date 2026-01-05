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

    const { emailProvider, lastScanDate } = await req.json();
    
    // TODO: Connect to email via OAuth (Gmail/Outlook)
    // For now, we'll simulate with manual forwarding
    
    // AI extracts gig offer details
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

If field not found, use null.`;

    // This will be called when we have email access
    // For now, return structure
    
    return Response.json({ 
      success: true,
      message: 'Email scanner ready - authorize Gmail/Outlook to start scanning'
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});