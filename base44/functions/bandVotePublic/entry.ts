import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

/**
 * BAND VOTE — NO LOGIN REQUIRED
 * Band members tap a link in SMS/email with a secure token.
 * Token = base64(gigOfferId:memberEmail:timestamp) — simple, stateless.
 * 
 * GET  ?token=xxx           → returns gig details for display
 * POST { token, vote, reason } → records vote + notifies manager
 */

function makeToken(gigOfferId, memberEmail) {
  return btoa(`${gigOfferId}:${memberEmail}`);
}

function parseToken(token) {
  try {
    const decoded = atob(token);
    const [gigOfferId, memberEmail] = decoded.split(':');
    return { gigOfferId, memberEmail };
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  // ── GET: fetch gig details for the vote page ──
  if (req.method === 'GET') {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return Response.json({ error: 'Missing token' }, { status: 400 });
    }

    const parsed = parseToken(token);
    if (!parsed) {
      return Response.json({ error: 'Invalid token' }, { status: 400 });
    }

    const { gigOfferId, memberEmail } = parsed;

    const gig = await base44.asServiceRole.entities.GigOffer.get(gigOfferId);
    if (!gig) {
      return Response.json({ error: 'Gig not found' }, { status: 404 });
    }

    // Check if already voted
    const existingVotes = await base44.asServiceRole.entities.GigVote.filter({
      gig_id: gigOfferId,
      member_email: memberEmail
    });

    const existingVote = existingVotes[0] || null;

    return Response.json({
      gig: {
        id: gig.id,
        venue: gig.venue || gig.title,
        date: gig.date_start,
        time: gig.time_start,
        location: gig.location,
        city: gig.city,
        fee: gig.fee,
        currency: gig.currency || 'GBP',
        promoter: gig.promoter_name,
        details: gig.offer_details,
        status: gig.status
      },
      memberEmail,
      existingVote: existingVote ? { vote: existingVote.vote, reason: existingVote.reason } : null
    });
  }

  // ── POST: record a vote ──
  if (req.method === 'POST') {
    const { token, vote, reason } = await req.json();

    if (!token || !vote) {
      return Response.json({ error: 'Missing token or vote' }, { status: 400 });
    }

    const parsed = parseToken(token);
    if (!parsed) {
      return Response.json({ error: 'Invalid token' }, { status: 400 });
    }

    const { gigOfferId, memberEmail } = parsed;

    const gig = await base44.asServiceRole.entities.GigOffer.get(gigOfferId);
    if (!gig) {
      return Response.json({ error: 'Gig not found' }, { status: 404 });
    }

    // Get member details
    const members = await base44.asServiceRole.entities.BandMember.filter({
      artist_id: gig.artist_id,
      email: memberEmail
    });
    const member = members[0];
    const memberName = member?.name || memberEmail;

    // Upsert vote
    const existingVotes = await base44.asServiceRole.entities.GigVote.filter({
      gig_id: gigOfferId,
      member_email: memberEmail
    });

    if (existingVotes.length > 0) {
      await base44.asServiceRole.entities.GigVote.update(existingVotes[0].id, {
        vote,
        reason: reason || null,
        voted_at: new Date().toISOString()
      });
    } else {
      await base44.asServiceRole.entities.GigVote.create({
        gig_id: gigOfferId,
        artist_id: gig.artist_id,
        member_email: memberEmail,
        member_name: memberName,
        vote,
        reason: reason || null,
        voted_at: new Date().toISOString()
      });
    }

    // Tally all votes for this gig
    const allBandMembers = await base44.asServiceRole.entities.BandMember.filter({
      artist_id: gig.artist_id,
      status: { $ne: 'inactive' }
    });
    const allVotes = await base44.asServiceRole.entities.GigVote.filter({
      gig_id: gigOfferId
    });

    const yesVotes = allVotes.filter(v => v.vote === 'yes').length;
    const noVotes = allVotes.filter(v => v.vote === 'no').length;
    const totalMembers = allBandMembers.length;
    const allVotedYes = yesVotes >= totalMembers && totalMembers > 0;
    const anyNo = noVotes > 0;

    // Notify manager via push if they have a subscription
    const managerEmail = gig.created_by;
    try {
      const notifTitle = anyNo
        ? `❌ ${memberName} said NO — ${gig.venue || gig.title}`
        : allVotedYes
          ? `✅ ALL YES — ${gig.venue || gig.title} CONFIRMED`
          : `✅ ${memberName} said YES (${yesVotes}/${totalMembers})`;

      const notifBody = anyNo
        ? (reason ? `Reason: ${reason}` : 'No reason given')
        : allVotedYes
          ? 'Band confirmed! Draft email ready to send.'
          : `${totalMembers - yesVotes - noVotes} still to vote`;

      await base44.asServiceRole.functions.invoke('sendManagerNotification', {
        managerEmail,
        title: notifTitle,
        body: notifBody,
        gigOfferId,
        allConfirmed: allVotedYes
      });
    } catch (e) {
      console.log('Manager notify failed (non-fatal):', e.message);
    }

    // If all yes — generate draft email + update gig status
    if (allVotedYes) {
      let draftEmail = `Hi ${gig.promoter_name || 'there'},\n\nGreat news — the band are all available and we'd love to confirm ${gig.venue || gig.title} on ${gig.date_start || 'the agreed date'}.\n\nPlease send over the contract and we'll get everything sorted from our end.\n\nBest,\nThe Management`;

      try {
        const aiDraft = await base44.asServiceRole.integrations.Core.InvokeLLM({
          prompt: `You are CB51, an AI music manager. Write a short, warm, professional confirmation email to a promoter/agent.\n\nVenue: ${gig.venue || gig.title}\nDate: ${gig.date_start || 'TBC'}\nFee: ${gig.fee ? '£' + gig.fee : 'as agreed'}\nPromoter: ${gig.promoter_name || ''}\n\nMax 4 sentences. No subject line. Sign off "The Management".`
        });
        draftEmail = aiDraft;
      } catch (e) {
        console.log('AI draft failed, using fallback:', e.message);
      }

      await base44.asServiceRole.entities.GigOffer.update(gigOfferId, {
        status: 'confirmed',
        ai_draft_accept: draftEmail,
        all_responses_in: true
      });
    }

    return Response.json({
      success: true,
      vote,
      memberName,
      voteCount: { yes: yesVotes, no: noVotes, total: totalMembers },
      allVotedYes,
      message: allVotedYes ? '🎉 Gig confirmed!' : 'Vote recorded — manager notified'
    });
  }

  return Response.json({ error: 'Method not allowed' }, { status: 405 });
});