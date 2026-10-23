import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Search as SearchIcon } from 'lucide-react';

// ── THE WAY THROUGH THE RECORD ───────────────────────────────────────────────────
// Two different kinds of thing live in this bar, and they are drawn differently on
// purpose. Places you can read — Record, Wire, Map, Impact — and the quiet trio about
// the record itself. Then one action: Search, which wears a box and an icon so it can
// never read as one more word in a list. Nothing is removed from the record; the door
// that matters most just looks like a door.

const PLACES = [
  { label: 'Record', page: 'TogetherChangeClimate' },
  { label: 'Wire', page: 'ClimateWire' },
  { label: 'Map', page: 'ClimateMap' },
  { label: 'Impact', page: 'ClimateImpact' },
];

const ABOUT = [
  { label: 'Founder', page: 'ClimateFounder' },
  { label: 'Support', page: 'ClimateSupport' },
  { label: 'Method', page: 'ClimateMethod' },
];

function PlaceLink({ item, active }) {
  return (
    <Link
      to={createPageUrl(item.page)}
      aria-current={active ? 'page' : undefined}
      className={`pb-1 text-[11px] font-black uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${
        active
          ? 'text-[#e2602a] border-[#e2602a]'
          : 'text-[#efe7d6]/75 border-transparent hover:text-[#efe7d6] hover:border-[#efe7d6]/40'
      }`}
    >
      {item.label}
    </Link>
  );
}

export default function ClimateNav({ currentPage, variant = 'desktop' }) {
  const isActive = (page) => currentPage === page;
  const searchActive = isActive('ClimateSearch');
  const railRef = useRef(null);
  const activeRef = useRef(null);
  const [edgeMask, setEdgeMask] = useState(null);

  // A rail, not a list that folds onto a second line. Two things make it feel made for
  // the thumb: the edge fades only when something really is beyond it — never a dead
  // hint, never a scrollbar — and the item you are reading is carried into view when
  // the page opens.
  useEffect(() => {
    if (variant !== 'mobile') return;
    const rail = railRef.current;
    if (!rail) return;

    const readMask = () => {
      // The fade is drawn to the run of the writing. Where the writing runs the other
      // way, the rail still scrolls; it simply goes without the hint.
      if (window.getComputedStyle(rail).direction === 'rtl') { setEdgeMask(null); return; }
      const behind = rail.scrollLeft > 4;
      const ahead = rail.scrollWidth - rail.clientWidth - rail.scrollLeft > 4;
      if (!behind && !ahead) { setEdgeMask(null); return; }
      const stops = [
        behind ? 'transparent 0' : '#000 0',
        behind ? '#000 20px' : null,
        ahead ? '#000 calc(100% - 20px)' : null,
        ahead ? 'transparent 100%' : '#000 100%',
      ].filter(Boolean).join(', ');
      setEdgeMask(`linear-gradient(to right, ${stops})`);
    };

    readMask();
    rail.addEventListener('scroll', readMask, { passive: true });
    window.addEventListener('resize', readMask);
    // A longer tongue makes longer words: re-measure when the words change size.
    const inner = rail.firstElementChild;
    const observer = inner ? new ResizeObserver(readMask) : null;
    if (observer) observer.observe(inner);

    return () => {
      rail.removeEventListener('scroll', readMask);
      window.removeEventListener('resize', readMask);
      if (observer) observer.disconnect();
    };
  }, [variant]);

  // Carry the item you are on into view. Measured against the rail, so the page itself
  // never shifts under it.
  useEffect(() => {
    if (variant !== 'mobile') return;
    const rail = railRef.current;
    const el = activeRef.current;
    if (!rail || !el) return;
    const railRect = rail.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    rail.scrollLeft += (elRect.left - railRect.left) - (rail.clientWidth - elRect.width) / 2;
  }, [currentPage, variant]);

  const searchBox = (
    <Link
      to={createPageUrl('ClimateSearch')}
      aria-current={searchActive ? 'page' : undefined}
      aria-label="Search the record"
      className={`flex items-center gap-1.5 px-2.5 py-1.5 border-2 text-[10px] font-black font-mono uppercase tracking-wider whitespace-nowrap transition-colors ${
        searchActive
          ? 'bg-[#e2602a] border-[#e2602a] text-[#141210]'
          : 'border-[#efe7d6]/35 text-[#efe7d6] hover:border-[#e2602a] hover:text-[#e2602a]'
      }`}
    >
      <SearchIcon className="w-3.5 h-3.5" />
      <span>Search</span>
    </Link>
  );

  // On a phone the same bar, thumb-scrollable. Search leads it, because on a phone it is
  // the fastest way to anything on the record that you did not already know was there.
  // One line, always: the rail runs under the thumb rather than folding onto a second
  // line, settles on the word your finger landed nearest, and ends flush to the screen.
  if (variant === 'mobile') {
    return (
      <nav
        ref={railRef}
        aria-label="The record"
        className="climate-nav-rail overflow-x-auto overscroll-x-contain"
        style={{
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x proximity',
          WebkitMaskImage: edgeMask,
          maskImage: edgeMask,
        }}
      >
        <div className="w-max mx-auto flex items-center gap-x-3.5 px-4 py-1.5">
          {searchBox}
          <span className="w-px h-5 bg-[#efe7d6]/20 flex-shrink-0" />
          {[...PLACES, ...ABOUT].map((item) => (
            <Link
              key={item.page}
              ref={isActive(item.page) ? activeRef : null}
              to={createPageUrl(item.page)}
              aria-current={isActive(item.page) ? 'page' : undefined}
              style={{ scrollSnapAlign: 'center' }}
              className={`flex-shrink-0 py-2 text-[10px] font-black uppercase tracking-wide border-b-2 transition-colors ${
                isActive(item.page) ? 'text-[#e2602a] border-[#e2602a]' : 'text-[#efe7d6]/60 border-transparent'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-4 lg:gap-5" aria-label="The record">
      {searchBox}
      <span className="w-px h-4 bg-[#efe7d6]/20" />
      {PLACES.map((item) => (
        <PlaceLink key={item.page} item={item} active={isActive(item.page)} />
      ))}
      <span className="w-px h-4 bg-[#efe7d6]/20" />
      {ABOUT.map((item) => (
        <PlaceLink key={item.page} item={item} active={isActive(item.page)} />
      ))}
    </nav>
  );
}