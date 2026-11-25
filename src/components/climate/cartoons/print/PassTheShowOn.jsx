import React, { useState } from 'react';
import { recordAddress } from '@/components/climate/recordAddress';

// ── PASS IT ON ─────────────────────────────────────────────────────────────────
// The show has to leave the room the way the drawings did: hand to hand. There is no
// broadcast here and there cannot be — a phone only takes something it was handed, and
// the record has no list of anybody's numbers to push to. What it can do is make the hand
// -over one tap: this button opens the phone's own share sheet, so the show goes into the
// group chat the room is already in (WhatsApp, Signal, Telegram, mail) and every mate in
// it has it before the next drawing goes up. On a laptop, where there is no share sheet,
// it copies the address instead.
//
// No QR, nothing stored, nothing counted. The whole exhibition lives in its own address,
// which is why passing the address on is passing the show on: the person who opens it sees
// the same drawings, in the same order, with the same credits, and can pass it on again.
export default function PassTheShowOn({ showName, count }) {
  const [said, setSaid] = useState('');
  const [address, setAddress] = useState('');

  const line = showName
    ? `${showName} · Together We Can Change Climate · the cartoon room`
    : `An exhibition of ${count} ${count === 1 ? 'drawing' : 'drawings'} · Together We Can Change Climate · the cartoon room`;

  const pass = async () => {
    // The record's own address, never the one in this window's bar: passing a show on from
    // inside the builder's preview frame would hand a mate a link that opens nowhere. The
    // show travels on the record's home, exactly as a citation does.
    const url = recordAddress(`${window.location.pathname}${window.location.search}`);
    setSaid('');
    if (navigator.share) {
      try {
        await navigator.share({ title: line, text: line, url });
        return;
      } catch (error) {
        // They opened the share sheet and changed their mind. Say nothing: they know.
        if (error && error.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setSaid('Copied. Paste it into the group chat.');
    } catch {
      setAddress(url);
      setSaid('Copy this address:');
    }
  };

  return (
    <span className="ex-pass-wrap">
      <button type="button" className="ex-pass" onClick={pass}>Pass it on</button>
      {said && <span className="ex-pass-said" role="status">{said}</span>}
      {address && <input className="ex-pass-address" value={address} readOnly onFocus={(e) => e.target.select()} />}
    </span>
  );
}