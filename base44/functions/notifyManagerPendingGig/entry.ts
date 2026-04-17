import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { gigId, artistId, venueName, promoterName } = await req.json();

    if (!gigId) {
      return Response.json({ error: 'gigId required' }, { status: 400 });
    }

    // Get artist to find manager email - non-fatal if not found
    let managerEmail = null;
    if (artistId) {
      try {
        const artist = await base44.asServiceRole.entities.Artist.get(artistId);
        managerEmail = artist?.primary_manager_email || null;
      } catch (e) {
        console.log('Artist lookup failed (non-critical):', e.message);
      }
    }

    if (!managerEmail) {
      return Response.json({ status: 'No manager email found, skipping push', gigId });
    }

    // Send push notification to manager's phone
    await base44.asServiceRole.functions.invoke('sendBrowserPush', {
      recipient_email: managerEmail,
      title: '🎤 New Gig Offer',
      message: `${venueName || 'New venue'} - ${promoterName || 'Promoter'}`,
      notification_type: 'new_gig_offer',
      gig_offer_id: gigId
    });

    return Response.json({ 
      status: 'Manager notified',
      gigId,
      managerEmail
    });
  } catch (error) {
    console.error('notifyManagerPendingGig error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});