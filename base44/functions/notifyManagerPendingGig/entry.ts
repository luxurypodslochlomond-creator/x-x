import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { gigId, artistId, venueName, promoterName } = await req.json();

    if (!gigId) {
      return Response.json({ error: 'gigId required' }, { status: 400 });
    }

    // Get artist to find manager email
    const artist = await base44.asServiceRole.entities.Artist.get(artistId);
    if (!artist || !artist.primary_manager_email) {
      return Response.json({ error: 'Manager email not found' }, { status: 404 });
    }

    // Send push notification to manager's phone
    await base44.asServiceRole.functions.invoke('sendBrowserPush', {
      recipient_email: artist.primary_manager_email,
      title: '🎤 New Gig Offer',
      message: `${venueName || 'New venue'} - ${promoterName || 'Promoter'}`,
      notification_type: 'new_gig_offer',
      gig_offer_id: gigId
    });

    return Response.json({ 
      status: 'Manager notified',
      gigId,
      managerEmail: artist.primary_manager_email
    });
  } catch (error) {
    console.error('notifyManagerPendingGig error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});