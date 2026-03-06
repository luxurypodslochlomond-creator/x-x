import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

/**
 * SEND NOTIFICATION EMAIL
 * Sends band members a clean email with BIG GREEN YES / RED NO buttons
 * Works on any phone - no app needed
 */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { gig_id, recipient_email, decision_type, recipient_name } = await req.json();

    if (!gig_id || !recipient_email || !decision_type) {
      return Response.json({ error: 'Missing params' }, { status: 400 });
    }

    const gigOffer = await base44.asServiceRole.entities.GigOffer.get(gig_id);
    if (!gigOffer) {
      return Response.json({ error: 'Gig not found' }, { status: 404 });
    }

    const baseUrl = new URL(req.url).origin;
    const token = btoa(`${gig_id}:${recipient_email}`).substring(0, 16);

    const yesLink = `${baseUrl}/api/functions/processEmailDecision?decision=yes&gig_id=${gig_id}&band_member_email=${encodeURIComponent(recipient_email)}&token=${token}`;
    const noLink = `${baseUrl}/api/functions/emailDecisionReason?gig_id=${gig_id}&band_member_email=${encodeURIComponent(recipient_email)}&token=${token}`;

    const venue = gigOffer.venue || 'Gig Offer';
    const date = gigOffer.date_start || gigOffer.date || '';
    const fee = gigOffer.fee ? `£${gigOffer.fee.toLocaleString()}` : '';
    const city = gigOffer.city || '';
    const name = recipient_name || recipient_email.split('@')[0];

    let subject = '';
    let htmlBody = '';

    if (decision_type === 'band_vote') {
      subject = `🎸 New gig: ${venue}${date ? ' – ' + date : ''}`;

      htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="background:#0a0f1a;margin:0;padding:20px;font-family:-apple-system,sans-serif;">
  <div style="max-width:480px;margin:0 auto;background:#111827;border-radius:16px;overflow:hidden;border:2px solid #06b6d4;">
    
    <!-- Header -->
    <div style="background:#06b6d4;padding:20px 24px;">
      <div style="color:#000;font-size:1.4rem;font-weight:900;letter-spacing:2px;">CB51</div>
      <div style="color:#003344;font-size:0.8rem;margin-top:2px;">New Gig Offer</div>
    </div>

    <!-- Content -->
    <div style="padding:24px;">
      <p style="color:#9ca3af;font-size:0.9rem;margin:0 0 20px;">Hi ${name}, the manager has approved a new gig offer. Are you available?</p>

      <!-- Gig Details -->
      <div style="background:#1f2937;border-radius:12px;padding:20px;margin-bottom:24px;">
        <div style="color:white;font-size:1.3rem;font-weight:900;margin-bottom:12px;">📍 ${venue}</div>
        ${date ? `<div style="color:#06b6d4;font-size:0.9rem;margin-bottom:6px;">📅 ${date}${city ? ' · ' + city : ''}</div>` : ''}
        ${fee ? `<div style="color:#22c55e;font-size:1rem;font-weight:700;">💰 ${fee}</div>` : ''}
      </div>

      <!-- YES / NO Buttons -->
      <p style="color:#9ca3af;font-size:0.85rem;text-align:center;margin:0 0 16px;">Tap your answer — one tap, that's it:</p>
      
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding-right:8px;">
            <a href="${yesLink}" style="display:block;background:#22c55e;color:white;text-decoration:none;text-align:center;padding:18px;border-radius:12px;font-size:1.2rem;font-weight:900;letter-spacing:1px;">✅ YES</a>
          </td>
          <td style="padding-left:8px;">
            <a href="${noLink}" style="display:block;background:#ef4444;color:white;text-decoration:none;text-align:center;padding:18px;border-radius:12px;font-size:1.2rem;font-weight:900;letter-spacing:1px;">❌ NO</a>
          </td>
        </tr>
      </table>

      <p style="color:#4b5563;font-size:0.75rem;text-align:center;margin:16px 0 0;">Works on any phone. No app needed.</p>
    </div>

    <!-- Footer -->
    <div style="border-top:1px solid #1f2937;padding:16px 24px;text-align:center;">
      <div style="color:#374151;font-size:0.75rem;">CB51 · CitizenBand51</div>
    </div>
  </div>
</body>
</html>`;

    } else if (decision_type === 'manager_review') {
      subject = `New gig offer: ${venue}${date ? ' – ' + date : ''}`;
      const reviewLink = `${baseUrl}/CB51`;
      htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="background:#0a0f1a;margin:0;padding:20px;font-family:-apple-system,sans-serif;">
  <div style="max-width:480px;margin:0 auto;background:#111827;border-radius:16px;overflow:hidden;border:2px solid #06b6d4;">
    <div style="background:#06b6d4;padding:20px 24px;">
      <div style="color:#000;font-size:1.4rem;font-weight:900;letter-spacing:2px;">CB51</div>
      <div style="color:#003344;font-size:0.8rem;margin-top:2px;">Gig Offer Needs Review</div>
    </div>
    <div style="padding:24px;">
      <div style="background:#1f2937;border-radius:12px;padding:20px;margin-bottom:24px;">
        <div style="color:white;font-size:1.3rem;font-weight:900;margin-bottom:12px;">📍 ${venue}</div>
        ${date ? `<div style="color:#06b6d4;font-size:0.9rem;margin-bottom:6px;">📅 ${date}${city ? ' · ' + city : ''}</div>` : ''}
        ${fee ? `<div style="color:#22c55e;font-size:1rem;font-weight:700;">💰 ${fee}</div>` : ''}
      </div>
      <a href="${reviewLink}" style="display:block;background:#06b6d4;color:#000;text-decoration:none;text-align:center;padding:18px;border-radius:12px;font-size:1rem;font-weight:900;">REVIEW IN CB51 →</a>
    </div>
  </div>
</body>
</html>`;
    }

    await base44.integrations.Core.SendEmail({
      to: recipient_email,
      subject,
      body: htmlBody,
      from_name: 'CB51'
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error('Email error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});