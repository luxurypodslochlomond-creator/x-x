import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { HelpCircle, Waves, X } from 'lucide-react';

function Modal({ onClose, children }) {
  return createPortal(
    <div 
      className="fixed inset-0 bg-black flex items-center justify-center p-4"
      style={{ zIndex: 99999 }}
      onClick={onClose}
    >
      {children}
    </div>,
    document.body
  );
}

export default function BinauralBeatsTooltip({ className = "" }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <span
        className={`inline-flex items-center gap-1 cursor-pointer ${className}`}
        onClick={(e) => { e.stopPropagation(); setShowTooltip(true); }}
      >
        <span className="font-bold text-cyan-400">binaural beats</span>
        <HelpCircle className="w-4 h-4 text-cyan-400" />
      </span>
      
      {showTooltip && (
        <Modal onClose={() => setShowTooltip(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-black border-4 border-cyan-500 p-6 max-w-sm w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Waves className="w-6 h-6 text-cyan-400" />
                <h4 className="font-black text-white text-lg font-mono">BINAURAL BEATS</h4>
              </div>
              <button onClick={() => setShowTooltip(false)}>
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            
            <div className="space-y-3 text-sm text-gray-100 font-mono">
              <div className="bg-green-900/60 border-2 border-green-500 p-3">
                <p className="font-bold text-green-400 mb-1">WHY?</p>
                <p className="text-xs text-white">
                  Your brain can't hear low frequencies (like 2Hz sleep waves). Binaural beats trick your brain into creating them.
                </p>
              </div>

              <div className="bg-cyan-900/60 border-2 border-cyan-500 p-3">
                <p className="font-bold text-cyan-400 mb-1">HOW:</p>
                <p className="text-xs text-white">
                  200Hz left ear + 202Hz right ear = brain perceives 2Hz difference. Brainwaves sync to it.
                </p>
              </div>

              <div className="bg-purple-900/60 border-2 border-purple-500 p-3">
                <p className="font-bold text-purple-400 mb-1">BENEFIT:</p>
                <p className="text-xs text-white">
                  2Hz = deep sleep. 10Hz = focus. 40Hz = peak performance.
                </p>
              </div>

              <p className="text-xs text-yellow-400 font-bold text-center">
                🎧 Headphones REQUIRED
              </p>
            </div>
            
            <button
              onClick={() => setShowTooltip(false)}
              className="mt-5 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 font-mono"
            >
              GOT IT
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}