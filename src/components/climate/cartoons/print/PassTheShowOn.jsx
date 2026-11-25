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
    //
    // It travels as the card address rather than the bare one, because a chat window shows
    // whatever the link's own page says about itself: the card knows which show this is,
    // how many drawings and whose hands, all counted from what a keeper has published. A
    // person who taps it is sent straight on to the show itself.
    const params = new URLSearchParams(window.location.search);
    const ids = params.get('ids') || '';
    const name = params.get('t') || '';
    const url = ids
      ? recordAddress(`/functions/ogRedirect?page=ClimateCartoons%2FExhibition&ids=${encodeURIComponent(ids)}${name ? `&t=${encodeURIComponent(name)}` : ''}`)
      : recordAddress(`${window.location.pathname}${window.location.search}`);
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
      {/* THE WORD ON THE CONTROL IS "SHARE" ─────────────────────────────────────
          "Pass it on" is a sentence this record can say — it is how the drawings got here,
          hand to hand — but on a button it reads as an ask, and in a WhatsApp world it
          reads as a chain letter: pass this to ten friends. "Pay it forward" is worse: it
          turns being handed a drawing into a debt with a moral bill attached, and a
          cartoonist who looks at a wall does not owe anybody anything for looking.
          "Share" is the plainest verb there is, it is the same word on every phone on
          earth, and nobody can make it sound like a dare. The reason still travels — it
          is in the line above, which names the show and the room instead of nagging. */}
      <button type="button" className="ex-pass" onClick={pass}>Share</button>
      {said && <span className="ex-pass-said" role="status">{said}</span>}
      {address && <input className="ex-pass-address" value={address} readOnly onFocus={(e) => e.target.select()} />}
    </span>
  );
}