import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft } from 'lucide-react';
import ClimateMapPlaceholder from '@/components/climate/ClimateMapPlaceholder';

// The mapping library is 150kB on its own. Loaded this way, the page's masthead
// paints immediately and the map streams in behind a placeholder that holds its space.
const ClimateMap = React.lazy(() => import('@/components/climate/ClimateMap'));

export default function ClimateMapPage() {
  return (
    <div className="min-h-screen bg-[#efe7d6] text-[#1a1612]" style={{ fontFamily: 'var(--font-body)' }}>
      <style>{`
        @keyframes twcc-epigraph { from { opacity: 0; letter-spacing: 0.3em; } to { opacity: 1; letter-spacing: 0.15em; } }
        @keyframes twcc-scan { from { background-position: 0 0; } to { background-position: 0 3px; } }
        @keyframes twcc-flicker { 0%, 92%, 96%, 100% { opacity: 1; } 93%, 95% { opacity: .72; } }
        @media (prefers-reduced-motion: reduce) { * { animation-duration: .01ms !important; } }
      `}</style>

      {/* BIG SCIENCE EPIGRAPH */}
      <div className="bg-[#241d16] px-5 py-3 flex flex-col items-center justify-center gap-1.5 border-b border-[#e2602a]/20" style={{ animation: 'twcc-epigraph 1.2s ease-out both' }}>
        <div className="flex items-center justify-center gap-2 w-full">
          <span className="w-1 h-1 rounded-full bg-[#e2602a] animate-pulse flex-shrink-0" />
          <span className="text-[8px] font-black font-mono uppercase tracking-[0.15em] text-[#efe7d6]/60 text-center leading-tight">
            This is the time. And this is the record of the time.
          </span>
          <span className="w-1 h-1 rounded-full bg-[#e2602a] animate-pulse flex-shrink-0" />
        </div>
        <span className="text-[7px] font-mono uppercase tracking-[0.2em] text-[#efe7d6]/25">
          Laurie Anderson · From the Air, Big Science, 1982
        </span>
        <div className="text-[10px] font-black font-mono text-[#e2602a] tracking-[0.2em] leading-none">
          x = x
        </div>
      </div>

      {/* HEADER */}
      <div className="bg-[#241d16] px-4 py-4 border-b-2 border-[#e2602a]/30">
        <div className="flex items-center justify-between gap-3">
          <Link
            to={createPageUrl("TogetherChangeClimate")}
            className="flex items-center gap-2 text-[#efe7d6] hover:text-[#e2602a] transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[10px] font-black font-mono uppercase tracking-widest">RECORD</span>
          </Link>
          <div
            className="flex items-center gap-1.5 pointer-events-none"
            style={{ animation: 'twcc-flicker 7s linear 1s infinite' }}
          >
            <span className="w-1 h-1 rounded-full bg-[#e2602a] animate-pulse" />
            <span className="text-[7px] font-black font-mono uppercase tracking-[0.25em] text-[#efe7d6]/30">From the Air · Big Science</span>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[520px] text-center">
          <h1
            className="font-black uppercase leading-[0.95] text-[#efe7d6] mt-3"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 9vw, 48px)',
              letterSpacing: '-0.035em',
            }}
          >
            TRANSMISSION<br />
            <span className="text-[#e2602a]">MAP</span>
          </h1>
          <p className="text-[11px] font-black font-mono uppercase leading-relaxed mt-2 text-[#e2602a] tracking-[0.14em] mx-auto max-w-[330px]">
            Together we can change the course of climate change
          </p>
          <p className="text-[10px] font-bold uppercase leading-relaxed mt-2 text-[#efe7d6]/70 tracking-wide mx-auto max-w-[330px]">
            Signals from a warming world — after Janine Selendy
          </p>
          <p className="text-[8px] font-black font-mono uppercase leading-relaxed mt-2 text-[#e2602a] tracking-[0.1em]" style={{ opacity: 0.7 }}>
            Every signal · every shore · nobody left behind
          </p>
        </div>
      </div>

      {/* MAP ──────────────────────────────────────────────────────────────────────────
          On a desktop this was a 720-pixel box with square edges floating in the middle of
          a wide screen: the map this record actually is, shown as a widget pasted onto a
          page. It now takes the whole width and the height that is left, with the frame
          doing the work a frame should — holding the map inside the record rather than
          cropping it. A phone is unchanged: full width, its own height. */}
      <div
        className="relative w-full overflow-hidden border-y-2 border-[#e2602a]/25"
        style={{ height: 'clamp(400px, calc(100dvh - 300px), 900px)' }}
      >
        <Suspense fallback={<ClimateMapPlaceholder />}>
          <ClimateMap />
        </Suspense>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[900]"
          style={{ boxShadow: 'inset 0 0 24px rgba(36,29,22,0.28), inset 0 0 120px rgba(36,29,22,0.22)' }}
        />
      </div>

      {/* FOOTER */}
      <div className="bg-[#241d16] px-4 py-4 border-t-2 border-[#e2602a]/20">
        <p className="text-[8px] font-mono font-black tracking-[0.3em] text-center text-[#efe7d6]/25">
          x = x
        </p>
        <p className="text-[8px] font-mono text-center mt-1 text-[#efe7d6]/40">
          A public service · for the world · no ads · no sponsorship · support welcome
        </p>
      </div>
    </div>
  );
}