import React from 'react';
import { Link } from 'react-router-dom';
import RecordBackBar from '@/components/climate/RecordBackBar';
import SignalBeacon from '@/components/climate/SignalBeacon';
import RecordPaintedBand from '@/components/climate/RecordPaintedBand';
import RecordWorldMap from '@/components/climate/RecordWorldMap';
import NextActionNear from '@/components/climate/NextActionNear';
import { ArrowRight } from 'lucide-react';

/* ── THE MAP IS A PAGE OF THE RECORD, NOT A POSTER ABOUT IT ────────────────────────
   This page wore the clothes of the thing the record replaced: a cold masthead, a
   condensed uppercase headline, two beacon dots pulsing round a quotation, a scanline
   over the world and a signal line crossing it in eight seconds. It also said SIGNALS
   where the record says entries, and TRANSMISSION where the record says reads — a
   reader who came here from the brief was handed a different publication.

   So it is built from the record's own parts: the same paper bar and the same way back
   as every other page (one component, so it cannot drift again), the covenant band, the
   cover painting, the orange band at the foot. And one rule for the words: a page whose
   copy is a single statement puts that statement in the middle of the measure, not
   ragged against the left edge of a column it does not fill. */
export default function ClimateMapPage() {
  return (
    <div className="climate-record record-map-page relative min-h-screen text-record-ink" style={{ fontFamily: 'var(--font-body)' }}>
      <RecordBackBar eyebrow="The record · Map" />

      {/* Covenant band — the mark every page of the record carries, and the way to it. */}
      <div className="record-continuous-band px-5 py-3 flex flex-col items-center justify-center gap-1.5 border-b border-record-paper/20">
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

      {/* Hero — the cover painting, the page's name, and the one thing the map promises.
          The painting is not mixed here by hand any more: every dark band on the record now
          comes from RecordPaintedBand, so the map, the wire and the reach pages are the same
          room at the same strength rather than three rooms that happen to be dark. */}
      <RecordPaintedBand continuous>
        <div className="relative z-10 px-4 lg:px-10 py-9 lg:py-12 flex flex-col items-center justify-center gap-3 text-center">
          <SignalBeacon size={40} color="rgb(var(--cartoon-sun))" />
          <h1
            className="font-black uppercase text-[#efe7d6] leading-[1.05] max-w-md lg:max-w-3xl"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.2vw, 46px)', letterSpacing: '-0.02em' }}
          >
            Map
          </h1>
          <p className="text-[13px] lg:text-[15px] leading-[1.65] text-[#efe7d6]/80 max-w-sm lg:max-w-2xl" style={{ fontFamily: 'var(--font-reading)' }}>
            A solution, a crisis, an action, or a line on the wire can say roughly where it is. This is
            every entry that does, standing where it stands. Region only — never a precise location,
            and never a person.
          </p>
        </div>
      </RecordPaintedBand>

      {/* ── THE PLANET, WHOLE ──────────────────────────────────────────────────────
          Not a slippy map with tiles, edges and a grey panel on a wide screen. A plate:
          every coast on Earth as a stipple of ink, equirectangular, so the Arctic is at the
          top edge and Antarctica along the bottom and the whole world fits whatever frame
          it is given. Phone and desktop see the same planet, drawn the same way.

          Brian, 18 November: "no coolasfuck map bro." It was a pale rectangle of paper in
          the middle of a painted page — the one sheet on the record with nothing behind it,
          standing on a wall it was hiding. So the world is a print now, mounted on the
          painting the way a plate is mounted on a wall: the cover screened into the ink
          behind it, a bone mount around the frame, and the engraving itself still on solid
          paper so not one coast or count loses its contrast. The painting is the room; the
          planet is the thing pinned in it. */}
      <RecordPaintedBand soft className="record-map-plate w-full border-b-2 border-record-ink/40">
        <div className="relative z-10 max-w-[1100px] mx-auto px-3 lg:px-10 py-6 lg:py-9">
          <div className="bg-record-bone p-1.5 lg:p-3 shadow-[0_18px_44px_rgba(0,0,0,.55)]">
            <RecordWorldMap />
          </div>
        </div>
      </RecordPaintedBand>

      {/* The plate says where the record stands. This says what is happening there soon —
          the only question that turns reading a map into turning up somewhere. */}
      <div className="record-reading-panel record-map-near"><NextActionNear /></div>

      {/* What a mark means, and what the plate will not do. One statement, so it sits in
          the middle of its own measure instead of hanging off the left of a wide column. */}
      <div className="record-reading-panel record-map-note max-w-[1100px] mx-auto px-4 lg:px-10 py-7 lg:py-9 text-center">
        <p className="mx-auto max-w-[46ch] text-[13px] lg:text-[15px] leading-[1.75] text-[#141210]/80" style={{ fontFamily: 'var(--font-reading)', textWrap: 'pretty' }}>
          A mark is only ever set where an entry says it is, to the region and no finer. An entry with no
          place it can honestly be put is not guessed at and not dropped — it is simply not on the plate,
          and the count above it says how many of the record's published entries are here.
        </p>
      </div>

      {/* Signal band — the way on, and the way back. The plate and the impact page are two
          halves of one question (where is this happening, and who is reading it), so neither
          leaves you stranded on the other side of the record. */}
      <div className="bg-[#e2602a] px-5 lg:px-10 py-6 lg:py-8 text-center">
        <Link
          to="/TogetherChangeClimate"
          className="inline-flex items-center gap-2 px-5 py-4 bg-[#141210] text-[#efe7d6] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#efe7d6] active:text-[#141210] transition-colors"
        >
          Back to the record <ArrowRight className="w-4 h-4" />
        </Link>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-black font-mono uppercase tracking-[0.12em] text-[#141210]/75">
          <Link to="/ClimateImpact" className="hover:text-[#141210] transition-colors">Who is reading →</Link>
          <Link to="/ClimateWire" className="hover:text-[#141210] transition-colors">The wire →</Link>
          <Link to="/ClimateSearch" className="hover:text-[#141210] transition-colors">Search the record →</Link>
        </div>
      </div>


    </div>
  );
}