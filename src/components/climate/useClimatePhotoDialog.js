import { useCallback, useEffect, useRef, useState } from 'react';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

export default function useClimatePhotoDialog(startIndex, total) {
  const [index, setIndex] = useState(startIndex);
  const dialogRef = useRef(null);
  const touch = useRef(null);
  const go = useCallback(step => setIndex(current => (current + step + total) % total), [total]);
  useBodyScrollLock(true);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);

  const gestures = {
    onTouchStart: event => {
      touch.current = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
    },
    onTouchEnd: event => {
      const from = touch.current;
      touch.current = null;
      if (!from || event.touches.length) return;
      const dx = event.changedTouches[0].clientX - from.x;
      const dy = event.changedTouches[0].clientY - from.y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
    },
    onTouchCancel: () => { touch.current = null; },
  };
  return { index, dialogRef, go, gestures };
}