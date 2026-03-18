import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

/**
 * EMAIL DECISION REASON - Simple page for band member to say WHY they said NO
 * GET → show the form
 * POST → save the reason and notify manager
 */

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const gig_id = url.searchParams.get('gig_id');
  const band_member_email = url.searchParams.get('band_member_email');
  const token = url.searchParams.get('token');

  const expectedToken = gig_id && band_member_email ? btoa(`${gig_id}:${band_member_email}`).substring(0, 16) : null;
  if (!expectedToken || token !== expectedToken) {
    return new Response('Invalid link', { status: 401 });
  }

  // GET → show reason form
  if (req.method === 'GET') {
    const base44 = createClientFromRequest(req);
    let venue = 'this gig';
    try {
      const gig = await base44.asServiceRole.entities.GigOffer.get(gig_id);
      if (gig?.venue) venue = gig.venue;
    } catch (e) { /* ok */ }

    return new Response(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>CB51 - Can't Make It</title>
        <style>
          body { background: #0a0f1a; color: white; font-family: -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
          .card { background: #111827; border: 2px solid #ef4444; border-radius: 16px; padding: 32px 24px; max-width: 420px; width: 100%; }
          .logo { color: #06b6d4; font-weight: 900; font-size: 1.3rem; margin-bottom: 20px; }
          h1 { color: #ef4444; font-size: 1.4rem; margin: 0 0 8px; }
          p { color: #9ca3af; font-size: 0.9rem; margin: 0 0 20px; }
          textarea { width: 100%; background: #1f2937; border: 1px solid #374151; border-radius: 8px; padding: 12px; color: white; font-size: 1rem; resize: none; height: 80px; box-sizing: border-box; }
          textarea:focus { outline: none; border-color: #ef4444; }
          button { width: 100%; background: #ef4444; color: white; font-weight: 900; font-size: 1rem; padding: 14px; border: none; border-radius: 8px; margin-top: 12px; cursor: pointer; }
          button:hover { background: #dc2626; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="logo">CB51</div>
          <h1>Can't Make It</h1>
          <p>Quick note for the manager about <strong style="color:white">${venue}</strong> — why can't you make it?</p>
          <form method="POST">
            <input type="hidden" name="gig_id" value="${gig_id}">
            <input type="hidden" name="band_member_email" value="${band_member_email}">
            <input type="hidden" name="token" value="${token}">
            <textarea name="reason" placeholder="e.g. Already booked that date, family commitment..." required></textarea>
            <button type="submit">SEND TO MANAGER</button>
          </form>
        </div>
      </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } });
  }

  // POST → save reason
  if (req.method === 'POST') {
    try {
      const formData = await req.formData();
      const reason = formData.get('reason') || 'No reason given';

      const base44 = createClientFromRequest(req);
      const gigOffer = await base44.asServiceRole.entities.GigOffer.get(gig_id);

      const bandResponses = gigOffer.band_responses || [];
      const alreadyVoted = bandResponses.find(r => r.email === band_member_email);

      if (!alreadyVoted) {
        bandResponses.push({
          email: band_member_email,
          vote: 'no',
          reason: reason,
          voted_at: new Date().toISOString()
        });

        await base44.asServiceRole.entities.GigOffer.update(gig_id, {
          band_responses: bandResponses
        });
      }

      // Notify manager via email
      try {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: gigOffer.created_by,
          subject: `❌ ${band_member_email.split('@')[0]} can't make ${gigOffer.venue}`,
          body: `A band member can't make the gig.\n\nGig: ${gigOffer.venue}\nDate: ${gigOffer.date_start || gigOffer.date}\nMember: ${band_member_email}\n\nReason: ${reason}\n\nView in CB51 to discuss.`,
          from_name: 'CB51'
        });
      } catch (e) {
        console.log('Manager email skipped:', e.message);
      }

      return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>CB51</title>
          <style>
            body { background: #0a0f1a; color: white; font-family: -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; text-align: center; }
            .card { background: #111827; border: 2px solid #f59e0b; border-radius: 16px; padding: 40px 32px; max-width: 400px; }
            h1 { color: #f59e0b; font-size: 1.8rem; margin: 0 0 12px; }
            p { color: #9ca3af; font-size: 1rem; margin: 0; line-height: 1.5; }
            .logo { color: #06b6d4; font-weight: 900; font-size: 1.5rem; margin-bottom: 24px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="logo">CB51</div>
            <h1>Message Sent</h1>
            <p>Your manager has been notified. Thanks for letting them know.</p>
          </div>
        </body>
        </html>
      `, { headers: { 'Content-Type': 'text/html' } });

    } catch (error) {
      return new Response('Error: ' + error.message, { status: 500 });
    }
  }

  return new Response('Method not allowed', { status: 405 });
});