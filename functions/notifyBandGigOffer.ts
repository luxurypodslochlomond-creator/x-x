import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * NOTIFY BAND - Push notification when manager sends gig offer
 * Triggered by entity automation when gig status = sent_to_band
 */

Deno.serve(async (req) => {
    try {
      const base44 = createClientFromRequest(req);
      const payload = await req.json();

      const { event, data } = payload;

      // Only trigger on sent_to_band status change
      if (data?.status !== 'sent_to_band') {
        return Response.json({ skipped: true });
      }

      // Get gig offer details
      const gigOffer = await base44.asServiceRole.entities.ScottGigOffer.get(data.id);

      // Get band members from ScottTeamMember entity
      const teamMembers = await base44.asServiceRole.entities.ScottTeamMember.filter({
        artist_id: gigOffer.artist_id
      });

      const bandMembers = teamMembers.map(m => ({
        email: m.email,
        name: m.name
      }));

      if (bandMembers.length === 0) {
        return Response.json({ error: 'No band members found' }, { status: 400 });
      }

      // Create ScottBandResponse records with pending status for each member
      const responsePromises = bandMembers.map(member =>
        base44.asServiceRole.entities.ScottBandResponse.create({
          gig_offer_id: gigOffer.id,
          band_member_email: member.email,
          band_member_name: member.name,
          decision: 'pending',
          notification_sent_at: new Date().toISOString()
        })
      );

      await Promise.all(responsePromises);

      // Send notifications directly to band members
      const notificationPromises = bandMembers.map(member =>
        base44.asServiceRole.entities.ScottNotification.create({
          recipient_email: member.email,
          notification_type: 'band_gig_offer',
          gig_offer_id: gigOffer.id,
          title: `🎸 NEW GIG: ${gigOffer.venue}`,
          message: `${gigOffer.date} • £${gigOffer.fee?.toLocaleString()} • Vote YES or NO`,
          action_url: `/ScottBandVote?gig=${gigOffer.id}`
        })
      );

      await Promise.all(notificationPromises);

      // Send emails to band members
      const emailPromises = bandMembers.map(member =>
        base44.asServiceRole.integrations.Core.SendEmail({
          from_name: 'CB51',
          to: member.email,
          subject: `🎸 New Gig: ${gigOffer.venue}`,
          body: `Hi ${member.name},

      New gig offer to vote on:

      ${gigOffer.venue}
      ${gigOffer.date}
      Fee: £${gigOffer.fee?.toLocaleString()}

      Vote YES or NO in CB51 → https://app.base44.com/ScottBandVote?gig=${gigOffer.id}

      CB51 • Your AI Co-Manager`
        }).catch(e => console.log('Email failed:', e))
      );

      await Promise.all(emailPromises);

      return Response.json({ 
        success: true,
        responses_created: bandMembers.length,
        notifications_sent: bandMembers.length,
        gig: gigOffer.venue
      });

    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  });