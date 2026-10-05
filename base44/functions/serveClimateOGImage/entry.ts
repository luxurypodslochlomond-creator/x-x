Deno.serve(async (req) => {
  try {
    // Beadie Signal palette — paper, ink, signal red. BIG SCIENCE.
    const PAPER = '#f4efe4';
    const INK = '#1a1612';
    const SIGNAL = '#b3261e';
    const SIGNAL_BRIGHT = '#e2602a';
    const MUTED = '#6b6258';
    const BONE = '#efe7d6';

    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="630" fill="${PAPER}"/>

        <!-- Scanline texture — cold transmission -->
        <g opacity="0.04">
          ${Array.from({ length: 210 }, (_, i) => `<rect x="0" y="${i * 3}" width="1200" height="1" fill="${INK}"/>`).join('')}
        </g>

        <!-- Top + left hairline accents in signal red -->
        <rect x="0" y="0" width="1200" height="4" fill="${SIGNAL}"/>
        <rect x="0" y="0" width="4" height="630" fill="${SIGNAL}"/>

        <!-- Epigraph band — Laurie's cold opening -->
        <rect x="0" y="4" width="1200" height="44" fill="${INK}"/>
        <circle cx="380" cy="26" r="3" fill="${SIGNAL_BRIGHT}"/>
        <text x="600" y="31" font-family="monospace" font-size="13" font-weight="900" fill="${BONE}" text-anchor="middle" letter-spacing="2.5" opacity="0.65">
          THIS IS THE TIME. AND THIS IS THE RECORD OF THE TIME.
        </text>
        <circle cx="820" cy="26" r="3" fill="${SIGNAL_BRIGHT}"/>

        <!-- x = x covenant — burning signal red -->
        <text x="600" y="110" font-family="monospace" font-size="22" font-weight="900" fill="${SIGNAL}" text-anchor="middle" letter-spacing="6">
          x = x · y = y · 1 = 1
        </text>

        <!-- RECORD OF THE TIME seal — circular stamp -->
        <g transform="translate(600, 230)">
          <circle cx="0" cy="0" r="72" fill="none" stroke="${SIGNAL}" stroke-width="3" opacity="0.7"/>
          <circle cx="0" cy="0" r="62" fill="none" stroke="${SIGNAL}" stroke-width="1.5" opacity="0.5"/>
          <text x="0" y="-18" font-family="monospace" font-size="11" font-weight="900" fill="${SIGNAL}" text-anchor="middle" letter-spacing="2">RECORD OF</text>
          <text x="0" y="2" font-family="monospace" font-size="11" font-weight="900" fill="${SIGNAL}" text-anchor="middle" letter-spacing="2">THE TIME</text>
          <line x1="-30" y1="14" x2="30" y2="14" stroke="${SIGNAL}" stroke-width="1" opacity="0.5"/>
          <text x="0" y="32" font-family="monospace" font-size="8" font-weight="700" fill="${SIGNAL}" text-anchor="middle" letter-spacing="1.5" opacity="0.7">x = x</text>
        </g>

        <!-- Main headline -->
        <text x="600" y="370" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="64" font-weight="900" fill="${INK}" text-anchor="middle" letter-spacing="-1.5">
          Together We Change Climate
        </text>

        <!-- Subtitle — Janine's cred -->
        <text x="600" y="415" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="24" fill="${SIGNAL}" text-anchor="middle" font-weight="700">
          Verified solutions · No noise · Nobody left behind
        </text>

        <!-- Prophetic tagline — Cash/Dylan/Young -->
        <text x="600" y="465" font-family="monospace" font-size="15" font-weight="700" fill="${INK}" text-anchor="middle" letter-spacing="1.5" opacity="0.7">
          EVERY SYMBOL · EVERY NUMBER · EVERY TONGUE
        </text>
        <text x="600" y="492" font-family="monospace" font-size="15" font-weight="700" fill="${INK}" text-anchor="middle" letter-spacing="1.5" opacity="0.7">
          THE NOISE IS LOUD · THE RECORD IS LOUDER
        </text>

        <!-- Janine Selendy credit -->
        <text x="600" y="540" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="18" fill="${MUTED}" text-anchor="middle" font-style="italic">
          After Janine Selendy · for the world · for all of us
        </text>

        <!-- Bottom CTA -->
        <rect x="0" y="580" width="1200" height="50" fill="${INK}"/>
        <text x="600" y="612" font-family="monospace" font-size="18" font-weight="800" fill="${SIGNAL_BRIGHT}" text-anchor="middle" letter-spacing="2">
          uf51.love/TogetherChangeClimate
        </text>
      </svg>
    `;

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('serveClimateOGImage error:', error);
    return new Response('Error generating image', { status: 500 });
  }
});