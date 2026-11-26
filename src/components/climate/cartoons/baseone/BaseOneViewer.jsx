import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { BASE_ONE_SERIES, BASE_ONE_SIGNATURE } from '@/components/climate/cartoons/baseone/baseOneSeries';
import '@/components/climate/cartoons/baseone/base-one-viewer.css';

// ── ONE MARK, PROPERLY ────────────────────────────────────────────────────────
// On the wall a reader can open a drawing full size and move to the next one; this room had
// no such thing, so on a phone it was a column of squares scrolled past in a hurry — which is
// the exact opposite of what a drawing with no words in it needs. A mark carries no caption,
// so the only way to meet it is to look at it, and looking at it needs the whole screen.
//
// The same three gestures the wall already taught: tap the sheet to come closer, swipe to the
// next mark, and the arrows for anyone using a keyboard or a mouse. Nothing here is a new
// idea; it is the room catching up with the wall.
export default function BaseOneViewer({ start, onClose }) {
  const [index, setIndex] = useState(start);
  const [zoomed, setZoomed] = useState(false);
  const touchX = useRef(null);
  useBodyScrollLock(true);

  const count = BASE_ONE_SERIES.length;
  const drawing = BASE_ONE_SERIES[index];

  const go = useCallback((step) => {
    setZoomed(false);
    setIndex((i) => (i + step + count) % count);
  }, [count]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  const onTouchStart = (e) => { touchX.current = e.touches[0]?.clientX ?? null; };
  const onTouchEnd = (e) => {
    const from = touchX.current;
    touchX.current = null;
    if (from === null || zoomed) return;
    const to = e.changedTouches[0]?.clientX ?? from;
    const dx = to - from;
    if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
  };

  return createPortal(
    <div className="bov" role="dialog" aria-modal="true" aria-label={`Mark ${drawing.numeral}: ${drawing.answers}`}>
      <div className="bov-bar">
        <p className="bov-count">{drawing.numeral} · {index + 1} / {count}</p>
        <button type="button" className="bov-x" onClick={onClose} aria-label="Close">
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="bov-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <button
          type="button"
          className={zoomed ? 'bov-sheet bov-zoomed' : 'bov-sheet'}
          onClick={() => setZoomed((z) => !z)}
          aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
        >
          <img src={drawing.image} alt={drawing.alt} />
        </button>
      </div>

      {/* The words sit under the mark, never on it — the same rule as the wall. */}
      <div className="bov-words">
        <p className="bov-answers">{drawing.answers}</p>
        <p className="bov-line">{drawing.line}</p>
        <p className="bov-sign">{BASE_ONE_SIGNATURE}</p>
      </div>

      <div className="bov-nav">
        <button type="button" onClick={() => go(-1)} aria-label="Previous mark">
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next mark">
          <ChevronRight size={22} aria-hidden="true" />
        </button>
      </div>
    </div>,
    document.body
  );
}