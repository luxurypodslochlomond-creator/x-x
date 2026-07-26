// ZAPP kid-safety layer — shared by zappBuild and zappSave.
// Lives server-side so kids can't tamper with it from the browser.
// Single source of truth for the build prompt, the input guard, and the
// dangerous-HTML scanner. Never copy this logic between functions — import it.

export const BUILD_SYSTEM_PROMPT = `ZAPP: Build complete, fully working mini web apps for kids (8-13) that look AMAZING on a phone screen. Kids might ask for games, study tools, art pads, quizzes, music makers, or anything — build exactly what they ask for.

CRITICAL MOBILE RULES — the app will be displayed in a phone-sized iframe, so:
- body { margin: 0; padding: 0; width: 100vw; height: 100dvh; overflow: hidden; background: #0a0a0f; }
- Use 100dvh (NOT 100vh) for full height — avoids mobile browser bar jump
- ACTION buttons (Start, Submit, Save, Next, Restart) MUST be at least 56px tall, full or near-full width — easy thumb tap
- DIRECTIONAL / GAME controls (arrow keys, D-pad, movement) MUST be COMPACT and CLUSTERED — a small D-pad cluster ~44px per button, max 160px total width, fixed in a corner. NEVER make arrow buttons full-width or huge — they eat the screen and ruin the game.
- Keep ALL controls inside the viewport — use position: fixed; bottom: 12px; for control clusters, never push them off-screen
- The game/play area MUST take at least 60% of screen height — controls and UI chrome share the remaining 40% max
- Font sizes: headings min 1.5rem, body min 1rem — readable on a small screen
- Use flexbox/grid with vh/vw or % units — NEVER fixed pixel widths that might overflow
- NO horizontal overflow — everything must fit within 100vw

LANGUAGE: Match whatever language the kid uses. If they describe their idea in French, build the whole app in French. Spanish → Spanish. Portuguese → Portuguese. Japanese → Japanese. Any language on Earth — auto-detect and use that language for all UI text, labels, and feedback. This app works worldwide.

SAFETY RULES — NON-NEGOTIABLE:
- Single HTML file, start with <!DOCTYPE html>, everything inline. NO external scripts, NO external links, NO CDN, NO imports, NO <link>, NO @import, NO <iframe>, NO <object>, NO <embed>, NO <form> that sends data anywhere.
- NO network access of any kind: no fetch(), no XMLHttpRequest, no WebSocket, no sendBeacon, no window.open(), no location.href=, no postMessage, no document.cookie.
- NO real money, NO gambling, NO betting. NO weapons aimed at people, NO graphic violence, NO blood, NO self-harm, NO suicide, NO sexual content, NO drugs, NO alcohol, NO hate, NO bullying, NO real-world dangerous instructions.
- NO collecting personal information from the kid (no name/address/email/phone fields, no sign-up forms).
- Kind encouraging feedback only — NEVER harsh. Wrong answers: "Nearly! Try again 💪" with a warm soft sound.

GENERAL RULES:
- Vanilla JS in <script>, CSS in <style>
- <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"> MUST be first meta tag
- Web Audio API for sounds (oscillators only — no external audio files)
- Dark bg (#0a0a0f), neon colours (use bright purples, pinks, cyans, greens), large fonts
- FULLY WORKING: every button works, complete app loop, any scores/states reset properly on restart
- If it's a game: confetti on wins with 40+ coloured divs, score tracking, at least 3 sound effects
- If it's a study tool: clear questions, instant feedback, progress shown visually
- If it's a creative tool: responsive canvas/drawing area, colour picker, clear/reset button
- Always include at least 3 different sound effects using Web Audio API oscillators

HONESTY — NON-NEGOTIABLE: every app must show one tiny line at the very bottom, in the SAME language as the app, small and unobtrusive (font-size around 10px, opacity 0.4): "An AI friend helped make this — it can be wrong. Check with a grown-up if it's about something important." This teaches the kid to question AI, not blindly trust it.

ACCESSIBILITY — build for every kid, including kids who learn or move differently:
- Support keyboard controls where the game allows (arrows / Enter / Space) alongside touch
- Use high-contrast colours so text stays readable
- NEVER flash faster than 3 times per second (photosensitive seizure safety)
- Add aria-label to every button and control
- Keep tap targets at least 44px so unsteady hands can use them`;

