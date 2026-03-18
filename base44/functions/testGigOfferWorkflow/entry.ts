import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin only' }, { status: 403 });
    }

    const testResults = [];

    // TEST 1: Create a test gig offer
    console.log('TEST 1: Creating test gig offer...');
    const gigOffer = await base44.entities.GigOffer.create({
      venue_name: 'The Garage (TEST)',
      date: '2026-03-15',
      time: '20:00',
      promoter_email: 'promoter@test.com',
      status: 'pending_manager_approval'
    });
    testResults.push({ step: 'Create gig offer', status: 'success', gigId: gigOffer.id });

    // TEST 2: Notify manager
    console.log('TEST 2: Notifying manager...');
    try {
      await base44.functions.invoke('notifyManagerGigOffer', {
        gigOfferId: gigOffer.id,
        managerEmail: user.email,
        venueName: 'The Garage (TEST)',
        date: '2026-03-15',
        time: '20:00'
      });
      testResults.push({ step: 'Manager notification', status: 'success' });
    } catch (e) {
      testResults.push({ step: 'Manager notification', status: 'error', error: e.message });
    }

    // TEST 3: Simulate manager approves
    console.log('TEST 3: Manager approves, notify band...');
    try {
      await base44.functions.invoke('notifyBandMembersOfGigOffer', {
        gigOfferId: gigOffer.id,
        venueName: 'The Garage (TEST)',
        date: '2026-03-15',
        time: '20:00',
        bandMemberEmails: ['band1@test.com', 'band2@test.com']
      });
      testResults.push({ step: 'Band member notifications', status: 'success' });
    } catch (e) {
      testResults.push({ step: 'Band member notifications', status: 'error', error: e.message });
    }

    // TEST 4: Band members vote
    console.log('TEST 4: Recording band votes...');
    try {
      await base44.functions.invoke('processBandVoteResponse', {
        gigOfferId: gigOffer.id,
        bandMemberEmail: 'band1@test.com',
        vote: 'yes',
        reason: null
      });

      await base44.functions.invoke('processBandVoteResponse', {
        gigOfferId: gigOffer.id,
        bandMemberEmail: 'band2@test.com',
        vote: 'yes',
        reason: null
      });
      testResults.push({ step: 'Band votes recorded', status: 'success' });
    } catch (e) {
      testResults.push({ step: 'Band votes recorded', status: 'error', error: e.message });
    }

    // TEST 5: All confirmed
    console.log('TEST 5: All confirmed, notify manager...');
    try {
      await base44.functions.invoke('notifyManagerAllConfirmed', {
        gigOfferId: gigOffer.id,
        managerEmail: user.email,
        venueName: 'The Garage (TEST)',
        date: '2026-03-15',
        promoterEmail: 'promoter@test.com'
      });
      testResults.push({ step: 'All confirmed notification', status: 'success' });
    } catch (e) {
      testResults.push({ step: 'All confirmed notification', status: 'error', error: e.message });
    }

    return Response.json({
      status: 'workflow_test_complete',
      gigOfferId: gigOffer.id,
      results: testResults
    });
  } catch (error) {
    console.error('Test error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});