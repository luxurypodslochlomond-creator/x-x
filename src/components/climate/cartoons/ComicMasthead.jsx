import React from 'react';

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
export default function ComicMasthead() {
  return (
    <header className="comic-masthead">
      <p className="comic-eyebrow record-meta">A little mischief. A bigger picture.</p>
      <h1 className="comic-title">The Big<br /><span>Picture</span><span className="comic-title-stop" aria-hidden="true">!</span></h1>
      <p className="comic-tagline record-meta">Cartoons for a changing world</p>
    </header>
  );
}