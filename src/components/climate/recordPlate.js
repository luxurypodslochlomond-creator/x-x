// ── THE RECORD'S OWN PLATE ──
// Brian, 27 November: "if internet goes down or a cellar — what use is a QR?"
//
// He was right about the code: a QR is a pointer, and a pointer with no signal opens
// nothing. The picture is the thing that survives — saved into somebody's photos,
// AirDropped across a room, printed and pinned up. But the picture used to be just the
// painting: no words, no address, so once it left the record it said nothing and pointed
// nowhere.
//
// So the plate now carries the record's own promise, what the record is, and the address
// it lives at — printed onto the foot of the picture itself. No link to tap, no code to
// scan, no signal needed to understand what was handed to you.
//
// The painting is never cropped and never written over: it stays whole at the top, and
// the words sit below it on the record's paper.

import { loadRecordCardFonts, recordCardPalette } from '@/components/climate/recordTypography';
import { recordOrigin } from '@/components/climate/recordAddress';

const W = 1080;
const PAD = 64;

const PROMISE = 'Together we can change the course of climate change';
const WHAT_IT_IS = 'A public record of the climate. Solutions, Crises and Actions: each one dated, sourced and signed. Nothing sold, nothing ranked.';
const MARK = 'x = x';

// The address as a person would type it, taken from the one place the record keeps it.
function printedAddress() {
  return recordOrigin().replace(/^https?:\/\//, '').replace(/\/+$/, '');
}

function wrapLines(ctx, text, maxWidth, maxLines) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width <= maxWidth || !line) {
      line = test;
      continue;
    }
    lines.push(line);
    if (lines.length === maxLines) { line = ''; break; }
    line = word;
  }
  if (line && lines.length < maxLines) lines.push(line);
  return lines;
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

// ── A CARD THAT WILL NOT DRAW IS WORSE THAN A CARD WITH NO PAINTING ────────────
// The painting is fetched from the media host. When that fetch is refused — a strict
// network, a blocked CDN, a phone on a bad line — this builder used to throw, the share
// window never opened, and the reader was told the image could not be prepared. The
// promise, the address and the mark are the part that has to survive a bad connection,
// so the painting is now optional and the plate is still printed without it.
// ── THE SAME PLATE, FOR A PAGE THAT IS NOT THE FRONT ONE ──────────────────────
// Brian, 28 November: "can the page be sent as a coolasfuck share card to her once you're
// finished?" A page that can only be sent as a bare address is a page that arrives as a
// blue line in a chat. So the plate takes the words it should carry, and every other page
// that wants a card of its own uses the same paper, the same rule and the same mark —
// rather than a second card being drawn somewhere else and drifting away from this one.
export default async function buildRecordPlate(imageUrl, overrides = {}) {
  const promise = overrides.promise || PROMISE;
  const whatItIs = overrides.whatItIs || WHAT_IT_IS;
  const address = overrides.address || printedAddress();

  const img = await loadImage(imageUrl);
  const hasPicture = !!(img && img.width);

  const { DISPLAY, MONO, colors } = await loadRecordCardFonts();

  const promiseSize = 46;
  const promiseLine = 56;
  const whatSize = 25;
  const whatLine = 37;
  const footSize = 27;

  const measure = document.createElement('canvas').getContext('2d');

  measure.font = `700 ${promiseSize}px ${DISPLAY}`;
  const promiseLines = wrapLines(measure, promise, W - PAD * 2, 3);

  measure.font = `400 ${whatSize}px ${DISPLAY}`;
  const whatLines = wrapLines(measure, whatItIs, W - PAD * 2, 5);

  const pictureH = hasPicture ? Math.round(img.height * (W / img.width)) : 0;
  const bandH = PAD + promiseLines.length * promiseLine + 18
    + whatLines.length * whatLine + 34 + footSize + PAD;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = pictureH + bandH;
  const ctx = canvas.getContext('2d');

  // The painting, whole, at the top — never cropped to fit the words.
  if (hasPicture) {
    ctx.drawImage(img, 0, 0, W, pictureH);
  } else {
    // No painting: the record's own signal rule stands at the head instead.
    ctx.fillStyle = colors.MARK || colors.RED || colors.INK;
    ctx.fillRect(0, 0, W, 14);
  }

  // The record's paper beneath it, and a hairline where the two meet.
  ctx.fillStyle = colors.PAPER;
  ctx.fillRect(0, pictureH, W, bandH);
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = colors.INK;
  ctx.fillRect(0, pictureH, W, 2);
  ctx.restore();

  ctx.textBaseline = 'top';
  let y = pictureH + PAD;

  ctx.fillStyle = colors.INK;
  ctx.font = `700 ${promiseSize}px ${DISPLAY}`;
  promiseLines.forEach((line, i) => ctx.fillText(line, PAD, y + i * promiseLine));
  y += promiseLines.length * promiseLine + 18;

  ctx.fillStyle = colors.MUTED;
  ctx.font = `400 ${whatSize}px ${DISPLAY}`;
  whatLines.forEach((line, i) => ctx.fillText(line, PAD, y + i * whatLine));
  y += whatLines.length * whatLine + 34;

  // The address on the left, so it can be read and typed with no signal at all.
  ctx.fillStyle = colors.INK;
  ctx.font = `400 ${footSize}px ${MONO}`;
  ctx.fillText(address, PAD, y);

  // The mark on the right, in the record's red — the one line the whole thing rests on.
  ctx.fillStyle = colors.RED || colors.INK;
  ctx.font = `700 ${footSize}px ${MONO}`;
  const markWidth = ctx.measureText(MARK).width;
  ctx.fillText(MARK, W - PAD - markWidth, y);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('The plate could not be drawn.'));
    }, 'image/png');
  });
}