import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTRL51Icon from '@/components/ctrl51/CTRL51Icon';

export default function CTRL51Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0f1a] to-black text-white p-6 lg:p-12">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <CTRL51Icon size={60} />
          </div>
          <h1 className="text-4xl font-black mb-4">CTRL51 Pricing</h1>
          <p className="text-lg text-gray-300">Simple, transparent pricing for public sector procurement control.</p>
        </div>

        {/* PRICING TIERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* PILOT */}
          <div className="p-8 rounded-xl border border-cyan-500/30 bg-cyan-500/5">
            <h2 className="text-2xl font-black mb-2">CTRL51 Pilot</h2>
            <div className="mb-6">
              <span className="text-4xl font-black">£5,000</span>
              <span className="text-gray-400 ml-3">/month</span>
            </div>
            <p className="text-sm text-gray-400 mb-8">For one council testing the system. Perfect for pilots.</p>
            
            <ul className="space-y-3 mb-8">
              {[
                'Single council access',
                'Unlimited CSV uploads',
                'AI fragmentation analysis',
                'Real-time alerts',
                'Live dashboard',
                'Email support',
                '7-day free trial',
              ].map((feature, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className="w-full py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition">
              Start 7-Day Trial
            </button>
          </div>

          {/* ENTERPRISE */}
          <div className="p-8 rounded-xl border border-green-500/30 bg-green-500/5">
            <h2 className="text-2xl font-black mb-2">CTRL51 Enterprise</h2>
            <div className="mb-6">
              <span className="text-2xl font-black">Custom</span>
              <span className="text-gray-400 ml-3">contact for pricing</span>
            </div>
            <p className="text-sm text-gray-400 mb-8">Multi-council deployment, white-label, custom features.</p>
            
            <ul className="space-y-3 mb-8">
              {[
                'Multi-council support',
                'White-label option',
                'Custom branding',
                'API access',
                'Advanced reporting',
                'Dedicated account manager',
                'Custom integrations',
              ].map((feature, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className="w-full py-3 border border-green-500/40 text-green-400 font-bold rounded-lg hover:border-green-500 transition">
              Request Demo
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black">Frequently Asked Questions</h2>

          {[
            {
              q: 'What if we want to expand to more councils?',
              a: 'Pricing scales with the number of councils. Each additional council is £3,500/month.',
            },
            {
              q: 'Do you offer annual contracts?',
              a: 'Yes. Annual contracts receive a 15% discount. Contact us for details.',
            },
            {
              q: 'What about data security?',
              a: 'All data is encrypted in transit and at rest. We\'re SOC2 Type II compliant.',
            },
            {
              q: 'Can you white-label CTRL51?',
              a: 'Yes. Enterprise customers can white-label the platform with their own branding.',
            },
            {
              q: 'Is there setup or implementation cost?',
              a: 'Pilot includes setup. Enterprise may have additional implementation fees depending on custom work.',
            },
          ].map((item, i) => (
            <div key={i} className="p-6 border border-cyan-500/20 bg-cyan-500/5 rounded-lg">
              <p className="font-bold mb-2">{item.q}</p>
              <p className="text-sm text-gray-400">{item.a}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 py-12 border-t border-cyan-500/20">
          <h2 className="text-2xl font-black mb-4">Ready to Get Started?</h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/CTRL51Dashboard"
              className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition"
            >
              Start Free Trial
            </Link>
            <a
              href="mailto:hello@ctrl51.uk"
              className="px-8 py-3 border border-cyan-500/40 text-cyan-400 font-bold rounded-lg hover:border-cyan-500 transition"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}