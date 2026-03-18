import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gigOfferId, venueName, date, promoterEmail, managerEmail } = await req.json();

    // Get manager details
    const managerDetails = await base44.auth.me();

    const confirmationEmail = `
Hi there,

Great news! The band has confirmed their availability and we're excited to play at ${venueName} on ${date}.

Looking forward to it!

Best,
${managerDetails.full_name}
Band Manager
`.trim();

    // Send the email
    await base44.integrations.Core.SendEmail({
      to: promoterEmail,
      subject: `Confirmed: ${venueName} on ${date}`,
      body: confirmationEmail,
      from_name: 'CB51'
    });

    // Log in gig offer
    await base44.entities.GigOffer.update(gigOfferId, {
      status: 'confirmed',
      confirmation_sent_date: new Date().toISOString()
    });

    return Response.json({ status: 'email_sent' });
  } catch (error) {
    console.error('Email send error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});