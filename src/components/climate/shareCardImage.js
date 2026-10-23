import { recordOrigin } from './recordAddress';

// ── RECORD OF THE TIME · THE WIRE CARD ──
// One entry, drawn as a picture that can be sent anywhere. It carries the headline,
// the date, the place, who says so and how well it is known — so a story never
// travels as a screenshot with its origin cut off. Drawn in the browser, on the
// reader's own device: nothing of theirs leaves it, and no picture needs a server.

const W = 1080;
const H = 1350;

// The record's palette, in the ocean key — kept in step with src/climate-palette.css
// so a card that travels looks like the page it came from. Emergency red stays red.
const PAPER = '#edf2f0';
const BONE = '#e9eeec';
const INK = '#141210';
const SIGNAL = '#b3261e';
const SIGNAL_BRIGHT = '#4fb0cf';
const MUTED = '#5b6b69';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const DISPLAY = "'Oswald', Impact, 'Arial Narrow', system-ui, sans-serif";

const PAD = 60;
const MAXW = W - PAD * 2;
const FOOTER_TOP = H - 150;

const VERIFICATION = {
  official_record: { label: 'Official record', bg: '#1e3a2b', fg: BONE },
  corroborated: { label: 'Corroborated', bg: SIGNAL_BRIGHT, fg: INK },
  single_source: { label: 'Single source', bg: INK, fg: BONE },
};

const KIND = { emergency: 'Emergency', milestone: 'Milestone', initiative: 'Initiative' };

// Break words into lines that fit the width, with a hard cap and an honest ellipsis.
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

