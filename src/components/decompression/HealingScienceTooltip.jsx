import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { HelpCircle, X, Atom } from 'lucide-react';

function Modal({ onClose, children }) {
  return createPortal(
    <div 
      className="fixed inset-0 bg-black flex items-center justify-center p-4 overflow-y-auto"
      style={{ zIndex: 99999 }}
      onClick={onClose}
    >
      {children}
    </div>,
    document.body
  );
}

export default function HealingScienceTooltip({ className = "" }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <span
        className={`inline-flex items-center gap-1 cursor-pointer ${className}`}
        onClick={(e) => { e.stopPropagation(); setShowTooltip(true); }}
      >
        <span className="font-bold text-cyan-400">healing science</span>
        <HelpCircle className="w-4 h-4 text-cyan-400" />
      </span>
      
      {showTooltip && (
        <Modal onClose={() => setShowTooltip(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-black border-4 border-cyan-500 p-6 max-w-lg w-full my-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Atom className="w-6 h-6 text-cyan-400" />
                <h4 className="font-black text-white text-lg font-mono">THE REAL SCIENCE</h4>
              </div>
              <button onClick={() => setShowTooltip(false)}>
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            
            <div className="space-y-2 text-sm text-gray-100 font-mono max-h-[60vh] overflow-y-auto">
              
              <div className="bg-yellow-900/60 border-2 border-yellow-500 p-3">
                <p className="font-bold text-yellow-400">40Hz GAMMA (MIT)</p>
                <p className="text-xs text-white">Reduced Alzheimer's plaque by 50%.</p>
              </div>

              <div className="bg-red-900/60 border-2 border-red-500 p-3">
                <p className="font-bold text-red-400">PAIN GATE (100Hz)</p>
                <p className="text-xs text-white">Fast signals close gate to pain. Melzack & Wall 1965.</p>
              </div>

              <div className="bg-pink-900/60 border-2 border-pink-500 p-3">
                <p className="font-bold text-pink-400">HEART COHERENCE (0.1Hz)</p>
                <p className="text-xs text-white">6 breaths/min = optimal HRV. HeartMath Institute.</p>
              </div>

              <div className="bg-green-900/60 border-2 border-green-500 p-3">
                <p className="font-bold text-green-400">528Hz DNA REPAIR</p>
                <p className="text-xs text-white">Dr. Glen Rein: Increased DNA light absorption 8-9%.</p>
              </div>

              <div className="bg-cyan-900/60 border-2 border-cyan-500 p-3">
                <p className="font-bold text-cyan-400">7.83Hz SCHUMANN</p>
                <p className="text-xs text-white">Earth's frequency. NASA uses for astronaut health.</p>
              </div>

              <div className="bg-purple-900/60 border-2 border-purple-500 p-3">
                <p className="font-bold text-purple-400">BINAURAL BEATS</p>
                <p className="text-xs text-white">Documented since 1839. Proven for sleep/focus/anxiety.</p>
              </div>

              <div className="bg-red-900/80 border-2 border-red-500 p-3">
                <p className="font-black text-red-400">WHY BURIED?</p>
                <p className="text-xs text-white">
                  Pharma = $1.48 trillion/year. Frequency = free. Can't patent nature.
                </p>
              </div>
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