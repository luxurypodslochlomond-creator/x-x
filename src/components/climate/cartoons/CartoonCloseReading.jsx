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

  // ── THE DRAWING MOVES WITH THE THUMB ──────────────────────────────────────────
  // Brian, 26 November: "swipe for images in phone right? it seems clunky." It was
  // worse than clunky: there was no swipe at all. The only way to the next drawing was
  // to reach down to a button at the foot of the screen, on the one gesture every phone
  // on earth already does by itself. So the drawing now follows the finger sideways and
  // snaps to the next one, and the buttons stay for anybody who prefers them, for a
  // keyboard, and for a screen reader.
  //
  // The gesture has to share the screen with the page's own scrolling, so it only claims
  // a drag once it is clearly sideways: ten pixels in, and more horizontal than vertical.
  // A thumb that goes down the caption keeps scrolling the caption.
  const drag = useRef(null);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const turn = (step) => {
    setZoomed(false);
    setOffset(0);
    scroll.current?.scrollTo(0, 0);
    onTurn((index + step + cartoons.length) % cartoons.length);
  };
  const startDrag = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    drag.current = { x: event.clientX, y: event.clientY, axis: null, dx: 0 };
  };
  const moveDrag = (event) => {
    const held = drag.current;
    if (!held) return;
    const dx = event.clientX - held.x;
    const dy = event.clientY - held.y;
    if (!held.axis) {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      held.axis = Math.abs(dx) > Math.abs(dy) * 1.15 ? 'x' : 'y';
      if (held.axis === 'x') {
        setDragging(true);
        try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* older browsers */ }
      }
    }
    if (held.axis !== 'x') return;
    held.dx = dx;
    setOffset(dx);
  };
  const endDrag = () => {
    const held = drag.current;
    drag.current = null;
    setDragging(false);
    setOffset(0);
    if (!held || held.axis !== 'x') return;
    const reach = Math.min(96, (window.innerWidth || 360) * 0.2);
    if (Math.abs(held.dx) > reach) turn(held.dx < 0 ? 1 : -1);
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
        <div
          className="cartoon-close-art"
          data-zoom={zoomed}
          data-dragging={dragging}
          style={dragging || offset ? { transform: `translateX(${offset}px)` } : undefined}
          onPointerDown={zoomed ? undefined : startDrag}
          onPointerMove={zoomed ? undefined : moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <CartoonArtwork key={cartoon.id} cartoon={cartoon} lead />
        </div>
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