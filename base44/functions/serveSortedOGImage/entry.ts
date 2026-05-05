Deno.serve(async (req) => {
  try {
    // SVG-based OG image for SORTED sharing
    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0a0514;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1a0f2a;stop-opacity:1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <rect width="1200" height="630" fill="url(#bgGrad)"/>
        
        <!-- Top accent bar -->
        <rect x="0" y="0" width="1200" height="6" fill="#06b6d4"/>
        
        <!-- Left accent panel -->
        <rect x="0" y="0" width="8" height="630" fill="#06b6d4"/>
        
        <!-- Main headline -->
        <text x="100" y="120" font-family="system-ui, -apple-system, sans-serif" font-size="88" font-weight="900" fill="#ffffff" letter-spacing="-3">
          SORTED
        </text>
        
        <!-- Subtitle -->
        <text x="100" y="200" font-family="system-ui, -apple-system, sans-serif" font-size="36" fill="#06b6d4" font-weight="700">
          Decode scary letters in seconds
        </text>
        
        <!-- Description lines -->
        <text x="100" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="#cbd5e1">
          • AI decodes legal letters • Plain English advice
        </text>
        <text x="100" y="330" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="#cbd5e1">
          • Any language • Nothing stored • Free for everyone
        </text>
        
        <!-- Bottom CTA text -->
        <text x="100" y="520" font-family="system-ui, -apple-system, sans-serif" font-size="28" fill="#22c55e" font-weight="700">
          sorted.so
        </text>
        <text x="100" y="570" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#94a3b8">
          Got a scary letter? We'll decode it for you ♾️❤️
        </text>
        
        <!-- Corner accent -->
        <circle cx="1150" cy="80" r="40" fill="#06b6d4" opacity="0.1" filter="url(#glow)"/>
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