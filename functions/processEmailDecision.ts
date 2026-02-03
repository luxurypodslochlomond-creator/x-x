import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * PROCESS EMAIL DECISION - Handle YES/NO clicks from email links
 * Band member or manager clicks link in email → this updates the decision
 */

Deno.serve(async (req) => {
  try {
    const { decision, gig_id, band_member_email, token } = await req.json();

    if (!decision || !gig_id || !token) {
      return Response.json({ error: 'Missing params' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    // Verify token matches band member (simple security)
    const expectedToken = btoa(`${gig_id}:${band_member_email}`).substring(0, 16);
    if (token !== expectedToken) {
      return Response.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get gig offer
    const gigOffer = await base44.asServiceRole.entities.ScottGigOffer.get(gig_id);
    if (!gigOffer) {
      return Response.json({ error: 'Gig not found' }, { status: 404 });
    }

    // Update or create band response
    const existing = await base44.asServiceRole.entities.ScottBandResponse.filter({
      gig_offer_id: gig_id,
      band_member_email: band_member_email
    });

    if (existing.length > 0) {
      await base44.asServiceRole.entities.ScottBandResponse.update(existing[0].id, {
        decision: decision === 'yes' ? 'yes' : 'no',
        reason_if_no: decision === 'no' ? 'Declined via email' : null,
        responded_at: new Date().toISOString()
      });
    } else {
      await base44.asServiceRole.entities.ScottBandResponse.create({
        gig_offer_id: gig_id,
        band_member_email: band_member_email,
        decision: decision === 'yes' ? 'yes' : 'no',
        reason_if_no: decision === 'no' ? 'Declined via email' : null,
        responded_at: new Date().toISOString()
      });
    }

    // Log audit trail
    try {
      await base44.asServiceRole.functions.invoke('logAuditTrail', {
        action: decision === 'yes' ? 'band_voted_yes' : 'band_voted_no',
        actor_email: band_member_email,
        actor_name: band_member_email,
        gig_offer_id: gig_id,
        venue: gigOffer.venue,
        fee: gigOffer.fee,
        details: `Email decision link clicked`
      });
    } catch (e) {
      console.log('Audit log skipped');
    }

    // Trigger workflow check (all votes in?)
    try {
      await base44.asServiceRole.functions.invoke('completeGigApprovalWorkflow', {
        data: { id: gig_id, status: 'sent_to_band' }
      });
    } catch (e) {
      console.log('Workflow check:', e.message);
    }

    return Response.json({ 
      success: true,
      message: decision === 'yes' ? 'Vote recorded - thanks!' : 'Vote recorded'
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});