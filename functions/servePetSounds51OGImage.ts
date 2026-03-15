Deno.serve(async (req) => {
  try {
    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1a200e;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#2a3018;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1e1a0e;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#bg)"/>
        
        <!-- Title -->
        <text x="600" y="140" font-size="90" font-weight="bold" text-anchor="middle" fill="#d4a017" font-family="Arial, sans-serif">
          PetSounds51
        </text>
        
        <!-- Tagline -->
        <text x="600" y="220" font-size="36" text-anchor="middle" fill="#e8d5a3" font-family="Arial, sans-serif">
          Science-backed sound therapy for anxious pets
        </text>
        
        <!-- Key messages -->
        <text x="600" y="330" font-size="28" text-anchor="middle" fill="#8aab3a" font-family="Arial, sans-serif">
          ✓ Try FREE: Separation Anxiety
        </text>
        <text x="600" y="390" font-size="28" text-anchor="middle" fill="#8aab3a" font-family="Arial, sans-serif">
          ✓ Pain Relief • Stress Reduction • Healing
        </text>
        <text x="600" y="450" font-size="28" text-anchor="middle" fill="#8aab3a" font-family="Arial, sans-serif">
          ✓ £29.99/year for all protocols
        </text>
        
        <!-- Bottom badge -->
        <text x="600" y="580" font-size="20" font-weight="bold" text-anchor="middle" fill="#6b5e3a" font-family="Arial, sans-serif">
          Research-backed by MIT, iCalmDog, Glasgow, Edinburgh
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
    console.error('OG image generation failed:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});