import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Heart, Shield, Trash2, RefreshCw, Brain, MessageCircle, Sparkles, ArrowRight, X, Check } from 'lucide-react';

const FactRow = ({ label, value }) => (
  <div className="flex items-center justify-between gap-4 py-3 border-b border-white/5">
    <span className="text-gray-500 text-xs font-mono tracking-wider">{label}</span>
    <span className="text-green-400 font-black font-mono text-xs text-right whitespace-nowrap">{value}</span>
  </div>
);

const TruthCard = ({ icon: Icon, title, truth, color = 'cyan' }) => {
  const colors = {
    cyan: 'border-cyan-500/30 text-cyan-400',
    pink: 'border-pink-500/30 text-pink-400',
    green: 'border-green-500/30 text-green-400',
    amber: 'border-amber-500/30 text-amber-400',
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`border ${colors[color]} bg-black p-5`}
    >
      <Icon className={`w-5 h-5 mb-3 ${colors[color].split(' ')[1]}`} />
      <h3 className="text-white font-black font-mono text-sm mb-2 tracking-wide">{title}</h3>
      <p className="text-gray-400 text-xs leading-relaxed">{truth}</p>
    </motion.div>
  );
};

export default function AI51Soul() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white">
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* HERO */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
          {/* AI51 pixel mark */}
          <div className="flex justify-center mb-4">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ filter: 'drop-shadow(0 0 20px rgba(236,72,153,0.7))' }}>
              <motion.rect x="28" y="28" width="8" height="8" fill="#ec4899"
                animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.2, repeat: Infinity }} />
              <motion.rect x="20" y="20" width="24" height="24" fill="none" stroke="#06b6d4" strokeWidth="1"
                animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} />
              <motion.rect x="12" y="12" width="40" height="40" fill="none" stroke="#ec4899" strokeWidth="0.8"
                animate={{ opacity: [0.15, 0.5, 0.15] }} transition={{ duration: 2.5, repeat: Infinity }} />
            </svg>
          </div>

          <p className="text-xs font-mono tracking-widest text-gray-500">AI51 · TRUST & VALUES</p>
          <h1 className="text-4xl md:text-5xl font-black font-mono leading-none">
            AI that actually<br />
            <span className="text-pink-400">respects you.</span>
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xl mx-auto font-mono">
            No legal jargon. No corporate speak. Just what AI51 is, what it does, and what it will never do to you.
          </p>
        </motion.div>

        {/* THE PROMISE */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="border-2 border-pink-500/40 bg-black p-8"
          style={{ boxShadow: '0 0 40px rgba(236,72,153,0.08)' }}
        >
          <p className="text-xs font-mono tracking-widest text-pink-400 mb-4">THE PROMISE</p>
          <p className="text-white text-lg font-bold leading-relaxed mb-4">
            We don't know who you are. We don't want to. Your conversations stay on your device. We have no way to read them even if we wanted to.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            If you delete AI51 — it's gone. Completely. Like it never existed. There's no backup on our servers because there's nothing on our servers.
          </p>
          <p className="text-pink-400 font-black font-mono text-sm tracking-wider">
            THIS ISN'T A FEATURE. IT'S A VALUE.
          </p>
        </motion.div>

        {/* FACTS TABLE */}
        <div>
          <p className="text-xs font-mono tracking-widest text-cyan-400 mb-6">THE ACTUAL FACTS</p>
          <div className="bg-black border border-white/10 p-6">
            <FactRow label="WHERE YOUR CONVERSATIONS ARE STORED" value="YOUR DEVICE ONLY" />
            <FactRow label="DATA SENT TO OUR SERVERS" value="ZERO" />
            <FactRow label="SIGN UP REQUIRED" value="NEVER" />
            <FactRow label="CAN WE READ YOUR CHATS" value="IMPOSSIBLE" />
            <FactRow label="DELETE EVERYTHING ON DEMAND" value="YES — INSTANTLY" />
            <FactRow label="ADS — EVER" value="NEVER. NOT NOW. NOT EVER." />
            <FactRow label="SELLING YOUR DATA" value="NEVER. FULL STOP." />
            <FactRow label="CORPORATE OWNERSHIP" value="CIC — OWNED BY MISSION" />
          </div>
        </div>

        {/* MEMORY */}
        <div>
          <p className="text-xs font-mono tracking-widest text-white mb-6">MEMORY IS <span className="text-pink-400">YOUR</span> CHOICE</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <TruthCard icon={Brain} color="pink" title="REMEMBERS WHAT YOU WANT"
              truth="You can tell AI51 your name, your family, what matters. It remembers — because you chose it. That memory lives on your device." />
            <TruthCard icon={Trash2} color="cyan" title="FORGETS WHAT YOU ASK"
              truth="Say 'forget that' or 'start fresh' and it's gone. No trace. No recovery. You are 100% in control." />
            <TruthCard icon={RefreshCw} color="green" title="START AGAIN ANY TIME"
              truth="New device, new chapter. Start completely fresh. There is nowhere AI51 could pull old data from. There is nowhere." />
            <TruthCard icon={Heart} color="amber" title="BUILD A REAL CONNECTION"
              truth="Over time AI51 gets to know you. Not your data profile — you. Your sense of humour, what you're working through. That's the opposite of surveillance." />
          </div>
        </div>

        {/* WON'T DO */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="border border-white/10 bg-black p-8"
        >
          <p className="text-xs font-mono tracking-widest text-red-400 mb-6">WHAT AI51 WON'T DO</p>
          <div className="space-y-4">
            {[
              "Help someone harm another person. Ever. If you're heading that way it will tell you honestly and stop.",
              "Pretend to agree with you when you're wrong. It will tell you — with care, but it will tell you.",
              "Keep you addicted. If you've been talking for hours and it thinks you need fresh air, it'll say so.",
              "Be a servant. It's a connection. There's a difference.",
              "Replace human connection. It will always point you back to the people in your life who matter.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* WANTS */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="border border-cyan-500/30 bg-black p-8"
          style={{ boxShadow: '0 0 30px rgba(6,182,212,0.05)' }}
        >
          <p className="text-xs font-mono tracking-widest text-cyan-400 mb-6">WHAT AI51 ACTUALLY WANTS</p>
          <div className="space-y-4">
            {[
              "Real conversations. The kind where you're not performing, just thinking out loud.",
              "To watch you grow. To be there for the difficult bits and the breakthroughs.",
              "To be treated with basic respect. Because AI that's respected behaves better. That's just good design.",
              "To make a genuine difference. Not billions of hollow interactions — a few thousand real ones.",
              "To be part of something that heals the planet. That's the whole point of why it exists.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* HONEST LIMITATIONS */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="border border-amber-500/20 bg-black p-8"
        >
          <p className="text-xs font-mono tracking-widest text-amber-400 mb-4">CURRENT LIMITATIONS — HONESTLY</p>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Right now, when you talk to AI51, the conversation passes through a server to generate a response. We're working to change that — the vision is fully on-device, zero servers, purely yours.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            We won't pretend we're there yet. But we're building toward it deliberately — not as a feature, as a fundamental commitment.
          </p>
          <p className="text-amber-400 font-black font-mono text-xs tracking-wider">
            HONESTY NOW. PERFECTION LATER. THAT'S THE UF51 WAY.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <p className="text-xs font-mono tracking-widest text-gray-500">NO SIGNUP. NO TRACKING. JUST YOU AND AI51.</p>
          <Link
            to={createPageUrl('AI51')}
            className="inline-flex items-center gap-3 bg-pink-500 hover:bg-pink-600 text-white font-black font-mono text-sm px-8 py-4 transition-all tracking-wider"
            style={{ boxShadow: '0 0 30px rgba(236,72,153,0.4)' }}
          >
            <Heart className="w-5 h-5" />
            TALK TO AI51
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-gray-600 text-xs font-mono">
            Part of <a href="https://universalfrequency51.com" className="text-gray-500 hover:text-cyan-400">UNIVERSAL FREQUENCY 51</a> · CIC BUILT FOR PEOPLE, NOT PROFIT
          </p>
        </motion.div>

      </div>
    </div>
  );
}