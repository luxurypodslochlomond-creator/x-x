import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { artistId, gigId, gigVenue, gigDate, gigFee } = await req.json();

    if (!artistId || !gigVenue) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get artist data (includes email)
    const artist = await base44.entities.Artist.get(artistId);
    if (!artist) {
      return Response.json({ error: 'Artist not found' }, { status: 404 });
    }

    // Send browser push notification via sendBrowserPush function — CB51 branded
    await base44.asServiceRole.functions.invoke('sendBrowserPush', {
      userId: artist.id,
      userEmail: artist.email,
      title: `Gig Confirmed! 🎵`,
      body: `${gigVenue} on ${gigDate} - £${gigFee?.toLocaleString() || '0'} confirmed`,
      tag: `gig-${gigId}`,
      brand: 'cb51',
      data: {
        gigId,
        navigateTo: `/ScottLive?gig=${gigId}`
      }
    });

    // Also send email notification
    await base44.integrations.Core.SendEmail({
      to: artist.email,
      subject: `Gig Confirmed: ${gigVenue}`,
      body: `Your gig at ${gigVenue} on ${gigDate} has been confirmed. Fee: £${gigFee?.toLocaleString() || '0'}`
    });

    return Response.json({ 
      success: true, 
      message: 'Push notification sent to artist',
      artistEmail: artist.email
    });
  } catch (error) {
    console.error('Push notification error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});