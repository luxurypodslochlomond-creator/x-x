import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import TracktLayout from '@/components/trackt/TracktLayout';
import TracktLiveQuery from '@/components/trackt/TracktLiveQuery';
import TracktLiveFeed from '@/components/trackt/TracktLiveFeed';

// Static scan line — no continuous animation loop
const ScanLine = () => (
  <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none" />
);

// Terminal text — static, no interval overhead
const TerminalLine = ({ text, color = 'text-cyan-400' }) => (
  <span className={`font-mono text-sm ${color} block`}>
    <span className="text-gray-600 mr-2">$</span>{text}
  </span>
);

// Live asset card
const AssetCard = ({ tag, location, status, lastSeen, delay }) => {
  const statusColors = {
    active: 'text-green-400 border-green-400/30 bg-green-400/5',
    warning: 'text-amber-400 border-amber-400/30 bg-amber-400/5',
    missing: 'text-red-400 border-red-400/30 bg-red-400/5',
  };

  const barWidth = status === 'active' ? '92%' : status === 'warning' ? '45%' : '8%';
  return (
    <div className="border border-white/10 bg-white/[0.02] p-4 rounded-sm hover:border-cyan-500/30 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-white font-mono font-bold text-sm">{tag}</p>
          <p className="text-gray-500 text-xs font-mono mt-0.5">{location}</p>
        </div>
        <span className={`text-xs font-mono font-bold px-2 py-0.5 border rounded-sm ${statusColors[status]}`}>
          {status.toUpperCase()}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-500/60 rounded-full" style={{ width: barWidth }} />
        </div>
        <span className="text-gray-600 text-xs font-mono">{lastSeen}</span>
      </div>
    </div>
  );
};

// Stat block — no animation overhead
const StatBlock = ({ value, label, sub }) => (
  <div className="border-l border-cyan-500/30 pl-6">
    <p className="text-3xl font-black font-mono text-white tracking-tight">{value}</p>
    <p className="text-cyan-400 text-sm font-mono mt-1">{label}</p>
    {sub && <p className="text-gray-600 text-xs font-mono mt-0.5">{sub}</p>}
  </div>
);

// Section header
const SectionHeader = ({ label, title, sub }) => (
  <div className="mb-12">
    <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-3">{label}</p>
    <h2 className="text-3xl font-black text-white tracking-tight">{title}</h2>
    {sub && <p className="text-gray-400 mt-3 max-w-xl leading-relaxed">{sub}</p>}
  </div>
);

