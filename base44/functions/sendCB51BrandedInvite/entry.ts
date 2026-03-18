import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { email, name, artistName } = await req.json();

    if (!email || !name) {
      return Response.json({ error: 'Need email and name' }, { status: 400 });
    }

    // Send CB51-branded invite email
    await base44.integrations.Core.SendEmail({
      to: email,
      from_name: 'CB51 Artist Management',
      subject: `${user.full_name} invited you to CB51 • ${artistName || 'Artist Management'}`,
      body: `
Hi ${name},

${user.full_name} invited you to join CB51 for ${artistName}.

CB51 is your AI co-manager - gigs, votes, calendar, team coordination.

👉 Join here: https://cb51.io

Once you're in:
• Vote on gig offers
• View calendar
• Coordinate with team
• Get push notifications

Questions? Reply to this email.

CB51 Team ♾️❤️
      `.trim()
    });

    // Don't use Base44 generic invite - they can sign up directly via the CB51 link

    return Response.json({ 
      success: true,
      message: `CB51 invite sent to ${email}`
    });
  } catch (error) {
    console.error('CB51 invite error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});