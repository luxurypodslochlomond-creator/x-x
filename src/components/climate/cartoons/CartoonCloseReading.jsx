import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import CartoonArtwork from '@/components/climate/cartoons/CartoonArtwork';
import CartoonCaption from '@/components/climate/cartoons/CartoonCaption';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import '@/components/climate/cartoons/cartoon-close-reading.css';

export default function CartoonCloseReading({ cartoons, index, onTurn, onClose }) {
  const dialog = useRef(null);
  const scroll = useRef(null);
  const [zoomed, setZoomed] = useState(false);
  const cartoon = cartoons[index];
  useBodyScrollLock(true);
  useEffect(() => { const node = dialog.current; node.showModal(); return () => node.close(); }, []);
  const turn = (step) => {
    setZoomed(false);
    scroll.current?.scrollTo(0, 0);
    onTurn((index + step + cartoons.length) % cartoons.length);
  };
  return createPortal(
    <dialog ref={dialog} className="cartoon-close-reading" aria-label="Read a drawing, full size" onClose={onClose}
      onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); turn(event.key === 'ArrowRight' ? 1 : -1); } }}>
      <div className="cartoon-close-top">
        <p aria-live="polite">{cartoon.title || cartoon.artist_name}<span>{cartoon.artist_name} · the human wall</span></p>
        <button type="button" onClick={() => setZoomed(!zoomed)} aria-pressed={zoomed}>{zoomed ? 'Fit drawing' : 'Enlarge'}</button>
        <button type="button" onClick={onClose} aria-label="Close drawing and return to the wall" autoFocus><X size={22} /></button>
      </div>
      <div className="cartoon-close-scroll" ref={scroll}>
        <div className="cartoon-close-art" data-zoom={zoomed}><CartoonArtwork key={cartoon.id} cartoon={cartoon} lead /></div>
        <figure className="cartoon-close-caption"><CartoonCaption cartoon={cartoon} /></figure>
      </div>
      <div className="cartoon-close-bottom">
        <button type="button" onClick={() => turn(-1)} aria-label="Previous drawing"><ArrowLeft size={18} />Previous</button>
        <span aria-live="polite">{index + 1} / {cartoons.length}</span>
        <button type="button" onClick={() => turn(1)} aria-label="Next drawing">Next<ArrowRight size={18} /></button>
      </div>
    </dialog>, document.body,
  );
}