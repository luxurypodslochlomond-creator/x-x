import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { name, email, company, phone, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Send email to UF51
    await base44.integrations.Core.SendEmail({
      to: 'family@uf51.love',
      subject: `ESG Partnership Inquiry from ${company || name}`,
      body: `
New ESG Alliance Inquiry

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Phone: ${phone || 'Not provided'}

Message:
${message}

---
Reply to: ${email}
      `.trim(),
    });

    // Optional: Also send confirmation to the inquiry sender
    await base44.integrations.Core.SendEmail({
      to: email,
      subject: 'We received your ESG partnership inquiry',
      body: `
Hi ${name},

Thank you for reaching out! We've received your inquiry and will review it shortly.

Our team will be in touch within 24 hours to discuss how UF51 can help you achieve your sustainability goals.

Best regards,
The UniversalFamily51 Team
family@uf51.love
      `.trim(),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error sending ESG inquiry:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});