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

      <!-- Pixel paw print - top left area -->
      <!-- Main paw pad (golden pixels) -->
      <rect x="80" y="200" width="28" height="28" fill="#d4a017"/>
      <rect x="108" y="200" width="28" height="28" fill="#d4a017"/>
      <rect x="136" y="200" width="28" height="28" fill="#d4a017"/>
      <rect x="80" y="228" width="28" height="28" fill="#d4a017"/>
      <rect x="108" y="228" width="28" height="28" fill="#ffd700"/>
      <rect x="136" y="228" width="28" height="28" fill="#d4a017"/>
      <rect x="80" y="256" width="28" height="28" fill="#d4a017"/>
      <rect x="108" y="256" width="28" height="28" fill="#d4a017"/>
      <rect x="136" y="256" width="28" height="28" fill="#d4a017"/>
      <!-- Toe beans -->
      <rect x="80" y="160" width="20" height="20" fill="#d4a017"/>
      <rect x="108" y="148" width="20" height="20" fill="#ffd700"/>
      <rect x="136" y="148" width="20" height="20" fill="#ffd700"/>
      <rect x="164" y="160" width="20" height="20" fill="#d4a017"/>

      <!-- Pixel paw print - right side -->
      <rect x="980" y="200" width="28" height="28" fill="#d4a017"/>
      <rect x="1008" y="200" width="28" height="28" fill="#d4a017"/>
      <rect x="1036" y="200" width="28" height="28" fill="#d4a017"/>
      <rect x="980" y="228" width="28" height="28" fill="#d4a017"/>
      <rect x="1008" y="228" width="28" height="28" fill="#ffd700"/>
      <rect x="1036" y="228" width="28" height="28" fill="#d4a017"/>
      <rect x="980" y="256" width="28" height="28" fill="#d4a017"/>
      <rect x="1008" y="256" width="28" height="28" fill="#d4a017"/>
      <rect x="1036" y="256" width="28" height="28" fill="#d4a017"/>
      <rect x="980" y="160" width="20" height="20" fill="#d4a017"/>
      <rect x="1008" y="148" width="20" height="20" fill="#ffd700"/>
      <rect x="1036" y="148" width="20" height="20" fill="#ffd700"/>
      <rect x="1064" y="160" width="20" height="20" fill="#d4a017"/>

      <!-- Title: PetSounds51 -->
      <text x="600" y="130" font-size="96" font-weight="bold" text-anchor="middle" fill="url(#goldGrad)" font-family="Arial Black, Arial, sans-serif" letter-spacing="-2">
        PetSounds51
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