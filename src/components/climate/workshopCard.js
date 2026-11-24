// ── THE 29TH · THE PASS-IT-ON CARD ──
// This card used to be a comic page with the last panel left empty: "THE LAST PANEL IS
// YOURS", "DRAW IT", "nineteen minutes of drawing". It was drawn on 16 November, when
// nobody had seen Janine's agenda. Her agenda, sent on the 24th, has no drawing exercise
// in it at all — so the card people were passing round advertised an hour that was not
// going to happen, to a room that would turn up expecting paper and pens.
//
// A card is the worst place to be wrong, because it travels without the page it came from.
// So the card now carries only what her agenda says and what the record actually promises:
// cartoonists speaking about their own drawings, and every drawing kept with its maker's
// name on it. Nothing on it asks anybody to do anything.
//
// It is drawn here, on purpose, and it carries no borrowed picture. Using one of CEEW's
// drawings to advertise an hour that is not ours would spend another organisation's work on
// our ask, and their goodwill does not extend to being our artwork. Their room is linked,
// not lifted — that is the credit a record should give.
//
// Drawn in the sender's own browser, on their device, so nothing of theirs leaves it.
import { RECORD_HOME } from './recordAddress';

const W = 1080;
const H = 1350;
const PAD = 60;
const MAXW = W - PAD * 2;
const FOOTER_TOP = 1200;

import { loadRecordCardFonts } from '@/components/climate/recordTypography';

// The record's own home, never the platform's app address: an address printed on a card is
// a citation, and a citation that resolves to a temporary host is a broken promise.
const ORIGIN = RECORD_HOME;

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

function corners(ctx, x, y, w, h, size, colour, width) {
  ctx.strokeStyle = colour;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  const legs = [
    [[x, y + size], [x, y], [x + size, y]],
    [[x + w - size, y], [x + w, y], [x + w, y + size]],
    [[x + w, y + h - size], [x + w, y + h], [x + w - size, y + h]],
    [[x + size, y + h], [x, y + h], [x, y + h - size]],
  ];
  legs.forEach((leg) => {
    ctx.beginPath();
    leg.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)));
    ctx.stroke();
  });
}

export async function buildWorkshopShareCard(card = {}, options = {}) {
  const origin = String(options.origin || ORIGIN).replace(/^https?:\/\//, '');
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const { DISPLAY, MONO, colors: { PAPER, SUN, INK, RED, MARK, MUTED } } = await loadRecordCardFonts();

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);

  // Whose festival, said before anything of ours.
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, 78);
  ctx.fillStyle = SUN;
  ctx.font = `700 17px ${MONO}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('8TH CARTOONAFRICA BIENNIAL · BENIN CITY · 28–30 NOV 2026', W / 2, 40);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  ctx.fillStyle = RED;
  ctx.font = `700 19px ${MONO}`;
  ctx.fillText('THE RECORD OF THE TIME · SUNDAY 29 NOVEMBER', PAD, 138);

  // The poster line, three beats, no sentence. Sized down from 88px because these lines are
  // longer than the ones they replaced, and a line that runs off a card is a line nobody reads.
  ctx.fillStyle = INK;
  ctx.font = `700 74px ${DISPLAY}`;
  ['DRAWN IN AFRICA.', 'NAMED ON THE', 'RECORD.'].forEach((line, i) => ctx.fillText(line, PAD, 238 + i * 84));

  // The plate: the three things every drawing on the record carries. It is the record's own
  // rule stated plainly, not an instruction to the room — nothing here asks anybody to do
  // anything, because the host did not ask it to.
  const fx = PAD;
  const fy = 500;
  const fw = MAXW;
  const fh = 320;
  ctx.fillStyle = '#fffdf7';
  ctx.fillRect(fx, fy, fw, fh);
  corners(ctx, fx, fy, fw, fh, 34, INK, 6);

  ctx.fillStyle = RED;
  ctx.font = `700 19px ${MONO}`;
  ctx.textAlign = 'center';
  ctx.fillText('EVERY DRAWING ON THE RECORD CARRIES', W / 2, fy + 68);
  ctx.textAlign = 'left';

  ctx.fillStyle = INK;
  ctx.font = `700 26px ${MONO}`;
  ctx.fillText('The name of the hand that made it', PAD + 44, fy + 142);
  ctx.fillText('Where it came from', PAD + 44, fy + 198);
  ctx.fillText('One line on what it is for', PAD + 44, fy + 254);

  ctx.fillStyle = INK;
  ctx.font = `700 21px ${MONO}`;
  // No hour printed: the festival's flyer and Janine's own note do not agree on one, and
  // a card is the worst place to invent a time. The day is certain, so the day goes on.
  ctx.fillText('JANINE SELENDY · SUNDAY 29 NOVEMBER · ONLINE', PAD, 878);

  ctx.fillStyle = INK;
  ctx.font = `400 25px ${MONO}`;
  wrap(ctx, card.body, MAXW, 3).forEach((line, i) => ctx.fillText(line, PAD, 926 + i * 36));

  ctx.fillStyle = MUTED;
  ctx.font = `400 20px ${MONO}`;
  wrap(ctx, card.honest, MAXW, 3).forEach((line, i) => ctx.fillText(line, PAD, 1046 + i * 30));

  ctx.fillStyle = INK;
  ctx.fillRect(0, FOOTER_TOP, W, H - FOOTER_TOP);
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
  ctx.fillText(`${origin}/ClimateWorkshop`, PAD, FOOTER_TOP + 100);

  ctx.fillStyle = SUN;
  ctx.fillRect(0, 0, 10, H);

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
}

// The card's own copy, kept in one place so the page and the picture cannot drift apart.
export const WORKSHOP_CARD = {
  id: 'drawn-in-africa-named-on-the-record',
  title: 'Drawn in Africa, named on the record · 29 November',
  body: 'One hour with Janine Selendy: cartoonists from across Africa on the drawings they made — what inspired them and where they hang — and a public record that keeps each one with its maker’s name on it.',
  honest: 'Nothing sold, ranked, sponsored or signed up to. No address published, and no picture of anybody. Nothing is asked of the room.',
};