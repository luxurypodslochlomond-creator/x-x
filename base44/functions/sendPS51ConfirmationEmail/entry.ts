import { base44 } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const { email, customerId } = await req.json();

    if (!email) {
      return Response.json({ error: 'Email required' }, { status: 400 });
    }

    // Use service role to send email
    const baseClient = await createClientFromRequest(req);

    // Send confirmation email
    const emailResult = await baseClient.integrations.Core.SendEmail({
      to: email,
      subject: 'Welcome to PetSounds51 — Your Subscription is Active ♾️',
      body: `
Hi there,

Thank you for subscribing to PetSounds51! Your subscription is now active.

**What you now have access to:**
• 14 science-backed healing protocols for your pet
• Thunderstorm & fireworks calming
• Separation anxiety relief
• Vet anxiety pre-emptive care
• Night anxiety & sleep onset
• Rescue trauma recovery
• Grief & loss support
• Pain & arthritis management
• Post-surgery recovery
• Cognitive decline support
• And more...

**Quick start:**
1. Go to https://uf51.love/PetSounds51
2. Select your pet (dog, cat, horse)
3. Choose any protocol and press play
4. Leave it on in the background

**Need help?**
If it doesn't help your pet — you have 30 days for a full refund, no questions asked.

This is real science. Your pet deserves this.

With love,
Universal Frequency 51

---
10% of your subscription goes directly to animal rescue via UF51 CIC.
      `
    });

    console.log('Confirmation email sent to:', email);

    return Response.json({
      success: true,
      email,
      message: 'Confirmation email sent'
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});