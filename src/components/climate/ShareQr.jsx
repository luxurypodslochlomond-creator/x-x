import React, { useEffect, useState } from 'react';

// ── THE DOOR THAT OPENS WHERE A LINK DOES NOT ────────────────────────────────
// A record that will not leave anybody out cannot hand WeChat a foreign address: the link
// is stopped before it is ever opened. A QR code is not a link — it is the address, drawn —
// so it crosses that wall, and it crosses a workshop room too, where the fastest way to get
// the record onto forty phones is to hold one screen up.
//
// And it is the one picture on this record that is also a fact: a grid of marks that holds
// an entire page and gives it back exactly, unchanged, to anyone who points at it. No
// account, no app, no permission, nothing counted. It is x = x with squares instead of
// letters — the same thing said in a language a camera reads. So the mark stands beside it
// rather than the code standing alone looking like a barcode.
//
// Drawn here, in the reader's own browser, so the address never leaves the device to
// become a picture.
export default function ShareQr({ link }) {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    let live = true;
    import('qrcode')
      .then((module) => module.default.toDataURL(link, { margin: 0, width: 420, color: { dark: '#1a1612', light: '#ffffff' } }))
      .then((url) => { if (live) setSrc(url); })
      .catch(() => { /* no picture is better than a broken one */ });
    return () => { live = false; };
  }, [link]);
  if (!src) return <p className="text-xs text-record-muted">Drawing the code…</p>;
  return (
    <div className="rounded border border-record-ink/15 bg-record-bone p-3">
      <div className="flex items-center gap-3">
        <img src={src} alt={`QR code for ${link}`} className="h-32 w-32 shrink-0 bg-white p-1.5" />
        <div className="min-w-0">
          <p className="font-mono text-sm font-black tracking-[0.24em] text-record-ink">x = x</p>
          <p className="mt-1 text-xs leading-relaxed text-record-muted">
            The same address, drawn. Point a phone camera at it — it opens where a link is stopped, and it needs no account to open.
          </p>
        </div>
      </div>
    </div>
  );
}