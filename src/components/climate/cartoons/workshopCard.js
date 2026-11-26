import { loadRecordCardFonts } from '@/components/climate/recordTypography';
import { recordOrigin } from '@/components/climate/recordAddress';
import { CARTOON_COVER, CARTOON_EVENT } from '@/components/climate/cartoons/cartoonEvent';
import { cardWords, cardTongueIsRightToLeft } from '@/components/climate/cardTongue';

// ── THE FIRST CREATIVE ─────────────────────────────────────────────────────────
// Alina Sen, 26 November: "Make a nice visual first creative talking about the workshop, the
// cartoons and the speakers and the organisations. This can be put up at Cartoon Africa
// International Biennial instagram, X, Linkedin and other platforms."
//
// So this card is workshop-first, not book-first. The event card (cartoonCard.js) is a poster
// for the three days; this one is for the hour, and it carries the four things she asked for:
// the workshop's subject, the drawing, the speakers with what each of them is doing, and the
// three organisations that are actually behind it.
//
// Every name and role below is from Janine's own draft agenda, and every organisation is one
// that is genuinely in the room: CartoonAFRICA (Francis's, since 2012), CEEW (Alina's), and
// Horizon International at Yale (Janine's). The drawing is Francis's catalogue cover, printed
// whole with his name on it, because a picture posted by the biennial should be the
// biennial's own cover and not somebody else's drawing borrowed for a poster.
const HEAD = 'Climate change and the power of collective actions and creative interventions';
const KICKER = 'A CLIMATE WORKSHOP · ONLINE · FREE';
const HOUR = 'Sunday 29 November · 3pm West Africa · 2pm UK · one hour';
const SPEAKERS = [
  'Janine Selendy · Horizon International, Yale · host',
  'Francis Umendu Odupute · CartoonAFRICA Biennial · the cartoonists',
  'Alina Sen · CEEW India · What On Earth!',
  'Brian Hughes · the platform it is all kept on',
];
const ORGS = 'CartoonAFRICA International Biennial · CEEW · Horizon International';

function lines(ctx, text, width) {
  const result = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    if (line && ctx.measureText(`${line} ${word}`).width > width) { result.push(line); line = word; }
    else line = line ? `${line} ${word}` : word;
  }
  if (line) result.push(line);
  return result;
}

function artwork(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('The cover could not be opened. Please try again.'));
    image.src = src;
  });
}

export async function buildWorkshopCard(card = {}, options = {}) {
  const [image, { DISPLAY, colors }, words] = await Promise.all([
    artwork(card.image || CARTOON_COVER),
    loadRecordCardFonts(),
    cardWords([HEAD, KICKER, HOUR, ...SPEAKERS, ORGS, CARTOON_EVENT.coverArt]),
  ]);
  const t = (line) => words[line] || line;

  // A feed-shaped card rather than a story: 1080 × 1350 is the portrait a post holds whole.
  const W = 1080, H = 1350, pad = 56, band = 810;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (cardTongueIsRightToLeft()) ctx.direction = 'rtl';

  ctx.fillStyle = colors.PAPER;
  ctx.fillRect(0, 0, W, H);

  // The cover, whole, never cropped to fill.
  const scale = Math.min((W - 24) / image.width, (band - 20) / image.height);
  const w = image.width * scale, h = image.height * scale;
  ctx.drawImage(image, (W - w) / 2, (band - h) / 2, w, h);

  // The band carries what the picture cannot say.
  ctx.fillStyle = colors.SUN;
  ctx.fillRect(0, band, W, H - band);
  ctx.fillStyle = colors.INK;
  ctx.fillRect(pad, band, W - pad * 2, 4);

  ctx.fillStyle = colors.RED || colors.INK;
  ctx.font = `700 22px ${DISPLAY}`;
  ctx.fillText(t(KICKER), pad, band + 52);

  ctx.fillStyle = colors.INK;
  let titleSize = 40;
  ctx.font = `700 ${titleSize}px ${DISPLAY}`;
  let head = lines(ctx, t(HEAD), W - pad * 2);
  while (head.length > 2 && titleSize > 28) {
    titleSize -= 2;
    ctx.font = `700 ${titleSize}px ${DISPLAY}`;
    head = lines(ctx, t(HEAD), W - pad * 2);
  }
  head.slice(0, 2).forEach((line, i) => ctx.fillText(line, pad, band + 96 + i * (titleSize + 6)));

  ctx.font = `700 26px ${DISPLAY}`;
  ctx.fillText(t(HOUR), pad, band + 196);

  ctx.font = `400 24px ${DISPLAY}`;
  SPEAKERS.forEach((s, i) => ctx.fillText(t(s), pad, band + 244 + i * 33));

  ctx.fillStyle = colors.MUTED;
  ctx.font = `400 19px ${DISPLAY}`;
  ctx.fillText(t(ORGS), pad, band + 392);

  const origin = String(options.origin || recordOrigin()).replace(/^https?:\/\//, '').replace(/\/$/, '');
  ctx.fillStyle = colors.INK;
  ctx.font = `700 28px ${DISPLAY}`;
  ctx.fillText(`${origin}/ClimateWorkshop`, pad, band + 440);

  ctx.textAlign = 'right';
  ctx.fillStyle = colors.MUTED;
  ctx.font = `400 18px ${DISPLAY}`;
  ctx.fillText(t(CARTOON_EVENT.coverArt), W - pad, band + 486);
  ctx.textAlign = 'left';

  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('The card could not be saved. Please try again.'))), 'image/png'),
  );
}

export const WORKSHOP_CARD = {
  id: 'caib-2026-workshop',
  title: CARTOON_EVENT.title,
  image: CARTOON_COVER,
};