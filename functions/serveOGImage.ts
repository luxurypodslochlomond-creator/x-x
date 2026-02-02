Deno.serve(async (req) => {
  const url = new URL(req.url);
  const host = req.headers.get('host') || '';
  
  // Detect if CB51 subdomain
  const isCB51 = host.startsWith('cb51.') || host === 'cb51.io';
  
  // Simple SVG OG image generation
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#000000"/>
      ${isCB51 ? `
        <!-- CB51 Radio Icon -->
        <circle cx="600" cy="250" r="80" fill="#06b6d4"/>
        <circle cx="580" cy="240" r="15" fill="#000"/>
        <circle cx="620" cy="240" r="15" fill="#000"/>
        <path d="M 560 280 Q 600 310 640 280" stroke="#000" stroke-width="8" fill="none" stroke-linecap="round"/>
        
        <!-- CB51 Text -->
        <text x="600" y="400" font-family="monospace" font-size="80" font-weight="900" fill="#06b6d4" text-anchor="middle">CB51</text>
        <text x="600" y="460" font-family="sans-serif" font-size="32" fill="#ffffff" text-anchor="middle">Artist Management</text>
      ` : `
        <!-- UF51 Heart -->
        <path d="M 600 500 L 520 400 Q 480 340 520 300 Q 560 260 600 300 Q 640 260 680 300 Q 720 340 680 400 Z" fill="#ec4899" stroke="#06b6d4" stroke-width="4"/>
        
        <!-- UF51 Text -->
        <text x="600" y="200" font-family="monospace" font-size="80" font-weight="900" fill="#22c55e" text-anchor="middle">UF51</text>
        <text x="600" y="260" font-family="sans-serif" font-size="32" fill="#ffffff" text-anchor="middle">Heal the Planet</text>
      `}
    </svg>
  `;
  
  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
});