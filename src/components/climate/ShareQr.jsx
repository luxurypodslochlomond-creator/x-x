import React, { useEffect, useState } from 'react';

// ── THE MARK INSIDE THE CODE ─────────────────────────────────────────────────
// Brian, 27 November: "thought QR code could carry the record's mark inside it… could have
// layers… is this possible?"
//
// It is possible, and it is not a trick. A QR code is built to survive damage: at the
// highest correction level it can lose nearly a third of itself and still give back exactly
// what it holds. So the middle of this one carries x = x — not printed on top of the code,
// but cut into it, with the code's own spare capacity doing the work. Nothing about the
// address changes. Point a camera at it and the same page comes back.
//
// That is why it earns its place. It is the record's own argument, made in a picture: a
// mark and a fact occupying the same square, neither of them damaged by the other. Nothing
// is measured, nothing is asked for, and it opens with no account and no app — which is the
// opposite of what a code on a poster usually does.
//
// And it is layered honestly: white quiet zone, the mark's own plate, the ink of the code
// around it, the record's paper beneath. Four layers, each doing one job.
export default function ShareQr({ link }) {
  const [src, setSrc] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let live = true;
    const draw = async () => {
      const module = await import('qrcode');
      const QRCode = module.default;

      // Highest correction level: the centre can be covered and the code still resolves.
      const canvas = document.createElement('canvas');
      await QRCode.toCanvas(canvas, link, {
        errorCorrectionLevel: 'H',
        margin: 0,
        width: 420,
        color: { dark: '#1a1612', light: '#ffffff' },
      });

      const ctx = canvas.getContext('2d');
      const size = canvas.width;
      const plate = Math.round(size * 0.24);
      const x = Math.round((size - plate) / 2);

      // A breath of white around the plate, so the mark never touches a module.
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x - 8, x - 8, plate + 16, plate + 16);
      // The plate itself: the record's ink, so the mark sits in the same square as the code.
      ctx.fillStyle = '#1a1612';
      ctx.fillRect(x, x, plate, plate);
      // The mark, on paper, in the record's own hand.
      ctx.fillStyle = '#f4efe4';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `700 ${Math.round(plate * 0.34)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.fillText('x = x', size / 2, size / 2 + plate * 0.02);

      if (live) setSrc(canvas.toDataURL('image/png'));
    };
    draw().catch(async () => {
      // If the marked code cannot be drawn, a plain one is still a door.
      try {
        const module = await import('qrcode');
        const url = await module.default.toDataURL(link, { margin: 0, width: 420, color: { dark: '#1a1612', light: '#ffffff' } });
        if (live) setSrc(url);
      } catch { if (live) setFailed(true); }
    });
    return () => { live = false; };
  }, [link]);

  if (failed) return null;
  if (!src) return <p className="text-xs text-record-muted">Drawing the code…</p>;
  return (
    <div className="rounded border border-record-ink/15 bg-record-bone p-3">
      <div className="flex items-center gap-3">
        <img src={src} alt={`QR code for ${link}, carrying the record's mark`} className="h-32 w-32 shrink-0 bg-white" />
        <div className="min-w-0">
          <p className="text-xs leading-relaxed text-record-muted">
            The address, drawn — with x = x cut into the middle of it. The code is built to lose a third of itself and still open, so the mark costs it nothing.
          </p>
          <p className="mt-1 text-xs leading-relaxed text-record-muted">
            Point a phone camera at it. No account, no app, and it opens where a link is stopped.
          </p>
        </div>
      </div>
    </div>
  );
}