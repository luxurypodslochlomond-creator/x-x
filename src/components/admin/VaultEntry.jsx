import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function VaultEntry({ entry }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(entry.value || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-[#1a1612]/15 bg-white/70 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6b6258]">
            {entry.label}
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-[#1a1612] break-words">
            {entry.value}
          </p>
          {entry.notes && (
            <p className="mt-1 text-xs text-[#6b6258] leading-relaxed">{entry.notes}</p>
          )}
        </div>
        {entry.value && (
          <button
            onClick={copy}
            title="Copy"
            className="shrink-0 border-2 border-[#1a1612]/20 p-2 hover:border-[#1a1612] transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-[#1a1612]" />
            ) : (
              <Copy className="w-4 h-4 text-[#1a1612]" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}