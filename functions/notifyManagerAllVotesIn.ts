import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * NOTIFY MANAGER - All band votes received
 * Check if all band members have voted, alert manager
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const { event, data, gigOfferId: directGigOfferId } = payload;

    // Get gig offer - handle multiple input formats
    const gigOfferId = directGigOfferId || (data && (data.gig_offer_id || data.id));
    const gigOffer = await base44.asServiceRole.entities.ScottGigOffer.get(gigOfferId);
    
    // Get all band responses for this gig
    const responses = await base44.asServiceRole.entities.ScottBandResponse.filter({
      gig_offer_id: gigOffer.id
    });

    if (!responses || responses.length === 0) {
      return Response.json({ skipped: true });
    }

    // Check if all have voted (no pending)
    const allVoted = responses.every(r => r.decision !== 'pending');
    
    if (!allVoted) {
      return Response.json({ skipped: true, reason: 'Not all votes in yet' });
    }

    // Count yes/no
    const yesVotes = responses.filter(r => r.decision === 'yes').length;
    const noVotes = responses.filter(r => r.decision === 'no').length;
    const totalMembers = responses.length;

    // Build summary with real-time vote breakdown
    const summary = `${yesVotes}/${totalMembers} YES • ${noVotes} NO`;
    const noReasons = responses
      .filter(r => r.decision === 'no')
      .map(r => `${r.band_member_name}: ${r.reason_if_no || 'No reason given'}`)
      .join('\n');

    // List who voted yes (real-time context for manager)
    const yesVoters = responses
      .filter(r => r.decision === 'yes')
      .map(r => r.band_member_name)
      .join(', ');

    // Send notification directly to manager with real-time vote breakdown
     await base44.asServiceRole.entities.ScottNotification.create({
       recipient_email: gigOffer.created_by,
       notification_type: 'manager_votes_in',
       gig_offer_id: gigOffer.id,
       title: `✅ VOTES IN: ${gigOffer.venue}`,
       message: `${summary}\n\n✓ YES: ${yesVoters}${noReasons ? '\n\n✗ NO:\n' + noReasons : ''}`,
       action_url: `/ScottGigOffers?id=${gigOffer.artist_id}`
     });

    // Send email to manager
    try {
      await base44.asServiceRole.integrations.Core.SendEmail({
        from_name: 'CB51',
        to: gigOffer.created_by,
        subject: `✅ All Votes In: ${gigOffer.venue}`,
        body: `All votes received:

${gigOffer.venue}
${gigOffer.date}

${summary}

✓ YES: ${yesVoters}
${noReasons ? '\n✗ NO:\n' + noReasons : ''}

Check CB51 → https://app.base44.com/CB51

CB51 • Your AI Co-Manager`
      });
    } catch (e) {
      console.log('Email failed:', e);
    }

    // Mark timestamp on gig offer
    await base44.asServiceRole.entities.ScottGigOffer.update(gigOffer.id, {
      all_responses_received_at: new Date().toISOString()
    });

    // IF ALL YES → Auto-confirm, sync calendar, draft email
    if (yesVotes === totalMembers && noVotes === 0) {
      await base44.asServiceRole.entities.ScottGigOffer.update(gigOffer.id, {
        status: 'confirmed'
      });
      
      // This will trigger syncGigToCalendar and draftPromoterEmail automations
    }

    return Response.json({ 
     success: true,
     votes_summary: summary,
     all_yes: yesVotes === totalMembers,
     gig: gigOffer.venue
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});