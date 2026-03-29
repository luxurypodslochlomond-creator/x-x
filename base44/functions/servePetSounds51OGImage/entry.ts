Deno.serve(async (req) => {
  try {
    const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0a0800;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#1a1200;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0f0a00;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#b8860b" />
          <stop offset="50%" style="stop-color:#d4a017" />
          <stop offset="100%" style="stop-color:#ffd700" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bg)"/>

      <!-- Gold border -->
      <rect x="20" y="20" width="1160" height="590" fill="none" stroke="#d4a017" stroke-width="4" rx="16"/>

      <!-- Custom 8-bit dog icon - centered -->
      <!-- Dog head -->
      <!-- Left ear -->
      <rect x="440" y="80" width="28" height="28" fill="#a0522d"/>
      <rect x="428" y="108" width="16" height="20" fill="#a0522d"/>
      <!-- Right ear -->
      <rect x="732" y="80" width="28" height="28" fill="#a0522d"/>
      <rect x="756" y="108" width="16" height="20" fill="#a0522d"/>
      <!-- Head -->
      <rect x="428" y="108" width="344" height="200" fill="#cd853f"/>
      <!-- Left eye -->
      <rect x="480" y="140" width="24" height="24" fill="#000000"/>
      <rect x="488" y="148" width="8" height="8" fill="#ff69b4"/>
      <!-- Right eye -->
      <rect x="696" y="140" width="24" height="24" fill="#000000"/>
      <rect x="704" y="148" width="8" height="8" fill="#ff69b4"/>
      <!-- Snout -->
      <rect x="520" y="240" width="160" height="68" fill="#daa520"/>
      <!-- Nose -->
      <rect x="576" y="260" width="48" height="32" fill="#000000"/>
      <!-- Mouth -->
      <rect x="520" y="292" width="160" height="16" fill="#8b4513"/>
      <!-- Body -->
      <rect x="456" y="308" width="288" height="160" fill="#cd853f"/>
      <!-- Left paw -->
      <rect x="484" y="468" width="44" height="80" fill="#a0522d"/>
      <!-- Right paw -->
      <rect x="672" y="468" width="44" height="80" fill="#a0522d"/>

      <!-- Title: PS51 (below the dog icon) -->
      <text x="600" y="620" font-size="80" font-weight="bold" text-anchor="middle" fill="url(#goldGrad)" font-family="Arial Black, Arial, sans-serif" letter-spacing="-2">
        PS51
      </text>

      <!-- Tagline -->
      <text x="600" y="210" font-size="36" text-anchor="middle" fill="#e8d5a3" font-family="Arial, sans-serif">
        Science-backed sound therapy for animals 🐕🐈
      </text>

      <!-- Divider line -->
      <line x1="200" y1="250" x2="1000" y2="250" stroke="#d4a017" stroke-width="2" opacity="0.4"/>

      <!-- Key benefits -->
      <text x="600" y="320" font-size="30" text-anchor="middle" fill="#d4a017" font-family="Arial, sans-serif">
        ✓ Anxiety Relief  •  Pain  •  Sleep  •  Stress
      </text>
      <text x="600" y="380" font-size="30" text-anchor="middle" fill="#c8b890" font-family="Arial, sans-serif">
        Try FREE: Separation Anxiety Protocol
      </text>
      <text x="600" y="440" font-size="28" text-anchor="middle" fill="#8a7a50" font-family="Arial, sans-serif">
        All healing protocols — £29.99/year
      </text>

      <!-- Bottom line -->
      <line x1="200" y1="480" x2="1000" y2="480" stroke="#d4a017" stroke-width="2" opacity="0.3"/>

      <!-- Research badge -->
      <text x="600" y="530" font-size="22" text-anchor="middle" fill="#6b5e3a" font-family="Arial, sans-serif">
        Backed by MIT • iCalmDog • University of Glasgow • Edinburgh
      </text>

      <!-- URL -->
      <text x="600" y="580" font-size="24" font-weight="bold" text-anchor="middle" fill="#d4a017" font-family="Arial, sans-serif">
        uf51.love/PetSounds51
      </text>
    </svg>`;

    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    console.error('PS51 OG image generation failed:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});