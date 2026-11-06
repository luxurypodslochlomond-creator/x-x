import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// ── EVERY NUMBER ON THIS PAGE IS A DOOR ──────────────────────────────────────
// A count nobody can walk to is a number asking to be taken on trust, and this page's
// whole argument is that nothing here has to be. So each plate is a link: tap the count
// and you land on the thing it counted, where you can look at the entries themselves and
// see whether the number is telling the truth. Nothing here is decoration.

export default function RecordToday({ figures }) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {figures.map(({ n, label, to }) => (
        <Link
          key={label}
          to={to}
          aria-label={`${n} ${label} — open it`}
          className="group bg-[#241d16] text-[#efe7d6] px-4 py-4 flex flex-col justify-between min-h-[92px] active:bg-[#e2602a] active:text-[#241d16] transition-colors"
        >
          <div className="text-[28px] font-black font-mono text-[#e2602a] leading-none group-hover:text-[#ffb27a] group-active:text-[#241d16] transition-colors">
            {n}
          </div>
          <div className="flex items-end justify-between gap-2">
            <div className="text-[10px] font-mono uppercase tracking-wide text-[#efe7d6]/70 mt-1.5 leading-tight group-active:text-[#241d16]/80">
              {label}
            </div>
            <ArrowRight className="w-3 h-3 flex-shrink-0 text-[#efe7d6]/35 group-hover:text-[#e2602a] group-active:text-[#241d16]" />
          </div>
        </Link>
      ))}
    </div>
  );
}