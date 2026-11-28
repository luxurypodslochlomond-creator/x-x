import React, { useState } from 'react';

// A line the record is willing to have taken away from it: the address of a page,
// or the paragraph Janine can paste into her own introduction. One button, one
// job. It says what it did, and then it stops saying it.

export default function CopyLine({ text, label = 'Copy', className = '' }) {
  const [copied, setCopied] = useState(false);

  const take = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      onClick={take}
      className={`min-w-[9rem] justify-center text-center px-2.5 py-1.5 border-2 border-[#141210]/30 text-[9px] font-black font-mono uppercase tracking-wide text-[#141210] active:border-[#b3261e] active:text-[#b3261e] transition-colors flex-shrink-0 inline-flex items-center ${className}`}
      aria-label={`${label}: ${text.slice(0, 40)}`}
    >
      {copied ? 'Copied' : label}
    </button>
  );
}