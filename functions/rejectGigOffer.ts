import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gigId, reason, gigData } = await req.json();

    if (!gigId) {
      return Response.json({ error: 'Missing gigId' }, { status: 400 });
    }

    const gig = gigData || {};

    // Only update the fields we need to change
    await base44.asServiceRole.entities.GigOffer.update(gigId, {
      status: 'rejected_by_manager',
      rejection_reason: reason || 'No reason given'
    });

    // Notify promoter of rejection
    try {
      await base44.asServiceRole.functions.invoke('notifyPromoterOnBandDecision', {
        gigOfferId: gigId,
        promoterEmail: gig.promoter_email,
        artistName: gig.artist_name || 'Artist',
        decision: 'rejected',
        rejectionReason: reason
      });
    } catch (err) {
      console.log('Promoter notification (non-critical):', err.message);
    }

    return Response.json({
      status: 'success',
      message: 'Gig rejected and promoter notified'
    });
  } catch (error) {
    console.error('Reject gig error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});