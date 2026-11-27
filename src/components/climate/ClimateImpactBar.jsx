import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { useClimateImpactStats } from '@/hooks/useClimateImpactStats';

// A calm, dignified strip showing the global reach of the record.
// "X reads of the record, from Y countries." Reads, never people: one entry opened
// counts once per place per half hour, so the number can never quietly inflate.
// This is what moves Janine — seeing her life's work reach the world.
// It holds its height in every state, so landing on the record never jumps.
// It shares one read of the numbers with the impact page, so tapping through is instant.
export default function ClimateImpactBar() {
  const { data: stats, isPending } = useClimateImpactStats();
  // "Could not be counted" and "nobody has read it" must never print the same words: the
  // first is a fact about the server, the second is a fact about the record.
  const counted = typeof stats?.total_views === 'number';
  const views = counted ? stats.total_views : 0;
  const countries = typeof stats?.unique_countries === 'number' ? stats.unique_countries : 0;

  return (
    <Link to="/ClimateMap#reach" className="flex items-center justify-center gap-2 px-4 py-3 min-h-[42px] bg-[#141210] border-b-2 border-[#e2602a]/20 active:bg-[#e2602a]/10 transition-colors">
      <Globe className="w-3.5 h-3.5 text-[#e2602a] flex-shrink-0" />
      <p className="text-[10px] font-mono text-[#efe7d6]/80 leading-tight text-center">
        {isPending ? (
          <span className="text-[#efe7d6]/25 tracking-[0.3em]">···</span>
        ) : !counted ? (
          // A count that could not be made is not a zero. Before this branch existed, a failed
          // count printed "Be the first to read the record" on a record that had been read
          // hundreds of times — the most flattering possible reading of a broken query.
          <>Reads could not be counted from here just now<span className="text-[#e2602a]/60 ml-1">→</span></>
        ) : views > 0 ? (
          <>
            <span className="font-black text-[#e2602a]">{views}</span> {views === 1 ? 'opening' : 'openings'} of the record, from{' '}
            <span className="font-black text-[#e2602a]">{countries}</span> {countries === 1 ? 'country' : 'countries'}
            <span className="text-[#e2602a]/60 ml-1">→</span>
          </>
        ) : (
          <>Be the first to read the record<span className="text-[#e2602a]/60 ml-1">→</span></>
        )}
      </p>
    </Link>
  );
}