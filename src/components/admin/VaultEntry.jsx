import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

// The builder preview runs inside a frame where the modern clipboard call is refused,
// so fall back to the older select-and-copy method, which still works there.
function copyTheOldWay(text) {
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.top = "-1000px";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();
  field.setSelectionRange(0, text.length);
  let done = false;
  try {
    done = document.execCommand("copy");
  } catch {
    done = false;
  }
  document.body.removeChild(field);
  return done;
}

export default function VaultEntry({ entry }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = entry.value || "";
    let done = false;
    try {
      await navigator.clipboard.writeText(text);
      done = true;
    } catch {
      done = copyTheOldWay(text);
    }
    setCopied(done);
    if (done) setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-[#1a1612]/15 bg-white/70 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6b6258]">
            {entry.label}
          </p>
          <p className="mt-1 font-mono text-sm font-bold text-[#1a1612] break-words select-all">
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