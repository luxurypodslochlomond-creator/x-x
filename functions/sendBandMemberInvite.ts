import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { memberId, email, memberName, artistName, artistId } = await req.json();

    if (!memberId || !email || !memberName || !artistName || !artistId) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create invite link
    const inviteUrl = `https://cb51.io/accept-invite?memberId=${memberId}&artistId=${artistId}`;

    // Send branded CB51 invitation email
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: email,
      from_name: 'CB51',
      subject: `${memberName}, you're invited to ${artistName}'s CB51 band`,
      body: `Hey ${memberName},

${artistName} added you to their CB51 band management.

Click below to accept and start voting on gigs:

${inviteUrl}

—
CB51 • AI Co-Manager for Artists
Avoid the Noise ♾️❤️`
    });

    return Response.json({ 
      success: true,
      message: `Invite sent to ${email}`
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});