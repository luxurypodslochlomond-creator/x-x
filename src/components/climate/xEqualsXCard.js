import { COVENANT, COVENANT_TERMS } from '@/components/climate/xEqualsXCopy';

const W = 1080;
const H = 1350;
const PAD = 84;
const MAXW = W - PAD * 2;
import { loadRecordCardFonts } from '@/components/climate/recordTypography';

const letterSpacing = (g, value) => {
  if ('letterSpacing' in g) g.letterSpacing = value;
};

const wrap = (g, text, maxWidth) => {
  const words = String(text).split(' ');
  const lines = [];
  let line = '';
  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (g.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  return lines;
};

export async function buildCovenantCard(_entry, { origin } = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const g = canvas.getContext('2d');
  const { DISPLAY: sans, MONO, colors: { PAPER: paper, INK: ink, MARK: red, MUTED: muted } } = await loadRecordCardFonts();

  // ── PAPER, INK, AND ONE RED SIGN ──────────────────────────────────────────────
  // Brian, 27 November: "x = x share coolasfuck gives x = x but yellow". He was right, and
  // it was worse than a matter of taste: yellow is the cartoon room's colour, and this card
  // was wearing another room's clothes. The record's own mark is red on paper, so on the ink
  // band it is the paper that draws the two x's and the record's red that draws the sign
  // between them — the same mark, in the only colour this record ever accents with.
  g.fillStyle = paper;
  g.fillRect(0, 0, W, H);
  g.fillStyle = ink;
  g.fillRect(0, 0, W, 780);
  g.fillStyle = red;
  g.fillRect(0, 772, W, 8);
  g.textBaseline = 'alphabetic';
  g.font = `700 25px ${MONO}`;
  g.fillStyle = red;
  letterSpacing(g, '4px');
  g.fillText('WHY THIS RECORD', PAD, 92);
  g.fillStyle = paper;
  g.textAlign = 'right';
  g.fillText('RECORD OF THE TIME', W - PAD, 92);
  letterSpacing(g, '0px');

  g.font = `700 250px ${MONO}`;
  g.textAlign = 'center';
  const step = 180;
  ['x', '=', 'x'].forEach((glyph, index) => {
    g.fillStyle = index === 1 ? red : paper;
    g.fillText(glyph, W / 2 + (index - 1) * step, 350);
  });

  // ── THE CARD CARRIES THE CODE ─────────────────────────────────────────────────
  // Under the mark is the same mark in its other alphabet, so a picture that leaves this
  // page still carries the transmission it came from — pressed, it would sound like the
  // mark itself. Small and quiet, in the record's red: a caption to the mark and not a
  // second headline, so the reader who knows the code will read it and the reader who does
  // not is never asked to.
  g.font = `700 30px ${MONO}`;
  g.fillStyle = red;
  letterSpacing(g, '6px');
  g.fillText('-..-  -...-  -..-', W / 2, 408);
  letterSpacing(g, '0px');

  g.fillStyle = paper;
  g.font = `700 76px ${sans}`;
  g.fillText(COVENANT.title, W / 2, 478);
  g.fillText(COVENANT.distinction, W / 2, 566);
  g.font = `400 32px ${sans}`;
  wrap(g, COVENANT.meaning, MAXW).forEach((line, index) => {
    g.fillText(line, W / 2, 638 + index * 44);
  });

  g.textAlign = 'left';
  COVENANT_TERMS.forEach(({ number, title }, index) => {
    const y = 872 + index * 91;
    g.font = `500 27px ${MONO}`;
    g.fillStyle = muted;
    g.fillText(number, PAD, y);
    g.font = `700 43px ${sans}`;
    g.fillStyle = ink;
    g.fillText(title, PAD + 83, y);
  });
  g.font = `400 29px ${sans}`;
  g.fillStyle = muted;
  wrap(g, COVENANT.limit, MAXW).forEach((line, index) => g.fillText(line, PAD, 1158 + index * 40));
  g.font = `500 24px ${MONO}`;
  g.fillText(COVENANT.dedication, PAD, 1244);
  const address = origin ? `${String(origin).replace(/^https?:\/\//, '').replace(/\/$/, '')}/x=x` : '';
  if (address) {
    g.font = `400 24px ${sans}`;
    wrap(g, address, MAXW).forEach((line, index) => g.fillText(line, PAD, 1303 + index * 29));
  }
  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
}