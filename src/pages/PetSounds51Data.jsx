import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { ArrowLeft, Activity, TrendingUp, Users, Clock, Zap, Globe } from 'lucide-react';
import PetSounds51Icon8Bit from '@/components/shared/PetSounds51Icon8Bit';

// Colour per protocol category
const PROTOCOL_COLORS = {
  separation: '#06b6d4', thunderstorm: '#ec4899', vet_fear: '#a855f7',
  night_anxiety: '#6366f1', rescue_trauma: '#f59e0b', grief: '#ec4899',
  dementia: '#22c55e', hyperactive: '#10b981', arthritis: '#f97316',
  recovery: '#14b8a6', pre_race: '#f59e0b', post_race: '#f97316',
  captivity_stress: '#22c55e', training_fatigue: '#14b8a6',
};

const PROTOCOL_LABELS = {
  separation: 'Separation Anxiety', thunderstorm: 'Thunderstorm & Fireworks',
  vet_fear: 'Vet & Car Anxiety', night_anxiety: 'Night Anxiety',
  rescue_trauma: 'Rescue Trauma', grief: 'Grief & Loss',
  dementia: 'Cognitive Decline', hyperactive: 'Hyperactivity',
  arthritis: 'Arthritis & Mobility', recovery: 'Post-Surgery Rest',
  pre_race: 'Pre-Race Calm', post_race: 'Post-Race Recovery',
  captivity_stress: 'Captivity Welfare', training_fatigue: 'Working Animal Recovery',
};

const StatCard = ({ value, label, sub, color = '#d4a017' }) => (
  <div className="rounded-2xl p-6" style={{ background: 'rgba(30,26,14,0.9)', border: `1px solid ${color}30` }}>
    <div className="text-3xl font-black mb-1" style={{ color }}>{value}</div>
    <div className="text-sm font-bold text-white mb-1">{label}</div>
    {sub && <div className="text-xs" style={{ color: '#a89870' }}>{sub}</div>}
  </div>
);

const Bar = ({ label, value, max, color }) => {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-36 text-xs font-bold truncate" style={{ color: '#c8b87a' }}>{label}</div>
      <div className="flex-1 rounded-full h-2 overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}60` }}
        />
      </div>
      <div className="w-8 text-xs text-right font-black" style={{ color }}>{value}</div>
    </div>
  );
};

