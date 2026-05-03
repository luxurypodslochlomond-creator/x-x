import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, AlertCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTRL51Icon from '@/components/ctrl51/CTRL51Icon';

export default function CTRL51Page() {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0f1a] to-black text-white">
      {/* HERO */}
      <section className="relative px-6 py-24 lg:py-32 max-w-6xl mx-auto">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CTRL51Icon size={80} animate={true} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-5xl lg:text-6xl font-black tracking-tight">
              CTRL51
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Procurement intelligence that works <em>with</em> you, not instead of you.
            </p>
            <p className="text-sm text-gray-400">
              See fragmentation. Spot savings. Control spend. Before money leaves.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link
              to="/CTRL51Dashboard"
              className="px-8 py-4 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition flex items-center gap-2"
            >
              Start Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/CTRL51Pricing"
              className="px-8 py-4 border border-cyan-500/40 text-cyan-400 font-bold rounded-lg hover:border-cyan-500 transition"
            >
              View Pricing
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black mb-16 text-center">How CTRL51 Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              num: '01',
              title: 'Upload Your Data',
              desc: 'Drop your procurement CSV. That\'s it. No setup needed.',
            },
            {
              num: '02',
              title: 'Instant Analysis',
              desc: 'AI spots fragmentation, price anomalies, unapproved suppliers in seconds.',
            },
            {
              num: '03',
              title: 'Control & Act',
              desc: 'See what\'s happening. Make decisions. Track everything. Save money.',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredFeature(i)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="p-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition cursor-pointer"
              whileHover={{ y: -4 }}
            >
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mb-4 text-lg font-black text-cyan-400">
                {feature.num}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ALERTS SECTION */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black mb-12 text-center">What CTRL51 Catches</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Price Above Benchmark', desc: '30% markup instantly flagged' },
            { title: 'Supplier Fragmentation', desc: 'Same products, different prices across sites' },
            { title: 'Unapproved Vendors', desc: 'Buying from non-approved suppliers' },
            { title: 'Savings Opportunities', desc: 'Consolidation paths identified' },
          ].map((alert, i) => (
            <div key={i} className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
              <div className="flex gap-3">
                <div className="w-1 bg-red-400 flex-shrink-0 rounded" />
                <div>
                  <p className="font-bold text-sm">{alert.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{alert.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black mb-12 text-center">Simple Pricing</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {[
            {
              name: 'CTRL51 Pilot',
              price: '£5,000',
              period: '/month',
              desc: 'Perfect for one council testing the system',
              features: ['Single council', 'Unlimited uploads', 'AI analysis', 'Dashboard access', 'Email support'],
            },
            {
              name: 'CTRL51 Enterprise',
              price: 'Custom',
              period: 'contact us',
              desc: 'Multi-council deployment + white-label',
              features: ['Multiple councils', 'White-label option', 'Custom integrations', 'Dedicated support', 'API access'],
            },
          ].map((plan, i) => (
            <motion.div
              key={i}
              className="p-8 rounded-xl border border-cyan-500/30 bg-cyan-500/5"
              whileHover={{ y: -4 }}
            >
              <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-sm text-gray-400 ml-2">{plan.period}</span>
              </div>
              <p className="text-sm text-gray-400 mb-6">{plan.desc}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex gap-2 text-sm">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition">
                Learn More
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 max-w-4xl mx-auto text-center border-t border-cyan-500/20 mt-20">
        <h2 className="text-3xl font-black mb-4">Ready to Control Your Spend?</h2>
        <p className="text-gray-300 mb-8">Start with a free 7-day pilot. No card required. See the system in action.</p>
        <Link
          to="/CTRL51Dashboard"
          className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition"
        >
          Start Demo Now <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* FOOTER CTA */}
      <footer className="px-6 py-12 border-t border-cyan-500/20 mt-20">
        <div className="max-w-6xl mx-auto flex justify-center gap-8 text-sm text-gray-400">
          <Link to="/CTRL51Terms" className="hover:text-cyan-400 transition">Terms</Link>
          <Link to="/CTRL51Privacy" className="hover:text-cyan-400 transition">Privacy</Link>
          <Link to="/CTRL51Pricing" className="hover:text-cyan-400 transition">Pricing</Link>
          <a href="mailto:hello@ctrl51.uk" className="hover:text-cyan-400 transition">Contact</a>
        </div>
      </footer>
    </div>
  );
}