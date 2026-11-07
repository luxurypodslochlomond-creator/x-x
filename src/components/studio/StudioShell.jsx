import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Sparkles, Pencil } from 'lucide-react';

// ── THE STUDIO'S OWN STRIP, INSIDE THE RECORD ────────────────────────────────
// The Studio is a room in the record, so the record's masthead, its nav and its foot stay
// above and below every page in here. What this strip adds is the one thing the record's nav
// cannot say: which of the studio's three doors you are standing in.
//
// It wears the record's own deep earth rather than a pale band of its own, so stepping into
// the Studio is a step inside the same building: ink above, paper below, the door you are in
// marked in the record's signal. No second palette and no second masthead.
const DOORS = [
  { to: '/Studio', label: 'Studio', icon: Pencil },
  { to: '/Studio/Zapp', label: 'ZAPP', icon: Zap },
  { to: '/Studio/Logo', label: 'Logo Room', icon: Sparkles },
];

export default function StudioShell({ children }) {
  const { pathname } = useLocation();

  return (
    <div>
      <div className="border-b-2 border-[#e2602a]/40 bg-[#241d16]">
        <div className="mx-auto flex max-w-[1000px] flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-2.5 lg:px-10">
          <span className="font-mono text-[9px] font-black uppercase tracking-[0.22em] text-[#efe7d6]/45">
            The Studio
          </span>
          <span aria-hidden="true" className="h-3.5 w-px bg-[#efe7d6]/20" />

          {DOORS.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                aria-current={active ? 'page' : undefined}
                className={`flex min-h-[32px] items-center gap-1.5 border-b-2 pb-0.5 font-mono text-[10px] font-black uppercase tracking-[0.12em] transition-colors ${
                  active
                    ? 'border-[#e2602a] text-[#e2602a]'
                    : 'border-transparent text-[#efe7d6]/70 hover:border-[#efe7d6]/40 hover:text-[#efe7d6]'
                }`}
              >
                <Icon className="h-3 w-3" />
                {label}
              </Link>
            );
          })}

          <span className="w-full font-mono text-[9.5px] leading-relaxed text-[#efe7d6]/40 sm:ml-auto sm:w-auto">
            No account, no name, no age, no email.
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}