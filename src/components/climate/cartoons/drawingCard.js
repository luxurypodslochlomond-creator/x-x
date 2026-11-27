import { loadRecordCardFonts } from '@/components/climate/recordTypography';
import { recordOrigin } from '@/components/climate/recordAddress';
import { cardWords, cardTongueIsRightToLeft } from '@/components/climate/cardTongue';
import { readingsFor } from '@/components/climate/cartoons/cartoonGoals';
import { cartoonSlug } from '@/components/climate/cartoons/cartoonSlug';

// ── ONE DRAWING, AS A CARD ────────────────────────────────────────────────────
// A drawing travels out of this room as a screenshot with its artist cut off, and that is
// the one thing this room cannot allow: the hand that made it is the whole point. So the
// card carries the picture whole — never cropped, never tinted, never re-lettered — with
// the artist's name, where it came from, and the drawer's own line quoted exactly as they
// wrote it. The record's own furniture (the epigraph, the line under the picture, the foot)
// is read in the tongue the reader has already picked; the artist's words are not touched,
// because a person's sentence is not the record's to translate.
//
// Drawn in the browser, on the reader's own device: making a card sends nothing anywhere.
const W = 1080;
const H = 1350;
const PAD = 60;
const MAXW = W - PAD * 2;
const FOOTER_TOP = H - 144;
// ── THE DRAWING GETS THE CARD, NOT THE FURNITURE ────────────────────────────────
// Brian, 25 November: "the share card... the share icon isn't right" and then the real
// question — whether the card was actually any good. It was not. The artwork had 620 of
// 1350 pixels, so a cartoonist sharing their own drawing sent out a card where their work
// was under half the height and the record's own epigraph, label, name, origin, quotation
// and footer took the rest. On a record whose whole argument is that the drawing matters
// more than the machinery around it, that is the wrong way round.
//
// So the art area is 800 now — nearly three-fifths of the card — and everything under it
// is tightened rather than removed. Nothing has been cut: the epigraph, the borrowed red
// label, the artist's name, the origin, the drawer's own words and the footer are all still
// there, because each of them is a promise this room makes. The picture simply leads, which
// is what a card carrying somebody else's drawing should do.
const ART_TOP = 96;
const ART_ROOM = 800;

const CARD_LINES = [
  'THIS IS THE TIME. AND THIS IS THE RECORD OF THE TIME.',
  'DRAWN BY HAND · GIVEN TO THE RECORD',
  'RECORD OF THE TIME',
];

// A script that writes right to left is shaped and ordered by the canvas itself.
const RTL_SCRIPT = /[\u0590-\u05FF\u0600-\u06FF\u0700-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF]/;

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

function wrapLines(ctx, text, maxWidth, maxLines) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  let used = 0;

  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width <= maxWidth || !line) { line = test; used += 1; continue; }
    lines.push(line);
    if (lines.length === maxLines) { line = ''; break; }
    line = word;
    used += 1;
  }
  if (line && lines.length < maxLines) lines.push(line);

  if (used < words.length && lines.length) {
    let last = lines[lines.length - 1];
    while (ctx.measureText(`${last} …`).width > maxWidth && last.length > 6) {
      last = last.slice(0, -2).replace(/[\s,.;:·-]+$/, '');
    }
    lines[lines.length - 1] = `${last} …`;
  }
  return lines;
}

function fit(ctx, text, maxWidth) {
  let out = String(text || '');
  if (ctx.measureText(out).width <= maxWidth) return out;
  while (out.length > 6 && ctx.measureText(`${out}…`).width > maxWidth) out = out.slice(0, -1);
  return `${out}…`;
}

// The line that travels beside the picture in a chat: who made it, where it came from,
// and their own sentence — so the drawing is never introduced by nobody.
export function drawingShareLine(cartoon = {}) {
  const who = [cartoon.artist_name, cartoon.origin].filter(Boolean).join(', ');
  const own = String(cartoon.for_line || '').trim();
  return own ? `${who} — “${own}”` : who;
}

