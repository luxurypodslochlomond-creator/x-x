import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * TEST CB51 WORKFLOW - Full end-to-end test
 * Creates test gig → Manager approves → Band votes → Auto-confirms
 * Reports all pass/fail
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin only' }, { status: 403 });
    }

    const results = {
      timestamp: new Date().toISOString(),
      tests: [],
      passed: 0,
      failed: 0
    };

    const addResult = (name, passed, message) => {
      results.tests.push({ name, passed, message });
      if (passed) results.passed++;
      else results.failed++;
    };

    try {
      // 1. CREATE TEST ARTIST
      const artist = await base44.asServiceRole.entities.ScottArtist.create({
        name: 'TEST_Artist_' + Date.now(),
        email: 'test@cb51.test'
      });
      addResult('Create test artist', !!artist.id, `Artist: ${artist.id}`);

      // 2. CREATE TEST BAND MEMBERS
      const member1 = await base44.asServiceRole.entities.ScottTeamMember.create({
        artist_id: artist.id,
        name: 'Test Member 1',
        email: 'member1@cb51.test'
      });
      const member2 = await base44.asServiceRole.entities.ScottTeamMember.create({
        artist_id: artist.id,
        name: 'Test Member 2',
        email: 'member2@cb51.test'
      });
      addResult('Create band members', member1.id && member2.id, `Members: 2`);

      // 3. CREATE TEST GIG OFFER
      const tomorrow = new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0];
      const gig = await base44.asServiceRole.entities.ScottGigOffer.create({
        artist_id: artist.id,
        venue: 'TEST Venue ' + Date.now(),
        city: 'TEST City',
        country: 'UK',
        date: tomorrow,
        time: '20:00',
        fee: 500,
        currency: 'GBP',
        promoter: 'Test Promoter',
        status: 'pending_manager_review'
      });
      addResult('Create test gig', !!gig.id, `Gig: ${gig.id}`);

      // 4. MANAGER APPROVES → sent_to_band
      await base44.asServiceRole.entities.ScottGigOffer.update(gig.id, {
        status: 'sent_to_band',
        band_notified: false
      });
      addResult('Manager approve (status change)', true, `Status → sent_to_band`);

      // 5. TRIGGER WORKFLOW (band notification)
      try {
        await base44.asServiceRole.functions.invoke('completeGigApprovalWorkflow', {
          data: { id: gig.id, status: 'sent_to_band' }
        });
        addResult('Trigger band notification', true, `Notifications sent`);
      } catch (e) {
        addResult('Trigger band notification', false, e.message);
      }

      // Wait a moment for band responses to be created
      await new Promise(r => setTimeout(r, 500));

      // 6. CHECK BAND RESPONSES CREATED
      const responses = await base44.asServiceRole.entities.ScottBandResponse.filter({
        gig_offer_id: gig.id
      });
      addResult('Band response records created', responses.length === 2, `Responses: ${responses.length}/2`);

      // 7. BAND VOTES YES
      if (responses[0]) {
        await base44.asServiceRole.entities.ScottBandResponse.update(responses[0].id, {
          decision: 'yes',
          responded_at: new Date().toISOString()
        });
      }
      addResult('Band member 1 votes YES', !!responses[0], `Updated`);

      // 8. BAND VOTES YES
      if (responses[1]) {
        await base44.asServiceRole.entities.ScottBandResponse.update(responses[1].id, {
          decision: 'yes',
          responded_at: new Date().toISOString()
        });
      }
      addResult('Band member 2 votes YES', !!responses[1], `Updated`);

      // 9. TRIGGER WORKFLOW COMPLETION CHECK
      try {
        await base44.asServiceRole.functions.invoke('completeGigApprovalWorkflow', {
          data: { id: gig.id, status: 'sent_to_band' }
        });
        addResult('Trigger auto-confirm', true, `Workflow executed`);
      } catch (e) {
        addResult('Trigger auto-confirm', false, e.message);
      }

      // 10. VERIFY GIG CONFIRMED
      await new Promise(r => setTimeout(r, 500));
      const finalGig = await base44.asServiceRole.entities.ScottGigOffer.get(gig.id);
      const isConfirmed = finalGig.status === 'confirmed';
      addResult('Gig auto-confirmed', isConfirmed, `Status: ${finalGig.status}`);

      // 11. VERIFY AUDIT LOG
      const audits = await base44.asServiceRole.entities.AuditLog.filter({
        gig_offer_id: gig.id
      });
      addResult('Audit trail recorded', audits.length >= 3, `Logs: ${audits.length}`);

      // CLEANUP (optional - keep for manual inspection)
      // await base44.asServiceRole.entities.ScottArtist.delete(artist.id);

    } catch (error) {
      addResult('FATAL', false, error.message);
    }

    return Response.json({
      success: results.failed === 0,
      summary: `${results.passed} passed, ${results.failed} failed`,
      results
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});