/**
 * OG Redirect — serves correct OG meta tags for social sharing crawlers
 * Detects page from ?page= param or Referer, returns HTML with correct OG tags
 * Bots get proper meta HTML, real browsers get redirected to the app
 */

const PAGE_META = {

  // ── SORTED ──────────────────────────────────────────────────────────────
  Family51: {
    title: 'SORTED — Decode Scary Letters in 30 Seconds',
    description: 'Got a scary letter? SORTED decodes it instantly — plain English, any language, nothing stored. Free to try.',
    image: '/api/functions/serveOGImage?brand=sorted',
    color: '#f97316',
  },
  Sorted: {
    title: 'SORTED — Decode Scary Letters in 30 Seconds',
    description: 'Got a scary letter? SORTED decodes it instantly — plain English, any language, nothing stored. Free to try.',
    image: '/api/functions/serveOGImage?brand=sorted',
    color: '#f97316',
  },
  SortedPressRelease: {
    title: 'SORTED — Press Release 2026',
    description: 'AI that decodes scary letters for anyone, anywhere. Launching 2026. Built by Universal Frequency 51.',
    image: '/api/functions/serveOGImage?brand=sorted',
    color: '#f97316',
  },
  SortedInvestorPress: {
    title: 'SORTED — Investor Brief 2026',
    description: 'AI access to justice. £9.99/month. ESG-aligned. B2B white-label for financial services.',
    image: '/api/functions/serveOGImage?brand=sorted',
    color: '#f97316',
  },
  SortedPartnerKit: {
    title: 'SORTED — Partner With Us',
    description: '25% affiliate commission. White-label for financial services. ESG impact data. Equity pathway.',
    image: '/api/functions/serveOGImage?brand=sorted',
    color: '#f97316',
  },

  // ── CB51 ─────────────────────────────────────────────────────────────────
  CB51: {
    title: 'CB51 — AI Co-Manager for Artists',
    description: 'CB51 : CitizenBand51 : Avoid the Noise. Handle gig offers, band voting, finance and contracts — all in one place.',
    image: '/api/functions/serveCB51OGImage',
    color: '#06b6d4',
  },
  CB51CalendarView: {
    title: 'CB51 — Gig Calendar',
    description: 'All your shows, sessions and tours in one place. CB51 keeps your calendar clean.',
    image: '/api/functions/serveCB51OGImage',
    color: '#06b6d4',
  },
  CB51MessageInbox: {
    title: 'CB51 — Message Inbox',
    description: 'AI-powered inbox for artists. Gig offers, contracts and promoter messages — parsed and prioritised.',
    image: '/api/functions/serveCB51OGImage',
    color: '#06b6d4',
  },
  CB51FinanceAdmin: {
    title: 'CB51 — Finance Tracker',
    description: 'Track gig fees, invoices and payments. Know exactly where your money is.',
    image: '/api/functions/serveCB51OGImage',
    color: '#06b6d4',
  },
  CB51Todo: {
    title: 'CB51 — Task Manager',
    description: 'Keep your team on track. Tasks, deadlines and priorities — all in one place.',
    image: '/api/functions/serveCB51OGImage',
    color: '#06b6d4',
  },
  CB51About: {
    title: 'CB51 — About CitizenBand51',
    description: 'Built for artists who are done with the noise. CB51 is your AI co-manager.',
    image: '/api/functions/serveCB51OGImage',
    color: '#06b6d4',
  },

  // ── PETSOUNDS51 ──────────────────────────────────────────────────────────
  PetSounds51: {
    title: 'PetSounds51 — Sound Therapy for Anxious Pets',
    description: 'Psychoacoustic protocols for dogs, cats and horses. Built on peer-reviewed research. Try free — no signup needed.',
    image: '/api/functions/servePetSounds51OGImage',
    color: '#d4a017',
  },
  PetSounds51Landing: {
    title: 'PetSounds51 — Why It Works',
    description: 'Science-backed sound therapy for animal anxiety. Separation anxiety, thunderstorms, vet visits. Free protocols available.',
    image: '/api/functions/servePetSounds51OGImage',
    color: '#d4a017',
  },
  PetSounds51Whitepaper: {
    title: 'PetSounds51 — Science Whitepaper',
    description: 'Peer-reviewed research behind PetSounds51. How psychoacoustic therapy works for dogs, cats and horses.',
    image: '/api/functions/servePetSounds51OGImage',
    color: '#d4a017',
  },
  PetSounds51Story: {
    title: 'PetSounds51 — The Story',
    description: 'Why we built PetSounds51 — science-backed sound therapy for animals who can\'t tell you they\'re suffering.',
    image: '/api/functions/servePetSounds51OGImage',
    color: '#d4a017',
  },
  PetSounds51InvestorPress: {
    title: 'PetSounds51 — Investor Brief 2026',
    description: '$150B global pet care market. ESG-aligned. Vet partnership model. Browser-native psychoacoustic engine.',
    image: '/api/functions/servePetSounds51OGImage',
    color: '#d4a017',
  },
  PetSounds51PartnerBrief: {
    title: 'PetSounds51 — Partner With Us',
    description: 'Vet clinics, pet brands and influencers. Join the PetSounds51 partner network.',
    image: '/api/functions/servePetSounds51OGImage',
    color: '#d4a017',
  },

  // ── BUZZSTOP ─────────────────────────────────────────────────────────────
  BuzzStop: {
    title: 'BuzzStop — Cancel Your Tinnitus',
    description: 'AI-powered tinnitus relief. Personalised frequency matching. No login. No app. Start free in 30 seconds.',
    image: '/api/functions/serveOGImage',
    color: '#8b5cf6',
  },

  // ── UF51 / OTHER ─────────────────────────────────────────────────────────
  Stoneymollan: {
    title: 'Stoneymollan Muir — Ancient Coffin Road · Loch Lomond',
    description: 'Walk the ancient coffin road above Loch Lomond. History, wildlife, and breathtaking views.',
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