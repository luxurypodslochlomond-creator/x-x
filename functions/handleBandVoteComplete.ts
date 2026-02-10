import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * BAND MEMBER VOTES
 * When ALL band says YES → Manager gets ONE notification
 * When ANY says NO → Manager sees it in tracker, handles via CB51
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gig_id, vote_type } = await req.json();

    // Record band member vote
    const vote = await base44.entities.GigVote.create({
      gig_id,
      voted_by_role: 'band_member',
      vote_type,
      voted_at: new Date().toISOString()
    });

    console.log(`✓ Band member voted ${vote_type} on gig ${gig_id}`);

    // Check if all band members voted YES
    const gig = await base44.entities.GigOffer.get(gig_id);
    const bandMembers = await base44.entities.BandMember.filter({
      artist_id: gig.artist_id
    });

    const allVotes = await base44.entities.GigVote.filter({
      gig_id,
      voted_by_role: 'band_member'
    });

    const yesVotes = allVotes.filter(v => v.vote_type === 'yes').length;
    const allSaidYes = yesVotes === bandMembers.length;

    if (allSaidYes) {
      console.log(`✓ ALL BAND CONFIRMED on ${gig_id} - notifying manager`);

      // ONE notification to manager
      await base44.functions.invoke('sendCB51Notification', {
        title: `✓ BAND CONFIRMED - ${gig.venue}`,
        body: `All members YES • Ready to send to agent?`,
        tag: `gig-confirmed-${gig_id}`,
        url: `/CB51?tab=gig-confirmed&gig=${gig_id}`
      });
    }

    return Response.json({ success: true, allSaidYes });
  } catch (error) {
    console.error('Band vote error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});