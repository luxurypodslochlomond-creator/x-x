import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * NOTIFICATION CHAIN FIX
 * When a band member votes on a gig offer, immediately notify the manager
 * Sends push notification + creates CB51 inbox notification
 * Handles real-time vote tracking
 */

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { bandResponseId, gigOfferId, artistId, bandMemberName, vote, reason } = await req.json();

        if (!bandResponseId || !gigOfferId || !artistId) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Get gig offer details
        const gigOffer = await base44.entities.ScottGigOffer.list();
        const offer = gigOffer.find(o => o.id === gigOfferId);

        if (!offer) {
            return Response.json({ error: 'Gig offer not found' }, { status: 404 });
        }

        // Get manager (created_by the offer)
        const managerEmail = offer.created_by;

        // Create CB51 inbox notification for manager
        const notificationTitle = vote === 'yes' 
            ? `✓ ${bandMemberName} YES to ${offer.venue || 'Gig'}`
            : `✕ ${bandMemberName} NO to ${offer.venue || 'Gig'}`;

        const notificationMessage = vote === 'yes'
            ? `${bandMemberName} approved the gig. Check vote breakdown.`
            : `${bandMemberName} declined: "${reason || 'No reason given'}"`;

        // Create notification in CB51
        await base44.entities.ScottNotification.create({
            artist_id: artistId,
            recipient_email: managerEmail,
            notification_type: 'band_vote_received',
            title: notificationTitle,
            message: notificationMessage,
            gig_offer_id: gigOfferId,
            band_member_name: bandMemberName,
            band_vote: vote,
            band_vote_reason: reason,
            status: 'pending'
        });

        // Send browser push notification to manager
        await base44.functions.invoke('sendBrowserPush', {
            recipient_email: managerEmail,
            title: notificationTitle,
            message: notificationMessage,
            notification_type: 'band_vote',
            gig_offer_id: gigOfferId
        });

        // Update offer vote count (for real-time display)
        const allResponses = await base44.entities.ScottBandResponse.list();
        const offersResponses = allResponses.filter(r => r.gig_offer_id === gigOfferId);
        const yesVotes = offersResponses.filter(r => r.vote === 'yes').length;
        const noVotes = offersResponses.filter(r => r.vote === 'no').length;

        console.log(`[BAND VOTE] ${bandMemberName} voted ${vote.toUpperCase()} on ${offer.venue}. YES: ${yesVotes}, NO: ${noVotes}`);

        return Response.json({ 
            success: true,
            notification_sent: true,
            vote_summary: { yes: yesVotes, no: noVotes }
        });

    } catch (error) {
        console.error('Manager notification error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});