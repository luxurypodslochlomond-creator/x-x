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

    // FAST CHECK: Quick duplicate scan before expensive AI extraction
    const existingOffers = await base44.asServiceRole.entities.ScottGigOffer.filter({
      artist_id: artistId
    });

    // Look for venue mentions in text first (instant)
    if (emailText) {
      const textLower = emailText.toLowerCase();
      const recentDupe = existingOffers.find(e => {
        const venueLower = e.venue?.toLowerCase() || '';
        return venueLower.length > 3 && textLower.includes(venueLower) && 
               new Date(e.date) > new Date(Date.now() - 7*24*60*60*1000); // Last 7 days
      });
      if (recentDupe) {
        return Response.json({ 
          error: 'Duplicate detected - already have ' + recentDupe.venue,
          existingOfferId: recentDupe.id,
          isDuplicate: true
        }, { status: 409 });
      }
    }

    // Smart AI extraction with context
    const extraction = await base44.integrations.Core.InvokeLLM({
      prompt: `Extract gig offer AND extract any message context - be smart about context.

    EXTRACT GIG OFFER:
    - venue, city, country, date (YYYY-MM-DD), time (HH:MM)
    - fee (number only), currency, promoter
    - capacity, deposit_required (boolean), red_flags (array of concerns)

    EXTRACT MESSAGE:
    - from (promoter name/email if visible)
    - subject (main ask/request)
    - body (core message, max 200 chars)
    - message_type (gig_offer, payment_request, follow_up, other)

    RED FLAGS TO CATCH:
    - Fee seems suspiciously low/high
    - Unclear payment terms
    - Travel > 500km
    - Very short notice (< 2 weeks)
    - Capacity < 100 (might be showcase, not paid gig)
    - No promoter contact

    SMART PARSING:
    - "June 12" → check year context, default 2026
    - "8pm-11pm" → use start time
    - "€3000" → extract 3000, set currency EUR
    - "50% deposit" → note in red_flags

    Return valid JSON only:`,
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
          capacity: { type: ["number", "null"] },
          deposit_required: { type: ["boolean", "null"] },
          red_flags: { type: ["array", "null"], items: { type: "string" } },
          raw_text: { type: ["string", "null"] },
          from: { type: ["string", "null"] },
          subject: { type: ["string", "null"] },
          body: { type: ["string", "null"] },
          message_type: { type: ["string", "null"] }
        }
      }
    });

    console.log('AI extraction:', extraction);

    // VALIDATION LAYER - Smart routing
    const isGigOffer = extraction.venue && extraction.date && extraction.message_type === 'gig_offer';
    
    // If NOT a gig, create Task instead
    if (!isGigOffer) {
      try {
        const task = await base44.asServiceRole.entities.ScottTask.create({
          artist_id: artistId,
          title: extraction.subject || 'Extracted from email/doc',
          description: extraction.body || extraction.raw_text || '',
          category: extraction.message_type || 'other',
          status: 'pending',
          from_contact: extraction.from || 'Unknown',
          notes: `Auto-extracted • Type: ${extraction.message_type || 'document'}`
        });
        
        return Response.json({ 
          success: true,
          type: 'task',
          task
        });
      } catch (e) {
        return Response.json({ error: `Task creation failed: ${e.message}` }, { status: 500 });
      }
    }
    
    // If IS a gig, continue with gig extraction
    if (!extraction.venue || !extraction.date) {
      return Response.json({ error: 'Could not extract venue or date for gig' }, { status: 400 });
    }

    // Validate date is in future
    const offerDate = new Date(extraction.date);
    if (offerDate < new Date()) {
      extraction.red_flags = [...(extraction.red_flags || []), 'DATE_IN_PAST'];
    }

    // Check for exact duplicates (same venue + exact date)
    const dupe = existingOffers.find(e => 
      e.venue?.toLowerCase() === extraction.venue?.toLowerCase() &&
      e.date === extraction.date
    );

    if (dupe) {
      return Response.json({ 
        error: 'Already have this gig',
        existingOfferId: dupe.id,
        isDuplicate: true
      }, { status: 409 });
    }

    if (extraction.emailText && extraction.emailText.length > 500) {
      extraction.raw_text = extraction.emailText.substring(0, 500);
    }

    // SANITIZE INPUT (prevent XSS)
    const sanitize = (str) => {
      if (!str) return '';
      return str
        .replace(/[<>\"']/g, '') // Remove HTML special chars
        .substring(0, 500) // Max length
        .trim();
    };

    // Create gig offer with smart defaults
    const offer = await base44.asServiceRole.entities.ScottGigOffer.create({
      artist_id: artistId,
      venue: sanitize(extraction.venue),
      city: sanitize(extraction.city),
      country: sanitize(extraction.country) || 'UK',
      date: extraction.date,
      time: extraction.time,
      fee: extraction.fee || 0,
      currency: extraction.currency || 'GBP',
      capacity: extraction.capacity,
      promoter: sanitize(extraction.promoter),
      deposit_required: extraction.deposit_required || false,
      red_flags: extraction.red_flags?.join(', '),
      notes: sanitize(extraction.raw_text),
      status: extraction.red_flags?.length > 0 ? 'flagged_for_review' : 'pending_manager_review'
    });

    // LOG AUDIT TRAIL
    try {
      await base44.asServiceRole.functions.invoke('logAuditTrail', {
        action: 'gig_scanned',
        actor_email: user.email,
        actor_name: user.full_name,
        gig_offer_id: offer.id,
        venue: offer.venue,
        fee: offer.fee,
        details: `Scanned via AI51 • ${extraction.red_flags?.length > 0 ? 'flagged' : 'clean'}`
      });
    } catch (e) {
      console.error('Audit log failed:', e);
    }

    // MYCELIUM: Auto-create message record if extracted
    if (extraction.from || extraction.subject) {
      try {
        await base44.asServiceRole.entities.ScottMessage.create({
          artist_id: artistId,
          from_contact: extraction.from || 'Unknown Promoter',
          raw_message: extraction.body || `Gig at ${extraction.venue} on ${extraction.date}`,
          intent: extraction.subject || `Gig offer: ${extraction.venue}`,
          category: extraction.message_type || 'gig_offer',
          summary: `${extraction.venue} • ${extraction.date} • £${extraction.fee || '?'}`,
          status: 'pending',
          source: 'other'
        });
      } catch (e) {
        console.log('Message creation skipped:', e);
      }
    }

    // Let entity automation handle notification (triggered by create)
    
    return Response.json({ 
      success: true,
      offer
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});