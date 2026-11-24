// A real PNG of the existing painting, rather than a generated SVG text card.
export default async function(req) {
  const image = await fetch('https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/cc94d332d_record-cover-mobile.png', { signal: AbortSignal.timeout(15000) });
  if (!image.ok) return new Response('The painting could not be opened.', { status: 502 });
  return new Response(req.method === 'HEAD' ? null : image.body, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=3600' },
  });
}