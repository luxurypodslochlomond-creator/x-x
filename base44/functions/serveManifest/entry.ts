Deno.serve(async (req) => {
  try {
    const url = new URL(req.url);
    const hostname = req.headers.get('host') || '';
    const referer = req.headers.get('referer') || '';
    const isCB51 = hostname.includes('cb51.') || referer.includes('/CB51') || referer.includes('/Scott') || url.searchParams.get('brand') === 'cb51';
    const isSorted = referer.includes('/Sorted') || referer.includes('/Family51') || url.searchParams.get('brand') === 'sorted';

    const manifest = isSorted ? {
      name: "SORTED — We've Got You",
      short_name: "SORTED",
      description: "Decode scary letters instantly. Plain English advice. Nothing stored.",
      start_url: "/Sorted",
      scope: "/",
      display: "standalone",
      orientation: "portrait-primary",
      background_color: "#faf8f5",
      theme_color: "#f5a623",
      icons: [
        { src: "/api/functions/serveOGImage?brand=sorted", sizes: "192x192", type: "image/png", purpose: "any" },
        { src: "/api/functions/serveOGImage?brand=sorted", sizes: "512x512", type: "image/png", purpose: "any" }
      ],
      categories: ["productivity", "finance"],
      shortcuts: [
        {
          name: "Decode Letter",
          short_name: "Decode",
          description: "Paste or photo a letter",
          url: "/Sorted",
          icons: [{ src: "/api/functions/serveOGImage?brand=sorted", sizes: "192x192" }]
        },
        {
          name: "Scam Check",
          short_name: "Scam",
          description: "Check if it's a scam",
          url: "/Sorted",
          icons: [{ src: "/api/functions/serveOGImage?brand=sorted", sizes: "192x192" }]
        }
      ]
    } : isCB51 ? {
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
        { src: "/api/functions/serveCB51PNGIcon?size=192", sizes: "192x192", type: "image/png", purpose: "any" },
        { src: "/api/functions/serveCB51PNGIcon?size=512", sizes: "512x512", type: "image/png", purpose: "any" },
        { src: "/api/functions/serveCB51PNGMaskableIcon?size=192", sizes: "192x192", type: "image/png", purpose: "maskable" },
        { src: "/api/functions/serveCB51PNGMaskableIcon?size=512", sizes: "512x512", type: "image/png", purpose: "maskable" }
      ],
      categories: ["productivity", "business"],
      shortcuts: [
        {
          name: "Upload Gig",
          short_name: "Upload",
          description: "Scan a new gig offer",
          url: "/CB51?action=upload",
          icons: [{ src: "/api/functions/serveCB51PNGMaskableIcon?size=192", sizes: "192x192", purpose: "maskable" }]
        },
        {
          name: "Calendar",
          short_name: "Calendar",
          description: "View all shows",
          url: "/CB51CalendarView",
          icons: [{ src: "/api/functions/serveCB51PNGMaskableIcon?size=192", sizes: "192x192", purpose: "maskable" }]
        },
        {
          name: "Messages",
          short_name: "Messages",
          description: "Check inbox",
          url: "/CB51MessageInbox",
          icons: [{ src: "/api/functions/serveCB51PNGMaskableIcon?size=192", sizes: "192x192", purpose: "maskable" }]
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