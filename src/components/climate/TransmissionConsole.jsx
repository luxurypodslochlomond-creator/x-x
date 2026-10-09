import React, { useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import useTransmissionAudio from './transmission/useTransmissionAudio';
import useTransmissionLoop from './transmission/useTransmissionLoop';

const CORNERS = [
  'top-2.5 left-2.5 border-t-2 border-l-2',
  'top-2.5 right-2.5 border-t-2 border-r-2',
  'bottom-2.5 left-2.5 border-b-2 border-l-2',
  'bottom-2.5 right-2.5 border-b-2 border-r-2',
];

export default function TransmissionConsole({ audioUrl, artistName, trackTitle, dedication }) {
  const { hasAudio, playing, muted, toggle, toggleMute, audioElRef, apiRef } = useTransmissionAudio(audioUrl);
  const stageRef = useRef(null);
  const scopeRef = useRef(null);
  const fallRef = useRef(null);
  const flashRef = useRef(null);
  const barRef = useRef(null);
  const timeRef = useRef(null);
  const durRef = useRef(null);

  useTransmissionLoop({ stageRef, scopeRef, fallRef, flashRef, barRef, timeRef, durRef, apiRef });

  return (
    <section className="relative bg-[#141210] text-[#efe7d6] overflow-hidden border-t-4 border-[#e2602a] border-b-2 border-b-[#141210]">
      <style>{`
        @keyframes tx-ring { 0%, 100% { box-shadow: 0 0 0 0 rgba(226,96,42,.55); } 50% { box-shadow: 0 0 0 14px rgba(226,96,42,0); } }
        @keyframes tx-bar { from { transform: translateY(-10%); } to { transform: translateY(1000%); } }
        @keyframes tx-flick { 0%, 92%, 96%, 100% { opacity: 1; } 93%, 95% { opacity: .7; } }
      `}</style>
      {hasAudio && <audio ref={audioElRef} src={audioUrl} loop preload="metadata" crossOrigin="anonymous" />}

      {/* Header */}
      <div className="flex items-center gap-2 px-5 pt-4 pb-3" style={{ animation: 'tx-flick 7s linear infinite' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#e2602a] animate-pulse" />
        <span className="text-[10px] font-black font-mono uppercase tracking-[0.25em] text-[#e2602a]">Transmission</span>
        <div className="flex-1 h-px bg-[#efe7d6]/15" />
        <span className={`text-[9px] font-black font-mono uppercase tracking-widest ${playing ? 'text-[#e2602a] animate-pulse' : 'text-[#efe7d6]/40'}`}>
          {playing ? 'On air' : 'Standby'}
        </span>
      </div>

      {/* Stage — tap the planet */}
      <div
        role="button"
        tabIndex={0}
        aria-label={playing ? 'Pause transmission' : 'Start transmission'}
        onClick={toggle}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
        className="relative w-full overflow-hidden bg-[#141210] cursor-pointer select-none touch-manipulation"
        style={{ height: 'min(100vw, 460px)' }}
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

      {/* Controls */}
      <div className="flex items-center gap-4 px-5 pt-5">
        <button
          onClick={toggle}
          aria-label={playing ? 'Pause transmission' : 'Start transmission'}
          className={`relative flex-shrink-0 w-16 h-16 rounded-full border-2 border-[#e2602a] flex items-center justify-center active:scale-95 transition-colors ${playing ? 'bg-[#e2602a]' : 'bg-[#141210]'}`}
          style={playing ? undefined : { animation: 'tx-ring 2s ease-in-out infinite' }}
        >
          {playing ? <Pause className="w-6 h-6 text-[#141210]" fill="currentColor" /> : <Play className="w-6 h-6 text-[#e2602a] ml-1" fill="currentColor" />}
        </button>
        <div className="flex-1 min-w-0">
          <h3 className="font-black uppercase leading-none text-[#efe7d6] truncate" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '30px', letterSpacing: '-0.025em' }}>
            {trackTitle}
          </h3>
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#efe7d6]/50 mt-1.5 truncate">
            {hasAudio ? artistName : playing ? 'Generative signal · live' : 'Tap the planet · feel the signal'}
          </p>
        </div>
        {hasAudio && (
          <button onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'} className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-[#efe7d6]/50 active:text-[#e2602a]">
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* Progress */}
      <div className="px-5 pt-4">
        <div className="relative h-[3px] bg-[#efe7d6]/10 overflow-hidden">
          <div ref={barRef} className="h-full bg-[#e2602a]" style={{ width: '0%' }} />
          <div className="absolute inset-0 opacity-40" style={{ background: 'repeating-linear-gradient(90deg, transparent, transparent 9px, #141210 9px, #141210 10px)' }} />
        </div>
        <div className="flex items-center justify-between mt-1.5 text-[9px] font-mono text-[#efe7d6]/40">
          <span ref={timeRef}>00:00</span>
          <span ref={durRef}>{'\u221E'}</span>
        </div>
      </div>

      <p className="px-5 pt-3 pb-5 text-[10px] font-mono text-[#efe7d6]/40 leading-relaxed italic">{dedication}</p>
    </section>
  );
}