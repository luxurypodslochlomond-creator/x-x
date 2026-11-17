// ── THE BIG PICTURE · THE PASS-IT-ON CARD ──
// One tap turns this room into a picture somebody can send to another person: the cartoon
// itself, one tight description of what the room is, and where it lives — so it never
// travels as a screenshot with the link cut off. Drawn in the reader's own browser, on
// their device, so nothing of theirs leaves it.
//
// Two things are on the card on purpose and can never be dropped from it: the drawings are
// AI-generated illustrations, and the people's wall is drawings made by people. A card that
// blurred those two would be the one dishonest thing this room could do.
const W = 1080;
const H = 1350;
const PAD = 60;
const MAXW = W - PAD * 2;
const FOOTER_TOP = H - 150;

const PAPER = '#fff8e9';
const SUN = '#ffd447';
const INK = '#201e27';
const LEAF = '#20785f';
const MUTED = '#5c5648';
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

export async function buildCartoonShareCard(card = {}, options = {}) {
  const origin = String(options.origin || ORIGIN).replace(/^https?:\/\//, '');
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  try {
    await Promise.all([document.fonts.load('900 66px Oswald'), document.fonts.load('900 20px ui-monospace')]);
  } catch { /* the system faces still read fine */ }

  const img = await loadImage(card.image);

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);

  // The band across the top: the room's whole argument in six words.
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, 78);
  ctx.fillStyle = SUN;
  ctx.font = `900 17px ${MONO}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('A LITTLE MISCHIEF. A BIGGER PICTURE.', W / 2, 40);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  // The cartoon, full width, its own frame.
  let y = 78;
  if (img) {
    const h = 470;
    const scale = Math.max(W / img.width, h / img.height);
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, y, W, h);
    ctx.clip();
    ctx.drawImage(img, (W - img.width * scale) / 2, y + (h - img.height * scale) / 2, img.width * scale, img.height * scale);
    ctx.restore();
    ctx.strokeStyle = INK;
    ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(0, y + h); ctx.lineTo(W, y + h); ctx.stroke();
    y += h + 58;
  }

  // The name, in the same shout as the page.
  ctx.fillStyle = INK;
  ctx.font = `900 82px ${DISPLAY}`;
  ctx.fillText('THE BIG PICTURE', PAD, y + 60);
  y += 108;

  // The tight description. No adjectives that do not earn their place.
  ctx.fillStyle = LEAF;
  ctx.font = `900 19px ${MONO}`;
  ctx.fillText('CARTOONS FOR A CHANGING WORLD', PAD, y);
  y += 42;

  ctx.fillStyle = INK;
  ctx.font = `500 31px ${MONO}`;
  const body = wrap(ctx, card.body, MAXW, 5);
  body.forEach((line, i) => ctx.fillText(line, PAD, y + i * 46));
  y += body.length * 46 + 30;

  // What the room is not. Said plainly, because a wall of drawings needs one honest line.
  ctx.fillStyle = MUTED;
  ctx.font = `500 24px ${MONO}`;
  wrap(ctx, card.honest, MAXW, 3).forEach((line, i) => ctx.fillText(line, PAD, y + i * 36));

  // Footer: where it lives, and the mark.
  ctx.fillStyle = INK;
  ctx.fillRect(0, FOOTER_TOP, W, 150);
  ctx.fillStyle = SUN;
  ctx.font = `900 24px ${MONO}`;
  ctx.fillText('RECORD OF THE TIME', PAD, FOOTER_TOP + 52);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#cc2d2a';
  ctx.font = `900 22px ${MONO}`;
  ctx.fillText('x = x', W - PAD, FOOTER_TOP + 52);
  ctx.textAlign = 'left';
  ctx.fillStyle = PAPER;
  ctx.font = `700 18px ${MONO}`;
  ctx.fillText(`${origin}/ClimateCartoons`, PAD, FOOTER_TOP + 100);

  ctx.fillStyle = SUN;
  ctx.fillRect(0, 0, 10, H);

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
}

// The card's own copy, kept in one place so the page and the picture cannot drift apart.
export const CARTOON_CARD = {
  id: 'the-big-picture',
  title: 'The Big Picture',
  image: 'https://media.base44.com/images/public/6889f31e76713b9cd47e043c/a46d7bec3_generated_image.png',
  body: 'Three cartoons, a pen, and room for yours. A climate record that children can draw on as well as read.',
  honest: 'The three cartoons are AI-generated illustrations, marked as such. The wall is human drawings, each with its maker. A custodian looks before anything goes up.',
};