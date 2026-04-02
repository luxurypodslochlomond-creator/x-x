import React from 'react';
import { motion } from 'framer-motion';
import TracktLayout from '@/components/trackt/TracktLayout';
import { CheckCircle2, Zap, Clock, Target } from 'lucide-react';

const SectionHeader = ({ label, title, sub }) => (
  <div className="mb-12">
    <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-3">{label}</p>
    <h2 className="text-3xl font-black text-white tracking-tight">{title}</h2>
    {sub && <p className="text-gray-400 mt-3 max-w-xl leading-relaxed">{sub}</p>}
  </div>
);

const RoadmapPhase = ({ phase, title, description, items, status, icon: Icon }) => {
  const statusColors = {
    available: 'border-green-500/30 bg-green-500/5',
    building: 'border-cyan-500/30 bg-cyan-500/5',
    planned: 'border-amber-500/30 bg-amber-500/5',
  };

  const statusLabels = {
    available: '✓ LIVE NOW',
    building: '🔨 IN PROGRESS',
    planned: '📍 PLANNED',
  };

  const statusText = {
    available: 'text-green-400',
    building: 'text-cyan-400',
    planned: 'text-amber-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`border-2 ${statusColors[status]} p-8 rounded-sm`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <Icon className="w-8 h-8 text-cyan-400 mt-1 flex-shrink-0" />
          <div>
            <p className={`text-sm font-mono font-bold mb-1 ${statusText[status]}`}>
              {statusLabels[status]}
            </p>
            <h3 className="text-2xl font-black text-white">{title}</h3>
          </div>
        </div>
        <span className={`text-xs font-mono font-bold px-3 py-1.5 border rounded-sm ${statusText[status]} border-current`}>
          {phase}
        </span>
      </div>
      
      <p className="text-gray-400 text-sm leading-relaxed mb-6">{description}</p>
      
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-300">{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default function TracktRoadmapPage() {
  return (
    <TracktLayout>
      <div className="min-h-screen bg-[#050810] text-white">
        
        {/* HERO */}
        <section className="border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 rounded-sm mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-400 font-mono text-xs tracking-widest">INNOVATION ROADMAP</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-none mb-6">
                The Future of TRACKT.
              </h1>
              
              <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                One unified platform. RFID data. CCTV feeds. Access control. All connected. All intelligent. Coming soon.
              </p>
            </motion.div>
          </div>
        </section>

        {/* PHASES */}
        <section className="border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <SectionHeader
              label="Product Evolution"
              title="Three phases. One vision."
              sub="From RFID-only to a fully integrated asset intelligence platform."
            />

            <div className="grid md:grid-cols-1 gap-8">
              
              {/* PHASE 1: NOW */}
              <RoadmapPhase
                phase="Phase 1"
                title="AI RFID Asset Management"
                description="TRACKT connects to your existing RFID readers (Urovo, Zebra, Honeywell) and adds an intelligent AI layer for natural language queries and anomaly detection."
                status="available"
                icon={CheckCircle2}
                items={[
                  'Live asset feed from RFID readers',
                  'Natural language query engine',
                  'Anomaly detection & alerts',
                  'Continuous monitoring',
                  'Full audit trail',
                  'NHS/regulatory compliance ready',
                ]}
              />

              {/* PHASE 2: BUILDING */}
              <RoadmapPhase
                phase="Phase 2"
                title="CCTV Integration Layer"
                description="Connect RFID triggers to CCTV feeds. When an asset leaves a zone, automatically capture and correlate video footage. Compliance investigators get visual proof instantly."
                status="building"
                icon={Zap}
                items={[
                  'RFID trigger → CCTV correlation',
                  'Automatic video capture on anomalies',
                  'Timeline reconstruction (asset + video)',
                  'ONVIF-compliant camera support',
                  'Multi-site video federation',
                  'Encrypted video retention',
                ]}
              />

              {/* PHASE 3: PLANNED */}
              <RoadmapPhase
                phase="Phase 3"
                title="Unified Access Control"
                description="Bring it all together. RFID movement + CCTV footage + door access logs in one query. Know exactly who accessed what equipment, when, and from where."
                status="planned"
                icon={Target}
                items={[
                  'Access control integration (Salto, HID, etc)',
                  'Identity-to-asset correlation',
                  'Full compliance chain of custody',
                  'Insider threat detection',
                  'One-pane-of-glass dashboard',
                  'Automated audit reports',
                ]}
              />

            </div>
          </div>
        </section>

        {/* TECH IMPLICATIONS */}
        <section className="border-b border-white/5 bg-black/40">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <SectionHeader
              label="The AI Difference"
              title="Why this matters."
              sub="Each phase builds on intelligent data correlation, not just collection."
            />

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Phase 1: Ask Anything',
                  desc: 'Natural language queries on RFID data. "Where is every defibrillator?" answered in seconds.'
                },
                {
                  title: 'Phase 2: See What Happened',
                  desc: 'RFID anomaly triggers video. AI correlates the asset movement with visual evidence.',
                },
                {
                  title: 'Phase 3: Know Who & Why',
                  desc: 'Add identity layer. Full compliance chain: who touched what, when, why. No guessing.',
                },
              ].map((item, i) => (
                <div key={i} className="border border-white/10 bg-white/[0.02] p-6 rounded-sm">
                  <h3 className="text-white font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-24 text-center">
            <h2 className="text-3xl font-black mb-6">Want Phase 2 or Phase 3?</h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-10">
              If CCTV or access control integration is critical for your organization, reach out. We prioritize based on pilot demand.
            </p>
            <a
              href="mailto:hello@trackt.io"
              className="inline-flex items-center justify-center px-8 py-4 bg-cyan-500 text-black font-bold font-mono text-sm hover:bg-cyan-400 transition-colors"
            >
              DISCUSS YOUR NEEDS
            </a>
          </div>
        </section>

      </div>
    </TracktLayout>
  );
}