// Feature row — static
const FeatureRow = ({ index, title, description, tag }) => {
  return (
    <div className="flex gap-6 py-6 border-b border-white/5 group">
      <div className="flex-shrink-0 w-8 text-right">
        <span className="text-gray-700 font-mono text-sm">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1.5">
          <h3 className="text-white font-bold">{title}</h3>
          {tag && (
            <span className="text-xs font-mono px-2 py-0.5 border border-cyan-500/20 text-cyan-500 rounded-sm">
              {tag}
            </span>
          )}
        </div>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};



export default function TracktPage() {
  const heroRef = useRef(null); // kept for section ref

  const features = [
    { title: 'Automatic Maintenance Scheduling', description: 'TRACKT learns maintenance patterns and schedules preventive care automatically. Hospitals save 12-16% annually on maintenance costs just by fixing equipment before it breaks.', tag: 'COST SAVINGS' },
    { title: 'Natural Language Asset Queries', description: 'Ask any question about your assets in plain English. TRACKT queries live RFID data and returns structured, actionable answers in under 200ms.', tag: 'AI LAYER' },
    { title: 'Anomaly Detection Engine', description: 'Continuously monitors movement patterns, dwell times and compliance windows. Flags exceptions before they become incidents.', tag: 'REAL-TIME' },
    { title: 'Cross-System Correlation', description: 'Connects RFID data with access control, maintenance schedules, ERP and compliance records. Eliminates the silo problem permanently.', tag: 'INTEGRATION' },
    { title: 'NFC Tap-to-Insight', description: 'Workers tap any asset tag with their phone. TRACKT returns full context instantly — location history, maintenance status, compliance, ownership.', tag: 'MOBILE' },
    { title: 'Works on Existing Hardware', description: 'No forklift upgrade required. TRACKT connects to your existing Urovo, Zebra or Honeywell RFID infrastructure via standard APIs.', tag: 'ZERO REWORK' },
  ];

  const sectors = [
    { name: 'NHS / Healthcare', desc: 'Medical equipment compliance, bed tracking, theatre asset management. Regulatory audit trails generated automatically.' },
    { name: 'Logistics / 3PL', desc: 'Warehouse asset intelligence, trailer tracking, cross-dock visibility. Anomaly alerts before SLAs are breached.' },
    { name: 'Manufacturing', desc: 'Tool tracking, WIP visibility, maintenance compliance. Connects to existing MES and ERP systems.' },
    { name: 'Facilities Management', desc: 'Equipment audits, preventive maintenance scheduling, contractor compliance. One interface across every site.' },
  ];

  return (
    <TracktLayout>
    <div className="min-h-screen bg-[#050810] text-white">

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden border-b border-white/5">

        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <ScanLine />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">

            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="mb-6"
              >
                <div className="inline-flex items-center gap-2 border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 rounded-sm mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-cyan-400 font-mono text-xs tracking-widest">SYSTEM ONLINE</span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-none mb-4">
                  Your Equipment is Lost Right Now
                </h1>
                <div className="h-px w-24 bg-cyan-500/60 mb-8" />
                <p className="text-xl text-gray-300 leading-relaxed mb-3">
                  Hospitals waste £180k/year on missing equipment. Warehouses lose pallets. Fleets can't account for tools.
                </p>
                <p className="text-gray-500 leading-relaxed max-w-md">
                  TRACKT finds it in seconds. Works on your existing Urovo, Zebra or Honeywell readers. Operational in 30 days. No software licenses. No consultant timelines.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 mt-10"
              >
                <a
                  href="mailto:hello@trackt.io"
                  className="inline-flex items-center justify-center px-6 py-3 bg-cyan-500 text-black font-bold font-mono text-sm hover:bg-cyan-400 transition-colors"
                >
                  REQUEST DEMO
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white font-mono text-sm hover:border-white/40 transition-colors"
                >
                  SEE HOW IT WORKS
                </a>
              </motion.div>

              {/* Terminal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-10 border border-white/10 bg-black/60 p-4 rounded-sm"
              >
                <TerminalLine text="connecting to rfid_gateway_01..." delay={800} />
                <TerminalLine text="ingesting asset_stream — 847 tags active" delay={1800} color="text-gray-400" />
                <TerminalLine text="anomaly_engine initialised — 0 flags" delay={2800} color="text-green-400" />
                <TerminalLine text="ai_layer ready — awaiting query" delay={3800} color="text-white" />
              </motion.div>
            </div>

            {/* Right — live asset feed */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-600 font-mono text-xs tracking-widest uppercase">Live Asset Feed</p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 font-mono text-xs">847 active</span>
                </div>
              </div>
              <TracktLiveFeed />
            </motion.div>

          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-white/5 bg-black/40">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatBlock value="£180k+" label="Lost annually per hospital" sub="Equipment nobody can find" />
            <StatBlock value="12-16%" label="Maintenance cost reduction" sub="Preventive scheduling works" />
            <StatBlock value="30 days" label="To operational" sub="No infrastructure change" />
            <StatBlock value="$0/mo" label="AI layer cost" sub="Included. Forever." />
          </div>
        </div>
      </section>

      {/* AI DEMO */}
      <section className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                label="Intelligence Layer"
                title="Ask anything. Get answers."
                sub="TRACKT connects to your RFID data and answers natural language questions in real time. No dashboards to navigate. No reports to run. Just ask."
              />
              <div className="space-y-4">
                {[
                  'Where is every defibrillator right now?',
                  'Which assets missed their compliance window today?',
                  'Show movement history for any asset, any time range.',
                  'Alert me when high-value equipment leaves a zone.',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <p className="text-gray-400 text-sm font-mono">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <TracktLiveQuery />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="how-it-works" className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <SectionHeader
            label="Capabilities"
            title="What TRACKT does."
            sub="Six core capabilities, deployed in days, not months."
          />
          <div>
            {features.map((f, i) => (
              <FeatureRow key={i} index={i} title={f.title} description={f.description} tag={f.tag} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="border-b border-white/5 bg-black/40">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <SectionHeader
            label="Markets"
            title="Built for regulated, asset-heavy operations."
          />
          <div className="grid sm:grid-cols-2 gap-px bg-white/5">
            {sectors.map((s, i) => (
              <div key={i} className="bg-[#050810] p-8 hover:bg-white/[0.02] transition-colors">
                <h3 className="text-white font-bold mb-2">{s.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <SectionHeader
            label="Architecture"
            title="How it connects."
          />
          <div className="grid lg:grid-cols-3 gap-px bg-white/5">
            {[
              {
                layer: '01 — Hardware',
                title: 'Your existing RFID infrastructure',
                items: ['Urovo DT50P / DT610', 'Zebra FX series', 'Honeywell Xenon', 'Impinj Speedway', 'Any LLRP-compliant reader'],
                color: 'text-gray-400',
              },
              {
                layer: '02 — Intelligence',
                title: 'TRACKT AI layer',
                items: ['Real-time event ingestion', 'Anomaly detection engine', 'Natural language query processor', 'Cross-system correlation', 'Edge inference runtime'],
                color: 'text-cyan-400',
              },
              {
                layer: '03 — Interface',
                title: 'Worker and management surfaces',
                items: ['PWA — any device, no app install', 'NFC tap-to-insight', 'Dashboard and alerts', 'API for existing systems', 'Offline-first architecture'],
                color: 'text-white',
              },
            ].map((col, i) => (
              <div key={i} className="bg-[#050810] p-8">
                <p className="text-gray-700 font-mono text-xs mb-2">{col.layer}</p>
                <h3 className={`font-bold mb-6 ${col.color}`}>{col.title}</h3>
                <ul className="space-y-2">
                  {col.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-cyan-500/40 font-mono text-xs mt-0.5">—</span>
                      <span className="text-gray-500 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 py-32 text-center">
          <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-6">Stop The Bleeding</p>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-6">
            Know where your equipment is. Today.
          </h2>
          <p className="text-gray-400 leading-relaxed mb-10 max-w-lg mx-auto">
            Limited pilot spots available for NHS, logistics and healthcare. Start tracking in 30 days. Zero downtime. Zero infrastructure change.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:hello@trackt.io"
              className="inline-flex items-center justify-center px-8 py-4 bg-cyan-500 text-black font-bold font-mono text-sm hover:bg-cyan-400 transition-colors"
            >
              REQUEST A PILOT
            </a>
            <a
              href="mailto:partners@trackt.io"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-mono text-sm hover:border-white/40 transition-colors"
            >
              HARDWARE PARTNERSHIPS
            </a>
          </div>
          <p className="text-gray-700 font-mono text-xs mt-8">
            ISV partner — Urovo RFID platform
          </p>
        </div>
      </section>

    </div>
    </TracktLayout>
  );
}