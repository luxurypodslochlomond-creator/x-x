import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * notifyBandGigApproval
 * Called when manager clicks YES on a gig offer
 * Creates in-app notifications for all band members (no email, pure CB51)
 */

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { gigOfferId, gigDetails } = await req.json();

        if (!gigOfferId || !gigDetails) {
            return Response.json({ error: 'Missing gigOfferId or gigDetails' }, { status: 400 });
        }

        // Get the gig offer
        const gigOffer = await base44.entities.ScottGigOffers.filter({
            id: gigOfferId
        });

        if (gigOffer.length === 0) {
            return Response.json({ error: 'Gig offer not found' }, { status: 404 });
        }

        const offer = gigOffer[0];

        // Get all band members for this artist
        const bandMembers = await base44.entities.ScottTeamMember.filter({
            artist_id: offer.artist_id
        });

        if (bandMembers.length === 0) {
            return Response.json({
                success: true,
                notificationsSent: 0,
                message: 'No band members to notify'
            });
        }

        // Create in-app notification for each band member
        const notifications = bandMembers.map(member => ({
            recipient_email: member.email,
            notification_type: 'band_gig_offer',
            gig_offer_id: gigOfferId,
            title: `Manager says YES - ${offer.venue_name}`,
            message: `${offer.date} • Manager approved the gig. You in? Answer now.`,
            decision_button: 'yes_no',
            action_url: `/cb51/gig-vote?offerId=${gigOfferId}`
        }));

        // Bulk create notifications
        await base44.entities.ScottNotification.bulkCreate(notifications);

        return Response.json({
            success: true,
            notificationsSent: notifications.length,
            message: `Notified ${notifications.length} band members`
        });
    } catch (error) {
        console.error('Notification error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});