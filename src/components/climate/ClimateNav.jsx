import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Search as SearchIcon } from 'lucide-react';
import COOLASFUCKTuningFork from '@/components/shared/COOLASFUCKTuningFork';

// ── THE WAY THROUGH THE RECORD ───────────────────────────────────────────────────
// Two different kinds of thing live in this bar, and they are drawn differently on
// purpose. Places you can read — Record, Wire, Map, Impact — and the quiet trio about
// the record itself. Then one action: Search, which wears a box and an icon so it can
// never read as one more word in a list. Nothing is removed from the record; the door
// that matters most just looks like a door.
//
// Last of the places is the music, and it is drawn as the record's own mark rather than
// a word: one track, given to the record, is recognised at a glance, and the door stays
// light enough not to compete with the reading. The mark is made here — a tuning fork
// with sound leaving it — because the note glyph everyone else uses belongs to the
// platform that drew it, and this door belongs to the artists who gave the work. It
// carries a name a screen reader can speak, and the page it opens says in words what
// the mark means — so nothing is asked of a reader who cannot see it.

const PLACES = [
  { label: 'Record', page: 'TogetherChangeClimate' },
  { label: 'Wire', page: 'ClimateWire' },
  { label: 'Map', page: 'ClimateMap' },
  { label: 'Impact', page: 'ClimateImpact' },
  { page: 'ClimateMusic', aria: 'Music — given to the record', glyph: true },
];

const ABOUT = [
  { label: 'Founder', page: 'ClimateFounder' },
  { label: 'Support', page: 'ClimateSupport' },
  { label: 'Method', page: 'ClimateMethod' },
];

// The music door is the one thing in this bar that is not a word, and it is lit rather
// than printed: signal orange, with a glow that lifts it off the ink so it reads as a
// live thing at a glance — the same orange the record uses for its own signal. It
// carries a name for anyone who cannot see it, and the page it opens says in words
// what it means.
function PlaceLink({ item, active }) {
  const tone = item.glyph
    ? 'flex items-center text-[#e2602a] drop-shadow-[0_0_7px_rgba(226,96,42,0.75)] hover:text-[#ffb27a] hover:drop-shadow-[0_0_14px_rgba(226,96,42,1)] hover:scale-110 transition-transform'
    : `text-[11px] font-black uppercase tracking-wider ${
        active
          ? 'text-[#e2602a] border-[#e2602a]'
          : 'text-[#efe7d6]/75 border-transparent hover:text-[#efe7d6] hover:border-[#efe7d6]/40'
      }`;

  return (
    <Link
      to={createPageUrl(item.page)}
      aria-label={item.aria}
      aria-current={active ? 'page' : undefined}
      className={`pb-1 whitespace-nowrap border-b-2 transition-colors ${tone}`}
    >
      {item.glyph ? <COOLASFUCKTuningFork size={19} tone="signal" /> : item.label}
    </Link>
  );
}

// The mobile door. The same words as the desk bar, sized for a thumb and never cut off:
// the page you are on is marked with a rule as well as a colour, and the record's own
// three sit one shade quieter so the places you read still lead.
function MobileLink({ item, active, quiet }) {
  return (
    <Link
      to={createPageUrl(item.page)}
      aria-label={item.aria}
      aria-current={active ? 'page' : undefined}
      className={`min-h-[44px] flex items-center px-2 transition-colors active:text-[#e2602a] ${
        quiet ? 'text-[#efe7d6]/45' : 'text-[#efe7d6]/80'
      }`}
    >
      <span
        className={`pb-0.5 border-b-2 ${
          item.glyph
            ? 'flex items-center text-[#e2602a] drop-shadow-[0_0_8px_rgba(226,96,42,0.8)]'
            : `text-[11px] font-black uppercase tracking-wide whitespace-nowrap ${active ? 'text-[#e2602a] border-[#e2602a]' : 'border-transparent'}`
        }`}
      >
        {item.glyph ? <COOLASFUCKTuningFork size={21} tone="signal" /> : item.label}
      </span>
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
      className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-2.5 min-h-[44px] sm:min-h-0 border-2 text-[10px] font-black font-mono uppercase tracking-wider whitespace-nowrap transition-colors ${
        searchActive
          ? 'bg-[#e2602a] border-[#e2602a] text-[#141210]'
          : 'border-[#efe7d6]/35 text-[#efe7d6] hover:border-[#e2602a] hover:text-[#e2602a]'
      }`}
    >
      <SearchIcon className="w-3.5 h-3.5" />
      <span>Search</span>
    </Link>
  );

  // On a phone: two lines, every door on the screen at once — nothing hidden, nothing to
  // swipe, no fade hinting at something you cannot see. The four places you read lead the
  // first line with Search; the record's own three sit quietly underneath. A door you
  // cannot see is not a door.
  if (variant === 'mobile') {
    return (
      <nav aria-label="The record" className="flex flex-col px-2 py-0.5">
        {/* Always two lines, never three and never one. This bar is stuck to the top of the
            screen, so while it wrapped, every tongue that arrived made its words longer, the
            lines re-wrapped, the bar changed height and the whole page moved under the reader.
            Two lines of fixed height cannot do that: while a tongue's words fit, the line is
            centred exactly as before; the moment they grow past the screen, the line slides
            under the thumb instead of stacking, and the bar's height never changes. Nothing is
            hidden — every door stays in the bar, at every width, in every tongue. */}
        <div className="overflow-x-auto climate-nav-rail">
          <div className="flex items-center gap-x-1 w-max mx-auto">
            {searchBox}
            <span className="w-px h-4 bg-[#efe7d6]/20" />
            {PLACES.map((item) => (
              <MobileLink key={item.page} item={item} active={isActive(item.page)} />
            ))}
          </div>
        </div>
        <div className="overflow-x-auto climate-nav-rail">
          <div className="flex items-center gap-x-2 w-max mx-auto">
            {ABOUT.map((item) => (
              <MobileLink key={item.page} item={item} active={isActive(item.page)} quiet />
            ))}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-4 lg:gap-5 min-w-0 overflow-x-auto climate-nav-rail" aria-label="The record">
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