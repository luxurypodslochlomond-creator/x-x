import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { ArrowLeft } from 'lucide-react';

// "The Record" — the platform's masthead. The page Janine hands to a panel.
// Zero ego: what this is, what it's not, the principles, who stewards it, the live numbers.
export default function ClimateRecord() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let mounted = true;
    base44.functions.invoke('climateImpactStats', {})
      .then((res) => { const data = res?.data || res; if (mounted && data) setStats(data); })
      .catch(() => {})
      .finally(() => {});
    return () => { mounted = false; };
  }, []);

  const total = stats?.total_views || 0;
  const countries = stats?.unique_countries || 0;
  const nations = (stats?.regions || []).length;
  const entries = stats?.published_entries || 0;

  return (
    <div className="min-h-screen bg-[#efe7d6] text-[#141210]" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center gap-3 px-4 py-3 bg-[#141210] border-b-2 border-[#e2602a]">
        <Link to={createPageUrl('TogetherChangeClimate')} className="w-11 h-11 flex items-center justify-center bg-[#efe7d6] border-2 border-[#efe7d6] text-[#141210] active:bg-[#e2602a] transition-colors flex-shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-black uppercase text-[#efe7d6] leading-none" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '20px', letterSpacing: '-0.02em' }}>
            The Record
          </h1>
          <p className="text-[9px] font-mono text-[#e2602a] uppercase tracking-widest mt-0.5">What this is · why it exists</p>
        </div>
      </div>

      {/* Masthead */}
      <div className="px-5 py-10 bg-[#141210] text-center">
        <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#efe7d6]/40 mb-3">Together We Change Climate</p>
        <h2 className="font-black text-[#e2602a] leading-none mb-8" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: 'clamp(34px, 11vw, 48px)', letterSpacing: '-0.03em' }}>
          The Record<br />of the Time
        </h2>
        <div className="font-black text-[#efe7d6] leading-none" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: 'clamp(48px, 18vw, 80px)', letterSpacing: '-0.04em' }}>
          {total.toLocaleString()}
        </div>
        <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#efe7d6]/40 mt-2">people have read the record</p>

        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="text-center">
            <div className="font-black text-[#efe7d6]" style={{ fontSize: '24px' }}>{countries}</div>
            <p className="text-[8px] font-mono uppercase tracking-widest text-[#efe7d6]/40">Countries</p>
          </div>
          {nations > 0 && (
            <>
              <div className="w-px h-6 bg-[#efe7d6]/20" />
              <div className="text-center">
                <div className="font-black text-[#efe7d6]" style={{ fontSize: '24px' }}>{nations}</div>
                <p className="text-[8px] font-mono uppercase tracking-widest text-[#efe7d6]/40">Nations</p>
              </div>
            </>
          )}
          <div className="w-px h-6 bg-[#efe7d6]/20" />
          <div className="text-center">
            <div className="font-black text-[#efe7d6]" style={{ fontSize: '24px' }}>{entries}</div>
            <p className="text-[8px] font-mono uppercase tracking-widest text-[#efe7d6]/40">Entries</p>
          </div>
        </div>
      </div>

      {/* What this is */}
      <div className="px-5 py-8">
        <h3 className="font-black uppercase text-[#141210] mb-3" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '18px', letterSpacing: '-0.02em' }}>
          What this is
        </h3>
        <p className="text-[13px] leading-relaxed text-[#141210]/80">
          A public record of climate solutions, crises, and actions. After Janine Selendy's Horizon Solutions Site. Every claim sourced. Every entry human-reviewed. Every language, every nation. The noise is loud. The record is louder.
        </p>
      </div>

      <div className="h-px bg-[#141210]/10 mx-5" />

      {/* What this is not */}
      <div className="px-5 py-8">
        <h3 className="font-black uppercase text-[#141210] mb-3" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '18px', letterSpacing: '-0.02em' }}>
          What this is not
        </h3>
        <ul className="space-y-1.5 text-[13px] leading-relaxed text-[#141210]/80">
          <li>Not a feed. Not a ranking.</li>
          <li>Not news. Not dopamine.</li>
          <li>Not tracking you.</li>
        </ul>
      </div>

      <div className="h-px bg-[#141210]/10 mx-5" />

      {/* Five principles */}
      <div className="px-5 py-8">
        <h3 className="font-black uppercase text-[#141210] mb-4" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '18px', letterSpacing: '-0.02em' }}>
          The five principles
        </h3>
        <ol className="space-y-3">
          {[
            'Every claim has a source. Click it. Verify it.',
            'Every entry is human-reviewed. AI advises. Humans decide.',
            'Every language, every nation. Nobody left behind.',
            'No IP stored. No personal data tracked. The signal, not the surveiller.',
            'Open source. Extraction-proof. Free forever.',
          ].map((principle, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-black text-[#b3261e] text-[20px] leading-none flex-shrink-0">{i + 1}</span>
              <span className="text-[13px] leading-relaxed text-[#141210]/80">{principle}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="h-px bg-[#141210]/10 mx-5" />

      {/* Stewardship */}
      <div className="px-5 py-8">
        <h3 className="font-black uppercase text-[#141210] mb-3" style={{ fontFamily: 'Impact, "Arial Narrow", system-ui, sans-serif', fontSize: '18px', letterSpacing: '-0.02em' }}>
          Stewardship
        </h3>
        <div className="space-y-1 text-[12px] font-mono text-[#141210]/70">
          <p>After Janine Selendy</p>
          <p>Horizon International</p>
          <p>Platform built by Brian Hughes · UF51</p>
          <p>Signal palette after Brian Beadie</p>
          <p>Built on Base44</p>
        </div>
      </div>

      <div className="h-px bg-[#141210]/10 mx-5" />

      {/* Invitation */}
      <div className="px-5 py-8 space-y-3">
        <Link to={createPageUrl('TogetherChangeClimate')} className="block w-full text-center px-4 py-3 bg-[#141210] text-[#efe7d6] font-black uppercase text-[13px] tracking-wider active:bg-[#e2602a] transition-colors">
          Read the record
        </Link>
        <Link to={createPageUrl('ClimateImpact')} className="block w-full text-center px-4 py-3 border-2 border-[#141210] text-[#141210] font-black uppercase text-[13px] tracking-wider active:bg-[#141210] active:text-[#efe7d6] transition-colors">
          See the impact
        </Link>
        <Link to={createPageUrl('TogetherChangeClimate')} className="block w-full text-center px-4 py-3 border-2 border-[#b3261e] text-[#b3261e] font-black uppercase text-[13px] tracking-wider active:bg-[#b3261e] active:text-[#efe7d6] transition-colors">
          Submit a solution
        </Link>
      </div>

      {/* Footer */}
      <div className="px-5 py-6 bg-[#141210] text-center">
        <p className="text-[10px] font-mono text-[#efe7d6]/30 tracking-[0.3em]">x = x</p>
        <p className="text-[9px] font-mono text-[#efe7d6]/40 mt-2">The noise is loud. The record is louder.</p>
      </div>
    </div>
  );
}