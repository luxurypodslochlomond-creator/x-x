import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { gigId, artistId, memberEmails } = await req.json();

    if (!gigId || !artistId || !memberEmails?.length) {
      return Response.json({ error: 'Missing params' }, { status: 400 });
    }

    // Get gig details
    const gig = await base44.asServiceRole.entities.GigOffer.filter({ id: gigId });
    if (!gig?.[0]) {
      return Response.json({ error: 'Gig not found' }, { status: 404 });
    }

    const gigData = gig[0];
    const gigDate = new Date(gigData.date).toLocaleDateString('en-GB', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });

    // Send push to each member
    const promises = memberEmails.map(async (email) => {
      try {
        await base44.integrations.Core.SendPushNotification({
          user_email: email,
          title: 'Gig Vote: ' + (gigData.venue || 'New Show'),
          body: `${gigDate} • ${gigData.city || 'TBA'} • Can you make it?`,
          tag: `gig_vote_${gigId}`,
          icon: 'https://cb51.io/cb51-logo-192x192.png',
          badge: 'https://cb51.io/cb51-badge-72x72.png',
          data: {
            type: 'gig_vote',
            gigId,
            artistId,
            action_url: `/CB51BandVote?gigId=${gigId}&artistId=${artistId}`
          }
        }).catch(e => console.log(`Push failed for ${email}:`, e.message));
      } catch (e) {
        console.log(`Error notifying ${email}:`, e.message);
      }
    });

    await Promise.all(promises);

    return Response.json({ 
      success: true, 
      notified: memberEmails.length 
    });
  } catch (error) {
    console.error('notifyBandOnGigVote error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});