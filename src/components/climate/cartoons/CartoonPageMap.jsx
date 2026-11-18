import React from 'react';
import { comicStories } from '@/components/climate/cartoons/comicStories';
import { CARTOON_COVER } from '@/components/climate/cartoons/cartoonEvent';
import useCartoonWall from '@/components/climate/cartoons/useCartoonWall';

export default function CartoonPageMap() {
  const { cartoons } = useCartoonWall();
  const first = cartoons[0];
  const routes = [
    { href: '#cartoon-wall-title', image: first?.display_image_url || first?.image_url, label: 'The human wall', note: 'What On Earth!® · CEEW' },
    { href: '#cartoon-strip', image: comicStories[0].image, label: 'The little things', note: 'AI-illustrated fiction' },
    { href: '#cartoon-session-title', image: CARTOON_COVER, label: 'Together, on the 29th', note: 'Cover · Francis Umendu Odupute' },
  ];
  return (
    <nav className="cartoon-reading-index" aria-label="Find your way through the cartoon room">
      <div className="cartoon-index-line"><span>Three ways in</span><span aria-hidden="true">Scroll to wander ↓</span></div>
      <div className="cartoon-index-reel">
        {routes.map((route, index) => <a key={route.href} href={route.href} className="cartoon-index-entry">
          <div className="cartoon-index-image">{route.image ? <img src={route.image} alt="" decoding="async" /> : <span>Opening the drawings…</span>}</div>
          <span className="cartoon-index-name"><small>0{index + 1}</small>{route.label}</span>
          <span className="cartoon-index-note">{route.note}</span>
        </a>)}
      </div>
      <div className="cartoon-index-foot"><a href="#cartoon-your-turn">Add your drawing ↗</a><a href="#cartoon-anthology">The book ↓</a><a href="#cartoon-why-title">Why cartoons? ↓</a></div>
    </nav>
  );
}