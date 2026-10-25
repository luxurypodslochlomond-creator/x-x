import React, { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

// A phone's visible viewport shrinks when its keyboard opens. Keep the search,
// results and exit in that viewport, rather than below the sticky site header.
export default function TonguePickerDialog({ children, onClose }) {
  const dialogRef = useRef(null);
  useBodyScrollLock(true);
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const viewport = window.visualViewport;
    let frame;
    const place = () => {
      dialog.style.top = `${viewport?.offsetTop || 0}px`;
      dialog.style.height = `${viewport?.height || window.innerHeight}px`;
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(place);
    };
    place();
    dialog.showModal();
    viewport?.addEventListener('resize', schedule);
    viewport?.addEventListener('scroll', schedule);
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      viewport?.removeEventListener('resize', schedule);
      viewport?.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      dialog.close();
    };
  }, []);
  return createPortal(
    <dialog ref={dialogRef} aria-label="Choose the record's language"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      className="fixed left-0 m-0 box-border w-full max-w-none max-h-none overflow-hidden border-0 bg-record-ink/90 p-3 text-record-paper backdrop:bg-record-ink/60">
      {children}
    </dialog>, document.body
  );
}