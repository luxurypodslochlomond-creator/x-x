import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Step 1: Migrate ScottArtist → Artist
    const scottArtists = await base44.asServiceRole.entities.ScottArtist.list();
    const migratedArtists = [];

    for (const scott of scottArtists) {
      try {
        const artist = await base44.asServiceRole.entities.Artist.create({
          name: scott.name,
          email: scott.email,
          phone: scott.phone,
          profile_pic_url: scott.profile_pic_url,
          bio: scott.bio,
          genre: scott.genre,
          manager_email: scott.manager_email
        });
        migratedArtists.push({ scottId: scott.id, artistId: artist.id });
      } catch (err) {
        console.log(`Failed to migrate ScottArtist ${scott.id}:`, err.message);
      }
    }

    // Step 2: Migrate ScottTeamMember → TeamMember
    const scottMembers = await base44.asServiceRole.entities.ScottTeamMember.list();
    const migratedMembers = [];

    for (const scott of scottMembers) {
      // Find the migrated artist ID
      const artistMapping = migratedArtists.find(m => m.scottId === scott.artist_id);
      if (!artistMapping) continue;

      try {
        const member = await base44.asServiceRole.entities.TeamMember.create({
          artist_id: artistMapping.artistId,
          name: scott.name,
          email: scott.email,
          role: scott.role || 'band_member',
          status: scott.status || 'invited'
        });
        migratedMembers.push({ scottId: scott.id, memberId: member.id });
      } catch (err) {
        console.log(`Failed to migrate ScottTeamMember ${scott.id}:`, err.message);
      }
    }

    // Step 3: Migrate ScottGigOffer → GigOffer
    const scottGigs = await base44.asServiceRole.entities.ScottGigOffer.list();
    const migratedGigs = [];

    for (const scott of scottGigs) {
      const artistMapping = migratedArtists.find(m => m.scottId === scott.artist_id);
      if (!artistMapping) continue;

      try {
        const gig = await base44.asServiceRole.entities.GigOffer.create({
          artist_id: artistMapping.artistId,
          title: scott.title,
          venue: scott.venue,
          location: scott.location,
          date_start: scott.date_start,
          time_start: scott.time_start,
          fee: scott.fee,
          promoter_name: scott.promoter_name,
          promoter_email: scott.promoter_email,
          promoter_phone: scott.promoter_phone,
          offer_details: scott.offer_details,
          status: scott.status || 'manager_reviewing',
          manager_rejection_reason: scott.manager_rejection_reason,
          band_decision: scott.band_decision || 'pending'
        });
        migratedGigs.push({ scottId: scott.id, gigId: gig.id });
      } catch (err) {
        console.log(`Failed to migrate ScottGigOffer ${scott.id}:`, err.message);
      }
    }

    return Response.json({
      status: 'migration_complete',
      artistsMigrated: migratedArtists.length,
      membersMigrated: migratedMembers.length,
      gigsMigrated: migratedGigs.length,
      message: `✅ Migrated ${migratedArtists.length} artists, ${migratedMembers.length} members, ${migratedGigs.length} gigs`
    });
  } catch (error) {
    console.error('Migration error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});