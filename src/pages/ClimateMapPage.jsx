import React from 'react';
import { Link } from 'react-router-dom';
import useRecordBack from '@/components/climate/useRecordBack';
import SignalBeacon from '@/components/climate/SignalBeacon';
import RecordCover from '@/components/climate/RecordCover';
import RecordWorldMap from '@/components/climate/RecordWorldMap';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/* ── THE MAP IS A PAGE OF THE RECORD, NOT A POSTER ABOUT IT ────────────────────────
   This page used to be the last survivor of the record's old costume: a cold dark
   masthead, a condensed uppercase headline reading TRANSMISSION MAP, two beacon dots
   pulsing at the edges of a quotation, a flicker on the source line, a scanline over
   the whole map and a signal line that crossed the world in eight seconds. Fourteen
   pages wore the record's clothes and this one wore the clothes of the thing the
   record replaced.

   The fix is not a restyle for its own sake. It is that the map had stopped using the
   record's words: it said SIGNALS where the record says entries, TRANSMISSION where the
   record says reads, and it named a Laurie Anderson album three times on one screen.
   A reader who came here from the brief was being handed a different publication and
   asked to believe it was the same one.

   So it is built now out of the record's own parts — the paper header, the covenant
   band with x = x, the cover painting behind the title, the orange way back — which is
   exactly what ClimateRecordShell does for the pages that fit in a column. The map is
   the one page that cannot live in a column, so it wears the same bands around a
   full-bleed map instead. */
export default function ClimateMapPage() {
  const back = useRecordBack('/TogetherChangeClimate');

  return (
    <div className="climate-record min-h-screen bg-[#efe7d6] text-[#141210] relative" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Header — paper, the way out, the page's name. Scrolls with the page. */}
      <div className="border-b-2 border-[#141210] bg-[#efe7d6]">
        <div className="max-w-[1100px] mx-auto flex items-center gap-3 px-4 lg:px-10 py-3">
          <button
            onClick={back}
            aria-label="Back"
            className="w-11 h-11 flex items-center justify-center bg-[#f7f1e5] border-2 border-[#141210] text-[#141210] active:bg-[#e2602a] transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-[10px] font-black font-mono uppercase tracking-widest text-[#5a5246]">The record · Map</span>
        </div>
      </div>

      {/* Covenant band — the mark every page of the record carries, and the way to it. */}
      <div className="bg-[#241d16] px-5 py-3 flex flex-col items-center justify-center gap-1.5 border-b border-[#e2602a]/20">
        <span className="text-[8px] font-black font-mono uppercase tracking-[0.15em] text-[#efe7d6]/60 text-center leading-tight">
          Every entry the record holds, set where it happened
        </span>
        <Link
          to="/XEqualsX"
          className="text-[10px] font-black font-mono text-record-mark tracking-[0.2em] leading-none hover:text-[#efe7d6] transition-colors"
        >
          x = x
        </Link>
      </div>

      {/* Hero — the cover painting, the page's name, and the one thing the map promises. */}
      <div className="relative bg-[#241d16] overflow-hidden">
        <RecordCover position="center 32%" strength={0.5} blend="screen" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(36,29,22,.5), rgba(36,29,22,.72) 55%, #241d16 100%)' }} />
        <div className="relative z-10 px-6 lg:px-10 py-9 lg:py-12 flex flex-col items-center justify-center gap-3 text-center">
          <SignalBeacon size={40} color="#7fc9e4" />
          <h1
            className="font-black uppercase text-[#efe7d6] leading-[1.05] max-w-md lg:max-w-3xl"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 3.6vw, 54px)', letterSpacing: '-0.02em' }}
          >
            Map
          </h1>
          <p className="text-[13px] lg:text-[15px] leading-[1.65] text-[#efe7d6]/80 max-w-sm lg:max-w-2xl" style={{ fontFamily: 'var(--font-reading)' }}>
            A solution, a crisis or an action can say roughly where it is. This is every entry that does,
            standing where it stands. Region only — never a precise location, and never a person.
          </p>
        </div>
      </div>

      {/* ── THE PLANET, WHOLE ──────────────────────────────────────────────────────
          Not a slippy map with tiles, edges and a grey panel on a wide screen. A plate:
          every coast on Earth as a stipple of ink, equirectangular, so the Arctic is at the
          top edge and Antarctica along the bottom and the whole world fits whatever frame
          it is given. Phone and desktop see the same planet, drawn the same way. */}
      <div className="w-full bg-[#efe7d6] border-b-2 border-[#141210]/40">
        <div className="max-w-[1100px] mx-auto px-4 lg:px-10 py-6 lg:py-8">
          <RecordWorldMap />
        </div>
      </div>

      {/* What a mark means, and what the plate will not do. */}
      <div className="max-w-2xl lg:max-w-3xl mx-auto px-4 py-6">
        <p className="text-[13px] lg:text-[15px] leading-[1.7] text-[#141210]/80" style={{ fontFamily: 'var(--font-reading)', textWrap: 'pretty' }}>
          A mark is only ever set where an entry says it is, to the region and no finer — never a precise
          location, and never a person. An entry with no place it can honestly be put is not guessed at and
          not dropped: it is simply not on the plate, and the count above it says how many of the record's
          published entries are here.
        </p>
      </div>

      {/* Signal band — the way back to the record */}
      <div className="bg-[#e2602a] px-5 lg:px-10 py-5 lg:py-8 text-center">
        <Link
          to="/TogetherChangeClimate"
          className="inline-flex items-center gap-2 px-5 py-4 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#efe7d6] active:text-[#141210] transition-colors"
        >
          Back to the record <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <p className="px-5 pb-9 pt-6 text-center text-[11px] font-mono text-[#5a5246] leading-relaxed">
        Platform built by Brian Hughes ·{' '}
        <Link to="/Welcome" className="hover:text-[#b3261e] underline decoration-dotted underline-offset-2 transition-colors">UF51 CIC</Link>
        {' '}· Scotland
      </p>
    </div>
  );
}