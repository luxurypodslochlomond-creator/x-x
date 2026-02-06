import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { memberId, email, memberName, artistName, artistId } = await req.json();

    if (!memberId || !email || !memberName || !artistName || !artistId) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create magic token (simple: memberId + timestamp)
    const token = btoa(`${memberId}:${Date.now()}`);
    const voteLink = `https://app.base44.com/cb51/band-vote?token=${token}&memberId=${memberId}&artistId=${artistId}`;

    // For now, just return the link (email sending requires registered users)
    // Band manager can share this link manually or we save it in TeamMember entity
    return Response.json({ 
      success: true, 
      inviteLink: voteLink,
      message: `Invite link created. Share with ${memberName} at ${email}`
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});