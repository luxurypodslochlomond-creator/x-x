import { recordOrigin } from './recordAddress';
import { RECORD_COVER_SCREEN } from '@/components/climate/categoryImages';
import buildArtworkShare from '@/components/climate/buildArtworkShare';

// ── RECORD OF THE TIME · THE WIRE CARD ──
// One entry, drawn as a picture that can be sent anywhere. It carries the headline,
// the date, the place, who says so and how well it is known — so a story never
// travels as a screenshot with its origin cut off. Drawn in the browser, on the
// reader's own device: nothing of theirs leaves it, and no picture needs a server.

const W = 1080;
const H = 1350;

import { loadRecordCardFonts, recordCardPalette } from '@/components/climate/recordTypography';

const PAD = 60;
const MAXW = W - PAD * 2;
const FOOTER_TOP = H - 150;

function badgeFor(entry) {
  const { BONE, INK, SIGNAL_BRIGHT } = recordCardPalette();
  const badges = {
    official_record: { label: 'Official record', bg: '#1e3a2b', fg: BONE },
    corroborated: { label: 'Corroborated', bg: SIGNAL_BRIGHT, fg: INK },
    single_source: { label: 'Single source', bg: INK, fg: BONE },
  };
  // Corroboration still requires a named second origin, regardless of the design.
  return entry?.verification === 'corroborated' && !String(entry?.corroborating_source || '').trim()
    ? badges.single_source
    : badges[entry?.verification] || badges.single_source;
}

