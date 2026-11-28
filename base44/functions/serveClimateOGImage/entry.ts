// A real PNG of the existing painting, rather than a generated SVG text card.
//
// ── IT WAS PROXYING 2.6 MB ─────────────────────────────────────────────────────
// This returned the full mobile painting byte for byte: 2638 KB, measured. Facebook,
// WhatsApp, LinkedIn and iMessage all refuse a preview image that heavy, and they refuse it
// silently — the link arrives with no picture and nobody is told why. It now serves the card
// made from that same painting at 900 × 472 (227 KB), which every one of them accepts.
export default async function(req) {
  const image = await fetch('https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/b204beb34c6ef6f597df924caa5f6d66_record-share-card.png', { signal: AbortSignal.timeout(15000) });
  if (!image.ok) return new Response('The painting could not be opened.', { status: 502 });
  return new Response(req.method === 'HEAD' ? null : image.body, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=3600' },
  });
}