Deno.serve(async (req) => {
  const url = new URL(req.url);
  const host = req.headers.get('host') || '';
  const brand = url.searchParams.get('brand') || '';

  const isCB51 = host.startsWith('cb51.') || host === 'cb51.io' || brand === 'cb51';
  const isSorted = brand === 'sorted';

  let svgContent;

  if (isSorted) {
    svgContent = `
      <rect width="1200" height="630" fill="#0a0005"/>
      <rect x="0" y="0" width="1200" height="630" fill="url(#sortedGrad)"/>
      <defs>
        <linearGradient id="sortedGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0a0005"/>
          <stop offset="100%" stop-color="#1a0a00"/>
        </linearGradient>
      </defs>
      <!-- SORTED brand mark - envelope/shield -->
      <rect x="480" y="80" width="240" height="200" rx="16" fill="none" stroke="#f97316" stroke-width="6"/>
      <path d="M480 100 L600 180 L720 100" stroke="#f97316" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <!-- Tick inside -->
      <path d="M540 190 L580 230 L670 150" stroke="#22c55e" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <!-- SORTED Text -->
      <text x="600" y="360" font-family="monospace" font-size="110" font-weight="900" fill="#f97316" text-anchor="middle" letter-spacing="-4">SORTED</text>
      <text x="600" y="420" font-family="sans-serif" font-size="34" fill="#ffffff" text-anchor="middle" font-weight="600">Decode scary letters in 30 seconds</text>
      <text x="600" y="470" font-family="sans-serif" font-size="24" fill="rgba(255,255,255,0.5)" text-anchor="middle">Plain English · Any language · Private</text>
      <!-- bottom bar -->
      <rect x="0" y="560" width="1200" height="70" fill="rgba(249,115,22,0.12)"/>
      <text x="600" y="603" font-family="monospace" font-size="20" fill="rgba(255,255,255,0.5)" text-anchor="middle">uf51.love/Sorted · family@uf51.love</text>
    `;
  } else if (isCB51) {
    svgContent = `
      <rect width="1200" height="630" fill="#000000"/>
      <circle cx="600" cy="200" r="100" fill="none" stroke="#06b6d4" stroke-width="8"/>
      <circle cx="600" cy="200" r="70" fill="none" stroke="#06b6d4" stroke-width="6"/>
      <circle cx="600" cy="200" r="40" fill="none" stroke="#06b6d4" stroke-width="4"/>
      <circle cx="600" cy="200" r="20" fill="#06b6d4"/>
      <text x="600" y="380" font-family="monospace" font-size="120" font-weight="900" fill="#06b6d4" text-anchor="middle">CB51</text>
      <text x="600" y="470" font-family="monospace" font-size="36" fill="#ffffff" text-anchor="middle" font-weight="bold">Your AI Co-Manager</text>
    `;
  } else {
    svgContent = `
      <rect width="1200" height="630" fill="#000000"/>
      <path d="M 600 500 L 520 400 Q 480 340 520 300 Q 560 260 600 300 Q 640 260 680 300 Q 720 340 680 400 Z" fill="#ec4899" stroke="#06b6d4" stroke-width="4"/>
      <text x="600" y="200" font-family="monospace" font-size="80" font-weight="900" fill="#22c55e" text-anchor="middle">UF51</text>
      <text x="600" y="260" font-family="sans-serif" font-size="32" fill="#ffffff" text-anchor="middle">Heal the Planet</text>
    `;
  }

  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">${svgContent}</svg>`;

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
});