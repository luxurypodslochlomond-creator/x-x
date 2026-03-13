import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { createHash } from 'node:crypto';

/**
 * NOTIFY BAND - GIG APPROVAL
 * Generic - works for any artist's band members
 * Uses generic GigOffer + TeamMember entities
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const { gigOfferId } = await req.json();

    if (!gigOfferId) {
      return Response.json({ error: 'gigOfferId required' }, { status: 400 });
    }

    // Use generic GigOffer entity
    const gig = await base44.asServiceRole.entities.GigOffer.get(gigOfferId);
    if (!gig) {
      return Response.json({ error: 'GigOffer not found' }, { status: 404 });
    }

    // Use generic TeamMember entity, filtered by artist
    const bandMembers = await base44.asServiceRole.entities.TeamMember.filter({
      artist_id: gig.artist_id
    });

    if (!bandMembers || bandMembers.length === 0) {
      return Response.json({ 
        status: 'no_band_members',
        message: 'No band members to notify'
      });
    }

    const notificationPromises = bandMembers.map(async (member) => {
      if (!member.email) return null;

      // Generate magic voting token
      const token = createHash('sha256')
        .update(`${gigOfferId}-${member.id}-${Date.now()}`)
        .digest('hex')
        .substring(0, 32);

      const votingUrl = `${new URL(req.url).origin}/api/functions/bandVote?token=${token}&gigId=${gigOfferId}&memberId=${member.id}`;

      const title = `Vote: ${gig.venue || 'Gig Offer'}`;
      const body = `${gig.city || gig.location || 'TBD'} on ${gig.date}\nFee: £${gig.fee || '0'}\n\nVote YES or NO`;

      // Try push notification first
      try {
        await base44.asServiceRole.functions.invoke('sendBrowserPush', {
          recipient_email: member.email,
          title,
          message: body,
          notification_type: 'band_vote_request',
          gig_offer_id: gigOfferId
        });
      } catch (pushErr) {
        console.warn(`Push failed for ${member.email}, falling back to email`);
      }

      // Send email
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: member.email,
        subject: title,
        body: `${body}\n\nVote now: ${votingUrl}\n\nYES - I can make it\nNO - I can't make it\nMAYBE - Unsure, need more info`
      });

      return { memberId: member.id, email: member.email, notified: true };
    });

    const results = await Promise.all(notificationPromises);
    const notified = results.filter(Boolean);

    // Update gig status
    await base44.asServiceRole.entities.GigOffer.update(gigOfferId, {
      status: 'sent_to_band',
      votes_due_date: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()
    });

    return Response.json({ 
      status: 'Band notified',
      gigId: gigOfferId,
      membersNotified: notified.length,
      results: notified
    });

  } catch (error) {
    console.error('notifyBandGigApproval error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});