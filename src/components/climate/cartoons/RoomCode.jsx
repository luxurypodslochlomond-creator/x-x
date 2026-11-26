import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

// ── THE ADDRESS, AS A PICTURE SOMEBODY CAN PRINT ───────────────────────────────
// Brian, 26 November: "qr wise bro… if looks coolasfuck for right reasons doesn't mess
// with soul and works to help planet bri coolasfuck as we need it why not?"
//
// Three conditions, and each one is a rule rather than a taste:
//
//   1. IT IS DRAWN HERE. The code is made in the reader's own browser from the room's
//      own address. No picture service, no shortener, no redirect that could outlive us
//      or start counting who scanned. A record that argues against being tracked cannot
//      hand its address to a stranger to draw.
//
//   2. IT IS INK ON BONE, not a black square. The code is set in the record's own two
//      colours — the ink the words are printed in, on the bone its plates sit on — so it
//      reads as a mark the record made rather than as restaurant furniture. Level H
//      correction, the highest there is: a code that survives a photocopier, a fold and a
//      thumb is the only kind worth printing.
//
//   3. IT IS NEVER ALONE. A code with no words beside it is a barrier to anyone whose
//      camera is old, whose hands are not steady, or who simply does not know what to do
//      with it. The address is printed in full on the page wherever this sits, and the
//      caption says what the code opens. A door with no sign is a wall.
export default function RoomCode({ text, caption, size = 124 }) {
  const [src, setSrc] = useState('');

  useEffect(() => {
    let live = true;
    QRCode.toDataURL(text, {
      margin: 1,
      errorCorrectionLevel: 'H',
      width: 512,
      color: { dark: '#1a1612', light: '#efe7d6' },
    })
      .then((url) => {
        if (live) setSrc(url);
      })
      // The page still reads without it: the address is in words above, and a code that
      // failed to draw must not take the words down with it.
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [text]);

  return (
    <figure className="mt-3 flex items-start gap-3 border-t border-record-ink/15 pt-3">
      <div
        className="shrink-0 border border-record-ink/20 bg-record-bone p-1"
        style={{ width: size, height: size }}
      >
        {src && (
          <img
            src={src}
            alt={`A code that opens ${text}`}
            width={size}
            height={size}
            className="block h-full w-full"
          />
        )}
      </div>
      <figcaption className="text-[11px] leading-snug text-record-muted">
        {caption || 'The wall, as a code. Print it, or hold a phone up to it.'}
        <span className="mt-1 block break-all font-mono text-[10.5px] text-record-ink/70">{text}</span>
      </figcaption>
    </figure>
  );
}