import { recordOrigin } from '../recordAddress';

// ── THE INVITATION CARD ──────────────────────────────────────────────────────
// Every other card on this record assumes the reader already knows what they are
// looking at: an entry, a transmission, a person's checking. This one is the only card
// that has to introduce the place, because the person holding it has never opened it.
//
// It exists because Janine is not inviting one person, she is inviting a cohort —
// Sherman's Trebuchet Academy fellows, arriving a few at a time, each needing the same
// four things said once. Writing that email eight times is where a good intention dies.
// One card, one first name typed, and the picture carries it into a group chat as easily
// as into an email.
//
// Three rules, the same three the person's checking card keeps:
//  · It promises nothing the record does not do. One address, one door, one yes.
//  · It says the honest bit out loud. An initiative waits for a keeper, and that wait is
//    the reason a reader can trust the page, not an apology.
//  · It carries no address and no name it was not given. Drawn on the keeper's own
//    device, from nothing but the first name she types.
const W = 1080;
const H = 1350;
const PAD = 64;
const MAXW = W - PAD * 2;
const FOOTER_TOP = H - 150;

const PAPER = '#f4efe4';
const BONE = '#efe7d6';
const INK = '#141210';
const SIGNAL = '#b3261e';
const MARK = '#cc2d2a';
const SIGNAL_BRIGHT = '#7fc9e4';
const MUTED = '#5a5246';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const DISPLAY = "'Oswald', Impact, 'Arial Narrow', system-ui, sans-serif";

const ROWS = [
  { label: 'ONE ADDRESS', line: 'A record of what people are doing about the climate, with a source on every entry.' },
  { label: 'ONE DOOR', line: 'Open it and tap Submit a solution, crisis, or action. Paste the page it came from and the form fills itself in.' },
  { label: 'ONE YES', line: 'Nothing goes up until a keeper reads it. That is the whole of why a reader can trust the page.' },
];

function wrap(ctx, text, maxWidth, maxLines) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width <= maxWidth || !line) { line = test; continue; }
    lines.push(line);
    if (lines.length === maxLines) return lines;
    line = word;
  }
  if (line && lines.length < maxLines) lines.push(line);
  return lines;
}

function fit(ctx, text, maxWidth) {
  let out = String(text || '');
  if (ctx.measureText(out).width <= maxWidth) return out;
  while (out.length > 8 && ctx.measureText(`${out}…`).width > maxWidth) out = out.slice(0, -1);
  return `${out}…`;
}

export async function buildInviteCard(person = {}, options = {}) {
  const origin = String(options.origin || recordOrigin() || 'uf51.love').replace(/^https?:\/\//, '');
  const name = String(person.name || '').trim();

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  try {
    await Promise.all([
      document.fonts.load('900 72px Oswald'),
      document.fonts.load('900 20px ui-monospace'),
    ]);
  } catch { /* the system faces still read fine */ }

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(20,18,16,0.035)';
  for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1);

  // The epigraph band every card on the record wears.
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, 74);
  ctx.fillStyle = BONE;
  ctx.globalAlpha = 0.7;
  ctx.font = `900 15px ${MONO}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('THIS IS THE TIME. AND THIS IS THE RECORD OF THE TIME.', W / 2, 38);
  ctx.globalAlpha = 1;
  ctx.fillStyle = SIGNAL_BRIGHT;
  ctx.beginPath(); ctx.arc(W / 2 - 330, 38, 4, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(W / 2 + 330, 38, 4, 0, Math.PI * 2); ctx.fill();

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  let y = 118;
  ctx.font = `900 20px ${MONO}`;
  const badge = 'YOU ARE INVITED';
  const badgeW = ctx.measureText(badge).width + 32;
  ctx.fillStyle = INK;
  ctx.fillRect(PAD, y - 24, badgeW, 36);
  ctx.fillStyle = BONE;
  ctx.fillText(badge, PAD + 16, y + 1);

  y += 64;
  ctx.fillStyle = INK;
  ctx.font = `900 72px ${DISPLAY}`;
  const head = wrap(ctx, name ? name.toUpperCase() : 'A PLACE ON THE RECORD', MAXW, 2);
  const headBase = y + 72;
  head.forEach((line, i) => ctx.fillText(line, PAD, headBase + i * 78));
  y = headBase + 78 * (head.length - 1) + 40;

  ctx.fillStyle = MUTED;
  ctx.font = `500 24px ${MONO}`;
  const intro = wrap(ctx, 'has a place on the record. It is one page, it takes a minute, and it is free.', MAXW, 2);
  intro.forEach((line, i) => ctx.fillText(line, PAD, y + i * 34));
  y += 34 * (intro.length - 1) + 72;

  // The three things, said once each. No numbers, because the card is not a manual.
  ROWS.forEach((row) => {
    ctx.fillStyle = SIGNAL;
    ctx.font = `900 18px ${MONO}`;
    ctx.fillText(row.label, PAD, y);
    y += 34;
    ctx.fillStyle = INK;
    ctx.font = `500 23px ${MONO}`;
    const lines = wrap(ctx, row.line, MAXW, 3);
    lines.forEach((line, i) => ctx.fillText(line, PAD, y + i * 33));
    y += 33 * lines.length + 34;
  });

  ctx.fillStyle = MUTED;
  ctx.font = `500 22px ${MONO}`;
  ctx.fillText('Together we can change climate.', PAD, Math.min(y + 16, FOOTER_TOP - 44));

  ctx.fillStyle = INK;
  ctx.fillRect(0, FOOTER_TOP, W, 150);
  ctx.fillStyle = SIGNAL_BRIGHT;
  ctx.font = `900 24px ${MONO}`;
  ctx.fillText('RECORD OF THE TIME', PAD, FOOTER_TOP + 52);
  ctx.textAlign = 'right';
  ctx.fillStyle = MARK;
  ctx.font = `900 22px ${MONO}`;
  ctx.fillText('x = x', W - PAD, FOOTER_TOP + 52);
  ctx.textAlign = 'left';
  ctx.fillStyle = BONE;
  ctx.font = `700 18px ${MONO}`;
  ctx.fillText(fit(ctx, `${origin}/TogetherChangeClimate`, MAXW), PAD, FOOTER_TOP + 100);

  ctx.fillStyle = SIGNAL;
  ctx.fillRect(0, 74, 8, H - 74);

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
}