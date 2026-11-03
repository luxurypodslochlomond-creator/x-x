import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import {
  COMBINED_BUILD_PROMPT,
  QUICK_BUILD_PROMPT,
  UPGRADE_PROMPT,
  REMIX_PROMPT,
  scanHtmlForDanger,
} from '../../shared/zappSafety.ts';

// ZAPP build with a kid-safety layer. Public endpoint (no login) — ZAPP is
// a no-account kids' tool. ONE LLM call (safety check + build in a single
// pass) returning RAW HTML — no JSON-encoding overhead, so it finishes well
// inside the frontend invoke timeout. Output HTML is still scanned for
// external/network/exfiltration patterns before it reaches the kid.
// Returns {html, title, safe:true} or {blocked:true, reason}.
// Remix mode: pass existingHtml to evolve an already-built app.

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
    // Remix: the kid built an app and wants a change. We pass the existing HTML
    // so the model evolves the real app instead of rebuilding from the text idea.
    const existingHtml = String(body?.existingHtml || '').slice(0, 20000);

    // Two passes on a first build, one on a remix:
    //  - stage:'quick'  → small and complete, so the kid is playing in seconds
    //  - upgrade:true   → the same app made fuller, asked for from the app that
    //                     already plays, so nothing is waiting on it
    // Both passes go through the identical output scan below: the fast door is
    // not a looser door.
    const isUpgrade = body?.upgrade === true;
    const isQuick = body?.stage === 'quick';

    const CRITICAL_BEFORE_YOU_OUTPUT = `CRITICAL BEFORE YOU OUTPUT:
- Every button you mention MUST have an onclick handler that works
- Every state variable MUST be initialised before use
- Test the full app flow in your head: start → interact → complete → restart
- The Restart / Reset button MUST fully reset ALL state variables back to defaults
- NO placeholder text like "// add logic here" — write the complete working code
- FOR GAMES: use a COMPACT D-pad (small clustered arrows in one corner), NOT big full-width buttons. Movement controls must be tiny. The play area is the star, not the buttons.
- KEEP CODE TIGHT — under 150 lines of JS. Build only what the kid asked for.`;

    let prompt;
    if (isUpgrade && existingHtml) {
      prompt = `${UPGRADE_PROMPT} "${idea}"

${existingHtml}

${CRITICAL_BEFORE_YOU_OUTPUT}

Output ONLY the complete evolved single-file HTML starting with <!DOCTYPE html>. No JSON. No markdown. No explanation.`;
    } else if (existingHtml) {
      prompt = `${REMIX_PROMPT} "${idea}"

${existingHtml}

CRITICAL: keep all the good parts of the existing app. Make ONLY the requested change. Same safety rules apply. Output ONLY the complete evolved single-file HTML starting with <!DOCTYPE html>. No JSON. No markdown. No explanation.`;
    } else if (isQuick) {
      prompt = `${QUICK_BUILD_PROMPT} "${idea}"`;
    } else {
      prompt = `${COMBINED_BUILD_PROMPT} "${idea}"

${CRITICAL_BEFORE_YOU_OUTPUT}

Output ONLY the raw HTML starting with <!DOCTYPE html>. No JSON. No markdown. No explanation.`;
    }

    const runBuild = async () => {
      // No response_json_schema → InvokeLLM returns a raw string, which is
      // much faster for large HTML payloads.
      const r = await base44.asServiceRole.integrations.Core.InvokeLLM({
        model: 'gemini_3_flash',
        prompt,
      });
      if (typeof r === 'string') return r;
      if (r?.html) return String(r.html);
      if (r?.text) return String(r.text);
      return '';
    };

    let out = await runBuild();
    // Flaky first response — one silent retry saves the kid from a discouraging
    // "try again". Retry on empty/truncated output OR when the model rambled
    // prose instead of HTML. Never retry a legit BLOCKED.
    const looksLikeHtml = (s) => /<!DOCTYPE/i.test(s) || /<html[\s>]/i.test(s);
    const isBlocked = /^\s*BLOCKED:/i.test(String(out || '').trim());
    if (!isBlocked && (!out || out.length < 200 || !looksLikeHtml(out))) {
      console.warn('[zappBuild] no usable HTML in first response, retrying…');
      out = await runBuild();
    }

    // Safety refusal from the model
    const blockedMatch = String(out).match(/^\s*BLOCKED:\s*(.+)/i);
    if (blockedMatch) {
      return Response.json({
        blocked: true,
        reason: blockedMatch[1].trim().slice(0, 120) || "Let's try a different idea!",
      });
    }

    // Extract the HTML — trim any chatter before <!DOCTYPE / <html>
    let html = String(out);
    if (!html.trim().startsWith('<!DOCTYPE') && !html.trim().startsWith('<html')) {
      const docStart = html.indexOf('<!DOCTYPE');
      const htmlStart = html.indexOf('<html');
      const start = docStart >= 0 ? docStart : htmlStart >= 0 ? htmlStart : -1;
      if (start >= 0) html = html.slice(start);
    }

    if (!html || html.length < 200) {
      return Response.json(
        { blocked: true, reason: "Hmm, that one didn't build — tap to try again!" },
        { status: 502 }
      );
    }

    // OUTPUT GUARD — block external/network/exfiltration patterns in the code
    const scan = scanHtmlForDanger(html);
    if (!scan.safe) {
      console.warn('[zappBuild] output blocked:', scan.reasons.join(', '));
      return Response.json({
        blocked: true,
        reason: "Let's try a different idea — that one's not safe to build.",
      }, { status: 400 });
    }

    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : idea.slice(0, 40);

    return Response.json({ html, title, safe: true });
  } catch (error) {
    console.error('[zappBuild] error:', error?.message || error);
    return Response.json({
      blocked: true,
      reason: "Something went wrong — try again in a moment!",
    }, { status: 500 });
  }
});