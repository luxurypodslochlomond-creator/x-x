import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * NOTIFY MANAGER - All band votes received
 * Check if all band members have voted, alert manager
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const { event, data } = payload;

    // Get gig offer
    const gigOffer = await base44.asServiceRole.entities.ScottGigOffer.get(data.id);
    
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

    // Get artist for manager
    const artist = await base44.asServiceRole.entities.ScottArtist.get(gigOffer.artist_id);

    // Build summary
    const summary = `${yesVotes}/${totalMembers} YES • ${noVotes} NO`;
    const noReasons = responses
      .filter(r => r.decision === 'no')
      .map(r => `${r.band_member_name}: ${r.reason_if_no || 'No reason given'}`)
      .join('\n');

    // Create push notification to manager with vote summary
    await base44.asServiceRole.entities.ScottNotification.create({
      recipient_email: artist.created_by,
      notification_type: 'manager_votes_in',
      gig_offer_id: gigOffer.id,
      title: `✅ VOTES IN: ${summary}`,
      message: `${gigOffer.venue_name} • ${gigOffer.date}`,
      decision_button: 'yes',
      action_url: `/pages/CB51?gig=${gigOffer.id}`
    });

    // Mark timestamp on gig offer
    await base44.asServiceRole.entities.ScottGigOffer.update(gigOffer.id, {
      all_responses_received_at: new Date().toISOString()
    });

    return Response.json({ 
      success: true,
      votes_summary: summary,
      gig: gigOffer.venue_name
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});