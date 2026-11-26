import React, { useEffect, useRef, useState } from 'react';

// ── THE MARK, AS A FILE YOU CAN HOLD ────────────────────────────────────────────
// The record's mark is x = x, printed in the red borrowed from the O Superman sleeve
// (#CC2D2A, measured off that artwork) on the record's own warm paper. It is drawn here
// in the browser at full size, so what gets uploaded is a real PNG at real dimensions —
// not a screenshot of a page, and not a machine's guess at what the mark looks like.
//
// Two pictures, because the two places want different shapes:
//   the square — 1024 × 1024, for the app logo
//   the card   — 1200 × 630,  for the picture a shared link shows
//
// The typeface is the record's own UI face, already travelling with the site. If it has
// not arrived yet the browser falls back to Helvetica and the mark is still the mark.

const PAPER = '#f4efe4';
const MARK = '#cc2d2a';
const INK = '#141210';
const MUTED = '#6b6258';
const FACE = '"Record UI", Helvetica, Arial, sans-serif';

function ground(ctx, w, h) {
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = 'rgba(20,18,16,0.10)';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, w - 2, h - 2);
}

function drawLogo(ctx, w, h) {
  ground(ctx, w, h);
  ctx.fillStyle = MARK;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `bold ${Math.round(w * 0.26)}px ${FACE}`;
  ctx.fillText('x = x', w / 2, h / 2);
}

function drawCard(ctx, w, h) {
  ground(ctx, w, h);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = MARK;
  ctx.font = `bold ${Math.round(h * 0.26)}px ${FACE}`;
  ctx.fillText('x = x', w * 0.07, h * 0.44);
  ctx.fillStyle = INK;
  ctx.font = `bold ${Math.round(h * 0.075)}px ${FACE}`;
  ctx.fillText('A public record of the climate.', w * 0.07, h * 0.66);
  ctx.fillStyle = MUTED;
  ctx.font = `${Math.round(h * 0.045)}px ${FACE}`;
  ctx.fillText('Dated. Sourced. Signed.', w * 0.07, h * 0.79);
}

const MARKS = [
  { id: 'logo', label: 'The mark · square · 1024 × 1024', file: 'uf51-mark.png', w: 1024, h: 1024, draw: drawLogo, note: 'For the app logo.' },
  { id: 'card', label: 'The card · wide · 1200 × 630', file: 'uf51-card.png', w: 1200, h: 630, draw: drawCard, note: 'For the picture a shared link shows.' },
];

function MarkSheet({ label, note, file, w, h, draw }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    const paint = () => {
      const canvas = ref.current;
      if (!canvas || !alive) return;
      draw(canvas.getContext('2d'), w, h);
      setReady(true);
    };
    if (document.fonts?.load) {
      document.fonts.load(`bold 100px "Record UI"`).then(paint).catch(paint);
    } else {
      paint();
    }
    return () => { alive = false; };
  }, [draw, w, h]);

  const save = () => {
    const canvas = ref.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    }, 'image/png');
  };

  return (
    <section className="mb-10">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6b6258]">{label}</p>
        <button
          type="button"
          onClick={save}
          disabled={!ready}
          className="border border-[#141210] bg-[#141210] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#f4efe4] transition-colors hover:bg-[#cc2d2a] hover:border-[#cc2d2a] disabled:opacity-40"
        >
          {ready ? 'Save the picture' : 'Drawing…'}
        </button>
      </div>
      <canvas
        ref={ref}
        width={w}
        height={h}
        role="img"
        aria-label={label}
        className="block h-auto w-full border border-[#141210]/15"
      />
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6b6258]">
        {note} On a phone, press and hold the picture and choose Save Image.
      </p>
    </section>
  );
}

export default function BrandMark() {
  return (
    <div className="min-h-screen bg-[#f4efe4] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#6b6258]">The record's mark</h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#141210]">
          Two pictures, drawn from the record's own ink and paper rather than picked from a palette:
          the red is the one measured off the O Superman sleeve, the ground is the warm paper every
          page is printed on. Save either one and upload it where it belongs.
        </p>
        <div className="mt-8">
          {MARKS.map((m) => <MarkSheet key={m.id} {...m} />)}
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6b6258]">
          x = x · Universal Frequency 51 CIC
        </p>
      </div>
    </div>
  );
}