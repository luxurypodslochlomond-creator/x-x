// ── THE STONEYMOLLAN CARD ──
// The page leaves a phone the way a record page does: as a picture that already
// carries the name, the road, the distance and the one fact worth passing on, so it
// never travels as a screenshot with its link cut off.
//
// Drawn on the reader's own device — nothing of theirs leaves it, and no picture
// needs a server. Set down the middle like the page it came from.
//
// A canvas cannot read a CSS token, so the record's numbers are copied here. Change
// one, change all four: src/index.css owns them.

const W = 1080;
const H = 1350;

const PAPER = '#f4efe4';
const INK = '#141210';
const SIGNAL = '#b3261e';
const MARK = '#cc2d2a';
const MUTED = '#6b6258';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const SERIF = '"Source Serif 4", Georgia, "Times New Roman", serif';

const PAD = 64;
const MAXW = W - PAD * 2;
const FOOTER_TOP = H - 170;

function wrapLines(ctx, text, maxWidth, maxLines) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';

  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width <= maxWidth || !line) {
      line = test;
      continue;
    }
    lines.push(line);
    if (lines.length === maxLines) return lines;
    line = word;
  }
  if (line && lines.length < maxLines) lines.push(line);
  return lines;
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

export async function buildStoneymollanCard(options = {}) {
  const link = options.link || 'https://uf51.love/Stoneymollan';
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  try {
    await Promise.all([
      document.fonts.load(`400 76px ${SERIF}`),
      document.fonts.load(`700 20px ${MONO}`),
    ]);
  } catch { /* the system faces still read fine */ }

  const img = await loadImage(options.image_url);

  // Paper, cold scanline grain.
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(20,18,16,0.035)';
  for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1);

  // The record's red bar across the top, and a hairline of it down the left edge —
  // the same two marks the page wears.
  ctx.fillStyle = SIGNAL;
  ctx.fillRect(0, 0, W, 10);
  ctx.fillRect(0, 10, 8, H - 10);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';

  ctx.fillStyle = MUTED;
  ctx.font = `700 20px ${MONO}`;
  ctx.fillText('O V E R   L O C H   L O M O N D', W / 2, 96);

  ctx.fillStyle = INK;
  ctx.font = `400 86px ${SERIF}`;
  ctx.fillText('Stoneymollan', W / 2, 184);

  ctx.strokeStyle = 'rgba(20,18,16,0.55)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(PAD, 218);
  ctx.lineTo(W - PAD, 218);
  ctx.stroke();

  ctx.fillStyle = MUTED;
  ctx.font = `700 19px ${MONO}`;
  ctx.fillText('BALLOCH \u2192 CARDROSS  \u00b7  6.75 KM  \u00b7  COFFIN ROAD', W / 2, 256);
  ctx.fillStyle = SIGNAL;
  ctx.font = `700 18px ${MONO}`;
  ctx.fillText('JOHN MUIR WAY, SECTION 1  \u00b7  THREE LOCHS WAY', W / 2, 290);

  // The picture, with the hand that made it kept inside the frame.
  if (img) {
    drawCover(ctx, img, PAD, 330, MAXW, 470);
    ctx.strokeStyle = 'rgba(20,18,16,0.35)';
    ctx.lineWidth = 2;
    ctx.strokeRect(PAD, 330, MAXW, 470);
    if (options.image_credit) {
      ctx.fillStyle = 'rgba(20,18,16,0.8)';
      ctx.fillRect(PAD, 762, MAXW, 38);
      ctx.fillStyle = PAPER;
      ctx.font = `700 17px ${MONO}`;
      ctx.fillText(options.image_credit.toUpperCase(), W / 2, 787);
    }
  }

  // The lead, in the page's own words rather than a paraphrase of them.
  ctx.fillStyle = INK;
  ctx.font = `400 52px ${SERIF}`;
  const lead = wrapLines(ctx, 'Mist, beeches and two Neolithic cairns, over Loch Lomond.', MAXW - 60, 3);
  lead.forEach((line, i) => ctx.fillText(line, W / 2, 900 + i * 60));

  // What is on it, in as much detail as the card has room for.
  ctx.fillStyle = 'rgba(20,18,16,0.82)';
  ctx.font = `500 24px ${MONO}`;
  const body = wrapLines(
    ctx,
    'A morning walk on the old coffin road \u00b7 cabins at the top of it \u00b7 a view down the whole loch to Ben Lomond',
    MAXW - 90,
    4,
  );
  body.forEach((line, i) => ctx.fillText(line, W / 2, 1010 + i * 40));

  // Footer — the address a reader can check, and the covenant.
  ctx.fillStyle = INK;
  ctx.fillRect(0, FOOTER_TOP, W, H - FOOTER_TOP);
  ctx.fillStyle = PAPER;
  ctx.font = `700 22px ${MONO}`;
  ctx.fillText(link.replace(/^https?:\/\//, ''), W / 2, FOOTER_TOP + 66);
  ctx.fillStyle = MARK;
  ctx.font = `700 26px ${MONO}`;
  ctx.fillText('x  =  x', W / 2, FOOTER_TOP + 118);

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
}