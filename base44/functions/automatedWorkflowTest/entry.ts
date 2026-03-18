import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * Automated CB51 Workflow Test
 * Tests entire flow: Offer → Manager Approve → Band Vote → Complete
 * WITHOUT manual clicking
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const results = [];

    // STEP 1: Create test offer
    results.push('1️⃣ Creating test gig offer...');
    const offer = await base44.entities.ScottGigOffer.create({
      venue: "TEST: King Tut's",
      city: "Glasgow",
      country: "UK",
      date: "2026-03-20",
      time: "20:00",
      fee: 500,
      currency: "GBP",
      status: "pending_manager_review"
    });
    results.push(`✓ Created: ${offer.id}`);

    // STEP 2: Manager approves (simulated)
    results.push('2️⃣ Manager approving...');
    await base44.entities.ScottGigOffer.update(offer.id, {
      status: "sent_to_band",
      manager_approved: true,
      sent_to_band_date: new Date().toISOString()
    });
    results.push('✓ Approved → sent to band');

    // STEP 3: Create band responses (simulated)
    results.push('3️⃣ Band members voting...');
    
    const bandMembers = [
      { email: 'member1@test.com', name: 'Test Member 1', vote: 'yes' },
      { email: 'member2@test.com', name: 'Test Member 2', vote: 'yes' },
      { email: 'member3@test.com', name: 'Test Member 3', vote: 'no', reason: 'Double booked that night' }
    ];

    for (const member of bandMembers) {
      await base44.entities.ScottBandResponse.create({
        gig_offer_id: offer.id,
        band_member_email: member.email,
        band_member_name: member.name,
        vote: member.vote,
        reason: member.reason || null,
        responded_at: new Date().toISOString()
      });
      results.push(`✓ ${member.name}: ${member.vote.toUpperCase()}`);
    }

    // STEP 4: Mark all responses in
    results.push('4️⃣ Finalizing...');
    await base44.entities.ScottGigOffer.update(offer.id, {
      all_responses_in: true
    });
    results.push('✓ All votes recorded');

    results.push('');
    results.push('🎉 WORKFLOW COMPLETE - Check CB51 dashboard');
    results.push('');
    results.push('Results: 2 YES, 1 NO → Manager decides next');

    return Response.json({ 
      success: true, 
      results: results.join('\n'),
      offerId: offer.id
    });

  } catch (error) {
    return Response.json({ 
      error: error.message,
      stack: error.stack 
    }, { status: 500 });
  }
});