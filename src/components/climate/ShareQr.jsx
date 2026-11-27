import React, { useEffect, useState } from 'react';

// ── THE MARK, PRESSED INTO THE CODE ─────────────────────────────────────────
// Brian, 27 November: "x = x in QR code looks odd… can the code be dimensional coolasfuck
// or am I over thinking?"
//
// He is not overthinking, but the answer to "dimensional" is no: a code that will not scan
// is a decoration, and every trick that makes one look clever — folds, gradients, shadows,
// a photograph behind it — costs a scanner somewhere in the world that has a bad camera and
// a weak signal. The code stays flat, black on white, and boring in the one way that
// matters: it always opens.
//
// What was actually wrong was the plate. A solid black square with white letters sat in the
// middle of the code like a sticker pressed onto a window. So the mark is now the other way
// round — the record's own paper, and the ink on it — smaller, and set into the code rather
// than on top of it. A stamp, not a badge.
//
// The cleverness stays where it belongs, in the fact that it works: the code is built at the
// highest correction level, so it can lose nearly a third of itself and still give back the
// exact page. The mark costs it nothing.
export default function ShareQr({ link }) {
  const [src, setSrc] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let live = true;
    const draw = async () => {
      const module = await import('qrcode');
      const QRCode = module.default;

      const canvas = document.createElement('canvas');
      await QRCode.toCanvas(canvas, link, {
        errorCorrectionLevel: 'H',
        margin: 0,
        width: 480,
        color: { dark: '#1a1612', light: '#ffffff' },
      });

      const ctx = canvas.getContext('2d');
      const size = canvas.width;
      const plate = Math.round(size * 0.2);
      const x = Math.round((size - plate) / 2);

      // A breath of white so the mark never touches a module.
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x - 7, x - 7, plate + 14, plate + 14);
      // The record's paper, not a black block: the mark is pressed in, not stuck on.
      ctx.fillStyle = '#f4efe4';
      ctx.fillRect(x, x, plate, plate);
      ctx.strokeStyle = '#1a1612';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, x, plate, plate);
      ctx.fillStyle = '#b3261e';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `700 ${Math.round(plate * 0.3)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.fillText('x = x', size / 2, size / 2 + plate * 0.02);

      if (live) setSrc(canvas.toDataURL('image/png'));
    };
    draw().catch(async () => {
      try {
        const module = await import('qrcode');
        const url = await module.default.toDataURL(link, { margin: 0, width: 480, color: { dark: '#1a1612', light: '#ffffff' } });
        if (live) setSrc(url);
      } catch { if (live) setFailed(true); }
    });
    return () => { live = false; };
  }, [link]);

  if (failed) return null;
  if (!src) return <p className="text-xs text-record-muted">Drawing the code…</p>;
  return (
    <div className="flex items-center gap-4">
      <img src={src} alt={`QR code for ${link}, carrying the record's mark`} className="h-36 w-36 shrink-0 bg-white" />
      <p className="text-xs leading-relaxed text-record-muted">
        The address, drawn. Point a phone camera at it — it opens with no account, no app, and where a link is stopped.
      </p>
    </div>
  );
}