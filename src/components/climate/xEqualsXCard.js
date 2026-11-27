import { COVENANT, COVENANT_TERMS } from '@/components/climate/xEqualsXCopy';
import { RECORD_COVER_SCREEN } from '@/components/climate/categoryImages';
import { loadRecordCardFonts } from '@/components/climate/recordTypography';

const W = 1080;
const H = 1350;
const PAD = 66;

function wrap(g, text, width) {
  const lines = [];
  let line = '';
  for (const word of String(text).split(' ')) {
    const next = line ? `${line} ${word}` : word;
    if (line && g.measureText(next).width > width) { lines.push(line); line = word; }
    else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

export async function buildCovenantCard(_entry, { origin } = {}) {
  const [fonts, painting] = await Promise.all([
    loadRecordCardFonts(),
    new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('The record painting could not be opened.'));
      image.src = RECORD_COVER_SCREEN;
    }),
  ]);
  const { DISPLAY: sans, colors: { PAPER: paper, INK: ink, MARK: red, MUTED: muted, SUN: sun } } = fonts;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const g = canvas.getContext('2d');
  g.fillStyle = paper;
  g.fillRect(0, 0, W, H);
  g.fillStyle = sun;
  g.fillRect(0, 0, W, 340);
  g.textAlign = 'center';
  g.fillStyle = ink;
  g.font = `700 24px ${sans}`;
  g.fillText('A PUBLIC CLIMATE RECORD', W / 2, 53);
  g.fillStyle = red;
  g.font = `700 256px ${sans}`;
  g.fillText('x=x', W / 2, 284);
  const imageHeight = W * painting.naturalHeight / painting.naturalWidth;
  g.drawImage(painting, 0, 340, W, imageHeight);
  const imageBottom = 340 + imageHeight;
  g.fillStyle = red;
  g.fillRect(0, imageBottom, W, 7);
  g.fillStyle = muted;
  g.font = `400 22px ${sans}`;
  g.fillText('Cover painting · made for this record with BASE 1 (AI)', W / 2, 985);
  g.fillStyle = ink;
  g.font = `700 70px ${sans}`;
  g.fillText(COVENANT.title, W / 2, 1064);
  g.fillText(COVENANT.distinction, W / 2, 1145);
  g.font = `400 30px ${sans}`;
  g.fillText(COVENANT.meaning, W / 2, 1202);
  g.font = `700 27px ${sans}`;
  const terms = COVENANT_TERMS.map(term => term.title).join('  ');
  wrap(g, terms, W - PAD * 2).forEach((line, index) => g.fillText(line, W / 2, 1250 + index * 34));
  g.fillStyle = red;
  g.font = `700 29px ${sans}`;
  const address = origin ? `${String(origin).replace(/^https?:\/\//, '').replace(/\/$/, '')}/x=x` : '';
  if (address) g.fillText(address, W / 2, 1314);
  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
}