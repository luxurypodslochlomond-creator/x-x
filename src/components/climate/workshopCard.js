// ── THE 29TH · THE PASS-IT-ON CARD ──
// The card is the strip: a comic page with the last panel left empty, so the one thing a
// person sees before reading anything is that there is a frame with their name on it.
//
// It is drawn here, on purpose, and it carries no borrowed picture. Using one of CEEW's
// drawings to advertise an hour that is ours would spend another organisation's work on our
// ask, and their goodwill does not extend to being our artwork. Their room is linked, not
// lifted — that is the credit a record should give.
//
// Drawn in the sender's own browser, on their device, so nothing of theirs leaves it.
const W = 1080;
const H = 1350;
const PAD = 60;
const MAXW = W - PAD * 2;
const FOOTER_TOP = 1200;

const PAPER = '#f4efe4';
const SUN = '#ffd447';
const INK = '#1a1612';
const RED = '#b3261e';
const MARK = '#cc2d2a';
const MUTED = '#6b6258';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const DISPLAY = "'Oswald', Impact, 'Arial Narrow', system-ui, sans-serif";

const ORIGIN = 'https://green-stride-d47e043c.base44.app';

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

  try {
    await Promise.all([document.fonts.load('900 88px Oswald'), document.fonts.load('900 19px ui-monospace')]);
  } catch { /* the system faces still read fine */ }

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);

  // Whose festival, said before anything of ours.
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, 78);
  ctx.fillStyle = SUN;
  ctx.font = `900 17px ${MONO}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('8TH CARTOONAFRICA BIENNIAL · BENIN CITY · 28–30 NOV 2026', W / 2, 40);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  ctx.fillStyle = RED;
  ctx.font = `900 19px ${MONO}`;
  ctx.fillText('THE RECORD OF THE TIME · SUNDAY 29 NOVEMBER', PAD, 138);

  // The poster line, three beats, no sentence.
  ctx.fillStyle = INK;
  ctx.font = `900 88px ${DISPLAY}`;
  ['THE LAST', 'PANEL IS', 'YOURS.'].forEach((line, i) => ctx.fillText(line, PAD, 240 + i * 92));

  // The empty frame — the whole card.
  const fx = PAD;
  const fy = 500;
  const fw = MAXW;
  const fh = 320;
  ctx.fillStyle = '#fffdf7';
  ctx.fillRect(fx, fy, fw, fh);
  corners(ctx, fx, fy, fw, fh, 34, INK, 6);
  ctx.fillStyle = RED;
  ctx.font = `900 40px ${MONO}`;
  ctx.textAlign = 'center';
  ctx.fillText('DRAW IT', W / 2, fy + 150);
  ctx.fillStyle = MUTED;
  ctx.font = `500 20px ${MONO}`;
  ctx.fillText('on paper · pen or pencil · nothing to install', W / 2, fy + 196);
  ctx.textAlign = 'left';

  ctx.fillStyle = INK;
  ctx.font = `700 21px ${MONO}`;
  ctx.fillText('JANINE SELENDY · 3PM WEST AFRICA · 2PM SCOTLAND', PAD, 878);

  ctx.fillStyle = INK;
  ctx.font = `500 25px ${MONO}`;
  wrap(ctx, card.body, MAXW, 3).forEach((line, i) => ctx.fillText(line, PAD, 926 + i * 36));

  ctx.fillStyle = MUTED;
  ctx.font = `500 20px ${MONO}`;
  wrap(ctx, card.honest, MAXW, 3).forEach((line, i) => ctx.fillText(line, PAD, 1046 + i * 30));

  ctx.fillStyle = INK;
  ctx.fillRect(0, FOOTER_TOP, W, H - FOOTER_TOP);
  ctx.fillStyle = SUN;
  ctx.font = `900 24px ${MONO}`;
  ctx.fillText('RECORD OF THE TIME', PAD, FOOTER_TOP + 52);
  ctx.textAlign = 'right';
  ctx.fillStyle = MARK;
  ctx.font = `900 22px ${MONO}`;
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
  id: 'the-last-panel',
  title: 'The last panel is yours · 29 November',
  body: 'One hour with Janine Selendy: three drawings shown whole, nineteen minutes of drawing, and a public record that keeps what the room makes — each panel with its maker’s own name on it.',
  honest: 'Nothing sold, ranked, sponsored or signed up to. No address published, and no picture of anybody. The frame is drawn here, not borrowed.',
};