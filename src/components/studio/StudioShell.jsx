import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Sparkles, Pencil } from 'lucide-react';

// ── THE STUDIO'S OWN STRIP, INSIDE THE RECORD ────────────────────────────────
// The Studio is a room in the record, so the record's masthead, its nav and its foot stay
// above and below every page in here — that is what makes it feel like part of the same book
// rather than a product bolted on.
//
// What this strip adds is the one thing the record's nav cannot say: which of the studio's
// three doors you are standing in. Without it, tapping ZAPP from the Studio opened a page
// that looked like nothing you had just been doing. With it, the room is still named above
// the tool, and the way back out is one word away.
//
// Set in the record's own bone and ink. No second palette, no second masthead.
const DOORS = [
  { to: '/Studio', label: 'Studio', icon: Pencil },
  { to: '/Studio/Zapp', label: 'ZAPP', icon: Zap },
  { to: '/Studio/Logo', label: 'Logo Room', icon: Sparkles },
];

export default function StudioShell({ children }) {
  const { pathname } = useLocation();

  return (
    <div>
      <div className="border-b-2 border-[#1a1612]/15 bg-[#efe7d6]">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2.5 lg:px-10">
          <span className="text-[9px] font-black font-mono uppercase tracking-[0.22em] text-[#6b6258]">
            The Studio
          </span>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {DOORS.map(({ to, label, icon: Icon }) => {
              const active = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-[32px] items-center gap-1 border-b-2 pb-0.5 text-[10px] font-black font-mono uppercase tracking-wider transition-colors ${
                    active
                      ? 'border-[#e2602a] text-[#e2602a]'
                      : 'border-transparent text-[#1a1612]/65 hover:border-[#1a1612]/40 hover:text-[#1a1612]'
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  {label}
                </Link>
              );
            })}
          </div>
          <span className="w-full text-[10px] font-mono leading-relaxed text-[#6b6258]">
            No account, no name, no age, no email. What you make stays on your own device.
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}