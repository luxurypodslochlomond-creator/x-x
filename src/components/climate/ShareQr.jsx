import React, { useEffect, useState } from 'react';

// ── THE MARK IS A HOLE IN THE CODE ───────────────────────────────────────────
// Brian, 27 November: "x = x in the QR looks odd… anything coolasfuck new like that?"
//
// Two faults, and one of them was real.
//
// The real one: the code was drawn to a fixed 480 pixels whatever its module count, so the
// modules landed on fractional pixels and came out slightly different sizes — soft edges,
// uneven squares. That is exactly what makes a scanner hesitate in a bad light. It is now
// sized to a whole multiple of its own module count, so every square is identical and sharp.
//
// The odd one: the mark was a solid black plate with white letters stuck in the middle, like
// a sticker on a window. So it is a knockout now — the × is simply missing from the code,
// punched clean through it. Nothing is pasted on top, nothing is covered: the code was built
// around the mark, and at the highest correction level it never notices losing it. And it is
// one stroke rather than five letters, because "x = x" at the size a phone shows a code is
// four pixels tall and reads as dirt. The full mark sits under the code, at the size a person
// can actually read it.
export default function ShareQr({ link }) {
  const [src, setSrc] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let live = true;
    const draw = async () => {
      const QRCode = (await import('qrcode')).default;

      // Whole pixels per module, so no square is ever a fraction bigger than its neighbour.
      const probe = QRCode.create(link, { errorCorrectionLevel: 'H' });
      const count = probe.modules.size;
      const scale = Math.max(4, Math.round(480 / count));
      const size = count * scale;

      const canvas = document.createElement('canvas');
      await QRCode.toCanvas(canvas, link, {
        errorCorrectionLevel: 'H',
        margin: 0,
        width: size,
        color: { dark: '#1a1612', light: '#ffffff' },
      });

      // The × punched through the middle: the record's paper, no plate, no border.
      const ctx = canvas.getContext('2d');
      const arm = size * 0.105;
      const centre = size / 2;
      ctx.strokeStyle = '#f4efe4';
      ctx.lineWidth = Math.max(6, scale * 1.7);
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(centre - arm, centre - arm);
      ctx.lineTo(centre + arm, centre + arm);
      ctx.moveTo(centre + arm, centre - arm);
      ctx.lineTo(centre - arm, centre + arm);
      ctx.stroke();

      if (live) setSrc(canvas.toDataURL('image/png'));
    };
    draw().catch(async () => {
      try {
        const QRCode = (await import('qrcode')).default;
        const url = await QRCode.toDataURL(link, { margin: 0, width: 480, color: { dark: '#1a1612', light: '#ffffff' } });
        if (live) setSrc(url);
      } catch { if (live) setFailed(true); }
    });
    return () => { live = false; };
  }, [link]);

  if (failed) return null;
  if (!src) return <p className="text-xs text-record-muted">Drawing the code…</p>;
  return (
    <div className="flex items-center gap-4">
      <img src={src} alt={`QR code for ${link}, with the record's × punched through it`} className="h-40 w-40 shrink-0 bg-white" />
      <div>
        <p className="font-mono text-sm font-bold text-record-signal">x = x</p>
        <p className="mt-1 text-xs leading-relaxed text-record-muted">
          The address, drawn — the × is missing from the code itself, and it still opens. Point a phone camera at it: no account, no app, and it works where a link is stopped.
        </p>
      </div>
    </div>
  );
}