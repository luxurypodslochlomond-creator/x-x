import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

/**
 * SEND GIG CONFIRMATION EMAIL
 * Called when manager approves a gig
 * Emails the promoter with confirmation
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { gigId, artistId, gigData, decision } = await req.json();

    if (!gigId || !promoterEmail) {
      return Response.json({ error: 'Missing gigId or promoterEmail' }, { status: 400 });
    }

    const promoterEmail = gigData?.promoter_email;
    const promoterName = gigData?.promoter_name || 'Promoter';
    const venue = gigData?.venue || gigData?.title || 'Venue';
    const date = gigData?.date_start || 'TBD';
    const fee = gigData?.fee || 'TBD';
    const artistName = gigData?.artist_name || 'Artist';

    let emailSubject, emailBody;

    if (decision === 'approved') {
      emailSubject = `✅ Confirmed: ${artistName} at ${venue}`;
      emailBody = `Hi ${promoterName},

Great news! ${artistName} can confirm for your event.

📅 **${date}**
📍 **${venue}**
💰 **£${fee}**

We'll send load-in details shortly. Anything you need from us, just shout.

Cheers,
${artistName} Management`;
    } else {
      emailSubject = `❌ Unavailable: ${artistName} for ${venue}`;
      emailBody = `Hi ${promoterName},

Unfortunately ${artistName} isn't available for that date.

We appreciate the offer and hope to work together soon.

All the best,
${artistName} Management`;
    }

    // Send email via Core.SendEmail integration
    const emailResult = await base44.integrations.Core.SendEmail({
      to: promoterEmail,
      subject: emailSubject,
      body: emailBody,
      from_name: `${artistName} Management`
    });

    // Update gig record with email sent timestamp
    await base44.asServiceRole.entities.GigOffer.update(gigId, {
      final_response_sent: new Date().toISOString(),
      response_sent_date: new Date().toISOString()
    });

    console.log(`Email sent to ${promoterEmail} for gig ${gigId}`);

    return Response.json({
      success: true,
      message: `Email sent to ${promoterEmail}`,
      emailResult
    });

  } catch (error) {
    console.error('Send confirmation email error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});