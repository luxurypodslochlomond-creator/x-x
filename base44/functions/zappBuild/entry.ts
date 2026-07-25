import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  BUILD_SYSTEM_PROMPT,
  INPUT_GUARD_PROMPT,
  scanHtmlForDanger,
} from '../../shared/zappSafety.ts';

// ZAPP build with a kid-safety layer. Public endpoint (no login) — ZAPP is
// a no-account kids' tool. Three stages, all server-side so kids can't bypass:
//   1. INPUT GUARD  — strip PII, block unsafe ideas
//   2. BUILD        — generate the single-file HTML app
//   3. OUTPUT GUARD — scan the HTML for external/network/exfiltration patterns
// Returns {html, title, safe:true} or {blocked:true, reason}.

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    let body = {};
    try { body = await req.json(); } catch { /* empty body = nothing to build */ }
    const idea = String(body?.idea || '').slice(0, 500);
    if (!idea || idea.trim().length < 3) {
      return Response.json(
        { blocked: true, reason: "Tell me what you'd like to build!" },
        { status: 400 }
      );
    }

    // 1. INPUT GUARD — strip PII + block unsafe ideas (one fast LLM call)
    const guard = await base44.asServiceRole.integrations.Core.InvokeLLM({
      model: 'gemini_3_flash',
      prompt: `${INPUT_GUARD_PROMPT}

KID'S IDEA: """${idea}"""`,
      response_json_schema: {
        type: 'object',
        properties: {
          safe: { type: 'boolean' },
          reason: { type: 'string' },
          sanitized_idea: { type: 'string' },
        },
        required: ['safe', 'sanitized_idea'],
      },
    });

    if (guard?.safe === false) {
      return Response.json({
        blocked: true,
        reason: String(guard?.reason || "Let's try a different idea!").slice(0, 120),
      });
    }
    const sanitized = String(guard?.sanitized_idea || idea).slice(0, 500);

    // 2. BUILD — generate the single-file HTML app
    const build = await base44.asServiceRole.integrations.Core.InvokeLLM({
      model: 'gemini_3_flash',
      prompt: `${BUILD_SYSTEM_PROMPT}

BUILD THIS NOW: "${sanitized}"

CRITICAL BEFORE YOU OUTPUT:
- Every button you mention MUST have an onclick handler that works
- Every state variable MUST be initialised before use
- Test the full app flow in your head: start → interact → complete → restart
- The Restart / Reset button MUST fully reset ALL state variables back to defaults
- NO placeholder text like "// add logic here" — write the complete working code
- FOR GAMES: use a COMPACT D-pad (small clustered arrows in one corner), NOT big full-width buttons. Movement controls must be tiny. The play area is the star, not the buttons.

Return ONLY valid JSON: {"html": "<complete single-file HTML app here>"}
No explanation. No markdown. Just the JSON. The HTML MUST start with <!DOCTYPE html>.`,
      response_json_schema: {
        type: 'object',
        properties: { html: { type: 'string' } },
        required: ['html'],
      },
    });

    let html = '';
    if (build?.html) {
      html = build.html;
    } else if (typeof build === 'string') {
      try { html = JSON.parse(build)?.html || build; } catch { html = build; }
    }

    if (!html || html.length < 200) {
      return Response.json(
        { blocked: true, reason: "Hmm, that one didn't build — tap to try again!" },
        { status: 502 }
      );
    }

    // Make sure it starts clean (same trim the client used to do)
    if (!html.trim().startsWith('<!DOCTYPE') && !html.trim().startsWith('<html')) {
      const docStart = html.indexOf('<!DOCTYPE');
      const htmlStart = html.indexOf('<html');
      const start = docStart >= 0 ? docStart : htmlStart >= 0 ? htmlStart : -1;
      if (start >= 0) html = html.slice(start);
    }

    // 3. OUTPUT GUARD — block external/network/exfiltration patterns in the code
    const scan = scanHtmlForDanger(html);
    if (!scan.safe) {
      console.warn('[zappBuild] output blocked:', scan.reasons.join(', '));
      return Response.json({
        blocked: true,
        reason: "Let's try a different idea — that one's not safe to build.",
      }, { status: 400 });
    }

    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : sanitized.slice(0, 40);

    return Response.json({ html, title, safe: true });
  } catch (error) {
    console.error('[zappBuild] error:', error?.message || error);
    return Response.json({
      blocked: true,
      reason: "Something went wrong — try again in a moment!",
    }, { status: 500 });
  }
});