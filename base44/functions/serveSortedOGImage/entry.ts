Deno.serve(async (req) => {
  try {
    // SVG-based OG image for SORTED sharing
    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <!-- Background gradient -->
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0a0f1a;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1a0f2a;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#bgGrad)"/>
        
        <!-- Accent line -->
        <line x1="0" y1="100" x2="1200" y2="100" stroke="#06b6d4" stroke-width="3"/>
        
        <!-- Main text -->
        <text x="60" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="900" fill="#ffffff" letter-spacing="-2">
          SORTED
        </text>
        
        <!-- Tagline -->
        <text x="60" y="350" font-family="system-ui, -apple-system, sans-serif" font-size="32" fill="#06b6d4" font-weight="600">
          Decode scary letters in seconds
        </text>
        
        <!-- Description -->
        <text x="60" y="420" font-family="system-ui, -apple-system, sans-serif" font-size="20" fill="#cbd5e1" line-height="1.6">
          Plain English advice. Any language. Nothing stored. Free for everyone.
        </text>
        
        <!-- Accent dots -->
        <circle cx="1100" cy="500" r="8" fill="#06b6d4" opacity="0.6"/>
        <circle cx="1050" cy="550" r="6" fill="#06b6d4" opacity="0.4"/>
        <circle cx="120" cy="580" r="5" fill="#06b6d4" opacity="0.3"/>
      </svg>
    `;

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('serveSortedOGImage error:', error);
    return new Response('Error generating image', { status: 500 });
  }
});