export async function buildDrawingShareCard(cartoon = {}, options = {}) {
  const origin = String(options.origin || recordOrigin() || '').replace(/^https?:\/\//, '');
  const words = await cardWords(CARD_LINES);
  const t = (line) => words[line] || line;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const { DISPLAY, MONO, colors: { PAPER, BONE, INK, SIGNAL, MARK, SIGNAL_BRIGHT, MUTED } } = await loadRecordCardFonts();
  const img = await loadImage(cartoon.display_image_url || cartoon.image_url);

  const rtl = cardTongueIsRightToLeft();
  const edge = rtl ? W - PAD : PAD;

  // Paper, cold scanline grain.
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(20,18,16,0.035)';
  for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1);

  // Epigraph band, the same one every page of the record carries.
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, 74);
  ctx.fillStyle = BONE;
  ctx.globalAlpha = 0.7;
  ctx.font = `700 15px ${MONO}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(t(CARD_LINES[0]), W / 2, 38);
  ctx.globalAlpha = 1;
  ctx.fillStyle = SIGNAL_BRIGHT;
  ctx.beginPath(); ctx.arc(W / 2 - 330, 38, 4, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(W / 2 + 330, 38, 4, 0, Math.PI * 2); ctx.fill();

  ctx.direction = rtl ? 'rtl' : 'ltr';
  ctx.textAlign = rtl ? 'right' : 'left';
  ctx.textBaseline = 'alphabetic';

  // The drawing, whole. Somebody else's artwork is not the record's to crop.
  let artBottom = ART_TOP;
  if (img) {
    const scale = Math.min(MAXW / img.width, ART_ROOM / img.height);
    const dw = Math.max(1, Math.round(img.width * scale));
    const dh = Math.max(1, Math.round(img.height * scale));
    ctx.drawImage(img, Math.round((W - dw) / 2), ART_TOP + Math.round((ART_ROOM - dh) / 2), dw, dh);
    artBottom = ART_TOP + ART_ROOM;
  }
  ctx.fillStyle = INK;
  ctx.fillRect(0, artBottom + 24, W, 3);

  // What this is, said once, in the borrowed red.
  let y = artBottom + 66;
  ctx.fillStyle = MARK;
  ctx.font = `700 19px ${MONO}`;
  ctx.fillText(fit(ctx, t(CARD_LINES[1]), MAXW), edge, y);

  // The hand that made it — never separated from the drawing.
  y += 56;
  ctx.fillStyle = INK;
  const name = String(cartoon.artist_name || '');
  let nameSize = 46;
  ctx.font = `700 ${nameSize}px ${DISPLAY}`;
  while (nameSize > 28 && ctx.measureText(name).width > MAXW) {
    nameSize -= 2;
    ctx.font = `700 ${nameSize}px ${DISPLAY}`;
  }
  ctx.fillText(name, edge, y);

  if (cartoon.origin) {
    y += 30;
    ctx.fillStyle = MUTED;
    ctx.font = `400 22px ${MONO}`;
    ctx.fillText(fit(ctx, cartoon.origin, MAXW), edge, y);
  }

  // ── WHO HOLDS IT, ON THE CARD TOO ────────────────────────────────────────────
  // The card carried the artist and the origin but not the credit, so a drawing shared out
  // of this room arrived with the copyright line stripped off it — the one line a holder
  // asked to be kept beside the work. It travels now, wrapped to two lines.
  if (cartoon.credit) {
    y += 26;
    ctx.fillStyle = MUTED;
    ctx.font = `400 17px ${MONO}`;
    const creditLines = wrapLines(ctx, cartoon.credit, MAXW, 2);
    creditLines.forEach((line, i) => ctx.fillText(line, edge, y + i * 22));
    y += (creditLines.length - 1) * 22;
  }

  // ── AND WHAT THE ROOM READ IT ONTO ───────────────────────────────────────────
  // A picture sent into a chat used to arrive with no argument attached. The goal it was
  // read against travels with it, in the record's red. The reason for that reading is
  // printed in full beside the drawing in the room — which is where the address on this
  // card leads — so the card names the claim and the room carries the proof. Never a badge
  // with nothing behind it.
  const readings = readingsFor(cartoon.title);
  const reading = readings.length === 1
    ? `READ ONTO GOAL ${readings[0].n} · ${readings[0].name}`
    : readings.length
    ? `READ ONTO GOALS ${readings.map((r) => r.n).join(' AND ')}`
    : '';
  if (reading) {
    y += 34;
    ctx.fillStyle = MARK;
    ctx.font = `700 17px ${MONO}`;
    ctx.fillText(fit(ctx, reading, MAXW), edge, y);
  }

  // The drawer's own words, quoted exactly, in whatever tongue they wrote them.
  const own = String(cartoon.for_line || '').trim();
  if (own) {
    const ownRtl = RTL_SCRIPT.test(own);
    const ownEdge = ownRtl ? W - PAD : PAD;
    ctx.save();
    ctx.direction = ownRtl ? 'rtl' : 'ltr';
    ctx.textAlign = ownRtl ? 'right' : 'left';
    ctx.font = `400 27px ${MONO}`;
    // Three lines, not four: the taller art area took the room the fourth line needed, and
    // the drawer's sentence is more use to a reader as three lines and an ellipsis than as
    // four lines printed over the footer.
    // Three lines at most, and fewer when the credit and the reading have taken the room:
    // counted from the space actually left, rather than assumed to still be there.
    const top = y + 46;
    const room = Math.max(1, Math.floor((FOOTER_TOP - 30 - top) / 38) + 1);
    const lines = wrapLines(ctx, own, MAXW - 34, Math.min(3, room));
    ctx.fillStyle = MARK;
    ctx.fillRect(ownRtl ? W - PAD + 12 : PAD - 28, top - 24, 5, lines.length * 38 + 6);
    ctx.fillStyle = 'rgba(20,18,16,0.9)';
    lines.forEach((line, i) => ctx.fillText(line, ownEdge, top + i * 38));
    ctx.restore();
  }

  // Footer — the mark, the covenant, and where the wall is.
  ctx.fillStyle = INK;
  ctx.fillRect(0, FOOTER_TOP, W, 150);
  ctx.textAlign = rtl ? 'right' : 'left';
  ctx.fillStyle = SIGNAL_BRIGHT;
  ctx.font = `700 24px ${MONO}`;
  ctx.fillText(t(CARD_LINES[2]), edge, FOOTER_TOP + 52);
  ctx.textAlign = rtl ? 'left' : 'right';
  ctx.fillStyle = MARK;
  ctx.font = `700 22px ${MONO}`;
  ctx.fillText('x = x', rtl ? PAD : W - PAD, FOOTER_TOP + 52);
  ctx.textAlign = rtl ? 'right' : 'left';
  ctx.fillStyle = BONE;
  ctx.font = `700 18px ${MONO}`;
  // ── THE ADDRESS ON THE PICTURE IS THE DRAWING'S OWN ──────────────────────────
  // It printed the room — /ClimateCartoons — while the link that travelled beside it
  // pointed at the drawing, so a card and the message it arrived in disagreed about where
  // the thing lives. It prints the drawing's own short door now, the same address the room
  // and the print sheet already give: /w/rain-check, which a person can read off the card
  // and type back.
  ctx.fillText(fit(ctx, `${origin}/w/${cartoonSlug(cartoon)}`, MAXW), edge, FOOTER_TOP + 100);

  // Signal edge, drawn last so it stays on top of the picture.
  ctx.fillStyle = SIGNAL;
  ctx.fillRect(0, 74, 8, H - 74);

  return new Promise((resolve, reject) => canvas.toBlob(
    (blob) => (blob ? resolve(blob) : reject(new Error('The card could not be saved. Please try again.'))),
    'image/png',
  ));
}