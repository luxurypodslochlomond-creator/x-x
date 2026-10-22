import React, { useRef } from 'react';
import useTransmissionAudio from './transmission/useTransmissionAudio';
import useTransmissionLoop from './transmission/useTransmissionLoop';
import TransmissionTransport from './TransmissionTransport';

const CORNERS = [
  'top-2.5 left-2.5 border-t-2 border-l-2',
  'top-2.5 right-2.5 border-t-2 border-r-2',
  'bottom-2.5 left-2.5 border-b-2 border-l-2',
  'bottom-2.5 right-2.5 border-b-2 border-r-2',
];

export default function TransmissionConsole({ audioUrl, artistName, trackTitle, dedication }) {
  const { hasAudio, playing, muted, toggle, toggleMute, seek, audioElRef, apiRef } = useTransmissionAudio(audioUrl);
  const stageRef = useRef(null);
  const scopeRef = useRef(null);
  const fallRef = useRef(null);
  const flashRef = useRef(null);
  const barRef = useRef(null);
  const timeRef = useRef(null);
  const durRef = useRef(null);

  useTransmissionLoop({ stageRef, scopeRef, fallRef, flashRef, barRef, timeRef, durRef, apiRef });

  return (
    <section className="relative bg-[#141210] text-[#efe7d6] overflow-hidden border-b-2 border-b-[#141210]">
      <style>{`
        @keyframes tx-ring { 0%, 100% { box-shadow: 0 0 0 0 rgba(226,96,42,.55); } 50% { box-shadow: 0 0 0 14px rgba(226,96,42,0); } }
        @keyframes tx-spin { to { transform: rotate(360deg); } }
        @keyframes tx-bar { from { transform: translateY(-10%); } to { transform: translateY(1000%); } }
        @keyframes tx-flick { 0%, 92%, 96%, 100% { opacity: 1; } 93%, 95% { opacity: .7; } }
      `}</style>
      {hasAudio && <audio ref={audioElRef} src={audioUrl} loop preload="metadata" crossOrigin="anonymous" />}

      <TransmissionTransport
        hasAudio={hasAudio}
        playing={playing}
        muted={muted}
        trackTitle={trackTitle}
        artistName={artistName}
        onToggle={toggle}
        onToggleMute={toggleMute}
        onSeek={seek}
        barRef={barRef}
        timeRef={timeRef}
        durRef={durRef}
      />

      {/* ── THE ART — tap the planet, feel the signal. Whole and uncovered. ── */}
      <div
        role="button"
        tabIndex={0}
        aria-label={playing ? 'Pause transmission' : 'Start transmission'}
        onClick={toggle}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
        className="relative w-full overflow-hidden bg-[#141210] cursor-pointer select-none touch-manipulation"
        style={{ height: 'min(94vw, 430px)' }}
      >
        <canvas ref={stageRef} className="absolute inset-0 w-full h-full" />
        <div ref={flashRef} className="absolute inset-0 pointer-events-none bg-[#e2602a]" style={{ opacity: 0 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 60%, rgba(20,18,16,0.5) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.07]" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #efe7d6 2px, #efe7d6 3px)' }} />
        <div className="absolute inset-x-0 top-0 h-[2px] pointer-events-none bg-gradient-to-r from-transparent via-[#e2602a]/50 to-transparent" style={{ animation: 'tx-bar 5s linear infinite' }} />
        {CORNERS.map((c) => <span key={c} className={`absolute w-4 h-4 border-[#e2602a] pointer-events-none ${c}`} />)}
      </div>

      {/* Scope + waterfall */}
      <div className="relative border-y border-[#efe7d6]/10 bg-[#141210]">
        <span className="absolute top-1 left-2 z-10 text-[7px] font-mono tracking-[0.25em] text-[#efe7d6]/35 pointer-events-none">SCOPE</span>
        <canvas ref={scopeRef} className="block w-full h-[64px]" />
        <div className="relative border-t border-[#efe7d6]/10">
          <span className="absolute top-1 left-2 z-10 text-[7px] font-mono tracking-[0.25em] text-[#efe7d6]/50 pointer-events-none">SPECTROGRAM</span>
          <canvas ref={fallRef} width={128} height={40} className="block w-full h-[44px]" style={{ imageRendering: 'pixelated' }} />
        </div>
      </div>

      <p className="px-5 pt-3.5 pb-5 text-[10px] font-mono text-[#efe7d6]/40 leading-relaxed italic">{dedication}</p>
    </section>
  );
}