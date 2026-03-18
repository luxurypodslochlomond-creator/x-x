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
    const bandMembers = await base44.entities.BandMember.filter({ artist_id: gig.artist_id });
    const votes = await base44.entities.GigVote.filter({ gig_offer_id: gigOfferId });

    // Count votes
    const yesVotes = votes.filter(v => v.answer === 'yes').length;
    const noVotes = votes.filter(v => v.answer === 'no').length;
    const maybeVotes = votes.filter(v => v.answer === 'maybe').length;
    const allVoted = votes.length === bandMembers.length;

    let emailBody = `
GIGS: ${gig.title}
Location: ${gig.location}
Date: ${gig.date_start}

VOTE BREAKDOWN:
✅ YES: ${yesVotes}
❌ NO: ${noVotes}
❓ MAYBE: ${maybeVotes}
    `;

    // Add member names with their votes
    emailBody += '\n\nDETAILS:\n';
    votes.forEach(vote => {
      const member = bandMembers.find(m => m.id === vote.band_member_id);
      emailBody += `${member?.name || 'Unknown'}: ${vote.answer.toUpperCase()}`;
      if (vote.reason) emailBody += ` - "${vote.reason}"`;
      emailBody += '\n';
    });

    // If all YES, add draft confirmation email
    if (yesVoted === bandMembers.length && yesVotes > 0) {
      const draftEmail = `
DRAFT CONFIRMATION EMAIL (ready to send to promoter):

Dear ${gig.promoter_name},

Thank you for the offer. We're delighted to confirm that ${artist.name} can perform at ${gig.title}.

Date: ${gig.date_start}
Location: ${gig.location}

We look forward to it!

Best regards,
${artist.name} Management
      `;
      emailBody += `\n\n---\n${draftEmail}`;
    }

    // Send to manager
    await base44.integrations.Core.SendEmail({
      to: artist.primary_manager_email,
      subject: `Votes In: ${gig.title} (${yesVotes} YES, ${noVotes} NO${maybeVotes > 0 ? `, ${maybeVotes} MAYBE` : ''})`,
      body: emailBody
    });

    return Response.json({
      status: allVoted ? 'All votes in, manager notified' : 'Partial votes, waiting for more',
      gigId: gigOfferId,
      voteCount: { yes: yesVotes, no: noVotes, maybe: maybeVotes },
      allVoted,
      managerEmail: artist.primary_manager_email
    });
  } catch (error) {
    console.error('notifyManagerAllVotesIn error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});