/**
 * Serve CB51 badge icon (96x96px) for push notifications
 * Used in notification badges on Android/desktop notification bars
 * Cyan square with CB51 logo - minimal design for clarity
 */

Deno.serve(async (req) => {
  try {
    // SVG badge: simple cyan square with CB51 initials
    const badgeSvg = `<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
      <rect width="96" height="96" fill="#06b6d4" rx="12"/>
      <text x="48" y="52" font-size="32" font-weight="bold" font-family="Arial, sans-serif" fill="white" text-anchor="middle" dy=".3em">CB</text>
    </svg>`;

    return new Response(badgeSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Badge serve error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});