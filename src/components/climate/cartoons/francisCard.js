import { loadRecordCardFonts } from '@/components/climate/recordTypography';
import { recordOrigin } from '@/components/climate/recordAddress';
import { cardWords, cardTongueIsRightToLeft } from '@/components/climate/cardTongue';
import { CARTOON_COVER, CARTOON_EVENT } from '@/components/climate/cartoons/cartoonEvent';

// ── ONE HAND, AS A CARD ────────────────────────────────────────────────────────
// Francis Umendu Odupute has been carrying the CartoonAFRICA campaign since he started the
// biennial in November 2012, he drew the cover of the 2026 catalogue, and he is one of the
// two editors of the book this room is gathering. Until now his name appeared on the record
// only as a credit under somebody else's frame — which is the wrong way round for a man who
// needs his work to reach the world.
//
// So this is his card: his name, the signature he draws under, his own sentence about what
// he does (quoted exactly, never tidied), and the cover he drew printed whole and never
// cropped. His name and his sentence are never translated — a person's own words are his.
// The record's own labels travel in the reader's tongue, because a card lands in a chat in
// a language nobody chose for it.
//
// Drawn in the browser, on the device of whoever shares it. Making the card sends nothing.
const W = 1080;
const H = 1350;
const PAD = 60;
const MAXW = W - PAD * 2;
const FOOTER_TOP = 1200;

// The words the record says on his behalf — the only lines on this card that are ours.
const CARD_LINES = [
  '8TH CARTOONAFRICA BIENNIAL · BENIN CITY · 28–30 NOVEMBER 2026',
  'ONE HAND · HIS OWN PAGE ON THE RECORD',
  'CURATOR · 8TH CARTOONAFRICA INTERNATIONAL BIENNIAL',
  'National Museum, Benin City, Edo State, Nigeria · edited with Janine M. H. Selendy',
];

function wrap(ctx, text, maxWidth, maxLines) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width <= maxWidth || !line) { line = test; return; }
    lines.push(line);
    line = word;
  });
  if (line) lines.push(line);
  return lines.slice(0, maxLines);
}

function loadImage(src) {
  return new Promise((resolve) => {
    if (!src) { resolve(null); return; }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export async function buildFrancisShareCard(card = {}, options = {}) {
  const origin = String(options.origin || recordOrigin()).replace(/^https?:\/\//, '').replace(/\/$/, '');
  const [cover, { DISPLAY, MONO, colors: { PAPER, SUN, INK, RED, MARK, MUTED } }, words] = await Promise.all([
    loadImage(card.image || CARTOON_COVER),
    loadRecordCardFonts(),
    cardWords([...CARD_LINES, CARTOON_EVENT.coverArt]),
  ]);
  const t = (line) => words[line] || line;

  // A tongue that reads right to left is laid out from the other edge, so the card does not
  // arrive in Arabic set as though it were English with the wrong letters.
  const rtl = cardTongueIsRightToLeft();
  const near = rtl ? W - PAD : PAD;
  const far = rtl ? PAD : W - PAD;
  const align = rtl ? 'right' : 'left';

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);

  // Whose book this is, said before anything of ours.
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, 78);
  ctx.fillStyle = SUN;
  ctx.font = `700 17px ${MONO}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(t(CARD_LINES[0]), W / 2, 40);
  ctx.textAlign = align;
  ctx.textBaseline = 'alphabetic';

  ctx.fillStyle = RED;
  ctx.font = `700 19px ${MONO}`;
  ctx.fillText(t(CARD_LINES[1]), near, 138);

  // His name, at the size a name belongs at — and never translated.
  ctx.fillStyle = INK;
  ctx.font = `700 84px ${DISPLAY}`;
  ctx.fillText('FRANCIS UMENDU', near, 228);
  ctx.fillText('ODUPUTE', near, 316);

  // The signature he draws under, as it appears on the wall.
  ctx.fillStyle = RED;
  ctx.font = `700 26px ${MONO}`;
  ctx.fillText('FRANCODUS', near, 362);

  // His own sentence, in quotation marks because it is his, not ours.
  ctx.fillStyle = INK;
  ctx.font = `400 27px ${DISPLAY}`;
  wrap(ctx, '“I am a visual artist and a journalist.”', MAXW, 2).forEach((line, i) => ctx.fillText(line, near, 414 + i * 38));

  // The cover he drew, printed whole and never cropped: the picture is the reason to open this.
  const artTop = 486;
  const artRoom = FOOTER_TOP - artTop - 40;
  if (cover) {
    const scale = Math.min(MAXW / cover.width, artRoom / cover.height);
    const width = cover.width * scale;
    const height = cover.height * scale;
    const x = PAD + (MAXW - width) / 2;
    ctx.fillStyle = '#fffdf7';
    ctx.fillRect(x - 8, artTop - 8, width + 16, height + 16);
    ctx.drawImage(cover, x, artTop, width, height);
    ctx.strokeStyle = INK;
    ctx.lineWidth = 3;
    ctx.strokeRect(x - 8, artTop - 8, width + 16, height + 16);
  } else {
    // No picture on this device: the card still says whose it is and where to find him.
    ctx.fillStyle = MUTED;
    ctx.font = `400 24px ${MONO}`;
    ctx.fillText(t(CARTOON_EVENT.coverArt), near, artTop + 40);
  }

  ctx.fillStyle = MUTED;
  ctx.font = `400 19px ${MONO}`;
  ctx.fillText(t(CARTOON_EVENT.coverArt), near, FOOTER_TOP - 16);

  // The foot: what he curates, where, and the address his work lives at.
  ctx.fillStyle = INK;
  ctx.fillRect(0, FOOTER_TOP, W, H - FOOTER_TOP);
  ctx.fillStyle = SUN;
  ctx.font = `700 20px ${MONO}`;
  ctx.fillText(t(CARD_LINES[2]), near, FOOTER_TOP + 50);
  ctx.fillStyle = PAPER;
  ctx.font = `400 18px ${MONO}`;
  ctx.fillText(t(CARD_LINES[3]), near, FOOTER_TOP + 84);
  ctx.fillStyle = PAPER;
  ctx.font = `700 18px ${MONO}`;
  ctx.fillText(`${origin}/ClimateCartoons/Francis`, near, FOOTER_TOP + 124);
  ctx.textAlign = rtl ? 'left' : 'right';
  ctx.fillStyle = MARK;
  ctx.font = `700 22px ${MONO}`;
  ctx.fillText('x = x', far, FOOTER_TOP + 124);
  ctx.textAlign = 'left';

  // The room's own edge, in the room's own yellow.
  ctx.fillStyle = SUN;
  ctx.fillRect(rtl ? W - 10 : 0, 0, 10, H);

  return new Promise((resolve, reject) => canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('The card could not be saved. Please try again.'))), 'image/png'));
}

export const FRANCIS_CARD = {
  id: 'francis-umendu-odupute',
  title: 'Francis Umendu Odupute',
  image: CARTOON_COVER,
};