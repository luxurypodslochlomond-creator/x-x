Deno.serve(async (req) => {
  try {
    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0a0f1a;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#0f1a2e;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0a0f1a;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#bg)"/>
        
        <!-- Title -->
        <text x="600" y="140" font-size="90" font-weight="bold" text-anchor="middle" fill="#06b6d4" font-family="Arial, sans-serif">
          CB51
        </text>
        
        <!-- Subtitle -->
        <text x="600" y="200" font-size="48" font-weight="bold" text-anchor="middle" fill="#22d3ee" font-family="Arial, sans-serif">
          CitizenBand51
        </text>
        
        <!-- Tagline -->
        <text x="600" y="270" font-size="40" text-anchor="middle" fill="#06b6d4" font-family="Arial, sans-serif">
          Avoid the Noise
        </text>
        
        <!-- Key messages -->
        <text x="600" y="350" font-size="28" text-anchor="middle" fill="#10b981" font-family="Arial, sans-serif">
          ✓ AI Co-Manager for Artists
        </text>
        <text x="600" y="400" font-size="28" text-anchor="middle" fill="#10b981" font-family="Arial, sans-serif">
          ✓ Smart Gig Booking • Voting Band • Finance Tracking
        </text>
        <text x="600" y="450" font-size="28" text-anchor="middle" fill="#10b981" font-family="Arial, sans-serif">
          ✓ Calendar • Contracts • Logistics
        </text>
        
        <!-- Bottom badge -->
        <text x="600" y="580" font-size="20" font-weight="bold" text-anchor="middle" fill="#0891b2" font-family="Arial, sans-serif">
          Professional Artist Management Tools
        </text>
      </svg>
    `;

    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400'
      }
    });
  } catch (error) {
    console.error('CB51 OG image generation failed:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});