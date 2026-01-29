import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gig_offer_id } = await req.json();

    // Fetch gig offer details
    const offers = await base44.entities.ScottGigOffer.filter({ id: gig_offer_id });
    if (!offers.length) {
      return Response.json({ error: 'Gig offer not found' }, { status: 404 });
    }

    const gig = offers[0];

    // Fetch band votes
    const responses = await base44.entities.ScottBandResponse.filter({ 
      gig_offer_id: gig_offer_id 
    });

    const yesList = responses
      .filter(r => r.decision === 'yes')
      .map(r => r.band_member_name)
      .join(', ');

    const noList = responses
      .filter(r => r.decision === 'no')
      .map(r => `${r.band_member_name}${r.reason_if_no ? ` (${r.reason_if_no})` : ''}`)
      .join(', ');

    // Draft professional email
    const emailDraft = `Subject: Gig Confirmation - ${gig.venue || 'Your Event'} ${gig.date || ''}

Dear ${gig.promoter_contact_name || 'Event Organizer'},

I'm delighted to confirm that the band is available for ${gig.venue || 'your event'} on ${gig.date || 'the date discussed'}.

Band Status:
✓ Confirmed: ${yesList}
${noList ? `✕ Unavailable: ${noList}` : ''}

Fee: £${gig.fee || '[TO CONFIRM]'}
Load-in: ${gig.load_in_time || '[TO CONFIRM]'}
Set Duration: ${gig.set_duration || '[TO CONFIRM]'}

Looking forward to a great performance.

Best regards,
${user.full_name}`;

    return Response.json({ 
      email_draft: emailDraft,
      band_confirmed: yesList.split(', ').length,
      band_unavailable: noList ? noList.split(', ').length : 0
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});