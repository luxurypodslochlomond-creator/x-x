import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import P51ExplainerModal from './P51ExplainerModal';

export default function P51Symbol({ className = "", showTooltip = true, large = false }) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (showTooltip) {
      setShowModal(true);
    }
  };

  return (
    <>
      <span
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick(e)}
        className={`inline-flex items-center gap-1 relative ${className} ${showTooltip ? 'cursor-pointer hover:opacity-80 transition-opacity active:scale-95' : ''}`}
        style={{ touchAction: 'manipulation' }}
      >
        <span className={`font-mono font-bold text-pink-400 ${large ? 'text-3xl' : ''}`}>P51</span>
        {showTooltip && (
          <HelpCircle className="w-4 h-4 text-pink-400/60" />
        )}
      </span>

      <P51ExplainerModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}