function drawCover(ctx, img, x, y, w, h) {
  const scale = Math.max(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
  ctx.restore();
}

export async function buildWireShareCard(entry, options = {}) {
  const origin = String(options.origin || recordOrigin() || '').replace(/^https?:\/\//, '');

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

  const img = await loadImage(entry.image_url);

  // Paper, cold scanline grain.
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

  // The picture, when the entry has one.
  let y = 118;
  if (img) {
    drawCover(ctx, img, 0, 74, W, 380);
    ctx.strokeStyle = INK;
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(0, 454); ctx.lineTo(W, 454); ctx.stroke();
    y = 74 + 380 + 56;
  }

  // How well it is known, what kind of entry it is.
  const badge = VERIFICATION[entry.verification] || VERIFICATION.single_source;
  ctx.font = `900 20px ${MONO}`;
  const badgeText = badge.label.toUpperCase();
  const badgeW = ctx.measureText(badgeText).width + 32;
  ctx.fillStyle = badge.bg;
  ctx.fillRect(PAD, y - 24, badgeW, 36);
  ctx.fillStyle = badge.fg;
  ctx.fillText(badgeText, PAD + 16, y + 1);

  if (entry.kind) {
    const kindText = (KIND[entry.kind] || entry.kind).toUpperCase();
    const kindW = ctx.measureText(kindText).width + 28;
    ctx.strokeStyle = 'rgba(20,18,16,0.45)';
    ctx.lineWidth = 2;
    ctx.strokeRect(PAD + badgeW + 12, y - 24, kindW, 36);
    ctx.fillStyle = MUTED;
    ctx.fillText(kindText, PAD + badgeW + 26, y + 1);
  }

  // When and where.
  y += 44;
  const meta = [entry.when_label, entry.where_label].filter(Boolean).join('  ·  ');
  if (meta) {
    ctx.font = `700 20px ${MONO}`;
    ctx.fillStyle = MUTED;
    ctx.fillText(fitText(ctx, meta, MAXW), PAD, y);
    y += 46;
  }

  // The headline — the record's display voice, shrunk until it fits.
  ctx.fillStyle = INK;
  let size = 66;
  ctx.font = `900 ${size}px ${DISPLAY}`;
  let head = wrapLines(ctx, (entry.headline || '').toUpperCase(), MAXW, 4);
  while (head.length > 3 && size > 46) {
    size -= 4;
    ctx.font = `900 ${size}px ${DISPLAY}`;
    head = wrapLines(ctx, (entry.headline || '').toUpperCase(), MAXW, 4);
  }
  const headLine = Math.round(size * 1.08);
  const headBase = y + size;
  drawLines(ctx, head, PAD, headBase, headLine);
  y = headBase + headLine * (head.length - 1) + 34;

  // What actually happened — as much of it as the card has room for.
  const bodyRoom = FOOTER_TOP - 200 - y;
  const bodyLine = 40;
  const maxBody = Math.max(2, Math.min(7, Math.floor(bodyRoom / bodyLine)));
  ctx.fillStyle = 'rgba(20,18,16,0.88)';
  ctx.font = `500 26px ${MONO}`;
  const body = wrapLines(ctx, entry.what_changed, MAXW, maxBody);
  drawLines(ctx, body, PAD, y + 26, bodyLine);

  // Who says so — never separated from the entry.
  const sourceY = FOOTER_TOP - 175;
  ctx.fillStyle = MUTED;
  ctx.font = `900 20px ${MONO}`;
  ctx.fillText('WHO SAYS SO', PAD, sourceY);
  ctx.fillStyle = INK;
  ctx.font = `900 26px ${MONO}`;
  const source = wrapLines(ctx, entry.source_name || '', MAXW, 2);
  drawLines(ctx, source, PAD, sourceY + 36, 34);
  if (entry.corroborating_source) {
    ctx.fillStyle = MUTED;
    ctx.font = `500 22px ${MONO}`;
    ctx.fillText(fitText(ctx, `+ ${entry.corroborating_source}`, MAXW), PAD, sourceY + 42 + 34 * source.length);
  }

  // Footer — the mark, the covenant, and where this entry lives.
  ctx.fillStyle = INK;
  ctx.fillRect(0, FOOTER_TOP, W, 150);
  ctx.fillStyle = SIGNAL_BRIGHT;
  ctx.font = `900 24px ${MONO}`;
  ctx.fillText('RECORD OF THE TIME', PAD, FOOTER_TOP + 52);
  ctx.textAlign = 'right';
  ctx.fillStyle = BONE;
  ctx.globalAlpha = 0.6;
  ctx.font = `900 22px ${MONO}`;
  ctx.fillText('x = x', W - PAD, FOOTER_TOP + 52);
  ctx.globalAlpha = 1;
  ctx.textAlign = 'left';
  ctx.fillStyle = BONE;
  ctx.font = `700 18px ${MONO}`;
  ctx.fillText(fitText(ctx, `${origin}/ClimateWireEntry/${entry.id}`, MAXW), PAD, FOOTER_TOP + 100);

  // Signal edge, drawn last so it stays on top of the picture.
  ctx.fillStyle = SIGNAL;
  ctx.fillRect(0, 74, 8, H - 74);

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
}

// ── THE TRANSMISSION CARD ──
// Dillon Squire's track leaves as a picture, the same way a wire entry does: it carries
// his name, the fact that it was given to the record and never sold by it, and where it
// lives. The picture's credit travels with the picture, inside the frame it belongs to.
// Drawn on the reader's own device, so nothing of theirs leaves it.
export async function buildTransmissionShareCard(track = {}, options = {}) {
  const origin = String(options.origin || recordOrigin() || '').replace(/^https?:\/\//, '');

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

  const img = await loadImage(track.image_url);

  // Paper, cold scanline grain.
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

  // The picture, with its credit kept inside the frame it belongs to.
  let y = 118;
  if (img) {
    drawCover(ctx, img, 0, 74, W, 380);
    if (track.image_credit) {
      ctx.fillStyle = 'rgba(20,18,16,0.78)';
      ctx.fillRect(0, 420, W, 34);
      ctx.fillStyle = BONE;
      ctx.font = `700 17px ${MONO}`;
      ctx.fillText(fitText(ctx, track.image_credit, MAXW), PAD, 442);
    }
    ctx.strokeStyle = INK;
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(0, 454); ctx.lineTo(W, 454); ctx.stroke();
    y = 510;
  }

  // Given, not sold — the badge says what the page says, so nobody has to wonder.
  ctx.font = `900 20px ${MONO}`;
  const badgeText = 'GIVEN, NOT SOLD';
  const badgeW = ctx.measureText(badgeText).width + 32;
  ctx.fillStyle = '#1e3a2b';
  ctx.fillRect(PAD, y - 24, badgeW, 36);
  ctx.fillStyle = BONE;
  ctx.fillText(badgeText, PAD + 16, y + 1);

  // What arrives — the master's real spec, not a claim.
  if (track.spec) {
    const specText = String(track.spec).toUpperCase();
    ctx.font = `900 20px ${MONO}`;
    const specW = ctx.measureText(specText).width + 28;
    ctx.strokeStyle = 'rgba(20,18,16,0.45)';
    ctx.lineWidth = 2;
    ctx.strokeRect(PAD + badgeW + 12, y - 24, specW, 36);
    ctx.fillStyle = MUTED;
    ctx.fillText(specText, PAD + badgeW + 26, y + 1);
  }

  // Who made it, and what it is for.
  y += 44;
  const meta = [track.artist, track.dedication].filter(Boolean).join('  ·  ');
  if (meta) {
    ctx.font = `700 20px ${MONO}`;
    ctx.fillStyle = MUTED;
    ctx.fillText(fitText(ctx, meta, MAXW), PAD, y);
    y += 46;
  }

  // The title — the record's display voice.
  ctx.fillStyle = INK;
  let size = 66;
  ctx.font = `900 ${size}px ${DISPLAY}`;
  let head = wrapLines(ctx, String(track.title || '').toUpperCase(), MAXW, 3);
  while (head.length > 2 && size > 46) {
    size -= 4;
    ctx.font = `900 ${size}px ${DISPLAY}`;
    head = wrapLines(ctx, String(track.title || '').toUpperCase(), MAXW, 3);
  }
  const headLine = Math.round(size * 1.08);
  const headBase = y + size;
  drawLines(ctx, head, PAD, headBase, headLine);
  y = headBase + headLine * (head.length - 1) + 34;

  // What it costs: nothing, said plainly.
  const bodyRoom = FOOTER_TOP - 200 - y;
  const bodyLine = 40;
  const maxBody = Math.max(2, Math.min(5, Math.floor(bodyRoom / bodyLine)));
  ctx.fillStyle = 'rgba(20,18,16,0.88)';
  ctx.font = `500 26px ${MONO}`;
  const body = wrapLines(ctx, track.body, MAXW, maxBody);
  drawLines(ctx, body, PAD, y + 26, bodyLine);

  // Who gave it — never separated from the work.
  const sourceY = FOOTER_TOP - 175;
  ctx.fillStyle = MUTED;
  ctx.font = `900 20px ${MONO}`;
  ctx.fillText('GIVEN BY', PAD, sourceY);
  ctx.fillStyle = INK;
  ctx.font = `900 26px ${MONO}`;
  drawLines(ctx, wrapLines(ctx, track.artist || '', MAXW, 1), PAD, sourceY + 36, 34);
  ctx.fillStyle = MUTED;
  ctx.font = `500 22px ${MONO}`;
  ctx.fillText(fitText(ctx, 'Free to listen · no paywall · no ad', MAXW), PAD, sourceY + 76);

  // Footer — the mark, the covenant, and where the track lives.
  ctx.fillStyle = INK;
  ctx.fillRect(0, FOOTER_TOP, W, 150);
  ctx.fillStyle = SIGNAL_BRIGHT;
  ctx.font = `900 24px ${MONO}`;
  ctx.fillText('RECORD OF THE TIME', PAD, FOOTER_TOP + 52);
  ctx.textAlign = 'right';
  ctx.fillStyle = BONE;
  ctx.globalAlpha = 0.6;
  ctx.font = `900 22px ${MONO}`;
  ctx.fillText('x = x', W - PAD, FOOTER_TOP + 52);
  ctx.globalAlpha = 1;
  ctx.textAlign = 'left';
  ctx.fillStyle = BONE;
  ctx.font = `700 18px ${MONO}`;
  const link = `${origin}${track.url_path || '/TogetherChangeClimate'}`;
  ctx.fillText(fitText(ctx, link, MAXW), PAD, FOOTER_TOP + 100);

  // Signal edge, drawn last so it stays on top of the picture.
  ctx.fillStyle = SIGNAL;
  ctx.fillRect(0, 74, 8, H - 74);

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
}