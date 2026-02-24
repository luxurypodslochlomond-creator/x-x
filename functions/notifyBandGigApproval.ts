import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { createHash } from 'node:crypto';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { gigOfferId } = await req.json();

    if (!gigOfferId) {
      return Response.json({ error: 'gigOfferId required' }, { status: 400 });
    }

    const gig = await base44.entities.ScottGigOffer.filter({ id: gigOfferId });
    if (!gig || gig.length === 0) {
      return Response.json({ error: 'GigOffer not found' }, { status: 404 });
    }
    const gigData = gig[0];

    const bandMembers = await base44.entities.ScottTeamMember.filter({ artist_access: { $in: [gigData.artist_id] } });
    
    const notificationPromises = bandMembers.map(async (member) => {
      // Generate magic voting token
      const token = createHash('sha256')
        .update(`${gigOfferId}-${member.id}-${Date.now()}`)
        .digest('hex')
        .substring(0, 32);

      const votingUrl = `${new URL(req.url).origin}/api/functions/bandVote?token=${token}&gigId=${gigOfferId}&memberId=${member.id}`;

      const title = `Vote: ${gigData.venue || 'Gig Offer'}`;
      const body = `${gigData.city || gigData.location || 'TBD'} on ${gigData.date}\nFee: £${gigData.fee || '0'}\n\nVote YES or NO`;

      // Try push notification first
      if (member.push_subscription) {
        try {
          const pushPayload = JSON.stringify({
            title,
            body,
            icon: '/icon-192x192.png',
            badge: '/badge-72x72.png',
            tag: `gig-${gigOfferId}`,
            data: { url: votingUrl, gigId: gigOfferId }
          });

          // Note: Actual push would need web-push library setup
          // This logs the intent for now
          console.log(`Push queued for ${member.email}:`, pushPayload);
        } catch (pushErr) {
          console.warn(`Push failed for ${member.email}, falling back to email`);
        }
      }

      // Fallback email
      await base44.integrations.Core.SendEmail({
        to: member.email,
        subject: title,
        body: `
${body}

Vote now: ${votingUrl}

YES - I can make it
NO - I can't make it
MAYBE - Unsure, need more info
      `
      });

      return { memberId: member.id, email: member.email, notified: true };
    });

    const results = await Promise.all(notificationPromises);

    // Update gig status
    await base44.entities.ScottGigOffer.update(gigOfferId, {
      status: 'sent_to_band',
      votes_due_date: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()
    });

    return Response.json({ 
      status: 'Band notified',
      gigId: gigOfferId,
      membersNotified: results.length,
      results
    });
  } catch (error) {
    console.error('notifyBandGigApproval error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});