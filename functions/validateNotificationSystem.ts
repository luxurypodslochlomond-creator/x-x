import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * VALIDATE NOTIFICATION SYSTEM
 * Checks all 4 notification paths work independently:
 * 1. Band notified on gig offer
 * 2. Manager notified on band vote  
 * 3. Promoter notified on decision
 * 4. Push subscriptions stored
 * Returns: what fires, what breaks
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const results = {
      bandNotification: null,
      managerNotification: null,
      promoterNotification: null,
      pushSubscriptions: null,
      allHealthy: false
    };

    // TEST 1: Band notification function exists and responds
    try {
      await base44.asServiceRole.functions.invoke('notifyBandOnGigOffer', {
        gigOfferId: 'test_id',
        artistId: 'test_id',
        venue: 'Test',
        date: new Date().toISOString(),
        promoterName: 'Test',
        fee: 0
      });
      results.bandNotification = 'fires';
    } catch (e) {
      results.bandNotification = `error: ${e.message}`;
    }

    // TEST 2: Manager notification function exists and responds
    try {
      await base44.asServiceRole.functions.invoke('notifyManagerGigOffer', {
        gigOfferId: 'test_id',
        artistId: 'test_id',
        managerEmail: 'test@example.com',
        gigDetails: 'Test'
      });
      results.managerNotification = 'fires';
    } catch (e) {
      results.managerNotification = `error: ${e.message}`;
    }

    // TEST 3: Promoter notification function exists and responds
    try {
      await base44.asServiceRole.functions.invoke('notifyPromoterOnBandDecision', {
        gigOfferId: 'test_id',
        promoterEmail: 'test@example.com',
        artistName: 'Test',
        decision: 'approved'
      });
      results.promoterNotification = 'fires';
    } catch (e) {
      results.promoterNotification = `error: ${e.message}`;
    }

    // TEST 4: Push subscriptions entity exists and is readable
    try {
      const subs = await base44.asServiceRole.entities.UserPushSubscription.list();
      results.pushSubscriptions = `ready (${subs.length} subscriptions)`;
    } catch (e) {
      results.pushSubscriptions = `error: ${e.message}`;
    }

    // Check if all healthy
    results.allHealthy = 
      results.bandNotification === 'fires' &&
      results.managerNotification === 'fires' &&
      results.promoterNotification === 'fires' &&
      results.pushSubscriptions?.includes('ready');

    return Response.json({
      success: results.allHealthy,
      validation: results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Validation error:', error);
    return Response.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
});