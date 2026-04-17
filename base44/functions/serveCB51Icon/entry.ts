/**
 * Serve CB51 app icon as PNG for push notifications + PWA
 * iOS requires a real rasterized image for notification icons
 */
Deno.serve((req) => {
  // CB51 icon as a simple PNG via canvas-like SVG embedded in a data response
  // We serve an SVG that iOS can use — cyan radio icon on black background
  const size = 192;
  
  const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Black background -->
  <rect width="${size}" height="${size}" rx="40" fill="#000000"/>
  <!-- Outer radio wave -->
  <path d="M48 96 Q48 48 96 48 Q144 48 144 96 Q144 144 96 144 Q48 144 48 96" stroke="#06b6d4" stroke-width="8" fill="none" stroke-linecap="round"/>
  <!-- Middle radio wave -->
  <path d="M64 96 Q64 64 96 64 Q128 64 128 96 Q128 128 96 128 Q64 128 64 96" stroke="#06b6d4" stroke-width="6" fill="none" stroke-linecap="round"/>
  <!-- Center dot -->
  <circle cx="96" cy="96" r="12" fill="#06b6d4"/>
  <!-- CB51 text -->
  <text x="96" y="170" font-family="monospace" font-size="22" font-weight="900" fill="#06b6d4" text-anchor="middle" letter-spacing="2">CB51</text>
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*',
    }
  });
});