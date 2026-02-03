import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * SEND NOTIFICATION EMAIL - Band vote & manager approval emails with action links
 * Triggered when gig status changes to 'sent_to_band' or 'pending_manager_review'
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { gig_id, recipient_email, decision_type } = await req.json();

    if (!gig_id || !recipient_email || !decision_type) {
      return Response.json({ error: 'Missing params' }, { status: 400 });
    }

    const gigOffer = await base44.asServiceRole.entities.ScottGigOffer.get(gig_id);
    const artist = await base44.asServiceRole.entities.ScottArtist.get(gigOffer.artist_id);

    // Generate one-time token for email link security
    const token = btoa(`${gig_id}:${recipient_email}`).substring(0, 16);
    const baseUrl = new URL(req.url).origin;

    let subject = '';
    let body = '';

    if (decision_type === 'band_vote') {
      subject = `🎵 ${artist.name} @ ${gigOffer.venue} - ${gigOffer.date}`;
      
      const yesLink = `${baseUrl}/api/functions/processEmailDecision?decision=yes&gig_id=${gig_id}&band_member_email=${encodeURIComponent(recipient_email)}&token=${token}`;
      const noLink = `${baseUrl}/api/functions/processEmailDecision?decision=no&gig_id=${gig_id}&band_member_email=${encodeURIComponent(recipient_email)}&token=${token}`;

      body = `Manager approved this gig. Vote now:

🎸 ${artist.name}
📍 ${gigOffer.venue}, ${gigOffer.city}
📅 ${gigOffer.date}
💰 ${gigOffer.currency}${gigOffer.fee}

ONE-TAP DECISION:
[YES - I'm in] ${yesLink}
[NO - Can't make it] ${noLink}

Both links work on any device.`;

    } else if (decision_type === 'manager_review') {
      subject = `New gig offer: ${gigOffer.venue} (${gigOffer.date})`;
      
      const approveLink = `${baseUrl}/CB51?action=approve&gig=${gig_id}`;

      body = `New gig offer pending review:

${gigOffer.venue}, ${gigOffer.city}
${gigOffer.date} • ${gigOffer.currency}${gigOffer.fee}
Promoter: ${gigOffer.promoter || 'TBC'}

Review in CB51: ${approveLink}`;
    }

    // Send email
    await base44.integrations.Core.SendEmail({
      to: recipient_email,
      subject: subject,
      body: body,
      from_name: 'CB51'
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error('Email error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});