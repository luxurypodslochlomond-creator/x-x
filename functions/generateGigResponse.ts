import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * GENERATE GIG RESPONSE EMAIL
 * AI learns manager's style from previous edits
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin only' }, { status: 403 });
    }

    const { offerId, responseType } = await req.json();
    
    const offer = await base44.entities.ScottGigOffer.filter({ id: offerId });
    if (!offer.length) {
      return Response.json({ error: 'Offer not found' }, { status: 404 });
    }
    
    const gigOffer = offer[0];
    
    // Get previous responses to learn style
    const previousResponses = await base44.entities.ScottGigOffer.filter({
      final_response_sent: { $ne: null }
    });
    
    let styleContext = '';
    if (previousResponses.length > 0) {
      styleContext = `\n\nLearn from manager's previous responses:\n${previousResponses.slice(-5).map(r => r.final_response_sent).join('\n\n')}`;
    }
    
    const acceptPrompt = `Write a professional email accepting this gig offer.
Keep it warm, confident, professional.

Gig details:
- Venue: ${gigOffer.venue}
- Date: ${new Date(gigOffer.date).toLocaleDateString()}
- Location: ${gigOffer.city}, ${gigOffer.country}
- Fee: ${gigOffer.currency}${gigOffer.fee}
- Promoter: ${gigOffer.promoter}

Confirm the booking, thank them, ask about next steps (contract, deposit, tech rider).
${styleContext}

Write the email:`;

    const rejectPrompt = `Write a polite email declining this gig offer.
Be gracious, professional, leave door open for future.

Gig details:
- Venue: ${gigOffer.venue}
- Date: ${new Date(gigOffer.date).toLocaleDateString()}
- Promoter: ${gigOffer.promoter}

Thank them for the offer, decline politely, suggest staying in touch.
${styleContext}

Write the email:`;
    
    const draft = await base44.integrations.Core.InvokeLLM({
      prompt: responseType === 'accept' ? acceptPrompt : rejectPrompt
    });
    
    // Save draft
    const updateField = responseType === 'accept' ? 'ai_draft_accept' : 'ai_draft_reject';
    await base44.entities.ScottGigOffer.update(offerId, {
      [updateField]: draft
    });
    
    return Response.json({ draft });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});