import React from 'react';
import { SunFace } from '@/components/climate/cartoons/CartoonInkIcons';
import { CARTOON_COVER } from '@/components/climate/cartoons/cartoonEvent';

// ── THE ROOM'S NAME, ON ITS OWN ─────────────────────────────────────────────────
// This block used to live inside ComicReader, which meant the room's title could only ever
// appear attached to the record's own strip — so the thirteen drawings by What On Earth!®
// for CEEW came after a masthead that belonged to a different piece of work, and after a
// text dateline before that. Brian, 18 November: "why not picture page". He is right: a
// room of drawings has to open on drawings.
//
// The name is now its own small thing, so the page can say what the room is called and then
// get out of the way of the pictures. Nothing about it changed — the same tilted title, the
// same yellow slap, the same red stop — it simply stopped being bolted to the strip.
//
// The eyebrow used to read "A little mischief. A bigger picture." Brian, 18 November:
// "saying a little mischief weird to me bro" — and he is right, it is the voice of a
// leaflet pretending to be naughty. These drawings are not mischievous: they are how a
// lot of people say what is happening to them, because a drawing gets past the door where
// a paragraph does not. So the room says that instead, in three words, on the plate.
//
// AND THE COVER IS BEHIND THE NAME.
// "be grand if our existing coolasfuck cover [had] translucency behind it somehow bro
// instead of black box." The name was printed on a flat black slab, which is a poster
// with the picture switched off. The plate now carries Francis's own cover artwork behind
// the lettering, held back under ink so the type still reads at arm's length — the same
// cover shown whole, further down, with his name under it. Nothing is cropped out of the
// room: the whole cover still stands in the catalogue band. This is the picture used as
// ground, the way a comic's cover is printed on the same sheet as its masthead.
export default function ComicMasthead() {
  return (
    <header
      className="comic-masthead"
      style={{ '--comic-cover-layer': `url('${CARTOON_COVER}')` }}
    >
      <p className="comic-eyebrow record-meta"><SunFace size={26} className="cmark-inline" />Drawn, not explained.</p>
      <h1 className="comic-title">The Big<br /><span>Picture</span><span className="comic-title-stop" aria-hidden="true">!</span></h1>
      <p className="comic-tagline record-meta">Cartoons for a changing world</p>
    </header>
  );
}