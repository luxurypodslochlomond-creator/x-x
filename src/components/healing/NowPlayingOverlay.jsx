import React from 'react';
import { Volume2, VolumeX, Share2 } from 'lucide-react';

/**
 * NOW PLAYING OVERLAY — Fullscreen healing visualizer + controls
 * Extracted from FrequencyChamber to reduce compile size on mobile.
 */
export default function NowPlayingOverlay({
  selected,
  timer,
  timerTarget,
  volume,
  setVolume,
  formatTime,
  stop,
  currentSweepFreq,
  setTimerTarget,
  timerTargetRef,
  canvasRef
}) {
  if (!selected) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: 'black', willChange: 'auto' }}
    >
      {/* FULLSCREEN HEALING CANVAS - pure chromotherapy */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* MINIMAL FLOATING CONTROLS - top */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
        {/* TIMER */}
        <div className="flex flex-col items-start bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
          <div className="text-3xl sm:text-4xl font-black font-mono" style={{
            color: selected.color,
            textShadow: `0 0 15px ${selected.color}`
          }}>
            {formatTime(timer)}
          </div>
          {timerTarget && (
            <div className="text-xs font-mono text-gray-400">
              / {formatTime(timerTarget)}
            </div>
          )}
        </div>

        {/* STOP BUTTON */}
        <button
          onClick={stop}
          className="px-8 py-4 rounded-xl font-black font-mono text-base bg-black border-2 active:scale-95 transition-all"
          style={{
            borderColor: selected.color,
            color: selected.color,
            boxShadow: `0 0 20px ${selected.color}60`,
            minWidth: '100px'
          }}
        >
          ■ STOP
        </button>
      </div>

      {/* SWEEP FREQUENCY COUNTER - Top center (only for sweep mode) */}
      {selected.isSweep && (
        <div className="absolute top-24 left-4 right-4 z-10">
          <div className="bg-black/60 backdrop-blur-sm px-6 py-4 rounded-lg text-center">
            <div className="text-4xl sm:text-6xl font-black font-mono text-green-400 mb-2" style={{ textShadow: '0 0 25px #22c55e' }}>
              {currentSweepFreq.toLocaleString()} Hz
            </div>
            <div className="flex items-center justify-center gap-2 text-green-400 text-xs sm:text-sm font-mono">
              <span>20Hz</span>
              <div className="flex-1 bg-green-900/30 h-2 rounded-full overflow-hidden max-w-xs">
                <div
                  className="bg-green-500 h-full transition-all duration-100"
                  style={{
                    width: `${((Math.log10(currentSweepFreq) - Math.log10(20)) / (Math.log10(20000) - Math.log10(20))) * 100}%`,
                    boxShadow: '0 0 10px rgba(34, 197, 94, 0.8)'
                  }}
                />
              </div>
              <span>20kHz</span>
            </div>
          </div>
        </div>
      )}

      {/* PSYCHOLOGY AFFIRMATION - Top center (for non-sweep modes) */}
      {!selected.isSweep && selected.psychology && (
        <div className="absolute top-24 left-4 right-4 z-10">
          <div className="bg-black/60 backdrop-blur-sm px-4 py-3 rounded-lg text-center">
            <p className="text-white text-sm sm:text-base font-bold" style={{ textShadow: `0 0 10px ${selected.color}` }}>
              {selected.psychology}
            </p>
          </div>
        </div>
      )}

      {/* FLOATING BOTTOM CONTROLS */}
      <div className="absolute bottom-6 left-4 right-4 z-10 space-y-3">
        {/* VOLUME - floating */}
        <div className="flex items-center gap-3 bg-black/60 backdrop-blur-sm px-4 py-3 rounded-lg">
          <VolumeX className="w-4 h-4 text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
          <Volume2 className="w-4 h-4 text-gray-400" />
          <span className="text-gray-300 font-mono text-xs w-9">{Math.round(volume * 100)}%</span>
        </div>

        {/* TIMER + SHARE - floating */}
        <div className="flex gap-2">
          {/* TIMER PRESETS */}
          {[5, 10, 15, 20].map(mins => (
            <button
              key={mins}
              onClick={() => { setTimerTarget(mins * 60); timerTargetRef.current = mins * 60; }}
              className={`flex-1 py-2 rounded-lg font-black font-mono text-xs border transition-all ${
                timerTarget === mins * 60
                  ? 'bg-white text-black border-white'
                  : 'bg-black/60 backdrop-blur-sm text-white border-white/20 hover:border-white/40'
              }`}
            >
              {mins}m
            </button>
          ))}

          {/* SHARE LINK */}
          <button
            onClick={() => {
              const shareUrl = `${window.location.origin}${window.location.pathname}?freq=${selected.id}`;
              navigator.clipboard.writeText(shareUrl);
              alert(`✓ Copied: ${selected.name}\n\n${shareUrl}`);
            }}
            className="px-4 py-2 rounded-lg font-black font-mono text-xs bg-black/60 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all text-white flex items-center gap-1"
          >
            <Share2 className="w-3 h-3" />
            SHARE LINK
          </button>
        </div>
      </div>
    </div>
  );
}