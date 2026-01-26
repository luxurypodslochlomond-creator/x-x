import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * notifyManagerGigOffer
 * Called when new gig offer arrives
 * Sends notification to manager (in-app + push with email fallback for iOS)
 * CORE FLOW ONLY - no extras
 */

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { gigOfferId, gigDetails, artistName } = await req.json();

        if (!gigOfferId || !gigDetails) {
            return Response.json({ error: 'Missing gigOfferId or gigDetails' }, { status: 400 });
        }

        // Get manager email from artist
        const artists = await base44.entities.ScottArtist.filter({
            id: gigDetails.artist_id
        });

        if (artists.length === 0) {
            return Response.json({ error: 'Artist not found' }, { status: 404 });
        }

        const manager = artists[0];

        // Create in-app notification
        const notification = await base44.entities.ScottNotification.create({
            recipient_email: manager.email,
            notification_type: 'manager_new_gig_offer',
            gig_offer_id: gigOfferId,
            title: `NEW GIG: ${gigDetails.venue_name}`,
            message: `${gigDetails.date} • ${gigDetails.promoter_name} • £${gigDetails.fee}`,
            decision_button: 'yes_no',
            action_url: `/cb51/gig-offers?id=${gigOfferId}`
        });

        // Send push notification (web push for Android, email fallback for iOS)
        await base44.asServiceRole.functions.invoke('sendBrowserPush', {
            title: `NEW GIG: ${gigDetails.venue_name}`,
            body: `${gigDetails.date} • £${gigDetails.fee}`,
            recipient_email: manager.email,
            url: `/cb51/gig-offers?id=${gigOfferId}`,
            tag: 'gig_offer'
        });

        return Response.json({
            success: true,
            notificationId: notification.id,
            message: 'Manager notified'
        });
    } catch (error) {
        console.error('Notification error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});