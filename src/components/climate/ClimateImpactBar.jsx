import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Globe } from 'lucide-react';

// A calm, dignified strip showing the global reach of the record.
// "X people in Y countries have read the record of the time."
// This is what moves Janine — seeing her life's work reach the world.
export default function ClimateImpactBar() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let cancelled = false;
    base44.functions.invoke('climateImpactStats', {})
      .then((res) => {
        if (cancelled) return;
        const data = res?.data || res;
        if (data) setStats(data);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  if (!stats || stats.total_views === 0) return null;

  return (
    <Link to={createPageUrl('ClimateImpact')} className="block px-4 py-3 bg-[#141210] border-b-2 border-[#e2602a]/20 flex items-center justify-center gap-2 active:bg-[#e2602a]/10 transition-colors">
      <Globe className="w-3.5 h-3.5 text-[#e2602a] flex-shrink-0" />
      <p className="text-[10px] font-mono text-[#efe7d6]/80 leading-tight text-center">
        <span className="font-black text-[#e2602a]">{stats.total_views}</span> {stats.total_views === 1 ? 'person has' : 'people have'} read the record in{' '}
        <span className="font-black text-[#e2602a]">{stats.unique_countries}</span> {stats.unique_countries === 1 ? 'country' : 'countries'}
        <span className="text-[#e2602a]/60 ml-1">→</span>
      </p>
    </Link>
  );
}