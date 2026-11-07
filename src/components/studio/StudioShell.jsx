import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Zap, Sparkles } from 'lucide-react';

// ── THE STUDIO'S OWN WORLD ────────────────────────────────────────────────────
// This used to live inside the climate record, which meant clicking ZAPP dropped you
// out of the record and into a page with no relation to anything you had just been
// looking at. A room is a room: the Studio has its own masthead, its own palette and
// its own three doors, and it keeps them above every tool inside it, so wherever a
// child lands they are still in the same place and know which way is out.
//
// The look is a workbench, not a website: cream board, a cobalt grid drawn behind it,
// ink borders and hard offset shadows like prints pinned up. No gradients shouting,
// no glow, nothing that costs a phone a repaint.
const DOORS = [
  { to: '/Studio', label: 'The Studio', icon: Home },
  { to: '/Studio/Zapp', label: 'ZAPP', icon: Zap },
  { to: '/Studio/Logo', label: 'Logo Room', icon: Sparkles },
];

export default function StudioShell({ children }) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-[#FBF5E6] text-[#141210]" style={{ fontFamily: 'var(--font-body)' }}>
      <header className="sticky top-0 z-40 border-b-4 border-[#141210] bg-[#FBF5E6]/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-2 px-4 pt-3">
          <Link to="/Studio" className="flex items-center gap-2">
            <span className="grid h-9 w-9 -rotate-6 place-items-center border-2 border-[#141210] bg-[#1B2BF0]">
              <span className="font-black leading-none text-[#FBF5E6]" style={{ fontFamily: 'var(--font-display)', fontSize: '18px' }}>
                S
              </span>
            </span>
            <span className="font-black uppercase leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: '23px', letterSpacing: '-0.02em' }}>
              Studio
            </span>
          </Link>
          <span className="rotate-2 border-2 border-[#141210] bg-[#E2602A] px-2 py-1 text-[8px] font-black font-mono uppercase tracking-[0.14em]">
            no sign-up
          </span>
        </div>

        <nav aria-label="The Studio" className="climate-nav-rail flex gap-1.5 overflow-x-auto px-4 pb-3 pt-3">
          {DOORS.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                aria-current={active ? 'page' : undefined}
                className={`flex min-h-[40px] flex-shrink-0 items-center gap-1.5 border-2 border-[#141210] px-3 text-[10px] font-black font-mono uppercase tracking-[0.12em] transition-colors ${
                  active ? 'bg-[#1B2BF0] text-[#FBF5E6]' : 'bg-[#FBF5E6] text-[#141210] active:bg-[#EFE7D6]'
                }`}
                style={active ? {} : { boxShadow: '3px 3px 0 #141210' }}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="relative">
        {/* The board: cobalt graph paper, drawn rather than downloaded. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(27,43,240,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(27,43,240,0.07) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative">{children}</div>
      </main>

      <footer className="border-t-4 border-[#141210] px-4 py-5">
        <p className="text-[11px] font-mono leading-relaxed">
          Nothing here asks for your name, your age or your email. What you make stays on your own device.
        </p>
        <p className="mt-3 text-[11px] font-mono leading-relaxed">
          Looking for something worth building about?{' '}
          <Link to="/TogetherChangeClimate" className="border-b-2 border-[#1B2BF0] font-black text-[#1B2BF0]">
            The record
          </Link>{' '}
          has it.
        </p>
      </footer>
    </div>
  );
}