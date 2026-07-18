import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Wallet, Mail, Home as HomeIcon, Check } from 'lucide-react';

// CB51 — calm, clear, fast. Built for Scott: a Glasgow artist manager with a roster, a junior to delegate to, and an ADHD brain that wants one thing at a time.
// Warm paper, ink text, one high-contrast "needs you" card, everything else quiet below. No dashboard, no score numbers, no shouting.

const URGENT = {
  venue: "King Tut's Wah Wah Hut",
  detail: "Tue 12 Aug · doors 8pm · £400 · 4 in the band",
  from: "From Lewis at DF Concerts. Offers in for the band to vote.",
  deadline: "Responds by 5pm today",
};

const CAN_WAIT = [
  { t: "Rosie sent you 3 new offers", s: "Review when you have a minute" },
  { t: "Invoice unpaid — Drygate, 14 days", s: "£650 · sent 4 Jul" },
  { t: "Band vote open: Barrowlands", s: "3 of 5 in · closes Sunday" },
];

const TABS = [
  { icon: HomeIcon, label: "Home", active: true },
  { icon: Mail, label: "Inbox" },
  { icon: Users, label: "Roster" },
  { icon: Wallet, label: "Money" },
];

export default function CB51Home() {
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  const ease = [0.32, 0.72, 0, 1];

  return (
    <div className="min-h-screen flex justify-center" style={{ background: '#fcfaf6', color: '#1c1c1e' }}>
      <div className="w-full max-w-md relative pb-24">
        {/* top */}
        <header className="px-6 pt-12 pb-6">
          <p className="text-sm" style={{ color: '#8a8580' }}>{today}</p>
          <h1 className="text-2xl font-semibold mt-1.5 tracking-tight leading-tight">
            Here's what needs you, Scott.
          </h1>
        </header>

        {/* the one urgent thing */}
        <section className="px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease }}
            className="rounded-2xl bg-white overflow-hidden"
            style={{ boxShadow: '0 1px 2px rgba(28,28,30,0.04), 0 8px 24px rgba(28,28,30,0.06)' }}
          >
            <div className="h-1.5" style={{ background: '#c2410c' }} />
            <div className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: '#c2410c' }}>
                  Needs you today
                </p>
                <span className="text-xs" style={{ color: '#8a8580' }}>{URGENT.deadline}</span>
              </div>
              <h2 className="text-xl font-semibold mt-3 tracking-tight">{URGENT.venue}</h2>
              <p className="text-sm mt-1.5" style={{ color: '#5a554f' }}>{URGENT.detail}</p>
              <p className="text-sm mt-3.5 leading-relaxed" style={{ color: '#5a554f' }}>{URGENT.from}</p>
              <button
                className="mt-5 w-full rounded-xl py-3.5 text-white font-medium text-sm flex items-center justify-center gap-2 active:opacity-80 transition-opacity"
                style={{ background: '#1c1c1e' }}
              >
                Decide <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </section>

        {/* can wait — quiet list */}
        <section className="px-6 mt-9">
          <p className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#8a8580' }}>
            Can wait
          </p>
          <div className="divide-y" style={{ borderColor: '#ede8df' }}>
            {CAN_WAIT.map((x, i) => (
              <button
                key={i}
                className="w-full py-3.5 flex items-center justify-between text-left active:opacity-60 transition-opacity"
              >
                <div className="min-w-0 pr-3">
                  <p className="text-sm font-medium truncate">{x.t}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#8a8580' }}>{x.s}</p>
                </div>
                <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: '#b8b3ab' }} />
              </button>
            ))}
          </div>
        </section>

        {/* quiet reassurance */}
        <section className="px-6 mt-10">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" style={{ color: '#8a8580' }} />
            <p className="text-sm" style={{ color: '#8a8580' }}>Nothing else needs you. Go make music.</p>
          </div>
        </section>

        {/* bottom tabs — quiet, no badges */}
        <nav
          className="fixed bottom-0 inset-x-0 mx-auto max-w-md border-t"
          style={{ background: '#ffffff', borderColor: '#ede8df', paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="grid grid-cols-4">
            {TABS.map((t, i) => (
              <button key={i} className="py-3 flex flex-col items-center gap-1 active:opacity-60 transition-opacity">
                <t.icon
                  className="w-5 h-5"
                  style={{ color: t.active ? '#1c1c1e' : '#b8b3ab' }}
                  strokeWidth={t.active ? 2 : 1.5}
                />
                <span className="text-[10px] font-medium" style={{ color: t.active ? '#1c1c1e' : '#b8b3ab' }}>
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}