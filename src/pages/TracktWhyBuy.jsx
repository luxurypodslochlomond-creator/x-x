import React from 'react';
import { motion } from 'framer-motion';
import TracktLayout from '@/components/trackt/TracktLayout';
import { DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const SectionHeader = ({ label, title, sub }) => (
  <div className="mb-12">
    <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-3">{label}</p>
    <h2 className="text-3xl font-black text-white tracking-tight">{title}</h2>
    {sub && <p className="text-gray-400 mt-3 max-w-2xl leading-relaxed">{sub}</p>}
  </div>
);

const ValueCard = ({ icon: Icon, title, metric, desc }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="border border-white/10 bg-white/[0.02] p-8 rounded-sm hover:border-cyan-500/30 transition-colors"
  >
    <Icon className="w-6 h-6 text-cyan-400 mb-4" />
    <p className="text-cyan-400 font-mono text-2xl font-black mb-1">{metric}</p>
    <h3 className="text-white font-bold mb-2">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export default function TracktWhyBuy() {
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
                <span className="text-cyan-400 font-mono text-xs tracking-widest">WHY TRACKT</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-none mb-6">
                The ROI is real.
              </h1>
              <p className="text-xl text-gray-300 mb-3 max-w-2xl">
                TRACKT pays for itself. Here's how and why.
              </p>
              <p className="text-gray-500 max-w-2xl">
                Based on data from NHS pilots and healthcare logistics partners.
              </p>
            </motion.div>
          </div>
        </section>

        {/* THE PROBLEM */}
        <section className="border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <SectionHeader
              label="The Problem"
              title="What's costing you money right now."
            />
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <span className="text-red-400">Lost Equipment</span>
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  A typical NHS hospital loses ~£180k/year on equipment that exists but can't be found. Defibrillators stored on a ward but nobody knows which one. Infusion pumps scattered across three buildings.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Result: Buy duplicates, run annual audits, lose regulatory accreditation points.
                </p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <span className="text-red-400">Maintenance Chaos</span>
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Equipment breaks because maintenance cycles are manual spreadsheets. Critical machines fail mid-shift. Preventive care never happens because you don't know which assets are due.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Result: Emergency repairs cost 3-5x more than preventive. Downtime. Revenue loss.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* THE ROI */}
        <section className="border-b border-white/5 bg-black/40">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <SectionHeader
              label="The Value"
              title="What TRACKT fixes."
            />
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <ValueCard
                icon={DollarSign}
                metric="£180k+"
                title="Equipment Recovery"
                desc="Stop buying duplicate equipment. Find what you have. Typical hospital saves £180-240k/year in recovered assets alone."
              />
              <ValueCard
                icon={TrendingUp}
                metric="12-16%"
                title="Maintenance Cost Reduction"
                desc="Preventive maintenance works. Fix equipment before it breaks. Saves 12-16% on annual maintenance budget versus reactive repairs."
              />
              <ValueCard
                icon={Clock}
                metric="80% Less"
                title="Audit Time"
                desc="Annual compliance audits take weeks. TRACKT generates audit trails automatically. Your Regulatory team gets reports in minutes."
              />
              <ValueCard
                icon={CheckCircle}
                metric="99%+"
                title="Asset Accuracy"
                desc="Know exactly where every asset is. Eliminate manual counts. Real-time visibility replaces quarterly audits."
              />
            </div>

            {/* PAYBACK */}
            <div className="border-l-2 border-cyan-500/30 pl-8">
              <h3 className="text-white font-bold text-lg mb-4">Typical Payback Timeline (Mid-Size Hospital)</h3>
              <div className="space-y-4 text-sm text-gray-400">
                <p>
                  <span className="font-bold text-cyan-400">Year 1:</span> Save £150-200k in recovered equipment + maintenance cost reductions. TRACKT costs ~£60k/year. <span className="text-green-400 font-bold">Net: +£90-140k</span>
                </p>
                <p>
                  <span className="font-bold text-cyan-400">Year 2+:</span> Operational overhead becomes minimal. Equipment stays found. Maintenance runs on schedule. ROI compounds.
                </p>
                <p className="text-xs text-gray-600 mt-6">
                  *Numbers based on NHS pilot sites. Your facility's ROI depends on facility size, equipment count, and current annual loss rate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHO BUYS */}
        <section className="border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <SectionHeader
              label="The Market"
              title="Who's already using TRACKT."
            />
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  sector: 'NHS & Healthcare',
                  why: 'Equipment compliance is non-negotiable. Audit trails are mandatory. Missing defibrillators cost accreditation points. TRACKT solves all three.',
                  pain: 'Missing high-value assets, compliance risk, manual audit burden'
                },
                {
                  sector: 'Logistics & 3PL',
                  why: 'Trailers and pallets disappear. SLAs depend on asset visibility. Cross-dock operations need real-time location. TRACKT gives instant answers.',
                  pain: 'Lost equipment, SLA breaches, customer complaints'
                },
                {
                  sector: 'Manufacturing',
                  why: 'Tools and WIP equipment get misplaced. Maintenance compliance is production-critical. TRACKT prevents both.',
                  pain: 'Production delays, tool loss, compliance violations'
                },
                {
                  sector: 'Facilities Management',
                  why: 'Managing equipment across 50+ sites is chaos. Contractors steal things. Maintenance schedules are guesses. TRACKT centralizes everything.',
                  pain: 'Lost assets, contractor theft, missed maintenance'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border border-white/10 bg-white/[0.02] p-6 rounded-sm"
                >
                  <h3 className="text-white font-bold mb-2">{item.sector}</h3>
                  <p className="text-gray-400 text-sm mb-4">{item.why}</p>
                  <p className="text-red-400/80 text-xs font-mono">Pain: {item.pain}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING TIERS */}
        <section className="border-b border-white/5 bg-black/40">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <SectionHeader
              label="Pricing"
              title="What it costs."
              sub="All-in pricing. No surprise fees. No per-user licenses."
            />
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Starter',
                  desc: 'Single site, 2-3 readers',
                  price: '£3,500',
                  period: '/month',
                  features: ['Up to 5 reader zones', 'Up to 10,000 scans/day', 'Dashboard + PWA access', 'Email support', 'Basic anomaly detection']
                },
                {
                  name: 'Professional',
                  desc: 'Large facility, 5-10 readers',
                  price: '£6,500',
                  period: '/month',
                  features: ['Unlimited readers', 'Up to 100,000 scans/day', 'Dashboard + PWA + API', 'Priority support', 'Custom anomaly rules', 'ERP integration ready'],
                  highlight: true
                },
                {
                  name: 'Enterprise',
                  desc: 'Multi-site, unlimited scale',
                  price: 'Custom',
                  period: 'contact us',
                  features: ['Unlimited sites & readers', 'Unlimited scan volume', 'All professional features', '24/5 dedicated support', 'Custom integrations', 'SLA guarantee']
                }
              ].map((tier, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`border rounded-sm p-8 transition-colors ${
                    tier.highlight
                      ? 'border-cyan-500/60 bg-cyan-500/10'
                      : 'border-white/10 bg-white/[0.02] hover:border-cyan-500/30'
                  }`}
                >
                  {tier.highlight && (
                    <div className="inline-block mb-4">
                      <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-1 border border-cyan-500/30 bg-cyan-500/5 rounded-sm">MOST POPULAR</span>
                    </div>
                  )}
                  <h3 className="text-white font-bold text-lg mb-1">{tier.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{tier.desc}</p>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-black text-white">{tier.price}</span>
                    <span className="text-gray-600 text-sm font-mono">{tier.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {tier.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="text-cyan-400 mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-6 border-l-2 border-cyan-500/30 bg-black/60">
              <p className="text-gray-400 text-sm">
                <span className="font-bold text-white">Pilot Pricing:</span> First three months at 50% discount. Then full pricing. No long-term contract. You can leave at 90 days if not happy.
              </p>
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
              Let's talk ROI.
            </h2>
            <p className="text-gray-400 mb-8">
              We'll calculate your potential savings based on your facility size and current asset loss rate.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:hello@trackt.io"
                className="inline-flex items-center justify-center px-6 py-3 bg-cyan-500 text-black font-bold font-mono text-sm hover:bg-cyan-400 transition-colors"
              >
                REQUEST A PILOT
              </a>
              <a
                href="mailto:partners@trackt.io"
                className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white font-mono text-sm hover:border-white/40 transition-colors"
              >
                VOLUME PRICING
              </a>
            </div>
          </div>
        </section>

      </div>
    </TracktLayout>
  );
}