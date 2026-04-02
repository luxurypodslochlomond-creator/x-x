import React from 'react';
import { motion } from 'framer-motion';
import TracktLayout from '@/components/trackt/TracktLayout';
import { Clock, Users, Shield, Zap } from 'lucide-react';

const SectionHeader = ({ label, title, sub }) => (
  <div className="mb-12">
    <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-3">{label}</p>
    <h2 className="text-3xl font-black text-white tracking-tight">{title}</h2>
    {sub && <p className="text-gray-400 mt-3 max-w-2xl leading-relaxed">{sub}</p>}
  </div>
);

const StepCard = ({ number, title, desc, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="border border-white/10 bg-white/[0.02] p-8 rounded-sm hover:border-cyan-500/30 transition-colors"
  >
    <div className="flex items-start gap-4 mb-4">
      <Icon className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
      <div>
        <p className="text-cyan-400 font-mono text-sm mb-1">{number}</p>
        <h3 className="text-white font-bold text-lg">{title}</h3>
      </div>
    </div>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export default function TracktHowItWorks() {
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
                <span className="text-cyan-400 font-mono text-xs tracking-widest">HOW IT WORKS</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-none mb-6">
                Simple setup. Real results.
              </h1>
              <p className="text-xl text-gray-300 mb-3 max-w-2xl">
                No forklift upgrades. No consultant timelines. Just connect to your existing RFID readers and start asking questions.
              </p>
              <p className="text-gray-500 max-w-2xl">
                Most pilot sites are operational within 30 days.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SETUP TIMELINE */}
        <section className="border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <SectionHeader
              label="From Start to Running"
              title="The typical setup process."
            />
            <div className="grid md:grid-cols-4 gap-6">
              <StepCard
                number="Week 1"
                title="Discovery Call"
                desc="We understand your facility, existing hardware, and biggest pain points. You show us your readers. We confirm integration approach."
                icon={Clock}
              />
              <StepCard
                number="Week 2-3"
                title="Data Pipeline Setup"
                desc="We configure the TRACKT ingestion layer. Your readers send scan events via API. Audit trail starts recording immediately. Zero downtime."
                icon={Zap}
              />
              <StepCard
                number="Week 3-4"
                title="User Training"
                desc="Your team learns the dashboard, natural language queries, mobile PWA, and NFC tap-to-insight. Typically one day of hands-on training."
                icon={Users}
              />
              <StepCard
                number="Week 4+"
                title="Pilot & Learn"
                desc="You're live. We monitor, tune anomaly thresholds, and add custom rules based on real scan data. Full support included."
                icon={Shield}
              />
            </div>
          </div>
        </section>

        {/* THE DATA PIPELINE */}
        <section className="border-b border-white/5 bg-black/40">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <SectionHeader
              label="Technical Details"
              title="How your data flows."
              sub="Full transparency. Your data stays in your environment."
            />
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Readers Scan',
                  desc: 'Your Urovo, Zebra or Honeywell readers detect tags. Send scan events to TRACKT via HTTPS API.',
                  color: 'text-blue-400'
                },
                {
                  step: '02',
                  title: 'Normalize & Validate',
                  desc: 'TRACKT receives events. Normalizes vendor-specific formats. Validates data integrity. Logs everything.',
                  color: 'text-cyan-400'
                },
                {
                  step: '03',
                  title: 'Process & Store',
                  desc: 'Events processed through anomaly engine. Asset state updated in real time. Audit trail recorded to your database.',
                  color: 'text-purple-400'
                },
                {
                  step: '04',
                  title: 'Query & Respond',
                  desc: 'Workers and admins ask questions via dashboard or mobile. LLM queries your data. Answers in seconds. No external lookups.',
                  color: 'text-green-400'
                },
              ].map((item, i) => (
                <div key={i} className="border border-white/10 bg-white/[0.02] p-6 rounded-sm hover:border-white/20 transition-colors">
                  <p className={`text-2xl font-black font-mono mb-3 ${item.color}`}>{item.step}</p>
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT YOU NEED */}
        <section className="border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <SectionHeader
              label="Prerequisites"
              title="What you need to get started."
            />
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-white font-bold mb-6">Hardware (You Already Have This)</h3>
                <ul className="space-y-3">
                  {[
                    'RFID readers: Urovo, Zebra, Honeywell, or any LLRP-compliant device',
                    'Network connectivity: Standard HTTPS (port 443)',
                    'Mobile devices: Any device for PWA access (no app download needed)',
                    'Existing database: Where your asset data lives (SAP, Oracle, custom)'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-cyan-400 font-mono text-sm mt-1">✓</span>
                      <span className="text-gray-400 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-white font-bold mb-6">From TRACKT</h3>
                <ul className="space-y-3">
                  {[
                    'API endpoints for data ingestion',
                    'Dashboard & PWA access (cloud-hosted)',
                    'LLM query engine (no additional licensing)',
                    '24/5 technical support during pilot',
                    'Custom rule tuning & optimization',
                    'Full audit logging & compliance reports'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-green-400 font-mono text-sm mt-1">✓</span>
                      <span className="text-gray-400 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* COMMON QUESTIONS */}
        <section className="border-b border-white/5 bg-black/40">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <SectionHeader
              label="FAQ"
              title="Common questions."
            />
            <div className="space-y-6">
              {[
                {
                  q: 'Will it slow down my existing RFID system?',
                  a: 'No. TRACKT listens to scan events asynchronously. Your readers continue working normally. Zero impact on throughput or latency.'
                },
                {
                  q: 'What if my readers use a different protocol?',
                  a: 'If your readers support LLRP or standard REST APIs, we can integrate. If not, we work with you to build a custom translator. Most integrations take 1-2 weeks.'
                },
                {
                  q: 'Can I use this for multiple sites?',
                  a: 'Phase 1 handles one site. Phase 2 (Q2 2026) adds multi-site federation. Existing customers will get it as an upgrade.'
                },
                {
                  q: 'What happens to my data if TRACKT goes away?',
                  a: 'Your data lives in your database. All scan events are logged to your systems. You maintain full ownership and control. We\'re not a data hostage situation.'
                },
                {
                  q: 'How much does it cost?',
                  a: 'Pricing is per-site and scales with reader count + monthly scan volume. See pricing page for details. Typical healthcare facility: £3-8k/month all-in.'
                },
                {
                  q: 'Can I turn it off and use my readers normally?',
                  a: 'Yes. TRACKT is purely optional. Stop the integration at any time. Your readers go back to normal. No lock-in.'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="border-b border-white/5 pb-6"
                >
                  <h3 className="text-white font-bold mb-2">{item.q}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
                </motion.div>
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
              Ready to get started?
            </h2>
            <p className="text-gray-400 mb-8">
              Limited pilot spots for NHS, healthcare, and logistics. Let's talk about your facility.
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