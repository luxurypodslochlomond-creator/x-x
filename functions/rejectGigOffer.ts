import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { gigId, reason } = await req.json();

    if (!gigId || !reason) {
      return Response.json({ error: 'Missing gigId or reason' }, { status: 400 });
    }

    // Update gig status to manager_rejected
    await base44.asServiceRole.entities.GigOffer.update(gigId, {
      status: 'manager_rejected',
      manager_rejection_reason: reason
    });

    return Response.json({
      status: 'success',
      message: 'Gig rejected'
    });
  } catch (error) {
    console.error('Reject gig error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});