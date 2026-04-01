/**
 * OG Redirect — serves correct OG meta tags for social sharing crawlers
 * Detects page from ?page= param or Referer, returns HTML with correct OG tags
 * Bots get proper meta HTML, real browsers get redirected to the app
 */

const PAGE_META = {
PetSounds51Landing: {
  title: 'PetSounds51 — Sound Therapy for Animals',
  description: 'Science-backed psychoacoustic therapy for dogs, cats & horses. Anxiety, pain, sleep & stress — free to try. Built on real research.',
  image: '/api/functions/servePetSounds51OGImage',
  color: '#d4a017',
},
PetSounds51Whitepaper: {
  title: 'PetSounds51 — Science Whitepaper',
  description: 'Peer-reviewed research behind PetSounds51. How psychoacoustic therapy works for dogs, cats and horses.',
  image: '/api/functions/servePetSounds51OGImage',
  color: '#d4a017',
},
PetSounds51: {
    title: 'PetSounds51 • Healing frequencies for anxious pets',
    description: 'Sound therapy for anxious pets — built on peer-reviewed research. Try the Separation Anxiety protocol free. No signup needed.',
    image: '/api/functions/servePetSounds51OGImage',
    color: '#d4a017',
  },
  PetSounds51Story: {
    title: 'PetSounds51 • The Story',
    description: 'Why we built PetSounds51 — science-backed sound therapy for animals who can\'t tell you they\'re suffering.',
    image: '/api/functions/servePetSounds51OGImage',
    color: '#d4a017',
  },
  CB51: {
    title: 'CB51 • Your AI Co-Manager for Artists',
    description: 'CB51 : CitizenBand51 : Avoid the Noise. AI-powered artist management — gigs, finance, contracts, all in one place.',
    image: '/api/functions/serveCB51OGImage',
    color: '#06b6d4',
  },
  Stoneymollan: {
    title: 'Stoneymollan Muir • Ancient Coffin Road · Loch Lomond',
    description: 'Walk the ancient coffin road above Loch Lomond. History, wildlife, and breathtaking views on the shores of Scotland\'s most famous loch.',
    image: '/api/functions/serveOGImage',
    color: '#22c55e',
  },
  default: {
    title: 'Universal Frequency 51 • Heal the Planet',
    description: 'Heal yourself, heal the planet. Free healing frequencies, lossless music, and environmental action.',
    image: '/api/functions/serveOGImage',
    color: '#22c55e',
  }
};

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const page = url.searchParams.get('page') || 'default';
  const host = req.headers.get('host') || 'uf51.love';
  const origin = `https://${host}`;
  
  const meta = PAGE_META[page] || PAGE_META.default;
  const imageUrl = origin + meta.image;
  const pageUrl = `${origin}/${page}`;

  // Check if this is a social media crawler (not a real browser)
  const userAgent = req.headers.get('user-agent') || '';
  const isCrawler = /whatsapp|telegram|twitterbot|facebookexternalhit|linkedinbot|slackbot|discordbot|iMessage|applebot|curl|python|bot/i.test(userAgent);

  if (!isCrawler) {
    // Real browser — redirect to the actual page
    return new Response(null, {
      status: 302,
      headers: { 'Location': pageUrl }
    });
  }

  // Crawler — return HTML with OG tags
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:title" content="${meta.title}" />
  <meta property="og:description" content="${meta.description}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${meta.title}" />
  <meta name="twitter:description" content="${meta.description}" />
  <meta name="twitter:image" content="${imageUrl}" />
  <meta name="theme-color" content="${meta.color}" />
  <link rel="canonical" href="${pageUrl}" />
</head>
<body>
  <h1>${meta.title}</h1>
  <p>${meta.description}</p>
  <a href="${pageUrl}">Visit ${page}</a>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    }
  });
});