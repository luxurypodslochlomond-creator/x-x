Deno.serve(async (req) => {
  try {
    const url = new URL(req.url);
    const hostname = req.headers.get('host') || '';
    const referer = req.headers.get('referer') || '';
    const isCB51 = hostname.includes('cb51.') || referer.includes('/CB51') || referer.includes('/Scott') || url.searchParams.get('brand') === 'cb51';
    const isSorted = referer.includes('/Sorted') || referer.includes('/Family51') || url.searchParams.get('brand') === 'sorted';
    const isClimate = url.searchParams.get('brand') === 'climate' || referer.includes('/TogetherChangeClimate') || referer.includes('/ClimatePlatform') || referer.includes('/Climate');

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
    } : isClimate ? {
      // The name on the home screen is the mark itself. A phone that saves this page gets
      // "x = x" under the icon, which is the one place a reader carries the record around
      // with them — so it should say what the record says, not describe it.
      name: "x = x — Record of the Time",
      short_name: "x = x",
      description: "A public record of climate emergencies and the positive actions that work — shared openly, internationally.",
      start_url: "/TogetherChangeClimate",
      scope: "/",
      display: "standalone",
      orientation: "portrait-primary",
      background_color: "#141210",
      theme_color: "#b3261e",
      // Real PNGs, at the sizes they claim to be. The icons here used to point at the SVG
      // card while telling the phone it was a 192 and a 512 PNG — a phone that checks, and
      // Android does, then has no icon to put on the Home Screen.
      icons: [
        { src: "/api/functions/serveClimateIcon?size=192&mark=full", sizes: "192x192", type: "image/png", purpose: "any" },
        { src: "/api/functions/serveClimateIcon?size=512&mark=full", sizes: "512x512", type: "image/png", purpose: "any" },
        { src: "/api/functions/serveClimateIcon?size=512&mark=full", sizes: "512x512", type: "image/png", purpose: "maskable" }
      ],
      categories: ["education", "news"],
      shortcuts: [
        {
          name: "Transmission Map",
          short_name: "Map",
          description: "Where the record is being read",
          url: "/ClimateMap",
          icons: [{ src: "/api/functions/serveClimateIcon?size=192&mark=full", sizes: "192x192", type: "image/png" }]
        },
        {
          name: "Global Impact",
          short_name: "Impact",
          description: "Reach by country and nation",
          url: "/ClimateImpact",
          icons: [{ src: "/api/functions/serveClimateIcon?size=192&mark=full", sizes: "192x192", type: "image/png" }]
        }
      ]
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
        'Cache-Control': 'public, max-age=300' // 5 min cache to catch brand detection changes
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});