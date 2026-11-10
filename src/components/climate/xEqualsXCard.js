import { COVENANT, COVENANT_TERMS } from '@/components/climate/xEqualsXCopy';

const W = 1080;
const H = 1350;
const PAD = 84;
const MAXW = W - PAD * 2;
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

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
  const theme = getComputedStyle(document.documentElement);
  const color = (name) => `rgb(${theme.getPropertyValue(`--record-${name}`).trim()})`;
  const paper = color('paper');
  const ink = color('ink');
  // Signal orange, not the deeper mark red: on the card's ink block the mark red measured
  // under three to one and dried into the ground, so the two x's — the whole point of the
  // picture — were the least legible marks on it.
  const signal = color('signal');
  const muted = color('muted');
  const sans = theme.getPropertyValue('--font-body').trim() || 'system-ui, sans-serif';

  g.fillStyle = paper;
  g.fillRect(0, 0, W, H);
  g.fillStyle = ink;
  g.fillRect(0, 0, W, 780);
  g.fillStyle = signal;
  g.fillRect(0, 772, W, 8);
  g.textBaseline = 'alphabetic';
  g.font = `600 25px ${MONO}`;
  g.fillStyle = signal;
  letterSpacing(g, '4px');
  g.fillText('THE PRINCIPLE', PAD, 92);
  g.fillStyle = paper;
  g.textAlign = 'right';
  g.fillText('RECORD OF THE TIME', W - PAD, 92);
  letterSpacing(g, '0px');

  g.font = `800 250px ${MONO}`;
  g.textAlign = 'center';
  const step = 180;
  ['x', '=', 'x'].forEach((mark, index) => {
    g.fillStyle = index === 1 ? paper : signal;
    g.fillText(mark, W / 2 + (index - 1) * step, 350);
  });
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
    g.font = `600 43px ${sans}`;
    g.fillStyle = ink;
    g.fillText(title, PAD + 83, y);
  });
  g.font = `400 29px ${sans}`;
  g.fillStyle = muted;
  wrap(g, COVENANT.limit, MAXW).forEach((line, index) => g.fillText(line, PAD, 1158 + index * 40));
  g.font = `500 24px ${MONO}`;
  g.fillText('NOT YET SIGNED BY A PERSON', PAD, 1244);
  const address = String(origin || '').replace(/^https?:\/\//, '');
  if (address) {
    g.font = `400 24px ${sans}`;
    wrap(g, address, MAXW).forEach((line, index) => g.fillText(line, PAD, 1303 + index * 29));
  }
  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
}