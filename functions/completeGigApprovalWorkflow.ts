import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * GIG APPROVAL WORKFLOW CONNECTOR
 * Orchestrates the entire workflow:
 * 1. Manager approves (sent_to_band)
 * 2. Band votes YES/NO
 * 3. All YES → auto-calendar + auto-email draft
 * 4. Any NO → capture reason, notify manager
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();
    const { event, data } = payload;

    // Get gig offer
    const gigOffer = await base44.asServiceRole.entities.ScottGigOffer.get(data.id);
    
    // === STEP 1: Manager reviews → sent_to_band ===
    if (data?.status === 'pending_manager_review') {
      // Manager will review using CB51NotificationInbox
      // They click YES (green) to move to sent_to_band
      return Response.json({ stage: 'awaiting_manager_review' });
    }

    // === STEP 2: Manager approved → notify band ===
    if (data?.status === 'sent_to_band' && !data.band_notified) {
      const teamMembers = await base44.asServiceRole.entities.ScottTeamMember.filter({
        artist_id: gigOffer.artist_id
      });

      if (teamMembers.length === 0) {
        return Response.json({ error: 'No band members' }, { status: 400 });
      }

      // Create band response records
      await Promise.all(
        teamMembers.map(m =>
          base44.asServiceRole.entities.ScottBandResponse.create({
            gig_offer_id: gigOffer.id,
            band_member_email: m.email,
            band_member_name: m.name,
            decision: 'pending',
            notification_sent_at: new Date().toISOString()
          })
        )
      );

      // Send notifications to band
      await Promise.all(
        teamMembers.map(m =>
          base44.asServiceRole.entities.ScottNotification.create({
            recipient_email: m.email,
            notification_type: 'band_gig_offer',
            gig_offer_id: gigOffer.id,
            title: `🎸 ${gigOffer.venue} - ${gigOffer.date}`,
            message: `£${gigOffer.fee?.toLocaleString()} - Vote YES or NO`,
            decision_button: 'yes',
            action_url: `/ScottBandVote?gig=${gigOffer.id}`
          })
        )
      );

      // Mark band notified
      await base44.asServiceRole.entities.ScottGigOffer.update(gigOffer.id, {
        band_notified: true
      });

      return Response.json({ success: true, stage: 'band_voting' });
    }

    // === STEP 3: Check if all band voted ===
    if (data?.status === 'sent_to_band') {
      const responses = await base44.asServiceRole.entities.ScottBandResponse.filter({
        gig_offer_id: gigOffer.id
      });

      const allVoted = responses.every(r => r.decision !== 'pending');
      if (!allVoted) {
        return Response.json({ stage: 'waiting_for_band_votes', voted: responses.filter(r => r.decision !== 'pending').length, total: responses.length });
      }

      // All voted - check results
      const allYes = responses.every(r => r.decision === 'yes');
      
      if (allYes) {
        // === ALL YES → AUTO CONFIRM & SYNC ===
        
        // Update status to confirmed
        await base44.asServiceRole.entities.ScottGigOffer.update(gigOffer.id, {
          status: 'confirmed',
          confirmed_at: new Date().toISOString()
        });

        // Trigger calendar sync (if Google Calendar connected)
        try {
          const accessToken = await base44.asServiceRole.connectors.getAccessToken('googlecalendar');
          const artist = await base44.asServiceRole.entities.ScottArtist.get(gigOffer.artist_id);
          
          const event_data = {
            summary: `🎵 ${artist.name} @ ${gigOffer.venue}`,
            description: `Confirmed gig\nPromoter: ${gigOffer.promoter}\nFee: £${gigOffer.fee}`,
            start: {
              dateTime: new Date(gigOffer.date).toISOString(),
              timeZone: 'Europe/London'
            },
            end: {
              dateTime: new Date(new Date(gigOffer.date).getTime() + 2 * 60 * 60 * 1000).toISOString(),
              timeZone: 'Europe/London'
            },
            location: gigOffer.venue
          };

          const calendarRes = await fetch(
            'https://www.googleapis.com/calendar/v3/calendars/primary/events',
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(event_data)
            }
          );

          if (calendarRes.ok) {
            const event = await calendarRes.json();
            await base44.asServiceRole.entities.ScottGigOffer.update(gigOffer.id, {
              calendar_event_id: event.id
            });
          }
        } catch (calError) {
          // Calendar not connected - that's ok, just skip
        }

        // Auto-draft email
        const emailBody = `Hi ${gigOffer.promoter || 'there'},

Confirmed: ${artist.name} for ${gigOffer.venue} on ${gigOffer.date}

Fee: £${gigOffer.fee}

Looking forward to it!`;

        await base44.asServiceRole.entities.ScottGigOffer.update(gigOffer.id, {
          ai_draft_accept: emailBody
        });

        // Notify manager (use gig creator email)
        await base44.asServiceRole.entities.ScottNotification.create({
          recipient_email: gigOffer.created_by,
          notification_type: 'manager_confirmed',
          gig_offer_id: gigOffer.id,
          title: `✅ ${gigOffer.venue} CONFIRMED`,
          message: `All band members said YES - calendar synced, email drafted`,
          action_url: `/ScottGigOffers?id=${gigOffer.artist_id}`
        });

        return Response.json({ success: true, stage: 'confirmed_auto_synced' });

      } else {
        // === ANY NO → CAPTURE REASONS ===
        const noVotes = responses.filter(r => r.decision === 'no');
        
        // Notify manager with reasons (use gig creator email)
        const reasons = noVotes.map(r => `${r.band_member_name}: ${r.reason_if_no || 'No reason given'}`).join('\n');
        
        await base44.asServiceRole.entities.ScottGigOffer.update(gigOffer.id, {
          status: 'needs_discussion',
          band_rejection_reasons: reasons
        });

        await base44.asServiceRole.entities.ScottNotification.create({
          recipient_email: gigOffer.created_by,
          notification_type: 'manager_votes_in',
          gig_offer_id: gigOffer.id,
          title: `⚠️ ${gigOffer.venue} - Band vote failed`,
          message: `${noVotes.length} member(s) said NO. Review reasons in CB51.`,
          action_url: `/ScottGigOffers?id=${gigOffer.artist_id}`
        });

        return Response.json({ success: true, stage: 'needs_discussion', no_votes: noVotes.length });
      }
    }

    return Response.json({ status: 'unknown' });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});