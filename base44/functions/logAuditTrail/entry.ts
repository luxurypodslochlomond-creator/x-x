import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

/**
 * LOG AUDIT TRAIL
 * Called by automations to record every decision
 * Creates immutable audit record for disputes
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { action, actor_email, actor_name, gig_offer_id, venue, fee, details, ip_address } = await req.json();

    if (!action || !actor_email || !gig_offer_id) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await base44.asServiceRole.entities.AuditLog.create({
      action,
      actor_email,
      actor_name: actor_name || 'Unknown',
      gig_offer_id,
      venue: venue || 'N/A',
      fee: fee || 0,
      details: details || '',
      ip_address: ip_address || 'N/A',
      timestamp: new Date().toISOString()
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Audit log failed:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});