import React from 'react';
import { Eye, Lock, Cloud } from 'lucide-react';

export default function TransparencyBadge() {
  const items = [
    { icon: Eye, label: 'No tracking', desc: 'We don\'t watch what you learn' },
    { icon: Lock, label: 'Stays on device', desc: 'Your questions stay private' },
    { icon: Cloud, label: 'Works offline', desc: 'Learn anywhere, no wifi needed' },
  ];

  return (
    <div className="w-full">
      <p className="text-xs font-black text-white/40 uppercase tracking-widest mb-3">How we work</p>
      <div className="grid grid-cols-3 gap-2">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="p-3 rounded-xl text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Icon className="w-4 h-4 mx-auto mb-1.5 text-cyan-400" />
              <p className="text-xs font-black text-white">{item.label}</p>
              <p className="text-[11px] text-white/40 mt-0.5">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}