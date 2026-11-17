export default async function(req) {
  try {
    // Embed the exact bold face: an SVG image cannot fetch the page's webfont.
    const fontResponse = await fetch('https://media.base44.com/files/public/builder-assets/wix-fonts/helvetica-700-normal.woff2', { signal: AbortSignal.timeout(10000) });
    if (!fontResponse.ok) throw new Error('The record font could not be loaded');
    const fontBytes = new Uint8Array(await fontResponse.arrayBuffer());
    let binary = '';
    for (const byte of fontBytes) binary += String.fromCharCode(byte);
    const fontData = btoa(binary);
    // Same warm paper, red and yellow as the page and browser-made cards.
    const PAPER = '#f4efe4';
    const INK = '#1a1612';
    const SIGNAL = '#b3261e';
    const SIGNAL_BRIGHT = '#ffd447';
    // The mark's own red, measured off Laurie Anderson's O Superman sleeve (#CC2D2A).
    // Same value as --record-mark in the app; an SVG cannot read a CSS token.
    const MARK = '#cc2d2a';
    const MUTED = '#6b6258';
    const BONE = '#efe7d6';

    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs><style>
          @font-face { font-family: 'Record UI'; font-style: normal; font-weight: 700; src: url('data:font/woff2;base64,${fontData}') format('woff2'); }
          text { font-family: 'Record UI', Helvetica, Arial, sans-serif; font-weight: 700; font-style: normal; }
        </style></defs>
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

        <!-- x = x covenant — the mark's own borrowed red, never the warning red -->
        <text x="600" y="110" font-family="monospace" font-size="22" font-weight="900" fill="${MARK}" text-anchor="middle" letter-spacing="6">
          x = x · y = y · 1 = 1
        </text>

        <!-- RECORD OF THE TIME seal — circular stamp -->
        <g transform="translate(600, 230)">
          <circle cx="0" cy="0" r="72" fill="none" stroke="${SIGNAL}" stroke-width="3" opacity="0.7"/>
          <circle cx="0" cy="0" r="62" fill="none" stroke="${SIGNAL}" stroke-width="1.5" opacity="0.5"/>
          <text x="0" y="-18" font-family="monospace" font-size="11" font-weight="900" fill="${SIGNAL}" text-anchor="middle" letter-spacing="2">RECORD OF</text>
          <text x="0" y="2" font-family="monospace" font-size="11" font-weight="900" fill="${SIGNAL}" text-anchor="middle" letter-spacing="2">THE TIME</text>
          <line x1="-30" y1="14" x2="30" y2="14" stroke="${SIGNAL}" stroke-width="1" opacity="0.5"/>
          <text x="0" y="32" font-family="monospace" font-size="8" font-weight="700" fill="${MARK}" text-anchor="middle" letter-spacing="1.5" opacity="0.85">x = x</text>
        </g>

        <!-- Main headline -->
        <text x="600" y="370" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="64" font-weight="900" fill="${INK}" text-anchor="middle" letter-spacing="-1.5">
          Together We Can Change Climate
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
}