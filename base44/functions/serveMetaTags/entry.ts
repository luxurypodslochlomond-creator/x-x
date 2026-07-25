// OG meta tag injector - serves page-specific HTML with correct social sharing tags
// Called as a redirect or proxy for social scrapers

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const page = url.searchParams.get('page') || '';

  const pages = {
    'Family51': {
      title: 'SORTED — Decode Scary Letters in 30 Seconds',
      description: 'Got a scary letter? SORTED decodes it instantly — plain English, any language, nothing stored. Free to try.',
      image: 'https://uf51.love/api/functions/serveOGImage?brand=sorted',
      url: 'https://uf51.love/Family51',
    },
    'Sorted': {
      title: 'SORTED — Decode Scary Letters in 30 Seconds',
      description: 'Got a scary letter? SORTED decodes it instantly — plain English, any language, nothing stored. Free to try.',
      image: 'https://uf51.love/api/functions/serveOGImage?brand=sorted',
      url: 'https://uf51.love/Sorted',
    },
    'SortedPartnerKit': {
      title: 'SORTED Partner Kit — Build With Us',
      description: 'Partner with SORTED. 25% affiliate commission. White-label for financial services. ESG impact data. Equity pathway.',
      image: 'https://uf51.love/api/functions/serveOGImage?brand=sorted',
      url: 'https://uf51.love/SortedPartnerKit',
    },
    'SortedInvestorPress': {
      title: 'SORTED — Investor Brief 2026',
      description: 'AI access to justice. £9.99/month subscription. ESG-aligned. B2B white-label for financial services.',
      image: 'https://uf51.love/api/functions/serveOGImage?brand=sorted',
      url: 'https://uf51.love/SortedInvestorPress',
    },
    'SortedForOrgs': {
      title: 'SORTED for Organisations — Free Pilot for Advice Centres',
      description: 'Help your clients understand official letters before deadlines pass. AI-assisted, private, multilingual. Free pilot for advice centres, debt charities and housing associations.',
      image: 'https://uf51.love/api/functions/serveOGImage?brand=sorted',
      url: 'https://uf51.love/SortedForOrgs',
    },
    'SortedPressRelease': {
      title: 'SORTED — Press Release',
      description: 'AI that decodes scary letters for anyone, anywhere. Launching 2026. Built by Universal Frequency 51.',
      image: 'https://uf51.love/api/functions/serveOGImage?brand=sorted',
      url: 'https://uf51.love/SortedPressRelease',
    },
    'PetSounds51': {
      title: 'PetSounds51 — Sound Therapy for Anxious Pets',
      description: 'Psychoacoustic protocols for dogs, cats and horses. Built on peer-reviewed research. Try free — no signup needed.',
      image: 'https://uf51.love/api/functions/servePetSounds51OGImage',
      url: 'https://uf51.love/PetSounds51',
    },
    'PetSounds51Landing': {
      title: 'PetSounds51 — Why It Works',
      description: 'Science-backed sound therapy for animal anxiety. Separation anxiety, thunderstorms, vet visits. Free protocols available.',
      image: 'https://uf51.love/api/functions/servePetSounds51OGImage',
      url: 'https://uf51.love/PetSounds51Landing',
    },
    'PetSounds51InvestorPress': {
      title: 'PetSounds51 — Investor Brief 2026',
      description: '$150B global pet care market. ESG-aligned. Vet partnership model. Browser-native psychoacoustic engine.',
      image: 'https://uf51.love/api/functions/servePetSounds51OGImage',
      url: 'https://uf51.love/PetSounds51InvestorPress',
    },
    // CB51 pages
    'CB51': {
      title: 'CB51 — AI Co-Manager for Artists',
      description: 'Avoid the noise. CB51 handles gig offers, band voting, finance and contracts so artists can focus on music.',
      image: 'https://uf51.love/api/functions/serveOGImage?brand=cb51',
      url: 'https://uf51.love/CB51',
    },
    'CB51CalendarView': {
      title: 'CB51 — Gig Calendar',
      description: 'All your shows, sessions and tours in one place. CB51 keeps your calendar clean.',
      image: 'https://uf51.love/api/functions/serveOGImage?brand=cb51',
      url: 'https://uf51.love/CB51CalendarView',
    },
    'CB51MessageInbox': {
      title: 'CB51 — Message Inbox',
      description: 'AI-powered inbox for artists. Gig offers, contracts and promoter messages — parsed and prioritised.',
      image: 'https://uf51.love/api/functions/serveOGImage?brand=cb51',
      url: 'https://uf51.love/CB51MessageInbox',
    },
    'CB51FinanceAdmin': {
      title: 'CB51 — Finance Tracker',
      description: 'Track gig fees, invoices and payments. Know exactly where your money is.',
      image: 'https://uf51.love/api/functions/serveOGImage?brand=cb51',
      url: 'https://uf51.love/CB51FinanceAdmin',
    },
    'CB51Todo': {
      title: 'CB51 — Task Manager',
      description: 'Keep your team on track. Tasks, deadlines and priorities — all in one place.',
      image: 'https://uf51.love/api/functions/serveOGImage?brand=cb51',
      url: 'https://uf51.love/CB51Todo',
    },
    'CB51About': {
      title: 'CB51 — About CitizenBand51',
      description: 'Built for artists who are done with the noise. CB51 is your AI co-manager.',
      image: 'https://uf51.love/api/functions/serveOGImage?brand=cb51',
      url: 'https://uf51.love/CB51About',
    },
  };

  const meta = pages[page] || {
    title: 'UF51 • We Made Stuff That Actually Helps',
    description: 'Decoding scary letters, calming stressed pets, masking tinnitus, environmental action into reward.',
    image: 'https://uf51.love/api/functions/serveOGImage',
    url: 'https://uf51.love',
  };

  // Return HTML with correct OG tags + instant redirect to the real page
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}"/>
  <meta property="og:title" content="${meta.title}"/>
  <meta property="og:description" content="${meta.description}"/>
  <meta property="og:image" content="${meta.image}"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:type" content="website"/>
  <meta property="og:url" content="${meta.url}"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${meta.title}"/>
  <meta name="twitter:description" content="${meta.description}"/>
  <meta name="twitter:image" content="${meta.image}"/>
  <meta http-equiv="refresh" content="0;url=${meta.url}"/>
</head>
<body>
  <a href="${meta.url}">${meta.title}</a>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
});