import React from 'react';

// The Soul of the platform — the x=x principle.
// Every entry is equal because it's true, not because it's popular.
// This is the mathematical opposite of the engagement-ranked feed.

export default function ClimateSoul({ t }) {
  return (
    <section className="px-4 py-7 bg-[#141210] text-[#efe7d6] border-b-2 border-[#141210] relative overflow-hidden">
      {/* Signal flicker accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#e2602a]" style={{ animation: 'twcc-flicker 7s linear 1.2s infinite' }} />

      <div className="relative z-10 max-w-md mx-auto">
        {/* The equation — the whole principle in one line */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="font-black text-[#e2602a]" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 'clamp(32px, 9vw, 44px)' }}>x</span>
          <span className="font-black text-[#efe7d6]" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 'clamp(32px, 9vw, 44px)' }}>=</span>
          <span className="font-black text-[#e2602a]" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 'clamp(32px, 9vw, 44px)' }}>x</span>
        </div>

        <p className="text-[10px] font-black font-mono uppercase tracking-[0.18em] text-[#e2602a] text-center mb-3">
          {t.soul_label || 'The principle'}
        </p>

        <p className="text-[12px] font-mono leading-relaxed text-[#efe7d6] text-center mb-4">
          {t.soul_body || 'A solution is a solution. An action is an action. A person is a person. No algorithm ranks them. No money amplifies them. The record is the record — every entry equal because it is true, not because it is loud.'}
        </p>

        <p className="text-[10px] font-mono leading-relaxed text-[#efe7d6]/60 text-center italic">
          {t.soul_close || 'This is what an honest record looks like. This is the opposite of the feed.'}
        </p>
      </div>
    </section>
  );
}