const KIND = { emergency: 'Crisis', milestone: 'Solution', initiative: 'Action' };

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

  const { DISPLAY, MONO, colors: { PAPER, BONE, INK, SIGNAL, MARK, SIGNAL_BRIGHT, MUTED } } = await loadRecordCardFonts();

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
  ctx.font = `700 15px ${MONO}`;
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
    const scale = Math.min(W / img.width, 380 / img.height);
    ctx.fillStyle = BONE;
    ctx.fillRect(0, 74, W, 380);
    ctx.drawImage(img, (W - img.width * scale) / 2, 74 + (380 - img.height * scale) / 2, img.width * scale, img.height * scale);
    ctx.strokeStyle = INK;
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(0, 454); ctx.lineTo(W, 454); ctx.stroke();
    y = 510;
    if (entry.image_credit) {
      ctx.fillStyle = MUTED;
      ctx.font = `400 18px ${MONO}`;
      ctx.fillText(fitText(ctx, entry.image_credit, MAXW), PAD, 484);
      y = 544;
    }
  }

  // How well it is known, what kind of entry it is.
  const badge = badgeFor(entry);
  ctx.font = `700 20px ${MONO}`;
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
  ctx.font = `700 ${size}px ${DISPLAY}`;
  let head = wrapLines(ctx, (entry.headline || '').toUpperCase(), MAXW, 4);
  while (head.length > 3 && size > 46) {
    size -= 4;
    ctx.font = `700 ${size}px ${DISPLAY}`;
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
  ctx.font = `400 26px ${MONO}`;
  const body = wrapLines(ctx, entry.what_changed, MAXW, maxBody);
  drawLines(ctx, body, PAD, y + 26, bodyLine);

  // Who says so — never separated from the entry.
  const sourceY = FOOTER_TOP - 175;
  ctx.fillStyle = MUTED;
  ctx.font = `700 20px ${MONO}`;
  ctx.fillText('WHO SAYS SO', PAD, sourceY);
  ctx.fillStyle = INK;
  ctx.font = `700 26px ${MONO}`;
  const source = wrapLines(ctx, entry.source_name || '', MAXW, 2);
  drawLines(ctx, source, PAD, sourceY + 36, 34);
  if (entry.corroborating_source) {
    ctx.fillStyle = MUTED;
    ctx.font = `400 22px ${MONO}`;
    ctx.fillText(fitText(ctx, `+ ${entry.corroborating_source}`, MAXW), PAD, sourceY + 42 + 34 * source.length);
  }

  // Footer — the mark, the covenant, and where this entry lives.
  ctx.fillStyle = INK;
  ctx.fillRect(0, FOOTER_TOP, W, 150);
  ctx.fillStyle = SIGNAL_BRIGHT;
  ctx.font = `700 24px ${MONO}`;
  ctx.fillText('RECORD OF THE TIME', PAD, FOOTER_TOP + 52);
  ctx.textAlign = 'right';
  ctx.fillStyle = MARK;
  ctx.font = `700 22px ${MONO}`;
  ctx.fillText('x = x', W - PAD, FOOTER_TOP + 52);
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

  const { DISPLAY, MONO, colors: { PAPER, BONE, INK, SIGNAL, MARK, SIGNAL_BRIGHT, MUTED } } = await loadRecordCardFonts();

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
  ctx.font = `700 15px ${MONO}`;
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
  ctx.font = `700 20px ${MONO}`;
  const badgeText = 'GIVEN, NOT SOLD';
  const badgeW = ctx.measureText(badgeText).width + 32;
  ctx.fillStyle = '#1e3a2b';
  ctx.fillRect(PAD, y - 24, badgeW, 36);
  ctx.fillStyle = BONE;
  ctx.fillText(badgeText, PAD + 16, y + 1);

  // What arrives — the master's real spec, not a claim.
  if (track.spec) {
    const specText = String(track.spec).toUpperCase();
    ctx.font = `700 20px ${MONO}`;
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
  ctx.font = `700 ${size}px ${DISPLAY}`;
  let head = wrapLines(ctx, String(track.title || '').toUpperCase(), MAXW, 3);
  while (head.length > 2 && size > 46) {
    size -= 4;
    ctx.font = `700 ${size}px ${DISPLAY}`;
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
  ctx.font = `400 26px ${MONO}`;
  const body = wrapLines(ctx, track.body, MAXW, maxBody);
  drawLines(ctx, body, PAD, y + 26, bodyLine);

  // Who gave it — never separated from the work.
  const sourceY = FOOTER_TOP - 175;
  ctx.fillStyle = MUTED;
  ctx.font = `700 20px ${MONO}`;
  ctx.fillText('GIVEN BY', PAD, sourceY);
  ctx.fillStyle = INK;
  ctx.font = `700 26px ${MONO}`;
  drawLines(ctx, wrapLines(ctx, track.artist || '', MAXW, 1), PAD, sourceY + 36, 34);
  ctx.fillStyle = MUTED;
  ctx.font = `400 22px ${MONO}`;
  ctx.fillText(fitText(ctx, 'Free to listen · no paywall · no ad', MAXW), PAD, sourceY + 76);

  // Footer — the mark, the covenant, and where the track lives.
  ctx.fillStyle = INK;
  ctx.fillRect(0, FOOTER_TOP, W, 150);
  ctx.fillStyle = SIGNAL_BRIGHT;
  ctx.font = `700 24px ${MONO}`;
  ctx.fillText('RECORD OF THE TIME', PAD, FOOTER_TOP + 52);
  ctx.textAlign = 'right';
  ctx.fillStyle = MARK;
  ctx.font = `700 22px ${MONO}`;
  ctx.fillText('x = x', W - PAD, FOOTER_TOP + 52);
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

// ── THE ENTRY CARD ──
// A solution, a crisis or an action leaves as a picture, the same way a wire entry does,
// and for the same reason: an entry that travels as a bare screenshot arrives with its
// origin cut off. So the card carries what it is, how well it is known, where it is, who
// says so — and the credit of the picture it shows, kept inside the frame that belongs to
// it, because the record's rule is that a photograph is never separated from the person
// who made it. Drawn in the browser, on the reader's own device: nothing of theirs leaves
// it, and no picture needs a server. Nothing private is drawn: a submitter's address is
// not on the card, and never was on the entry either.
const ENTRY_DATE = { day: 'numeric', month: 'long', year: 'numeric' };

function cardDate(value) {
  if (!value) return '';
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-GB', ENTRY_DATE);
}

export async function buildEntryShareCard(entry = {}, options = {}) {
  const origin = String(options.origin || recordOrigin() || '').replace(/^https?:\/\//, '');

  // What the entry is, in the record's own words for it. An action's own label comes from
  // the page that knows its type; a solution or crisis names itself.
  const kindLabel = options.kindLabel
    || (entry.entry_type === 'solution' ? 'Solution'
      : entry.entry_type === 'climate_crisis' ? 'Climate crisis'
        : 'Action');

  // Where the entry lives. An action carries no entry_type of its own.
  const path = entry.entry_type
    ? `/ClimateDetail/${entry.entry_type}/${entry.id}`
    : `/ClimateDetail/action/${entry.id}`;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const { DISPLAY, MONO, colors: { PAPER, BONE, INK, SIGNAL, MARK, SIGNAL_BRIGHT, MUTED } } = await loadRecordCardFonts();

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
  ctx.font = `700 15px ${MONO}`;
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
    if (entry.image_credit) {
      ctx.fillStyle = 'rgba(20,18,16,0.78)';
      ctx.fillRect(0, 420, W, 34);
      ctx.fillStyle = BONE;
      ctx.font = `700 17px ${MONO}`;
      ctx.fillText(fitText(ctx, entry.image_credit, MAXW), PAD, 442);
    }
    ctx.strokeStyle = INK;
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(0, 454); ctx.lineTo(W, 454); ctx.stroke();
    y = 510;
  }

  // How well it is known, and what kind of entry it is.
  const badge = badgeFor(entry);
  ctx.font = `700 20px ${MONO}`;
  const badgeText = badge.label.toUpperCase();
  const badgeW = ctx.measureText(badgeText).width + 32;
  ctx.fillStyle = badge.bg;
  ctx.fillRect(PAD, y - 24, badgeW, 36);
  ctx.fillStyle = badge.fg;
  ctx.fillText(badgeText, PAD + 16, y + 1);

  const kindText = kindLabel.toUpperCase();
  const kindW = ctx.measureText(kindText).width + 28;
  ctx.strokeStyle = 'rgba(20,18,16,0.45)';
  ctx.lineWidth = 2;
  ctx.strokeRect(PAD + badgeW + 12, y - 24, kindW, 36);
  ctx.fillStyle = MUTED;
  ctx.fillText(kindText, PAD + badgeW + 26, y + 1);

  // When and where, where the entry states them.
  y += 44;
  const meta = [cardDate(entry.date) || entry.source_date, [entry.country, entry.region_rough].filter(Boolean).join(', ')]
    .filter(Boolean)
    .join('  ·  ');
  if (meta) {
    ctx.font = `700 20px ${MONO}`;
    ctx.fillStyle = MUTED;
    ctx.fillText(fitText(ctx, meta, MAXW), PAD, y);
    y += 46;
  }

  // The title — the record's display voice, shrunk until it fits.
  ctx.fillStyle = INK;
  let size = 66;
  ctx.font = `700 ${size}px ${DISPLAY}`;
  let head = wrapLines(ctx, String(entry.title || '').toUpperCase(), MAXW, 4);
  while (head.length > 3 && size > 46) {
    size -= 4;
    ctx.font = `700 ${size}px ${DISPLAY}`;
    head = wrapLines(ctx, String(entry.title || '').toUpperCase(), MAXW, 4);
  }
  const headLine = Math.round(size * 1.08);
  const headBase = y + size;
  drawLines(ctx, head, PAD, headBase, headLine);
  y = headBase + headLine * (head.length - 1) + 34;

  // The entry's own short line — as much of it as the card has room for.
  const bodyRoom = FOOTER_TOP - 200 - y;
  const bodyLine = 40;
  const maxBody = Math.max(2, Math.min(7, Math.floor(bodyRoom / bodyLine)));
  ctx.fillStyle = 'rgba(20,18,16,0.88)';
  ctx.font = `400 26px ${MONO}`;
  const body = wrapLines(ctx, entry.summary || entry.description || entry.details, MAXW, maxBody);
  drawLines(ctx, body, PAD, y + 26, bodyLine);

  // Who says so — never separated from the entry. Where the entry names nobody, the card
  // says so rather than leaving a blank for a reader to fill in themselves.
  const sourceY = FOOTER_TOP - 175;
  ctx.fillStyle = MUTED;
  ctx.font = `700 20px ${MONO}`;
  ctx.fillText('WHO SAYS SO', PAD, sourceY);
  ctx.fillStyle = INK;
  ctx.font = `700 26px ${MONO}`;
  const source = wrapLines(ctx, entry.source_name || 'Names no source on the record', MAXW, 2);
  drawLines(ctx, source, PAD, sourceY + 36, 34);
  if (entry.corroborating_source) {
    ctx.fillStyle = MUTED;
    ctx.font = `400 22px ${MONO}`;
    ctx.fillText(fitText(ctx, `+ ${entry.corroborating_source}`, MAXW), PAD, sourceY + 42 + 34 * source.length);
  }

  // Footer — the mark, the covenant, and where this entry lives.
  ctx.fillStyle = INK;
  ctx.fillRect(0, FOOTER_TOP, W, 150);
  ctx.fillStyle = SIGNAL_BRIGHT;
  ctx.font = `700 24px ${MONO}`;
  ctx.fillText('RECORD OF THE TIME', PAD, FOOTER_TOP + 52);
  ctx.textAlign = 'right';
  ctx.fillStyle = MARK;
  ctx.font = `700 22px ${MONO}`;
  ctx.fillText('x = x', W - PAD, FOOTER_TOP + 52);
  ctx.textAlign = 'left';
  ctx.fillStyle = BONE;
  ctx.font = `700 18px ${MONO}`;
  ctx.fillText(fitText(ctx, `${origin}${path}`, MAXW), PAD, FOOTER_TOP + 100);

  // Signal edge, drawn last so it stays on top of the picture.
  ctx.fillStyle = SIGNAL;
  ctx.fillRect(0, 74, 8, H - 74);

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
}

// ── THE MANUAL CARD ──
// The Buttons leaves as a picture the same way a wire entry and a track do, because the
// person who needs it most is the one handing the record to somebody else: a host, a
// handler, a panel. So it carries the whole thing at a glance — what the page is for, the
// six parts it holds, and where it lives — instead of travelling as a screenshot with its
// link cut off. It has no "who says so" block, and that is deliberate: the manual is not a
// claim about the world, it is the record describing itself, so there is no origin to name
// and none is invented. Drawn on the reader's own device: nothing of theirs leaves it.
export async function buildGuideShareCard(guide = {}, options = {}) {
  const origin = String(options.origin || recordOrigin() || '').replace(/^https?:\/\//, '');

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const { DISPLAY, MONO, colors: { PAPER, BONE, INK, SIGNAL, MARK, SIGNAL_BRIGHT, MUTED } } = await loadRecordCardFonts();

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
  ctx.font = `700 15px ${MONO}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('THIS IS THE TIME. AND THIS IS THE RECORD OF THE TIME.', W / 2, 38);
  ctx.globalAlpha = 1;
  ctx.fillStyle = SIGNAL_BRIGHT;
  ctx.beginPath(); ctx.arc(W / 2 - 330, 38, 4, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(W / 2 + 330, 38, 4, 0, Math.PI * 2); ctx.fill();

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  // What it is — the record's own name for the page, and the one thing a stranger needs
  // to know before they open it.
  let y = 118;
  ctx.font = `700 20px ${MONO}`;
  const badgeText = guide.badge || 'THE MANUAL';
  const badgeW = ctx.measureText(badgeText).width + 32;
  ctx.fillStyle = INK;
  ctx.fillRect(PAD, y - 24, badgeW, 36);
  ctx.fillStyle = BONE;
  ctx.fillText(badgeText, PAD + 16, y + 1);

  const chipText = 'NO ACCOUNT NEEDED';
  const chipW = ctx.measureText(chipText).width + 28;
  ctx.strokeStyle = 'rgba(20,18,16,0.45)';
  ctx.lineWidth = 2;
  ctx.strokeRect(PAD + badgeW + 12, y - 24, chipW, 36);
  ctx.fillStyle = MUTED;
  ctx.fillText(chipText, PAD + badgeW + 26, y + 1);

  // The line the page carries under its title, drawn exactly as the page carries it.
  y += 44;
  if (guide.marker) {
    ctx.font = `700 20px ${MONO}`;
    ctx.fillStyle = MUTED;
    ctx.fillText(fitText(ctx, guide.marker, MAXW), PAD, y);
    y += 46;
  }

  // The title — the record's display voice.
  ctx.fillStyle = INK;
  const size = 66;
  ctx.font = `700 ${size}px ${DISPLAY}`;
  const head = wrapLines(ctx, String(guide.title || 'The Buttons').toUpperCase(), MAXW, 2);
  const headLine = Math.round(size * 1.08);
  const headBase = y + size;
  drawLines(ctx, head, PAD, headBase, headLine);
  y = headBase + headLine * (head.length - 1) + 34;

  // What the page is for, in the page's own words — never a paraphrase of them.
  ctx.fillStyle = 'rgba(20,18,16,0.88)';
  ctx.font = `400 26px ${MONO}`;
  const body = wrapLines(ctx, guide.body, MAXW, 4);
  drawLines(ctx, body, PAD, y + 26, 40);
  y = y + 26 + 40 * Math.max(0, body.length - 1);

  // What is inside it — all six parts, so the whole manual is on the card.
  const inside = Array.isArray(guide.inside) ? guide.inside.slice(0, 6) : [];
  if (inside.length) {
    y += 74;
    ctx.fillStyle = MUTED;
    ctx.font = `700 20px ${MONO}`;
    ctx.fillText('WHAT IS INSIDE', PAD, y);
    ctx.fillStyle = INK;
    ctx.font = `700 24px ${MONO}`;
    inside.forEach((item, i) => {
      ctx.fillText(fitText(ctx, item, MAXW), PAD, y + 44 + i * 40);
    });
  }

  // The close, in the record's own words — set just above the footer so it stands in the
  // same place however long the list above it runs.
  if (guide.closing) {
    ctx.fillStyle = MUTED;
    ctx.font = `400 22px ${MONO}`;
    const close = wrapLines(ctx, guide.closing, MAXW, 3);
    drawLines(ctx, close, PAD, FOOTER_TOP - 160 - 34 * (close.length - 1), 34);
  }

  // Footer — the mark, the covenant, and where the manual lives.
  ctx.fillStyle = INK;
  ctx.fillRect(0, FOOTER_TOP, W, 150);
  ctx.fillStyle = SIGNAL_BRIGHT;
  ctx.font = `700 24px ${MONO}`;
  ctx.fillText('RECORD OF THE TIME', PAD, FOOTER_TOP + 52);
  ctx.textAlign = 'right';
  ctx.fillStyle = MARK;
  ctx.font = `700 22px ${MONO}`;
  ctx.fillText('x = x', W - PAD, FOOTER_TOP + 52);
  ctx.textAlign = 'left';
  ctx.fillStyle = BONE;
  ctx.font = `700 18px ${MONO}`;
  ctx.fillText(fitText(ctx, `${origin}${guide.url_path || '/ClimateGuide'}`, MAXW), PAD, FOOTER_TOP + 100);

  // Signal edge, drawn last so it stays on top.
  ctx.fillStyle = SIGNAL;
  ctx.fillRect(0, 74, 8, H - 74);

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
}

// ── THE WAY IN, ON ONE CARD ───────────────────────────────────────────────────
// Janine asked, by email, to be walked through what a new person does — and a walkthrough
// sent as prose is a walkthrough nobody rereads. So the same few steps travel as a card:
// five lines, no explaining, in the order a person actually does them. It is handed to a
// keeper, not published as a page, because it is addressed to one correspondent.
// The words are deliberately short. A card that needs reading twice is a page.
export async function buildWayInShareCard(card = {}, options = {}) {
  const origin = String(options.origin || recordOrigin() || '').replace(/^https?:\/\//, '');
  const steps = Array.isArray(card.steps) ? card.steps.slice(0, 5) : [];

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const { DISPLAY, MONO, colors: { PAPER, BONE, INK, SIGNAL, MARK, SIGNAL_BRIGHT, MUTED } } = await loadRecordCardFonts();

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(20,18,16,0.035)';
  for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1);

  // Epigraph band, the same one every page of the record carries.
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, 74);
  ctx.fillStyle = BONE;
  ctx.globalAlpha = 0.7;
  ctx.font = `700 15px ${MONO}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('THIS IS THE TIME. AND THIS IS THE RECORD OF THE TIME.', W / 2, 38);
  ctx.globalAlpha = 1;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  // The badge: who this card is for, said first.
  let y = 118;
  ctx.font = `700 20px ${MONO}`;
  const badgeText = card.badge || 'FOR A CUSTODIAN';
  const badgeW = ctx.measureText(badgeText).width + 32;
  ctx.fillStyle = INK;
  ctx.fillRect(PAD, y - 24, badgeW, 36);
  ctx.fillStyle = BONE;
  ctx.fillText(badgeText, PAD + 16, y + 1);

  const chipText = 'ON A PHONE';
  const chipW = ctx.measureText(chipText).width + 28;
  ctx.strokeStyle = 'rgba(20,18,16,0.45)';
  ctx.lineWidth = 2;
  ctx.strokeRect(PAD + badgeW + 12, y - 24, chipW, 36);
  ctx.fillStyle = MUTED;
  ctx.fillText(chipText, PAD + badgeW + 26, y + 1);

  // Title.
  y += 44;
  ctx.fillStyle = INK;
  const size = 66;
  ctx.font = `700 ${size}px ${DISPLAY}`;
  const head = wrapLines(ctx, String(card.title || 'The way in').toUpperCase(), MAXW, 2);
  const headLine = Math.round(size * 1.08);
  const headBase = y + size;
  drawLines(ctx, head, PAD, headBase, headLine);
  y = headBase + headLine * (head.length - 1) + 26;

  if (card.body) {
    ctx.fillStyle = 'rgba(20,18,16,0.88)';
    ctx.font = `400 25px ${MONO}`;
    const body = wrapLines(ctx, card.body, MAXW, 2);
    drawLines(ctx, body, PAD, y + 24, 37);
    y = y + 24 + 37 * Math.max(0, body.length - 1);
  }

  // The steps: a number, the act, then one line of what happens.
  let stepY = y + 78;
  steps.forEach((step, i) => {
    ctx.fillStyle = SIGNAL;
    ctx.font = `700 26px ${MONO}`;
    ctx.fillText(String(i + 1), PAD, stepY);

    ctx.fillStyle = INK;
    ctx.font = `700 27px ${MONO}`;
    ctx.fillText(fitText(ctx, String(step.do || ''), MAXW - 54), PAD + 54, stepY);

    ctx.fillStyle = 'rgba(20,18,16,0.8)';
    ctx.font = `400 24px ${MONO}`;
    const what = wrapLines(ctx, String(step.what || ''), MAXW - 54, 2);
    drawLines(ctx, what, PAD + 54, stepY + 37, 32);

    stepY += 37 + 32 * Math.max(1, what.length) + 42;
  });

  if (card.closing) {
    ctx.fillStyle = MUTED;
    ctx.font = `400 22px ${MONO}`;
    const close = wrapLines(ctx, card.closing, MAXW, 3);
    drawLines(ctx, close, PAD, FOOTER_TOP - 150 - 34 * (close.length - 1), 34);
  }

  ctx.fillStyle = INK;
  ctx.fillRect(0, FOOTER_TOP, W, 150);
  ctx.fillStyle = SIGNAL_BRIGHT;
  ctx.font = `700 24px ${MONO}`;
  ctx.fillText('RECORD OF THE TIME', PAD, FOOTER_TOP + 52);
  ctx.textAlign = 'right';
  ctx.fillStyle = MARK;
  ctx.font = `700 22px ${MONO}`;
  ctx.fillText('x = x', W - PAD, FOOTER_TOP + 52);
  ctx.textAlign = 'left';
  ctx.fillStyle = BONE;
  ctx.font = `700 18px ${MONO}`;
  ctx.fillText(fitText(ctx, `${origin}${card.url_path || '/ClimateGuide'}`, MAXW), PAD, FOOTER_TOP + 100);

  ctx.fillStyle = SIGNAL;
  ctx.fillRect(0, 74, 8, H - 74);

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
}

// Share the existing phone-sized painting, not a second, text-heavy canvas design.
// Its bytes are passed through unchanged; the description and link travel as the message.
export async function buildRecordShareCard() {
  return buildArtworkShare({ image_url: RECORD_COVER_SCREEN });
}