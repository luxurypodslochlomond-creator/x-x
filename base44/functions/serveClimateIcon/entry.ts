/**
 * THE RECORD'S MARK, AS A REAL PICTURE.
 *
 * Every preview this record ever sent was an SVG. WhatsApp, Facebook, LinkedIn, iMessage and
 * Telegram all refuse an SVG as a card image — so they dropped the card and the message went
 * out as a naked link. The generated images on storage looked right but were JPEGs wearing a
 * .png name, 1024 square: honest enough for a chat, wrong for an icon and wrong for the 1.91:1
 * shape a link card wants.
 *
 * So the mark is drawn here instead, once, as bytes: flat paper, one signal pulse, no lettering
 * that could be misspelled, and the exact pixel size asked for. Pure PNG, no dependency, no
 * storage, nothing to go stale.
 *
 *   /api/functions/serveClimateIcon                 512 x 512   home screen
 *   /api/functions/serveClimateIcon?size=192        192 x 192   manifest
 *   /api/functions/serveClimateIcon?size=180        180 x 180   apple-touch-icon
 *   /api/functions/serveClimateIcon?w=1200&h=630    link card
 *   /api/functions/serveClimateIcon?size=512&mark=full      the name, x = x, as strokes
 *   /api/functions/serveClimateIcon?size=32&mark=equals     the tab, where three glyphs cannot go
 */

const PAPER: [number, number, number] = [244, 239, 228]; // the record's warm paper
const SIGNAL: [number, number, number] = [179, 38, 30]; // the record's signal red

// ── PNG ─────────────────────────────────────────────────────────────────────
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type: string, data: Uint8Array): Uint8Array {
  const out = new Uint8Array(12 + data.length);
  const view = new DataView(out.buffer);
  view.setUint32(0, data.length);
  for (let i = 0; i < 4; i++) out[4 + i] = type.charCodeAt(i);
  out.set(data, 8);
  const body = out.subarray(4, 8 + data.length);
  view.setUint32(8 + data.length, crc32(body));
  return out;
}

async function deflate(bytes: Uint8Array): Promise<Uint8Array> {
  const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate'));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function encodePng(pixels: Uint8Array, w: number, h: number): Promise<Uint8Array> {
  // Filter byte 0 on every scanline: flat colour compresses beautifully without prediction.
  const raw = new Uint8Array((w * 3 + 1) * h);
  for (let y = 0; y < h; y++) {
    const src = y * w * 3;
    const dst = y * (w * 3 + 1);
    raw[dst] = 0;
    raw.set(pixels.subarray(src, src + w * 3), dst + 1);
  }

  const ihdr = new Uint8Array(13);
  const hv = new DataView(ihdr.buffer);
  hv.setUint32(0, w);
  hv.setUint32(4, h);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // truecolour RGB
  ihdr[10] = 0; // deflate
  ihdr[11] = 0; // adaptive filtering
  ihdr[12] = 0; // no interlace

  const parts = [
    new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', await deflate(raw)),
    chunk('IEND', new Uint8Array(0)),
  ];

  const total = parts.reduce((n, p) => n + p.length, 0);
  const png = new Uint8Array(total);
  let at = 0;
  for (const p of parts) {
    png.set(p, at);
    at += p.length;
  }
  return png;
}

// ── THE DRAWING ─────────────────────────────────────────────────────────────
// One stroke, drawn as a chain of thick segments. Each segment only touches the pixels in
// its own box, so even the 1200 x 630 card is a few milliseconds of work and an impatient
// crawler still gets its picture.
function stroke(
  pixels: Uint8Array, w: number, h: number,
  x1: number, y1: number, x2: number, y2: number,
  r: number,
) {
  const minx = Math.max(0, Math.floor(Math.min(x1, x2) - r - 1));
  const maxx = Math.min(w - 1, Math.ceil(Math.max(x1, x2) + r + 1));
  const miny = Math.max(0, Math.floor(Math.min(y1, y2) - r - 1));
  const maxy = Math.min(h - 1, Math.ceil(Math.max(y1, y2) + r + 1));
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len2 = dx * dx + dy * dy || 1;
  const r2 = r * r;

  for (let y = miny; y <= maxy; y++) {
    for (let x = minx; x <= maxx; x++) {
      const px = x + 0.5;
      const py = y + 0.5;
      let t = ((px - x1) * dx + (py - y1) * dy) / len2;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const ex = x1 + t * dx - px;
      const ey = y1 + t * dy - py;
      if (ex * ex + ey * ey <= r2) {
        const i = (y * w + x) * 3;
        pixels[i] = SIGNAL[0];
        pixels[i + 1] = SIGNAL[1];
        pixels[i + 2] = SIGNAL[2];
      }
    }
  }
}

