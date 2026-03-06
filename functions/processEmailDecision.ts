import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

/**
 * PROCESS EMAIL DECISION - Handle YES/NO clicks from email links
 * Called as GET request from email buttons
 * YES → records vote immediately, shows thank you page
 * NO → redirects to a simple reason page
 */

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const decision = url.searchParams.get('decision');
  const gig_id = url.searchParams.get('gig_id');
  const band_member_email = url.searchParams.get('band_member_email');
  const token = url.searchParams.get('token');

  const htmlPage = (title, message, color) => new Response(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>CB51</title>
      <style>
        body { background: #0a0f1a; color: white; font-family: -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; text-align: center; }
        .card { background: #111827; border: 2px solid ${color}; border-radius: 16px; padding: 40px 32px; max-width: 400px; }
        h1 { color: ${color}; font-size: 2rem; margin: 0 0 12px; }
        p { color: #9ca3af; font-size: 1rem; margin: 0; line-height: 1.5; }
        .logo { color: #06b6d4; font-weight: 900; font-size: 1.5rem; margin-bottom: 24px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="logo">CB51</div>
        <h1>${title}</h1>
        <p>${message}</p>
      </div>
    </body>
    </html>
  `, { headers: { 'Content-Type': 'text/html' } });

  try {
    if (!decision || !gig_id || !token || !band_member_email) {
      return htmlPage('❌ Invalid Link', 'This link is missing required information.', '#ef4444');
    }

    // Verify token
    const expectedToken = btoa(`${gig_id}:${band_member_email}`).substring(0, 16);
    if (token !== expectedToken) {
      return htmlPage('❌ Invalid Link', 'This link has expired or is invalid.', '#ef4444');
    }

    const base44 = createClientFromRequest(req);

    // Get gig offer
    const gigOffer = await base44.asServiceRole.entities.GigOffer.get(gig_id);
    if (!gigOffer) {
      return htmlPage('❌ Not Found', 'This gig offer no longer exists.', '#ef4444');
    }

    // If NO → redirect to reason page
    if (decision === 'no') {
      const reasonUrl = `${url.origin}/api/functions/emailDecisionReason?gig_id=${gig_id}&band_member_email=${encodeURIComponent(band_member_email)}&token=${token}`;
      return Response.redirect(reasonUrl, 302);
    }

    // YES → record immediately
    const existing = await base44.asServiceRole.entities.GigOffer.get(gig_id);
    const bandResponses = existing.band_responses || [];
    const alreadyVoted = bandResponses.find(r => r.email === band_member_email);

    if (!alreadyVoted) {
      bandResponses.push({
        email: band_member_email,
        vote: 'yes',
        voted_at: new Date().toISOString()
      });

      await base44.asServiceRole.entities.GigOffer.update(gig_id, {
        band_responses: bandResponses
      });

      // Check if all band members voted yes
      try {
        await base44.asServiceRole.functions.invoke('completeGigApprovalWorkflow', {
          data: { id: gig_id, status: 'band_voting' }
        });
      } catch (e) {
        console.log('Workflow check:', e.message);
      }
    }

    return htmlPage('✅ You\'re In!', `Thanks! Your YES vote for <strong style="color:white">${gigOffer.venue}</strong> has been recorded. The manager will be notified when everyone has responded.`, '#22c55e');

  } catch (error) {
    console.error('Email decision error:', error);
    return htmlPage('❌ Something went wrong', error.message, '#ef4444');
  }
});