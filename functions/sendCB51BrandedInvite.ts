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

${user.full_name} has invited you to join their CB51 artist management team.

CB51 is your AI co-manager - handling gigs, votes, calendar, and coordination.

Ready to get started?

👉 Sign up here: ${window.location.origin}/CB51

Once you're in, you'll be able to:
• Vote on gig offers
• View the calendar
• Coordinate with the team
• Get push notifications for decisions

Questions? Reply to this email.

See you inside,
CB51 Team

---
Built by UniversalFamily51 ♾️❤️
      `.trim()
    });

    // Also invite through Base44 system (so they can login)
    try {
      await base44.users.inviteUser(email, 'user');
    } catch (e) {
      console.log('Base44 invite (may already exist):', e.message);
    }

    return Response.json({ 
      success: true,
      message: `CB51 invite sent to ${email}`
    });
  } catch (error) {
    console.error('CB51 invite error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});