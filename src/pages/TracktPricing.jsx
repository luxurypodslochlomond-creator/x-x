import React from 'react';
import TracktLayout from '@/components/trackt/TracktLayout';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Pilot',
    price: 'Free',
    sub: '30-day programme',
    desc: 'Full TRACKT access for one site. See the value before you commit.',
    highlight: false,
    cta: 'Apply for Pilot',
    ctaHref: 'mailto:hello@trackt.io?subject=TRACKT Pilot Application',
    features: [
      'One RFID gateway / site',
      'Up to 500 active tags',
      'Natural language query interface',
      'Anomaly detection engine',
      'NFC tap-to-insight (mobile)',
      'Email support',
      '30-day programme — no obligation',
    ],
  },
  {
    name: 'Operational',
    price: '£1,200',
    sub: 'per site / month',
    desc: 'Full deployment for operational sites. Includes integration and onboarding.',
    highlight: true,
    cta: 'Request Quote',
    ctaHref: 'mailto:hello@trackt.io?subject=TRACKT Operational Pricing',
    features: [
      'Unlimited RFID gateways per site',
      'Unlimited active tags',
      'Full AI query interface',
      'Anomaly + compliance engine',
      'ERP / access control integration',
      'Cross-system correlation',
      'Dedicated onboarding engineer',
      'SLA-backed support',
      'Custom compliance report templates',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    sub: 'multi-site / NHS trust',
    desc: 'For NHS trusts, large 3PLs and multi-site manufacturers.',
    highlight: false,
    cta: 'Talk to Us',
    ctaHref: 'mailto:hello@trackt.io?subject=TRACKT Enterprise',
    features: [
      'Everything in Operational',
      'Multi-site centralised dashboard',
      'Trust-wide compliance reporting',
      'Custom AI query training on your data',
      'Air-gapped / on-premise deployment option',
      'Dedicated account manager',
      'Executive business reviews',
      'NHS procurement framework compatible',
    ],
  },
];

export default function TracktPricing() {
  return (
    <TracktLayout>
      <div className="min-h-screen bg-[#050810]">

        {/* HEADER */}
        <section className="border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
          <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
            <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">Pricing</p>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
              Start free. Scale when it works.
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
              No hardware investment. No long procurement. Try TRACKT free on a single site for 30 days. Operational in 30 days or we refund your first month.
            </p>
          </div>
        </section>

        {/* PLANS */}
        <section className="border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="grid md:grid-cols-3 gap-px bg-white/5">
              {plans.map((plan, i) => (
                <div
                  key={i}
                  className={`p-8 flex flex-col ${plan.highlight ? 'bg-cyan-500/5 border-t-2 border-cyan-500' : 'bg-[#050810]'}`}
                >
                  {plan.highlight && (
                    <span className="text-cyan-400 font-mono text-xs tracking-widest mb-4">MOST POPULAR</span>
                  )}
                  <p className="text-gray-500 font-mono text-xs tracking-widest uppercase mb-2">{plan.name}</p>
                  <div className="mb-2">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                  </div>
                  <p className="text-gray-600 font-mono text-xs mb-4">{plan.sub}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8">{plan.desc}</p>

                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-400 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={plan.ctaHref}
                    className={`block text-center py-3 font-bold font-mono text-sm transition-colors ${
                      plan.highlight
                        ? 'bg-cyan-500 text-black hover:bg-cyan-400'
                        : 'border border-white/20 text-white hover:border-white/40'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-white/5 bg-black/40">
          <div className="max-w-4xl mx-auto px-6 py-20">
            <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-10">Common questions</p>
            <div className="space-y-8">
              {[
                { q: 'Do we need to replace our RFID hardware?', a: 'No. TRACKT connects to your existing Urovo, Zebra, Honeywell or Impinj infrastructure via standard APIs. No hardware changes required.' },
                { q: 'How long does deployment take?', a: 'Operational in 30 days. We handle the integration work. Your team needs to do almost nothing except give us API access to your existing RFID system.' },
                { q: 'Is TRACKT compatible with NHS procurement frameworks?', a: 'We are actively working through NHS framework compatibility for enterprise contracts. Talk to us — we can usually find a route.' },
                { q: 'What about air-gapped or low-connectivity sites?', a: 'TRACKT uses edge-first architecture. Core AI processing runs on-device. Works in warehouses, theatre complexes, and anywhere with limited internet.' },
                { q: 'Can we extend the pilot?', a: 'Yes. If you need more time to evaluate, we\'ll work with you. The goal is for you to see value clearly before committing.' },
              ].map((item, i) => (
                <div key={i} className="border-b border-white/5 pb-8 last:border-0 last:pb-0">
                  <h3 className="text-white font-bold mb-2">{item.q}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="max-w-3xl mx-auto px-6 py-24 text-center">
            <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">Apply now</p>
            <h2 className="text-3xl font-black tracking-tight mb-4">Join the pilot programme.</h2>
            <p className="text-gray-500 mb-8">Limited places. NHS and logistics operators prioritised.</p>
            <a href="mailto:hello@trackt.io?subject=TRACKT Pilot Application" className="inline-flex items-center justify-center px-8 py-4 bg-cyan-500 text-black font-bold font-mono text-sm hover:bg-cyan-400 transition-colors">
              APPLY FOR PILOT
            </a>
          </div>
        </section>

      </div>
    </TracktLayout>
  );
}