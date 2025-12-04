import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Brain, ExternalLink, X } from 'lucide-react';

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

export default function MITBrainWavesTooltip() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}
        className="text-cyan-400 hover:text-cyan-300 underline decoration-dotted cursor-pointer font-mono text-sm"
      >
        MIT brain wave research
      </button>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-black border-4 border-cyan-500 p-6 max-w-lg w-full my-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-cyan-400" />
                <h3 className="text-lg font-black text-white font-mono">MIT BRAIN WAVES (2025)</h3>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-gray-200 font-mono max-h-[60vh] overflow-y-auto">
              <div className="bg-cyan-900/60 border-2 border-cyan-500 p-3">
                <p className="font-bold text-cyan-400 mb-2">Dr. Earl K. Miller:</p>
                <p className="text-white text-xs">
                  "Brain waves don't just reflect thoughts - they CREATE them."
                </p>
              </div>

              <div className="bg-amber-900/60 border-2 border-amber-500 p-3">
                <p className="font-bold text-amber-400">Alpha/Beta (15-35Hz)</p>
                <p className="text-white text-xs">Top-down control. Goals and rules.</p>
              </div>

              <div className="bg-green-900/60 border-2 border-green-500 p-3">
                <p className="font-bold text-green-400">Gamma (35-60Hz)</p>
                <p className="text-white text-xs">Sensory data from the world.</p>
              </div>

              <div className="bg-purple-900/60 border-2 border-purple-500 p-3">
                <p className="font-bold text-purple-400">Together</p>
                <p className="text-white text-xs">Beta sets constraints. Gamma fills details. = Conscious control.</p>
              </div>

              <a
                href="https://thedebrief.org/mit-neuroscientist-proposes-brain-waves-are-the-hidden-engine-behind-thought-and-consciousness/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-xs underline"
              >
                <ExternalLink className="w-4 h-4" />
                Read full MIT article
              </a>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-5 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 font-mono"
            >
              GOT IT
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}