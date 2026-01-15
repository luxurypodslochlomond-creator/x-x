import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * SYNC SCOTT'S EMAIL INBOX FOR GIG OFFERS
 * Runs every 5 minutes
 * Scans "pending" emails → creates gig offers automatically
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin only' }, { status: 403 });
    }

    // Get all pending messages waiting to sync
    const messages = await base44.asServiceRole.entities.ScottMessage.filter({
      status: 'pending'
    });

    if (messages.length === 0) {
      return Response.json({ synced: 0, message: 'No pending emails' });
    }

    let synced = 0;

    for (const msg of messages) {
      try {
        // Skip non-gig-offer messages
        if (msg.message_type !== 'gig_offer' && !msg.subject?.toLowerCase().includes('gig')) {
          continue;
        }

        // Extract gig details from email
        const extraction = await base44.integrations.Core.InvokeLLM({
          prompt: `Extract gig offer details from this email. Return JSON with: venue, city, county, country (default UK), date (YYYY-MM-DD), time, fee (number), capacity (number), promoter, promoter_contact, requirements, notes.

Email:
Subject: ${msg.subject || ''}
From: ${msg.from || ''}
Body: ${msg.body || ''}`,
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
              capacity: { type: "number" },
              promoter: { type: "string" },
              promoter_contact: { type: "string" },
              requirements: { type: "string" },
              notes: { type: "string" }
            }
          }
        });

        // Create gig offer
        const offer = await base44.asServiceRole.entities.ScottGigOffer.create({
          artist_id: msg.artist_id,
          ...extraction,
          raw_email: msg.body,
          email_id: msg.id,
          status: 'pending_manager_review',
          currency: 'GBP'
        });

        // Mark email as synced
        await base44.asServiceRole.entities.ScottMessage.update(msg.id, {
          status: 'synced',
          linked_offer_id: offer.id
        });

        // Push notification to Scott
        try {
          await base44.functions.invoke('notifyManager', {
            offerId: offer.id,
            venue: offer.venue,
            date: offer.date,
            urgent: true
          });
        } catch (e) {
          console.log('Notification failed:', e.message);
        }

        synced++;
      } catch (error) {
        // Mark as error but don't stop processing other emails
        await base44.asServiceRole.entities.ScottMessage.update(msg.id, {
          status: 'error',
          error_details: error.message
        });
        console.error(`Failed to process email ${msg.id}:`, error.message);
      }
    }

    return Response.json({
      success: true,
      synced,
      total: messages.length,
      message: `Synced ${synced}/${messages.length} emails`
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});