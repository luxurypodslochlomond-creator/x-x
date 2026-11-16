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
export default function RecordPaintedBand({ position = 'center 32%', strength = 0.5, className = '', children }) {
  return (
    <div className={`relative overflow-hidden bg-[#241d16] ${className}`}>
      <RecordCover position={position} strength={strength} blend="screen" />
      {/* Light at the top, ink at the bottom: the painting is the room, and the words are
          printed on the page, so the ink gathers exactly where the type sits. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(36,29,22,.34) 0%, rgba(36,29,22,.58) 48%, rgba(36,29,22,.86) 82%, #241d16 100%)',
        }}
      />
      {children}
    </div>
  );
}