import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { scanHtmlForDanger, looksLikePII } from '../../shared/zappSafety.ts';

// ZAPP save with a server-side safety re-check. Public endpoint (no login) —
// kids don't have accounts. We do NOT trust the client: re-scan the HTML for
// danger and strip anything that looks like PII/contact info from the optional
// creator name before persisting. Returns {id} on success.

const ALLOWED_SHAPES = [
  'zap', 'diamond', 'star', 'pulse', 'flame', 'waveform', 'sparkle', 'rocket',
  'burst', 'spectrum', 'people', 'laugh', 'check', 'gear', 'trophy', 'shuffle',
];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    let body = {};
    try { body = await req.json(); } catch { /* empty body */ }
    const title = String(body?.title || '').slice(0, 80);
    const idea = String(body?.idea || '').slice(0, 500);
    const html = String(body?.html || '');
    let emoji = String(body?.emoji || 'zap');
    if (!ALLOWED_SHAPES.includes(emoji)) emoji = 'zap';
    let creatorName = String(body?.creator_name || '').trim().slice(0, 20);
    const remixOf = body?.remix_of ? String(body.remix_of) : null;
    const remixInstruction = body?.remix_instruction
      ? String(body.remix_instruction).slice(0, 500) : null;

    if (!title || !html || html.length < 200) {
      return Response.json({ error: 'missing data' }, { status: 400 });
    }

    // Re-scan the HTML server-side — a client crafted to bypass the build
    // guard must not be able to persist dangerous HTML to the public gallery.
    const scan = scanHtmlForDanger(html);
    if (!scan.safe) {
      console.warn('[zappSave] blocked:', scan.reasons.join(', '));
      return Response.json({ error: 'not safe to save', blocked: true }, { status: 400 });
    }

    // Strip anything that looks like contact info / a full name from the
    // optional first-name field. First names only, max two words, no digits.
    if (looksLikePII(creatorName) || /\d/.test(creatorName)) creatorName = '';
    const words = creatorName.split(/\s+/).filter(Boolean);
    if (words.length > 2) creatorName = words[0];

    const record = {
      title,
      idea,
      html,
      emoji,
      creator_name: creatorName || null,
      play_count: 0,
    };
    if (remixOf) {
      record.remix_of = remixOf;
      record.remix_instruction = remixInstruction;
    }

    const created = await base44.asServiceRole.entities.ZappCreation.create(record);
    return Response.json({ id: created?.id });
  } catch (error) {
    console.error('[zappSave] error:', error?.message || error);
    return Response.json({ error: error?.message || 'save failed' }, { status: 500 });
  }
});