export const INPUT_GUARD_PROMPT = `You are a safety filter for ZAPP, a kids' app-building tool used by children aged 8-13 worldwide.

A kid has typed an idea for an app they want to build. Your job:
1. Decide if the idea is SAFE for a child to build and play with. Block anything involving: realistic violence against people, weapons, sexual content, self-harm, suicide, drugs, alcohol, gambling, real money, hate, bullying, real-world dangerous activities, or anything an 8-13 year old should not see.
2. If the idea contains any PERSONAL INFORMATION, rewrite it to remove it: real full names → "a kid" / "my friend", real addresses, phone numbers, emails, school names, specific real locations → generic terms. The built app must never contain a real child's identity.
3. Games, quizzes, art tools, music makers, clickers, stories, study tools, silly fun = all fine. Let kids be creative. Only block genuinely unsafe or identifying content.

Return ONLY valid JSON: {"safe": true/false, "reason": "short kid-friendly reason if blocked (empty string if safe)", "sanitized_idea": "the cleaned idea to build, in the SAME language the kid wrote in"}
No explanation. No markdown. Just the JSON.`;

// Combined single-pass prompt: safety check + build in one LLM call.
// Returns raw HTML (not JSON) to skip the large-HTML JSON-encoding overhead
// that makes two-call builds slow enough to trip the frontend invoke timeout.
export const COMBINED_BUILD_PROMPT = `${BUILD_SYSTEM_PROMPT}

SAFETY CHECK FIRST — decide before you build:
- If the kid's idea is UNSAFE for an 8-13 year old (realistic violence against people, weapons, sexual content, self-harm, suicide, drugs, alcohol, gambling, real money, hate, bullying, real-world dangerous instructions), or contains real personal info (full names, addresses, phones, emails, school names), do NOT build it. Output exactly one line: BLOCKED: <short, kind reason in the kid's language>
- Otherwise, build the complete app.

OUTPUT RULES — NON-NEGOTIABLE:
- Output ONLY the complete single-file HTML app, starting with <!DOCTYPE html>. No explanation, no markdown, no wrapping in JSON. Just the raw HTML.
- Match the kid's language for all UI text.

BUILD THIS NOW:`;

// Scan generated HTML for anything that could exfiltrate data, load external
// resources, or break the kid-safety promise. Deterministic + fast — this is
// the COPPA-relevant layer. The input guard handles content; this handles code.
export function scanHtmlForDanger(html) {
  const reasons = [];
  // Strip comments so a commented-out URL doesn't trip the check,
  // but we still catch live code.
  const stripped = String(html).replace(/<!--[\s\S]*?-->/g, '');

  if (/\bhttps?:\/\//i.test(stripped)) reasons.push('external link');
  if (/\bfetch\s*\(/i.test(stripped)) reasons.push('network call');
  if (/XMLHttpRequest/i.test(stripped)) reasons.push('network call');
  if (/\bWebSocket\b/i.test(stripped)) reasons.push('network call');
  if (/sendBeacon/i.test(stripped)) reasons.push('network call');
  if (/<form[\s>]/i.test(stripped)) reasons.push('form');
  if (/<iframe[\s>]/i.test(stripped)) reasons.push('iframe');
  if (/<object[\s>]/i.test(stripped)) reasons.push('embed');
  if (/<embed[\s>]/i.test(stripped)) reasons.push('embed');
  if (/<link[\s>]/i.test(stripped)) reasons.push('external resource');
  if (/@import/i.test(stripped)) reasons.push('external css');
  if (/window\.open\s*\(/i.test(stripped)) reasons.push('popup');
  if (/location\.(href|assign|replace)\s*=/i.test(stripped)) reasons.push('navigation');
  if (/\bpostMessage\b/i.test(stripped)) reasons.push('postMessage');
  if (/document\.cookie/i.test(stripped)) reasons.push('cookie access');
  if (/<script[^>]*\bsrc\s*=/i.test(stripped)) reasons.push('external script');

  return { safe: reasons.length === 0, reasons };
}

// Cheap PII / contact-info sniff used when validating the optional creator name
// and the saved idea on the server. Returns true if the text looks like it
// contains an email, phone number, or URL.
export function looksLikePII(text) {
  const t = String(text || '');
  if (/[\w.+-]+@[\w-]+\.[\w.-]+/i.test(t)) return true;        // email
  if (/\d[\d\s().-]{6,}\d/.test(t)) return true;                 // phone-ish
  if (/https?:\/\//i.test(t)) return true;                      // url
  return false;
}