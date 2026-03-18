import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gigId, artistId } = await req.json();

    if (!gigId || !artistId) {
      return Response.json({ error: 'Missing gigId or artistId' }, { status: 400 });
    }

    // Get gig details
    const gig = await base44.entities.GigOffer.get(gigId);
    if (!gig) {
      return Response.json({ error: 'Gig not found' }, { status: 404 });
    }

    // Get artist details for signature
    const artist = await base44.entities.Artist.get(artistId);

    // Use AI to generate professional confirmation email
    const llmPrompt = `Generate a professional gig confirmation email to the promoter.

DETAILS:
- Artist: ${artist?.name || 'The Band'}
- Venue: ${gig.venue || gig.title}
- Date: ${gig.date_start}
- Time: ${gig.time_start || 'TBC'}
- Fee: ${gig.fee ? '£' + gig.fee : 'As discussed'}
- Location: ${gig.location || 'As discussed'}
- Promoter: ${gig.promoter_name}
${gig.offer_details ? `- Notes: ${gig.offer_details}` : ''}

Write a warm, professional confirmation. Keep it short. Confirm the details above. Ask them to confirm receipt.

Sign off: "Best, ${artist?.name || 'The Band'}"`;

    let aiBody = null;
    try {
      const llmRes = await base44.asServiceRole.integrations.Core.InvokeLLM({
        prompt: llmPrompt
      });
      aiBody = llmRes;
    } catch (llmErr) {
      console.log('AI draft failed, using template:', llmErr.message);
    }

    const draftEmail = {
      to: gig.promoter_email,
      subject: `Confirmed: ${gig.venue || gig.title} - ${gig.date_start}`,
      body: aiBody || `Dear ${gig.promoter_name},

Thank you for the offer to play at ${gig.venue || gig.title}.

We're pleased to confirm our availability for the show:

**Show Details:**
• Venue: ${gig.venue || gig.title}
• Date: ${gig.date_start}
• Time: ${gig.time_start || 'To be confirmed'}
• Fee: ${gig.fee ? '£' + gig.fee : 'As discussed'}
${gig.location ? `• Location: ${gig.location}` : ''}

${gig.offer_details ? `**Additional Notes:**\n${gig.offer_details}\n` : ''}

The band is ready to rock! Please confirm receipt of this email.

Best,
${artist?.name || 'The Band'}
${user.full_name ? `via ${user.full_name}` : ''}`
    };

    return Response.json({
      status: 'success',
      draft: draftEmail,
      ready: true
    });
  } catch (error) {
    console.error('Generate email error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});