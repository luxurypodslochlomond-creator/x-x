import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { memberId, email, memberName, artistName, artistId } = await req.json();

    if (!memberId || !email || !memberName || !artistName || !artistId) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Build tokenised join link — no login needed
    const token = btoa(`${memberId}:${artistId}:${email}`);
    const inviteUrl = `https://uf51.app/CB51Join?token=${token}`;

    // Send branded CB51 invitation email
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: email,
      from_name: 'CB51',
      subject: `${memberName} — you've been added to ${artistName} on CB51`,
      body: `Hey ${memberName},

Your manager just added you to ${artistName} on CB51.

Tap the link below to set up your notifications. Takes about 10 seconds — no account, no app download needed.

${inviteUrl}

Once you're set up, you'll get instant YES/NO gig offers straight to your phone.

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