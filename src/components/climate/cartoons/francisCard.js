import { loadRecordCardFonts } from '@/components/climate/recordTypography';
import { recordOrigin } from '@/components/climate/recordAddress';
import { CARTOON_COVER, CARTOON_EVENT } from '@/components/climate/cartoons/cartoonEvent';

// ── ONE HAND, AS A CARD ────────────────────────────────────────────────────────
// Francis Umendu Odupute has been carrying the CartoonAFRICA campaign since he started the
// biennial in November 2012, he drew the cover of the 2026 catalogue, and he is one of the
// two editors of the book this room is gathering. Until now his name appeared on the record
// only as a credit under somebody else's frame — which is the wrong way round for a man who
// needs his work to reach the world.
//
// So this is his card: his name, his own sentence about what he does (quoted exactly, never
// tidied), the cover he drew, and the address where the rest of his work lands as it arrives.
// Nothing on it is bought, ranked or sponsored, and nothing of his family is on it: what he
// told a person about his wife and children was told to a person, not published to the world.
//
// Drawn in the browser, on the device of whoever shares it. Making the card sends nothing.
const W = 1080;
const H = 1350;
const PAD = 60;
const MAXW = W - PAD * 2;
const FOOTER_TOP = 1200;

const HIS_LINE = '“I am a visual artist and a journalist.”';

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
  const [cover, { DISPLAY, MONO, colors: { PAPER, SUN, INK, RED, MARK, MUTED } }] = await Promise.all([
    loadImage(card.image || CARTOON_COVER),
    loadRecordCardFonts(),
  ]);

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
  ctx.fillText('8TH CARTOONAFRICA BIENNIAL · BENIN CITY · 28–30 NOVEMBER 2026', W / 2, 40);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  ctx.fillStyle = RED;
  ctx.font = `700 19px ${MONO}`;
  ctx.fillText('ONE HAND · HIS OWN PAGE ON THE RECORD', PAD, 138);

  // His name, at the size a name belongs at.
  ctx.fillStyle = INK;
  ctx.font = `700 84px ${DISPLAY}`;
  ctx.fillText('FRANCIS UMENDU', PAD, 228);
  ctx.fillText('ODUPUTE', PAD, 316);

  // The signature he draws under, as it appears on the wall.
  ctx.fillStyle = RED;
  ctx.font = `700 26px ${MONO}`;
  ctx.fillText('FRANCODUS', PAD, 362);

  // His own sentence, in quotation marks because it is his, not ours.
  ctx.fillStyle = INK;
  ctx.font = `400 27px ${DISPLAY}`;
  wrap(ctx, HIS_LINE, MAXW, 2).forEach((line, i) => ctx.fillText(line, PAD, 414 + i * 38));

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
    ctx.fillText('Cover artwork by Francis Umendu Odupute', PAD, artTop + 40);
  }

  ctx.fillStyle = MUTED;
  ctx.font = `400 19px ${MONO}`;
  ctx.fillText(CARTOON_EVENT.coverArt, PAD, FOOTER_TOP - 16);

  // The foot: what he curates, where, and the address his work lives at.
  ctx.fillStyle = INK;
  ctx.fillRect(0, FOOTER_TOP, W, H - FOOTER_TOP);
  ctx.fillStyle = SUN;
  ctx.font = `700 20px ${MONO}`;
  ctx.fillText('CURATOR · 8TH CARTOONAFRICA INTERNATIONAL BIENNIAL', PAD, FOOTER_TOP + 50);
  ctx.fillStyle = PAPER;
  ctx.font = `400 18px ${MONO}`;
  ctx.fillText('National Museum, Benin City, Edo State, Nigeria · edited with Janine M. H. Selendy', PAD, FOOTER_TOP + 84);
  ctx.fillStyle = PAPER;
  ctx.font = `700 18px ${MONO}`;
  ctx.fillText(`${origin}/ClimateCartoons/Francis`, PAD, FOOTER_TOP + 124);
  ctx.textAlign = 'right';
  ctx.fillStyle = MARK;
  ctx.font = `700 22px ${MONO}`;
  ctx.fillText('x = x', W - PAD, FOOTER_TOP + 124);
  ctx.textAlign = 'left';

  // The room's own edge, in the room's own yellow.
  ctx.fillStyle = SUN;
  ctx.fillRect(0, 0, 10, H);

  return new Promise((resolve, reject) => canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('The card could not be saved. Please try again.'))), 'image/png'));
}

export const FRANCIS_CARD = {
  id: 'francis-umendu-odupute',
  title: 'Francis Umendu Odupute · his own page on the record',
  image: CARTOON_COVER,
};