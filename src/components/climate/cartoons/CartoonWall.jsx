import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import CartoonPlate from '@/components/climate/cartoons/CartoonPlate';
import CartoonCloseReading from '@/components/climate/cartoons/CartoonCloseReading';
import CartoonsWaiting from '@/components/climate/cartoons/CartoonsWaiting';
import useCartoonWall from '@/components/climate/cartoons/useCartoonWall';

export default function CartoonWall() {
  const wall = useCartoonWall();
  const [reading, setReading] = useState(null);
  return (
    <section className="comic-wall" aria-labelledby="cartoon-wall-title">
      <header className="cartoon-wall-head">
        <p className="comic-opening-eyebrow record-meta">Human hands. Different perspectives.</p>
        <h2 id="cartoon-wall-title" className="comic-section-title">The people’s pages.</h2>
        <p className="record-meta">Read the picture. Stay with the idea. Tap any drawing to look closer.</p>
      </header>
      {wall.isPending && <p className="record-meta flex items-center gap-2 py-6" role="status"><Loader2 size={18} className="animate-spin" />Opening the original drawings…</p>}
      {wall.isError && <div className="comic-wall-empty"><p className="record-meta">The wall could not be opened.</p><button type="button" onClick={() => wall.refetch()} className="underline">Try again</button></div>}
      {!wall.isPending && !wall.isError && !wall.cartoons.length && <div className="comic-wall-empty"><p className="record-meta">The first page is still blank. A space for a real drawing, with its artist’s name.</p><a href="#cartoon-your-turn">Make it yours ↗</a></div>}
      <div className="cartoon-human-wall">
        {wall.cartoons.map((cartoon, i) => <CartoonPlate key={cartoon.id} cartoon={cartoon} lead={i === 0} index={i + 1} onOpen={() => setReading(i)} />)}
      </div>
      <p className="record-meta cartoon-wall-colophon">The artists’ own words, kept with their work. Shown with permission. Every new contribution waits for a person’s look.</p>
      {wall.hasNextPage && <button type="button" className="comic-load-more" disabled={wall.isFetchingNextPage} onClick={() => wall.fetchNextPage()}>{wall.isFetchingNextPage ? 'Opening more…' : 'More from the wall'}</button>}
      {wall.isFetchNextPageError && <p className="record-meta" role="alert">More drawings could not be opened. Use “More from the wall” to try again.</p>}
      <CartoonsWaiting />
      {reading !== null && wall.cartoons[reading] && <CartoonCloseReading cartoons={wall.cartoons} index={reading} onTurn={setReading} onClose={() => setReading(null)} />}
    </section>
  );
}