export default function PetSounds51Data() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.PS51SessionLog.list('-created_date', 500)
      .then(data => { setLogs(data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Derived stats
  const totalSessions = logs.length;
  const subscriberSessions = logs.filter(l => l.is_subscribed).length;
  const returnVisits = logs.filter(l => l.return_visit).length;
  const returnRate = totalSessions > 0 ? Math.round((returnVisits / totalSessions) * 100) : 0;
  const smartFinderSessions = logs.filter(l => l.is_smart_finder).length;
  const smartFinderPct = totalSessions > 0 ? Math.round((smartFinderSessions / totalSessions) * 100) : 0;

  const avgDuration = totalSessions > 0
    ? Math.round(logs.filter(l => l.session_duration_seconds > 0).reduce((a, l) => a + (l.session_duration_seconds || 0), 0) / Math.max(1, logs.filter(l => l.session_duration_seconds > 0).length))
    : 0;
  const avgMins = avgDuration > 0 ? `${Math.floor(avgDuration / 60)}m ${avgDuration % 60}s` : '—';

  // Protocol breakdown
  const protocolCounts = {};
  logs.forEach(l => { protocolCounts[l.protocol] = (protocolCounts[l.protocol] || 0) + 1; });
  const sortedProtocols = Object.entries(protocolCounts).sort((a, b) => b[1] - a[1]);
  const maxProtocol = sortedProtocols[0]?.[1] || 1;

  // Species breakdown
  const speciesCounts = { dog: 0, cat: 0, horse: 0 };
  logs.forEach(l => { if (speciesCounts[l.species] !== undefined) speciesCounts[l.species]++; });
  const maxSpecies = Math.max(...Object.values(speciesCounts), 1);

  // Device breakdown
  const deviceCounts = { mobile: 0, tablet: 0, desktop: 0 };
  logs.forEach(l => { if (l.device_type && deviceCounts[l.device_type] !== undefined) deviceCounts[l.device_type]++; });

  // Sessions by day (last 14 days)
  const last14 = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    last14.push({ date: key, label: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }), count: logs.filter(l => l.session_date === key).length });
  }
  const maxDay = Math.max(...last14.map(d => d.count), 1);

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(135deg, #1a200e 0%, #2a3018 40%, #1e1a0e 100%)' }}>

      {/* HEADER */}
      <div className="sticky top-0 z-40 backdrop-blur-xl" style={{ background: 'rgba(26,32,14,0.95)', borderBottom: '1px solid rgba(212,160,23,0.2)' }}>
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PetSounds51Icon8Bit size={36} animate={false} />
            <div>
              <h1 className="text-lg font-black" style={{ color: '#d4a017' }}>PetSounds51</h1>
              <p className="text-xs font-mono tracking-widest" style={{ color: '#8aab3a' }}>PSYCHOACOUSTIC RESPONSE DATASET</p>
            </div>
          </div>
          <Link to={createPageUrl('PetSounds51')} className="flex items-center gap-2 text-sm font-bold transition-colors" style={{ color: '#a89870' }}>
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-10">

        {/* LEDE */}
        <div className="mb-12 text-center">
          <div className="inline-block rounded-full px-4 py-1 text-xs font-mono tracking-widest mb-5" style={{ background: 'rgba(212,160,23,0.12)', border: '1px solid rgba(212,160,23,0.35)', color: '#d4a017' }}>
            LIVE · ANONYMOUS · GROWING
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight" style={{ color: '#e8d5a3' }}>
            The world's first<br />
            <span style={{ color: '#d4a017' }}>psychoacoustic response dataset</span><br />
            for companion animals
          </h2>
          <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: '#a89870' }}>
            Every anonymous session logged here is a data point no one else has. Which protocols work. Which species respond. How long animals stay in a session. This dataset grows with every play.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 rounded-full border-2 animate-spin" style={{ borderColor: '#d4a017', borderTopColor: 'transparent' }} />
            <p className="text-sm font-mono" style={{ color: '#6b5e3a' }}>LOADING DATASET...</p>
          </div>
        ) : (
          <>
            {/* TOP STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <StatCard value={totalSessions.toLocaleString()} label="Total Sessions" sub="All time" color="#d4a017" />
              <StatCard value={`${returnRate}%`} label="Return Rate" sub="Devices that came back" color="#8aab3a" />
              <StatCard value={avgMins} label="Avg Session Length" sub="Per protocol play" color="#06b6d4" />
              <StatCard value={`${smartFinderPct}%`} label="AI-Recommended" sub="Via Smart Finder" color="#ec4899" />
            </div>

            {/* PROTOCOL PERFORMANCE */}
            <div className="rounded-2xl p-7 mb-6" style={{ background: 'rgba(30,26,14,0.9)', border: '1px solid rgba(212,160,23,0.2)' }}>
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-5 h-5" style={{ color: '#d4a017' }} />
                <h3 className="font-black text-lg" style={{ color: '#e8d5a3' }}>Protocol Performance</h3>
                <span className="text-xs font-mono ml-auto" style={{ color: '#6b5e3a' }}>sessions per protocol</span>
              </div>
              {sortedProtocols.length === 0 ? (
                <p className="text-sm text-center py-8" style={{ color: '#6b5e3a' }}>No sessions recorded yet — data builds as users play protocols.</p>
              ) : (
                sortedProtocols.map(([key, count]) => (
                  <Bar key={key} label={PROTOCOL_LABELS[key] || key} value={count} max={maxProtocol} color={PROTOCOL_COLORS[key] || '#d4a017'} />
                ))
              )}
            </div>

            {/* TWO COL — species + activity */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">

              {/* SPECIES */}
              <div className="rounded-2xl p-7" style={{ background: 'rgba(30,26,14,0.9)', border: '1px solid rgba(138,171,58,0.2)' }}>
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-5 h-5" style={{ color: '#8aab3a' }} />
                  <h3 className="font-black" style={{ color: '#e8d5a3' }}>By Species</h3>
                </div>
                <Bar label="Dog" value={speciesCounts.dog} max={maxSpecies} color="#d4a017" />
                <Bar label="Cat" value={speciesCounts.cat} max={maxSpecies} color="#f472b6" />
                <Bar label="Horse" value={speciesCounts.horse} max={maxSpecies} color="#8aab3a" />
              </div>

              {/* DEVICE */}
              <div className="rounded-2xl p-7" style={{ background: 'rgba(30,26,14,0.9)', border: '1px solid rgba(6,182,212,0.2)' }}>
                <div className="flex items-center gap-2 mb-6">
                  <Globe className="w-5 h-5" style={{ color: '#06b6d4' }} />
                  <h3 className="font-black" style={{ color: '#e8d5a3' }}>By Device</h3>
                </div>
                <Bar label="Mobile" value={deviceCounts.mobile} max={Math.max(...Object.values(deviceCounts), 1)} color="#06b6d4" />
                <Bar label="Desktop" value={deviceCounts.desktop} max={Math.max(...Object.values(deviceCounts), 1)} color="#a855f7" />
                <Bar label="Tablet" value={deviceCounts.tablet} max={Math.max(...Object.values(deviceCounts), 1)} color="#f59e0b" />
              </div>
            </div>

            {/* 14-DAY ACTIVITY */}
            <div className="rounded-2xl p-7 mb-6" style={{ background: 'rgba(30,26,14,0.9)', border: '1px solid rgba(212,160,23,0.15)' }}>
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5" style={{ color: '#d4a017' }} />
                <h3 className="font-black" style={{ color: '#e8d5a3' }}>Session Activity — Last 14 Days</h3>
              </div>
              <div className="flex items-end gap-1.5 h-24">
                {last14.map((d, i) => {
                  const h = maxDay > 0 ? Math.max(4, Math.round((d.count / maxDay) * 100)) : 4;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                      <div
                        className="w-full rounded-sm transition-all"
                        style={{ height: `${h}%`, background: d.count > 0 ? '#d4a017' : 'rgba(212,160,23,0.1)', boxShadow: d.count > 0 ? '0 0 6px rgba(212,160,23,0.4)' : 'none', minHeight: '4px' }}
                      />
                      {d.count > 0 && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/80 text-xs px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap" style={{ color: '#d4a017' }}>
                          {d.count}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs" style={{ color: '#6b5e3a' }}>{last14[0]?.label}</span>
                <span className="text-xs" style={{ color: '#6b5e3a' }}>{last14[13]?.label}</span>
              </div>
            </div>

            {/* SUBSCRIBER VS FREE */}
            <div className="rounded-2xl p-7 mb-10" style={{ background: 'rgba(30,26,14,0.9)', border: '1px solid rgba(212,160,23,0.2)' }}>
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-5 h-5" style={{ color: '#d4a017' }} />
                <h3 className="font-black" style={{ color: '#e8d5a3' }}>Subscriber vs Free Usage</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl p-5 text-center" style={{ background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.25)' }}>
                  <div className="text-3xl font-black mb-1" style={{ color: '#d4a017' }}>{subscriberSessions}</div>
                  <div className="text-sm font-bold text-white">Paid Sessions</div>
                  <div className="text-xs mt-1" style={{ color: '#a89870' }}>premium subscribers</div>
                </div>
                <div className="rounded-xl p-5 text-center" style={{ background: 'rgba(138,171,58,0.08)', border: '1px solid rgba(138,171,58,0.25)' }}>
                  <div className="text-3xl font-black mb-1" style={{ color: '#8aab3a' }}>{totalSessions - subscriberSessions}</div>
                  <div className="text-sm font-bold text-white">Free Sessions</div>
                  <div className="text-xs mt-1" style={{ color: '#a89870' }}>conversion pipeline</div>
                </div>
              </div>
            </div>

            {/* INVESTOR NOTE */}
            <div className="rounded-2xl p-8 text-center" style={{ background: 'rgba(212,160,23,0.06)', border: '1px solid rgba(212,160,23,0.25)' }}>
              <div className="inline-block text-xs font-mono tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: 'rgba(212,160,23,0.12)', color: '#d4a017', border: '1px solid rgba(212,160,23,0.3)' }}>FOR PARTNERS & INVESTORS</div>
              <p className="text-base leading-relaxed mb-4 max-w-2xl mx-auto" style={{ color: '#c8b87a' }}>
                This dataset is proprietary. No other platform is collecting real-world psychoacoustic response data for companion animals at this granularity. Every session adds a data point that trains the next iteration of the protocol engine. The data moat grows with the user base.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to={createPageUrl('PetSounds51Press')} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all" style={{ background: '#d4a017', color: '#1a1a0a' }}>
                  Press Center
                </Link>
                <a href="mailto:family@uf51.love?subject=PetSounds51%20Partnership%20Enquiry" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all" style={{ background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.4)', color: '#d4a017' }}>
                  Get in Touch
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}