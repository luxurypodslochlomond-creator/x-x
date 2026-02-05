import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { gigOfferId } = await req.json();

    if (!gigOfferId) {
      return Response.json({ error: 'gigOfferId required' }, { status: 400 });
    }

    const gig = await base44.entities.GigOffer.get(gigOfferId);
    if (!gig) {
      return Response.json({ error: 'GigOffer not found' }, { status: 404 });
    }

    const artist = await base44.entities.Artist.get(gig.artist_id);
    const votes = await base44.entities.GigVote.filter({ gig_offer_id: gigOfferId });
    const noVotes = votes.filter(v => v.answer === 'no');

    let emailBody = `
GIGS: ${gig.title}
Location: ${gig.location}
Date: ${gig.date_start}

Band has voted NO. Here's why:

    `;

    noVotes.forEach(vote => {
      emailBody += `\n• "${vote.reason || 'No reason provided'}"\n`;
    });

    emailBody += `\nNext steps: Chat with the band to find a solution, or decline the offer.`;

    // Send to manager
    await base44.integrations.Core.SendEmail({
      to: artist.primary_manager_email,
      subject: `Band Rejected: ${gig.title}`,
      body: emailBody
    });

    // Update gig status
    await base44.entities.GigOffer.update(gigOfferId, {
      status: 'rejected'
    });

    return Response.json({
      status: 'Manager notified of rejection',
      gigId: gigOfferId,
      rejectionCount: noVotes.length,
      managerEmail: artist.primary_manager_email
    });
  } catch (error) {
    console.error('notifyManagerBandRejected error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});