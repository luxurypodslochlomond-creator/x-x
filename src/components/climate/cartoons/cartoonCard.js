import { loadRecordCardFonts } from '@/components/climate/recordTypography';
import { recordOrigin } from '@/components/climate/recordAddress';
import { CARTOON_COVER, CARTOON_EVENT } from '@/components/climate/cartoons/cartoonEvent';

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
    image.onerror = () => reject(new Error('The event cover could not be opened. Please try again.'));
    image.src = src;
  });
}

// The supplied cover is the main event. Keep it whole, with its lettering and credits.
// The extra band carries practical sharing details, not another competing poster.
export async function buildCartoonShareCard(card = {}, options = {}) {
  const [image, { DISPLAY, colors }] = await Promise.all([
    artwork(card.image || CARTOON_COVER), loadRecordCardFonts(),
  ]);
  const W = 1080, H = 1920, pad = 48;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = colors.PAPER;
  ctx.fillRect(0, 0, W, H);
  const scale = Math.min((W - 32) / image.width, 1510 / image.height);
  const width = image.width * scale, height = image.height * scale;
  ctx.drawImage(image, (W - width) / 2, 16, width, height);
  const top = 1550;
  ctx.fillStyle = colors.SUN;
  ctx.fillRect(0, top, W, H - top);
  ctx.fillStyle = colors.INK;
  ctx.fillRect(pad, top, W - pad * 2, 4);
  ctx.font = `700 48px ${DISPLAY}`;
  ctx.fillText(CARTOON_EVENT.when.toUpperCase(), pad, top + 70);
  ctx.font = `400 26px ${DISPLAY}`;
  lines(ctx, CARTOON_EVENT.where, W - pad * 2).forEach((line, i) => ctx.fillText(line, pad, top + 116 + i * 34));
  ctx.font = `700 27px ${DISPLAY}`;
  ctx.fillText('Janine Selendy’s workshop · Sunday 29 November', pad, top + 172);
  ctx.font = `400 26px ${DISPLAY}`;
  ctx.fillText('3pm West Africa · 2pm UK · in the room and online', pad, top + 212);
  // A card with a picture and a date but no line about what it is has no bio: the person
  // receiving it is looking at a poster for something they cannot name. So the room says
  // what it is, in one line, before the credit and the address.
  ctx.fillStyle = colors.MUTED;
  ctx.font = `400 22px ${DISPLAY}`;
  ctx.fillText(CARTOON_EVENT.roomLine, pad, top + 248);
  // And it carries the name of the hand that drew the cover: a shared picture that has
  // lost its artist is the one thing this room will not send.
  ctx.font = `400 19px ${DISPLAY}`;
  ctx.fillText(CARTOON_EVENT.coverArt, pad, top + 286);
  ctx.font = `700 28px ${DISPLAY}`;
  ctx.fillStyle = colors.INK;
  const origin = String(options.origin || recordOrigin()).replace(/^https?:\/\//, '').replace(/\/$/, '');
  ctx.fillText(`${origin}/ClimateCartoons`, pad, top + 330);
  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('The card could not be saved. Please try again.')), 'image/png'));
}

export const CARTOON_CARD = {
  id: 'caib-2026-event',
  title: CARTOON_EVENT.biennial,
  image: CARTOON_COVER,
};