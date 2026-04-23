/**
 * Serve CB51 maskable app icon for PWA badge
 * Maskable icons are used by iOS for notification badges
 * They need safe area padding and work with any background color
 */
Deno.serve((req) => {
  const size = 192;
  
  const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer radio wave -->
  <path d="M48 96 Q48 48 96 48 Q144 48 144 96 Q144 144 96 144 Q48 144 48 96" stroke="#06b6d4" stroke-width="8" fill="none" stroke-linecap="round"/>
  <!-- Middle radio wave -->
  <path d="M64 96 Q64 64 96 64 Q128 64 128 96 Q128 128 96 128 Q64 128 64 96" stroke="#06b6d4" stroke-width="6" fill="none" stroke-linecap="round"/>
  <!-- Center dot -->
  <circle cx="96" cy="96" r="12" fill="#06b6d4"/>
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*',
    }
  });
});