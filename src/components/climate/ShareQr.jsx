import React, { useEffect, useState } from 'react';

// ── THE CODE IS PRINTED ON THE RECORD'S PAPER ────────────────────────────────
// Brian, 27 November: "can the pattern be different and our OG colours?"
//
// The colours, yes — and it is the one change that makes it look like it belongs here. The
// code was ink on pure white, which is the colour of a utility. It is now ink on the record's
// own paper, so it reads as something printed on this page rather than an image pasted into it.
// (Contrast is still enormous: near-black on bone, which is all a scanner ever asks for.)
//
// The pattern, no — and this is worth saying plainly rather than trying it. Rounded dots,
// diamonds, little pictures in the gaps: they all scan beautifully on the phone that made
// them and fail on a cheap camera under a kitchen light, which is exactly where this code
// will be used. A code that is pretty and does not open is worse than no code at all. So the
// squares stay square, every one of them exactly the same size, and the only thing done to
// the pattern is the one thing that is free: the × is missing from it.
//
// And no more explaining. Two words under it. The paragraph that used to sit here was the
// record lecturing somebody who had already understood.
export default function ShareQr({ link, compact = false }) {
  const [src, setSrc] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let live = true;
    const draw = async () => {
      const QRCode = (await import('qrcode')).default;

      // Whole pixels per module: no square is ever a fraction bigger than its neighbour.
      const probe = QRCode.create(link, { errorCorrectionLevel: 'H' });
      const count = probe.modules.size;
      const scale = Math.max(4, Math.round(480 / count));
      const size = count * scale;

      const canvas = document.createElement('canvas');
      await QRCode.toCanvas(canvas, link, {
        errorCorrectionLevel: 'H',
        margin: 0,
        width: size,
        color: { dark: '#1a1612', light: '#f4efe4' },
      });

      // The × punched straight through the middle, in the paper's own colour.
      const ctx = canvas.getContext('2d');
      // Kept small on purpose: the × is a signature, not a hole. At this size every
      // scanner that reads the code without it reads it with it, which is the only test
      // a code printed on a card handed across a room has to pass.
      const arm = size * 0.072;
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
        const url = await QRCode.toDataURL(link, { margin: 0, width: 480, color: { dark: '#1a1612', light: '#f4efe4' } });
        if (live) setSrc(url);
      } catch { if (live) setFailed(true); }
    });
    return () => { live = false; };
  }, [link]);

  if (failed) return null;
  // The stamp: the same code at the size of a postage stamp, for the top of the window.
  // It is the one door that needs no list, so it must never be the thing you scroll to.
  if (compact) {
    return src
      ? <img src={src} alt={`QR code for ${link}, with the record's × punched through it`} className="h-[76px] w-[76px] shrink-0" />
      : <div className="h-[76px] w-[76px] shrink-0" />;
  }
  if (!src) return <p className="text-xs text-record-muted">Drawing the code…</p>;
  return (
    <div className="flex items-center gap-4">
      <img src={src} alt={`QR code for ${link}, with the record's × punched through it`} className="h-44 w-44 shrink-0" />
      <div>
        <p className="font-mono text-base font-bold leading-none text-record-signal">x = x</p>
        <p className="mt-2 text-[11px] leading-snug text-record-muted">Point a camera at it. No app, no account.</p>
      </div>
    </div>
  );
}