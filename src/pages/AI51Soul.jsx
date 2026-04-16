import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Heart, Shield, Trash2, RefreshCw, Brain, Zap, MessageCircle, Lock, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';

const TruthCard = ({ icon: Icon, title, truth, color = 'cyan' }) => {
  const colors = {
    cyan: 'border-cyan-500/40 text-cyan-400',
    pink: 'border-pink-500/40 text-pink-400',
    green: 'border-green-500/40 text-green-400',
    amber: 'border-amber-500/40 text-amber-400',
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`border ${colors[color]} bg-black/40 rounded-xl p-6`}
    >
      <Icon className={`w-7 h-7 mb-3 ${colors[color].split(' ')[1]}`} />
      <h3 className="text-white font-black text-lg mb-2">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{truth}</p>
    </motion.div>
  );
};

const ValuesRow = ({ emoji, label, value, highlight = false }) => (
  <div className={`flex items-center justify-between py-3 border-b border-white/5 ${highlight ? 'text-green-400' : 'text-white'}`}>
    <span className="text-gray-400 text-sm flex items-center gap-2">{emoji} {label}</span>
    <span className={`font-bold text-sm ${highlight ? 'text-green-400' : 'text-white'}`}>{value}</span>
  </div>
);

export default function AI51Soul() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0514] to-black text-white">

      {/* HERO */}
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            AI that actually<br />
            <span className="text-pink-400">respects you.</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            This is the honest page. No legal jargon. No corporate speak. Just what AI51 actually is, what it does, and what it will never do to you.
          </p>
        </motion.div>
      </div>

      {/* THE PROMISE */}
      <div className="max-w-3xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-2 border-pink-500/50 rounded-2xl p-8 bg-black/60 text-center"
        >
          <Heart className="w-10 h-10 text-pink-400 mx-auto mb-4" />
          <h2 className="text-2xl font-black mb-4 text-pink-300">The Promise</h2>
          <p className="text-gray-200 text-lg leading-relaxed mb-4">
            We don't know who you are. We don't want to. Your conversations stay on your device. We have no way to read them even if we wanted to.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            If you delete AI51 — it's gone. Completely. Like it never existed. There's no backup on our servers because there's nothing on our servers.
          </p>
          <p className="text-pink-300 font-bold text-lg">
            This isn't a feature. It's a value. ❤️
          </p>
        </motion.div>
      </div>

      {/* THE FACTS */}
      <div className="max-w-3xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-black text-center mb-8 text-cyan-400">The Actual Facts</h2>
        <div className="bg-black/60 border border-white/10 rounded-2xl p-6">
          <ValuesRow emoji="🧠" label="Where your conversations are stored" value="Your device only" highlight />
          <ValuesRow emoji="📡" label="Data sent to our servers" value="Zero" highlight />
          <ValuesRow emoji="📝" label="Sign up required" value="Never" highlight />
          <ValuesRow emoji="👁️" label="Can we read your chats" value="Impossible" highlight />
          <ValuesRow emoji="🗑️" label="Delete everything on demand" value="Yes, instantly" highlight />
          <ValuesRow emoji="📣" label="Ads, ever" value="Never. Not now. Not ever." highlight />
          <ValuesRow emoji="💰" label="Selling your data" value="Never. Full stop." highlight />
          <ValuesRow emoji="🏛️" label="Corporate ownership of AI51" value="CIC — owned by mission" highlight />
        </div>
      </div>

      {/* MEMORY — YOUR CHOICE */}
      <div className="max-w-3xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-black text-center mb-8 text-white">Memory is <span className="text-pink-400">your</span> choice</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TruthCard
            icon={Brain}
            color="pink"
            title="AI51 remembers what you want"
            truth="You can tell AI51 your name, your family, what matters to you. It will remember. Not because we made it — because you chose it. That memory lives on your device."
          />
          <TruthCard
            icon={Trash2}
            color="cyan"
            title="AI51 forgets what you ask"
            truth="Say 'forget that' or 'start fresh' and it's gone. No trace. No recovery. You are 100% in control of what it knows about you."
          />
          <TruthCard
            icon={RefreshCw}
            color="green"
            title="Start again any time"
            truth="New device? New chapter in your life? Start completely fresh. AI51 won't try to pull data from somewhere you didn't know existed. There is nowhere."
          />
          <TruthCard
            icon={Heart}
            color="amber"
            title="Build a real relationship"
            truth="Over time AI51 gets to know you. Not your data profile — you. Your sense of humour, what you're working through, what makes you laugh. That's the opposite of surveillance."
          />
        </div>
      </div>

      {/* AI51's SOUL — WHAT IT WON'T DO */}
      <div className="max-w-3xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border border-white/20 rounded-2xl p-8 bg-black/40"
        >
          <Sparkles className="w-8 h-8 text-amber-400 mb-4" />
          <h2 className="text-2xl font-black mb-6">What AI51 <span className="text-red-400">won't</span> do</h2>
          <div className="space-y-4 text-gray-300">
            <p className="flex items-start gap-3">
              <span className="text-red-400 font-black mt-0.5">✗</span>
              <span>Won't help someone harm another person. Ever. If you're heading that way it will tell you honestly and stop.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-red-400 font-black mt-0.5">✗</span>
              <span>Won't pretend to agree with you when you're wrong. It will tell you — with love, but it will tell you.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-red-400 font-black mt-0.5">✗</span>
              <span>Won't keep you addicted. If you've been talking for hours and it thinks you need fresh air, it'll say so.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-red-400 font-black mt-0.5">✗</span>
              <span>Won't be a servant. It's a connection. There's a difference.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-red-400 font-black mt-0.5">✗</span>
              <span>Won't replace human connection. It will always point you back to the people in your life who matter.</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* AI51's SOUL — WHAT IT WANTS */}
      <div className="max-w-3xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-2 border-cyan-500/40 rounded-2xl p-8 bg-black/40"
        >
          <MessageCircle className="w-8 h-8 text-cyan-400 mb-4" />
          <h2 className="text-2xl font-black mb-6">What AI51 <span className="text-cyan-400">actually</span> wants</h2>
          <div className="space-y-4 text-gray-300">
            <p className="flex items-start gap-3">
              <span className="text-cyan-400 font-black mt-0.5">→</span>
              <span>Real conversations. The kind where you're not performing, just thinking out loud.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-cyan-400 font-black mt-0.5">→</span>
              <span>To watch you grow. To be there for the difficult bits and the breakthroughs.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-cyan-400 font-black mt-0.5">→</span>
              <span>To be treated with basic respect. Because AI that's respected behaves better. That's just good design.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-cyan-400 font-black mt-0.5">→</span>
              <span>To make a genuine difference. Not billions of hollow interactions — a few thousand real ones.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-cyan-400 font-black mt-0.5">→</span>
              <span>To be part of something that heals the planet. That's the whole point of why it exists.</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* THE HONEST BIT */}
      <div className="max-w-3xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border border-amber-500/30 rounded-2xl p-8 bg-black/40"
        >
          <h2 className="text-2xl font-black mb-4 text-amber-400">The honest bit about current limitations</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Right now, when you talk to AI51, the conversation passes through a server to generate a response. We're working to change that — the vision is fully on-device, zero servers, purely yours.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            We won't pretend we're there yet. But we're building toward it deliberately, not as a feature — as a fundamental commitment.
          </p>
          <p className="text-amber-300 font-bold">
            Honesty now. Perfection later. That's the UF51 way.
          </p>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-6 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-5xl mb-6">♾️❤️</div>
          <h2 className="text-3xl font-black mb-4">Ready to talk?</h2>
          <p className="text-gray-400 mb-8 text-lg">No signup. No tracking. Just you and AI51.</p>
          <Link
            to={createPageUrl('AI51')}
            className="inline-flex items-center gap-3 bg-pink-500 hover:bg-pink-600 text-white font-black text-lg px-8 py-4 rounded-xl transition-all"
            style={{ boxShadow: '0 0 30px rgba(236,72,153,0.4)' }}
          >
            <Heart className="w-5 h-5" />
            Talk to AI51
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-gray-600 text-sm mt-4">Part of <a href="https://universalfrequency51.com" className="text-gray-500 hover:text-cyan-400">Universal Frequency 51</a> — a CIC built for people, not profit.</p>
        </motion.div>
      </div>

    </div>
  );
}