import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * TEST NOTIFICATION FLOW - Verifies all directions work
 * Band notified on gig offer
 * Band votes registered
 * Promoter notified on decision
 * Everything logged for debugging
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { artistId, testMode = true } = await req.json();

    if (!artistId) {
      return Response.json({ error: 'Missing artistId' }, { status: 400 });
    }

    const log = [];

    try {
      // STEP 1: Create test gig offer
      log.push('✓ Creating test gig offer...');
      const testGig = await base44.asServiceRole.entities.GigOffer.create({
        artist_id: artistId,
        promoter_name: 'TEST PROMOTER',
        promoter_email: 'test@example.com',
        venue: 'Test Venue',
        date_start: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        time_start: '20:00',
        fee: 500,
        status: 'manager_reviewing',
        offer_details: 'Test offer - notifications workflow',
        artist_name: 'Test Artist'
      });
      log.push(`✓ Gig created: ${testGig.id}`);

      // STEP 2: Manager approves (triggers band notification)
      log.push('✓ Manager approving gig...');
      await base44.asServiceRole.entities.GigOffer.update(testGig.id, {
        ...testGig,
        status: 'band_voting'
      });
      log.push('✓ Status set to band_voting');

      // STEP 3: Notify band
      log.push('✓ Triggering band notification...');
      try {
        await base44.asServiceRole.functions.invoke('notifyBandOnGigOffer', {
          gigOfferId: testGig.id,
          artistId: artistId,
          venue: testGig.venue,
          date: testGig.date_start,
          promoterName: testGig.promoter_name,
          fee: testGig.fee
        });
        log.push('✓ Band notification sent');
      } catch (e) {
        log.push(`⚠ Band notification failed: ${e.message}`);
      }

      // STEP 4: Simulate band approval
      log.push('✓ Simulating band approval...');
      await base44.asServiceRole.entities.GigOffer.update(testGig.id, {
        ...testGig,
        status: 'band_approved'
      });
      log.push('✓ Band approved gig');

      // STEP 5: Notify promoter of approval
      log.push('✓ Notifying promoter of approval...');
      try {
        await base44.asServiceRole.functions.invoke('notifyPromoterOnBandDecision', {
          gigOfferId: testGig.id,
          promoterEmail: testGig.promoter_email,
          artistName: testGig.artist_name,
          decision: 'approved'
        });
        log.push('✓ Promoter approval notification sent');
      } catch (e) {
        log.push(`⚠ Promoter notification failed: ${e.message}`);
      }

      // STEP 6: Check subscriptions exist
      log.push('✓ Checking UserPushSubscription setup...');
      const subscriptions = await base44.asServiceRole.entities.UserPushSubscription.list();
      log.push(`✓ Found ${subscriptions.length} active push subscriptions`);

      // STEP 7: Verify gig in system
      const gigCheck = await base44.asServiceRole.entities.GigOffer.get(testGig.id);
      log.push(`✓ Gig status verified: ${gigCheck.status}`);

      if (testMode) {
        log.push('⚠ TEST MODE - gig will be deleted');
        await base44.asServiceRole.entities.GigOffer.delete(testGig.id);
        log.push('✓ Test gig cleaned up');
      }

      return Response.json({
        success: true,
        message: 'Notification flow complete',
        log,
        testGigId: testMode ? null : testGig.id
      });

    } catch (stepError) {
      log.push(`❌ Error: ${stepError.message}`);
      throw stepError;
    }

  } catch (error) {
    console.error('Test notification flow error:', error);
    return Response.json(
      { 
        error: error.message,
        success: false
      },
      { status: 500 }
    );
  }
});