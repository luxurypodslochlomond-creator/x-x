import React from 'react';
import CartoonArtwork from '@/components/climate/cartoons/CartoonArtwork';
import CartoonCaption from '@/components/climate/cartoons/CartoonCaption';
import cartoonSubject from '@/components/climate/cartoons/cartoonSubjects';

export default function CartoonPlate({ cartoon, lead = false, index = 0, onOpen }) {
  return (
    <article className={`cartoon-reading-spread ${lead ? 'cartoon-reading-spread--opening' : ''}`} id={`drawing-${cartoon.id}`}>
      <header className="cartoon-spread-line">
        <span className="cartoon-spread-number">{String(index).padStart(2, '0')}</span>
        <span>Looking at · {cartoonSubject(cartoon)}</span>
      </header>
      <figure className="record-cartoon-plate">
        <button type="button" className="cartoon-artwork-door" onClick={onOpen} aria-label={`Look closer at ${cartoon.title || 'this drawing'} by ${cartoon.artist_name}`}>
          <CartoonArtwork cartoon={cartoon} lead={lead} linkSource={false} />
          <span className="cartoon-look-closer">Look closer <span aria-hidden="true">↗</span></span>
        </button>
        <CartoonCaption cartoon={cartoon} />
      </figure>
    </article>
  );
}