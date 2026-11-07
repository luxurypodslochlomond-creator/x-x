import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// ── ONE DOOR IN THE STUDIO ────────────────────────────────────────────────────
// Drawn the way the record draws a sheet: hairline ink border, a heavier rule across the
// top, bone paper, one red mono word. It used to be tilted, with a hard offset shadow, which
// is a zine's trick — and this room is inside the record, not stapled to the side of it.
export default function StudioDoor({ to, icon: Icon, kicker, title, children }) {
  return (
    <Link
      to={to}
      className="group flex flex-col border-2 border-t-[6px] border-[#1a1612] bg-[#f7f1e5] px-4 py-4 transition-colors hover:bg-[#efe7d6] active:bg-[#efe7d6]"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-record-mark">
          {kicker}
        </span>
        <Icon className="h-4 w-4 text-[#1a1612]" />
      </div>

      <p
        className="mt-3 leading-none text-[#1a1612]"
        style={{ fontFamily: 'var(--record-display)', fontSize: 27, letterSpacing: '-0.01em' }}
      >
        {title}
      </p>

      <p
        className="mt-2.5 flex-1 leading-relaxed text-[#1a1612]/85"
        style={{ fontFamily: 'var(--font-record-reading)', fontSize: 14 }}
      >
        {children}
      </p>

      <span className="mt-4 inline-flex items-center gap-1.5 self-start border-b-2 border-[#1a1612] pb-0.5 font-mono text-[9.5px] font-black uppercase tracking-[0.14em] text-[#1a1612]">
        Open it
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}