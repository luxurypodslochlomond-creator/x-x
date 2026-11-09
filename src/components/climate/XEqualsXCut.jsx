import React, { useEffect, useState } from 'react';

// The cut, drawn by the reader.
//
// The page's one gesture is a single incision down its left edge, and it advances only as
// far as the person reading has gone. It is not a progress bar and it carries no number:
// it exists because the mark at the top was cut by somebody's hand, and the hand here is
// the one holding the phone.

export default function XEqualsXCut() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const measure = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);
    };
    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed left-0 top-0 h-full w-[2px] z-[5] pointer-events-none bg-[#141210]/10">
      <div
        className="w-full bg-record-mark"
        style={{ height: `${progress * 100}%`, transition: 'height 140ms linear' }}
      />
    </div>
  );
}