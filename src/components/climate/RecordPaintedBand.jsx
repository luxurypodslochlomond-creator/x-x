import React from 'react';
import RecordCover from '@/components/climate/RecordCover';

// ── ONE PAINTED BAND, SO EVERY PAGE IS STANDING IN THE SAME ROOM ────────────────
// Brian and Gillian both stopped on the map and said it was the best-looking page on the
// record, and then asked the obvious question: why does the wire not look like that, and
// the reach pages, and the rest? They were right, and the reason was not taste. Each page
// built its own dark band by hand, so the same painting was being used three different
// ways: screened through the ink on the map, absent on the wire, flattened to plain black
// on the reach pages. Three pages, one painting, three rooms.
//
// So the band is one component now. The painting is screened into the ink at half
// strength, with a gradient that lets it be strongest at the top of the band and settles
// into solid ink behind the words, so a headline never has to fight a photograph for its
// own legibility. A page that wants its own voice can still put its beacon, its number or
// its headline inside it — what it can no longer do is paint the room a different colour.
// ── AND SOMETIMES THE VEIL WAS THE PROBLEM ─────────────────────────────────────
// Brian, 17 November: "background coolasfuck image is blacked out bro." He was looking at
// the opening of the record, where the veil ran from a third of the way to full opacity
// and finished on plain ink — so the painting he had commissioned for the door was, at the
// foot of its own band, simply not there. A ground that is painted out is a black box with
// a picture behind it.
//
// The `soft` veil is the same shape at roughly half the weight, for a band whose words are
// small and few: the painting stays a room the reader can see, and the type still wins
// because it is light on dark and nothing is set over the brightest part of the picture.
// Pages that lay headings and photographs across the whole band keep the heavier veil and
// are unchanged — the default is exactly where it was.
export default function RecordPaintedBand({ position = 'center 32%', strength = 0.5, soft = false, className = '', children }) {
  const veil = soft
    ? 'linear-gradient(180deg, rgba(36,29,22,.08) 0%, rgba(36,29,22,.24) 45%, rgba(36,29,22,.46) 80%, rgba(36,29,22,.62) 100%)'
    : 'linear-gradient(180deg, rgba(36,29,22,.34) 0%, rgba(36,29,22,.58) 48%, rgba(36,29,22,.86) 82%, #241d16 100%)';
  return (
    <div className={`relative overflow-hidden bg-[#241d16] ${className}`}>
      <RecordCover position={position} strength={strength} blend="screen" />
      {/* Light at the top, ink at the bottom: the painting is the room, and the words are
          printed on the page, so the ink gathers exactly where the type sits. */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: veil }} />
      {children}
    </div>
  );
}