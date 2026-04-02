import React from 'react';
import { motion } from 'framer-motion';
import TracktLayout from '@/components/trackt/TracktLayout';
import { CheckCircle, Zap, Target, Eye } from 'lucide-react';

const SectionHeader = ({ label, title, sub }) => (
  <div className="mb-12">
    <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-3">{label}</p>
    <h2 className="text-3xl font-black text-white tracking-tight">{title}</h2>
    {sub && <p className="text-gray-400 mt-3 max-w-2xl leading-relaxed">{sub}</p>}
  </div>
);

const PhaseCard = ({ phase, timeline, status, items, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="border border-white/10 bg-white/[0.02] p-8 rounded-sm hover:border-cyan-500/30 transition-colors"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-cyan-400" />
        <div>
          <h3 className="text-white font-bold">{phase}</h3>
          <p className="text-cyan-400 text-sm font-mono">{timeline}</p>
        </div>
      </div>
      <span className={`text-xs font-mono px-2 py-1 rounded-sm border ${
        status === 'Live' ? 'border-green-500/30 text-green-400 bg-green-500/5' :
        status === 'In Progress' ? 'border-amber-500/30 text-amber-400 bg-amber-500/5' :
        'border-gray-500/30 text-gray-400 bg-gray-500/5'
      }`}>
        {status}
      </span>
    </div>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
          <span className="text-cyan-500/60 mt-1">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default function TracktRoadmap() {
  const phases = [
    {
      phase: 'Phase 1 — Core',
      timeline: 'Live Today',
      status: 'Live',
      icon: CheckCircle,
      items: [
        'RFID asset ingestion (Urovo, Zebra, Honeywell)',
        'Natural language query engine (LLM-powered)',
        'Anomaly detection & continuous monitoring',
        'NFC tap-to-insight for mobile workers',
        'PWA (works offline, no app download)',
        'Audit trail & compliance logging',
      ]
    },
    {
      phase: 'Phase 2 — Integration',
      timeline: 'Q2 2026',
      status: 'In Progress',
      icon: Zap,
      items: [
        'ERP system connectors (SAP, Oracle, Netsuite)',
        'Access control integration (door logs + asset movements)',
        'Maintenance system bridges (SAP PM, Maximo)',
        'Custom API for existing workflows',
        'Webhook support for external systems',
        'Role-based dashboard customization',
      ]
    },
    {
      phase: 'Phase 3 — Intelligence',
      timeline: 'Q3 2026',
      status: 'Planned',
      icon: Eye,
      items: [
        'Predictive maintenance (when equipment will fail)',
        'Smart theft detection (movement pattern analysis)',
        'Cost optimization (when to repair vs replace)',
        'Compliance forecasting (flag compliance gaps before audit)',
        'Utilization analytics (asset idle time, ROI per equipment)',
        'Custom ML models per facility',
      ]
    },
    {
      phase: 'Phase 4 — Scale',
      timeline: 'Q4 2026+',
      status: 'Planned',
      icon: Target,
      items: [
        'Multi-site federation (manage 50+ locations from one interface)',
        'Cross-site asset transfers (track equipment moving between sites)',
        'Supplier inventory bridges (manage vendor stock in real time)',
        'Mobile worker offline sync (scan while offline, sync when online)',
        'Batch import/export tools (bulk operations)',
        'Advanced reporting engine (custom SQL queries for power users)',
      ]
    },
  ];

  return (
    <TracktLayout>
      <div className="min-h-screen bg-[#050810] text-white">
        
        {/* HERO */}
        <section className="border-b border-white/5 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 rounded-sm mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-400 font-mono text-xs tracking-widest">ROADMAP</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-none mb-6">
                Where we're headed.
              </h1>
              <p className="text-xl text-gray-300 mb-3 max-w-2xl">
                TRACKT is live and operational today. Here's what's next.
              </p>
              <p className="text-gray-500 max-w-2xl">
                We're building in phases. Each phase adds capabilities based on customer feedback from pilots in NHS, logistics, and manufacturing.
              </p>
            </motion.div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <SectionHeader
              label="Four Phases"
              title="What's shipping when."
              sub="Driven by customer demand. All timelines subject to pilot feedback."
            />
            <div className="grid md:grid-cols-2 gap-6">
              {phases.map((p, i) => (
                <PhaseCard key={i} {...p} />
              ))}
            </div>
          </div>
        </section>

        {/* KEY PHILOSOPHY */}
        <section className="border-b border-white/5 bg-black/40">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <SectionHeader
              label="Our Approach"
              title="Why we ship like this."
            />
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Your Data, Your Timeline',
                  desc: 'Pilots drive the roadmap. If you need integration with your ERP, we build it with you. No features without customer validation.'
                },
                {
                  title: 'No Bloatware',
                  desc: 'Every feature is battle-tested in a real facility before it ships. We don\'t build features nobody uses.'
                },
                {
                  title: 'Backwards Compatible Always',
                  desc: 'Phase 2 won\'t break Phase 1. Existing pilots stay operational. No surprise API changes.'
                }
              ].map((item, i) => (
                <div key={i} className="border-l-2 border-cyan-500/30 pl-6">
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
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
          <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 text-center">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">
              Have a feature request?
            </h2>
            <p className="text-gray-400 mb-8">
              We build roadmaps with our pilots. If you need something specific, let's talk about how to make it real.
            </p>
            <a
              href="mailto:hello@trackt.io"
              className="inline-flex items-center justify-center px-6 py-3 bg-cyan-500 text-black font-bold font-mono text-sm hover:bg-cyan-400 transition-colors"
            >
              REQUEST A PILOT
            </a>
          </div>
        </section>

      </div>
    </TracktLayout>
  );
}