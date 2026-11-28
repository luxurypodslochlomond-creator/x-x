import { loadRecordCardFonts } from '@/components/climate/recordTypography';
import { recordOrigin } from '@/components/climate/recordAddress';
import { HUMOUR, HUMOUR_FIGURES } from '@/components/climate/cartoons/humourFacts';

// ── THE CARD FOR THE CASE ────────────────────────────────────────────────────
// The room already has a card for the biennial: a poster carrying Francis's cover, made to
// be handed to somebody who might come. This is the other kind — the argument itself, made
// to be forwarded to somebody who is not going to read a page.
//
// So it carries the five figures, because a card that argues for evidence with no evidence
// on it is a slogan. Each one is printed with the body that gave it, small, underneath,
// because this record does not put a number in the air without the hand that handed it over.
function wrap(ctx, text, width) {
  const out = [];
  let line = '';
  for (const word of String(text).split(/\s+/)) {
    if (line && ctx.measureText(`${line} ${word}`).width > width) { out.push(line); line = word; }
    else line = line ? `${line} ${word}` : word;
  }
  if (line) out.push(line);
  return out;
}

export async function buildHumourShareCard(card = {}, options = {}) {
  const { DISPLAY, colors } = await loadRecordCardFonts();
  const W = 1080, H = 1350, pad = 64;
  const ink = colors.INK;
  const paper = colors.PAPER;
  const sun = colors.SUN;
  const muted = colors.MUTED;
  // The record's red where the palette has it, ink where it does not: a card must never
  // fail to draw because one token was named differently.
  const red = colors.SIGNAL || colors.RED || ink;

  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, W, H);

  // The record's rule, at the head, the way every painted room of this record opens.
  ctx.fillStyle = ink;
  ctx.fillRect(pad, 56, W - pad * 2, 5);
  ctx.font = `700 21px ${DISPLAY}`;
  ctx.fillText('THE WALL · A ROOM OF CLIMATE CARTOONS', pad, 106);

  // The name of the case.
  ctx.fillStyle = red;
  ctx.font = `700 82px ${DISPLAY}`;
  let y = 218;
  wrap(ctx, card.title || HUMOUR.headline, W - pad * 2).slice(0, 3).forEach((line) => {
    ctx.fillText(line, pad, y);
    y += 92;
  });

  // And the case, in one breath.
  ctx.fillStyle = muted;
  ctx.font = `400 30px ${DISPLAY}`;
  y += 6;
  wrap(ctx, 'A figure tells you how big it is. A drawing gets you through the door to do something about it.', W - pad * 2)
    .slice(0, 3).forEach((line) => { ctx.fillText(line, pad, y); y += 40; });

  // The five, on the record's yellow, each with the body that gave it.
  const top = 640;
  ctx.fillStyle = sun;
  ctx.fillRect(0, top, W, 560);
  ctx.fillStyle = ink;
  ctx.font = `700 20px ${DISPLAY}`;
  ctx.fillText('WHAT THIS RECORD HAS ALREADY COUNTED', pad, top + 48);
  let row = top + 106;
  HUMOUR_FIGURES.forEach((figure) => {
    ctx.fillStyle = red;
    ctx.font = `700 42px ${DISPLAY}`;
    ctx.fillText(figure.value, pad, row);
    const valueWidth = ctx.measureText(figure.value).width;
    ctx.fillStyle = muted;
    ctx.font = `400 21px ${DISPLAY}`;
    ctx.fillText(figure.unit, pad + valueWidth + 14, row);
    ctx.fillStyle = ink;
    ctx.font = `400 20px ${DISPLAY}`;
    ctx.fillText(wrap(ctx, figure.source, W - pad * 2)[0] || '', pad, row + 26);
    row += 88;
  });

  // The address, and the rule of the room, in the record's own ink.
  const origin = String(options.origin || recordOrigin()).replace(/^https?:\/\//, '').replace(/\/$/, '');
  ctx.fillStyle = ink;
  ctx.font = `700 26px ${DISPLAY}`;
  ctx.fillText(`${origin}/ClimateCartoons`, pad, 1262);
  ctx.fillStyle = muted;
  ctx.font = `400 20px ${DISPLAY}`;
  ctx.textAlign = 'right';
  ctx.fillText('Every drawing keeps the hand and the name that made it.', W - pad, 1262);
  ctx.textAlign = 'left';

  return new Promise((resolve, reject) => canvas.toBlob(
    (blob) => (blob ? resolve(blob) : reject(new Error('The card could not be saved. Please try again.'))),
    'image/png',
  ));
}