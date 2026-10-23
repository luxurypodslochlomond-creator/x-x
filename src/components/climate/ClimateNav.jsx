import React from 'react';
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
  if (variant === 'mobile') {
    return (
      <div className="mx-auto flex w-max items-center gap-2.5">
        {searchBox}
        <span className="w-px h-5 bg-[#efe7d6]/20 flex-shrink-0" />
        {[...PLACES, ...ABOUT].map((item) => (
          <Link
            key={item.page}
            to={createPageUrl(item.page)}
            aria-current={isActive(item.page) ? 'page' : undefined}
            className={`flex-shrink-0 py-1.5 text-[10px] font-black uppercase tracking-wide border-b-2 transition-colors ${
              isActive(item.page) ? 'text-[#e2602a] border-[#e2602a]' : 'text-[#efe7d6]/60 border-transparent'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
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