function drawMark(w: number, h: number): Uint8Array {
  const pixels = new Uint8Array(w * h * 3);
  // Paper first.
  for (let i = 0; i < pixels.length; i += 3) {
    pixels[i] = PAPER[0];
    pixels[i + 1] = PAPER[1];
    pixels[i + 2] = PAPER[2];
  }

  const unit = Math.min(w, h);
  const thickness = Math.max(2, Math.round(unit * 0.045));
  const r = thickness / 2;
  const mid = h / 2;
  const amp = h * 0.28;

  // The pulse, as fractions of the run — the same shape the record draws in the page.
  const shape: Array<[number, number]> = [
    [0, 0], [0.14, 0], [0.21, -0.62], [0.28, 0], [0.335, 1],
    [0.40, 0], [0.52, 0], [0.60, -0.32], [0.68, 0], [1, 0],
  ];

  const x0 = w * 0.19;
  const runX = w * 0.64;
  const points = shape.map(([fx, fy]) => [x0 + fx * runX, mid + fy * amp] as [number, number]);

  for (let i = 1; i < points.length; i++) {
    stroke(
      pixels, w, h,
      points[i - 1][0], points[i - 1][1],
      points[i][0], points[i][1],
      r,
    );
  }

  // The dot the pulse leaves from — the one mark that survives being shrunk to a thumbnail.
  const dotR = Math.max(1.5, unit * 0.026);
  stroke(pixels, w, h, w * 0.11, mid, w * 0.11, mid, dotR);

  return pixels;
}

// ── THE NAME, DRAWN THE SAME WAY ────────────────────────────────────────────
// The pulse above is the record's signal; this is its name. x = x, as three glyphs made
// of straight lines — never set in a font, because a home screen icon cannot ask a phone
// which fonts it has, and a mark that changes shape on every device is not a mark.
//
// Sized to 0.69 of the square so it survives Android's mask, which crops an icon to a
// circle and keeps only the middle eighty per cent: a mark that loses its outer strokes
// to the mask is not on the home screen, it is a fragment on the home screen.
function drawName(w: number, h: number, equalsOnly: boolean): Uint8Array {
  const pixels = new Uint8Array(w * h * 3);
  for (let i = 0; i < pixels.length; i += 3) {
    pixels[i] = PAPER[0];
    pixels[i + 1] = PAPER[1];
    pixels[i + 2] = PAPER[2];
  }

  const unit = Math.min(w, h);
  const bar = Math.max(2, Math.round(unit * 0.062));
  const r = bar / 2;
  const mid = h / 2;

  if (equalsOnly) {
    // At tab size three glyphs become a smudge, so the mark reduces to its claim.
    const eqW = unit * 0.52;
    const gapY = unit * 0.15;
    const x0 = (w - eqW) / 2;
    stroke(pixels, w, h, x0, mid - gapY, x0 + eqW, mid - gapY, r);
    stroke(pixels, w, h, x0, mid + gapY, x0 + eqW, mid + gapY, r);
    return pixels;
  }

  const H = unit * 0.24;
  const xW = H * 0.8;
  const eqW = H * 0.6;
  const gap = H * 0.34;
  const total = xW * 2 + eqW + gap * 2;
  const left = (w - total) / 2;
  const top = mid - H / 2;
  const bottom = mid + H / 2;

  // x
  stroke(pixels, w, h, left, top, left + xW, bottom, r);
  stroke(pixels, w, h, left + xW, top, left, bottom, r);

  // =
  const eqX = left + xW + gap;
  const spread = H * 0.22;
  stroke(pixels, w, h, eqX, mid - spread, eqX + eqW, mid - spread, r);
  stroke(pixels, w, h, eqX, mid + spread, eqX + eqW, mid + spread, r);

  // x
  const lastX = eqX + eqW + gap;
  stroke(pixels, w, h, lastX, top, lastX + xW, bottom, r);
  stroke(pixels, w, h, lastX + xW, top, lastX, bottom, r);

  return pixels;
}

Deno.serve(async (req) => {
  try {
    const url = new URL(req.url);
    const size = Number(url.searchParams.get('size') || 0);
    const requestedW = Number(url.searchParams.get('w') || 0) || size || 512;
    const requestedH = Number(url.searchParams.get('h') || 0) || size || 512;

    // Never let a query string ask for a picture the server cannot afford to draw.
    const w = Math.max(16, Math.min(2400, Math.round(requestedW)));
    const h = Math.max(16, Math.min(2400, Math.round(requestedH)));

    const mark = url.searchParams.get('mark');
    const png = await encodePng(mark ? drawName(w, h, mark === 'equals') : drawMark(w, h), w, h);

    return new Response(png, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600',
        'Content-Length': String(png.length),
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('serveClimateIcon failed:', error);
    return Response.json({ error: 'Could not draw the mark' }, { status: 500 });
  }
});