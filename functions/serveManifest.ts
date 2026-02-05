Deno.serve(async (req) => {
  try {
    const url = new URL(req.url);
    const hostname = req.headers.get('host') || '';
    const isCB51 = hostname.includes('cb51.');

    const manifest = isCB51 ? {
      name: "CB51 • AI Co-Manager for Artists",
      short_name: "CB51",
      description: "Gigs • Calendar • Finance • Band votes",
      start_url: "/CB51",
      scope: "/",
      display: "standalone",
      orientation: "portrait-primary",
      background_color: "#000000",
      theme_color: "#06b6d4",
      icons: [
        { src: "/icon-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
        { src: "/icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
        { src: "/icon-maskable-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
        { src: "/icon-maskable-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
      ],
      categories: ["productivity", "business"]
    } : {
      name: "Universal Frequency 51",
      short_name: "UF51",
      description: "Heal yourself, heal the planet",
      start_url: "/Welcome",
      scope: "/",
      display: "standalone",
      orientation: "portrait-primary",
      background_color: "#0a0514",
      theme_color: "#22c55e",
      icons: [
        { src: "/icon-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
        { src: "/icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
        { src: "/icon-maskable-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
        { src: "/icon-maskable-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
      ],
      categories: ["health", "lifestyle"]
    };

    return new Response(JSON.stringify(manifest), {
      headers: {
        'Content-Type': 'application/manifest+json',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});