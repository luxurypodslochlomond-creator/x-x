Deno.serve(async (req) => {
  try {
    const url = new URL(req.url);
    const hostname = req.headers.get('host') || '';
    const referer = req.headers.get('referer') || '';
    const isCB51 = hostname.includes('cb51.') || referer.includes('/CB51') || referer.includes('/Scott') || url.searchParams.get('brand') === 'cb51';

    const manifest = isCB51 ? {
      name: "CB51 : CitizenBand51 : Avoid the Noise",
      short_name: "CB51",
      description: "CB51 : CitizenBand51 : Avoid the Noise",
      start_url: "/CB51",
      scope: "/",
      display: "standalone",
      orientation: "portrait-primary",
      background_color: "#000000",
      theme_color: "#06b6d4",
      icons: [
        { src: "/api/functions/serveCB51Icon?size=192", sizes: "192x192", type: "image/svg+xml", purpose: "any" },
        { src: "/api/functions/serveCB51Icon?size=512", sizes: "512x512", type: "image/svg+xml", purpose: "any" },
        { src: "/api/functions/serveCB51MaskableIcon?size=192", sizes: "192x192", type: "image/svg+xml", purpose: "maskable" },
        { src: "/api/functions/serveCB51MaskableIcon?size=512", sizes: "512x512", type: "image/svg+xml", purpose: "maskable" }
      ],
      categories: ["productivity", "business"],
      shortcuts: [
        {
          name: "Upload Gig",
          short_name: "Upload",
          description: "Scan a new gig offer",
          url: "/CB51?action=upload",
          icons: [{ src: "/api/functions/serveCB51MaskableIcon?size=192", sizes: "192x192", purpose: "maskable" }]
        },
        {
          name: "Calendar",
          short_name: "Calendar",
          description: "View all shows",
          url: "/CB51CalendarView",
          icons: [{ src: "/api/functions/serveCB51MaskableIcon?size=192", sizes: "192x192", purpose: "maskable" }]
        },
        {
          name: "Messages",
          short_name: "Messages",
          description: "Check inbox",
          url: "/CB51MessageInbox",
          icons: [{ src: "/api/functions/serveCB51MaskableIcon?size=192", sizes: "192x192", purpose: "maskable" }]
        }
      ],
      share_target: {
        action: "/CB51?share=true",
        method: "POST",
        enctype: "multipart/form-data",
        params: {
          files: [
            {
              name: "file",
              accept: ["application/pdf", "image/*"]
            }
          ]
        }
      }
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