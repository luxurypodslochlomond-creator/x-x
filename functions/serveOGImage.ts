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
        <circle cx="600" cy="200" r="100" fill="none" stroke="#06b6d4" stroke-width="8"/>
        <circle cx="600" cy="200" r="70" fill="none" stroke="#06b6d4" stroke-width="6"/>
        <circle cx="600" cy="200" r="40" fill="none" stroke="#06b6d4" stroke-width="4"/>
        <circle cx="600" cy="200" r="20" fill="#06b6d4"/>
        
        <!-- CB51 Text -->
        <text x="600" y="380" font-family="monospace" font-size="120" font-weight="900" fill="#06b6d4" text-anchor="middle">CB51</text>
        <text x="600" y="470" font-family="monospace" font-size="36" fill="#ffffff" text-anchor="middle" font-weight="bold">Your AI Co-Manager</text>
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