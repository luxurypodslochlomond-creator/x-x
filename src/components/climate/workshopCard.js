// ── THE 29TH · THE PASS-IT-ON CARD ──
// One card anybody can send to a curator, a colleague or a classroom: the festival, the
// date, the place, the shape of the hour, and what happens to the drawings afterwards.
// Drawn in the sender's own browser, on their device, so nothing of theirs leaves it.
//
// Two things are on it on purpose and cannot be dropped: whose festival it is, and whose
// hour it is. A card that took the credit for either would be the one dishonest thing this
// page could do, and the people it is sent to would be right to notice.
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

export async function buildWorkshopShareCard(card = {}, options = {}) {
  const origin = String(options.origin || ORIGIN).replace(/^https?:\/\//, '');
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  try {
    await Promise.all([document.fonts.load('900 100px Oswald'), document.fonts.load('900 20px ui-monospace')]);
  } catch { /* the system faces still read fine */ }

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);

  // Whose festival, said across the top before anything of ours.
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, 78);
  ctx.fillStyle = SUN;
  ctx.font = `900 17px ${MONO}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('COLLECTIVE ACTIONS · CREATIVE INTERVENTIONS', W / 2, 40);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  ctx.fillStyle = RED;
  ctx.font = `900 20px ${MONO}`;
  ctx.fillText('THE RECORD OF THE TIME', PAD, 136);

  ctx.fillStyle = INK;
  ctx.font = `900 104px ${DISPLAY}`;
  ctx.fillText('THE 29TH', PAD, 252);

  ctx.fillStyle = MUTED;
  ctx.font = `900 25px ${MONO}`;
  ctx.fillText('ONE HOUR, AND THE ROOM DOES THE DRAWING', PAD, 300);

  ctx.strokeStyle = INK;
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(PAD, 342); ctx.lineTo(W - PAD, 342); ctx.stroke();

  ctx.fillStyle = INK;
  ctx.font = `700 21px ${MONO}`;
  ['8TH CARTOONAFRICA INTERNATIONAL BIENNIAL', '28–30 NOVEMBER 2026 · NATIONAL MUSEUM, BENIN CITY',
    'JANINE SELENDY · 3PM WEST AFRICA · 2PM SCOTLAND'].forEach((line, i) => ctx.fillText(line, PAD, 390 + i * 32));

  ctx.fillStyle = INK;
  ctx.font = `500 26px ${MONO}`;
  wrap(ctx, card.body, MAXW, 7).forEach((line, i) => ctx.fillText(line, PAD, 512 + i * 40));

  ctx.fillStyle = MUTED;
  ctx.font = `500 21px ${MONO}`;
  wrap(ctx, card.honest, MAXW, 4).forEach((line, i) => ctx.fillText(line, PAD, 830 + i * 32));

  // The festival's theme, in their words, on their own band.
  ctx.fillStyle = SUN;
  ctx.fillRect(0, 960, W, 96);
  ctx.fillStyle = INK;
  ctx.font = `700 22px ${MONO}`;
  wrap(ctx, 'THEIR THEME: “SDG, AFRICAN YOUTHS AND DEMOCRACY THROUGH HUMOUR LENSES”', MAXW, 2)
    .forEach((line, i) => ctx.fillText(line, PAD, 998 + i * 30));

  ctx.fillStyle = INK;
  ctx.font = `500 25px ${MONO}`;
  wrap(ctx, card.ask, MAXW, 3).forEach((line, i) => ctx.fillText(line, PAD, 1108 + i * 34));

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
  id: 'the-29th',
  title: 'The 29th · CartoonAFRICA workshop',
  body: 'A cartoon can hold a hard idea without frightening the person holding it. Three drawings shown whole, nineteen minutes of drawing, and a public record that keeps what the room makes — with each maker’s own name on their own panel.',
  honest: 'Nothing here is sold, ranked, sponsored or signed up to. Drawings arrive on paper, a keeper looks, and each one is kept with the artist’s name and their own words.',
  ask: 'The one ask of the room: draw one more next week, somewhere that is not a workshop, and send it.',
};