import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

/**
 * CB51 JOIN INVITE — handles the band member onboarding page
 * GET  ?token=xxx          → returns member + artist name for display
 * POST { token, subscription } → marks member active + stores push subscription
 */

function parseToken(token) {
  try {
    const decoded = atob(token);
    const parts = decoded.split(':');
    // token = memberId:artistId:email (email may contain @)
    const memberId = parts[0];
    const artistId = parts[1];
    const email = parts.slice(2).join(':');
    return { memberId, artistId, email };
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  // ── GET: load invite details ──
  if (req.method === 'GET') {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    if (!token) return Response.json({ error: 'Missing token' }, { status: 400 });

    const parsed = parseToken(token);
    if (!parsed) return Response.json({ error: 'Invalid token' }, { status: 400 });

    const { memberId, artistId, email } = parsed;

    const [members, artists] = await Promise.all([
      base44.asServiceRole.entities.BandMember.filter({ id: memberId, artist_id: artistId }),
      base44.asServiceRole.entities.Artist.filter({ id: artistId })
    ]);

    const member = members[0];
    const artist = artists[0];

    if (!member) return Response.json({ error: 'Invite not found' }, { status: 404 });

    return Response.json({
      memberName: member.name,
      artistName: artist?.name || 'your band',
      memberId,
      artistId,
      email: member.email,
      alreadyActive: member.status === 'active'
    });
  }

  // ── POST: activate member + store push subscription ──
  if (req.method === 'POST') {
    const { token, subscription } = await req.json();
    if (!token) return Response.json({ error: 'Missing token' }, { status: 400 });

    const parsed = parseToken(token);
    if (!parsed) return Response.json({ error: 'Invalid token' }, { status: 400 });

    const { memberId, artistId, email } = parsed;

    // Mark member as active
    await base44.asServiceRole.entities.BandMember.update(memberId, {
      status: 'active',
      notifications_enabled: !!subscription
    });

    // Store push subscription if provided
    if (subscription) {
      // Deactivate any old subscriptions for this email on cb51
      const existing = await base44.asServiceRole.entities.ScottPushSubscription.filter({
        user_email: email,
        is_active: true
      });
      for (const sub of existing) {
        await base44.asServiceRole.entities.ScottPushSubscription.update(sub.id, { is_active: false });
      }

      // Store new subscription
      await base44.asServiceRole.entities.ScottPushSubscription.create({
        user_email: email,
        subscription_data: subscription,
        is_active: true,
        brand: 'cb51',
        created_at: new Date().toISOString()
      });
    }

    // Notify manager that member joined
    const artists = await base44.asServiceRole.entities.Artist.filter({ id: artistId });
    const artist = artists[0];
    const members = await base44.asServiceRole.entities.BandMember.filter({ id: memberId });
    const member = members[0];

    if (artist && member) {
      try {
        await base44.asServiceRole.functions.invoke('sendManagerNotification', {
          managerEmail: artist.created_by,
          title: `🎸 ${member.name} joined CB51`,
          body: `${member.name} accepted their invite to ${artist.name} — notifications ${subscription ? 'enabled ✅' : 'not enabled'}`,
          gigOfferId: null,
          allConfirmed: false
        });
      } catch (e) {
        console.log('Manager notify failed (non-fatal):', e.message);
      }
    }

    return Response.json({ success: true, message: 'Welcome to the band!' });
  }

  return Response.json({ error: 'Method not allowed' }, { status: 405 });
});