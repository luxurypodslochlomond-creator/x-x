import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * FORWARD GIG EMAILS HERE
 * Any email forwarded to this endpoint → AI extracts gig details → creates ScottGigOffer
 * Works with ANY email provider (Gmail, Outlook, ProtonMail, custom domains, etc)
 * 
 * Setup: Forward booking emails to the webhook URL for this function
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Get email content from request
    const { emailBody, from, subject } = await req.json();
    
    if (!emailBody) {
      return Response.json({ error: 'No email body provided' }, { status: 400 });
    }

    // SPAM FILTER - AI51 validates it's a real gig offer
    const validation = await base44.integrations.Core.InvokeLLM({
      prompt: `Is this a real gig booking offer? Check for:
- Venue name
- Date/time
- Payment/fee mention
- Professional tone

Email:
${emailBody}

Return "valid" if real gig offer, or reason it's spam/nonsense.`,
      response_json_schema: {
        type: "object",
        properties: {
          is_valid: { type: "boolean" },
          reason: { type: "string" }
        }
      }
    });

    if (!validation.is_valid) {
      console.log('Spam rejected:', validation.reason);
      return Response.json({ 
        message: 'Email rejected - not a gig offer',
        reason: validation.reason 
      });
    }

    // AI51 SMART EXTRACTION - fills gaps, fixes formatting, flags issues
    const extraction = await base44.integrations.Core.InvokeLLM({
      prompt: `You are AI51 - extract and IMPROVE this gig offer data.

Email:
${emailBody}

Instructions:
1. Extract all fields below
2. If city missing → guess from venue name using knowledge
3. If time unclear → look for "doors", "show time", or set to "20:00" (common UK gig time)
4. If currency not mentioned → default GBP for UK venues, USD for US, EUR for EU
5. Fix any formatting (dates to YYYY-MM-DD, times to HH:MM)
6. Flag anything uncertain in notes field

Fields:
- venue (string, required)
- city (string - MUST FILL even if guessing)
- county (string - guess from city if possible)
- country (string, default "UK")
- date (YYYY-MM-DD format, required)
- time (HH:MM format - default 20:00 if unclear)
- fee (number, required)
- currency (string, default "GBP")
- capacity (number - guess from venue if known)
- promoter (string)
- promoter_contact (string, email or phone)
- deposit_required (boolean)
- deposit_amount (number)
- is_tour (boolean, check if multiple dates mentioned)
- tour_dates (array of strings if is_tour)
- requirements (string, any special requirements)
- notes (string - ADD HERE: any guesses you made, missing info, or things Scott should double-check)
- ai51_confidence (string: "high", "medium", "low" - how confident are you in this extraction?)`,
      response_json_schema: {
        type: "object",
        properties: {
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
          requirements: { type: "string" },
          notes: { type: "string" },
          ai51_confidence: { type: "string" }
        },
        required: ["venue", "date", "fee"]
      }
    });

    // AI51 adds helpful note about what was guessed/unclear
    if (extraction.ai51_confidence === "low" || extraction.ai51_confidence === "medium") {
      extraction.notes = (extraction.notes || '') + `\n\n🤖 AI51: ${extraction.ai51_confidence} confidence - please double-check details marked as guesses.`;
    }

    // Check for duplicates (same venue + date)
    const existing = await base44.asServiceRole.entities.ScottGigOffer.filter({
      venue: extraction.venue,
      date: extraction.date
    });

    if (existing.length > 0) {
      return Response.json({ 
        message: 'Duplicate offer detected - skipped',
        existingOfferId: existing[0].id 
      });
    }

    // Get first artist for now (TODO: multi-artist support)
    const artists = await base44.asServiceRole.entities.ScottArtist.list();
    if (!artists || artists.length === 0) {
      return Response.json({ error: 'No artists found' }, { status: 400 });
    }

    // Create gig offer
    const offer = await base44.asServiceRole.entities.ScottGigOffer.create({
      ...extraction,
      artist_id: artists[0].id,
      raw_email: emailBody,
      status: 'pending_manager_review'
    });

    // Notify manager
    try {
      await base44.functions.invoke('notifyManager', {
        offerId: offer.id,
        venue: extraction.venue,
        date: extraction.date,
        fee: extraction.fee
      });
    } catch (e) {
      console.log('Push notification failed:', e);
    }

    return Response.json({ 
      success: true, 
      offerId: offer.id,
      message: 'Gig offer created - manager notified'
    });

  } catch (error) {
    console.error('Email processing error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});