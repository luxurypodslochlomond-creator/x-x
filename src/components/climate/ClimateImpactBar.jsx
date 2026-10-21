import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Globe } from 'lucide-react';

// A calm, dignified strip showing the global reach of the record.
// "X people in Y countries have read the record of the time."
// This is what moves Janine — seeing her life's work reach the world.
// It holds its height in every state, so landing on the record never jumps.
export default function ClimateImpactBar() {
  const [stats, setStats] = useState(undefined);

  useEffect(() => {
    let cancelled = false;
    base44.functions.invoke('climateImpactStats', {})
      .then((res) => {
        if (cancelled) return;
        const data = res?.data || res;
        setStats(data || { total_views: 0, unique_countries: 0 });
      })
      .catch(() => { if (!cancelled) setStats({ total_views: 0, unique_countries: 0 }); });
    return () => { cancelled = true; };
  }, []);

  const loading = stats === undefined;
  const views = stats?.total_views || 0;
  const countries = stats?.unique_countries || 0;

  return (
    <Link to={createPageUrl('ClimateImpact')} className="flex items-center justify-center gap-2 px-4 py-3 min-h-[42px] bg-[#141210] border-b-2 border-[#e2602a]/20 active:bg-[#e2602a]/10 transition-colors">
      <Globe className="w-3.5 h-3.5 text-[#e2602a] flex-shrink-0" />
      <p className="text-[10px] font-mono text-[#efe7d6]/80 leading-tight text-center">
        {loading ? (
          <span className="text-[#efe7d6]/25 tracking-[0.3em]">···</span>
        ) : views > 0 ? (
          <>
            <span className="font-black text-[#e2602a]">{views}</span> {views === 1 ? 'person has' : 'people have'} read the record in{' '}
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