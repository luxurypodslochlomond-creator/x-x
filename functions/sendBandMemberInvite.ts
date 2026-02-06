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

    // Send invite email
    const appUrl = 'https://app.base44.com';
    const voteLink = `${appUrl}/cb51/band-vote?token=${token}&memberId=${memberId}&artistId=${artistId}`;
    
    await base44.integrations.Core.SendEmail({
      to: email,
      subject: `${artistName} invited you to vote on gigs`,
      body: `Hi ${memberName},\n\n${artistName} added you to their band!\n\nClick here to vote on gigs:\n${voteLink}\n\nThis link expires in 7 days.\n\n❤️ CB51`
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});