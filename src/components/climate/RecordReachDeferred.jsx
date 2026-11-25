import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';

const RecordReachEarth = lazy(() => import('./RecordReachEarth'));

// ── THE WORLD AT THE FOOT IS STILL THE WORLD, JUST NOT ON THE FIRST BREATH ──────
// The band at the foot of every page asks the record's server how far it has been read,
// and then draws the whole planet in ink. That is a fine thing for a foot to do — but it
// was doing it while the page above it was still arriving, on every single page, for a
// band nobody has scrolled to yet.
//
// So the band waits until it is nearly in view. It is given six hundred pixels of warning,
// which is more than a thumb's flick, so it is always already drawn by the time a reader
// reaches it: nothing appears late and nothing jumps. The plate is unchanged, the count is
// unchanged, and the band is in exactly the same place at exactly the same size.
//
// The fallback matters more than the observer. If this browser has no IntersectionObserver,
// or the observer never fires for any reason, the band is simply drawn at once — the old
// behaviour. A performance change must never be able to take a page's foot away.
export default function RecordReachDeferred() {
  const marker = useRef(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = marker.current;
    if (!el || typeof IntersectionObserver !== 'function') {
      setNear(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={marker}>
      {near ? (
        <Suspense fallback={null}>
          <RecordReachEarth />
        </Suspense>
      ) : null}
    </div>
  );
}