import { recordOrigin } from '../recordAddress';

// ── THE CHECKER'S CARD ──────────────────────────────────────────────────────
// One person's checking, on one piece of paper they can hand to anybody: a body, a
// journal, a grant panel, Trebuchet, the person who asked them to do it.
//
// It is a card and not a page on purpose. A page is a standing profile: it has to be
// kept up, it gets compared with the next one, and a hundred of them become a directory
// of people — which is the shape of the thing this record exists to refuse. A card is
// made at a moment from facts and handed over; it does not accumulate, it cannot be
// browsed, and it says what it says to one reader at a time.
//
// Three rules keep it honest:
//  · Every number on it is counted from the checks table when the card is drawn — there
//    is no field anyone can type a total into.
//  · It carries the person's own words and none written for them.
//  · It takes responsibility without pretending to judge a person. The first wording here
//    was "this record vouches for nobody", and the founder would not have it: vouching is
//    a responsibility, he said, not something to wash your hands of. He was right. So the
//    card now says what the record actually stands behind — every entry named on it, each
//    of which carries its source and can be opened and checked by anyone. A name here is
//    a person who read this record with us; it is not a rating of them.
//
// Drawn on the person's own device. No account, no follower, no address printed, and
// nothing of theirs leaves the phone it was made on.
const W = 1080;
const H = 1350;
const PAD = 60;
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

const MONTH_YEAR = { month: 'long', year: 'numeric' };
const SHORT_DATE = { day: 'numeric', month: 'short', year: 'numeric' };

const when = (value, format) => {
  if (!value) return '';
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-GB', format);
};

function wrapLines(ctx, text, maxWidth, maxLines) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  let used = 0;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width <= maxWidth || !line) {
      line = test;
      used += 1;
      continue;
    }
    lines.push(line);
    if (lines.length === maxLines) { line = ''; break; }
    line = word;
    used += 1;
  }
  if (line && lines.length < maxLines) lines.push(line);
  if (used < words.length && lines.length) {
    let last = lines[lines.length - 1];
    while (ctx.measureText(`${last} …`).width > maxWidth && last.length > 8) {
      last = last.slice(0, -2).replace(/[\s,.;:·-]+$/, '');
    }
    lines[lines.length - 1] = `${last} …`;
  }
  return lines;
}

function fitText(ctx, text, maxWidth) {
  let out = String(text || '');
  if (ctx.measureText(out).width <= maxWidth) return out;
  while (out.length > 8 && ctx.measureText(`${out}…`).width > maxWidth) out = out.slice(0, -1);
  return `${out}…`;
}

function drawLines(ctx, lines, x, firstBaseline, lineHeight) {
  lines.forEach((line, i) => ctx.fillText(line, x, firstBaseline + i * lineHeight));
}

export async function buildCheckerShareCard(person = {}, options = {}) {
  const origin = String(options.origin || recordOrigin() || '').replace(/^https?:\/\//, '');
  const signed = Array.isArray(person.signed) ? person.signed.filter((s) => s?.title) : [];

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  try {
    await Promise.all([
      document.fonts.load('900 66px Oswald'),
      document.fonts.load('900 22px ui-monospace'),
    ]);
  } catch { /* the system faces still read fine */ }

  // Paper, cold scanline grain — the same sheet every other card leaves on.
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(20,18,16,0.035)';
  for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1);

  // Epigraph band.
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

  // What this person is on the record — the fact, not a rank.
  let y = 118;
  ctx.font = `900 20px ${MONO}`;
  const badgeText = person.is_keeper ? 'HOLDS THE RECORD’S KEYS' : 'CHECKS THIS RECORD';
  const badgeW = ctx.measureText(badgeText).width + 32;
  ctx.fillStyle = INK;
  ctx.fillRect(PAD, y - 24, badgeW, 36);
  ctx.fillStyle = BONE;
  ctx.fillText(badgeText, PAD + 16, y + 1);

  y += 46;
  const since = when(person.since, MONTH_YEAR);
  if (since) {
    ctx.font = `700 20px ${MONO}`;
    ctx.fillStyle = MUTED;
    ctx.fillText(`ON THE LIST SINCE ${since.toUpperCase()}`, PAD, y);
    y += 46;
  }

  // Their name, in the record's display voice.
  ctx.fillStyle = INK;
  const size = 66;
  ctx.font = `900 ${size}px ${DISPLAY}`;
  const nameLines = wrapLines(ctx, String(person.name || '').toUpperCase(), MAXW, 2);
  const headLine = Math.round(size * 1.08);
  const headBase = y + size;
  drawLines(ctx, nameLines, PAD, headBase, headLine);
  y = headBase + headLine * (nameLines.length - 1) + 34;

  // Their own words, quoted as they wrote them and never filled in for them.
  if (person.line) {
    ctx.fillStyle = 'rgba(20,18,16,0.88)';
    ctx.font = `500 26px ${MONO}`;
    const body = wrapLines(ctx, person.line, MAXW, 4);
    drawLines(ctx, body, PAD, y + 26, 40);
    y = y + 26 + 40 * Math.max(0, body.length - 1) + 74;
  } else {
    y += 40;
  }

  // What they have actually signed — counted from the checks table, never typed in.
  ctx.fillStyle = MUTED;
  ctx.font = `900 20px ${MONO}`;
  ctx.fillText('WHAT THEY HAVE SIGNED', PAD, y);
  y += 40;
  ctx.fillStyle = INK;
  ctx.font = `900 28px ${MONO}`;
  const count = Number(person.signed_count || signed.length || 0);
  ctx.fillText(count ? `${count} ${count === 1 ? 'ENTRY' : 'ENTRIES'}` : 'NOTHING YET', PAD, y);
  y += 44;

  // The entries themselves, by name and date. No links: a reader checks them on the
  // record, where the entry carries its source — the card never stands in for that.
  signed.slice(0, 6).forEach((item) => {
    ctx.textAlign = 'left';
    ctx.fillStyle = INK;
    ctx.font = `700 22px ${MONO}`;
    ctx.fillText(fitText(ctx, item.title, MAXW - 190), PAD, y);
    ctx.textAlign = 'right';
    ctx.fillStyle = MUTED;
    ctx.font = `500 18px ${MONO}`;
    ctx.fillText(when(item.when, SHORT_DATE).toUpperCase(), W - PAD, y);
    y += 38;
  });
  ctx.textAlign = 'left';

  if (count > signed.length && signed.length) {
    ctx.fillStyle = MUTED;
    ctx.font = `500 20px ${MONO}`;
    ctx.fillText(`+ ${count - signed.length} more on the record`, PAD, y + 6);
  }

  // The sentence that does the real work: no rating of a person, and the record standing
  // behind what it can actually be held to — the entries, and their sources.
  ctx.fillStyle = MUTED;
  ctx.font = `500 22px ${MONO}`;
  const close = wrapLines(
    ctx,
    'Being named here is not a rating. What the record stands behind is every entry: each one says who says so, and anyone can open it and check.',
    MAXW,
    3,
  );
  drawLines(ctx, close, PAD, FOOTER_TOP - 60 - 34 * (close.length - 1), 34);

  // Footer — the mark, the covenant, and where this person stands.
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
  ctx.fillText(fitText(ctx, `${origin}/ClimateRoll`, MAXW), PAD, FOOTER_TOP + 100);

  // Signal edge, drawn last so it stays on top.
  ctx.fillStyle = SIGNAL;
  ctx.fillRect(0, 74, 8, H - 74);

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
}