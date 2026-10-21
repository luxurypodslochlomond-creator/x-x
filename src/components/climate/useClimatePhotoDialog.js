import { useCallback, useEffect, useRef, useState } from 'react';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

const MAX_SCALE = 4;
const spread = touches => Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY);
const clamp = (value, low, high) => Math.min(high, Math.max(low, value));

// A viewer that behaves like the phone's own photo app: swipe between pictures,
// pinch or double-tap to get right into one, and the page behind never moves.
export default function useClimatePhotoDialog(startIndex, total) {
  const [index, setIndex] = useState(startIndex);
  const [zoom, setZoom] = useState({ scale: 1, x: 0, y: 0 });
  const dialogRef = useRef(null);
  const drag = useRef(null);
  const lastTap = useRef(0);
  useBodyScrollLock(true);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);

  const go = useCallback(step => {
    setZoom({ scale: 1, x: 0, y: 0 });
    setIndex(current => (current + step + total) % total);
  }, [total]);

  const onTouchStart = event => {
    drag.current = {
      pinch: event.touches.length === 2 ? spread(event.touches) : null,
      scale: zoom.scale,
      zoomX: zoom.x,
      zoomY: zoom.y,
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  };

  const onTouchMove = event => {
    const from = drag.current;
    if (!from) return;
    if (from.pinch && event.touches.length === 2) {
      const next = clamp((spread(event.touches) / from.pinch) * from.scale, 1, MAX_SCALE);
      setZoom({ scale: next, x: from.zoomX, y: from.zoomY });
    } else if (!from.pinch && from.scale > 1 && event.touches.length === 1) {
      setZoom({
        scale: from.scale,
        x: from.zoomX + (event.touches[0].clientX - from.x),
        y: from.zoomY + (event.touches[0].clientY - from.y),
      });
    }
  };

  const onTouchEnd = event => {
    const from = drag.current;
    if (!from || event.touches.length) return;
    drag.current = null;
    const point = event.changedTouches[0];
    const dx = point.clientX - from.x;
    const dy = point.clientY - from.y;
    if (from.pinch) return;
    if (from.scale === 1 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      go(dx < 0 ? 1 : -1);
      return;
    }
    if (Math.abs(dx) + Math.abs(dy) > 12) return;
    const now = Date.now();
    if (now - lastTap.current < 300) {
      lastTap.current = 0;
      setZoom(zoom.scale > 1 ? { scale: 1, x: 0, y: 0 } : { scale: 2.5, x: 0, y: 0 });
    } else {
      lastTap.current = now;
    }
  };

  const gestures = { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel: () => { drag.current = null; } };

  return { index, zoom, dialogRef, go, gestures };
}