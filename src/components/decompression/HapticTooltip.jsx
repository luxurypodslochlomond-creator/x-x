import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { HelpCircle, Vibrate, X } from 'lucide-react';

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

export default function HapticTooltip({ className = "" }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <span
        className={`inline-flex items-center gap-1 cursor-pointer ${className}`}
        onClick={(e) => { e.stopPropagation(); setShowTooltip(true); }}
      >
        <span className="font-bold text-pink-400">haptic feedback</span>
        <HelpCircle className="w-4 h-4 text-pink-400" />
      </span>
      
      {showTooltip && (
        <Modal onClose={() => setShowTooltip(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-black border-4 border-pink-500 p-6 max-w-sm w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Vibrate className="w-6 h-6 text-pink-400" />
                <h4 className="font-black text-white text-lg font-mono">HAPTIC FEEDBACK</h4>
              </div>
              <button onClick={() => setShowTooltip(false)}>
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            
            <div className="space-y-3 text-sm text-gray-100 font-mono">
              <div className="bg-green-900/60 border-2 border-green-500 p-3">
                <p className="font-bold text-green-400 mb-1">WHY?</p>
                <p className="text-xs text-white">
                  Frequencies heal through vibration. Your body FEELS them directly through your nervous system.
                </p>
              </div>

              <div className="bg-pink-900/60 border-2 border-pink-500 p-3">
                <p className="font-bold text-pink-400 mb-1">HOW:</p>
                <p className="text-xs text-white">
                  Phone vibrates at healing frequency:<br/>
                  • 100Hz pain = rapid pulses<br/>
                  • 2Hz sleep = slow pulses<br/>
                  • 0.1Hz heart = heartbeat rhythm
                </p>
              </div>

              <div className="bg-purple-900/60 border-2 border-purple-500 p-3">
                <p className="font-bold text-purple-400 mb-1">BENEFIT:</p>
                <p className="text-xs text-white">
                  Don't just HEAR healing - FEEL it through your whole body.
                </p>
              </div>

              <p className="text-xs text-yellow-400 font-bold text-center">
                📳 Place phone on stomach/chest
              </p>
            </div>
            
            <button
              onClick={() => setShowTooltip(false)}
              className="mt-5 w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 font-mono"
            >
              GOT IT
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}