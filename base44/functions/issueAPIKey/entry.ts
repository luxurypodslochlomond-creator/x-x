import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

function generateKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return 'uf51_' + Array.from(arr).map(b => chars[b % chars.length]).join('');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' } });
  }

  const base44 = createClientFromRequest(req);
  const { name, email, what_building, which_api } = await req.json();

  if (!name || !email || !what_building || !which_api) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const api_key = generateKey();
  const now = new Date().toISOString();

  // Store key request
  await base44.asServiceRole.entities.APIKeyRequest.create({
    name,
    email,
    what_building,
    which_api,
    api_key,
    status: 'active',
    request_count: 0,
    key_issued_at: now
  });

  // Send key by email
  await base44.asServiceRole.integrations.Core.SendEmail({
    to: email,
    subject: 'Your UF51 API Key',
    body: `Hi ${name},

Your UF51 API key is ready. No waiting.

API KEY: ${api_key}

API selected: ${which_api}

Use it like this:

  Authorization: Bearer ${api_key}

The live endpoint URLs will be in the developer docs at uf51.love/Platform — we're in closed beta so endpoints are shared per-key. Reply to this email and we'll send the exact endpoint for what you're building.

What you said you're building:
"${what_building}"

Hold us to that. If your usage stops matching — we'll reach out before we revoke anything.

Free tier: 1,000 requests/month. Hit the limit? Email us. If it's good, we'll sort it.

With love,
UF51 — family@uf51.love`
  });

  // Notify us
  await base44.asServiceRole.integrations.Core.SendEmail({
    to: 'family@uf51.love',
    subject: `New API Key: ${name} — ${which_api}`,
    body: `New API key issued.\n\nName: ${name}\nEmail: ${email}\nAPI: ${which_api}\nBuilding: ${what_building}\nKey: ${api_key}`
  });

  return Response.json({ success: true, message: 'Key sent to your email.' });
});