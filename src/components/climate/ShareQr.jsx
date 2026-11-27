import React, { useEffect, useState } from 'react';

// ── THE DOOR THAT OPENS WHERE A LINK DOES NOT ────────────────────────────────
// A record that will not leave anybody out cannot hand WeChat a foreign address: the link
// is stopped before it is ever opened. A QR code is not a link — it is the address, drawn —
// so it crosses that wall, and it crosses a workshop room too, where the fastest way to get
// the record onto forty phones is to hold one screen up. Drawn here, in the reader's own
// browser, so the address never has to be sent anywhere to become a picture.
export default function ShareQr({ link }) {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    let live = true;
    import('qrcode')
      .then((module) => module.default.toDataURL(link, { margin: 1, width: 320, color: { dark: '#1a1612', light: '#ffffff' } }))
      .then((url) => { if (live) setSrc(url); })
      .catch(() => { /* no picture is better than a broken one */ });
    return () => { live = false; };
  }, [link]);
  if (!src) return <p className="text-xs text-record-muted">Drawing the code…</p>;
  return (
    <div className="flex items-center gap-3">
      <img src={src} alt={`QR code for ${link}`} className="h-28 w-28 shrink-0 rounded border border-record-ink/15 bg-white p-1" />
      <p className="text-xs leading-relaxed text-record-muted">
        Point a phone camera at this. It is the same address, and it opens where a link is stopped.
      </p>
    </div>
  );
}