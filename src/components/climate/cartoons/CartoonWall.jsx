import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import CartoonPlate from '@/components/climate/cartoons/CartoonPlate';
import CartoonCloseReading from '@/components/climate/cartoons/CartoonCloseReading';
import CartoonsWaiting from '@/components/climate/cartoons/CartoonsWaiting';
import useCartoonWall from '@/components/climate/cartoons/useCartoonWall';
import useOfflineKept from '@/components/climate/cartoons/useOfflineKept';
import OfflineKept from '@/components/climate/cartoons/OfflineKept';
import { PinnedNote, TinyCrowd } from '@/components/climate/cartoons/CartoonInkIcons';

export default function CartoonWall() {
  const wall = useCartoonWall(true);
  const offline = useOfflineKept(wall.cartoons);
  const [reading, setReading] = useState(null);
  // ── THE RECORD NAMES ITS OWN GAPS ────────────────────────────────────────────
  // Five drawings were credited to a studio's brand rather than to a hand. Printing the
  // studio as though it were the artist was the wrong fix; inventing a name would be worse.
  // So the wall says the number out loud, and says whose job it is. A gap a reader can see
  // is a gap somebody will close; a gap hidden behind a logo is one nobody ever will.
  const unnamed = wall.cartoons.filter((cartoon) => cartoon.artist_name === 'Hand not yet named').length;
  return (
    <section className="comic-wall" aria-labelledby="cartoon-wall-title">
      <header className="cartoon-wall-head">
        <p className="comic-opening-eyebrow record-meta"><TinyCrowd size={26} className="cmark-inline" />Human hands. Different perspectives.</p>
        <h2 id="cartoon-wall-title" className="comic-section-title">The people’s pages.</h2>
        <p className="record-meta">Read the picture. Stay with the idea. Tap any drawing to look closer.</p>
        <p className="record-meta"><Link to="/ClimateCartoons/Thread">Read the drawings one after another ↗</Link></p>
      </header>
      {/* What this phone has actually got, counted rather than claimed. */}
      <OfflineKept offline={offline} />
      {wall.isPending && <p className="record-meta flex items-center gap-2 py-6" role="status"><Loader2 size={18} className="animate-spin" />Opening the original drawings…</p>}
      {wall.isError && !wall.keptDay && <div className="comic-wall-empty comic-error-note" role="alert"><p className="record-meta">The wall could not be opened.</p><button type="button" onClick={() => wall.refetch()} className="underline">Try again</button></div>}
      {/* No signal, and this device kept the wall: it opens anyway, and says which day it is. */}
      {wall.keptDay && (
        <p className="record-meta border-y border-record-ink/20 py-2" role="status">
          You are reading the copy this phone kept on {new Date(wall.keptDay).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}. The wall itself could not be reached — the drawings and their words are here, and nothing new can be added until the signal returns.
        </p>
      )}
      {!wall.isPending && !wall.isError && !wall.cartoons.length && <div className="comic-wall-empty"><PinnedNote size={62} className="cmark-block" /><p className="record-meta">The first page is still blank. A space for a real drawing, with its artist’s name.</p><a href="#cartoon-your-turn">Make it yours ↗</a></div>}
      <div className="cartoon-human-wall">
        {wall.cartoons.map((cartoon, i) => <CartoonPlate key={cartoon.id} cartoon={cartoon} lead={i === 0} index={i + 1} onOpen={() => setReading(i)} />)}
      </div>
      {unnamed > 0 && (
        <p className="record-meta cartoon-wall-gap" role="note">
          {unnamed === 1 ? 'One drawing here does not yet name' : `${unnamed} drawings here do not yet name`} the hand that drew {unnamed === 1 ? 'it' : 'them'}. That is the record’s to put right, not theirs — so it is said here rather than covered with a studio’s name.
        </p>
      )}
      <p className="record-meta cartoon-wall-colophon">The artists’ own words, kept with their work. Shown with permission. Every new contribution waits for a person’s look.</p>
      {wall.hasNextPage && <button type="button" className="comic-load-more" disabled={wall.isFetchingNextPage} onClick={() => wall.fetchNextPage()}>{wall.isFetchingNextPage ? 'Opening more…' : 'More from the wall'}</button>}
      {wall.isFetchNextPageError && <p className="record-meta comic-error-note" role="alert">More drawings could not be opened. Use “More from the wall” to try again.</p>}
      <CartoonsWaiting />
      {reading !== null && wall.cartoons[reading] && <CartoonCloseReading cartoons={wall.cartoons} index={reading} onTurn={setReading} onClose={() => setReading(null)} />}
    </section>
  );
}