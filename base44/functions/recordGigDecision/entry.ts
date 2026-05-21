import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

/**
 * Record gig decision in CB51 audit trail
 * Called after manager confirms or all votes in
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { gigId, artistId, decision, allVotes, reason } = await req.json();

    if (!gigId || !decision) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create audit record
    const record = await base44.entities.CB51Task.create({
      title: `[AUDIT] Gig decision: ${decision}`,
      artist_id: artistId,
      notes: JSON.stringify({
        gig_id: gigId,
        decision,
        votes: allVotes,
        reason,
        timestamp: new Date().toISOString()
      }),
      status: 'done',
      priority: 'high'
    });

    return Response.json({ success: true, recordId: record.id });
  } catch (error) {
    console.error('Record decision error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});