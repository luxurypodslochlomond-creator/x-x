import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CTRL51Icon from '@/components/ctrl51/CTRL51Icon';

export default function CTRL51Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0f1a] to-black text-white p-6 lg:p-12">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <CTRL51Icon size={60} animate={true} />
          </div>
          <h1 className="text-5xl font-black mb-4">CTRL51 Pricing</h1>
          <p className="text-lg text-gray-400">Transparent pricing. No surprises. Start controlling spend today.</p>
        </motion.div>

        {/* PRICING TIERS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* PILOT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 hover:border-cyan-500/50 transition"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-black mb-6">Pilot Plan</h2>
              <div className="space-y-1">
                <div className="text-5xl font-black text-cyan-400">£5,000</div>
                <p className="text-sm text-gray-400">per month, billed monthly</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 mb-8 pb-8 border-b border-cyan-500/20">
              Perfect for councils testing the system. One council, unlimited analysis, full support.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                'Single council access',
                'Unlimited CSV uploads',
                'AI analysis & alerts',
                'Real-time dashboard',
                'Email support',
                '7-day free trial',
                'Cancel anytime',
              ].map((feature, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 mt-2" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-bold rounded-lg hover:from-cyan-400 hover:to-cyan-500 transition">
              Start Free Trial
            </button>
          </motion.div>

          {/* ENTERPRISE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-amber-500/5 hover:border-amber-500/50 transition relative"
          >
            <div className="absolute -top-3 left-6">
              <span className="px-4 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-xs font-bold text-amber-400">Most Popular</span>
            </div>
            
            <div className="mb-8 pt-4">
              <h2 className="text-3xl font-black mb-6">Enterprise</h2>
              <div className="space-y-1">
                <div className="text-3xl font-black text-amber-400">Custom</div>
                <p className="text-sm text-gray-400">tailored to your needs</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 mb-8 pb-8 border-b border-amber-500/20">
              For councils scaling across regions. Multi-council, white-label, API access, dedicated support.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                'Multi-council deployment',
                'White-label platform',
                'Custom branding',
                'API & integrations',
                'Advanced analytics',
                'Dedicated account manager',
                'SLA guarantees',
                'Custom training',
              ].map((feature, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-2" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <button className="w-full py-4 border-2 border-amber-500/40 text-amber-400 font-bold rounded-lg hover:border-amber-500/60 hover:bg-amber-500/10 transition">
              Request Demo
            </button>
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6 mb-20"
        >
          <h2 className="text-3xl font-black">Common Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'Can we scale to multiple councils?',
                a: 'Yes. Enterprise plan supports unlimited councils with custom pricing per region.',
              },
              {
                q: 'What\'s included in the 7-day trial?',
                a: 'Full Pilot access. Upload data, run analysis, no credit card required. Full features.',
              },
              {
                q: 'How secure is our procurement data?',
                a: 'Bank-grade encryption (AES-256 at rest, TLS 1.3 in transit). SOC2 Type II certified.',
              },
              {
                q: 'Do you offer annual discounts?',
                a: 'Yes. Annual Pilot contracts get 15% off. Enterprise pricing negotiable.',
              },
              {
                q: 'What format does the CSV need to be?',
                a: 'Standard format: Site, Product, Supplier, Quantity, Price. We handle variations gracefully.',
              },
              {
                q: 'Is there training or onboarding?',
                a: 'Pilot includes email support. Enterprise includes dedicated onboarding and training.',
              },
            ].map((item, i) => (
              <div key={i} className="p-6 border border-cyan-500/15 bg-cyan-500/5 rounded-xl hover:border-cyan-500/30 transition">
                <p className="font-bold text-sm mb-3">{item.q}</p>
                <p className="text-xs text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center py-16 border-t border-cyan-500/20"
        >
          <h2 className="text-3xl font-black mb-2">Ready to Start?</h2>
          <p className="text-gray-400 mb-8">No credit card needed. 7-day trial. Cancel anytime.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/CTRL51Dashboard"
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-bold rounded-lg hover:from-cyan-400 hover:to-cyan-500 transition"
            >
              Start Trial Now
            </Link>
            <a
              href="mailto:hello@ctrl51.uk"
              className="px-8 py-3 border border-cyan-500/30 text-cyan-400 font-bold rounded-lg hover:border-cyan-500 transition"
            >
              Talk to Sales
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}