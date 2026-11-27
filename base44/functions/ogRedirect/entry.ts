import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';

/**
 * OG Redirect — serves correct OG meta tags for social sharing crawlers
 * Detects page from ?page= param or Referer, returns HTML with correct OG tags
 * Bots get proper meta HTML, real browsers get redirected to the app
 */

// ── THE PICTURE THAT MAKES THE CARD ──
// WhatsApp, Facebook, LinkedIn and iMessage all refuse an SVG as a preview image. Hand them
// one and they drop the whole card, leaving a naked URL in the message — which is exactly
// what a raw "api/functions/ogRedirect?page=..." looks like arriving in a chat. So the record
// draws its own card as real PNG bytes, at the 1.91:1 shape a link preview actually wants:
// paper, one signal pulse, no lettering that could be misspelled.
const RECORD_CARD = 'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/cc94d332d_record-cover-mobile.png';

const PAGE_META = {

  // ── SORTED ──────────────────────────────────────────────────────────────
  Family51: {
    title: 'SORTED — Decode Scary Letters in 30 Seconds',
    description: 'Got a scary letter? SORTED decodes it instantly — plain English, any language, nothing stored. Free to try.',
    image: '/api/functions/serveSortedOGImage',
    color: '#b8860b',
  },
  Sorted: {
    title: 'SORTED — Decode Scary Letters in 30 Seconds',
    description: 'Got a scary letter? SORTED decodes it instantly — plain English, any language, nothing stored. Free to try.',
    image: '/api/functions/serveSortedOGImage',
    color: '#b8860b',
  },
  SortedPressRelease: {
    title: 'SORTED — Press Release 2026',
    description: 'AI that decodes scary letters for anyone, anywhere. Launching 2026. Built by Universal Frequency 51.',
    image: '/api/functions/serveSortedOGImage',
    color: '#b8860b',
  },
  SortedInvestorPress: {
    title: 'SORTED — Investor Brief 2026',
    description: 'AI access to justice. £9.99/month. ESG-aligned. B2B white-label for financial services.',
    image: '/api/functions/serveSortedOGImage',
    color: '#b8860b',
  },
  SortedForOrgs: {
    title: 'SORTED for Organisations — Free Pilot for Advice Centres',
    description: 'Help your clients understand official letters before deadlines pass. AI-assisted, private, multilingual. Free pilot for advice centres, debt charities and housing associations.',
    image: '/api/functions/serveSortedOGImage',
    color: '#b8860b',
  },
  SortedPartnerKit: {
    title: 'SORTED — Partner With Us',
    description: '25% affiliate commission. White-label for financial services. ESG impact data. Equity pathway.',
    image: '/api/functions/serveSortedOGImage',
    color: '#b8860b',
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

  // ── TOGETHER WE CAN CHANGE CLIMATE — Janine Selendy's record ────────────
  TogetherChangeClimate: {
    title: 'Together we can change the course of climate change — Record of the Time',
    description: 'Climate emergencies. Solutions that work. People taking action. A free public record, with sources you can follow, in any language a reader names.',
    image: RECORD_CARD,
    imageWidth: 1600,
    imageHeight: 901,
    color: '#0f5f7a',
  },
  ClimatePlatform: {
    title: 'Together we can change the course of climate change — Record of the Time',
    description: 'Climate emergencies. Solutions that work. People taking action. A free public record, with sources you can follow, in any language a reader names.',
    image: RECORD_CARD,
    imageWidth: 1600,
    imageHeight: 901,
    color: '#0f5f7a',
  },
  ClimateMap: {
    title: 'Transmission Map — Together We Can Change Climate',
    description: 'Every climate solution, crisis and action on one map. See what is working, and where help is needed most.',
    image: RECORD_CARD,
    color: '#0f5f7a',
  },
  ClimateImpact: {
    title: 'Global Impact — Together We Can Change Climate',
    description: 'How far the climate record has travelled. Readers by country and nation, solutions shared, actions taken.',
    image: RECORD_CARD,
    color: '#0f5f7a',
  },

  // ── THE CARTOON ROOM ────────────────────────────────────────────────────
  // A link to this room arrives as the room: the real CAIB cover rather than the record's
  // mark, which is what everybody was seeing. A stored public picture, at its own real
  // dimensions, so every unfurler gets a picture it can actually open — and no function has
  // to draw anything while a message is being read in Lagos, London or Los Angeles.
  ClimateCartoons: {
    title: 'The Wall — the record’s cartoon room',
    description: 'Drawings gathered for the 8th CartoonAFRICA International Biennial, and Janine Selendy’s workshop on Sunday 29 November. The wall is open: send a drawing and it goes up with your name on it.',
    image: 'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/04b7522a8_caib-2026-catalogue-cover.jpeg',
    imageWidth: 682,
    imageHeight: 1024,
    color: '#ffd447',
  },

  // ── THE EVENT, WHICH IS NOT THE WALL AND NOT A SHOW ─────────────────────
  // Sunday's session has its own card so a link to the hour does not arrive looking like a
  // link to the room or to somebody's exhibition. What it says is what the page says: whose
  // workshop it is, which day, and what the hour is for. No attendance claim, no numbers,
  // no promise about what will be said on the day.
  ClimateWorkshop: {
    title: 'The cartoon room at CartoonAFRICA · Sunday 29 November 2026',
    description: 'Janine Selendy’s workshop: the record, the wall of drawings, and what a cartoon can say that a report cannot. The hour, as she set it.',
    image: 'https://base44.app/api/apps/6889f31e76713b9cd47e043c/files/mp/public/6889f31e76713b9cd47e043c/04b7522a8_caib-2026-catalogue-cover.jpeg',
    imageWidth: 682,
    imageHeight: 1024,
    color: '#ffd447',
  },

  default: {
    title: 'Universal Frequency 51 • Heal the Planet',
    description: 'Heal yourself, heal the planet. Free healing frequencies, lossless music, and environmental action.',
    image: '/api/functions/serveOGImage',
    color: '#22c55e',
  }
};

export default async function(req) {
  const url = new URL(req.url);
  const page = url.searchParams.get('page') || 'default';
  const host = req.headers.get('host') || 'uf51.love';
  const origin = `https://${host}`;
  
  const esc = (value) => String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  // ── A HUNG SHOW IS NOT THE ROOM, AND NOT THE EVENT ────────────────────────
  // A show passed on into a chat has to arrive as that show: its own name, its own
  // drawings, its own count of hands. So the card is read from the same records the show
  // prints from, and every number on it is counted from drawings a keeper has actually
  // published. A card that says eight drawings when two were taken down is a lie in a
  // chat window, and lies in chat windows are the ones that get forwarded. If nothing the
  // show named is published, the card says that plainly instead of dressing up an empty
  // show, and the room's own cover is used rather than somebody's drawing.
  const showIds = (url.searchParams.get('ids') || '')
    .split(',').map((id) => id.trim()).filter(Boolean).slice(0, 200);
  const showName = (url.searchParams.get('t') || '').trim().slice(0, 90);
  const isShow = page === 'ClimateCartoons/Exhibition' || url.searchParams.has('ids');

  type Card = { title: string; description: string; image: string; color: string; imageWidth?: number; imageHeight?: number };
  let meta: Card;
  let pageUrl: string;

  if (isShow) {
    const query = showIds.length
      ? `?ids=${encodeURIComponent(showIds.join(','))}${showName ? `&t=${encodeURIComponent(showName)}` : ''}`
      : '';
    pageUrl = `${origin}/ClimateCartoons/Exhibition${query}`;

    let drawings = [];
    if (showIds.length) {
      const base44 = createClientFromRequest(req);
      const found = await base44.asServiceRole.entities.ClimateCartoon.filter(
        { id: { $in: showIds }, status: 'published' },
        { limit: 200 },
      );
      const byId = new Map((found.items || found).map((record) => [record.id, record]));
      drawings = showIds.map((id) => byId.get(id)).filter(Boolean);
    }

    const hands = [...new Set(drawings.map((drawing) => drawing.artist_name).filter(Boolean))];
    const count = drawings.length;
    // A picture the record itself holds opens anywhere; one it only points at may not load
    // for a crawler in another country, so a stored copy is used when the show has one.
    const stored = drawings.find((drawing) => /^https:\/\/base44\.app\//.test(drawing.image_url || ''));

    meta = {
      title: showName || (count
        ? `An exhibition of ${count} drawing${count === 1 ? '' : 's'}`
        : 'An exhibition from the cartoon room'),
      description: count
        ? `${count} drawing${count === 1 ? '' : 's'} from ${hands.length} hand${hands.length === 1 ? '' : 's'}${hands.length && hands.length <= 2 ? `, ${hands.join(' and ')}` : ''}, shown with permission. Together We Can Change Climate, the cartoon room.`
        : 'A show hung from the cartoon room. The drawings it named are not published, so there is nothing on this paper.',
      image: (stored || drawings[0])?.image_url || PAGE_META.ClimateCartoons.image,
      color: '#ffd447',
    };
    meta.title = esc(meta.title);
    meta.description = esc(meta.description);
  } else if (page === 'ClimateCartoons' && url.searchParams.get('drawing')) {
    // ── ONE DRAWING, ARRIVING AS ITSELF ──────────────────────────────────────
    // A cartoonist sends their own drawing to a gallery and the link unfurls as the room's
    // catalogue cover, with the room's sentence under it and their name nowhere — the exact
    // thing this room exists to stop. So a link that names one drawing is answered with that
    // drawing: its picture, the hand that made it, where it came from, and their own line
    // quoted as they wrote it. Nothing is drawn while a message is being read: the picture is
    // the file the record already holds.
    const drawingId = String(url.searchParams.get('drawing')).trim();
    pageUrl = `${origin}/ClimateCartoons?drawing=${encodeURIComponent(drawingId)}`;
    const base44 = createClientFromRequest(req);
    const found = await base44.asServiceRole.entities.ClimateCartoon.filter(
      { id: drawingId, status: 'published' },
      { limit: 1 },
    );
    const drawing = (found.items || found)[0];
    if (drawing) {
      const who = [drawing.artist_name, drawing.origin].filter(Boolean).join(', ');
      const own = String(drawing.for_line || '').trim();
      meta = {
        title: drawing.title && drawing.artist_name
          ? `${drawing.title} — ${drawing.artist_name}`
          : `${drawing.artist_name || 'A drawing'} — a drawing for the record`,
        description: own
          ? `${who ? `${who}. ` : ''}“${own}” Given to the cartoon room, Together We Can Change Climate.`
          : `${who || 'A drawing'} given to the cartoon room, Together We Can Change Climate.`,
        image: drawing.image_url || PAGE_META.ClimateCartoons.image,
        color: '#ffd447',
      };
    } else {
      // Not on the wall: the room is, and the card says so rather than showing a picture the
      // link does not actually open.
      meta = {
        ...PAGE_META.ClimateCartoons,
        description: 'This drawing is not on the wall. The room it was given to is open, and the wall is open to the next hand.',
      };
    }
    meta.title = esc(meta.title);
    meta.description = esc(meta.description);
  } else {
    meta = PAGE_META[page] || PAGE_META.default;
    pageUrl = `${origin}/${page}`;
  }

  // A card held on storage carries its own whole address; one drawn by a function is
  // relative to wherever the record is standing.
  const imageUrl = /^https?:\/\//.test(meta.image) ? meta.image : origin + meta.image;
  // The type is read from the address rather than assumed: the room's card is a JPEG and
  // was being declared a PNG, which is the sort of small untruth an unfurler drops a
  // picture over.
  const imageType = /\.webp(\?|$)/i.test(imageUrl) ? 'image/webp'
    : /\.jpe?g(\?|$)/i.test(imageUrl) ? 'image/jpeg'
      : /\.gif(\?|$)/i.test(imageUrl) ? 'image/gif'
        : 'image/png';

  // Check if this is a social media crawler (not a real browser)
  const userAgent = req.headers.get('user-agent') || '';
  // Every unfurler that matters, not just the obvious ones. A crawler that is not named
  // here is answered with a redirect, follows it to a page that has no tags of its own,
  // and sends the message on with nothing but a bare link.
  const isCrawler = /whatsapp|telegram|twitterbot|facebookexternalhit|facebookcatalog|linkedinbot|slackbot|slack-imgproxy|discordbot|imessage|applebot|skypeuripreview|vkshare|redditbot|pinterest|embedly|iframely|google-pagerenderer|bingpreview|snapchat|mastodon|bluesky|cardyb|curl|python|bot/i.test(userAgent);

  if (!isCrawler) {
    // Real browser — redirect to the actual page
    return new Response(null, {
      status: 302,
      headers: { 'Location': pageUrl }
    });
  }

  // Some unfurlers ask with HEAD before they ask with GET. Answering that with a redirect
  // is the same as having no card at all, so it is given the headers a GET would carry.
  if (req.method === 'HEAD') {
    return new Response(null, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
      },
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
  <meta property="og:image:type" content="${imageType}" />
  <meta property="og:image:alt" content="${meta.title}" />
${meta.imageWidth && meta.imageHeight ? `  <meta property="og:image:width" content="${meta.imageWidth}" />
  <meta property="og:image:height" content="${meta.imageHeight}" />
` : ''}
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
      // Five minutes, not an hour: a unfurler that failed once must not be stuck with that
      // failure for the rest of the day. WhatsApp in particular caches a miss hard.
      'Cache-Control': 'public, max-age=300',
    }
  });
}