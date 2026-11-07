import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Search as SearchIcon } from 'lucide-react';
import { useRecordCapacity } from '@/components/climate/useKeeper';

// ── THE WAY THROUGH THE RECORD — ONE LINE, SIX DOORS ───────────────────────────
// This bar had eleven words on it: five places to read, then five quiet words about the
// record itself, then the workroom. On a phone it wrapped to two rows and still moved the
// page down as you read it, and a rail of eleven destinations is what makes a thing read as
// a website rather than as an app — you are being given a map before you are given a page.
//
// So the bar now holds only where a reader goes: Search, the five places, and one door for
// the people who tend the record. Everything about the record — who founded it, how it is
// checked, how it is sealed, how it is corrected, what it costs — lives in the foot of every
// page, which is where a reader looks when they have finished reading rather than before.
//
// The single word for the working room is DESK. It was called the workroom, the keeper room,
// the checking room and the desk in four different places, and a person holding the keys had
// to learn our vocabulary before they could do a day's work. One room, one word.
// Studio is the sixth place, and it belongs on this line rather than in a separate menu:
// it is where a reader makes something out of what they have just read, which makes it a
// place in the record rather than a different product. It is called the Studio and not the
// kids' section on purpose — a thing labelled "for children" is a thing a child refuses.
const PLACES = [
  { label: 'Record', page: 'TogetherChangeClimate' },
  { label: 'Wire', page: 'ClimateWire' },
  { label: 'Map', page: 'ClimateMap' },
  { label: 'Impact', page: 'ClimateImpact' },
  { label: 'Music', page: 'ClimateMusic' },
  { label: 'Studio', page: 'ClimateStudio' },
];

const DESK = { label: 'Desk', page: 'ClimateKeeperRoom', aria: 'Your desk — decide what is waiting, or check a source' };

function PlaceLink({ item, active, desk }) {
  // The desk is the one door here that is work rather than reading, so it is drawn a shade
  // firmer: still a word, never a glow. A reader never sees it at all.
  const tone = active
    ? 'text-[#e2602a] border-[#e2602a]'
    : desk
      ? 'text-[#efe7d6] border-[#efe7d6]/45 hover:text-[#e2602a] hover:border-[#e2602a]'
      : 'text-[#efe7d6]/75 border-transparent hover:text-[#efe7d6] hover:border-[#efe7d6]/40';

  return (
    <Link
      to={createPageUrl(item.page)}
      aria-label={item.aria}
      aria-current={active ? 'page' : undefined}
      className={`pb-1 whitespace-nowrap border-b-2 text-[11px] font-black uppercase tracking-wider transition-colors ${tone}`}
    >
      {item.label}
    </Link>
  );
}

export default function ClimateNav({ currentPage, variant = 'desktop' }) {
  const isActive = (page) => currentPage === page;
  // Either capacity opens the desk: a keeper decides, a checker looks, and one person is
  // often both. A door only one of them could see was a door the other had to remember.
  const capacity = useRecordCapacity();
  const keeper = capacity.isKeeper || capacity.isChecker;
  const searchActive = isActive('ClimateSearch');

  const searchBox = (
    <Link
      to={createPageUrl('ClimateSearch')}
      aria-current={searchActive ? 'page' : undefined}
      aria-label="Search the record"
      /* Search is the one control in this bar, and it now wears the record's own red rather
         than an outline the same weight as the words beside it. A reader who wants to look
         something up should not have to read six words first to find the way in. Where you
         are is still said in the signal orange, so the box cannot look like the current page. */
      className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-2.5 min-h-[44px] sm:min-h-0 border-2 border-[#b3261e] text-[10px] font-black font-mono uppercase tracking-wider whitespace-nowrap transition-colors ${
        searchActive
          ? 'bg-[#e2602a] text-[#141210]'
          : 'bg-[#b3261e] text-[#f4efe4] hover:bg-[#e2602a] hover:text-[#141210]'
      }`}
    >
      <SearchIcon className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">Search</span>
    </Link>
  );

  // The same six doors on both, on one line, centred. Nothing slides sideways and nothing is
  // hidden behind a swipe: on the narrowest handset the bar wraps to a second line rather than
  // putting a door past the edge of the glass.
  const mobile = variant === 'mobile';

  return (
    <nav
      aria-label="The record"
      className={`flex items-center gap-x-3 gap-y-1 px-2 py-0.5 ${
        mobile ? 'flex-wrap justify-center' : 'flex-wrap lg:flex-nowrap lg:justify-end lg:gap-4'
      }`}
    >
      {searchBox}
      <span aria-hidden="true" className="w-px h-4 bg-[#efe7d6]/20" />
      {PLACES.map((item) => (
        <PlaceLink key={item.page} item={item} active={isActive(item.page)} />
      ))}
      {keeper && (
        <>
          <span aria-hidden="true" className="w-px h-4 bg-[#efe7d6]/20" />
          <PlaceLink item={DESK} active={isActive(DESK.page)} desk />
        </>
      )}
    </nav>
  );
}