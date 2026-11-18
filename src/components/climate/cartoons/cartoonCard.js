import { loadRecordCardFonts } from '@/components/climate/recordTypography';
import { recordOrigin } from '@/components/climate/recordAddress';
import { CARTOON_COVER, CARTOON_EVENT } from '@/components/climate/cartoons/cartoonEvent';

// ── THE BIG PICTURE · THE PASS-IT-ON CARD ──────────────────────────────────────
// One tap turns this room into a picture somebody can send to another person: the real
// cover, the event's own facts, one tight description of what the room is, and where it
// lives — so it never travels as a screenshot with the link cut off.
//
// The picture is the actual CAIB cover rather than a mark or a stand-in: this is a real
// festival with real cartoonists, and the thing a school, a newsroom or another cartoonist
// recognises is that cover. It is drawn whole, in a mounted frame, never cropped.
//
// Two things are on the card on purpose and can never be dropped from it: whose cover it is,
// and the fact that a person — not a machine — decides what goes on the wall.
//
// Drawn in the reader's own browser, on their device, so nothing of theirs leaves it, and
// the address on the foot is the record's own home rather than whichever host it was made on.
const W = 1080;
const H = 1350;
const PAD = 60;
const MAXW = W - PAD * 2;
const BAND = 78;
const FOOTER_TOP = H - 150;

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

export async function buildCartoonShareCard(card = {}, options = {}) {
  const origin = String(options.origin || recordOrigin()).replace(/^https?:\/\//, '');
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const { DISPLAY, MONO, colors: { PAPER, SUN, INK, MARK, MUTED, SIGNAL: LEAF } } = await loadRecordCardFonts();

  const img = await loadImage(card.image || CARTOON_COVER);

  // Paper, with the room's cold scanline grain.
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(20,18,16,0.035)';
  for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1);

  // The band across the top: whose festival this is, said first.
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, BAND);
  ctx.fillStyle = SUN;
  ctx.font = `700 16px ${MONO}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('8TH CARTOONAFRICA INTERNATIONAL BIENNIAL · CAIB 2026', W / 2, BAND / 2);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  // ── THE COVER, MOUNTED RATHER THAN CROPPED ────────────────────────────────
  // A portrait poster shown whole, with a hard offset shadow, the way a print is laid on a
  // page. The cover is somebody else's work: it is not cropped to a convenient shape, and
  // nothing is drawn over it.
  const coverH = 690;
  let coverW = 0;
  if (img) {
    const scale = Math.min(coverH / img.height, 440 / img.width);
    coverW = img.width * scale;
    const h = img.height * scale;
    const x = PAD;
    const y = BAND + 22;
    ctx.fillStyle = 'rgba(20,18,16,0.26)';
    ctx.fillRect(x + 11, y + 13, coverW, h);
    ctx.drawImage(img, x, y, coverW, h);
    ctx.strokeStyle = INK;
    ctx.lineWidth = 5;
    ctx.strokeRect(x, y, coverW, h);
  }

  // The words, in the column beside it.
  const colX = PAD + coverW + 42;
  const colW = W - colX - PAD;
  let y = BAND + 60;

  ctx.fillStyle = LEAF;
  ctx.font = `700 16px ${MONO}`;
  ctx.fillText(card.eyebrow || 'THE CARTOON ROOM', colX, y);
  y += 46;

  ctx.fillStyle = INK;
  const titleSize = 56;
  ctx.font = `700 ${titleSize}px ${DISPLAY}`;
  const titleLines = wrap(ctx, (card.title || 'The Big Picture').toUpperCase(), colW, 3);
  titleLines.forEach((line, i) => ctx.fillText(line, colX, y + i * (titleSize + 4)));
  y += titleLines.length * (titleSize + 4) + 26;

  ctx.fillStyle = MARK;
  ctx.font = `700 17px ${MONO}`;
  wrap(ctx, 'CARTOONS FOR A CHANGING WORLD', colW, 2).forEach((line, i) => ctx.fillText(line, colX, y + i * 24));
  y += 62;

  // What the room is, in the room's own words.
  ctx.fillStyle = 'rgba(20,18,16,0.9)';
  ctx.font = `400 22px ${MONO}`;
  wrap(ctx, card.body, colW, 8).forEach((line, i) => ctx.fillText(line, colX, y + i * 31));

  // Whose cover it is, and who decides what goes up. Never dropped from the card.
  ctx.fillStyle = MUTED;
  ctx.font = `400 18px ${MONO}`;
  wrap(ctx, card.honest, colW, 5).forEach((line, i) => ctx.fillText(line, colX, 660 + i * 26));

  // ── THE EVENT, IN A BAND OF ITS OWN ───────────────────────────────────────
  // Dates, place and the one ask. This is the part a host reads out, so it is the largest
  // type on the card after the title.
  const bandTop = 852;
  ctx.fillStyle = SUN;
  ctx.fillRect(0, bandTop, W, 296);
  ctx.fillStyle = INK;
  ctx.fillRect(0, bandTop, W, 5);
  ctx.fillRect(0, bandTop + 291, W, 5);

  ctx.fillStyle = INK;
  ctx.font = `700 50px ${DISPLAY}`;
  ctx.fillText(CARTOON_EVENT.when.toUpperCase(), PAD, bandTop + 78);
  ctx.font = `400 23px ${MONO}`;
  ctx.fillText(CARTOON_EVENT.where, PAD, bandTop + 122);
  ctx.fillText(CARTOON_EVENT.workshop, PAD, bandTop + 164);
  ctx.font = `700 21px ${MONO}`;
  wrap(ctx, 'Send a drawing and it goes on the wall, with your name on it.', MAXW, 2)
    .forEach((line, i) => ctx.fillText(line, PAD, bandTop + 214 + i * 30));

  // Footer: where it lives, and the mark.
  ctx.fillStyle = INK;
  ctx.fillRect(0, FOOTER_TOP, W, 150);
  ctx.fillStyle = SUN;
  ctx.font = `700 24px ${MONO}`;
  ctx.fillText('RECORD OF THE TIME', PAD, FOOTER_TOP + 52);
  ctx.textAlign = 'right';
  ctx.fillStyle = MARK;
  ctx.font = `700 22px ${MONO}`;
  ctx.fillText('x = x', W - PAD, FOOTER_TOP + 52);
  ctx.textAlign = 'left';
  ctx.fillStyle = PAPER;
  ctx.font = `700 18px ${MONO}`;
  ctx.fillText(`${origin}/ClimateCartoons`, PAD, FOOTER_TOP + 100);

  ctx.fillStyle = SUN;
  ctx.fillRect(0, 0, 10, H);

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
}

// The card's own copy, kept in one place so the page and the picture cannot drift apart.
export const CARTOON_CARD = {
  id: 'the-big-picture',
  title: 'The Big Picture',
  eyebrow: 'THE CARTOON ROOM',
  image: CARTOON_COVER,
  body: 'Drawings gathered for the 8th CartoonAFRICA International Biennial at the National Museum in Benin City, with Janine Selendy’s workshop on Sunday 29 November. The drawings become a free anthology, and the wall is open to yours.',
  honest: `The cover is ${CARTOON_EVENT.credit}. Every drawing keeps its maker’s name, and a person — never a machine — looks before anything goes up.`,
};