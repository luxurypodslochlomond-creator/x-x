import React from 'react';
import TracktLayout from '@/components/trackt/TracktLayout';
import { Signal, Zap, Shield, Users } from 'lucide-react';

export default function TracktAbout() {
  return (
    <TracktLayout>
      <div className="min-h-screen bg-[#050810]">

        {/* HERO */}
        <section className="border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
          <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
            <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">About TRACKT</p>
            <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-6">
              Built by people who lost assets.
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed max-w-2xl">
              TRACKT was born from a simple problem — RFID hardware generates millions of data points a day, and nobody can make sense of them. We built the intelligence layer that was missing.
            </p>
          </div>
        </section>

        {/* STORY */}
        <section className="border-b border-white/5">
          <div className="max-w-4xl mx-auto px-6 py-20 space-y-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-4">The Problem</p>
                <p className="text-gray-400 leading-relaxed mb-4">
                  NHS trusts, logistics companies, manufacturers — they've invested millions in RFID hardware. Zebra readers, Urovo handheld scanners, Impinj portals. The hardware works.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  But the data it generates sits in raw log files. Operators hunt through spreadsheets. Compliance teams pull manual reports. Nobody actually knows where anything is — not in real time.
                </p>
              </div>
              <div>
                <p className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-4">Our Answer</p>
                <p className="text-gray-400 leading-relaxed mb-4">
                  TRACKT is an AI intelligence layer that sits on top of your existing RFID infrastructure. No hardware changes. No rip-and-replace. Connect in days.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Ask "where is DEF-07?" and get an answer. Ask "which assets are overdue?" and get a list. The data was always there — we made it answerable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="border-b border-white/5 bg-black/40">
          <div className="max-w-4xl mx-auto px-6 py-20">
            <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-12">What we stand for</p>
            <div className="grid md:grid-cols-2 gap-px bg-white/5">
              {[
                { icon: Zap, title: 'Zero friction deployment', desc: 'We refuse to require infrastructure changes. If your RFID hardware is running, TRACKT connects to it. Day one value, not 6-month implementations.' },
                { icon: Shield, title: 'Operational truth', desc: 'Real-time data, honestly presented. No vanity dashboards. No metrics that look good but don\'t help. Just answers to the questions that matter.' },
                { icon: Signal, title: 'Edge-first architecture', desc: 'Core operations run on-device. Air-gapped environments. Low-connectivity warehouses. We don\'t compromise on reliability because the internet is unreliable.' },
                { icon: Users, title: 'Built for workers', desc: 'NFC tap-to-insight. Plain English queries. Interfaces that don\'t require training. The person on the ward floor and the CFO both need TRACKT to work for them.' },
              ].map((v, i) => (
                <div key={i} className="bg-[#050810] p-8">
                  <v.icon className="w-6 h-6 text-cyan-400 mb-4" />
                  <h3 className="text-white font-bold mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PARTNERSHIPS */}
        <section className="border-b border-white/5">
          <div className="max-w-4xl mx-auto px-6 py-20">
            <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-6">Partner ecosystem</p>
            <h2 className="text-3xl font-black tracking-tight mb-6">Works with your existing stack.</h2>
            <p className="text-gray-400 leading-relaxed mb-10 max-w-2xl">
              TRACKT is an official ISV partner of the Urovo RFID platform. We connect to Zebra, Honeywell, Impinj, and any LLRP-compliant reader. Your hardware investment is protected.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Urovo ISV Partner', 'Zebra Compatible', 'Honeywell Compatible', 'Impinj Compatible', 'LLRP Standard', 'EPCIS 2.0'].map((badge, i) => (
                <span key={i} className="border border-white/10 text-gray-400 font-mono text-xs px-3 py-1.5 rounded-sm">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="max-w-3xl mx-auto px-6 py-24 text-center">
            <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">Get started</p>
            <h2 className="text-3xl font-black tracking-tight mb-4">Ready to see your assets?</h2>
            <p className="text-gray-500 mb-8">Talk to us about the pilot programme. No commitment required.</p>
            <a href="mailto:hello@trackt.io" className="inline-flex items-center justify-center px-8 py-4 bg-cyan-500 text-black font-bold font-mono text-sm hover:bg-cyan-400 transition-colors">
              GET IN TOUCH
            </a>
          </div>
        </section>

      </div>
    </TracktLayout>
  );
}