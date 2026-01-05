import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * SCAN SCOTT'S INBOX (OPTIONAL OAUTH)
 * Runs every 5 mins if OAuth connected
 * Finds gig emails → auto-extracts → creates offers
 * BEYOND FILTER = AI51 intelligence to detect gig emails
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin only' }, { status: 403 });
    }

    // Get Gmail OAuth token
    let accessToken;
    try {
      accessToken = await base44.asServiceRole.connectors.getAccessToken('googlecalendar');
    } catch {
      return Response.json({ 
        error: 'Gmail not connected - use paste/screenshot instead',
        needsAuth: true 
      }, { status: 401 });
    }

    // Search Gmail for potential gig emails (last 24 hours)
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0].replace(/-/g, '/');
    const query = `(booking OR gig OR venue OR "live music" OR performance) after:${yesterday} -label:spam`;
    
    const searchResponse = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(query)}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    
    const { messages = [] } = await searchResponse.json();
    
    if (messages.length === 0) {
      return Response.json({ success: true, found: 0, message: 'No new gig emails' });
    }

    // Get first artist (TODO: multi-artist support)
    const artists = await base44.asServiceRole.entities.ScottArtist.list();
    if (!artists || artists.length === 0) {
      return Response.json({ error: 'No artists found' }, { status: 400 });
    }
    const artistId = artists[0].id;

    let processed = 0;
    let skipped = 0;

    // Process each email
    for (const message of messages.slice(0, 10)) { // Max 10 per run
      try {
        // Get full email
        const emailResponse = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}?format=full`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const email = await emailResponse.json();

        // Extract text from email
        const getBody = (payload) => {
          if (payload.body?.data) {
            return atob(payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
          }
          if (payload.parts) {
            for (const part of payload.parts) {
              const text = getBody(part);
              if (text) return text;
            }
          }
          return '';
        };

        const emailBody = getBody(email.payload);
        if (!emailBody) continue;

        // AI51: Is this a real gig offer?
        const validation = await base44.integrations.Core.InvokeLLM({
          prompt: `Is this a real gig booking offer? Check for venue, date, payment.
          
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
          skipped++;
          continue;
        }

        // Extract details
        const extraction = await base44.integrations.Core.InvokeLLM({
          prompt: `Extract gig offer details. ONLY extract what's stated - leave blank if missing.

Email:
${emailBody}

Return venue, city, county, country, date (YYYY-MM-DD), time (HH:MM), fee, currency, capacity, promoter, promoter_contact, deposit_required, deposit_amount, is_tour, requirements, notes (list what's MISSING).`,
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
              requirements: { type: "string" },
              notes: { type: "string" }
            },
            required: ["venue", "date", "fee"]
          }
        });

        // Check duplicate
        const existing = await base44.asServiceRole.entities.ScottGigOffer.filter({
          venue: extraction.venue,
          date: extraction.date
        });

        if (existing.length > 0) {
          skipped++;
          continue;
        }

        // Create offer
        await base44.asServiceRole.entities.ScottGigOffer.create({
          ...extraction,
          artist_id: artistId,
          raw_email: emailBody,
          status: 'pending_manager_review'
        });

        processed++;

      } catch (error) {
        console.error('Email processing error:', error);
      }
    }

    return Response.json({ 
      success: true,
      found: messages.length,
      processed,
      skipped,
      message: `Processed ${processed} new gig offers`
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});