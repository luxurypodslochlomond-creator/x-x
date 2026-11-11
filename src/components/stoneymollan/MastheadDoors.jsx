import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import StoneymollanDoorRow from '@/components/stoneymollan/StoneymollanDoorRow';
import '@/components/stoneymollan/stoneymollan-navigation.css';

export default function MastheadDoors({ mobile = false }) {
  const slotRef = useRef(null);
  const [docked, setDocked] = useState(false);
  useEffect(() => {
    if (mobile) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      const slot = slotRef.current;
      setDocked(window.matchMedia('(min-width: 768px)').matches && !!slot && slot.getBoundingClientRect().bottom <= 0);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(check); };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [mobile]);

  // Mobile has one row, already at the top, held natively for the whole sheet.
  if (mobile) return (
    <nav aria-label="Stoneymollan" className="sticky top-0 z-[60] border-b border-t-[3px] border-b-record-ink/20 border-t-record-mark bg-record-paper px-6 pb-1.5 pt-[max(0.5rem,env(safe-area-inset-top))] md:hidden">
      <StoneymollanDoorRow />
    </nav>
  );

  // Desktop retains its masthead placement and existing docked copy.
  return (
    <>
      <div ref={slotRef} className="mt-5 hidden border-t border-record-ink/20 pt-4 md:block">
        <nav aria-label="Stoneymollan" aria-hidden={docked || undefined}><StoneymollanDoorRow /></nav>
      </div>
      {docked && createPortal(
        <nav aria-label="Stoneymollan" className="fixed inset-x-0 top-0 z-[60] hidden border-b border-record-ink/20 bg-record-paper px-6 pb-1.5 pt-2 md:block">
          <StoneymollanDoorRow />
        </nav>, document.body
      )}
    </>
  );
}