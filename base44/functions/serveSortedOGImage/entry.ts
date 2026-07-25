Deno.serve(async (req) => {
  try {
    // Warm paper + gold — matches the SORTED brand (no dark navy)
    const PAPER = '#fcfaf6';
    const INK = '#1a1714';
    const GOLD = '#b8860b';
    const GOLD_SOFT = '#d4a017';
    const MUTED = '#7a6f63';

    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="630" fill="${PAPER}"/>

        <!-- Top + left hairline accents in gold -->
        <rect x="0" y="0" width="1200" height="5" fill="${GOLD}"/>
        <rect x="0" y="0" width="6" height="630" fill="${GOLD}"/>

        <!-- Morse SOS glyph (··· ─── ···) -->
        <g transform="translate(100, 150)" fill="${GOLD}">
          <circle cx="6" cy="0" r="11"/>
          <circle cx="40" cy="0" r="11"/>
          <circle cx="74" cy="0" r="11"/>
          <rect x="104" y="-11" width="52" height="22" rx="11"/>
          <rect x="176" y="-11" width="52" height="22" rx="11"/>
          <rect x="248" y="-11" width="52" height="22" rx="11"/>
          <circle cx="328" cy="0" r="11"/>
          <circle cx="362" cy="0" r="11"/>
          <circle cx="396" cy="0" r="11"/>
        </g>

        <!-- Main headline -->
        <text x="100" y="280" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="96" font-weight="900" fill="${INK}" letter-spacing="-3">
          SORTED
        </text>

        <!-- Subtitle -->
        <text x="100" y="340" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="38" fill="${GOLD}" font-weight="700">
          Decode scary letters in seconds
        </text>

        <!-- Description lines -->
        <text x="100" y="410" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="26" fill="${INK}">
          • Plain-English advice • Any language
        </text>
        <text x="100" y="455" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="26" fill="${INK}">
          • Nothing stored • Free for everyone
        </text>

        <!-- Bottom CTA -->
        <text x="100" y="540" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="30" fill="${GOLD_SOFT}" font-weight="800">
          uf51.love/sorted
        </text>
        <text x="100" y="580" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="20" fill="${MUTED}">
          Got a scary letter? We'll decode it for you.
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
    console.error('serveSortedOGImage error:', error);
    return new Response('Error generating image', { status: 500 });
  }
});