import React, { useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import TransmissionMasterPlate from './TransmissionMasterPlate';

// ── THE TRANSPORT ──
// Above the art, so the picture is never covered and play keeps it in view.
// The rail is a real one: press anywhere on it and the track jumps there.
// With no track, the rail is only a read-out of the generative signal.
export default function TransmissionTransport({
  hasAudio, playing, muted, trackTitle, artistName,
  onToggle, onToggleMute, onSeek, barRef, timeRef, durRef,
}) {
  const railRef = useRef(null);
  const draggingRef = useRef(false);

  const jump = (e) => {
    if (!hasAudio) return;
    const r = railRef.current?.getBoundingClientRect();
    if (!r?.width) return;
    onSeek(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
  };
  const down = (e) => {
    if (!hasAudio) return;
    draggingRef.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    jump(e);
  };
  const move = (e) => { if (draggingRef.current) jump(e); };
  const up = (e) => {
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const status = hasAudio ? artistName : playing ? 'Generative signal · live' : 'Tap the planet · feel the signal';

  return (
    <div className="px-4 lg:px-10 pt-4 pb-4">
      {/* ── MASTHEAD ── */}
      <div className="flex items-center gap-2 mb-3.5" style={{ animation: 'tx-flick 7s linear infinite' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#e2602a] animate-pulse" />
        <span className="text-[10px] font-black font-mono uppercase tracking-[0.25em] text-[#e2602a]">Transmission</span>
        <div className="flex-1 h-px bg-[#efe7d6]/15" />
        {hasAudio && (
          <span className="text-[8px] font-black font-mono uppercase tracking-[0.2em] text-[#efe7d6]/75 border border-[#efe7d6]/25 px-1.5 py-0.5">
            Lossless
          </span>
        )}
        <span className={`text-[9px] font-black font-mono uppercase tracking-widest ${playing ? 'text-[#3fbf7f] animate-pulse' : 'text-[#efe7d6]/40'}`}>
          {playing ? 'On air' : 'Standby'}
        </span>
      </div>

      {/* ── TRANSPORT ── */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggle}
          aria-label={playing ? 'Pause transmission' : 'Start transmission'}
          className={`relative flex-shrink-0 w-[76px] h-[76px] rounded-full border-2 border-[#3fbf7f] flex items-center justify-center active:scale-95 transition-colors ${playing ? 'bg-[#3fbf7f]' : 'bg-[#141210]'}`}
          style={playing ? undefined : { animation: 'tx-ring 2s ease-in-out infinite' }}
        >
          {playing && <span className="absolute inset-[-8px] rounded-full border border-dashed border-[#3fbf7f]/45 pointer-events-none" style={{ animation: 'tx-spin 9s linear infinite' }} />}
          {playing ? <Pause className="w-7 h-7 text-[#141210]" fill="currentColor" /> : <Play className="w-7 h-7 text-[#3fbf7f] ml-1" fill="currentColor" />}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className="font-black uppercase leading-none text-[#efe7d6] truncate" style={{ fontFamily: 'var(--font-display)', fontSize: '35px', letterSpacing: '-0.03em' }}>
            {trackTitle}
          </h3>
          <p className="text-[10px] font-mono uppercase tracking-[0.24em] mt-2 truncate text-[#e2602a]">
            {status}
          </p>
          {hasAudio && <TransmissionMasterPlate />}
        </div>

        {hasAudio && (
          <button onClick={onToggleMute} aria-label={muted ? 'Unmute' : 'Mute'} className="flex-shrink-0 w-11 h-11 flex items-center justify-center text-[#efe7d6]/55 active:text-[#e2602a]">
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* ── THE RAIL — press anywhere to jump ── */}
      <div
        ref={railRef}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        aria-label={hasAudio ? 'Jump to a point in the track' : 'Signal progress'}
        className={`relative py-3 mt-1.5 ${hasAudio ? 'cursor-pointer touch-none' : ''}`}
      >
        <div className="relative h-[8px] bg-[#efe7d6]/12">
          <div ref={barRef} className="relative h-full" style={{ width: '0%', background: 'linear-gradient(90deg, #0f5f7a, #7fc9e4)' }}>
            {hasAudio && (
              <span
                className="absolute right-0 top-1/2 w-[11px] h-[11px] bg-[#e2602a] rotate-45 -translate-y-1/2 translate-x-1/2 pointer-events-none"
                style={{ boxShadow: '0 0 12px rgba(127,201,228,0.9)' }}
              />
            )}
          </div>
          <div className="absolute inset-0 pointer-events-none opacity-40" style={{ background: 'repeating-linear-gradient(90deg, transparent, transparent 9px, #141210 9px, #141210 10px)' }} />
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-[#efe7d6]/45">
        <span ref={timeRef}>00:00</span>
        <span className="text-[#efe7d6]/25 uppercase tracking-[0.2em]">{hasAudio ? 'press the rail to jump' : 'live signal'}</span>
        <span ref={durRef}>{'\u221E'}</span>
      </div>
    </div>
  );
}