// ── THE COVENANT, AS ONE PICTURE ───────────────────────────────────────────────
// The page could not be passed on, which for a covenant is the whole point of it. Every
// wire entry and every track already leaves as a card; the one page that says what the
// record is for had no card at all, so it could only travel as a screenshot with its
// source cut off.
//
// What the card carries is deliberately the same four things the page promises: the mark,
// the sentence it means, the three terms, and the empty signature line. That last one is
// the reason it is art rather than a poster — a card that says "not yet signed by a
// person" cannot pretend to authority, and that is exactly what makes it worth sending.
//
// Drawn on the reader's own device, like every other card here. Nothing of theirs leaves
// it and no server draws anything.

const W = 1080;
const H = 1350;

const PAPER = '#f4efe4';
const INK = '#141210';
const MARK = '#cc2d2a';
const MUTED = '#5a5246';

// A canvas cannot read a CSS token and cannot wait for a webfont, so the card asks for the
// record's own faces and falls back to two that are on every phone on earth. A picture that
// arrives set in the wrong face is worse than one that arrives slightly plainer.
const SERIF = "'Source Serif 4', Georgia, 'Times New Roman', serif";
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const PAD = 84;
const MAXW = W - PAD * 2;

const TERMS = [
  ['01', 'Every entry names what said it.'],
  ['02', 'No funder’s name on the door.'],
  ['03', 'Anyone can check it without us.'],
];

const MEANING =
  'Nothing above the line and nothing hidden below it. Nobody takes more than they give, and the record is bound by the rule it asks of everyone else.';

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

  g.fillStyle = PAPER;
  g.fillRect(0, 0, W, H);

  g.textBaseline = 'alphabetic';

  // ── the imprint line: where this comes from, and what it is ──
  g.font = `600 26px ${MONO}`;
  letterSpacing(g, '5px');
  g.fillStyle = MUTED;
  g.textAlign = 'left';
  g.fillText('THE RECORD OF THE TIME', PAD, 104);
  g.textAlign = 'right';
  g.fillStyle = MARK;
  g.fillText('THE COVENANT', W - PAD, 104);
  letterSpacing(g, '0px');

  // ── the mark: three characters, at the size a mark takes ──
  // Measured rather than guessed, so no device draws it wider than the sheet.
  let markSize = 300;
  g.font = `700 ${markSize}px ${SERIF}`;
  const markText = 'x\u00A0=\u00A0x';
  if (g.measureText(markText).width > MAXW) {
    markSize = Math.floor((markSize * MAXW) / g.measureText(markText).width);
    g.font = `700 ${markSize}px ${SERIF}`;
  }
  g.fillStyle = MARK;
  g.textAlign = 'center';
  g.fillText(markText, W / 2, 440);
  g.textAlign = 'left';

  // ── the sentence, and the rule it sits under ──
  g.fillStyle = MARK;
  g.fillRect(PAD, 508, MAXW, 3);

  g.font = `400 72px ${SERIF}`;
  g.fillStyle = INK;
  g.fillText('Nobody above anybody.', PAD, 606);

  g.font = `400 34px ${SERIF}`;
  g.fillStyle = MUTED;
  wrap(g, MEANING, MAXW).slice(0, 4).forEach((line, i) => {
    g.fillText(line, PAD, 678 + i * 48);
  });

  // ── the three terms, numbered, as on the page ──
  let y = 900;
  TERMS.forEach(([no, term]) => {
    g.font = `600 26px ${MONO}`;
    letterSpacing(g, '3px');
    g.fillStyle = MARK;
    g.fillText(no, PAD, y);
    letterSpacing(g, '1px');
    g.fillStyle = INK;
    g.fillText(term.toUpperCase(), PAD + 74, y);
    y += 62;
  });
  letterSpacing(g, '0px');

  // ── the unsigned line: the reason this cannot pretend to authority ──
  g.fillStyle = 'rgba(20,18,16,0.22)';
  g.fillRect(PAD, 1148, MAXW, 2);

  g.font = `600 26px ${MONO}`;
  letterSpacing(g, '4px');
  g.fillStyle = MUTED;
  const unsigned = 'NOT YET SIGNED BY A PERSON';
  g.fillText(unsigned, PAD, 1206);
  // the ruled space where a signature goes, left empty on purpose
  const unsignedWidth = g.measureText(unsigned).width;
  g.fillStyle = 'rgba(20,18,16,0.35)';
  g.fillRect(PAD + unsignedWidth + 28, 1190, MAXW - unsignedWidth - 28, 2);
  letterSpacing(g, '0px');

  // ── where to find it ──
  const address = String(origin || '').replace(/^https?:\/\//, '');
  if (address) {
    g.font = `500 23px ${MONO}`;
    letterSpacing(g, '1px');
    g.fillStyle = MUTED;
    g.fillText(address, PAD, 1298);
  }
  g.font = `700 23px ${MONO}`;
  letterSpacing(g, '4px');
  g.fillStyle = MARK;
  g.textAlign = 'right';
  g.fillText('x = x', W - PAD, 1298);
  g.textAlign = 'left';
  letterSpacing(g, '0px');

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
}