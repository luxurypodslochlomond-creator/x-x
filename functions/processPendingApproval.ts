import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * PROCESS APPROVED PENDING APPROVALS
 * When manager approves, actually send the email/notification
 * Triggered by entity automation when PendingApproval.status = approved
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const { event, data } = payload;

    // Only process approved approvals
    if (data?.status !== 'approved') {
      return Response.json({ skipped: true });
    }

    const approval = await base44.asServiceRole.entities.PendingApproval.get(data.id);
    const gigOffer = await base44.asServiceRole.entities.ScottGigOffer.get(approval.gig_offer_id);
    const artist = await base44.asServiceRole.entities.ScottArtist.get(gigOffer.artist_id);

    // Handle different approval types
    switch (approval.approval_type) {
      case 'band_gig_offer':
      case 'notification': {
        // Send notifications to band members
        const bandMembers = await base44.asServiceRole.entities.ScottBandMemember.filter({
          artist_id: gigOffer.artist_id
        });

        const notificationPromises = bandMembers.map(member =>
          base44.asServiceRole.entities.ScottNotification.create({
            recipient_email: member.email,
            notification_type: 'band_gig_offer',
            gig_offer_id: gigOffer.id,
            title: `VOTE: ${gigOffer.venue_name}`,
            message: `${artist.name} • ${gigOffer.date} • £${gigOffer.fee}`,
            decision_button: 'yes',
            action_url: `/pages/ScottBandVote?gig=${gigOffer.id}`
          })
        );

        await Promise.all(notificationPromises);
        return Response.json({ success: true, type: 'notifications_sent', count: bandMembers.length });
      }

      case 'band_vote_summary': {
        // Send manager alert about vote summary
        await base44.asServiceRole.entities.ScottNotification.create({
          recipient_email: artist.created_by,
          notification_type: 'manager_votes_in',
          gig_offer_id: gigOffer.id,
          title: `✅ VOTES IN: ${approval.content.summary}`,
          message: `${gigOffer.venue_name} • ${gigOffer.date}`,
          decision_button: 'yes',
          action_url: `/pages/CB51?gig=${gigOffer.id}`
        });
        return Response.json({ success: true, type: 'manager_notification_sent' });
      }

      case 'promoter_email': {
        // Draft email would be sent here (implementation depends on email service)
        console.log('Promoter email approved, would send:', approval.content);
        return Response.json({ success: true, type: 'email_approved' });
      }

      default:
        return Response.json({ skipped: true, reason: 'Unknown approval type' });
    }

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});