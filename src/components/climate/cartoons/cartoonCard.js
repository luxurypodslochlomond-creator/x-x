import { loadRecordCardFonts } from '@/components/climate/recordTypography';
import { recordOrigin } from '@/components/climate/recordAddress';
import { CARTOON_COVER, CARTOON_EVENT } from '@/components/climate/cartoons/cartoonEvent';
import { cardWords, cardTongueIsRightToLeft } from '@/components/climate/cardTongue';

// The band under the cover is the only part of this card the record writes, so it is the
// part that can be read in the tongue the reader chose. The cover itself is a printed
// picture: its lettering is ink in the file, and no card can re-letter it.
// "in the room and online" was wrong for this hour. The festival is hybrid; her session is
// listed on the printed programme as a virtual workshop. A card that sends somebody to the
// National Museum for an hour that is on a screen is the worst kind of error a share card can
// make, because it is only discovered by the person standing in the wrong place. So the card
// now says what the programme says, and says that it is the programme saying it.
const CARD_LINES = [
  'Janine Selendy’s workshop · Sunday 29 November',
  '3pm West Africa · 2pm UK · the festival lists this hour as online',
];

// ── WHOSE BOOK IT IS ───────────────────────────────────────────────────────────
// The card credited the hand that drew the cover and never named the two people who made
// the book. A person handed this poster should know whose biennial it is before they are
// told where to find it — and for Francis, whose campaign this has been since 2012, a card
// carrying his drawing without his name is the credit arriving one line too late.
const EDITED_LINE = `Edited by ${CARTOON_EVENT.editors}`;

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
  const [image, { DISPLAY, colors }, words] = await Promise.all([
    artwork(card.image || CARTOON_COVER), loadRecordCardFonts(),
    cardWords([CARTOON_EVENT.when, CARTOON_EVENT.where, CARTOON_EVENT.eventLine, CARTOON_EVENT.coverArt, EDITED_LINE, ...CARD_LINES]),
  ]);
  const t = (line) => words[line] || line;
  const W = 1080, H = 1920, pad = 48;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  // A tongue written right to left is shaped by the canvas itself.
  if (cardTongueIsRightToLeft()) ctx.direction = 'rtl';
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
  const when = t(CARTOON_EVENT.when).toUpperCase();
  let whenSize = 48;
  ctx.font = `700 ${whenSize}px ${DISPLAY}`;
  while (ctx.measureText(when).width > W - pad * 2 && whenSize > 30) {
    whenSize -= 2;
    ctx.font = `700 ${whenSize}px ${DISPLAY}`;
  }
  ctx.fillText(when, pad, top + 70);
  ctx.font = `400 26px ${DISPLAY}`;
  lines(ctx, t(CARTOON_EVENT.where), W - pad * 2).forEach((line, i) => ctx.fillText(line, pad, top + 116 + i * 34));
  const workshop = t(CARD_LINES[0]);
  let workshopSize = 27;
  ctx.font = `700 ${workshopSize}px ${DISPLAY}`;
  while (ctx.measureText(workshop).width > W - pad * 2 && workshopSize > 18) {
    workshopSize -= 1;
    ctx.font = `700 ${workshopSize}px ${DISPLAY}`;
  }
  ctx.fillText(workshop, pad, top + 172);
  ctx.font = `400 26px ${DISPLAY}`;
  lines(ctx, t(CARD_LINES[1]), W - pad * 2).slice(0, 1).forEach((line) => ctx.fillText(line, pad, top + 212));
  // What the book is, in the anthology's own words. This card is sent for the event, so
  // the line under the date describes the biennial's anthology — not the website it was
  // made on. A room's bio on an event poster tells the person holding it nothing.
  ctx.fillStyle = colors.MUTED;
  ctx.font = `400 22px ${DISPLAY}`;
  lines(ctx, t(CARTOON_EVENT.eventLine), W - pad * 2).slice(0, 2)
    .forEach((line, i) => ctx.fillText(line, pad, top + 250 + i * 28));
  // Whose book it is, in the record's own ink rather than the grey of a caption.
  ctx.fillStyle = colors.INK;
  ctx.font = `700 20px ${DISPLAY}`;
  ctx.fillText(t(EDITED_LINE), pad, top + 306);
  // The address on the left, and the hand that drew the cover on the right. The credit is
  // a fact about the picture, so it sits in its own corner where it cannot be read as part
  // of the book's description — and a shared cover never travels without its artist.
  const origin = String(options.origin || recordOrigin()).replace(/^https?:\/\//, '').replace(/\/$/, '');
  ctx.fillStyle = colors.INK;
  ctx.font = `700 28px ${DISPLAY}`;
  ctx.fillText(`${origin}/ClimateCartoons`, pad, top + 344);
  ctx.textAlign = 'right';
  ctx.fillStyle = colors.MUTED;
  ctx.font = `400 19px ${DISPLAY}`;
  ctx.fillText(t(CARTOON_EVENT.coverArt), W - pad, top + 344);
  ctx.textAlign = 'left';
  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('The card could not be saved. Please try again.')), 'image/png'));
}

export const CARTOON_CARD = {
  id: 'caib-2026-event',
  title: CARTOON_EVENT.biennial,
  image: CARTOON_COVER,
  // The hand that drew the cover travels in the words as well as on the card: a chat that
  // drops the message still has the picture, but a person who copies the words should not
  // get a poster's title with the artist missing from it.
  credit: CARTOON_EVENT.coverArt,
};